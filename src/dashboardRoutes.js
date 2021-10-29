import { Switch, Route } from "react-router-dom";

/* TypeScript imports */
import LandingPage from "./components/LandingPage";
import Scanner from "./components/Scanner";

/* JavaScript imports */
import ScannerJS from "./components/Scanner.js";

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

        {/* --- TypeScript --- */}
        <Route path="/dashboard/scanner-js" component={() => <ScannerJS user={user} />} />
    </Switch>
);