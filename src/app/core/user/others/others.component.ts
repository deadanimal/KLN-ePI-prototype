import { Component, OnInit } from '@angular/core';
import swal from 'sweetalert2';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';

@Component({
  selector: 'app-others',
  templateUrl: './others.component.html',
  styleUrls: ['./others.component.scss']
})
export class OthersComponent implements OnInit {

  // Form
  registerForm: FormGroup

  typeapp:number = 0;

  constructor() { }

  ngOnInit() {
  }
  confirm() {
    swal
      .fire({
        title: "Confirmation",
        text: "Are you sure to submit this?",
        type: "info",
        buttonsStyling: false,
        confirmButtonClass: "btn btn-success",
        confirmButtonText: "Confirm",
        showCancelButton: true,
        cancelButtonClass: "btn btn-danger",
        cancelButtonText: "Cancel",
      })
      .then((result) => {
        if (result.value) {
          this.approve();
        }
      });
  }

  approve() {
    swal
      .fire({
        title: "Success",
        text: "Application has been submitted!",
        type: "success",
        buttonsStyling: false,
        confirmButtonClass: "btn btn-success",
        confirmButtonText: "Close",
      })
      .then((result) => {
        if (result.value) {
          this.registerForm.reset();
        }
      });
  }

  OnChange($event){
    console.log($event.target.value);
    
    this.typeapp = $event.target.value
  }

}
