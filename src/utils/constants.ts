import * as fb from '@/firebase';
import { User } from '@/types';

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
