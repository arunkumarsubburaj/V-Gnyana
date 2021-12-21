import { Router } from '@angular/router';
import {
  Component,
  OnInit,
  AfterViewInit,
  ViewChild,
  ElementRef,
} from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { LoginService } from './login.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit, AfterViewInit {
  constructor(
    private loginService: LoginService,
    private toastrService: ToastrService,
    private router: Router
  ) {}
  @ViewChild('userName') userName!: ElementRef;
  @ViewChild('password') password!: ElementRef;
  ngOnInit() {}
  ngAfterViewInit() {}
  login() {
    if (
      this.userName.nativeElement.value != '' &&
      this.password.nativeElement.value != ''
    ) {
      this.loginService
        .login({
          user_name: this.userName.nativeElement.value,
          password: this.password.nativeElement.value,
        })
        .subscribe(
          (res) => {
            if (res.code == 200) {
              this.router.navigateByUrl('/add-marks');
              this.toastrService.success(res.message);
            } else {
              this.toastrService.error(res.message);
            }
          },
          (err) => {
            this.toastrService.error(err.message);
          }
        );
    } else {
      this.toastrService.error('Both Username and Password field is required.');
    }
  }
}
