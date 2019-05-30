import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { environment } from './../../environments/environment';
import { JwtService } from './../service/jwt.service';
import { MyhttpService } from './../service/myhttp.service';
import { first } from 'rxjs/operators';
import * as $ from 'jquery';
declare var $: any;
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
   apiUrl = environment.apiUrl;
   params;
   teacher_num;
   student_num;
   level1_num;
   level2_num;
   httpSubscription;
  constructor(private route: ActivatedRoute, private router: Router, private httpClient: HttpClient, private jwtService: JwtService,
   private myhttpService: MyhttpService) {
        this.params = JSON.parse(sessionStorage.getItem('params'));
        var school_id = this.params['school_id'] || '';
        this.getValue(school_id);
    }

  ngOnInit() { }

  getValue(school_id: string) {
        // let httpOptions: Headers = this.jwtService.setTokenHeader();
        // this.httpClient.post<any>(this.apiUrl+'/api/menu/dashboard', {school_id}, httpOptions).pipe(tap(res => {
         this.httpSubscription = this.myhttpService.postUrl(this.apiUrl+'/api/menu/dashboard', school_id).pipe(first())
            .subscribe(
                data => {
                	console.log(data)
                  if(data.error){
                    sessionStorage.removeItem('access_token');
                    sessionStorage.removeItem('params');
                    sessionStorage.removeItem('currentUser');
                    this.router.navigate(['../login']);
                  }
                  this.teacher_num = data.teacher_num;
                  this.student_num = data.student_num;
                  this.level1_num = data.level1_num;
                  this.level2_num = data.level2_num;
                    
                },
                error => {
                	console.log("error",error)
                });

  }
       ngOnDestroy() {
          this.httpSubscription.unsubscribe();
        }

}
