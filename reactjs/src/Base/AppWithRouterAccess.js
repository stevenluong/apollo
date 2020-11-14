import React from 'react';
import { Route, useHistory, Switch } from 'react-router-dom';
import { Security, SecureRoute, LoginCallback } from '@okta/okta-react';
import SignInSide from '../User/SignInSide';
import SignUp from '../User/SignUp';
import Main from './Main';
//import Profile from './User/Profile';
import oktaConfig from '../User/app.config';
import Notfound from '../Common/NotFound'

const AppWithRouterAccess = () => {
  const history = useHistory();
  const onAuthRequired = () => {
    history.push('/login');
  };

  return (
    <Security issuer={oktaConfig.issuer}
              clientId={oktaConfig.clientId}
              redirectUri={oktaConfig.redirectUri}
              onAuthRequired={onAuthRequired}
              pkce={true} >
      <Switch>
        <SecureRoute path='/' exact={true} render={() => <Main url="dashboard" />} />
        <Route path='/login' render={() => <SignInSide baseUrl={oktaConfig.url} />} />
        <Route path='/signup' render={() => <SignUp baseUrl={oktaConfig.url} />} />
        <Route path='/implicit/callback' component={LoginCallback} />
        <SecureRoute path='/profile' render={() => <Main url="profile" />} />
        <SecureRoute path='/sources' render={() => <Main url="sources" />} />
        <SecureRoute path='/topics' render={() => <Main url="topics" />} />
        <SecureRoute path='/analytics' render={() => <Main url="analytics" />} />
        <Route component={Notfound} />
      </Switch>
    </Security>
  );
};
export default AppWithRouterAccess;
