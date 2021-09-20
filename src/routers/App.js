import jwtDecode from 'jwt-decode';
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { HashRouter, Route, Switch, Redirect } from 'react-router-dom';
import { login } from 'src/redux/actions/authActions';
import '../scss/style.scss';
import { PrivateRouter } from './PrivateRouter';
import { PublicRouter } from './PublicRouter';

const loading = (
  <div className="pt-3 text-center">
    <div className="sk-spinner sk-spinner-pulse"></div>
  </div>
)

// Containers
const TheLayout = React.lazy(() => import('../containers/TheLayout'));

// Pages
const Login = React.lazy(() => import('../views/pages/login/Login'));
const Page404 = React.lazy(() => import('../views/pages/page404/Page404'));
const Page500 = React.lazy(() => import('../views/pages/page500/Page500'));

const App = () => {

  const dispatch = useDispatch();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token !== null) {
      const user = jwtDecode(token);
      if (user) {
        dispatch(login(user));
      }
    }
  }, [dispatch]);

  
    return (
      <HashRouter>
          <React.Suspense fallback={loading}>
            <Switch>
              <PublicRouter path="/login" component={Login} />
              <Route path="/404" component={Page404} />
              <Route path="/500" component={Page500} />
              <PrivateRouter path="/" component={TheLayout} />
            </Switch>
            <Redirect to="/404" />
          </React.Suspense>
      </HashRouter>
    );
  
}

export default App;
