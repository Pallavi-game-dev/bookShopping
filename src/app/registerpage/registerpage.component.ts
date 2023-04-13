import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { BookService } from '../book.service';
@Component({
  selector: 'app-registerpage',
  templateUrl: './registerpage.component.html',
  styleUrls: ['./registerpage.component.css']
})
export class RegisterpageComponent implements OnInit {
  submitted = false;
  hide = true;
  userForm!:FormGroup;
  constructor(
    private fb:FormBuilder,
    private http:HttpClient,
    private toastr:ToastrService,
    private router:Router,
    private bookService:BookService
    
    ){}

  ngOnInit(): void 
  {
  this.userForm = this.fb.group({
    FName:['',[Validators.required]],
    LName:['',[Validators.required]],
    Address:['',Validators.required],
    PhoneNo:['',Validators.compose([Validators.required,Validators.pattern('[0-9+]*'),Validators.minLength(10)])],
    EmailId:['',Validators.compose([Validators.required,Validators.pattern('^\\w+([-+.]\\w+)*@\\w+([-.]\\w+)*\\.\\w+([-.]\\w+)*$')])],
    Password:['',Validators.compose([Validators.required,Validators.minLength(6)])]
  });
}
  getErrorMessage(val:any) {
    if (this.userForm.controls[val].hasError('required')) {
      return 'You must enter a value';
    }
    console.log("this.userForm",this.userForm);
    
    return this.userForm.controls[val].hasError(val) ? 'Not a valid value' : '';
  }
  get loadRegistration()
  {
     return this.userForm?.controls;
  }
  onSubmit()
  {
     this.submitted = true;
     if(this.userForm.valid) 
     {
      this.bookService.setUser(this.userForm.value).subscribe((res)=>{
        this.toastr.success("Register sucessfully");
        console.log("setUser res",res);
        const body = {
          userID:res,
          cart:[],
          wishlist:[],
          buyproducts:[]
      }
        this.bookService.addMetaData(body).subscribe((ress)=>{
          console.log("set User metaData",ress);
        });
        this.userForm.reset();
        this.router.navigate(['login']);
      });
     
      
     }
  }

}
