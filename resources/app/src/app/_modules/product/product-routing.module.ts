import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {ProductsListComponent} from "../../_components/product/products-list/products-list.component";
import {AppComponent} from "../../app.component";
import {MainComponent} from "../../_components/_main/main.component";
import {ProductFormComponent} from "../../_components/product/product-form/product-form.component";
import {ProductCategoryComponent} from "../../_components/product/product-category/product-category.component";
import {UserGuard} from "../../_guards/user.guard";

const routes: Routes = [
    {
        path: 'produtos',
        component: MainComponent,
        canActivateChild: [UserGuard],
        children: [
            {
                path: '',
                component: ProductsListComponent
            },
            {
                path: 'novo',
                component: ProductFormComponent
            },
            {
                path: 'editar/:id',
                component: ProductFormComponent
            },
            {
                path: 'categorias',
                component: ProductCategoryComponent
            }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ProductRoutingModule {
}
