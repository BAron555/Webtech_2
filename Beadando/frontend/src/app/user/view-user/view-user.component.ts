import {Component, OnInit} from '@angular/core';
import {User} from "../../models/User";
import {ActivatedRoute} from "@angular/router";
import {Bill} from "../../models/Bill";
import {BillService} from "../../services/bill.service";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-view-user',
  templateUrl: './view-user.component.html',
  styleUrls: ['./view-user.component.css']
})
export class ViewUserComponent implements OnInit {
  user!: User;
  bills: Bill[] = [];
  billForm!: FormGroup;
  submitted = false;

  constructor(private billService: BillService,
              private activatedRoute: ActivatedRoute,
              private fb: FormBuilder,) {
  }

  ngOnInit(): void {

    this.user = this.activatedRoute.snapshot.data['preload'];
    this.billForm = this.fb.group({
      id: new FormControl(this.user.id),
      start: new FormControl(null, [Validators.required]),
      end: new FormControl(null, [Validators.required]),
    });

  }

  async onSubmit() {
    if (!this.billForm.valid) {
    } else {
      this.submitted = true;
      this.billService.postDates(this.billForm.value.id, this.billForm.value.start, this.billForm.value.end).subscribe((bills) => {{
        this.bills = bills;
        console.log(this.bills);
      }});
    }
  }

}
