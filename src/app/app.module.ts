import { LoginComponent } from './login/login.component';
import { SharedModule } from './../shared/modules/shared/shared.module';
import { AuthGuardService } from './../shared/services/auth-guard.service';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ShellComponent } from './shell/shell.component';
import { LoaderInterceptor } from './loader.interceptor';
import { JwtHelperService, JWT_OPTIONS } from '@auth0/angular-jwt';
import { ToastrModule } from 'ngx-toastr';
import { AuthService } from 'src/shared/services/auth.service';
import { LoaderComponent } from './loader/loader.component';
import { HomeComponent } from './home/home.component';
import { AddScoresComponent } from './add-scores/add-scores.component';
import { AboutComponent } from './about/about.component';
import { AddFinalScoresComponent } from './add-final-scores/add-final-scores.component';
import { CommonModule } from '@angular/common';
import { ResultsComponent } from './results/results.component';

@NgModule({
  declarations: [
    AppComponent,
    ShellComponent,
    LoginComponent,
    LoaderComponent,
    HomeComponent,
    AddScoresComponent,
    AboutComponent,
    AddFinalScoresComponent,
    ResultsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CommonModule,
    BrowserAnimationsModule,
    SharedModule,
    HttpClientModule,
    ToastrModule.forRoot({
      preventDuplicates: true,
      closeButton: true,
      positionClass: 'custom-center',
    }),
  ],
  exports: [HttpClientModule],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: LoaderInterceptor, multi: true },
    { provide: JWT_OPTIONS, useValue: JWT_OPTIONS },
    JwtHelperService,
    AuthGuardService,
    AuthService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
