import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, isObservable, Observable, Subject } from 'rxjs';
import { BookDetails, userMetaData } from './book-details';

@Injectable({
  providedIn: 'root'
})
export class BookService {
  public userID: string = '';;
  public userName: string = '';
  public bookList = new Array;
  public userMetaData: userMetaData |any;

  public categorylist = [''];

  public isLogin = new BehaviorSubject(false);
  isLogin$ = this.isLogin.asObservable();
  public searchTerm = new BehaviorSubject('');
  searchTerm$ = this.searchTerm.asObservable();
  public searchkey = new BehaviorSubject('');
  searchkey$ = this.searchkey.asObservable();
  public cartCount = new Subject();
  cartCount$ = this.cartCount.asObservable();
  public wishlistCount = new Subject();
  wishlistCount$ = this.wishlistCount.asObservable();
  public isCartDataUpadated = new Subject();
  isCartDataUpadated$ = this.isCartDataUpadated.asObservable();
  public isWishDataUpadated = new Subject();
  isWishDataUpadated$ = this.isWishDataUpadated.asObservable();
  public chartList = new Subject();
  chartList$ = this.chartList.asObservable();

  constructor(private http: HttpClient) { }

  getLogin() {
    return this.http.get<any>("/api/users");
  }
  setUser(body: any) {
    return this.http.post("/api/users", body);
  }
  getBookList() {
    return this.http.get<any>("/api/books");
  }
  getBookListbtID(id: any) {
    return this.http.get<any>("/api/books/" + id);
  }
  addBookstoList(data: any) {
    return this.http.post("/api/books", data);
  }
  updateBookList(id: any, body: any) {

    console.log(body, id, "body:any,id:any");

    return this.http.patch("/api/books/" + id, body);
  }
  deleteBook(body: any, id: any) {

    return this.http.delete("/api/books/id/" + id);
  }

  addMetaData(data:any){
    return this.http.post("/api/usermetadata", data);
   
  }
  getUserMetaData() {
    return this.http.get<any>("/api/usermetadata");
  }
  updateMetaData(id:any,body:any){
    return this.http.patch("/api/usermetadata/" + id, body)
  }
  

  getBookDiscountAmount(price: any, discount: any) {
    let discountAmount: any;
    let amount = (price * discount) / 100;
    discountAmount = price - amount;
    return discountAmount
  }

  isLoggedIn() {
    let login = false;
    this.isLogin.subscribe(val => {
      login = val;
    });
    return login;
  }

  getAllbookData() {

    this.getBookList().subscribe((res) => {
      this.bookList = res;
    });
    this.getCategorylist();
    this.getUserMetaData().subscribe(ress => {
      ress.forEach((element: { userID: any; }) => {
        if( element.userID===this.userID){
          this.userMetaData = element;
          console.log("SET this.userMetaData",this.userMetaData);
          
        }
      });
    
    });
  }
  getCategorylist() {
    let categorylist = [''];
    categorylist.length = 0;
    this.bookList.forEach((element: { category: any[]; }) => {
      if (element.category) {
        element.category.forEach(category => {
          categorylist.push(category);
        });
      }
    });
    categorylist = [...new Set(categorylist)];
    this.categorylist = categorylist;
    console.log("element.category", categorylist);
  }
  updateCartDatainDB(){
    let cart = {cart:this.userMetaData.cart};
    console.log("updateDatainDB",cart,this.userMetaData._id);
    
    this.updateMetaData(this.userMetaData._id,cart).subscribe(res=>{
      console.log(res);
      this.cartCount.next(this.userMetaData.cart.length);
      
    });
  }
  updateWishlistDatainDB(){
    let wishlist = {wishlist:this.userMetaData.wishlist};
    console.log("updatewishlistDatainDB",wishlist,this.userMetaData._id);
    
    this.updateMetaData(this.userMetaData._id,wishlist).subscribe(res=>{
      console.log(res);
      this.wishlistCount.next(this.userMetaData.wishlist.length);
      
    });
  }

}
