import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'quizabled';
  // @ViewChild(ToastContainerDirective, { static: true })
  // toastContainer!: ToastContainerDirective;
  // constructor(private toastrService: ToastrService) {}
  ngOnInit() {
    // this.toastrService.overlayContainer = this.toastContainer;
  }
}
