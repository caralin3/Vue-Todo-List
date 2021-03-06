export interface RootState {
  currentUser: any;
  userProfile: object;
}

export type itemType = 'bug' | 'task' | 'component';
export type statusType = 'todo' | 'inProgress' | 'testing' | 'completed' | 'closed';
export type priorityType = 'minor' | 'major' | 'critical' | 'blocker';

export interface User {
  email: string;
  firstName: string;
  id: string;
  lastName: string;
}

export interface FirebaseComment {
  featureId?: string;
  itemId?: string;
  projectId: string;
  startDate: Date;
  text: string;
  updatedDate: Date;
  user: User;
}

export interface Comment {
  featureId?: string;
  id: string;
  itemId?: string;
  projectId: string;
  startDate: Date;
  text: string;
  updatedDate: Date;
  user: User;
}

export interface FirebaseLink {
  featureId?: string;
  itemId?: string;
  projectId: string;
  startDate: Date;
  to: string;
  updatedDate?: Date;
  userId: string;
}

export interface Link {
  featureId?: string;
  id: string;
  itemId?: string;
  projectId: string;
  startDate: Date;
  to: string;
  updatedDate?: Date;
  userId: string;
}

export interface FirebaseItem {
  assignee: User;
  comments?: string[];
  description: string;
  endDate?: Date;
  featureId: string;
  links?: string[];
  priority: priorityType;
  projectId: string;
  reporter?: User;
  startDate: Date;
  status: statusType;
  title: string;
  type: itemType;
  updatedDate: Date;
}

export interface Item {
  assignee: User;
  comments?: string[];
  description: string;
  endDate?: Date;
  featureId: string;
  id: string;
  links?: string[];
  priority: priorityType;
  projectId: string;
  reporter?: User;
  startDate: Date;
  status: statusType;
  title: string;
  type: itemType;
  updatedDate: Date;
}

export interface FirebaseFeature {
  assignee: User;
  comments?: string[];
  description: string;
  endDate?: Date;
  items: string[];
  links?: string[];
  priority: priorityType;
  projectId: string;
  reporter?: User;
  startDate: Date;
  status: statusType;
  title: string;
  updatedDate: Date;
}

export interface Feature {
  assignee: User;
  comments?: string[];
  description: string;
  endDate?: Date;
  id: string;
  items: string[];
  links?: string[];
  priority: priorityType;
  projectId: string;
  reporter?: User;
  startDate: Date;
  status: statusType;
  title: string;
  updatedDate: Date;
}

export interface FirebaseProject {
  comments?: string[];
  creator: User;
  description: string;
  endDate?: Date;
  features: string[];
  links?: string[];
  startDate: Date;
  status: statusType;
  title: string;
  updatedDate: Date;
  users: string[];
  version: string;
}

export interface Project {
  comments?: string[];
  creator: User;
  description: string;
  endDate?: Date;
  features: string[];
  id: string;
  links?: string[];
  startDate: Date;
  status: statusType;
  title: string;
  updatedDate: Date;
  users: string[];
  version: string;
}
