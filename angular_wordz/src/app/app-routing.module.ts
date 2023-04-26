import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { canActivate, canActivateChild } from 'src/service/auth.service';
import { CreateComponent } from './create/create.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { TestComponent } from './test/test.component';
import { LinkWordsComponent } from './link-words/link-words.component';
import { ScoreScreenComponent } from './score-screen/score-screen.component';

const routes: Routes = [
  { path: "login", component: LoginComponent },

  
  { path: "", component: HomeComponent, canActivate: [canActivate] },
  { path: "test", component: TestComponent, canActivate: [canActivate] },
  { path: "create", component: CreateComponent, canActivate: [canActivate] },
  { path: "score", component: ScoreScreenComponent, canActivate: [canActivate] },
  { path: "score", component: ScoreScreenComponent },
  { path: "link-words", component: LinkWordsComponent, canActivate: [canActivate] },

  { path: "**", redirectTo: "login" }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
