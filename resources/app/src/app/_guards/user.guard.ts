import {Injectable} from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, CanActivateChild} from '@angular/router';
import {Observable} from 'rxjs';
import {AuthService} from "../_services/auth.service";

@Injectable({
    providedIn: 'root'
})
export class UserGuard implements CanActivateChild {
    constructor(
        private authService: AuthService,
        private router: Router
    ) {}

    canActivateChild(
        next: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): Observable<boolean> | Promise<boolean> | boolean {
        if (!this.authService.check()) {
            this.router.navigate(['login']);
            return false;
        }
        return true;
    }
}
