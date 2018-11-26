import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PostRoutingModule } from './post-routing.module';
import {PostListComponent} from "../../_components/post/post-list/post-list.component";
import {PostFormComponent} from "../../_components/post/post-form/post-form.component";
import {HttpClientModule} from "@angular/common/http";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {PipesModule} from "../pipes/pipes.module";
import {NgSelectModule} from "@ng-select/ng-select";
import {PostCategoryComponent} from "../../_components/post/post-category/post-category.component";

@NgModule({
  imports: [
      CommonModule,
      PostRoutingModule,
      HttpClientModule,
      FormsModule,
      ReactiveFormsModule,
      PipesModule,
      NgSelectModule
  ],
    declarations: [
        PostListComponent,
        PostFormComponent,
        PostCategoryComponent
    ]
})
export class PostModule {
}
