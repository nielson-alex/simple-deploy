import { PureComponent } from "react";
import { Link } from "react-router-dom";
import { Props } from "../../types/TGlobal";
import {
    State,
    TDeck,
    TCard
} from "../../types/TDecks";
import "../../css/GlobalCSS.css";
import "../../css/DecksCSS.css";

export default class Decks extends PureComponent<Props, State> {
    _isMounted: boolean;

    constructor(props: Props) {
        super(props);
        this.state = {
            decks: this.props?.user?.decks?.sort((a: TDeck, b: TDeck): number => a.deckName > b.deckName ? 1 : -1) || [] as TDeck[],
            colSize: "",
            device: ""
        } as State;

        this._isMounted = true;
        this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
    }

    async componentDidMount(): Promise<void> {
        this._isMounted = true;

        if (this._isMounted === true) {
            window.addEventListener("resize", this.updateWindowDimensions);
            this.updateWindowDimensions();
            await this.getDecks();
        }
    }

    componentWillUnmount(): void {
        window.removeEventListener("resize", this.updateWindowDimensions);
        this._isMounted = false;
    }

    updateWindowDimensions(): void {
        if (window.innerWidth < 576) {
            this.setState({
                colSize: "",
                device: "mobile"
            });
        } else if (window.innerWidth >= 576 && window.innerWidth < 768) {
            this.setState({
                colSize: "-sm",
                device: "mobile"
            });
        } else if (window.innerWidth >= 768 && window.innerWidth < 992) {
            this.setState({
                colSize: "-md",
                device: "desktop"
            });
        } else if (window.innerWidth >= 992 && window.innerWidth < 1200) {
            this.setState({
                colSize: "-lg",
                device: "desktop"
            });
        } else if (window.innerWidth >= 1200) {
            this.setState({
                colSize: "-xl",
                device: "desktop"
            });
        }
    }

    async getDecks(): Promise<void> {
        await fetch("/decks/get_all_decks")
            .then((res: Response): Promise<Response> => res.json())
            .then((res: any): void => res.decks)
            .then((res: any): void => {
                const decks: TDeck[] = res.map((deck: any): TDeck => ({
                    _id: deck._id,
                    creator: deck.creator,
                    deckName: deck.deck_name,
                    cards: deck.cards.map((card: any): TCard => ({
                        deckName: card.deck_name,
                        english: card.english,
                        chinese: card.chinese,
                        pinyin: card.pinyin,
                        number: card.number
                    } as TCard))
                } as TDeck));

                if (this._isMounted === true) {
                    this.setState({
                        decks: decks
                    });
                }
            });
    }

    render(): JSX.Element {
        const mobileRender: () => JSX.Element = (): JSX.Element => {
            return (
                <div className={`container container-${this.state.device}`}>
                    <div className="row">
                        <h1 className={`col${this.state.colSize}-12 center-text`}>{this.props?.user?.first_name}'s Decks</h1>
                    </div>

                    {this.props?.user?._id !== ""
                        ? <Link to="/dashboard/language-learning/create-deck">Create Deck</Link>
                        : null
                    }

                    <div className="row">
                        <div className={`col${this.state.colSize}-11 middle-align`}>
                            <hr />
                        </div>
                    </div>

                    {this.state.decks.length > 0
                        ? (
                            <>
                                {this.state.decks.map((deck: TDeck): JSX.Element => (
                                    <div className="row" key={deck.deckName}>
                                        <h4 className={`col${this.state.colSize}-12 center-text middle-align`}>
                                            {deck.deckName}
                                        </h4>

                                        <Link to={`/dashboard/language-learning/quiz?id=${deck._id}`} className={`col${this.state.colSize}-7 middle-align center-text`}>
                                            Study
                                        </Link>

                                        <Link to={`/dashboard/language-learning/edit?id=${deck._id}`} className={`col${this.state.colSize}-7 middle-align center-text`}>
                                            Edit Deck
                                        </Link>

                                        <div className={`col${this.state.colSize}-12`}>
                                            <hr />
                                        </div>
                                    </div>
                                ))}
                            </>
                        )
                        : (
                            <div className="row">
                                <p className={`col${this.state.colSize}-11 middle-align center-text`}>
                                    You must be signed in to view your created decks
                                </p>
                            </div>
                        )
                    }
                </div>
            );
        }

        const desktopRender: () => JSX.Element = (): JSX.Element => {
            return (
                <div className={`container container-${this.state.device}`}>
                    <div className="row">
                        <h1 className={`col${this.state.colSize}-12 center-text`}>{this.props?.user?.first_name}'s Decks</h1>
                    </div>

                    {this.props?.user?._id !== ""
                        ? <Link to="/dashboard/language-learning/create-deck">Create Deck</Link>
                        : null
                    }

                    <div className="row">
                        <div className={`col${this.state.colSize}-11 middle-align`}>
                            <hr />
                        </div>
                    </div>

                    {this.state.decks.length > 0
                        ? (
                            <>
                                {this.state.decks.map((deck: TDeck): JSX.Element => (
                                    <div className="row" key={deck.deckName}>
                                        <h4 className={`col${this.state.colSize}-12 center-text middle-align`}>
                                            {deck.deckName}
                                        </h4>

                                        <Link to={`/dashboard/language-learning/quiz?id=${deck._id}`} className={`col${this.state.colSize}-7 middle-align center-text`}>
                                            Study
                                        </Link>

                                        <Link to={`/dashboard/language-learning/edit?id=${deck._id}`} className={`col${this.state.colSize}-7 middle-align center-text`}>
                                            Edit Deck
                                        </Link>

                                        <div className={`col${this.state.colSize}-12`}>
                                            <hr />
                                        </div>
                                    </div>
                                ))}
                            </>
                        )
                        : (
                            <div className="row">
                                <p className={`col${this.state.colSize}-11 middle-align center-text`}>
                                    You must be signed in to view your created decks
                                </p>
                            </div>
                        )
                    }
                </div>
            );
        }

        return this.state.device === "mobile"
            ? mobileRender()
            : desktopRender();
    }
}