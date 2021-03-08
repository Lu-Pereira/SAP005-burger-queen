/* eslint-disable linebreak-style */
/* eslint-disable react/react-in-jsx-scope */
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Footer from './Components/Footer/Footer';
import Login from './Components/Login/Login';
import NotFound from './Components/NotFound';
import { Menu } from './Components/Menu/Menu';
import LoginCreate from './Components/Login/LoginCreate';
import { Kitchen } from './Components/Kitchen/Kitchen';
import { Pedidos } from './Components/Pedidospronto';

export const App = () => (

  <BrowserRouter>

    <Switch>

      <Route path="/" exact component={Login} />

      <Route path="/register" component={LoginCreate} />

      <Route path="/menu" component={Menu} />

      <Route path="/kitchen" component={Kitchen} />

      <Route path="/PedidosPronto" component={Pedidos} />

      <Route path="*" component={NotFound} />

    </Switch>

    <Footer />

  </BrowserRouter>

);

export default App;
