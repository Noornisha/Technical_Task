import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-final-step',
  templateUrl: './final-step.component.html',
  styleUrls: ['./final-step.component.scss']
})
export class FinalStepComponent implements OnInit {
  addcard: FormGroup;

  constructor(
    private toastr: ToastrService,
       private fb: FormBuilder,
       private router : Router
    ) { }


  ngOnInit(): void {

    this.addcard = this.fb.group({
      Name: ['', [Validators.required, Validators.minLength(4)]],
      CardNumber: ['', [Validators.required, Validators.minLength(12),Validators.maxLength(12)]],

      SecurityCode: ['', [Validators.required, Validators.minLength(3),Validators.maxLength(3)]],
      Expiration : ['', [Validators.required, Validators.minLength(4),Validators.maxLength(4)]
    ] });
    console.log( this.addcard.valid)

  }


addProduct( ) {

    let productItems = [];
    if (localStorage.getItem('CartItems')) {
      productItems = JSON.parse(localStorage.getItem('CartItems')); // get product list
if( productItems !== null){

  productItems.push(
    {
      Name:this.addcard.controls.Name.value,
      CardNumber: this.addcard.controls.CardNumber.value,
      SecurityCode: this.addcard.controls.CardNumber.value,
      Expiration: this.addcard.controls.Expiration.value,

    }
  );
}
   
    localStorage.setItem('CartItems', JSON.stringify(productItems));
    this.toastr.success(" your information added successfully")
this.addcard.reset()
this.router.navigateByUrl("home")
}

else {
  this.toastr.error(" your information not added")
}


}
}
