export interface StudentObj {
  studentId: string;
  studentName: string;
  state: string;
  grade: string;
  teamNumber: string;
  centerName: string;
  semiFinalsResult?: any;
  FinalsResult?: any;
  FinalsQualified?: any;
  isWinner?: any;
  isBackupTeam: number;
  statusClass?: string;
}
