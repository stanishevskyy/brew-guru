import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';

import { Provider } from 'react-redux';
import { store } from './store/rootReducer';

import { App } from './App';
// import { HomePage } from './modules/HomePage';
import { AboutUsPage } from './modules/AboutUsPage';
import { HomePageCafes } from './modules/HomePageCafes';
import { HomePageMenu } from './modules/HomePageMenu';
import { Reservations } from './modules/Reservations';
import { ProfilePage } from './modules/ProfilePage';
import { CafePage } from './modules/CafePage';
import { AuthPage } from './modules/AuthPage';

import { LoginPage } from './modules/AuthPage/LoginPage';
import { Register } from './modules/AuthPage/Register';
import { CreateAccount } from './modules/AuthPage/CreateAccount';
import { ConfirmEmail } from './modules/AuthPage/ConfirmEmail';
import { CreatePassword } from './modules/AuthPage/CreatePassword';
import { CreateUser } from './modules/AuthPage/CreateUser';
import { UserProfile } from './modules/ProfilePage/components/UserProfile';
import { History } from './modules/ProfilePage/components/History';
import { Reviews } from './modules/ProfilePage/components/Reviews';
import { Review } from './shared/components/Review';
import { Reports } from './modules/ProfilePage/components/Reports';
import { Settings } from './modules/ProfilePage/components/Settings';

export const Root = () => {
  return (
    <HashRouter>
      <Provider store={store}>
        <Routes>
          <Route path="/" element={<App />}>
            <Route index element={<HomePageCafes />} />

            <Route path=":slug" element={<CafePage />} />
            <Route path=":slug/menu" element={<HomePageMenu />} />
            <Route path="home" element={<Navigate to="/" replace />} />

            <Route path="about-us" element={<AboutUsPage />} />

            <Route path="reservations">
              <Route index element={<Reservations />} />
            </Route>

            <Route path="auth" element={<AuthPage />}>
              <Route path="login" element={<LoginPage />} />
              <Route path="register" element={<Register />}>
                <Route index element={<CreateAccount />} />
                <Route path="confirm-email" element={<ConfirmEmail />} />
                <Route path="create-password" element={<CreatePassword />} />
                <Route path="create-user" element={<CreateUser />} />
              </Route>
            </Route>

            <Route path="profile" element={<ProfilePage />}>
              <Route index element={<UserProfile />} />
              <Route path="history" element={<History />} />
              <Route path="reviews" element={<Reviews />}>
                <Route index element={<Review />} />
                <Route path="answer" element={<Review />} />
                <Route path="reports" element={<Reports />} />
              </Route>
              <Route path="settings" element={<Settings />} />
            </Route>
          </Route>
        </Routes>
      </Provider>
    </HashRouter>
  );
};
