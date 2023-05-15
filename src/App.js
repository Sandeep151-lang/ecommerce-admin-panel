import React, { useReducer } from 'react'
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";
import HomePage from './component/HomePage'
import 'bootstrap/dist/css/bootstrap.css';
import CreaProduct from './component/CreateProduct';
import Navs from './component/Navs';
import About from './component/About';
import AdminLogin from './component/AdminLogin';
import AdminRegister from './component/AdminRegister';
import AdminDashboard from './component/AdminDashboard';
import ProductDetails from './component/ProductDetails';
import Logout from './component/Logout';
import Products from './component/Products'
import { initialState, reducer } from './reducer';
import 'bootstrap/dist/css/bootstrap.min.css';




export const MyContext = React.createContext();
const App = () => {
  const token = localStorage.getItem('jwt')

  const [state, dispatch] = useReducer(reducer, initialState)

  
  function LoginPrivateRoute({ component: Component, ...rest }) {
    return (
      <Route
        {...rest}
        render={props =>
          !token ? (
            <Component {...props} />
          ) : (
            <Redirect
              to={{
                pathname: "/",
              }}
            />
          )
        }
      />
    );
  }

  function PrivateRoute({ component: Component, ...rest }) {
    return (
      <Route
        {...rest}
        render={props =>
          token ? (
            <Component {...props} />
          ) : (
            <Redirect
              to={{
                pathname: "/admin/login",
              }}
            />
          )
        }
      />
    );
  }

  return <>
    <Router>
      <MyContext.Provider value={{ state, dispatch }}>
        <Navs />
        <Switch>
          <Route exact path='/' component={HomePage} />
          <LoginPrivateRoute path="/admin/login" component={AdminLogin} />
          <LoginPrivateRoute path="/admin/register" component={AdminRegister} />
          <LoginPrivateRoute path="/logout" component={Logout} />
          {/* <Route path="/products/:_id" component={ProductDetails} /> */}
          {/* <Route path="/products" component={Products} /> */}
          <PrivateRoute path="/create/product" component={CreaProduct} />
          <PrivateRoute path="/About" component={About} />
          <PrivateRoute path="/admin/dashboard" component={AdminDashboard} />
          <PrivateRoute path="/products" exact component={Products}/>
          <PrivateRoute path="/products/:_id" exact component={ProductDetails}/>
          {/* <Route path="/user" component={ <Private/>}>
            <Route path='/product' component={<Products/>}/>
          </Route> */}
          
          <Redirect to="/" />
        </Switch>
      </MyContext.Provider>
    </Router>
  </>
}

export default App
