import * as fb from '@/firebase';
import { User, Feature, Version } from '@/types';

export const statusOptions: string[] = ['Select Status', 'todo', 'inProgress', 'completed', 'closed'];

export const itemTypeOptions: string[] = ['Select Type', 'task', 'component', 'bug'];

export const priorityOptions: string[] = ['Select Priority', 'blocker', 'critical', 'major', 'minor'];

export const getUserOptions = () => {
  const users: User[] = [{
    email: '',
    firstName: 'Select',
    id: '',
    lastName: 'User',
  }];
  fb.usersCollection.get().then((docs: any) => {
    docs.forEach((doc: any) => {
      const user = doc.data();
      user.id = doc.id;
      users.push(user);
    });
  });
  return users;
};

export const getFeatureOptions = () => {
  const features: Feature[] = [{
    assignee: {} as User,
    description: '',
    id: '',
    items: [],
    priority: 'minor',
    projectId: '',
    startDate: new Date(),
    status: 'todo',
    title: 'Select Feature',
    updatedDate: new Date(),
    version: {} as Version,
    workFlow: [],
  }];
  fb.featuresCollection.get().then((docs: any) => {
    docs.forEach((doc: any) => {
      const feature = doc.data();
      feature.id = doc.id;
      features.push(feature);
    });
  });
  return features;
};

