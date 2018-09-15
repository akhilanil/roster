/*
  This interface is used to represent the participant response
*/



export interface ParticipantRSModel {
  participant_name: string // Name of the participant
  participant_dates: string // Comma seperated dates with each part having session and date seperated by :
  per_session_count: string // Number of session worked by a participant

}
