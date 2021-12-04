import { useState, useEffect } from "react";
import { Switch, Route } from "react-router-dom";
import { TCard, TDeck } from "./types/TDecks";
import Dashboard from "./components/Dashboard";
import Home from "./components/Home";

const HR = () => {
    const [dog, setDog] = useState("dog");

    useEffect(() => {
        const getUserBySession = async () => {
            console.log("entered getUserBySession()");

            let user = {
                _id: "",
                decks: [],
                email: "",
                first_name: "",
                last_name: "",
            }

            let cookies = null;

            if (document.cookie) {
                const breakpoint = document.cookie.indexOf("=");

                cookies = {
                    session: document.cookie.substr(breakpoint + 1, document.cookie.length - 1)
                };

                await fetch("/auth/get_user_by_session", {
                    method: "GET",
                    headers: {
                        "id": cookies.session
                    }
                })
                    .then(res => res.json())
                    .then(res => {
                        if (res.data) {
                            if (res.data[0]) {
                                return res?.data[0]
                            }
                        }
                    })
                    .then(res => {
                        user = {
                            ...user,
                            _id: res._id,
                            email: res.email,
                            first_name: res.first_name,
                            last_name: res.last_name,
                        }

                        return user;
                    })
                    .then(async (user) => {
                        await fetch("/decks/get_decks_by_user_id", {
                            method: "GET",
                            headers: {
                                _id: user._id
                            }
                        })
                            .then((res) => res.json())
                            .then((res) => res.data)
                            .then((res) => {
                                if (res.length > 0) {
                                    user = {
                                        ...user,
                                        decks: res.map((deck) => ({
                                            _id: deck._id,
                                            creator: deck.creator,
                                            deckName: deck.deck_name,
                                            cards: deck.cards.map(card => card)
                                        }))
                                    };


                                }

                                setDog(user);
                            });
                    })
            }
        }

        const getDecksByUserId = async (user) => {
            await fetch("/decks/get_decks_by_user_id", {
                method: "GET",
                headers: {
                    _id: user._id
                }
            })
                .then(res => res.json())
                .then(res => res.data)
                .then(res => {
                    if (res.length > 0) {
                        let userCopy = {
                            ...user,
                            decks: res.map((deck) => ({
                                _id: deck._id,
                                creator: deck.creator,
                                deckName: deck.deck_name,
                                cards: deck.cards.map(card => card)
                            }))
                        };

                        setDog(userCopy);
                    }
                });
        }

        getUserBySession();
    }, []);

    useEffect(() => { console.log("dog:", dog); }, [dog]);
    return (
        <Switch>
            <Route exact path="/" component={() => <Home user={dog} />} />
            <Route path="/dashboard" component={() => <Dashboard user={dog} />} />
        </Switch>
    );
}

const Jank = () => {
    const [dog, setDog] = useState("dog");

    return routes(dog);
}

const routes = (user) => {
    return (
        <Switch>
            <Route exact path="/" component={() => <Home user={user} />} />
            <Route path="/dashboard" component={() => <Dashboard user={user} />} />
        </Switch>
    )
}



export default HR;