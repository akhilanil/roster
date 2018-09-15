/*
  This interface is used to represent the roster create response from server
*/

import { ParticipantRSModel } from './participant-rs-interface'


export interface CreateRosterRSModel {
  unique_id?: string // Unique ID if the user is logged in
  user_name?: string // Name of the logged in user_name
  month: string | number // Month for which roster is prepared
  year: string | number // Year for which roster is prepared
  title: string // Title of the roster prepared
  user_rosters: Array<ParticipantRSModel>
}
