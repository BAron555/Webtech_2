import { Component, OnInit } from '@angular/core';
import {MachineService} from "../services/machine.service";
import {Machine} from "../models/Machine";
import {lastValueFrom} from "rxjs";

@Component({
  selector: 'app-machine',
  templateUrl: './machine.component.html',
  styleUrls: ['./machine.component.css']
})
export class MachineComponent implements OnInit {

  constructor(private machineService: MachineService) { }

  machines!: Machine[];

   ngOnInit() {
    try{
      this.machineService.getallMachine().subscribe(data => this.machines = data);
    }catch (err){
     console.log(err);
    }
  }

  delete(id:any){
    this.machineService.deleteMachineById(id);
  }
}
