export interface EnergyAdvisor {
  id: string;
  name: string;
  title: string;
  email: string;
  phone: string;
  serviceAreas: string[];
  preferredDays: string[];
  totalContractUnits: number;
  programsTrainedIn: string[];
  status: 'ACTIVE' | 'INACTIVE';
  certificationLevel: 'JUNIOR' | 'INTERMEDIATE' | 'SENIOR';
  maxAuditsPerDay: number;
  averageAuditDuration: number;
}

export interface BookingAgent {
  id: string;
  name: string;
  title: string;
  email: string;
  phone: string;
  programsBooked: string[];
  status: 'ACTIVE' | 'INACTIVE';
}

export interface TechTeamMember {
  id: string;
  name: string;
  title: string;
  email: string;
  phone: string;
  programs: string[];
  status: 'ACTIVE' | 'INACTIVE';
}

export interface Contractor {
  id: string;
  name: string;
  contactPerson: string;
  phone: string;
  email: string;
  servicesOffered: string[];
  areasServiced: string[];
  isPreferred: boolean;
  status: 'ACTIVE' | 'INACTIVE';
}