import {Component, NgZone, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {User} from "../../models/User";
import {Machine} from "../../models/Machine";
import {UserService} from "../../services/user.service";
import {MachineService} from "../../services/machine.service";
import {Router} from "@angular/router";
export enum EnumType {
  Nem ,
  Igen,
}
@Component({
  selector: 'app-rent-end',
  templateUrl: './rent-end.component.html',
  styleUrls: ['./rent-end.component.css']
})
export class RentEndComponent implements OnInit {
  broke: Array<string> = Object.keys(EnumType).filter(key => isNaN(+key));

  submitted = false;
  rentForm!: FormGroup;

  users: User[]=[];
  usersArray: User[]=[];
  machines: Machine[] = [];

  count !: number;
  userIdList: Array<number> = [];


  constructor(private userService: UserService,
              private machineService: MachineService,
              private fb: FormBuilder,
              private ngZone: NgZone,
              private router: Router
  ) {
  }

   ngOnInit(): void {
    this.userService.getAllUser().subscribe(data => {
      this.users = data;
      this.users.forEach(u => u);
      this.userIdList = [];

      this.usersArray = this.users.filter(u => u.machines?.length > 0);

    });

    this.machineService.getallMachine().subscribe(data => {

    });

    this.rentForm = this.fb.group({
      userId: ['', [Validators.required]],
      machineId: ['', [Validators.required]],
      date: ['', [Validators.required]],
      days: ['',Validators.required],
      broke: ['', [Validators.required]],

    });

    this.rentForm.get('userId').valueChanges.subscribe((val) => {
      this.machines = this.users.find(u => u.id === val).machines;
    })
  }


  onSubmit() {
    this.submitted = true;
    if (!this.rentForm.valid) {
      return false;
    } else {
      return this.userService.endRent(this.rentForm.value.userId, this.rentForm.value.machineId, this.rentForm.value.date,this.rentForm.value.days,this.rentForm.value.broke).subscribe({
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
