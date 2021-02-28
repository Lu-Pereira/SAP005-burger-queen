import { BrowserRouter, Switch, Route } from "react-router-dom";
import Header from './Components/Header';
import Footer from './Components/Footer/Footer';
import Home from './Components/Home';
import Login from './Components/Login/Login';
import NotFound from './Components/NotFound';
import Menu from './Components/Menu/Menu'
import LoginCreate from "./Components/Login/LoginCreate";
import Kitchen from "./Components/Kitchen/Kitchen";

export const App = () => {
  return (
  <BrowserRouter>
      <Header />
        <Switch>
          <Route path='/' exact component={Login} />
          <Route path='/register' component={LoginCreate} />
          <Route path='/menu' component={Menu} />
          <Route path='/kitchen' component={Kitchen} />
          <Route path="*" component={NotFound} />
        </Switch>
      <Footer />
  </BrowserRouter>
  )
};

export default App;



