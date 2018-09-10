/*
  This interface is used to represent the participant response
*/



export interface ParticipantRSModel {
  name: string // Name of the participant
  work: string // Comma seperated dates with each part having session and date seperated by :
  sessions: string // Number of session worked by a participant

}
