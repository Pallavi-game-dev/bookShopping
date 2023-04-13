import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { BookDetails } from '../book-details';
import { BookService } from '../book.service';
import { ToastrService } from 'ngx-toastr';
import { Router, ActivatedRoute } from '@angular/router';
import { BuyproductComponent } from '../buyproduct/buyproduct.component';

@Component({
  selector: 'app-dialoguecard',
  templateUrl: './dialoguecard.component.html',
  styleUrls: ['./dialoguecard.component.scss']
})

export class DialoguecardComponent implements OnInit {
  // @ViewChild('quantity', { static: false }) quantity: ElementRef | undefined;
  // @Input() data:BookDetails | any;
  bookId: any;
  bookDetails: BookDetails | any;
  userMetaData: any;
  bookInfo: any;
  panelOpenState = false;
  discountPrice: number = 0
  constructor(
    // public dialogRef: MatDialogRef<DialoguecardComponent>,
    private bookService: BookService,
    private toastr: ToastrService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private dialog: MatDialog
  ) {
    this.activatedRoute.params.subscribe(param => {
      console.log("this.bookDetails /product", param);
      this.bookId = param;
    });
    console.log(" this.bookId", this.bookId.id);

    this.bookService.getBookListbtID(this.bookId.id).subscribe(res => {
      console.log("getBookListbtID", res);

      this.bookDetails = res.books;
      this.bookDetails.quantity = 1;
      this.bookInfo = this.bookDetails.infomation;
      this.discountPrice = this.bookService.getBookDiscountAmount(this.bookDetails.price, this.bookDetails.discount);
      this.userMetaData = this.bookService.userMetaData;
    });
  }
  ngOnInit() {

  }
  onNoClick(): void {
    this.router.navigate(['home']);
    // this.dialogRef.close();
  }

  // add to chart 
  addtoChart() {
    if (this.bookService.userMetaData && !this.bookService.userMetaData.cart.includes(this.bookDetails._id)) {
      this.toastr.success("Product added Sucessfully in Cart");
      this.bookService.userMetaData.cart.push(this.bookDetails._id);
      this.bookService.updateCartDatainDB();
      
    } else {
      this.toastr.info("Product is already added in Cart");
    }


  }
  addtoWishList() {

    // this.bookDetails.wishlist = !this.bookDetails.wishlist;
    // let json = {
    //   wishlist: this.bookDetails.wishlist
    // }
    // this.bookService.updateBookList(this.bookDetails._id, json).subscribe((res) => {
    //   this.bookService.isWishDataUpadated.next(true);
    // });
    if (this.bookService.userMetaData && !this.bookService.userMetaData.wishlist.includes(this.bookDetails._id)) {
      this.toastr.success("Product added Sucessfully in Wishlist");
      this.bookService.userMetaData.wishlist.push(this.bookDetails._id);
      this.bookService.updateWishlistDatainDB();
      
    } else {
      this.bookService.userMetaData.wishlist =  this.bookService.userMetaData.wishlist.filter((e: any) => e !== this.bookDetails._id);
      this.bookService.updateWishlistDatainDB();
      this.toastr.info("Product removed from Wishlist");
    }
  }

  // to buy a product

  onBuyButtonClick(data: any, enterAnimationDuration: string, exitAnimationDuration: string) {
    console.log("onBuyButtonClick", this.bookDetails);

    const dialogRef = this.dialog.open(BuyproductComponent, {
      width: '80%',
      maxWidth: '100%',
      height: "95%",
      enterAnimationDuration,
      exitAnimationDuration,
    });
    let instance = dialogRef.componentInstance;
    instance.product = this.bookDetails;

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed', result);
      // this.animal = result;
    });
  }
  increaseQtyPro(ele: any) {
    // ele.quantity = ele.quantity + 1;
    this.bookDetails.quantity = this.bookDetails.quantity + 1;
  }
  decreaseQtyPro(ele: any) {
    if (ele.quantity > 1) {
      // ele.quantity = ele.quantity - 1;
      this.bookDetails.quantity = this.bookDetails.quantity - 1;
    }

  }

}
