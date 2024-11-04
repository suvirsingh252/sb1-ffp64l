import { ParticipantStatus } from '../types/participant';
import { EnergyAdvisor, BookingAgent, TechTeamMember, Contractor } from '../types/team';

export const MOCK_ENERGY_ADVISORS: EnergyAdvisor[] = [
  {
    id: 'ea1',
    name: 'Alex MacDonald',
    title: 'Senior Energy Advisor',
    email: 'alex.m@example.com',
    phone: '(902) 555-0101',
    serviceAreas: ['Halifax Regional Municipality', 'Dartmouth'],
    preferredDays: ['Monday', 'Tuesday', 'Wednesday'],
    totalContractUnits: 50,
    programsTrainedIn: ['Residential Energy Savings', 'Commercial Retrofit'],
    status: 'ACTIVE',
    certificationLevel: 'SENIOR',
    maxAuditsPerDay: 3,
    averageAuditDuration: 120
  },
  {
    id: 'ea2',
    name: 'Sarah Thompson',
    title: 'Energy Advisor',
    email: 'sarah.t@example.com',
    phone: '(902) 555-0102',
    serviceAreas: ['Bedford', 'Sackville'],
    preferredDays: ['Wednesday', 'Thursday', 'Friday'],
    totalContractUnits: 35,
    programsTrainedIn: ['Residential Energy Savings', 'Low Income Support'],
    status: 'ACTIVE',
    certificationLevel: 'INTERMEDIATE',
    maxAuditsPerDay: 2,
    averageAuditDuration: 150
  },
  {
    id: 'ea3',
    name: 'James Wilson',
    title: 'Senior Energy Advisor',
    email: 'james.w@example.com',
    phone: '(902) 555-0103',
    serviceAreas: ['Cole Harbour', 'Eastern Passage'],
    preferredDays: ['Monday', 'Wednesday', 'Friday'],
    totalContractUnits: 45,
    programsTrainedIn: ['Commercial Retrofit', 'Green Business Initiative'],
    status: 'ACTIVE',
    certificationLevel: 'SENIOR',
    maxAuditsPerDay: 3,
    averageAuditDuration: 180
  }
];

export const MOCK_BOOKING_AGENTS: BookingAgent[] = [
  {
    id: 'ba1',
    name: 'Emily Wilson',
    title: 'Senior Booking Agent',
    email: 'emily.w@example.com',
    phone: '(902) 555-0201',
    programsBooked: ['Residential Energy Savings', 'Commercial Retrofit'],
    status: 'ACTIVE'
  },
  {
    id: 'ba2',
    name: 'Michael Brown',
    title: 'Booking Agent',
    email: 'michael.b@example.com',
    phone: '(902) 555-0202',
    programsBooked: ['Low Income Support', 'Green Business Initiative'],
    status: 'ACTIVE'
  }
];

export const MOCK_TECH_TEAM: TechTeamMember[] = [
  {
    id: 'tt1',
    name: 'David Chen',
    title: 'Technical Reviewer',
    email: 'david.c@example.com',
    phone: '(902) 555-0301',
    programs: ['Residential Energy Savings', 'Commercial Retrofit'],
    status: 'ACTIVE'
  },
  {
    id: 'tt2',
    name: 'Lisa Stewart',
    title: 'Technical Specialist',
    email: 'lisa.s@example.com',
    phone: '(902) 555-0302',
    programs: ['Low Income Support', 'Green Business Initiative'],
    status: 'ACTIVE'
  }
];

export const MOCK_CONTRACTORS: Contractor[] = [
  {
    id: 'c1',
    name: 'Nova Scotia Energy Solutions',
    contactPerson: 'James MacPherson',
    phone: '(902) 555-0401',
    email: 'james@nsenergyservices.com',
    servicesOffered: ['Heat Pump Installation', 'Insulation', 'Air Sealing'],
    areasServiced: ['Halifax Regional Municipality', 'Dartmouth'],
    isPreferred: true,
    status: 'ACTIVE'
  },
  {
    id: 'c2',
    name: 'Atlantic Windows & Doors',
    contactPerson: 'Sarah MacDonald',
    phone: '(902) 555-0402',
    email: 'sarah@atlanticwindows.com',
    servicesOffered: ['Window Replacement', 'Door Installation'],
    areasServiced: ['Halifax Regional Municipality', 'Bedford', 'Sackville'],
    isPreferred: true,
    status: 'ACTIVE'
  },
  {
    id: 'c3',
    name: 'Green Commercial Solutions',
    contactPerson: 'Robert Miller',
    phone: '(902) 555-0403',
    email: 'robert@greencommercial.com',
    servicesOffered: ['HVAC Systems', 'Building Automation', 'LED Lighting'],
    areasServiced: ['Halifax Regional Municipality', 'Dartmouth', 'Bedford'],
    isPreferred: false,
    status: 'ACTIVE'
  }
];

// Mock participants in various stages for each program
export const MOCK_PARTICIPANTS = [
  // Residential Energy Savings Program Participants
  {
    id: 'p1',
    firstName: 'John',
    lastName: 'MacDonald',
    email: 'john.m@example.com',
    phone: '(902) 555-1001',
    address: '123 Spring Garden Road',
    city: 'Halifax Regional Municipality',
    postalCode: 'B3J 2K9',
    program: 'Residential Energy Savings',
    status: ParticipantStatus.READY_FOR_BOOKING,
    createdAt: '2024-03-15',
    propertyType: 'Single Family',
    notes: 'First time participant',
    assignedAdvisor: 'ea1',
    onHold: false,
    reportUploaded: false
  },
  {
    id: 'p2',
    firstName: 'Mary',
    lastName: 'Smith',
    email: 'mary.s@example.com',
    phone: '(902) 555-1002',
    address: '456 Barrington Street',
    city: 'Halifax Regional Municipality',
    postalCode: 'B3J 1E6',
    program: 'Residential Energy Savings',
    status: ParticipantStatus.AUDIT_SCHEDULED,
    createdAt: '2024-03-14',
    propertyType: 'Townhouse',
    notes: 'Scheduled for next week',
    assignedAdvisor: 'ea2',
    onHold: false,
    reportUploaded: false,
    initialAuditDate: '2024-03-25'
  },
  {
    id: 'p3',
    firstName: 'Robert',
    lastName: 'Johnson',
    email: 'robert.j@example.com',
    phone: '(902) 555-1003',
    address: '789 Quinpool Road',
    city: 'Halifax Regional Municipality',
    postalCode: 'B3H 2P2',
    program: 'Residential Energy Savings',
    status: ParticipantStatus.INITIAL_AUDIT_COMPLETED,
    createdAt: '2024-03-10',
    propertyType: 'Single Family',
    notes: 'Initial audit completed, report pending',
    assignedAdvisor: 'ea1',
    onHold: false,
    reportUploaded: true,
    initialAuditDate: '2024-03-20'
  },

  // Low Income Support Program Participants
  {
    id: 'p4',
    firstName: 'Sarah',
    lastName: 'Williams',
    email: 'sarah.w@example.com',
    phone: '(902) 555-1004',
    address: '321 Gottingen Street',
    city: 'Halifax Regional Municipality',
    postalCode: 'B3K 3B3',
    program: 'Low Income Support',
    status: ParticipantStatus.READY_FOR_TECH_REVIEW,
    createdAt: '2024-03-08',
    propertyType: 'Apartment',
    notes: 'Priority case',
    assignedAdvisor: 'ea2',
    onHold: false,
    reportUploaded: true,
    initialAuditDate: '2024-03-15'
  },
  {
    id: 'p5',
    firstName: 'Michael',
    lastName: 'Brown',
    email: 'michael.b@example.com',
    phone: '(902) 555-1005',
    address: '654 Robie Street',
    city: 'Halifax Regional Municipality',
    postalCode: 'B3H 1H3',
    program: 'Low Income Support',
    status: ParticipantStatus.READY_FOR_CONTRACTOR_QUOTE,
    createdAt: '2024-03-05',
    propertyType: 'Single Family',
    notes: 'Approved for full support',
    assignedAdvisor: 'ea2',
    onHold: false,
    reportUploaded: true,
    initialAuditDate: '2024-03-12'
  },

  // Commercial Retrofit Program Participants
  {
    id: 'p6',
    firstName: 'Jennifer',
    lastName: 'Lee',
    email: 'jennifer.l@example.com',
    phone: '(902) 555-1006',
    address: '987 Brunswick Street',
    city: 'Halifax Regional Municipality',
    postalCode: 'B3J 2N4',
    program: 'Commercial Retrofit',
    status: ParticipantStatus.WORKORDERS_SENT,
    createdAt: '2024-03-01',
    propertyType: 'Commercial Office',
    notes: 'Large office building retrofit',
    assignedAdvisor: 'ea3',
    onHold: false,
    reportUploaded: true,
    initialAuditDate: '2024-03-08'
  },
  {
    id: 'p7',
    firstName: 'William',
    lastName: 'Taylor',
    email: 'william.t@example.com',
    phone: '(902) 555-1007',
    address: '741 Hollis Street',
    city: 'Halifax Regional Municipality',
    postalCode: 'B3J 2P3',
    program: 'Commercial Retrofit',
    status: ParticipantStatus.READY_FOR_FINAL_AUDIT,
    createdAt: '2024-02-25',
    propertyType: 'Retail Space',
    notes: 'Work completed, ready for final inspection',
    assignedAdvisor: 'ea3',
    onHold: false,
    reportUploaded: true,
    initialAuditDate: '2024-03-04'
  },

  // Green Business Initiative Participants
  {
    id: 'p8',
    firstName: 'David',
    lastName: 'Wilson',
    email: 'david.w@example.com',
    phone: '(902) 555-1008',
    address: '852 Lower Water Street',
    city: 'Halifax Regional Municipality',
    postalCode: 'B3J 1S3',
    program: 'Green Business Initiative',
    status: ParticipantStatus.FINAL_AUDIT_SCHEDULED,
    createdAt: '2024-02-20',
    propertyType: 'Commercial Office',
    notes: 'Final audit scheduled for next week',
    assignedAdvisor: 'ea3',
    onHold: false,
    reportUploaded: true,
    initialAuditDate: '2024-02-27',
    finalAuditDate: '2024-03-25'
  },
  {
    id: 'p9',
    firstName: 'Elizabeth',
    lastName: 'Moore',
    email: 'elizabeth.m@example.com',
    phone: '(902) 555-1009',
    address: '963 Granville Street',
    city: 'Halifax Regional Municipality',
    postalCode: 'B3J 2R7',
    program: 'Green Business Initiative',
    status: ParticipantStatus.COMPLETED,
    createdAt: '2024-02-15',
    propertyType: 'Restaurant',
    notes: 'Successfully completed all upgrades',
    assignedAdvisor: 'ea3',
    onHold: false,
    reportUploaded: true,
    initialAuditDate: '2024-02-22',
    finalAuditDate: '2024-03-15',
    completedAt: '2024-03-15'
  },
  
  // On Hold Cases
  {
    id: 'p10',
    firstName: 'Thomas',
    lastName: 'Anderson',
    email: 'thomas.a@example.com',
    phone: '(902) 555-1010',
    address: '159 Queen Street',
    city: 'Halifax Regional Municipality',
    postalCode: 'B3J 2M4',
    program: 'Residential Energy Savings',
    status: ParticipantStatus.ON_HOLD,
    createdAt: '2024-03-01',
    propertyType: 'Single Family',
    notes: 'On hold pending documentation',
    assignedAdvisor: 'ea1',
    onHold: true,
    reportUploaded: false
  }
];

export const PROGRAMS = [
  'Residential Energy Savings',
  'Low Income Support',
  'Commercial Retrofit',
  'Green Business Initiative'
];

export const SERVICE_AREAS = [
  'Halifax Regional Municipality',
  'Dartmouth',
  'Bedford',
  'Sackville',
  'Cole Harbour',
  'Eastern Passage'
];

export const SERVICES_OFFERED = [
  'Heat Pump Installation',
  'Insulation',
  'Air Sealing',
  'Window Replacement',
  'Door Installation',
  'HVAC Systems',
  'Building Automation',
  'LED Lighting',
  'Water Heating',
  'Ventilation'
];