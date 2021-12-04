import {
    PureComponent,
    ChangeEvent,
    FocusEvent,
    Fragment,
    KeyboardEvent,
    MouseEvent,
    RefObject,
    createRef
} from "react";
import { Props } from "../../types/TGlobal";
import {
    State,
    TCard,
    TNewCard
} from "../../types/TEditDeck";
import "../../css/GlobalCSS.css";
import "../../css/EditDeckCSS.css";
import { generateMessage } from "../../helpers/functions";

export default class EditDeck extends PureComponent<Props, State> {
    _isMounted: boolean;
    newCardEnglishRef: RefObject<HTMLInputElement>;
    newCardChineseRef: RefObject<HTMLInputElement>;
    newCardPinyinRef: RefObject<HTMLInputElement>;

    constructor(props: Props) {
        super(props);
        this.state = {
            cards: [] as TCard[],
            chinese: "",
            creator: "",
            deckName: "",
            english: "",
            newCard: {
                english: "",
                chinese: "",
                pinyin: ""
            } as TNewCard,
            pinyin: "",
            showNewCard: false,
            colSize: "",
            device: ""
        } as State;

        this._isMounted = true;
        this.newCardEnglishRef = createRef();
        this.newCardChineseRef = createRef();
        this.newCardPinyinRef = createRef();

        this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
        this.addCardToDeck = this.addCardToDeck.bind(this);
        this.clearNewCardFields = this.clearNewCardFields.bind(this);
        this.getCards = this.getCards.bind(this);
        this.handleBlur = this.handleBlur.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleDeleteCard = this.handleDeleteCard.bind(this);
        this.handleKeyUp = this.handleKeyUp.bind(this);
        this.isValid = this.isValid.bind(this);
        this.newCardIsValid = this.newCardIsValid.bind(this);
        this.saveDeck = this.saveDeck.bind(this);
        this.toggleShowNewCard = this.toggleShowNewCard.bind(this);
    }

    componentDidMount(): void {
        this._isMounted = true;

        if (this._isMounted === true) {
            window.addEventListener("resize", this.updateWindowDimensions);
            this.updateWindowDimensions();
            this.getCards();
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
        if (this.newCardIsValid()) {
            const cards: TCard[] = this.state.cards.map((card: TCard): TCard => card);
            const newCard: TCard = {
                deckName: this.state.deckName,
                english: this.state.english,
                chinese: this.state.chinese,
                pinyin: this.state.pinyin,
                number: parseInt(`${cards[cards.length - 1].number}`, 10) + 1,
                timesAnsweredCorrectly: 0
            } as TCard;

            cards.push(newCard);

            this.setState({
                cards: cards
            }, (): void => {
                this.clearNewCardFields();
            });
        }
    }

    clearNewCardFields(): void {
        if (this.newCardEnglishRef !== null) {
            if (this.newCardEnglishRef.current !== null) {
                if (this.newCardEnglishRef.current.value !== null) {
                    this.newCardEnglishRef.current.value = "";
                }
            }
        }

        if (this.newCardChineseRef !== null) {
            if (this.newCardChineseRef.current !== null) {
                if (this.newCardChineseRef.current.value !== null) {
                    this.newCardChineseRef.current.value = "";
                }
            }
        }

        if (this.newCardPinyinRef !== null) {
            if (this.newCardPinyinRef.current !== null) {
                if (this.newCardPinyinRef.current.value !== null) {
                    this.newCardPinyinRef.current.value = "";
                }
            }
        }
    }

    async getCards(): Promise<void> {
        const breakpoint: number = window.location.href.indexOf("?");
        let url: string = window.location.href.substr(breakpoint + 4, window.location.href.length - 1);

        await fetch(`/decks/get_cards_by_deck_id/${url}`)
            .then((res: Response): Promise<Response> => res.json())
            .then((res: any): any => {
                return {
                    creator: res.data.creator,
                    cards: res.data.cards
                }
            })
            .then((res: { creator: string, cards: TCard[] }): void => {
                const cards: TCard[] = res.cards.map((card: any): TCard => ({
                    _id: card._id,
                    deckName: card.deck_name,
                    english: card.english,
                    chinese: card.chinese,
                    pinyin: card.pinyin,
                    number: card.number,
                    timesAnsweredCorrectly: 0
                } as TCard));

                if (this._isMounted === true) {
                    this.setState({
                        cards: cards,
                        creator: res.creator,
                        deckName: cards[0].deckName
                    }, (): void => {

                    });
                }
            });
    }

    handleBlur(e: FocusEvent<HTMLInputElement>): void {
        const cards: TCard[] = this.state.cards.map((card: TCard): TCard => card);
        const idx: number = cards.map((card: TCard): any => card._id).indexOf(e.currentTarget.id);
        const name: string = e.currentTarget.name;
        const value: string = e.currentTarget.value;
        let currentCard: TCard = cards[idx];
        currentCard = {
            ...currentCard,
            [name]: value
        } as TCard;

        cards.splice(idx, 1, currentCard);

        this.setState({
            cards: cards
        }, (): void => {
        });
    }

    handleChange(e: ChangeEvent<HTMLInputElement>): void {
        const name: string = e.currentTarget.name;
        const value: string = e.currentTarget.value;

        this.setState((prevState: State) => ({
            ...prevState,
            [name]: value
        }));
    }

    handleDeleteCard(e: MouseEvent<HTMLButtonElement>): void {
        const cards: TCard[] = this.state.cards.map((card: TCard): TCard => card);
        const idx: number = cards.map((card: TCard): any => card._id).indexOf(e.currentTarget.id);
        cards.splice(idx, 1);

        this.setState({
            cards: cards
        });
    }

    handleKeyUp(e: KeyboardEvent<HTMLInputElement>): string | void {
        let val: string = e.currentTarget.value;

        if (e.key === "Enter") {
            this.addCardToDeck();
        } else {
            let pinyin = e.currentTarget.value;
            pinyin = pinyin.replace("a1", "ā");
            pinyin = pinyin.replace("a2", "á");
            pinyin = pinyin.replace("a3", "ǎ");
            pinyin = pinyin.replace("a4", "à");
            pinyin = pinyin.replace("e1", "ē");
            pinyin = pinyin.replace("e2", "é");
            pinyin = pinyin.replace("e3", "ě");
            pinyin = pinyin.replace("e4", "è");
            pinyin = pinyin.replace("i1", "ī");
            pinyin = pinyin.replace("i2", "í");
            pinyin = pinyin.replace("i3", "ǐ");
            pinyin = pinyin.replace("i4", "ì");
            pinyin = pinyin.replace('o1', 'ō');
            pinyin = pinyin.replace('o2', 'ó');
            pinyin = pinyin.replace('o3', 'ǒ');
            pinyin = pinyin.replace('o4', 'ò');
            pinyin = pinyin.replace('u1', 'ū');
            pinyin = pinyin.replace('u2', 'ú');
            pinyin = pinyin.replace('u3', 'ǔ');
            pinyin = pinyin.replace('u4', 'ù');
            pinyin = pinyin.replace('v1', 'ǖ');
            pinyin = pinyin.replace('v2', 'ǘ');
            pinyin = pinyin.replace('v3', 'ǚ');
            pinyin = pinyin.replace('v4', 'ǜ');
            pinyin = pinyin.replace('v5', 'ü');

            val = pinyin;

            e.currentTarget.value = val;
            return val;
        }
    }

    isValid(): boolean {
        let isValid: boolean = true;

        if (this.state.deckName === "") {
            generateMessage("error", "Deck must have a name");
            isValid = false;
        } else if (this.state.cards.length < 1) {
            generateMessage("error", "Deck must have at least one card");
            isValid = false;
        }

        return isValid;
    }

    newCardIsValid(): boolean {
        let isValid: boolean = true;

        if (this.state.english === "") {
            generateMessage("error", "New card to add must have an English definition");
            isValid = false;
        } else if (this.state.chinese === "") {
            generateMessage("error", "New card to add must have a Chinese definition");
            isValid = false;
        }

        return isValid;
    }

    saveDeck(): void {
        if (this.isValid()) {
            const breakpoint: number = window.location.href.indexOf("?");
            let url: string = window.location.href.substr(breakpoint + 4, window.location.href.length - 1);

            fetch("/decks/edit_deck", {
                method: "POST",
                headers: {
                    "Content-Type": "application/JSON; charset=UTF-8"
                },
                body: JSON.stringify({
                    _id: url,
                    deck_name: this.state.deckName,
                    cards: this.state.cards.map((card: TCard): { _id: any; deck_name: string; english: string; chinese: string; pinyin: string; number: number } => ({
                        _id: card._id,
                        deck_name: card.deckName,
                        english: card.english,
                        chinese: card.chinese,
                        pinyin: card.pinyin,
                        number: card.number
                    } as { _id: any; deck_name: string; english: string; chinese: string; pinyin: string; number: number })),
                    creator: this.state.creator
                })
            });
        }
    }

    toggleShowNewCard(): void {
        this.setState({
            showNewCard: !this.state.showNewCard
        });
    }

    render(): JSX.Element {
        const mobileRender: () => JSX.Element = (): JSX.Element => {
            return (
                <div className={`container container-${this.state.device}`}>
                    <div className="row">
                        <h1 id="landing-page-title-h1" className={`col${this.state.colSize}-12 center-text`}>Quiz</h1>
                    </div>

                    <div className="row">
                        <div className={`col${this.state.colSize}-12`}>
                            <hr />
                        </div>
                    </div>

                    {this.state.cards.length > 0
                        ? <div className="row">
                            <table className={`col${this.state.colSize}-11 middle-align`}>
                                {this.state.cards.map((card: TCard): JSX.Element => {
                                    <colgroup>
                                        <col style={{ width: "33.33%" }} />
                                        <col style={{ width: "33.33%" }} />
                                        <col style={{ width: "33.33%" }} />
                                    </colgroup>
                                    return (
                                        <tr key={`${card.deckName}-${card.number}`}>
                                            {/* English */}
                                            <td>
                                                <input
                                                    type="text"
                                                    id={card._id}
                                                    name="english"
                                                    defaultValue={card.english}
                                                    onBlur={(e: FocusEvent<HTMLInputElement>): void => this.handleBlur(e)}
                                                    onFocus={(e: FocusEvent<HTMLInputElement>): void => e.currentTarget.select()}
                                                    onKeyUp={(e: KeyboardEvent<HTMLInputElement>): void | null => e.key === "Enter" ? this.addCardToDeck() : null}
                                                />
                                            </td>

                                            {/* Chinese */}
                                            <td>
                                                <input
                                                    type="text"
                                                    id={card._id}
                                                    name="chinese"
                                                    defaultValue={card.chinese}
                                                    onBlur={(e: FocusEvent<HTMLInputElement>): void => this.handleBlur(e)}
                                                    onFocus={(e: FocusEvent<HTMLInputElement>): void => e.currentTarget.select()}
                                                    onKeyUp={(e: KeyboardEvent<HTMLInputElement>): void | null => e.key === "Enter" ? this.addCardToDeck() : null}
                                                />
                                            </td>

                                            {/* Pinyin */}
                                            <td>
                                                <input
                                                    type="text"
                                                    id={card._id}
                                                    name="pinyin"
                                                    defaultValue={card.pinyin}
                                                    onBlur={(e: FocusEvent<HTMLInputElement>): void => this.handleBlur(e)}
                                                    onFocus={(e: FocusEvent<HTMLInputElement>): void => e.currentTarget.select()}
                                                    onKeyUp={(e: KeyboardEvent<HTMLInputElement>): string | void => this.handleKeyUp(e)}
                                                />
                                            </td>

                                            {/* Delete button */}
                                            <td>
                                                <button
                                                    id={card._id}
                                                    onClick={(e: MouseEvent<HTMLButtonElement>): void => this.handleDeleteCard(e)}
                                                >Delete</button>
                                            </td>
                                        </tr>
                                    )
                                })}
                            </table>
                        </div>
                        : "No cards found in this deck"
                    }

                    {/* Create new card button */}
                    <div className="row">
                        <button
                            className={`col${this.state.colSize}-11 middle-align`}
                            onClick={this.toggleShowNewCard}
                        >Create New Card</button>
                    </div>

                    {/* New card */}
                    {this.state.showNewCard === true
                        ? <div className="row">

                            {/* English (new card) */}
                            <label htmlFor="tbEnglish" className={`col${this.state.colSize}-11 middle-align`}>
                                English:&nbsp;&nbsp;&nbsp;
                                <input
                                    type="text"
                                    id="tbEnglish"
                                    name="english"
                                    onChange={(e: ChangeEvent<HTMLInputElement>): void => this.handleChange(e)}
                                    onFocus={(e: FocusEvent<HTMLInputElement>): void => e.currentTarget.select()}
                                    onKeyUp={(e: KeyboardEvent<HTMLInputElement>): void | null => e.key === "Enter" ? this.addCardToDeck() : null}
                                    ref={this.newCardEnglishRef}
                                />
                            </label>

                            {/* Chinese (new card) */}
                            <label htmlFor="tbChinese" className={`col${this.state.colSize}-11 middle-align`}>
                                Chinese:&nbsp;&nbsp;&nbsp;
                                <input
                                    type="text"
                                    id="tbChinese"
                                    name="chinese"
                                    onChange={(e: ChangeEvent<HTMLInputElement>): void => this.handleChange(e)}
                                    onFocus={(e: FocusEvent<HTMLInputElement>): void => e.currentTarget.select()}
                                    onKeyUp={(e: KeyboardEvent<HTMLInputElement>): void | null => e.key === "Enter" ? this.addCardToDeck() : null}
                                    ref={this.newCardChineseRef}
                                />
                            </label>

                            {/* Pinyin (new card) */}
                            <label htmlFor="tbPinyin" className={`col${this.state.colSize}-11 middle-align`}>
                                Pinyin:&nbsp;&nbsp;&nbsp;
                                <input
                                    type="text"
                                    id="tbPinyin"
                                    name="pinyin"
                                    onChange={(e: ChangeEvent<HTMLInputElement>): void => this.handleChange(e)}
                                    onFocus={(e: FocusEvent<HTMLInputElement>): void => e.currentTarget.select()}
                                    onKeyUp={(e: KeyboardEvent<HTMLInputElement>): void | null => e.key === "Enter" ? this.addCardToDeck() : null}
                                    ref={this.newCardPinyinRef}
                                />
                            </label>

                            <br />

                            {/* Clear fields button */}
                            <button
                                className={`col${this.state.colSize}-11 middle-align`}
                                onClick={this.clearNewCardFields}
                            >Clear Fields</button>

                            {/* Add card to deck button */}
                            <button
                                className={`col${this.state.colSize}-11 middle-align`}
                                onClick={this.addCardToDeck}
                            >Add Card to Deck</button>
                        </div>
                        : <></>
                    }


                    <div className="row">
                        <button
                            className={`col${this.state.colSize}-11 middle-align`}
                            onClick={this.saveDeck}
                        >Save Changes</button>
                    </div>
                </div>
            );
        }

        const desktopRender: () => JSX.Element = (): JSX.Element => {
            return (
                <></>
            );
        }

        return this.state.device === "mobile"
            ? mobileRender()
            : desktopRender();
    }
}