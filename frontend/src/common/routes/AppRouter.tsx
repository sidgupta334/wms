import PageLoader from 'common/components/loaders/PageLoader';
import { LoginPage } from 'login/components/LoginPage';
import React, { Suspense } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { AppRoutesEnum } from './AppRoutes.enum';
import LoggedInUserRoute from './LoggedInUserRoute';
import HomePage from 'home/components/HomePage';
import AdminRoute from './AdminRoute';
import AdminHomePage from 'admin/components/AdminHomePage';
import OpportunitiesPage from 'home/opportunities/components/OpportunitiesPage';
import SearchPage from 'search/components/SearchPage';
import ProfilePage from 'search/components/ProfilePage';

const AppRouter: React.FC = () => {
  return (
    <>
      <Suspense fallback={<PageLoader />}>
        <Routes>
          <Route
            path={AppRoutesEnum.HOME}
            element={<LoggedInUserRoute element={<HomePage />} />}
          />
          <Route
            path={AppRoutesEnum.OPPORTUNITIES}
            element={<LoggedInUserRoute element={<OpportunitiesPage />} />}
          />
          <Route path={AppRoutesEnum.SEARCH} element={<SearchPage />} />
          <Route path={AppRoutesEnum.PROFILE} element={<ProfilePage />} />
          <Route
            path={AppRoutesEnum.ADMIN_HOME}
            element={<AdminRoute element={<AdminHomePage />} />}
          />
          <Route path={AppRoutesEnum.LOGIN} element={<LoginPage />} />
          <Route path="*" element={<Navigate to={AppRoutesEnum.HOME} />} />
        </Routes>
      </Suspense>
    </>
  );
};

export default AppRouter;
