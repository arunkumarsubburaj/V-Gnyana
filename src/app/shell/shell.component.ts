import { ToastrService } from 'ngx-toastr';
import { NavigationEnd, Router } from '@angular/router';
import { Component, OnInit, AfterViewInit } from '@angular/core';
import { LoginService } from '../login/login.service';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-shell',
  templateUrl: './shell.component.html',
  styleUrls: ['./shell.component.scss'],
})
export class ShellComponent implements OnInit, AfterViewInit {
  isLoggedIn: boolean = false;
  constructor(
    private loginService: LoginService,
    private router: Router,
    private toastrService: ToastrService
  ) {}
  ngOnInit() {
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe((event: any) => {
        this.isLoggedIn = this.loginService.isLoggedIn();
      });
  }
  ngAfterViewInit() {}
  logout() {
    this.loginService.logout();
    this.router.navigateByUrl('/home');
    this.isLoggedIn = false;
    this.toastrService.success('Logout succesful!');
  }
}
