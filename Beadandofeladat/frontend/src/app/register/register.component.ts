import {Component, NgZone, OnInit} from '@angular/core';
import {AuthorizeService} from "../services/authorize.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerForm!: FormGroup;

  constructor(private userService: AuthorizeService,
              private fb: FormBuilder,
              private ngZone: NgZone,
              private router: Router
  ) { }

  ngOnInit(): void {
    this.registerForm = this.fb.group({
      username:  ['', [Validators.required, Validators.minLength(5)]],
      password:  ['', [Validators.required,Validators.minLength(5)]],
    });
  }

  register(){
    if(!this.registerForm.valid){
      return false;
    }else{
      return this.userService
        .registerUser(
          this.registerForm.value.username,
          this.registerForm.value.password
        )
        .subscribe({
          complete: () => {
            this.ngZone.run(() => this.router.navigateByUrl('/'));
          }
        })
    }
  }

}
