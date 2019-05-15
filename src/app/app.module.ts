import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
// import { HomeRoutingModule } from './home-routing.module';
import { AppComponent } from './app.component';
import { Routes,RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { CustomerComponent } from './customer/customer.component';
import { CommonModule } from '@angular/common';
import { ResolverserviceService } from './resolverservice.service';
import { ActivatedRoute, Router, Params } from '@angular/router';
const routes: Routes = [
  {
    path: 'customer',
    component: CustomerComponent,
    resolve: {
      solverKey: ResolverserviceService
    },
    data: { path: '/api' }
  }
]
@NgModule({
  declarations: [
    AppComponent,
    CustomerComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule],
  providers: [ ResolverserviceService],
  bootstrap: [AppComponent]
})
export class AppModule { }
