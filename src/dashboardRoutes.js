import { Switch, Route } from "react-router-dom";

/* TypeScript imports */
/* Main */              import LandingPage from "./components/LandingPage";
/* Main */              import Login from "./components/Login";
/* Main */              import Signup from "./components/Signup";
/* Language-Learning */ import CreateDeck from "./components/Language-Learning/CreateDeck";
/* Language-Learning */ import Decks from "./components/Language-Learning/Decks";
/* Language-Learning */ import EditDeck from "./components/Language-Learning/EditDeck";
/* Language-Learning */ import ExampleQuiz from "./components/Language-Learning/ExampleQuiz";
/* Language-Learning */ import Quiz from "./components/Language-Learning/Quiz";

/* JavaScript imports */
import ScannerJS from "./components/Scanner.js";
const agh = (user) => {
    console.log("dashboardRoutes user:", user);

    return (
        <Switch>
            {/* --- TypeScript --- */}
            {/* Main */}                <Route exact path="/dashboard" component={() => <Decks user={user} />} />
            {/* Main */}                <Route path="/dashboard/login" component={() => <Login user={user} />} />
            {/* Main */}                <Route path="/dashboard/signup" component={() => <Signup user={user} />} />
            {/* Language-Learning */}   <Route path="/dashboard/language-learning/create-deck" component={() => <CreateDeck user={user} />} />
            {/* Language-Learning */}   <Route path="/dashboard/language-learning/decks" component={() => <Decks user={user} />} />
            {/* Language-Learning */}   <Route path="/dashboard/language-learning/edit" component={() => <EditDeck user={user} />} />
            {/* Language-Learning */}   <Route path="/dashboard/language-learning/example-quiz" component={() => <ExampleQuiz user={user} />} />
            {/* Language-Learning */}   <Route path="/dashboard/language-learning/quiz" component={() => <Quiz user={user} />} />

            {/* --- JavaScript --- */}
            {/* Testing */} <Route path="/dashboard/scanner-js" component={() => <ScannerJS user={user} />} />
        </Switch>
    );
};


export default agh


