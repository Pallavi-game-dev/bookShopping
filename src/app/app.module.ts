import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { ColorcalculatorComponent } from './colorcalculator/colorcalculator.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './login/login.component';
import { MaterialExampleModule } from 'src/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppheaderComponent } from './appheader/appheader.component';
import { HomepageComponent } from './homepage/homepage.component';
import { RegisterpageComponent } from './registerpage/registerpage.component';
import { ProductcardComponent } from './productcard/productcard.component';
import { AppfooterComponent } from './appfooter/appfooter.component';
import { HttpClientModule } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';
import { DialoguecardComponent } from './dialoguecard/dialoguecard.component';
import { CartComponent } from './cart/cart.component';

import { BuyproductComponent } from './buyproduct/buyproduct.component';
import { RouterModule } from '@angular/router';
import { MainRoutingModule } from './main/main-routing.module';
import { WishlistComponent } from './wishlist/wishlist.component';
import { SearchPipe } from './search.pipe';

@NgModule({
  declarations: [
    AppComponent,
    ColorcalculatorComponent,
    LoginComponent,
    AppheaderComponent,
    HomepageComponent,
    RegisterpageComponent,
    ProductcardComponent,
    AppfooterComponent,
    DialoguecardComponent,
    CartComponent,
    BuyproductComponent,
    WishlistComponent,
    SearchPipe
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    BrowserAnimationsModule,
    MaterialExampleModule,
    FormsModule,
    ReactiveFormsModule,
    ToastrModule.forRoot(),
    RouterModule,
    MainRoutingModule
    
  ],
  exports:[
    ColorcalculatorComponent
  ],
 
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
