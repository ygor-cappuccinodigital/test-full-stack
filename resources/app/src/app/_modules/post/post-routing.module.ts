import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PostFormComponent } from "../../_components/post/post-form/post-form.component";
import { PostListComponent } from "../../_components/post/post-list/post-list.component";
import { MainComponent } from "../../_components/_main/main.component";
import {PostCategoryComponent} from "../../_components/post/post-category/post-category.component";
import {UserGuard} from "../../_guards/user.guard";

const routes: Routes = [
    {
        path: 'post',
        component: MainComponent,
        canActivateChild: [UserGuard],
        children: [
            {
                path: '',
                component: PostListComponent
            },
            {
                path: 'novo',
                component: PostFormComponent
            },
            {
                path: 'categorias',
                component: PostCategoryComponent
            },
            {
                path: 'editar/:id',
                component: PostFormComponent
            }
        ]
    }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PostRoutingModule { }