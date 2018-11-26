import {Component, OnInit} from '@angular/core';
import {AuthService} from "../../_services/auth.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

    formUser: FormGroup;

    loadingLogin = false;
    loginFailed = false;

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
            email: [null, Validators.required],
            password: [null, Validators.required]
        })
    }

    submitLogin() {
        this.loadingLogin = true;
        let login = this.authService.auth(this.formUser.value)
            .subscribe(res => {
                this.authService.saveCredencials(res);
                this.router.navigate(['dashboard']);
            }, err => {
                this.loadingLogin = false;
                this.loginFailed = true;
            }, () => {
                login.unsubscribe();
                this.loadingLogin = false;
            });
    }

    verifyBtnDisabled() {
        return this.formUser.invalid || this.loadingLogin;
    }

}
