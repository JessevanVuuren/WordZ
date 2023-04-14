import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { canActivate, canActivateChild } from 'src/service/auth.service';
import { CreateComponent } from './create/create.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { TestComponent } from './test/test.component';
import { OptionsComponent } from './options/options.component';
import { LinkWordsComponent } from './link-words/link-words.component';

const routes: Routes = [
  { path: "login", component: LoginComponent },

  { path: "", component: LinkWordsComponent },

  // { path: "", component: HomeComponent, canActivate: [canActivate] },
  // { path: "test", component: TestComponent, canActivate: [canActivate] },
  // { path: "options", component: OptionsComponent, canActivate: [canActivate] },
  // { path: "create", component: CreateComponent, canActivate: [canActivate] },

  { path: "**", redirectTo: "login" }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
