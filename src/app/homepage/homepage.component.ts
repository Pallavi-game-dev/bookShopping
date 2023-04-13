import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { BookService } from '../book.service';
import { DialoguecardComponent } from '../dialoguecard/dialoguecard.component';
import { BookDetails } from '../book-details'; 
import { Router } from '@angular/router';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss']
})
export class HomepageComponent implements OnInit {
  isLogin=true;
  cartCount=0;
  wishListCount=0;
  searchTerm:any;
  searchkey='';
  searchInput='';
  bookdata:BookDetails | any;
  constructor(
    private bookservice:BookService,
    public dialog: MatDialog,
    private router:Router
  ){
    console.log("HOME COMPONENT LOAED");
    
  }
 

  ngOnInit(): void {
    this.searchkey="title";
   
   
    // this.bookservice.isCartDataUpadated.next(true)
    // this.bookservice.isWishDataUpadated.next(true)
   this.bookservice.isLogin.subscribe(val=>{
    
    this.isLogin = val;
   });
    this.bookdata = this.bookservice.bookList;
    
   this.bookservice.searchTerm.subscribe(val=>{
    this.searchInput = val;
    console.log("this.searchInput",this.searchInput);
    
   });
   this.bookservice.searchkey.subscribe(val=>{
    this.searchkey = val;
    console.log("this.searchkey",this.searchkey);
    
   });
  }
  
  onCardClick_(data:any,enterAnimationDuration: string, exitAnimationDuration: string){
    console.log("onCardClick",data);
    
      const dialogRef = this.dialog.open(DialoguecardComponent, {
      width: '80%',
      maxWidth:'100%',
      height:"85%",
      enterAnimationDuration,
      exitAnimationDuration,
      });
      let instance = dialogRef.componentInstance;
      // instance.data = this.bookdata[0];
  
      dialogRef.afterClosed().subscribe(result => {
        console.log('The dialog was closed',result);
        // this.animal = result;
      });
  }
  onCardClick(data:any){
    console.log('onCardClick',data);
    this.router.navigate(['/product',data._id]);
  }

 


}
