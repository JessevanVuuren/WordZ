import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { canActivate, canActivateChild } from 'src/service/auth.service';
import { CreateComponent } from './create/create.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { TestComponent } from './test/test.component';

const routes: Routes = [
  { path: "login", component: LoginComponent },
  
  { // no login debug mode only
    path: "", component: HomeComponent, children: [
      { path: "create", component: CreateComponent },
      { path: "test", component: TestComponent }
    ]
  },
  
  // {
  //   path: "", component: HomeComponent, canActivate: [canActivate], canActivateChild: [canActivateChild], children: [
  //     { path: "create", component: CreateComponent },
  //     { path: "test", component: TestComponent }
  //   ]
  // },
  { path: "**", redirectTo: "login" }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
