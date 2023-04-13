import { Component, Input, OnInit, Output ,EventEmitter } from '@angular/core';
import { BookDetails } from '../book-details';
import { BookService } from '../book.service';

@Component({
  selector: 'app-productcard',
  templateUrl: './productcard.component.html',
  styleUrls: ['./productcard.component.css']
})
export class ProductcardComponent implements OnInit {
  @Input() bookdata:BookDetails | any;
  @Output() onCardClick = new EventEmitter();
  data:any;
  discountAmount:any;

  constructor(private bookService:BookService){}
  ngOnInit(): void {
    // console.log(this.bookdata,">>>>>>>>>");
    this.discountAmount = this.bookService.getBookDiscountAmount(this.bookdata.price,this.bookdata.discount)
    
  }
  onClick(bookdata:any){
    this.onCardClick.emit(bookdata);
  }

}
