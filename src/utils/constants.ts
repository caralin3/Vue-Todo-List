import * as fb from '@/firebase';
import { User, Feature } from '@/types';

export const monthNames = ['January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
];

export const shortMonthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
  'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec',
];

export const statusOptions: string[] = ['Select Status', 'todo', 'inProgress', 'testing', 'completed', 'closed'];

export const itemTypeOptions: string[] = ['Select Type', 'task', 'component', 'bug'];

export const priorityOptions: string[] = ['Select Priority', 'blocker', 'critical', 'major', 'minor'];

export const featureFilterOptions: string[] = ['Select Filter', 'date', 'title',
  'status', 'priority', 'assigned to Me',
];

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

export const userOptions = getUserOptions();
