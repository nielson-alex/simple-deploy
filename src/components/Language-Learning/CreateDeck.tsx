import { PureComponent, ChangeEvent, KeyboardEvent, RefObject, createRef } from "react";
import { Link } from "react-router-dom";
import { Props } from "../../types/TGlobal";
import { State, TCard } from "../../types/TCreateDeck";
import { BR } from "../functional-components/GlobalFC";
import { generateMessage } from "../../helpers/functions";
import "../../css/GlobalCSS.css";
import "../../css/CreateDeckCSS.css";

export default class Decks extends PureComponent<Props, State> {
    _isMounted: boolean;
    englishRef: RefObject<HTMLInputElement>;
    chineseRef: RefObject<HTMLInputElement>;
    pinyinRef: RefObject<HTMLInputElement>;

    constructor(props: Props) {
        super(props);
        this.state = {
            cards: [] as TCard[],
            cardNum: 1,
            currentCard: {
                chinese: "",
                deckName: "",
                english: "",
                number: -1,
                pinyin: ""
            },
            firstName: "",
            lastName: "",
            deckName: "",
            colSize: "",
            device: ""
        } as State;

        this._isMounted = true;
        this.englishRef = createRef();
        this.chineseRef = createRef();
        this.pinyinRef = createRef();

        this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
        this.addCardToDeck = this.addCardToDeck.bind(this);
        this.allFieldsValid = this.allFieldsValid.bind(this);
        this.cardIsValid = this.cardIsValid.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleChangeCardAttribute = this.handleChangeCardAttribute.bind(this);
        this.handleSaveDeck = this.handleSaveDeck.bind(this);
    }

    componentDidMount(): void {
        this._isMounted = true;

        if (this._isMounted === true) {
            window.addEventListener("resize", this.updateWindowDimensions);
            this.updateWindowDimensions();
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

    addCardToDeck(): void {
        const cards: TCard[] = this.state.cards.map((card: TCard): TCard => card);

        if (this.cardIsValid()) {
            cards.push(this.state.currentCard);
        }

        this.setState({
            cards: cards,
            cardNum: this.state.cardNum + 1,
            currentCard: {
                deckName: this.state.deckName,
                english: "",
                chinese: "",
                pinyin: "",
                number: this.state.cardNum
            } as TCard
        }, (): void => {
            console.log("this.state.cards:", this.state.cards);

            if (this.englishRef?.current !== null) {
                this.englishRef.current.value = "";
                this.englishRef.current.select();
            }

            if (this.chineseRef?.current !== null) {
                this.chineseRef.current.value = "";
            }

            if (this.pinyinRef?.current !== null) {
                this.pinyinRef.current.value = "";
            }
        });
    }

    cardIsValid(): boolean {
        let isValid: boolean = true;

        if (this.state.currentCard.english === "") {
            generateMessage("error", "Please add English definition before adding card to deck");
            isValid = false;
        } else if (this.state.currentCard.chinese === "") {
            generateMessage("error", "Please add Chinese definition before adding card to deck");
            isValid = false;
        }

        return isValid;
    }

    handleChange(e: ChangeEvent<HTMLInputElement>): void {
        const name: string = e.currentTarget.name;
        const value: string = e.currentTarget.value;

        this.setState((prevState: State) => ({
            ...prevState,
            [name]: value
        }));
    }

    handleChangeCardAttribute(e: ChangeEvent<HTMLInputElement>): void {
        let currentCard: TCard = this.state.currentCard;
        const name: string = e.currentTarget.name;
        const value: string = e.currentTarget.value;

        if (name === "english") {
            currentCard.english = value;
        } else if (name === "chinese") {
            currentCard.chinese = value;
        } else if (name === "pinyin") {
            currentCard.pinyin = value;
        }

        currentCard.deckName = this.state.deckName;
        currentCard.number = this.state.cardNum;

        console.log("currentCard:", currentCard);

        this.setState({
            currentCard: currentCard
        }, (): void => {
            console.log("this.state.currentCard:", this.state.currentCard);
        });
    }

    handleSaveDeck(): void {
        if (this.allFieldsValid()) {
            fetch("/decks/add_deck", {
                method: "POST",
                headers: {
                    "Content-Type": "application/JSON; charset=UTF-8"
                },
                body: JSON.stringify({
                    creator: `${this.state.firstName} ${this.state.lastName}`,
                    deck_name: this.state.deckName,
                    cards: this.state.cards.map((card: TCard): any => ({
                        deck_name: card.deckName,
                        english: card.english,
                        chinese: card.chinese,
                        pinyin: card.pinyin,
                        number: card.number
                    }))
                })
            })
                .then((): void => generateMessage("success", "Deck successfully created"));
        }
    }

    allFieldsValid(): boolean {
        let isValid: boolean = true;

        if (this.state.firstName === "") {
            generateMessage("error", "Please provide a first name");
            isValid = false;
        } else if (this.state.lastName === "") {
            generateMessage("error", "Please provide a last name");
            isValid = false;
        } else if (this.state.deckName === "") {
            generateMessage("error", "Please provide a name for this deck");
            isValid = false;
        } else if (this.state.cards.length < 1) {
            generateMessage("error", "Deck must contain at least one card");
            isValid = false;
        }

        return isValid;
    }

    render(): JSX.Element {
        const mobileRender: () => JSX.Element = (): JSX.Element => {
            return (
                <div className={`container container-${this.state.device}`}>
                    <div className="row">
                        <h1 className={`col${this.state.colSize}-12 center-text`}>Create New Deck</h1>
                    </div>

                    <Link to="/dashboard/language-learning/decks">Decks</Link>

                    <div className="row">
                        <div className={`col${this.state.colSize}-11 middle-align`}>
                            <hr />
                        </div>
                    </div>

                    <div className="row">
                        <p className={`col${this.state.colSize}-11 middle-align`}>{this.state.cards.length} cards created</p>
                    </div>

                    {/* First name */}
                    <div className="row">
                        <label htmlFor="firstName" className={`col${this.state.colSize}-11 middle-align`}>First Name:</label>
                        <input
                            type="text"
                            id="firstName"
                            className={`col${this.state.colSize}-11 middle-align`}
                            name="firstName"
                            onChange={(e: ChangeEvent<HTMLInputElement>): void => this.handleChange(e)}
                        />
                    </div>

                    {/* Last name */}
                    <div className="row">
                        <label htmlFor="lastName" className={`col${this.state.colSize}-11 middle-align`}>Last Name:</label>
                        <input
                            type="text"
                            id="lastName"
                            className={`col${this.state.colSize}-11 middle-align`}
                            name="lastName"
                            onChange={(e: ChangeEvent<HTMLInputElement>): void => this.handleChange(e)}
                        />
                    </div>

                    {/* Deck name */}
                    <div className="row">
                        <label htmlFor="deckName" className={`col${this.state.colSize}-11 middle-align`}>Deck Name:</label>
                        <input
                            type="text"
                            id="deckName"
                            className={`col${this.state.colSize}-11 middle-align`}
                            name="deckName"
                            onChange={(e: ChangeEvent<HTMLInputElement>): void => this.handleChange(e)}
                        />
                    </div>

                    {/* Card */}
                    <div className="row">
                        {/* English */}
                        <label htmlFor="english" className={`col${this.state.colSize}-11 middle-align`}>English:</label>
                        <input
                            type="text"
                            id="english"
                            className={`col${this.state.colSize}-11 middle-align`}
                            name="english"
                            ref={this.englishRef}
                            onChange={(e: ChangeEvent<HTMLInputElement>): void => this.handleChangeCardAttribute(e)}
                            onKeyUp={(e: KeyboardEvent<HTMLInputElement>): void | null => e.key === "Enter" ? this.addCardToDeck() : null}
                        />

                        {/* Chinese */}
                        <label htmlFor="chinese" className={`col${this.state.colSize}-11 middle-align`}>中文：</label>
                        <input
                            type="text"
                            id="chinese"
                            className={`col${this.state.colSize}-11 middle-align`}
                            name="chinese"
                            ref={this.chineseRef}
                            onChange={(e: ChangeEvent<HTMLInputElement>): void => this.handleChangeCardAttribute(e)}
                            onKeyUp={(e: KeyboardEvent<HTMLInputElement>): void | null => e.key === "Enter" ? this.addCardToDeck() : null}
                        />

                        {/* Pinyin */}
                        <label htmlFor="pinyin" className={`col${this.state.colSize}-11 middle-align`}>Pinyin:</label>
                        <input
                            type="text"
                            id="pinyin"
                            className={`col${this.state.colSize}-11 middle-align`}
                            name="pinyin"
                            ref={this.pinyinRef}
                            onChange={(e: ChangeEvent<HTMLInputElement>): void => this.handleChangeCardAttribute(e)}
                            onKeyUp={(e: KeyboardEvent<HTMLInputElement>): void | null => e.key === "Enter" ? this.addCardToDeck() : null}
                        />
                    </div>

                    <BR colSize={this.state.colSize} />

                    {/* Add card button */}
                    <div className="row">
                        <button
                            className={`col${this.state.colSize}-8 middle-align`}
                            onClick={this.addCardToDeck}
                        >Add Card to Deck</button>
                    </div>

                    <BR colSize={this.state.colSize} />

                    {/* Save deck button */}
                    <div className="row">
                        <button
                            className={`col${this.state.colSize}-8 middle-align`}
                            onClick={this.handleSaveDeck}
                        >Save Deck</button>
                    </div>

                    {/* Existing cards */}
                    {this.state.cards.length > 0
                        ? this.state.cards.map((card: TCard): JSX.Element => {

                            return (
                                <div key={card.number}>
                                    <ul key={`${this.state.deckName}-card-${card.number}`}>
                                        <li key={`card-number-${card.number}`}>{card.number}</li>
                                        <li key={`${card.number}-english`}>English: {card.english}</li>
                                        <li key={`${card.number}-chinese`}>中文： {card.chinese}</li>
                                        <li key={`${card.number}-pinyin`}>Pinyin: {card.pinyin}</li>
                                    </ul>
                                </div>
                            );
                        })
                        : <></>
                    }
                </div>
            );
        }

        const desktopRender: () => JSX.Element = (): JSX.Element => {
            return (
                <div className={`container container-${this.state.device}`}>
                    <div className="row">
                        <h1 className={`col${this.state.colSize}-12 center-text`}>Create New Deck</h1>
                    </div>

                    <Link to="/dashboard/language-learning/decks">Decks</Link>

                    <div className="row">
                        <div className={`col${this.state.colSize}-11 middle-align`}>
                            <hr />
                        </div>
                    </div>

                    {/* First name */}
                    <div className="row">
                        <label htmlFor="firstName" className={`col${this.state.colSize}-11 middle-align`}>First Name:</label>
                        <input
                            type="text"
                            id="firstName"
                            className={`col${this.state.colSize}-11 middle-align`}
                            name="firstName"
                            onChange={(e: ChangeEvent<HTMLInputElement>): void => this.handleChange(e)}
                        />
                    </div>

                    {/* Last name */}
                    <div className="row">
                        <label htmlFor="lastName" className={`col${this.state.colSize}-11 middle-align`}>Last Name:</label>
                        <input
                            type="text"
                            id="lastName"
                            className={`col${this.state.colSize}-11 middle-align`}
                            name="lastName"
                            onChange={(e: ChangeEvent<HTMLInputElement>): void => this.handleChange(e)}
                        />
                    </div>

                    {/* Deck name */}
                    <div className="row">
                        <label htmlFor="deckName" className={`col${this.state.colSize}-11 middle-align`}>Deck Name:</label>
                        <input
                            type="text"
                            id="deckName"
                            className={`col${this.state.colSize}-11 middle-align`}
                            name="deckName"
                            onChange={(e: ChangeEvent<HTMLInputElement>): void => this.handleChange(e)}
                        />
                    </div>

                    {/* Card */}
                    <div className="row">
                        {/* English */}
                        <label htmlFor="english" className={`col${this.state.colSize}-11 middle-align`}>English:</label>
                        <input
                            type="text"
                            id="english"
                            className={`col${this.state.colSize}-11 middle-align`}
                            name="english"
                            ref={this.englishRef}
                            onChange={(e: ChangeEvent<HTMLInputElement>): void => this.handleChangeCardAttribute(e)}
                        />

                        {/* Chinese */}
                        <label htmlFor="chinese" className={`col${this.state.colSize}-11 middle-align`}>中文：</label>
                        <input
                            type="text"
                            id="chinese"
                            className={`col${this.state.colSize}-11 middle-align`}
                            name="chinese"
                            ref={this.chineseRef}
                            onChange={(e: ChangeEvent<HTMLInputElement>): void => this.handleChangeCardAttribute(e)}
                        />

                        {/* Pinyin */}
                        <label htmlFor="pinyin" className={`col${this.state.colSize}-11 middle-align`}>Pinyin:</label>
                        <input
                            type="text"
                            id="pinyin"
                            className={`col${this.state.colSize}-11 middle-align`}
                            name="pinyin"
                            ref={this.pinyinRef}
                            onChange={(e: ChangeEvent<HTMLInputElement>): void => this.handleChangeCardAttribute(e)}
                        />
                    </div>

                    {/* Add card button */}
                    <div className="row">
                        <button
                            className={`col${this.state.colSize}-8 middle-align`}
                            onClick={this.addCardToDeck}
                        >Add Card to Deck</button>
                    </div>

                    {/* Existing cards */}
                    {this.state.cards.length > 0
                        ? this.state.cards.map((card: TCard): JSX.Element => {

                            return (
                                <div key={card.number}>
                                    <ul>
                                        <li>{card.number}</li>
                                        <li>English: {card.english}</li>
                                        <li>中文： {card.chinese}</li>
                                        <li>Pinyin: {card.pinyin}</li>
                                    </ul>
                                </div>
                            );
                        })
                        : <></>
                    }

                    {/* Save deck button */}
                    <div className="row">
                        <button
                            className={`col${this.state.colSize}-8 middle-align`}
                            onClick={this.handleSaveDeck}
                        >Save Deck</button>
                    </div>
                </div>
            );
        }

        return this.state.device === "mobile"
            ? mobileRender()
            : desktopRender();
    }
}