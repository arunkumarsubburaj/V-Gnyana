import { Component, OnInit } from '@angular/core';
import { StudentObj } from 'src/shared/models/shared.model';
import { CoreConstants } from '../core.constants';
import { UserService } from '../user.service';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.scss'],
})
export class ResultsComponent implements OnInit {
  constructor(private userService: UserService) {}
  daysRemaining: number = 0;
  finalistsData!: StudentObj[];
  previousData!: StudentObj[];
  ngOnInit(): void {
    this.calculateDaysRemaining();
    this.getFinalists();
  }
  getStateString(stateKey: string) {
    let returnString;
    switch (stateKey) {
      case 'KA':
        returnString = 'Karnataka';
        break;
      case 'TN':
        returnString = 'Tamilnadu';
        break;
      case 'UT':
        returnString = 'Uttarakhand';
        break;
      case 'MH':
        returnString = 'Maharashtra';
        break;
      case 'JH':
        returnString = 'Jharkhand';
        break;
      case 'AP':
        returnString = 'Andhra Pradesh';
        break;
      case 'UP':
        returnString = 'Uttar Pradesh';
        break;
    }
    return returnString;
  }
  async getFinalists() {
    let finalistsData = [];
    const finalists = await this.userService.getFinalists().toPromise();
    for (let index = 0; index < finalists.length; index++) {
      const studentData = finalists[index];
      if (!this.isAlreadyAvailable(studentData.state, finalistsData)) {
        finalistsData.push(studentData);
      }
    }
    this.finalistsData = finalistsData.sort((a, b) => {
      return +b.FinalsResult - +a.FinalsResult;
    });
    console.log(this.finalistsData);
  }
  isAlreadyAvailable(value: string, objArray: StudentObj[]) {
    return objArray.some((valueObj) => {
      return valueObj.state == value;
    });
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
