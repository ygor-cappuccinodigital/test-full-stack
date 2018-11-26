import {Component, OnInit} from '@angular/core';
import {Category} from "../../_models/Category";
import {CategoryService} from "../../../_services/category.service";
import swal from "sweetalert";

@Component({
    selector: 'app-product-category',
    templateUrl: './product-category.component.html',
    styleUrls: ['./product-category.component.scss']
})
export class ProductCategoryComponent implements OnInit {

    categories: Category[];

    categoryName;

    constructor(
        private categoryService: CategoryService
    ) {
    }

    ngOnInit() {
        this.categoryService.getProductsCategory()
            .subscribe(res => {
                this.categories = res.data;
            });
    }

    setName(value) {
        this.categoryName = value;
    }

    createCategory() {
        let form = new FormData();
        form.append('name', this.categoryName);
        this.categoryService.createProductCategory(form)
            .subscribe(res => {
                this.categories.push(res.data);
            }, err => console.log(err));
    }

    remove(id, index) {
        let self = this;
        swal({
            title: 'Tem certeza disso?',
            text: 'Deseja mesmo remover essa categoria?',
            icon: 'warning',
            buttons: [
                'Não, não quero deletar!',
                'Sim, quero deletar!'
            ],
            dangerMode: true,
        }).then(function (isConfirm) {
            if (isConfirm) {
                let deleteCategory = self.categoryService.productDestroy(id)
                    .subscribe(res => {
                        swal({
                            text: res.message,
                            icon: res.icon
                        });

                        self.categories.splice(index, 1);
                    }, err => {
                        swal({
                            text: err.message,
                            icon: 'warning'
                        })
                    }, () => {
                        deleteCategory.unsubscribe();
                    })
            }
        });
    }

}
