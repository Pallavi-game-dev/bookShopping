
import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ToastrService } from 'ngx-toastr';
import { BookDetails } from '../book-details';
import { BookService } from '../book.service';
import { BuyproductComponent } from '../buyproduct/buyproduct.component';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements AfterViewInit, OnInit {
  @ViewChild('quantity', { static: false }) quantity: ElementRef | undefined;
  displayedColumns: string[] = ["product", "title", "price", "quantity", "total", "checkout", "delete"];
  dataSource = new MatTableDataSource<BookDetails>();
  data = [];
  cartTotalAmount=0;
  booklist:any;

  @ViewChild(MatPaginator) paginator: MatPaginator | any;

  constructor(public bookservice: BookService,
    private dialog: MatDialog,
    private toaster:ToastrService) { }
  ngOnInit() {
    // element.discountAmount * element.quantity 
    if(this.bookservice.userMetaData){
      console.log("this.bookservice.userMetaData",this.bookservice.userMetaData);
      
      this.booklist = this.bookservice.userMetaData;
    }
    this.setData();
    this.calculateTotalAmountofCart();
    
    if (this.dataSource.paginator) {
      this.dataSource.paginator = this.paginator;
      console.log("this.paginator", this.paginator);
    }
  }
  
  setData(){
    if(this.booklist){
      let cartlist = new Array();
      this.bookservice.userMetaData.cart.forEach((cartbookid: string) => {
        console.log("cartbookid",cartbookid);
        this.bookservice.bookList.forEach((data)=>{
          console.log("CART",data._id , cartbookid);
          
            if(data._id === cartbookid){
              cartlist.push(data)
              console.log("cartlist 4",cartlist);
            }
        });
      });
      this.dataSource.data = cartlist;
    }
  }
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    console.log("this.paginator", this.paginator);
  }
  onDelete(book: any) {
    console.log("onDelete", book);

    // let books = book;
    // books.cart = false;
    // this.bookservice.updateBookList(book.id, books).subscribe(res => {
    //   console.log("upadted");
    //   this.bookservice.isCartDataUpadated.next(true);
    //   // this.getBookList();
    // });

    // let arr = ['A', 'B', 'C'];
    // arr = arr.filter(e => e !== 'B'); // will return ['A', 'C']

    const metaData = this.bookservice.userMetaData;
    if(metaData){
      console.log("this.bookservice.userMetaData 1",this.bookservice.userMetaData);
      
      this.bookservice.userMetaData.cart =  this.bookservice.userMetaData.cart.filter((e: any) => e !== book._id);
      this.setData();

      this.bookservice.updateCartDatainDB();
      console.log("this.bookservice.userMetaData 2",this.bookservice.userMetaData);
      this.calculateTotalAmountofCart();
    }


  }

  onCheckout(data: any, enterAnimationDuration: string, exitAnimationDuration: string) {
    console.log("onCheckout", data);

    const dialogRef = this.dialog.open(BuyproductComponent, {
      width: '80%',
      maxWidth: '100%',
      height: "90%",
      enterAnimationDuration,
      exitAnimationDuration,
    });
    let instance = dialogRef.componentInstance;
    instance.product = data;
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed', result);
      // if (instance.isBuy) {
      //   this.onDelete(data);
      // }

    });

  }
  increaseQtyPro(ele: any) {
    ele.quantity = ele.quantity + 1;
    this.calculateTotalAmountofCart();
  }
  decreseQtyPro(ele: any) {
    if (ele.quantity > 1) {
      ele.quantity = ele.quantity - 1;
    }
    this.calculateTotalAmountofCart();

  }
  calculateTotalAmountofCart(){
    console.log("cartTotalAmount",this.cartTotalAmount,this.dataSource.data);
    this.cartTotalAmount = 0;
    if(this.dataSource.data){
      this.dataSource.data.forEach((element:any) => {
        this.cartTotalAmount += this.bookservice.getBookDiscountAmount(element.price,element.discount)* element.quantity;
      });
      console.log("cartTotalAmount",this.cartTotalAmount);
      
    }
  }
  onAllCheckout(){
    this.toaster.success("Your Order Placed Sucessfully");
  }
}






