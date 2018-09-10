/*
  This interface is used to represent leave session of participants.
*/

import {ParticipantModel} from './participant-interface'

export interface CreateRosterRQModel {
  title: string; // Title of Roster
  algorithmUsed: string // Algorithm used by the system
  rosterForYear: number // year for which the roster is made
  rosterForMonth: number // Month for which the roster is made
  sessionNames: Array<string> // name of sessions
  numberOfSessions: number // number of sessions
  saturdaysIncluded: Array<boolean>
  isSundayIncluded: boolean // Indicates wheter sundays are considered as working days
  holidays: Array<string> // List of holidays
  participants: Array<ParticipantModel> // List of participants
}
