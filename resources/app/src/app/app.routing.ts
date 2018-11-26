import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {MainComponent} from "./_components/_main/main.component";
import {DashboardComponent} from "./_components/dashboard/dashboard.component";
import {LoginComponent} from "./_components/login/login.component";
import {UserGuard} from "./_guards/user.guard";
import {RegisterComponent} from "./_components/register/register.component";

export const routes: Routes = [
    {
        path: '',
        component: MainComponent,
        canActivateChild: [UserGuard],
        children: [
            {
                path: '',
                redirectTo: 'dashboard',
                pathMatch: 'full'
            },
            {
                path: 'dashboard',
                component: DashboardComponent,
            }
        ]
    },
    {
        path: 'login',
        component: LoginComponent,
    },
    {
        path: 'registrar',
        component: RegisterComponent
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {
}