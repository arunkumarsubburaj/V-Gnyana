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
  selector: 'app-add-final-scores',
  templateUrl: './add-final-scores.component.html',
  styleUrls: ['./add-final-scores.component.scss'],
})
export class AddFinalScoresComponent implements OnInit, AfterViewInit {
  constructor(
    private userService: UserService,
    private toastrService: ToastrService
  ) {}
  teamList: { viewValue: string; value: string }[] = [
    { value: 'TN', viewValue: 'Tamilnadu Thalaivas' },
    { value: 'KA', viewValue: 'Karnataka Champions' },
    { value: 'UT', viewValue: 'Uttarakhand Wonders' },
    { value: 'MH', viewValue: 'Maharashtra Warriors' },
    { value: 'JH', viewValue: 'Jharkhand Rockstars' },
    { value: 'AP', viewValue: 'Andhra Pradesh Superstars' },
    { value: 'UP', viewValue: 'Uttar Pradesh Challengers' },
  ];
  selectedTeam: { viewValue: string; value: string }[] = [];
  studentData!: StudentObj[];
  studentsOnTeam!: StudentObj[];
  previousMark!: string;
  teamDropdownSettings: any = {
    singleSelection: true,
    enableSearchFilter: true,
    classes: 'myclass custom-class',
    labelKey: 'viewValue',
    primaryKey: 'value',
    position: 'bottom',
    autoPosition: false,
  };
  @ViewChild('score') score!: ElementRef;

  ngAfterViewInit() {
    this.userService.getFinalists().subscribe(
      (res) => {
        this.studentData = res as StudentObj[];
      },
      (err) => {}
    );
  }
  ngOnInit(): void {}
  onItemSelect(item: any, selected: string) {
    const team = this.selectedTeam[0].value;
    this.studentsOnTeam = this.studentData.filter((studentObj) => {
      return studentObj.state == team;
    });
    this.getPreviousMarks(team);
  }
  updateMarks() {
    if (this.isValidate()) {
      const state = this.selectedTeam[0].value;
      let totalMark = +this.score.nativeElement.value + +this.previousMark;
      // const state =
      const payload: {
        state: string;
        marks: number;
      } = {
        marks: totalMark,
        state: state,
      };
      this.userService.updateFinalMarks(payload).subscribe((res) => {
        this.getPreviousMarks(state);
        this.score.nativeElement.value = '';
        this.toastrService.success('Marks Updated Successfully...');
      });
    } else {
      if (isNaN(+this.score.nativeElement.value)) {
        this.toastrService.error(
          'Please enter only numbers in the Marks feild.'
        );
      } else {
        this.toastrService.error('Please enter all field values...');
      }
    }
  }
  getPreviousMarks(state: string) {
    this.userService.getStateMarks(state).subscribe((res: StudentObj[]) => {
      let currentData = res[0];
      this.previousMark = currentData.FinalsResult;
    });
  }
  showStudentData() {
    return this.selectedTeam?.length > 0 && this.selectedTeam?.length > 0;
  }
  isValidate() {
    const inputValue = this.score.nativeElement.value;
    return (
      inputValue != '' && !isNaN(+inputValue) && this.selectedTeam?.length > 0
    );
  }
}
