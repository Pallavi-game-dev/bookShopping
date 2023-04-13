import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { BookDetails } from '../book-details';
import { BookService } from '../book.service';

@Component({
  selector: 'app-buyproduct',
  templateUrl: './buyproduct.component.html',
  styleUrls: ['./buyproduct.component.css']
})
export class BuyproductComponent implements OnInit{
  isBuy=false;
  constructor(
    private toaster:ToastrService,
    private dialog:MatDialog,
    private bookService: BookService
  ){}

  // @Input()set DataJson(res:any){
  //   if(res){
  //     laodChart();
  //   }
  // }

  @Input() product:BookDetails | any;
    SubTotalPrice:any;
    discountAmount:any
  ngOnInit(): void {
    this.isBuy = false;
    if(this.product){
      console.log("BuyproductComponent",this.product);
      this.discountAmount = this.bookService.getBookDiscountAmount(this.product.price,this.product.discount);
      this.SubTotalPrice = this.discountAmount * this.product.quantity;
    }
  }
  buyProduct(){
    this.toaster.success("Your Order Placed Sucessfully");
    this.dialog.closeAll();
    this.isBuy = true;
  }
  cancelProduct(){
    this.isBuy = false;
    this.dialog.closeAll();
  
  }
}
