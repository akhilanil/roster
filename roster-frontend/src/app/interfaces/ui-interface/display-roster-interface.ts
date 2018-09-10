/*
  This interface is used to represent Roster UI.
*/

import { DateModel } from '@interfaces/business-interface'

export interface DisplayRosterModel {

  /* Date model for a particular date */
  calendar?: DateModel;

  /* Map consisting of participant name as key and session name as value   */
  participantSessionMap?: Map<string, string>;

  /* Set to true if the date is holiday */
  isHoliday?: boolean;

  /* Set to true if there is valid date in this particular date */
  isValid: boolean;

}
