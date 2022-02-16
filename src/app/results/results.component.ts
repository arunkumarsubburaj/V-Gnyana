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
      if (this.previousData.length == 0) {
        this.previousData = JSON.parse(JSON.stringify(this.finalistsData));
      } else if (this.orderChanged()) {
        this.finalistsData = this.updateStatus(this.finalistsData);
        this.previousData = JSON.parse(JSON.stringify(this.finalistsData));
      }
    } catch (error) {
      this.toastrService.error('error');
    }
  }
  orderChanged() {
    let orderChanged = false;
    for (let newIndex = 0; newIndex < this.finalistsData.length; newIndex++) {
      const newData = this.finalistsData[newIndex];
      const prevData = this.previousData[newIndex];
      if (newData.state != prevData.state) {
        orderChanged = true;
      }
      if (orderChanged) break;
    }
    return orderChanged;
  }
  updateStatus(finalistsData: StudentObj[]): StudentObj[] {
    const finalReturnObj: StudentObj[] = [];
    for (let newIndex = 0; newIndex < finalistsData.length; newIndex++) {
      const currentData = finalistsData[newIndex];
      this.previousData.forEach((prevData, preIndex) => {
        if (currentData.state == prevData.state) {
          if (preIndex == newIndex) {
            currentData['statusClass'] = 'gridStatus noChange';
          } else if (preIndex > newIndex) {
            currentData['statusClass'] = 'gridStatus gained';
          } else {
            currentData['statusClass'] = 'gridStatus losed';
          }
          finalReturnObj.push(currentData);
        }
      });
    }
    return finalReturnObj;
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
