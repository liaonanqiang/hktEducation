
import {filter,  take, mergeMap, catchError, map } from 'rxjs/operators';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { NavigationEnd } from '@angular/router';



@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css']
})
export class CustomerComponent implements OnInit {
  name = "customer";
  obj: any[];
  constructor(private route: ActivatedRoute, private router: Router) {
    this.subTopic();
  }

  ngOnInit() { }

  subTopic() {

    this.router
      .events.pipe(
      filter(e => e instanceof NavigationEnd),
      map(() => this.route),
      map(route => {
        if (route.firstChild) {
          route = route.firstChild;
        }
        return route;
      }),
      filter(route => route.outlet === 'primary'),
      mergeMap(route => route.data),)
      .subscribe(e => {
        console.log('eeeeeeeeeeeeeeeee')
        console.log(JSON.parse(e.solverKey.data))
        //console.log(JSON.parse(JSON.parse(e.solverKey._body).data));
        this.obj = JSON.parse(e.solverKey.data);
      }); // outputs my `data`
  }

}
