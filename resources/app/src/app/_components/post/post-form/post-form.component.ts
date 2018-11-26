import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import swal from "sweetalert";
import {PostService} from "../../../_services/post.service";
import {CategoryService} from "../../../_services/category.service";
import {Category} from "../../_models/Category";
import {environment} from "../../../../environments/environment";

@Component({
    selector: 'app-post-form',
    templateUrl: './post-form.component.html',
    styleUrls: ['./post-form.component.scss']
})
export class PostFormComponent implements OnInit {
    readonly API = environment.api;

    id: number;
    postForm: FormGroup;

    post;

    arrayCategories: Category[];

    formToSubmit: FormData = new FormData();

    constructor(
        private formBuilder: FormBuilder,
        private router: Router,
        private route: ActivatedRoute,
        private postService: PostService,
        private categoryService: CategoryService
    ) {
    }

    ngOnInit() {
        let get = this.categoryService.getPostCategory()
            .subscribe(res => {
                    console.log(res);
                    this.arrayCategories = res.data;
                }, err => console.log(err),
                () => {
                    get.unsubscribe();
                });

        this.buildForm();

        if (this.route.snapshot.params['id']) {
            this.id = this.route.snapshot.params['id'];

            let getPost = this.postService.show(this.id)
                .subscribe(res => {
                this.post = res.data;
                this.fillForm();
            }, err => console.log(err),
                () => {
                    getPost.unsubscribe();
                })
        }
    }

    buildForm() {
        this.postForm = this.formBuilder.group({
            title: [null, Validators.required],
            description: [null, Validators.required],
            photo: [null],
            categories: [null, Validators.required],
            content: [null, Validators.required]
        });
    }

    fillForm() {
        this.postForm.get('title').setValue(this.post.title);
        this.postForm.get('description').setValue(this.post.description);
        this.postForm.get('content').setValue(this.post.content);

        let categories: any = this.post.categories;
        categories = categories.map(v => {
            return v.id
        });
        this.postForm.get('categories').setValue(categories);
    }

    onFileSelected(event) {
        if (event.target.files && event.target.files[0]) {
            const photo = event.target.files[0];
            this.formToSubmit.append('photo', photo);
        }
    }

    onSubmit(): void {
        if (this.postForm.valid) {

            if (this.formToSubmit.get('photo') || this.id) {

                let categories = (JSON.stringify(this.postForm.get('categories').value));


                if (this.id) this.formToSubmit.append('id', ''+this.id);

                this.formToSubmit.append('title', this.postForm.get('title').value);
                this.formToSubmit.append('content', this.postForm.get('content').value);
                this.formToSubmit.append('description', this.postForm.get('description').value);
                this.formToSubmit.append('categories', categories);

                let submit = this.postService.postProduct(this.formToSubmit)
                    .subscribe(res => {
                            console.log(res);
                            swal({
                                text: res.message,
                                icon: res.icon
                            });
                        }, err => console.log(err),
                        () => {
                            submit.unsubscribe();
                            this.router.navigate(['/post']);
                        });
            }
        }
    }

}
