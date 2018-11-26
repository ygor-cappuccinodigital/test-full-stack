import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../../_services/auth.service";
import {Router} from "@angular/router";
import swal from "sweetalert";

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

    formUser: FormGroup;

    submitLoading = false;

    constructor(
        private authService: AuthService,
        private formBuilder: FormBuilder,
        private router: Router
    ) {
    }

    ngOnInit() {
        this.buildForm();
    }

    buildForm() {
        this.formUser = this.formBuilder.group({
            name: [null, Validators.required],
            email: [null, Validators.required],
            password: [null, Validators.required]
        })
    }

    submitRegister() {
        this.submitLoading = true;
        this.authService.register(this.formUser.value)
            .subscribe(res => {
                this.submitLoading = false;
                this.router.navigate(['login']);
                swal({
                    text: 'Usuário cadastrado com sucesso',
                    icon: 'success'
                })
            }, err => {
                swal({
                    text: err.error.message,
                    icon: 'warning'
                });
                this.submitLoading = false;
            })
    }

    verifyBtnDisabled() {
        return this.formUser.invalid || this.submitLoading;
    }

}
