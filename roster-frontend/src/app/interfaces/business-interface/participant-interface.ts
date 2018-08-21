/*
  This interface is used to represent a participants.
*/

import {LeaveSessionModel} from './leave-session-interface'

export interface ParticipantModel {
  name: string; // Name of participant
  leaveSessions: Array<LeaveSessionModel> // Stores the leave sessions
}
