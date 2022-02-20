import { Component, OnDestroy, OnInit, AfterViewInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { StudentObj } from 'src/shared/models/shared.model';
import { CoreConstants } from '../core.constants';
import { UserService } from '../user.service';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.scss'],
})
export class ResultsComponent implements OnInit, OnDestroy, AfterViewInit {
  constructor(
    private userService: UserService,
    private toastrService: ToastrService
  ) {}
  daysRemaining: number = 0;
  finalistsData!: StudentObj[];
  previousData: StudentObj[] = [];
  myInterval!: any;
  ngOnInit(): void {
    this.calculateDaysRemaining();
    this.getFinalists();
    if (this.daysRemaining <= 0) {
      this.myInterval = setInterval(() => {
        this.getFinalists();
      }, 15000);
    }
  }
  ngAfterViewInit(): void {
    const hashValue = window.location.hash;
    window.scrollTo(0, 0);
    setTimeout(() => {
      if (hashValue && hashValue.length > 0) {
        const targetElement = document.querySelector(hashValue) as HTMLElement;
        const top = targetElement.offsetTop;
        window.scrollTo({ top: top - 20, behavior: 'smooth' });
      }
    }, 350);
  }
  getStateString(stateKey: string) {
    let returnString;
    switch (stateKey) {
      case 'KA':
        returnString = 'Karnataka Champions';
        break;
      case 'TN':
        returnString = 'Tamilnadu Thalaivas';
        break;
      case 'UT':
        returnString = 'Uttarakhand Wonders';
        break;
      case 'MH':
        returnString = 'Maharashtra Warriors';
        break;
      case 'JH':
        returnString = 'Jharkhand Rockstars';
        break;
      case 'AP':
        returnString = 'Andhra Pradesh Superstars';
        break;
      case 'UP':
        returnString = 'Uttar Pradesh Challengers';
        break;
    }
    return returnString;
  }
  async getFinalists() {
    let finalistsData: StudentObj[] = [];
    try {
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
      this.updateStatus();
    } catch (error) {
      this.toastrService.error('error');
    }
  }
  updateStatus() {
    this.finalistsData.forEach((currentData: StudentObj, index: number) => {
      // if (currentData.FinalsResult == 0) {
      currentData['statusClass'] = '';
      // } else {
      //   switch (index) {
      //     case 0:
      //       currentData['statusClass'] = 'gridStatus first';
      //       break;
      //     case 1:
      //       currentData['statusClass'] = 'gridStatus second';
      //       break;
      //     case 2:
      //       currentData['statusClass'] = 'gridStatus third';
      //       break;
      //     case 3:
      //       currentData['statusClass'] = 'gridStatus fourth';
      //       break;
      //     case 4:
      //       currentData['statusClass'] = 'gridStatus fifth';
      //       break;
      //     case 5:
      //       currentData['statusClass'] = 'gridStatus sixth';
      //       break;
      //     case 6:
      //       currentData['statusClass'] = 'gridStatus seventh';
      //       break;
      //     default:
      //       break;
      //   }
      // }
    });
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
  ngOnDestroy(): void {
    if (this.daysRemaining <= 0) {
      window.clearInterval(this.myInterval);
    }
  }
}
