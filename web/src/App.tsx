import { FC, lazy, useEffect, useState } from 'react';
import config from 'config/Config';
import { Provider, useDispatch, useSelector } from 'react-redux';
import store from 'store/Store';
import { ConfigProvider } from 'antd';
import { Routes, Route, Navigate, BrowserRouter as Router } from 'react-router-dom';
import Auth from 'routes/Auth';
import { RootState } from 'store/RootReducer';
import { ThemeProvider } from 'styled-components';
import Admin from 'routes/admin/Index';
import './static/css/Style.css';
import 'antd/dist/antd.less';
import './App.scss';
import { ProtectedRoute } from 'components/utilities/ProtectedRoute';

const NotFound = lazy(() => import('container/pages/404'));

const { themeColor } = config;

interface IProviderConfig { }

const ProviderConfig: FC<IProviderConfig> = () => {
  const rtl = useSelector((state: RootState) => state.layout.rtlData);
  const topMenu = useSelector((state: RootState) => state.layout.topMenu);
  const mainContent = useSelector((state: RootState) => state.layout.mode);

  // Get the base URL from the environment variable and extract the path
  const baseName = process.env.REACT_APP_URL_PRODUCT ? new URL(process.env.REACT_APP_URL_PRODUCT).pathname : '/';

  const [path, setPath] = useState(window.location.pathname);

  useEffect(() => {
    let unmounted = false;
    !unmounted && setPath(window.location.pathname);

    return () => {
      unmounted = true;
    };
  }, [setPath]);


  return (
    <ConfigProvider direction={rtl ? 'rtl' : 'ltr'}>
      <ThemeProvider theme={{ ...themeColor, rtl, topMenu, mainContent }}>
        <>
          <Router basename={baseName}>
            <Routes>
              <Route path="/*" element={<ProtectedRoute path="/*" Component={Admin} />} />
            </Routes>
          </Router>
        </>
      </ThemeProvider>
    </ConfigProvider>
  );
};

interface IApp { }

export const App: FC<IApp> = () => {

  return (
    <Provider store={store}>
      <ProviderConfig />
    </Provider>
  );
};
