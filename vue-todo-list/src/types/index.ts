export type itemType = 'bug' | 'task' | 'component';
export type statusType = 'todo' | 'in Progress' | 'completed' | 'closed';
export type priorityType = 'minor' | 'major' | 'critical' | 'blocker';

export interface User {
  email: string;
  first: string;
  id: string;
  last: string;
}

export interface Comment {
  startDate: Date;
  text: string;
  updatedDate?: Date;
  user: User;
}

export interface WorkHistory {
  startDate: Date;
  status: statusType;
}

export interface Version {
  endDate: Date;
  id: string;
  startDate: Date;
  title: string;
}

export interface Item {
  assignee: User;
  comments?: Comment[];
  description: string;
  endDate?: Date;
  featureName: string;
  id: string;
  links?: string[];
  priority: priorityType;
  projectName: string;
  reporter?: User;
  startDate: Date;
  status: statusType;
  title: string;
  type: itemType;
  updatedDate: Date;
  version: Version;
  workFlow: WorkHistory[];
}

export interface Feature {
  assignee: User;
  comments?: Comment[];
  description: string;
  endDate?: Date;
  id: string;
  items: Item[];
  links?: string[];
  priority: priorityType;
  projectName: string;
  reporter?: User;
  startDate: Date;
  status: statusType;
  title: string;
  updatedDate: Date;
  version: Version;
  workFlow: WorkHistory[];
}

export interface Project {
  creator: User;
  description: string;
  endDate?: Date;
  features: Feature[];
  id: string;
  startDate: Date;
  status: statusType;
  title: string;
  updatedDate?: Date;
  versions: Version[];
}
