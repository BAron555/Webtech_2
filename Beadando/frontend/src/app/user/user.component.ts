import { Component, OnInit } from '@angular/core';
import {UserService} from "../services/user.service";
import {User} from "../models/User";

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  users!: User[];
  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.userService.getAllUser().subscribe(data => this.users = data);
  }

  delete(id:any){
    this.userService.deleteUserById(id);
    this.userService.getAllUser().subscribe(data => this.users = data);
    this.ngOnInit();
  }
}
