import { BrowserRouter, Switch, Route } from "react-router-dom";
//import { Login } from './pages/Login';
//import { Register } from './pages/Register';
//import { Kitchen } from './pages/Kitchen';
//import { Menu } from './pages/Menu';
import Header from './Components/Header';
import Footer from './Components/Footer';
import Login from './Components/Login/Login';
import { UserStorage } from './UserContext';
import NotFound from './Components/NotFound';
import LoginForm from "./Components/Login/LoginForm";


export const App = () => {
  return (
  <BrowserRouter>
    <UserStorage>
      <Header />
      <Login />
      <main className="AppBody">
        <Switch>
          <Route path="/" element={<Login />} />
          <Route path="/" element={<Login />} />
          <Route path="*" element={<NotFound />} />
        </Switch>
      </main>
      <Footer />
    </UserStorage>
  </BrowserRouter>
  )
};

export default App;



