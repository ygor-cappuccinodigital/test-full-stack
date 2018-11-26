import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {ProductRoutingModule} from './product-routing.module';
import {ProductsListComponent} from "../../_components/product/products-list/products-list.component";
import {HttpClientModule} from "@angular/common/http";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {PipesModule} from "../pipes/pipes.module";
import {ProductCategoryComponent} from "../../_components/product/product-category/product-category.component";

@NgModule({
    imports: [
        CommonModule,
        ProductRoutingModule,
        HttpClientModule,
        FormsModule,
        ReactiveFormsModule,
        PipesModule,
    ],
    declarations: [
        ProductsListComponent,
        ProductCategoryComponent
    ]
})
export class ProductModule {
}
