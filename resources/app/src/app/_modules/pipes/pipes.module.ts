import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FloatToBrPipe} from "../../pipies/float-to-br.pipe";

@NgModule({
    imports: [
        CommonModule,
    ],
    declarations: [
        FloatToBrPipe
    ],
    exports: [
        FloatToBrPipe
    ]
})
export class PipesModule {
}
