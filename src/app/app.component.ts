import { Component } from '@angular/core';
import { NgModule } from '@angular/core';
import { Routes, RouterModule, Router, ActivatedRoute } from '@angular/router';
declare var $: any;
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  title = 'learningSystem';
  constructor( private route: ActivatedRoute, private router: Router) {
    this.router.navigate(['/login']);
  }
}
