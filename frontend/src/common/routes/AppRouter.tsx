import PageLoader from 'common/components/loaders/PageLoader';
import { LoginPage } from 'login/components/LoginPage';
import React, { Suspense } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { AppRoutesEnum } from './AppRoutes.enum';
import LoggedInUserRoute from './LoggedInUserRoute';
import HomePage from 'home/components/HomePage';

const AppRouter: React.FC = () => {
  return (
    <>
      <Suspense fallback={<PageLoader />}>
        <Routes>
          <Route
            path={AppRoutesEnum.HOME}
            element={<LoggedInUserRoute element={<HomePage />} />}
          />
          <Route path={AppRoutesEnum.LOGIN} element={<LoginPage />} />
          <Route path="*" element={<Navigate to={AppRoutesEnum.HOME} />} />
        </Routes>
      </Suspense>
    </>
  );
};

export default AppRouter;
