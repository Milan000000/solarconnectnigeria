export enum LeadStatus {
  NEW = 'New',
  CONTACTED = 'Contacted',
  CLOSED = 'Closed'
}

export enum SubscriptionStatus {
  ACTIVE = 'Active',
  INACTIVE = 'Inactive'
}

export interface Lead {
  _id?: string;
  name: string;
  phone: string;
  location: string;
  propertyType: string;
  budget: string;
  systemType: string;
  notes: string;
  status: LeadStatus;
  assignedInstaller?: string; // Installer ID
  createdAt: string;
}

export interface Installer {
  _id?: string;
  businessName: string;
  phone: string;
  email: string;
  location: string;
  subscriptionStatus: SubscriptionStatus;
  createdAt: string;
}

export interface AuthResponse {
  token?: string;
  error?: string;
}
