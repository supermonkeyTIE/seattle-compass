export interface Resource {
  id: number;
  name: string;
  address: string;
  phone: string;
  hours: string;
  description: string;
  description_es: string;
  neighborhood: string;
  tags: string[];
  services?: string[];
  website?: string;
  intakeProcess?: string;
  intakeProcess_es?: string;
}

export interface Hotline {
  id: number;
  name: string;
  name_es: string;
  phone: string;
  description: string;
  description_es: string;
  available: string;
}

export interface VolunteerOpportunity {
  id: number;
  title: string;
  title_es: string;
  organization: string;
  category: string;
  description: string;
  description_es: string;
  location: string;
  schedule: string;
  schedule_es: string;
  commitment: string;
  commitment_es: string;
  spotsAvailable: number;
  skillsNeeded: string[];
  skillsNeeded_es: string[];
  goodForHighSchool: boolean;
}

export interface PartnerOrg {
  id: number;
  name: string;
  focusArea: string;
  focusArea_es: string;
  description: string;
  description_es: string;
  address: string;
  phone: string;
  website: string;
  founded: number;
}

export interface LoggedHours {
  id: string;
  organization: string;
  date: string;
  hours: number;
  description: string;
  supervisorName?: string;
  supervisorEmail?: string;
  creditType: 'high-school' | 'general';
  loggedAt: string;
}

export interface SignupRecord {
  opportunityId: number;
  opportunityTitle: string;
  organization: string;
  volunteerName: string;
  volunteerEmail: string;
  volunteerPhone?: string;
  message?: string;
  signedUpAt: string;
}

export type Lang = 'en' | 'es';
