import { Switch, Route } from "react-router-dom";

/* TypeScript imports */
/* Main */              import LandingPage from "./components/LandingPage";
/* Language-Learning */ import Decks from "./components/Language-Learning/Decks";
/* Language-Learning */ import CreateDeck from "./components/Language-Learning/CreateDeck";
/* Language-Learning */ import Quiz from "./components/Language-Learning/Quiz";
/* Resume */            import Resume from "./components/Resume/Resume";
/* Resume */            import AddWorkExperience from "./components/Resume/AddWorkExperience";
/* Shelter */           import Animals from "./components/Shelter/Animals";
/* Shelter */           import AnimalDetails from "./components/Shelter/AnimalDetails";
/* Testing */           import Collection from "./components/Testing/Collection";
/* Testing */           import EnvironmentTesting from "./components/Testing/EnvironmentTesting";
/* Testing */           import LaborTracking from "./components/Testing/LaborTracking";
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
        {/* Main */}                <Route exact path="/dashboard" component={() => <LandingPage user={user} />} />
        {/* Main */}                <Route path="/dashboard/landing-page" component={() => <LandingPage user={user} />} />
        {/* Language-Learning */}   <Route path="/dashboard/language-learning/decks" component={() => <Decks user={user} />} />
        {/* Language-Learning */}   <Route path="/dashboard/language-learning/create-deck" component={() => <CreateDeck user={user} />} />
        {/* Language-Learning */}   <Route path="/dashboard/language-learning/quiz" component={() => <Quiz user={user} />} />
        {/* Resume */}              <Route path="/dashboard/resume/resume" component={() => <Resume user={user} />} />
        {/* Resume */}              <Route path="/dashboard/resume/add-work-experience" component={() => <AddWorkExperience user={user} />} />
        {/* Shelter */}             <Route path="/dashboard/shelter/animals" component={() => <Animals user={user} />} />
        {/* Shelter */}             <Route path="/dashboard/shelter/animals/animal-details" component={() => <AnimalDetails user={user} />} />
        {/* Testing */}             <Route path="/dashboard/testing/my-collection" component={() => <Collection user={user} />} />
        {/* Testing */}             <Route path="/dashboard/testing/environment-testing" component={() => <EnvironmentTesting user={user} />} />
        {/* Testing */}             <Route path="/dashboard/testing/labor-tracking" component={() => <LaborTracking user={user} />} />

        {/* --- JavaScript --- */}
        {/* Testing */} <Route path="/dashboard/scanner-js" component={() => <ScannerJS user={user} />} />
    </Switch>
);