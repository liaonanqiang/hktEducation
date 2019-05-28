import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
   params;
  constructor(private route: ActivatedRoute, private router: Router, private httpClient: HttpClient) { }

  ngOnInit() {
        if(sessionStorage.getItem('params'))
        this.params = JSON.parse(sessionStorage.getItem('params'));
        this.httpClient.post<any>(this.apiUrl+'/api/menu/dashboard', {this.params['school_id']}).pipe(tap(res => {
    	// console.log(res)
           
	    }))
 
  }

}
