import { User } from '../types/user/user.type';

export const saveCurrentUser = (user: User, stayLoggedIn: boolean) => {
  if (stayLoggedIn) {
    localStorage.setItem('currentUser', JSON.stringify(user));
  } else {
    sessionStorage.setItem('currentUser', JSON.stringify(user));
  }
};

export const getCurrentUserFromStorage = (): {
  user: User | null;
  stayLoggedIn: boolean;
} => {
  const local = localStorage.getItem('currentUser');

  if (local) {
    return { user: JSON.parse(local), stayLoggedIn: true };
  }

  const session = sessionStorage.getItem('currentUser');

  if (session) {
    return { user: JSON.parse(session), stayLoggedIn: false };
  }

  return { user: null, stayLoggedIn: false };
};

export const removeCurrentUserFromStorage = () => {
  localStorage.removeItem('currentUser');
  sessionStorage.removeItem('currentUser');
};
