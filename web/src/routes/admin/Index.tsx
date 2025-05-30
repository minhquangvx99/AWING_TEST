import { Suspense, lazy, useEffect } from 'react';
import { Navigate, Route, Routes, useLocation } from 'react-router-dom';
import withAdminLayout from 'layout/withAdminLayout';
import React from 'react';
import TreasureHuntRoute from './TreasureHunt';
import { Spin } from 'antd';

const NotFound = lazy(() => import('container/pages/404'));

interface IAdmin {}

const Admin = React.memo<IAdmin>(() => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <Suspense
      fallback={
        <div className="spin">
          <Spin />
        </div>
      }
    >
      <Routes>
        <Route path="*" element={<Navigate to="treasureHunt" replace />} />
        <Route index path="treasureHunt/*" element={<TreasureHuntRoute />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Suspense>
  );
});

export default withAdminLayout(Admin);
