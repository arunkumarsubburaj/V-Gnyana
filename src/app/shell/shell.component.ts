import { Component, OnInit, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-shell',
  templateUrl: './shell.component.html',
  styleUrls: ['./shell.component.scss'],
})
export class ShellComponent implements OnInit, AfterViewInit {
  isLoggedIn: boolean = false;
  constructor() {}
  user: any;
  isDemoUser: boolean = false;
  fontClass: string = '';
  isMenuOpen: boolean = false;
  ngOnInit() {}
  ngAfterViewInit() {}
}
