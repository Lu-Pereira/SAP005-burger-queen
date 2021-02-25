import React from 'react';
import { UserContext } from '../../UserContext';
import { Route, useHistory } from 'react-router-dom';

const ProtectedRoute = (props) => {
  const { login } = React.useContext(UserContext);
  const navigate = useHistory();


  if (login === true) return <Route {...props} />;
  else if (login === false) return navigate.push("/login");
  else return null;
};

export default ProtectedRoute;
