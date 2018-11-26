import {Component, OnInit} from '@angular/core';
import {Product} from "../../_models/Product";
import {ProductService} from "../../../_services/product.service";

import swal from 'sweetalert';
import {environment} from "../../../../environments/environment";

@Component({
    selector: 'app-products-list',
    templateUrl: './products-list.component.html',
    styleUrls: ['./products-list.component.scss']
})
export class ProductsListComponent implements OnInit {
    readonly API = environment.api;

    products: Product[];
    loading: boolean = true;

    constructor(
        private productService: ProductService
    ) {
    }

    ngOnInit() {
        this.getProducts();
    }

    getProducts() {
        this.loading = true;
        let getProducts = this.productService.getProducts()
            .subscribe(res => {
                this.products = res.data;
                this.loading = false;
            }, err => {
                console.log(err);
            }, () => {
                getProducts.unsubscribe();
            });
    }

    remove(id, index) {
        let self = this;
        swal({
            title: 'Tem certeza disso?',
            text: 'Deseja mesmo remover esse produto?',
            icon: 'warning',
            buttons: [
                'Não, não quero deletar!',
                'Sim, quero deletar!'
            ],
            dangerMode: true,
        }).then(function (isConfirm) {
            if (isConfirm) {
                let deleteProduct = self.productService.destroy(id)
                    .subscribe(res => {
                        swal({
                            text: res.message,
                            icon: res.icon
                        });

                        self.products.splice(index, 1);
                    }, err => {
                        swal({
                            text: err.message,
                            icon: 'warning'
                        })
                    }, () => {
                        deleteProduct.unsubscribe();
                    })
            }
        });
    }

    floatToBr(value) {
        let nFormat = new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL',
            minimumFractionDigits: 2,
        });

        value = nFormat.format(value);

        return value;
    }

}
