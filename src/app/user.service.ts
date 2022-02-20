import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { StudentObj } from 'src/shared/models/shared.model';
import { environment } from 'src/environments/environment';

export interface UpdatePayload {
  teamNumber: string;
  round1Mark: number;
  round2Mark: number;
  round2Bonus: number;
  state: string;
  totalMark: number;
}
@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {}
  getStudents() {
    return this.http.get(environment.apiUrl + '/getStudents') as Observable<
      StudentObj[]
    >;
  }
  updateSemiMarks(payLoad: UpdatePayload) {
    return this.http.post(environment.apiUrl + '/updateSemiMarks', payLoad);
  }
  getFinalists() {
    // return this.http.get(environment.apiUrl + '/getFinalists') as Observable<
    //   StudentObj[]
    // >;
    return of([
      {
        studentId: '29238',
        studentName: 'M Supriya',
        state: 'TN',
        grade: '8',
        teamNumber: '10',
        centerName: 'Vilanallur',
        semiFinalsResult: '44',
        FinalsResult: '40',
        FinalsQualified: 1,
        isWinner: null,
        isBackupTeam: 0,
      },
      {
        studentId: '23551',
        studentName: 'K Prithee',
        state: 'TN',
        grade: '8',
        teamNumber: '10',
        centerName: 'Vilanallur',
        semiFinalsResult: '44',
        FinalsResult: '40',
        FinalsQualified: 1,
        isWinner: null,
        isBackupTeam: 0,
      },
      {
        studentId: '23558',
        studentName: 'G Hemalatha',
        state: 'TN',
        grade: '8',
        teamNumber: '10',
        centerName: 'Vilanallur',
        semiFinalsResult: '44',
        FinalsResult: '40',
        FinalsQualified: 1,
        isWinner: null,
        isBackupTeam: 0,
      },
      {
        studentId: '30337',
        studentName: 'Kunal Kale',
        state: 'MH',
        grade: '7',
        teamNumber: '12',
        centerName: 'Hivarezare',
        semiFinalsResult: '31',
        FinalsResult: '55',
        FinalsQualified: 1,
        isWinner: null,
        isBackupTeam: 0,
      },
      {
        studentId: '30348',
        studentName: 'Nikita Kate,',
        state: 'MH',
        grade: '7',
        teamNumber: '12',
        centerName: 'Hivarezare',
        semiFinalsResult: '31',
        FinalsResult: '55',
        FinalsQualified: 1,
        isWinner: null,
        isBackupTeam: 0,
      },
      {
        studentId: '194073',
        studentName: 'Sarthak Borhade',
        state: 'MH',
        grade: '7',
        teamNumber: '12',
        centerName: 'Hivarezare',
        semiFinalsResult: '31',
        FinalsResult: '55',
        FinalsQualified: 1,
        isWinner: null,
        isBackupTeam: 0,
      },
      {
        studentId: '31214',
        studentName: 'K Anil Kumar',
        state: 'AP',
        grade: '8',
        teamNumber: '16',
        centerName: 'Cheekalabylu',
        semiFinalsResult: '45',
        FinalsResult: '76',
        FinalsQualified: 1,
        isWinner: null,
        isBackupTeam: 0,
      },
      {
        studentId: '69840',
        studentName: 'B Sudhakara',
        state: 'AP',
        grade: '8',
        teamNumber: '16',
        centerName: 'Cheekalabylu',
        semiFinalsResult: '45',
        FinalsResult: '76',
        FinalsQualified: 1,
        isWinner: null,
        isBackupTeam: 0,
      },
      {
        studentId: '31300',
        studentName: 'K Mounika',
        state: 'AP',
        grade: '8',
        teamNumber: '16',
        centerName: 'Cheekalabylu',
        semiFinalsResult: '45',
        FinalsResult: '76',
        FinalsQualified: 1,
        isWinner: null,
        isBackupTeam: 0,
      },
      {
        studentId: '29573',
        studentName: 'Kavyasree Madiwalar',
        state: 'KA',
        grade: '7',
        teamNumber: '23',
        centerName: 'GHPS mugad vajra',
        semiFinalsResult: null,
        FinalsResult: '71',
        FinalsQualified: 1,
        isWinner: null,
        isBackupTeam: 0,
      },
      {
        studentId: '186358',
        studentName: 'Pakirappa Hulakoppa',
        state: 'KA',
        grade: '7',
        teamNumber: '23',
        centerName: 'GHPS mugad vajra',
        semiFinalsResult: null,
        FinalsResult: '71',
        FinalsQualified: 1,
        isWinner: null,
        isBackupTeam: 0,
      },
      {
        studentId: '186359',
        studentName: 'Thirthakumar Kumbar',
        state: 'KA',
        grade: '7',
        teamNumber: '23',
        centerName: 'GHPS mugad vajra',
        semiFinalsResult: null,
        FinalsResult: '71',
        FinalsQualified: 1,
        isWinner: null,
        isBackupTeam: 0,
      },
      {
        studentId: '38180',
        studentName: 'Ravi',
        state: 'UP',
        grade: '8',
        teamNumber: '3',
        centerName: 'Haluapar',
        semiFinalsResult: '34',
        FinalsResult: '76',
        FinalsQualified: 1,
        isWinner: null,
        isBackupTeam: 0,
      },
      {
        studentId: '66937',
        studentName: 'Abhishek',
        state: 'UP',
        grade: '8',
        teamNumber: '3',
        centerName: 'Haluapar',
        semiFinalsResult: '34',
        FinalsResult: '76',
        FinalsQualified: 1,
        isWinner: null,
        isBackupTeam: 0,
      },
      {
        studentId: '104643',
        studentName: 'Phoolchand',
        state: 'UP',
        grade: '8',
        teamNumber: '3',
        centerName: 'Haluapar',
        semiFinalsResult: '34',
        FinalsResult: '76',
        FinalsQualified: 1,
        isWinner: null,
        isBackupTeam: 0,
      },
      {
        studentId: '30950',
        studentName: 'APRAJITA VERMA',
        state: 'JH',
        grade: '8',
        teamNumber: '30',
        centerName: 'Koymara',
        semiFinalsResult: '44',
        FinalsResult: '76',
        FinalsQualified: 1,
        isWinner: null,
        isBackupTeam: 0,
      },
      {
        studentId: '20384',
        studentName: 'DEEPIKA KUMARI',
        state: 'JH',
        grade: '8',
        teamNumber: '30',
        centerName: 'Koymara',
        semiFinalsResult: '44',
        FinalsResult: '76',
        FinalsQualified: 1,
        isWinner: null,
        isBackupTeam: 0,
      },
      {
        studentId: '20717',
        studentName: 'SWATI KUMARI',
        state: 'JH',
        grade: '8',
        teamNumber: '30',
        centerName: 'Koymara',
        semiFinalsResult: '44',
        FinalsResult: '76',
        FinalsQualified: 1,
        isWinner: null,
        isBackupTeam: 0,
      },
      {
        studentId: '27478',
        studentName: 'Deepak Bhatt',
        state: 'UT',
        grade: '8',
        teamNumber: '31',
        centerName: 'Hartola',
        semiFinalsResult: '44',
        FinalsResult: '30',
        FinalsQualified: 1,
        isWinner: null,
        isBackupTeam: 0,
      },
      {
        studentId: '27480',
        studentName: 'Tanmay Bhatt',
        state: 'UT',
        grade: '8',
        teamNumber: '31',
        centerName: 'Hartola',
        semiFinalsResult: '44',
        FinalsResult: '30',
        FinalsQualified: 1,
        isWinner: null,
        isBackupTeam: 0,
      },
      {
        studentId: '28697',
        studentName: 'Bhawna pandey',
        state: 'UT',
        grade: '8',
        teamNumber: '31',
        centerName: 'Hartola',
        semiFinalsResult: '44',
        FinalsResult: '30',
        FinalsQualified: 1,
        isWinner: null,
        isBackupTeam: 0,
      },
    ]);
  }
  getStateMarks(state: string) {
    return this.http.get(
      environment.apiUrl + '/getStateMarks?state=' + state
    ) as Observable<StudentObj[]>;
  }
  updateFinalMarks(payload: { state: string; marks: number }) {
    return this.http.put(environment.apiUrl + '/updateFinalMarks', payload);
  }
}
