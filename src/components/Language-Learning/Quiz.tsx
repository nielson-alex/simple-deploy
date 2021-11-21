import {
    PureComponent,
    ChangeEvent,
    FocusEvent,
    KeyboardEvent,
    MouseEvent,
    RefObject,
    createRef
} from "react";
import { Props } from "../../types/TGlobal";
import { State, TCard } from "../../types/TQuiz";
import { generateMessage } from "../../helpers/functions";
import "../../css/GlobalCSS.css";
import "../../css/QuizCSS.css";

export default class Quiz extends PureComponent<Props, State> {
    _isMounted: boolean;
    answerRef: RefObject<HTMLInputElement>;
    answerStatusRef: RefObject<HTMLHeadingElement>;
    englishToChineseRef: RefObject<HTMLInputElement>;
    chineseToEnglishRef: RefObject<HTMLInputElement>;

    constructor(props: Props) {
        super(props);
        this.state = {
            answer: {
                correct: false,
                text: ""
            },
            cards: [] as TCard[],
            currentCard: {
                _id: "",
                chinese: "",
                deckName: "",
                english: "",
                number: -1,
                pinyin: "",
                timesAnsweredCorrectly: -1
            } as TCard,
            quizMode: 0,
            quizCompleted: false,
            quizStarted: false,
            showHint: false,
            colSize: "",
            device: ""
        } as State;

        this._isMounted = true;
        this.answerRef = createRef();
        this.answerStatusRef = createRef();
        this.englishToChineseRef = createRef();
        this.chineseToEnglishRef = createRef();
        this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
        this.checkAnswer = this.checkAnswer.bind(this);
        this.getCards = this.getCards.bind(this);
        this.getNextCard = this.getNextCard.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleCbChange = this.handleCbChange.bind(this);
        this.handleFocus = this.handleFocus.bind(this);
        this.toggleHint = this.toggleHint.bind(this);
        this.quizComplete = this.quizComplete.bind(this);
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

    checkAnswer(): void {
        if (this.state.quizMode === 0) {
            if (this.state.currentCard.chinese.toLowerCase() === this.state.answer.text.toLowerCase()) {
                this.quizComplete();

                const currentCard: TCard = {
                    ...this.state.currentCard,
                    timesAnsweredCorrectly: parseInt(`${this.state.currentCard.timesAnsweredCorrectly}`, 10) + 1
                };
                const cards: TCard[] = this.state.cards.map((card: TCard): TCard => card);
                const idx: number = cards.map((card: TCard): string => card._id).indexOf(this.state.currentCard._id);
                cards[idx] = currentCard;

                this.setState({
                    answer: {
                        correct: true,
                        text: ""
                    },
                    cards: cards,
                    currentCard: currentCard,
                    showHint: false
                }, (): void => {
                    if (this.answerStatusRef !== null) {
                        if (this.answerStatusRef.current !== null) {
                            if (this.answerStatusRef.current.classList !== null) {
                                if (this.answerStatusRef.current.classList.contains("quiz-answer-incorrect")) {
                                    this.answerStatusRef.current.classList.remove("quiz-answer-incorrect");
                                }

                                this.answerStatusRef.current.classList.add("quiz-answer-correct");
                            }

                            this.answerStatusRef.current.innerHTML = "Correct!";
                        }
                    }

                    if (this.answerRef !== null) {
                        if (this.answerRef.current !== null) {
                            if (this.answerRef.current.value !== null) {
                                this.answerRef.current.value = "";
                            }
                        }
                    }

                    this.getNextCard();
                });
            } else {
                if (this.answerStatusRef !== null) {
                    if (this.answerStatusRef.current !== null) {
                        if (this.answerStatusRef.current.classList !== null) {
                            if (this.answerStatusRef.current.classList.contains("quiz-answer-correct")) {
                                this.answerStatusRef.current.classList.remove("quiz-answer-correct");
                            }

                            this.answerStatusRef.current.classList.add("quiz-answer-incorrect");
                        }

                        this.answerStatusRef.current.innerHTML = "Incorrect";
                    }
                }

                if (this.answerRef !== null) {
                    if (this.answerRef.current !== null) {
                        if (this.answerRef.current.value !== null) {
                            this.answerRef.current.value = "";
                        }
                    }
                }
            }
        } else {
            if (this.state.currentCard.english.toLowerCase() === this.state.answer.text.toLowerCase()) {
                this.quizComplete();

                const currentCard: TCard = {
                    ...this.state.currentCard,
                    timesAnsweredCorrectly: parseInt(`${this.state.currentCard.timesAnsweredCorrectly}`, 10) + 1
                };
                const cards: TCard[] = this.state.cards.map((card: TCard): TCard => card);
                const idx: number = cards.map((card: TCard): string => card._id).indexOf(this.state.currentCard._id);
                cards[idx] = currentCard;

                this.setState({
                    answer: {
                        correct: true,
                        text: ""
                    },
                    cards: cards,
                    currentCard: currentCard,
                    showHint: false
                }, (): void => {
                    if (this.answerStatusRef !== null) {
                        if (this.answerStatusRef.current !== null) {
                            if (this.answerStatusRef.current.classList !== null) {
                                if (this.answerStatusRef.current.classList.contains("quiz-answer-incorrect")) {
                                    this.answerStatusRef.current.classList.remove("quiz-answer-incorrect");
                                }

                                this.answerStatusRef.current.classList.add("quiz-answer-correct");
                            }

                            this.answerStatusRef.current.innerHTML = "Correct!";
                        }
                    }

                    if (this.answerRef !== null) {
                        if (this.answerRef.current !== null) {
                            if (this.answerRef.current.value !== null) {
                                this.answerRef.current.value = "";
                            }
                        }
                    }

                    this.getNextCard();
                });
            } else {
                if (this.answerStatusRef !== null) {
                    if (this.answerStatusRef.current !== null) {
                        if (this.answerStatusRef.current.classList !== null) {
                            if (this.answerStatusRef.current.classList.contains("quiz-answer-correct")) {
                                this.answerStatusRef.current.classList.remove("quiz-answer-correct");
                            }

                            this.answerStatusRef.current.classList.add("quiz-answer-incorrect");
                        }

                        this.answerStatusRef.current.innerHTML = "Incorrect";
                    }
                }

                if (this.answerRef !== null) {
                    if (this.answerRef.current !== null) {
                        if (this.answerRef.current.value !== null) {
                            this.answerRef.current.value = "";
                        }
                    }
                }
            }
        }
    }

    async getCards(): Promise<void> {
        const breakpoint: number = window.location.href.indexOf("?");
        let url: string = window.location.href.substr(breakpoint + 4, window.location.href.length - 1);

        console.log("url:", url);

        await fetch(`/decks/get_cards_by_deck_id/${url}`)
            .then((res: Response): Promise<Response> => res.json())
            .then((res: any): any => res.data.cards)
            .then((res: any): void => {
                const cards: TCard[] = res.map((card: any): TCard => ({
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
                        currentCard: cards[0]
                    }, (): void => {
                        console.log("this.state.cards:", this.state.cards);
                    });
                }
            });
    }

    getNextCard(): void {
        const cards: TCard[] = [];

        this.state.cards.forEach((card: TCard): void => {
            if (card._id !== this.state.currentCard._id && parseInt(`${card.timesAnsweredCorrectly}`, 10) < 3) {
                cards.push(card);
            }
        });

        if (cards.length > 0) {
            let location1 = Math.floor((Math.random() * cards.length));
            let location2 = Math.floor((Math.random() * cards.length));
            let tmp = cards[location1];

            // for 1000 turns
            // switch the values of two random cards
            for (let i = 0; i < cards.length; i++) {
                cards[location1] = cards[location2];
                cards[location2] = tmp;
            }

            this.setState({
                currentCard: tmp,
                showHint: false
            }, (): void => {
                console.log("this.state.currentCard:", this.state.currentCard);
            });
        } else {
            this.setState({
                quizCompleted: true,
                quizStarted: false,
                showHint: false
            }, (): void => {
                generateMessage("success", "Congratulations! You have mastered all of the cards in this deck");
            });
        }
    }

    handleChange(e: ChangeEvent<HTMLInputElement>): void {
        this.setState({
            answer: {
                ...this.state.answer,
                text: e.currentTarget.value
            }
        });
    }

    handleCbChange(e: ChangeEvent<HTMLInputElement>): void {
        const name: string = e.currentTarget.name;
        const value: any = e.currentTarget.value;
        const checked: boolean = e.currentTarget.checked;

        console.log("name:", name);
        console.log("value:", value);
        console.log("checked:", checked);

        this.setState((prevState: State) => ({
            ...prevState,
            [name]: checked === true ? 0 : 1
        }));
    }

    handleFocus(e: FocusEvent<HTMLInputElement>): void {
        e.currentTarget.select();
    }

    toggleHint(): void {
        this.setState({
            showHint: !this.state.showHint
        });
    }

    quizComplete(): void {
        let isComplete: boolean = true;
        const cards: TCard[] = this.state.cards.map((card: TCard): TCard => card);

        cards.forEach((card: TCard): void => {
            if (parseInt(`${card.timesAnsweredCorrectly}`, 10) < 3) {
                isComplete = false;
            }
        })

        if (isComplete === true) {
            this.setState({
                quizCompleted: true,
                quizStarted: false
            }, (): void => {
                generateMessage("success", "Congratulations, you've mastered all the cards in this deck!");
            });
        }
    }

    render(): JSX.Element {
        const mobileRender: () => JSX.Element = (): JSX.Element => {
            return this.state.quizStarted === false
                ? (
                    <div className="container">
                        <div className="row">
                            <h1 id="landing-page-title-h1" className={`col${this.state.colSize}-12 center-text`}>Quiz</h1>
                        </div>

                        <div className="row">
                            <div className={`col${this.state.colSize}-12`}>
                                <hr />
                            </div>
                        </div>

                        {/* Quiz mode checkbox */}
                        <div className="row">
                            <label htmlFor="rbEnglishToChinese" className={`col${this.state.colSize}-5 middle-align`}>
                                English to Chinese &nbsp;&nbsp;&nbsp;
                                <input
                                    type="radio"
                                    id="rbEnglishToChinese"
                                    name="quizMode"
                                    ref={this.englishToChineseRef}
                                    onChange={(e: ChangeEvent<HTMLInputElement>): void => this.handleCbChange(e)}
                                />
                            </label>

                            <label htmlFor="rbChineseToEnglish" className={`col${this.state.colSize}-5 middle-align`}>
                                Chinese to English &nbsp;&nbsp;&nbsp;
                                <input
                                    type="radio"
                                    id="rbChineseToEnglish"
                                    name="quizMode"
                                    ref={this.englishToChineseRef}
                                    onChange={(e: ChangeEvent<HTMLInputElement>): void => this.handleCbChange(e)}
                                />
                            </label>
                        </div>

                        {/* Start quiz button */}
                        <div className="row">
                            <button
                                className={`col${this.state.colSize}-11 middle-align`}
                                onClick={(e: MouseEvent<HTMLButtonElement>): void => this.setState({ quizStarted: !this.state.quizStarted })}
                            >Start</button>
                        </div>
                    </div>
                )
                : (
                    <div className="container">
                        <div className="row">
                            <h1 id="landing-page-title-h1" className={`col${this.state.colSize}-12 center-text`}>Quiz</h1>
                        </div>

                        <div className="row">
                            <div className={`col${this.state.colSize}-12`}>
                                <hr />
                            </div>
                        </div>

                        {/* Current card */}
                        <div className="row">
                            {/* Card value */}
                            {/* Answer status */}
                            <h3 className={`col${this.state.colSize}-11 middle-align center-text`} ref={this.answerStatusRef}></h3>

                            <h2 className={`col${this.state.colSize}-11 middle-align center-text`}>
                                {this.state.quizMode === 0
                                    ? this.state.currentCard.english
                                    : this.state.currentCard.chinese
                                }
                            </h2>

                            {/* Answer */}
                            <input
                                type="text"
                                className={`col${this.state.colSize}-11 middle-align`}
                                ref={this.answerRef}
                                onChange={(e: ChangeEvent<HTMLInputElement>): void => this.handleChange(e)}
                                onKeyUp={(e: KeyboardEvent<HTMLInputElement>): void | null => e.key === "Enter" ? this.checkAnswer() : null}
                                onFocus={(e: FocusEvent<HTMLInputElement>): void => this.handleFocus(e)}
                            />

                            {/* Submit answer button */}
                            <button
                                className={`col${this.state.colSize}-11 middle-align btn btn-primary`}
                                onClick={this.checkAnswer}
                            >Submit</button>

                            {/* Skip button */}
                            <button
                                className={`col${this.state.colSize}-11 middle-align`}
                                onClick={this.getNextCard}
                            >Skip</button>

                            {/* Show hint button */}
                            <button
                                className={`col${this.state.colSize}-11 middle-align`}
                                onClick={this.toggleHint}
                            >{this.state.showHint === false
                                ? "Show Hint"
                                : "Hide Hint"
                                }
                            </button>

                            {/* Hint */}
                            {this.state.showHint === true
                                ? <p className={`col${this.state.colSize}-11 middle-align`}>{this.state.currentCard.pinyin}</p>
                                : <></>
                            }
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