import { BrowserRouter, Switch,Route, useHistory } from "react-router-dom/cjs/react-router-dom.min";
import Index from "../pages/Index";
import ViewMovie from "../pages/ViewMovie";
import AddMovie from "../pages/AddMovie";
import Login from "../pages/Login";
import Profile from "../pages/Profile";

const Router =()=>{

// const history=useHistory();
// history.push("/");
return <BrowserRouter>
  <Switch>

<Route path="/" component={Index} exact >  
  
</Route>


<Route path="/view/:id" component={ViewMovie} exact >  
  
</Route>

<Route path="/add" component={AddMovie} exact >  
  
</Route>

<Route path="/login" component={Login} exact >  
  
</Route>

<Route path="/profile" component={Profile} exact >  
  
</Route>
  </Switch>
</BrowserRouter>

}
export default Router;