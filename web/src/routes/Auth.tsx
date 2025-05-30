
import React, { FC, lazy, useEffect } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';

interface IAuthRoot {}

const AuthRoot: FC<IAuthRoot> = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('access_token');
    (!token || token === '') && navigate('/');
  });

  return <></>;
};

const FrontendRoutes = React.memo(() => {
  return (
    <Routes>
      <Route path="*" element={<AuthRoot />} />
    </Routes>
  );
});

 export default FrontendRoutes;
