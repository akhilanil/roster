/*
  This interface is used to represent leave session of participants.
*/

export interface LeaveSessionModel {
  leaveDate: string; // Should be in "YYYY-MM-DD"
  sessionNames: Array<string> // Stores the session names of a particular date

}
