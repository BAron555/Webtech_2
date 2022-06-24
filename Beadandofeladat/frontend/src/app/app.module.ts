import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { MachineComponent } from './machine/machine.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatGridListModule} from '@angular/material/grid-list';
import {HttpClientModule} from "@angular/common/http";
import { AddMachineComponent } from './machine/add-machine/add-machine.component';
import { UserComponent } from './user/user.component';
import { UpdateUserComponent } from './user/update-user/update-user.component';
import { ReplenishmentComponent } from './user/replenishment/replenishment.component';
import { ViewUserComponent } from './user/view-user/view-user.component';
import { RentComponent } from './rent/rent.component';
import {NgSelectModule} from "@ng-select/ng-select";
import { RentEndComponent } from './rent/rent-end/rent-end.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    MachineComponent,
    AddMachineComponent,
    UserComponent,
    UpdateUserComponent,
    ReplenishmentComponent,
    ViewUserComponent,
    RentComponent,
    RentEndComponent,
    LoginComponent,
    RegisterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    MatGridListModule,
    NgSelectModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
