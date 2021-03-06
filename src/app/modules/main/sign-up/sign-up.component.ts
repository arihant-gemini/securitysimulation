import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormGroupDirective,
  FormBuilder,
  FormControl,
  Validators,
  FormArray,
  NgForm,
} from "@angular/forms";
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { MainService } from '../service/main.service';
import { ToastrService } from 'ngx-toastr';
import { DialogRole, MatDialog } from '@angular/material/dialog';
import { ConfirmationModalComponent } from 'src/app/shared/confirmation-modal/confirmation-modal.component';
@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {
  signupForm:FormGroup;
  constructor(private formBuilder: FormBuilder,
    private _MainService:MainService,
    private _auth:AuthService,
    private router:Router,
    private toastr: ToastrService,
    private dialog:MatDialog) {
      this.signupForm = this.formBuilder.group({});
    }

  ngOnInit(): void {
    this.signupForm = this.formBuilder.group({
      name:['',Validators.required],
      id:['',Validators.required],
      password:['',Validators.required]
    });
  }
  submit(){
    if(this.signupForm.invalid)
    return;
    let obj={
      "username":this.signupForm.value.name,
      "email":this.signupForm.value.id,
      "password":this.signupForm.value.password
    }
    this._MainService.signUp(obj).subscribe((data)=>{
      if(data){
        let dataDialog = { title: 'Account created successfully!' };
        const dialogRef = this.dialog.open(ConfirmationModalComponent, {
          width: '513px',
          data: dataDialog
        });
        dialogRef.afterClosed().subscribe(()=>{
          this.router.navigate(['main/login']);
        })
      }
    })
  }

}
