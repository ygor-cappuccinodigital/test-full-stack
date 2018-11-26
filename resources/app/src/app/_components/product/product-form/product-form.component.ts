import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {ProductService} from "../../../_services/product.service";
import {Product} from "../../_models/Product";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Category} from "../../_models/Category";
import {CategoryService} from "../../../_services/category.service";
import {ActivatedRoute, Router} from "@angular/router";
import swal from "sweetalert";
import {environment} from "../../../../environments/environment";

declare var $: any;

@Component({
    selector: 'app-product-form',
    templateUrl: './product-form.component.html',
    styleUrls: ['./product-form.component.scss']
})
export class ProductFormComponent implements OnInit {

    readonly API = environment.api;

    id;
    product: Product;
    arrayCategories: Category[];

    photo;

    formToSubmit: FormData = new FormData();

    productForm: FormGroup;

    constructor(
        private productService: ProductService,
        private categoryService: CategoryService,
        private formBuilder: FormBuilder,
        private router: Router,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.buildForm();

        this.id = this.route.snapshot.params['id'] || null;

        if (this.id) this.getProduct();

        let get = this.categoryService.getProductsCategory()
            .subscribe(res => {
                    this.arrayCategories = res.data;
                }, err => console.log(err),
                () => {
                    get.unsubscribe();
                });
    }

    buildForm() {
        this.productForm = this.formBuilder.group({
            title: [null, Validators.required],
            price: [null, Validators.required],
            photo: [null],
            categories: [null, Validators.required],
            status: [null]
        });
    }

    getProduct() {
        let getProduct = this.productService.show(this.id)
            .subscribe(res => {
                this.product = res.data
            }, err => {
                console.log(err)
            }, () => {
                getProduct.unsubscribe();
                this.fillForm();
            });
    }

    fillForm() {
        this.productForm.controls['title'].patchValue(this.product.title);
        this.productForm.controls['price'].patchValue(this.product.price);

        let categories: any = this.product.categories;
        categories = categories.map(v => {
            return v.id
        });

        this.productForm.controls['categories'].patchValue(categories);
    }

    onFileSelected(event) {
        if (event.target.files && event.target.files[0]) {
            const photo = event.target.files[0];
            this.formToSubmit.append('photo', photo);
        }
    }

    onSubmit() {
        if (this.productForm.valid ) {

            if (this.formToSubmit.get('photo') || this.id) {

                let categories = (JSON.stringify(this.productForm.get('categories').value));

                if (this.id) this.formToSubmit.append('id', this.id);

                this.formToSubmit.append('title', this.productForm.get('title').value);
                this.formToSubmit.append('price', this.productForm.get('price').value);
                this.formToSubmit.append('categories', categories);
                this.formToSubmit.append('status', '1');
                let create = this.productService.postProduct(this.formToSubmit)
                    .subscribe(res => {
                        swal({
                            text: res.message,
                            icon: res.icon
                        });
                    }, err => {
                        console.log(err)
                    }, () => {
                        create.unsubscribe();
                        this.router.navigate(['/produtos']);
                    });
            }
        }
    }

    btnSubmitCheckStyle(param) {
        if (param == 'add') return {'disabled' : (this.productForm.invalid || !this.formToSubmit.get('photo'))};
        if (param == 'edit') return {'disabled' : (this.productForm.invalid)};
    }
}
