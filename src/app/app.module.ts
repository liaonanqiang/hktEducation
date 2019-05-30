import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
// import { HomeRoutingModule } from './home-routing.module';
import { AppComponent } from './app.component';
import { Routes,RouterModule } from '@angular/router';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import {HttpModule} from '@angular/http';
import { CustomerComponent } from './customer/customer.component';
import { CommonModule } from '@angular/common';
import { ResolverserviceService } from './resolverservice.service';
import { AlertService } from './service/alert.service';
import { UserService } from './service/user.service';
import { JwtService } from './service/jwt.service';
import { MyhttpService } from './service/myhttp.service';
import { AuthenticationService } from './service/authentication.service';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { AlertComponent } from './alert/alert.component';
import { HttpInterceptor, HttpClient, HttpErrorResponse } from '@angular/common/http';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { FormBuilder, FormGroup, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
// import { REACTIVE_FORM_DIRECTIVES } from '@angular/forms';
import { JwtModule } from '@auth0/angular-jwt';
import { DashboardComponent } from './dashboard/dashboard.component';
const routes: Routes = [
  {
    path: 'customer',
    component: CustomerComponent,
    resolve: {
      solverKey: ResolverserviceService
    },
    data: { path: '/api' }
  },
  {
    path: 'login',
    component: LoginComponent,
    // resolve: {
    //   solverKey: ResolverserviceService
    // },
    // data: { path: '/api' }
  },
    {
    path: 'dashboard',
    component: DashboardComponent,
  }
]
@NgModule({
  declarations: [
    AppComponent,
    CustomerComponent,
    LoginComponent,
    AlertComponent,
    DashboardComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    HttpModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(routes),
    JwtModule.forRoot({
      config: {
        tokenGetter: function  tokenGetter() {
             return     localStorage.getItem('access_token');},
        whitelistedDomains: [],
        blacklistedRoutes: []
      }
    })
  ],
  exports: [RouterModule],
  providers: [ ResolverserviceService,
  JwtService,
  MyhttpService
   // { provide: HTTP_INTERCEPTORS }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
