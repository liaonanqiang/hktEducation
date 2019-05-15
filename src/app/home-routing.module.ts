import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CustomerComponent } from './customer/customer.component';
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
  imports: [
    RouterModule.forRoot(routes),
  ],
  exports: [],
  declarations: [],
  providers: [ResolverserviceService]
})
export class HomeRoutingModule { }
