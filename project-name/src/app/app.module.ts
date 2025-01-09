import { NgModule } from "@angular/core";
import { AppComponent } from "./app.component";
import { BrowserModule } from "@angular/platform-browser";
import { FormsModule } from "@angular/forms";
import { HttpClient, HttpClientModule } from "@angular/common/http";
import { AppRoutingModule } from "./app.routes";
import { WelcomePageComponent } from "./welcome-page/welcome-page.component";
import { LoginComponent } from "./login-page/login-page.component"
import { RegisterPageComponent } from "./register-page/register-page.component";
import { UserPageComponent } from "./user-page/user-page.component";
import { CommonModule } from '@angular/common'; // <-- Import CommonModule
import { AdminPageComponent } from "./admin-page/admin-page.component";


@NgModule({
    declarations: [
      AppComponent,
      WelcomePageComponent,
      LoginComponent,
      RegisterPageComponent,
      UserPageComponent,
      AdminPageComponent
    ],
    imports: [
      BrowserModule,
      FormsModule,
      AppRoutingModule,
      HttpClient,
      CommonModule
    ],
    providers: [],
    bootstrap: [AppComponent]
  })
  export class AppModule { }