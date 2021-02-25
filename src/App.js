import { BrowserRouter, Switch, Route } from "react-router-dom";
//import { Login } from './pages/Login';
import { Register } from './pages/Register';
import { Kitchen } from './pages/Kitchen';
import { Menu } from './pages/Menu';
import Header from './Components/Header';
import Footer from './Components/Footer';
import Login from './Components/Login/Login';
import { UserStorage } from './UserContext';
import NotFound from './Components/NotFound';
import Home from "./Components/Home";


export const App = () => {
  return (
  <BrowserRouter>
    <UserStorage>
      <Header />
      <main className="AppBody">
        <Switch>
          <Route path="/" element={<Home />} />
          <Route path='/login' component={Register} />
          <Route path='/menu' component={Menu}/>
          <Route path='/kitchen' component={Kitchen}/>
          <Route path="*" element={<NotFound />} />
        </Switch>
      </main>
      <Footer />
    </UserStorage>
  </BrowserRouter>
  )
};

export default App;



