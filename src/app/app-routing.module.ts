import { LoginComponent } from './login/login.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ShellComponent } from './shell/shell.component';
import { HomeComponent } from './home/home.component';
import { ResultsComponent } from './results/results.component';
import { AddScoresComponent } from './add-scores/add-scores.component';
import { AuthGuardService as AuthGuard } from 'src/shared/services/auth-guard.service';
import { AboutComponent } from './about/about.component';
const routes: Routes = [
  {
    path: '',
    component: ShellComponent,
    children: [
      {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full',
      },
      {
        path: 'login',
        component: LoginComponent,
      },
      { path: 'home', component: HomeComponent },
      { path: 'about', component: AboutComponent },
      { path: 'results', component: ResultsComponent },
      {
        path: 'add-marks',
        component: AddScoresComponent,
        canActivate: [AuthGuard],
      },
      { path: '**', redirectTo: '' },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  declarations: [],
})
export class AppRoutingModule {}
