import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {Router} from "@angular/router";

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    readonly API = environment.api;

    constructor(
        private http: HttpClient,
        private router: Router
    ) {}

    auth(formUser) {
        return this.http.post(`${this.API}/login`, formUser);
    }

    register(formUser) {
        return this.http.post(`${this.API}/register`, formUser);
    }

    saveCredencials(response) {
        localStorage.setItem('jwt', response.data.token);
        localStorage.setItem('name', response.data.user.name);
        localStorage.setItem('user_id', response.data.user.id);
        localStorage.setItem('email', response.data.user.email);
    }

    check() {
        if (localStorage.getItem('jwt')) return true;
        return false;
    }

    logout() {
        localStorage.clear();
        this.router.navigate(['/login']);
    }
}