import { UpdatePayload } from './../user.service';
import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { StudentObj } from 'src/shared/models/shared.model';
import { UserService } from '../user.service';

@Component({
  selector: 'app-add-scores',
  templateUrl: './add-scores.component.html',
  styleUrls: ['./add-scores.component.scss'],
})
export class AddScoresComponent implements OnInit, AfterViewInit {
  constructor(
    private userService: UserService,
    private toastrService: ToastrService
  ) {}
  stateList!: { viewValue: string; value: string }[];
  teamList!: { viewValue: string; value: string }[];
  selectedState: { viewValue: string; value: string }[] = [];
  selectedTeam: { viewValue: string; value: string }[] = [];
  studentData!: StudentObj[];
  studentsOnTeam!: StudentObj[];
  stateDropdownSettings: any = {
    singleSelection: true,
    enableSearchFilter: true,
    classes: 'myclass custom-class',
    labelKey: 'viewValue',
    primaryKey: 'value',
    position: 'bottom',
    autoPosition: false,
  };
  teamDropdownSettings: any = {
    singleSelection: true,
    enableSearchFilter: true,
    classes: 'myclass custom-class',
    labelKey: 'viewValue',
    primaryKey: 'value',
    position: 'bottom',
    autoPosition: false,
  };
  @ViewChild('level2Score') level2Score!: ElementRef;

  ngAfterViewInit() {
    this.getStudentList();
  }
  ngOnInit(): void {}
  getStudentList() {
    this.userService.getStudents().subscribe(
      (res) => {
        this.studentData = res;
        this.stateList = this.filteredArray('state');
        this.teamList = [];
      },
      (err) => {
        this.toastrService.error(err.message);
      }
    );
  }
  onItemSelect(item: any, selected: string) {
    const state = this.selectedState[0].value;
    switch (selected) {
      case 'state':
        this.selectedTeam.length = 0;
        this.teamList = this.filteredArray('teamNumber', state);
        break;
      case 'team':
        const team = this.selectedTeam[0].value;
        this.studentsOnTeam = this.studentData.filter((studentObj) => {
          return studentObj.teamNumber == team && studentObj.state == state;
        });
        break;

      default:
        break;
    }
  }
  filteredArray(columnName: string, state?: string) {
    let returnArray: any = [];
    this.studentData.forEach((studentObj) => {
      switch (columnName) {
        case 'teamNumber':
          if (!this.isAlreadyAvailable(studentObj.teamNumber, returnArray)) {
            if (
              studentObj.semiFinalsResult == null &&
              studentObj.state == state
            ) {
              returnArray.push({
                value: studentObj.teamNumber,
                viewValue: 'Team ' + studentObj.teamNumber,
              });
            }
          }
          break;
        case 'state':
          if (!this.isAlreadyAvailable(studentObj.state, returnArray)) {
            returnArray.push({
              value: studentObj.state,
              viewValue: this.getStateString(studentObj.state),
            });
          }
          break;

        default:
          break;
      }
    });
    if (columnName == 'state') {
      returnArray = returnArray.sort(
        (
          item1: { value: string; viewValue: string },
          item2: { value: string; viewValue: string }
        ) => {
          if (item1.value < item2.value) return -1;
          if (item1.value > item2.value) return 1;
          return 0;
        }
      );
    } else {
      returnArray = returnArray.sort(
        (
          item1: { value: string; viewValue: string },
          item2: { value: string; viewValue: string }
        ) => {
          return +item1.value - +item2.value;
        }
      );
    }
    return returnArray;
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
    }
    return returnString;
  }
  isAlreadyAvailable(
    value: string,
    objArray: { value: string; viewValue: string }[]
  ) {
    return objArray.some((valueObj) => {
      return valueObj.value == value;
    });
  }
  updateMarks() {
    if (this.isValidate()) {
      const mark1 = 0;
      const mark2 = +this.level2Score.nativeElement.value;
      const bonusMark = 0;
      const totalMark = mark1 + mark2 + bonusMark;
      const state = this.selectedState[0].value;
      const teamNumber = this.selectedTeam[0].value;
      const payload: UpdatePayload = {
        round1Mark: mark1,
        round2Mark: mark2,
        round2Bonus: bonusMark,
        totalMark: totalMark,
        state: state,
        teamNumber: teamNumber,
      };
      this.userService.updateSemiMarks(payload).subscribe(
        (res: any) => {
          this.toastrService.success(res.message);
          this.level2Score.nativeElement.value = null;
          this.selectedState.length = 0;
          this.selectedTeam.length = 0;
          this.getStudentList();
        },
        (err) => {
          this.toastrService.error(err.message);
        }
      );
    } else {
      if (isNaN(+this.level2Score.nativeElement.value)) {
        this.toastrService.error(
          'Please enter only numbers in the Marks feild.'
        );
      } else {
        this.toastrService.error('Please enter all field values...');
      }
    }
  }
  showStudentData() {
    return this.selectedState?.length > 0 && this.selectedTeam?.length > 0;
  }
  isValidate() {
    const inputValue = this.level2Score.nativeElement.value;
    return (
      inputValue != '' &&
      !isNaN(+inputValue) &&
      +inputValue >= 0 &&
      this.selectedState?.length > 0 &&
      this.selectedTeam?.length > 0
    );
  }
}
