import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WelcomePageComponent } from './welcome-page/welcome-page.component';
import { LoginComponent } from './login-page/login-page.component';
import { RegisterPageComponent } from './register-page/register-page.component';
import { UserPageComponent } from './user-page/user-page.component';
import { AdminPageComponent } from './admin-page/admin-page.component';
import { AuthGuard } from './guard/auth.guard';

export const routes: Routes = [
    { path: '', redirectTo: '/welcome', pathMatch: 'full' },
    {path: 'welcome',component: WelcomePageComponent},
    {path: 'login', component: LoginComponent},
    {path: 'register', component: RegisterPageComponent},
    {path: 'user', component: UserPageComponent},
    {path: 'admin', component: AdminPageComponent, canActivate: [AuthGuard]}
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
  })
  export class AppRoutingModule { }  
