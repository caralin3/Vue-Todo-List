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
  title: '1.0.0',
};

export const Item1: Item = {
  assignee: User1,
  // comments?: [Comment1]
  description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, \
    sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
  // endDate: new Date(),
  featureName: 'Feature1',
  id: '0',
  // links: [],
  priority: 'minor',
  projectName: 'Project1',
  // reporter: User,
  startDate: new Date(),
  status: 'todo',
  title: 'Item1',
  type: 'task',
  // updatedDate: new Date(),
  version: Version1,
  workFlow: [WorkHistory1],
};

export const Feature1: Feature = {
  assignee: User1,
  // comments: [Comment1],
  description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, \
    sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
  // endDate: new Date(),
  id: '0',
  items: [Item1],
  // links: [],
  priority: 'minor',
  projectName: 'Project1',
  // reporter: User1,
  startDate: new Date(),
  status: 'todo',
  title: 'Feature1',
  updatedDate: new Date(),
  version: Version1,
};

export const Project1: Project = {
  creator: User1,
  description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, \
    sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
  // endDate: new Date(),
  features: [Feature1],
  id: '0',
  startDate: new Date(),
  status: 'open',
  title: 'Project1',
  // updatedDate: new Date(),
  versions: [Version1],
};
