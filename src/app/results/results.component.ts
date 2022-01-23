import { Component, OnInit } from '@angular/core';
import { CoreConstants } from '../core.constants';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.scss'],
})
export class ResultsComponent implements OnInit {
  constructor() {}
  daysRemaining: number = 0;
  ngOnInit(): void {
    this.calculateDaysRemaining();
  }

  calculateDaysRemaining() {
    const finalsDate = new Date(CoreConstants.finalsDate);
    const todaysDate = new Date(
      new Date().getMonth() +
        1 +
        '/' +
        new Date().getDate() +
        '/' +
        new Date().getFullYear()
    );
    // To calculate the time difference of two dates
    var Difference_In_Time = finalsDate.getTime() - todaysDate.getTime();
    // To calculate the no. of days between two dates
    this.daysRemaining = Difference_In_Time / (1000 * 3600 * 24);
    // this.daysRemaining = 0; // Uncomment this to view the slider
  }
}
