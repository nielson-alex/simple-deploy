import { Switch, Route } from "react-router-dom";

/* TypeScript imports */
/* Main */              import LandingPage from "./components/LandingPage";
/* Animal Shelter */    import Animals from "./components/Animals";
/* Animal Shelter */    import AnimalDetails from "./components/AnimalDetails";
/* Animal Shelter */    import Collection from "./components/Collection";
/* Experience */        import Resume from "./components/Resume";
/* Testing */           import EnvironmentTesting from "./components/EnvironmentTesting";
/* Testing */           import LaborTracking from "./components/LaborTracking";
/* Testing */           import Scanner from "./components/Scanner";

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
        {/* Main */}    <Route exact path="/dashboard" component={() => <LandingPage user={user} />} />
        {/* Main */}    <Route path="/dashboard/landing-page" component={() => <LandingPage user={user} />} />
        {/* Animals */} <Route path="/dashboard/animals" component={() => <Animals user={user} />} />
        {/* Animals */} <Route path="/dashboard/animal-details" component={() => <AnimalDetails user={user} />} />
        {/* Resume */}  <Route path="/dashboard/resume" component={() => <Resume user={user} />} />
        {/* Testing */} <Route path="/dashboard/environment-testing" component={() => <EnvironmentTesting user={user} />} />
        {/* Testing */} <Route path="/dashboard/my-collection" component={() => <Collection user={user} />} />
        {/* Testing */} <Route path="/dashboard/labor-tracking" component={() => <LaborTracking user={user} />} />



        {/* --- JavaScript --- */}
        {/* Testing */} <Route path="/dashboard/scanner-js" component={() => <ScannerJS user={user} />} />
    </Switch>
);