import { Switch, Route } from "react-router-dom";
import Dashboard from "./components/Dashboard";
import Home from "./components/Home";

let user = JSON.parse(localStorage.getItem("eqxState"))?.user
    || {
    id: -1,
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    gid: -1,
    dept: -1,
    isEmployee: false,
    loggedIn: false
};

export default (
    <Switch>
        <Route exact path="/" component={() => <Home user={user} />} />
        <Route path="/dashboard" component={() => <Dashboard user={user} />} />
    </Switch>
);