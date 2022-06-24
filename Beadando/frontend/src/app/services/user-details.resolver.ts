import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable, of } from 'rxjs';
import {User} from "../models/User";
import {UserService} from "./user.service";

@Injectable({
  providedIn: 'root'
})
export class UserDetailsResolver implements Resolve<User> {
  constructor(private userService: UserService) {
  }
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<User> {
    return this.userService.getUserById(Number(route.params['id']));
  }
}
