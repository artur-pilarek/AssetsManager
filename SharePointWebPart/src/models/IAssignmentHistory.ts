export interface IAssignmentHistory {
  id: number;
  assetId: number;
  employeeEmail: string;
  employeeName: string;
  assignedDate: string;
  returnedDate?: string;
  assignmentNotes?: string;
  asset?: { id: number; assetTag: string };
}