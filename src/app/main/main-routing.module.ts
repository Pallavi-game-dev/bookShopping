import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../auth.guard';
import { BuyproductComponent } from '../buyproduct/buyproduct.component';
import { CartComponent } from '../cart/cart.component';
import { DialoguecardComponent } from '../dialoguecard/dialoguecard.component';
import { HomepageComponent } from '../homepage/homepage.component';
import { LoginComponent } from '../login/login.component';
import { RegisterpageComponent } from '../registerpage/registerpage.component';
import { WishlistComponent } from '../wishlist/wishlist.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
      { path: 'home', component: HomepageComponent,canActivate:[AuthGuard] },
      { path: 'register', component: RegisterpageComponent },
      { path: 'wishlist', component: WishlistComponent,canActivate:[AuthGuard]  },
      { path: 'cart', component: CartComponent,canActivate:[AuthGuard]  },
      { path: 'product/:id', component: DialoguecardComponent,canActivate:[AuthGuard] },
      { path: 'buyproduct', component: BuyproductComponent,canActivate:[AuthGuard] },
      { path: '**', redirectTo: 'login' }
];

@NgModule({
  imports: [CommonModule,RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class MainRoutingModule { }
