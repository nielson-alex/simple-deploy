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
/* Resume */            import AddWorkExperience from "./components/Resume/AddWorkExperience";
/* Resume */            import Resume from "./components/Resume/Resume";

/* JavaScript imports */
import ScannerJS from "./components/Scanner.js";
const DashboardRoutes = (user) => {
    function _determineColSize() {
        if (window.innerWidth >= 576 && window.innerWidth < 768) {
            return "-sm";
        } else if (window.innerWidth >= 768 && window.innerWidth < 992) {
            return "-md";
        } else if (window.innerWidth >= 992 && window.innerWidth < 1200) {
            return "-lg";
        } else if (window.innerWidth >= 1200) {
            return "-xl";
        } else {
            return "";
        }
    }

    function _determineDevice() {
        if (window.innerWidth >= 576 && window.innerWidth < 768) {
            return "mobile";
        } else if (window.innerWidth >= 768 && window.innerWidth < 992) {
            return "mobile";
        } else if (window.innerWidth >= 992 && window.innerWidth < 1200) {
            return "desktop";
        } else if (window.innerWidth >= 1200) {
            return "desktop";
        } else {
            return "mobile";
        }
    }

    return (
        <Switch>
            {/* --- TypeScript --- */}
            {/* Main */}                <Route
                                            exact path="/dashboard"
                                            component={() => (
                                                <Decks
                                                    user={user}
                                                    _colSize={_determineColSize}
                                                    _device={_determineDevice}
                                                />
                                            )}
                                        />
            {/* Main */}                <Route
                                            path="/dashboard/login"
                                            component={() => (
                                                <Login
                                                    user={user}
                                                    _colSize={_determineColSize}
                                                    _device={_determineDevice}
                                                />
                                            )}
                                        />
            {/* Main */}                <Route
                                            path="/dashboard/signup"
                                            component={() => (
                                                <Signup
                                                    user={user}
                                                    _colSize={_determineColSize}
                                                    _device={_determineDevice}
                                                />
                                            )}
                                        />
            {/* Language-Learning */}   <Route
                                            path="/dashboard/language-learning/create-deck"
                                            component={() => (
                                                <CreateDeck
                                                    user={user}
                                                    _colSize={_determineColSize}
                                                    _device={_determineDevice}
                                                />
                                            )}
                                        />
            {/* Language-Learning */}   <Route
                                            path="/dashboard/language-learning/decks"
                                            component={() => (
                                                <Decks
                                                    user={user}
                                                    _colSize={_determineColSize}
                                                    _device={_determineDevice}
                                                />
                                            )}
                                        />
            {/* Language-Learning */}   <Route
                                            path="/dashboard/language-learning/edit"
                                            component={() => (
                                                <EditDeck
                                                    user={user}
                                                    _colSize={_determineColSize}
                                                    _device={_determineDevice}
                                                />
                                            )}
                                        />
            {/* Language-Learning */}   <Route
                                            path="/dashboard/language-learning/example-quiz"
                                            component={() => (
                                                <ExampleQuiz
                                                    user={user}
                                                    _colSize={_determineColSize}
                                                    _device={_determineDevice}
                                                />
                                            )}
                                        />
            {/* Language-Learning */}   <Route
                                            path="/dashboard/language-learning/quiz"
                                            component={() => (
                                                <Quiz
                                                    user={user}
                                                    _colSize={_determineColSize}
                                                    _device={_determineDevice}
                                                />
                                            )} 
                                        />
            {/* Resume */}              <Route
                                            path="/dashboard/resume/add-work-experience"
                                            component={() => (
                                                <AddWorkExperience
                                                    _colSize={_determineColSize}
                                                    _device={_determineDevice}
                                                    user={user}
                                                />
                                            )}
                                        />
            {/* Resume */}              <Route
                                            path="/dashboard/resume/"
                                            component={() => (
                                                <Resume
                                                    user={user}
                                                    _colSize={_determineColSize}
                                                    _device={_determineDevice}
                                                />
                                            )}
                                        />

            {/* --- JavaScript --- */}
            {/* Testing */} <Route path="/dashboard/scanner-js" component={() => <ScannerJS user={user} />} />
        </Switch>
    );
};


export default DashboardRoutes


