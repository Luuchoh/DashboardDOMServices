import jwtDecode from 'jwt-decode';
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { HashRouter, Route, Switch, Redirect } from 'react-router-dom';
import { login } from 'src/redux/actions/authActions';
import { findCategories } from 'src/redux/actions/categoriesActions';
import { findServices } from 'src/redux/actions/serviceActions';
import Profile from 'src/redux/actions/userActions';
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
        dispatch(findServices());
        dispatch(Profile.findAllUser())
        dispatch(findCategories())
      }
    }
  }, [dispatch]);

  
    return (
      <HashRouter>
          <React.Suspense fallback={loading}>
            <Switch>
              <PublicRouter path="/login" component={Login} />
              <PrivateRouter path="/" component={TheLayout} />
              <Route path="/404" component={Page404} />
              <Route path="/500" component={Page500} />
            </Switch>
            <Redirect to="/404"/>
          </React.Suspense>
      </HashRouter>
    );
  
}

export default App;
