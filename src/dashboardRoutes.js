/* imports */       import { Switch, Route } from "react-router-dom";
import Counter from "./components/Counter";
import LandingPage from "./components/LandingPage";

let user = JSON.parse(localStorage.getItem("eqxState"))?.user ||
{
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
        {/* --- TypeScript --- */}
        <Route exact path="/dashboard" component={() => <LandingPage user={user} />} />
        <Route path="/dashboard/landing-page" component={() => <LandingPage user={user} />} />
        <Route path="/dashboard/counter" component={() => <Counter user={user} />} />
    </Switch>
);