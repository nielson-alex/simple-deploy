import { Switch, Route } from "react-router-dom";

/* TypeScript imports */
/* Main */              import LandingPage from "./components/LandingPage";
/* Main */              import Login from "./components/Login";
/* Main */              import Signup from "./components/Signup";
/* Language-Learning */ import CreateDeck from "./components/Language-Learning/CreateDeck";
/* Language-Learning */ import Decks from "./components/Language-Learning/Decks";
/* Language-Learning */ import EditDeck from "./components/Language-Learning/EditDeck";
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
const agh = (user) => {
    console.log("dashboardRoutes user:", user);
    
    return (
        <Switch>
            {/* --- TypeScript --- */}
            {/* Main */}                <Route exact path="/dashboard" component={() => <LandingPage user={user} />} />
            {/* Main */}                <Route path="/dashboard/landing-page" component={() => <LandingPage user={user} />} />
            {/* Main */}                <Route path="/dashboard/login" component={() => <Login user={user} />} />
            {/* Main */}                <Route path="/dashboard/signup" component={() => <Signup user={user} />} />
            {/* Language-Learning */}   <Route path="/dashboard/language-learning/create-deck" component={() => <CreateDeck user={user} />} />
            {/* Language-Learning */}   <Route path="/dashboard/language-learning/decks" component={() => <Decks user={user} />} />
            {/* Language-Learning */}   <Route path="/dashboard/language-learning/edit" component={() => <EditDeck user={user} />} />
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
};


export default agh


