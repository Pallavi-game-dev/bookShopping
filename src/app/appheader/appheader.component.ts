import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { userMetaData } from '../book-details';
import { BookService } from '../book.service';

@Component({
  selector: 'app-appheader',
  templateUrl: './appheader.component.html',
  styleUrls: ['./appheader.component.scss']
})

export class AppheaderComponent implements OnInit {
  isLogin = false;;
  cartCount = 0;
  wishListCount = 0;
  searchTerm: String = '';
  searchInput: String = '';
  categorylist = [''];
  userName='';
  category:string | any;

  constructor(
    private bookService: BookService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.bookService.isLogin.subscribe(val => {
      console.log("isLogin",val);
      
      // if (val) {
        this.bookService.getAllbookData();
        this.isLogin = this.bookService.isLoggedIn();
        this.categorylist = this.bookService.categorylist;
        console.log("this.bookService.userMetaData",this.bookService.userMetaData);
        setTimeout(() => {
          if(this.bookService.userMetaData){
            this.userName = this.bookService.userName;
            this.bookService.cartCount.next(this.bookService.userMetaData.cart.length);
            this.bookService.wishlistCount.next(this.bookService.userMetaData.wishlist.length);
            this.wishListCount = this.bookService.userMetaData.wishlist.length;
          }
        }, 1000);
        this.bookService.cartCount.subscribe((res:any)=>{
          this.cartCount = parseInt(res);
        });
        this.bookService.wishlistCount.subscribe((res:any)=>{
          this.wishListCount = parseInt(res);
        });
      
      // }
    });
  }

  onHomeClick() {
    this.router.navigate(['home']);
    this.bookService.searchTerm.next('');
    this.bookService.searchkey.next('title');
  }
  onCartClick() {
    this.router.navigate(['cart']);
  }
  onWishClick() {
    this.router.navigate(['wishlist']);
  }
  onSelectCategory(category: any) {
    this.router.navigate(['home']);
    this.category = category;
    this.bookService.searchTerm.next(category);
    this.bookService.searchkey.next('category');
  }
  onSelectSearch(category: any) {
    this.router.navigate(['home']);
    this.bookService.searchTerm.next(category);
    this.bookService.searchkey.next('title');
  }
  onLogOut(){
    this.bookService.isLogin.next(false);
    this.router.navigate(['login']);
  }

}
