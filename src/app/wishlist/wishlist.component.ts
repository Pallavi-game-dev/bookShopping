import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { BookService } from '../book.service';
// import { DialoguecardComponent } from '../dialoguecard/dialoguecard.component';
import { BookDetails } from '../book-details'; 
import { Router } from '@angular/router';
@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.css']
})
export class WishlistComponent implements OnInit{
  constructor(
    private bookservice:BookService,
    public dialog: MatDialog,
    private router:Router
  ){
    console.log("WISHLIST COMPONENT LOAED");
    
  }
  bookdata:BookDetails | any;
  ngOnInit(): void {
    // this.bookservice.getBookList().subscribe(res=>{
    //   let product = res.filter((data:any)=>{
    //     return data.wishlist === true;
    //   })
    //   this.bookdata = product;
    //   console.log("product",product);
    // })
    let wishlist = new Array();
    this.bookservice.userMetaData.wishlist.forEach((wishlistbookid: string) => {
      console.log("wishlistbookid",wishlistbookid);
      this.bookservice.bookList.forEach((data)=>{
        console.log("WISHLIST",data._id , wishlistbookid);
        
          if(data._id === wishlistbookid){
            wishlist.push(data)
            console.log("wishlist 4",wishlist);
          }
      });
    });
    this.bookdata = wishlist;
  }
  onCardClick(books:any){
    console.log('onCardClick',books);
    this.router.navigate(['/product',books._id]);
  }

}
