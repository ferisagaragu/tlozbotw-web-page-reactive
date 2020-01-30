import React from 'react';
import { Route, Switch } from "reactive";
import AdminUserView from '../../modules/admin-user/admin-user.view';

const Routing = () => {
  return (
    <Switch>
      <Route path="/admin-user/" exact component={ AdminUserView } />
    </Switch>
  );
}

export default Routing;