import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import {FormBuilder,FormGroup,FormControl, Validators} from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { BookService } from '../book.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{
  loginForm!:FormGroup;
  submitted = false;
  hide = true;
  userID:String | any;
 

  constructor(
    private http:HttpClient,
    private formBuilder:FormBuilder,
    private toastr:ToastrService,
    private router:Router,
    private bookService:BookService
  ){

  }

  ngOnInit(){
    this.submitted = false;
    this.loginForm = this.formBuilder.group({
      // email = new FormControl('',);
      EmailId:[''],
      Password:['']
    })

  }
  getErrorMessage(inputValue:string,msg:string) {
    if (this.loginForm.controls[inputValue].hasError('required')) {
      return 'You must enter a value';
    }
    return this.loginForm.controls[inputValue].hasError(inputValue) ? msg : '';
  }
 
  get loadRegistration()
  {
     return this.loginForm?.controls;
  }
 
  onLogin(){
    this.submitted = true;
    this.bookService.getLogin().subscribe(userList=>{
      const user = userList.find((res:any)=>{
        return res.EmailId === this.loginForm.value.EmailId && res.Password === this.loginForm.value.Password
      });
      console.log("user >>> --->",user);
       
      if(user){
        this.bookService.userID = user._id;
       this.bookService.userName = user.FName + " "+user.LName;
     
        // this.bookService.chartList.next(user.chartList);
        // this.toastr.show("welcome to OuRbOoKs " + this.bookService.userName);
        localStorage.setItem('islogin',"yes");
        this.loginForm.reset();
        this.router.navigate(['home']);
        this.bookService.isLogin.next(true);

      }else{
        this.toastr.error("Invalid User Email Id or Password"); 
      }
      
    },(error)=>{
      this.toastr.error("Something went Wrong"); 
    })
  }
 
}
