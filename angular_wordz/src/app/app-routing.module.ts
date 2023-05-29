import { ScoreScreenComponent } from './score-screen/score-screen.component'
import { LinkWordsComponent } from './link-words/link-words.component'
import { SpellingComponent } from './spelling/spelling.component'
import { CreateComponent } from './create/create.component'
import { LoginComponent } from './login/login.component'
import { RouterModule, Routes } from '@angular/router'
import { canActivate } from 'src/service/auth.service'
import { HomeComponent } from './home/home.component'
import { NgModule } from '@angular/core'

const routes: Routes = [
  { path: "login", component: LoginComponent },

  
  { path: "", component: HomeComponent, canActivate: [canActivate] },
  { path: "create", component: CreateComponent, canActivate: [canActivate] },
  { path: "score", component: ScoreScreenComponent, canActivate: [canActivate] },
  // { path: "score", component: ScoreScreenComponent },
  { path: "link-words", component: LinkWordsComponent, canActivate: [canActivate] },
  { path: "spelling", component: SpellingComponent },

  { path: "**", redirectTo: "login" }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
