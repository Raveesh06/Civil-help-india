
export enum Screen {
  LOGIN = 'LOGIN',
  OTP = 'OTP',
  CONSENT = 'CONSENT',
  DASHBOARD = 'DASHBOARD',
  RAISE_ISSUE_OPTIONS = 'RAISE_ISSUE_OPTIONS',
  FILE_ONLINE = 'FILE_ONLINE',
  SPEAK_AND_FILE = 'SPEAK_AND_FILE',
  ASSISTED_HELP = 'ASSISTED_HELP',
  AI_REVIEW = 'AI_REVIEW',
  SUBMISSION_ANIMATION = 'SUBMISSION_ANIMATION',
  TRACK_REQUESTS = 'TRACK_REQUESTS',
  TRACK_DETAIL = 'TRACK_DETAIL',
  DOCUMENT_VAULT = 'DOCUMENT_VAULT',
  PROFILE = 'PROFILE',
  EDIT_PROFILE = 'EDIT_PROFILE',
  HIRE_ADVOCATE = 'HIRE_ADVOCATE',
  SECURITY_SETTINGS = 'SECURITY_SETTINGS',
  ADVOCATE_CALL = 'ADVOCATE_CALL',
  ADVOCATE_CHAT = 'ADVOCATE_CHAT',
  EMERGENCY_RINGING = 'EMERGENCY_RINGING',
  CIVIC_HIGHLIGHTS = 'CIVIC_HIGHLIGHTS'
}

export type Category = 
  | 'Electricity & Utilities' 
  | 'Property & Documents' 
  | 'Safety & Security' 
  | 'Office Service Issue' 
  | 'Elderly Support'
  | 'Others';

export interface Complaint {
  id: string;
  category: Category;
  title: string;
  status: 'Submitted' | 'Reminder Sent' | 'Escalated' | 'Resolved';
  date: string;
  description: string;
  address?: string;
}

export interface Advocate {
  id: string;
  name: string;
  specialty: string;
  experience: string;
  rating: number;
  location: string;
  languages: string[];
  imageUrl?: string;
}

export type Language = 'English' | 'Hindi';
export type Theme = 'light' | 'dark';

export interface AppState {
  isElderlyMode: boolean;
  language: Language;
  theme: Theme;
  currentScreen: Screen;
  userPhone: string;
  userName: string;
  userEmail: string;
  userAvatar: string;
  complaints: Complaint[];
  selectedComplaint?: Complaint;
  selectedAdvocate?: Advocate;
}
