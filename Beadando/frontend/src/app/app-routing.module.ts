import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {MachineComponent} from "./machine/machine.component";
import {AddMachineComponent} from "./machine/add-machine/add-machine.component";
import {UserComponent} from "./user/user.component";
import {UserDetailsResolver} from "./services/user-details.resolver";
import {UpdateUserComponent} from "./user/update-user/update-user.component";
import {ReplenishmentComponent} from "./user/replenishment/replenishment.component";
import {ViewUserComponent} from "./user/view-user/view-user.component";
import {RentComponent} from "./rent/rent.component";
import {RentEndComponent} from "./rent/rent-end/rent-end.component";
import {LoginComponent} from "./login/login.component";
import {RegisterComponent} from "./register/register.component";

const routes: Routes = [
  {path: '', component: LoginComponent},
  {path: "register", component: RegisterComponent,},
  //{ path: '', pathMatch: 'full', redirectTo: 'machines' },
  { path: 'machines', component: MachineComponent },
  { path: 'machines-add', component: AddMachineComponent },
  { path: 'users', component: UserComponent },
  {path: 'user-update/:id', component: UpdateUserComponent, resolve: {preload: UserDetailsResolver}},
  { path: 'replenishment/:id', component: ReplenishmentComponent , resolve: {preload: UserDetailsResolver}},
  { path: 'view-user/:id', component: ViewUserComponent , resolve: {preload: UserDetailsResolver}},
  { path: 'rent', component: RentComponent },
  { path: 'rent-end', component: RentEndComponent },


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
