import {Component, NgZone, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {UserService} from "../../services/user.service";
import {ActivatedRoute, Router} from "@angular/router";
import {User} from "../../models/User";

@Component({
  selector: 'app-update-user',
  templateUrl: './update-user.component.html',
  styleUrls: ['./update-user.component.css']
})
export class UpdateUserComponent implements OnInit {

  submitted = false;
  user!: User;
  userForm!: FormGroup;
  constructor(private fb: FormBuilder,
              private userService: UserService,
              private ngZone:NgZone,
              private router:Router,
              private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.user = this.activatedRoute.snapshot.data['preload'];
    this.userForm = this.fb.group({
      id: [this.user.id, [Validators.required]],
      companyName: [this.user.companyname, [Validators.required]],
      delegatename: [this.user.delegatename, [Validators.required]],
      taxnumber: [this.user.taxnumber, [Validators.required]],
      companynumber: [this.user.companynumber, [Validators.required]],
      headquarters: [this.user.headquarters, [Validators.required]],
      balance: [this.user.balance, [Validators.required]],
    });
  }

  onSubmit() {
    this.submitted = true;
    if (!this.userForm.valid) {
      return false;
    } else {
      const user = this.userForm.value;
      return this.userService.updateUser(user).subscribe({
        complete: () => {
          this.ngZone.run(() => this.router.navigateByUrl('/users'));
        },
        error: (e: any) => {
          console.log(e);
        },
      });
    }
  }

}
