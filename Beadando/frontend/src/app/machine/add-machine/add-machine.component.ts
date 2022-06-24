import {Component, NgZone, OnInit} from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {MachineService} from "../../services/machine.service";

@Component({
  selector: 'app-add-machine',
  templateUrl: './add-machine.component.html',
  styleUrls: ['./add-machine.component.css']
})
export class AddMachineComponent implements OnInit {

  submitted = false;
  machineForm!: FormGroup;

  constructor(private fb: FormBuilder,
              private machineService: MachineService,
              private ngZone:NgZone,
              private router:Router) { }

  ngOnInit(): void {
    this.machineForm = this.fb.group({
      identifier:['', Validators.compose([Validators.pattern('[0-9]{6}'), Validators.required])],
      brand: ['', [Validators.required]],
      name: ['', [Validators.required]],
      type: ['', [Validators.required]],
      weight: ['', [Validators.required]],
      performance: ['', [Validators.required]],
      depositprice: ['', [Validators.required]],
      rentprice: ['', [Validators.required]],
    });
  }

  get validateFormInputs(): { [key: string]: AbstractControl } {
    return this.machineForm.controls;
  }

  onSubmit() {
    this.submitted = true;
    if (!this.machineForm.valid) {
      return false;
    } else {
      const machine = this.machineForm.value;
      return this.machineService.createMachine(machine).subscribe({
        complete: () => {
          console.log('Machine successfully created!'),
            this.ngZone.run(() => this.router.navigateByUrl('/machines'));
        },
        error: (e: any) => {
          console.log(e);
        },
      });
    }
  }
}
