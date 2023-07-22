import { Switch, Route } from "react-router-dom";

/* TypeScript imports */
/* Language-Learning */ import CreateDeck from "./components/Language-Learning/CreateDeck";
/* Language-Learning */ import Decks from "./components/Language-Learning/Decks";
/* Language-Learning */ import EditDeck from "./components/Language-Learning/EditDeck";
/* Language-Learning */ import ExampleQuiz from "./components/Language-Learning/ExampleQuiz";
/* Language-Learning */ import Quiz from "./components/Language-Learning/Quiz";

/* JavaScript imports */
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
           

            {/* --- JavaScript --- */}
        </Switch>
    );
};


export default DashboardRoutes


