import {Component, NgZone, OnInit} from '@angular/core';
import {User} from "../../models/User";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {UserService} from "../../services/user.service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-replenishment',
  templateUrl: './replenishment.component.html',
  styleUrls: ['./replenishment.component.css']
})
export class ReplenishmentComponent implements OnInit {

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
      balance: ['', [Validators.required]],
    });
  }

  onSubmit() {
    this.submitted = true;
    if (!this.userForm.valid) {
      return false;
    } else {
      return this.userService.replenishment(this.userForm.value.id,this.userForm.value.balance).subscribe({
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
