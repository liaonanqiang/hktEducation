import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
// import { REACTIVE_FORM_DIRECTIVES } from '@angular/forms'
import { first } from 'rxjs/operators';
import { JwtService } from './../service/jwt.service';
import { AlertService } from './../service/alert.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
    loginForm: FormGroup;
    loading = false;
    submitted = false;
    returnUrl: string;
    error:boolean;
    message ='';
    params;
  constructor( private formBuilder: FormBuilder, private route: ActivatedRoute, private router: Router, 
  			    private alertService: AlertService, private jwtService: JwtService) {
  		 // redirect to home if already logged in
        if (this.jwtService.currentUserValue) { 
            this.router.navigate(['/dashboard']);
        }
  }

  ngOnInit() {
  	this.loginForm = this.formBuilder.group({
            username: ['', Validators.required],
            password: ['', Validators.required]
        });
    
    this.jwtService.logout();
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/dashboard';
  }
   // convenience getter for easy access to form fields
    get f() { return this.loginForm.controls; }

    onSubmit() {
        this.submitted = true;
        // stop here if form is invalid
        if (this.loginForm.invalid) {
            return;
        }
        this.loading = true;
        
        this.jwtService.login(this.f.username.value, this.f.password.value)
            .pipe(first())
            .subscribe(
                data => {
                	// console.log(data)
                	if(data.login_status && data.account){ 
                		this.params = data.data;
                        this.router.navigate([this.returnUrl]);
                	}  else if(data.error){
                        this.loading = true;
                        this.error = data.error;
                        this.message = data.message;
                	}

                    
                },
                error => {
                	// this.error = error;
                 //    this.alertService.error(error);
                 //    this.loading = false;
                });
    }

    changed(){
    	if(this.loading && this.error){ 
    	this.loading = false;
        this.error = false;
        }
    }
}
