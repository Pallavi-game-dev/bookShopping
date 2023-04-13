import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-colorcalculator',
  templateUrl: './colorcalculator.component.html',
  styleUrls: ['./colorcalculator.component.scss']
})
export class ColorcalculatorComponent implements OnInit {

  
  ngOnInit(){
    
  }
  getColor(str:string){
    return str;
  }

}
