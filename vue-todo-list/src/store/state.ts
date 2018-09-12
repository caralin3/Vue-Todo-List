import { Project, Feature, WorkHistory, User, Comment, Version, Item } from '@/types';

export const User1: User = {
  email: 'email',
  first: 'First',
  id: '0',
  last: 'Last',
};

export const Comment1: Comment = {
  startDate: new Date(),
  text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, \
    sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
  user: User1,
};

export const WorkHistory1: WorkHistory = {
  startDate: new Date(),
  status: 'todo',
};

export const Version1: Version = {
  endDate: new Date(),
  id: '0',
  startDate: new Date(),
  title: '1.0.0-dev',
};

export const Item1: Item = {
  assignee: User1,
  // comments?: [Comment1]
  description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, \
    sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
  // endDate: new Date(),
  featureName: 'Feature1',
  id: '0',
  links: ['google.com'],
  priority: 'minor',
  projectName: 'Project1',
  // reporter: User,
  startDate: new Date(),
  status: 'todo',
  title: 'Item1',
  type: 'task',
  updatedDate: new Date(),
  version: Version1,
  workFlow: [WorkHistory1],
};

export const Item2: Item = {
  assignee: User1,
  // comments?: [Comment1]
  description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, \
    sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
  // endDate: new Date(),
  featureName: 'Feature1',
  id: '1',
  // links: [],
  priority: 'minor',
  projectName: 'Project1',
  // reporter: User,
  startDate: new Date(),
  status: 'todo',
  title: 'Item1',
  type: 'bug',
  updatedDate: new Date(),
  version: Version1,
  workFlow: [WorkHistory1],
};

export const Item3: Item = {
  assignee: User1,
  // comments?: [Comment1]
  description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, \
    sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
  // endDate: new Date(),
  featureName: 'Feature1',
  id: '2',
  // links: [],
  priority: 'minor',
  projectName: 'Project1',
  // reporter: User,
  startDate: new Date(),
  status: 'todo',
  title: 'Item1',
  type: 'component',
  updatedDate: new Date(),
  version: Version1,
  workFlow: [WorkHistory1],
};

export const Feature1: Feature = {
  assignee: User1,
  comments: [Comment1],
  description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, \
    sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
  // endDate: new Date(),
  id: '0',
  items: [Item1, Item2],
  links: ['https://www.google.com'],
  priority: 'critical',
  projectName: 'Project1',
  // reporter: User1,
  startDate: new Date(),
  status: 'todo',
  title: 'Feature1',
  updatedDate: new Date(),
  version: Version1,
  workFlow: [WorkHistory1],
};

export const Feature2: Feature = {
  assignee: User1,
  comments: [Comment1],
  description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, \
    sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
  // endDate: new Date(),
  id: '1',
  items: [Item1, Item2, Item3],
  // links: ['https://www.google.com'],
  priority: 'blocker',
  projectName: 'Project1',
  // reporter: User1,
  startDate: new Date(),
  status: 'inProgress',
  title: 'Feature2',
  updatedDate: new Date(),
  version: Version1,
  workFlow: [WorkHistory1],
};

export const Feature3: Feature = {
  assignee: User1,
  comments: [Comment1],
  description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, \
    sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
  // endDate: new Date(),
  id: '2',
  items: [Item1, Item2, Item3],
  // links: ['https://www.google.com'],
  priority: 'major',
  projectName: 'Project1',
  // reporter: User1,
  startDate: new Date(),
  status: 'completed',
  title: 'Feature3',
  updatedDate: new Date(),
  version: Version1,
  workFlow: [WorkHistory1],
};

export const Feature4: Feature = {
  assignee: User1,
  comments: [Comment1],
  description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, \
    sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
  // endDate: new Date(),
  id: '3',
  items: [Item1, Item2, Item3],
  // links: ['https://www.google.com'],
  priority: 'minor',
  projectName: 'Project1',
  // reporter: User1,
  startDate: new Date(),
  status: 'closed',
  title: 'Feature4',
  updatedDate: new Date(),
  version: Version1,
  workFlow: [WorkHistory1],
};

export const Project1: Project = {
  creator: User1,
  description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, \
    sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
  // endDate: new Date(),
  features: [Feature1, Feature2, Feature3, Feature4],
  id: '0',
  startDate: new Date(),
  status: 'todo',
  title: 'Project1',
  // updatedDate: new Date(),
  versions: [Version1],
};
