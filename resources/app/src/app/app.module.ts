import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import { AppComponent } from './app.component';
import {HeaderComponent} from './_components/_header/header.component';
import {FooterComponent} from './_components/_footer/footer.component';
import {MainComponent} from './_components/_main/main.component';
import {RouterModule} from "@angular/router";
import {AppRoutingModule} from "./app.routing";
import {ProductModule} from "./_modules/product/product.module";
import {ProductFormComponent} from './_components/product/product-form/product-form.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {NgSelectModule} from "@ng-select/ng-select";
import {PostModule} from "./_modules/post/post.module";
import { DashboardComponent } from './_components/dashboard/dashboard.component';
import { LoginComponent } from './_components/login/login.component';
import { RegisterComponent } from './_components/register/register.component';

import { JwtModule } from '@auth0/angular-jwt';
import { HttpClientModule } from '@angular/common/http';

export function tokenGetter() {
    return localStorage.getItem('jwt');
}

@NgModule({
  declarations: [
      AppComponent,
      HeaderComponent,
      FooterComponent,
      MainComponent,
      ProductFormComponent,
      DashboardComponent,
      LoginComponent,
      RegisterComponent,
  ],
  imports: [
      BrowserModule,
      AppRoutingModule,
      ProductModule,
      PostModule,
      FormsModule,
      ReactiveFormsModule,
      NgSelectModule,
      HttpClientModule,
      JwtModule.forRoot({
          config: {
              tokenGetter: tokenGetter,
              whitelistedDomains: ['127.0.0.1:8000', '127.0.0.1:8080', 'localhost:8000', 'apicappuccino.plima.me'],
          }
      })
  ],
    exports: [
        RouterModule,
        AppComponent,
        NgSelectModule,
    ],
    providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
