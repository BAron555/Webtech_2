import {Component, NgZone, OnInit} from '@angular/core';
import {UserService} from "../services/user.service";
import {MachineService} from "../services/machine.service";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {User} from "../models/User";
import {Machine} from "../models/Machine";
import {Router} from "@angular/router";

@Component({
  selector: 'app-rent',
  templateUrl: './rent.component.html',
  styleUrls: ['./rent.component.css']
})
export class RentComponent implements OnInit {

  submitted = false;
  rentForm!: FormGroup;

  users!: User[];
  machines: Machine[] = [];

  count !: number;


  constructor(private userService: UserService,
              private machineService: MachineService,
              private fb: FormBuilder,
              private ngZone: NgZone,
              private router: Router
  ) {
  }

  ngOnInit(): void {
    this.userService.getAllUser().subscribe(data => {
      this.users = [];
      data.filter(u => u.balance > -50000).forEach(u => this.users.push(u));
    });

    this.machineService.getallMachine().subscribe(data =>{
      this.machines = [];
      data.filter(u => u.rentstatus === "false").forEach(u => this.machines.push(u));
    });

    this.rentForm = this.fb.group({
      userId: ['', [Validators.required]],
      machineId: ['', [Validators.required]],
      date: ['', [Validators.required]]
    });

  }



  onSubmit() {
    console.log(this.users.forEach(u => u));
    console.log(this.rentForm.value.date);
    this.submitted = true;
    if (!this.rentForm.valid) {
      return false;
    } else {
      return this.userService.createRent(this.rentForm.value.userId,this.rentForm.value.machineId,this.rentForm.value.date).subscribe({
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
