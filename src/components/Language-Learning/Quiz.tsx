import {
    PureComponent,
    ChangeEvent,
    FocusEvent,
    KeyboardEvent,
    MouseEvent,
    RefObject,
    createRef
} from "react";
import { Link } from "react-router-dom";
import { BR } from "../functional-components/GlobalFC";
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
            cycles: 1,
            lastRound: false,
            quizMode: 0,
            quizCompleted: false,
            quizStarted: false,
            showAnswer: false,
            showHint: false,
            colSize: "",
            device: ""
        };

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
        this.toggleAnswer = this.toggleAnswer.bind(this);
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
        if (this.state.answer.text.toLowerCase() === "sk") {
            if (this.answerRef !== null) {
                if (this.answerRef.current !== null) {
                    if (this.answerRef.current.value !== null) {
                        this.answerRef.current.value = "";
                    }
                }
            }

            this.getNextCard();
        } else if (this.state.answer.text.toLowerCase() === "sh") {
            this.toggleHint();

            if (this.answerRef !== null) {
                if (this.answerRef.current !== null) {
                    if (this.answerRef.current.value !== null) {
                        this.answerRef.current.value = "";
                    }
                }
            }
        } else if (this.state.answer.text.toLowerCase() === "sa") {
            this.toggleAnswer();

            if (this.answerRef !== null) {
                if (this.answerRef.current !== null) {
                    if (this.answerRef.current.value !== null) {
                        this.answerRef.current.value = "";
                    }
                }
            }
        } else {
            if (this.state.quizMode === 0) {
                if (this.state.currentCard.chinese.toLowerCase() === this.state.answer.text.toLowerCase() || this.state.answer.text === "---") {
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
                                    if (this.answerStatusRef.current.classList.contains(`quiz-answer-incorrect-${this.state.device}`)) {
                                        this.answerStatusRef.current.classList.remove(`quiz-answer-incorrect-${this.state.device}`);
                                    }

                                    this.answerStatusRef.current.classList.add(`quiz--answer-correct-${this.state.device}`);
                                }

                                this.answerStatusRef.current.innerHTML = "Correct!";

                                setTimeout((): void => {
                                    if (this.answerStatusRef !== null) {
                                        if (this.answerStatusRef.current !== null) {
                                            this.answerStatusRef.current.innerHTML = "";
                                        }
                                    }
                                }, 750);
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
                                if (this.answerStatusRef.current.classList.contains(`quiz--answer-correct-${this.state.device}`)) {
                                    this.answerStatusRef.current.classList.remove(`quiz--answer-correct-${this.state.device}`);
                                }

                                this.answerStatusRef.current.classList.add(`quiz-answer-incorrect-${this.state.device}`);
                            }

                            this.answerStatusRef.current.innerHTML = "Incorrect";

                            setTimeout((): void => {
                                if (this.answerStatusRef !== null) {
                                    if (this.answerStatusRef.current !== null) {
                                        this.answerStatusRef.current.innerHTML = "";
                                    }
                                }
                            }, 750);
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
                if (this.state.currentCard.english.toLowerCase() === this.state.answer.text.toLowerCase() || this.state.answer.text === "---") {
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
                                    if (this.answerStatusRef.current.classList.contains(`quiz-answer-incorrect-${this.state.device}`)) {
                                        this.answerStatusRef.current.classList.remove(`quiz-answer-incorrect-${this.state.device}`);
                                    }

                                    this.answerStatusRef.current.classList.add(`quiz--answer-correct-${this.state.device}`);
                                }

                                this.answerStatusRef.current.innerHTML = "Correct!";

                                setTimeout((): void => {
                                    if (this.answerStatusRef !== null) {
                                        if (this.answerStatusRef.current !== null) {
                                            this.answerStatusRef.current.innerHTML = "";
                                        }
                                    }
                                }, 750);
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
                                if (this.answerStatusRef.current.classList.contains(`quiz--answer-correct-${this.state.device}`)) {
                                    this.answerStatusRef.current.classList.remove(`quiz--answer-correct-${this.state.device}`);
                                }

                                this.answerStatusRef.current.classList.add(`quiz-answer-incorrect-${this.state.device}`);
                            }

                            this.answerStatusRef.current.innerHTML = "Incorrect";

                            setTimeout((): void => {
                                if (this.answerStatusRef !== null) {
                                    if (this.answerStatusRef.current !== null) {
                                        this.answerStatusRef.current.innerHTML = "";
                                    }
                                }
                            }, 750);
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
    }

    async getCards(): Promise<void> {
        const breakpoint: number = window.location.href.indexOf("?");
        let url: string = window.location.href.substr(breakpoint + 4, window.location.href.length - 1);

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
                        this.getNextCard();
                    });
                }
            });
    }

    getNextCard(): void {
        let cards: TCard[] = [];
        let initializeLastRound: boolean = true;

        this.state.cards.forEach((card: TCard): void => {
            if (card && card.timesAnsweredCorrectly) {
                if (card.timesAnsweredCorrectly < this.state.cycles - 1) {
                    initializeLastRound = false;
                }
            }
        });

        if (initializeLastRound === true) {
            this.state.cards.forEach((card: TCard): void => {
                if (card._id !== this.state.currentCard._id && parseInt(`${card.timesAnsweredCorrectly}`, 10) < this.state.cycles) {
                    cards.push(card);
                }
            });
        } else {
            this.state.cards.forEach((card: TCard): void => {
                if (card._id !== this.state.currentCard._id && parseInt(`${card.timesAnsweredCorrectly}`, 10) < this.state.cycles - 1) {
                    cards.push(card);
                }
            });
        }

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
                showAnswer: false,
                showHint: false
            }, (): void => {

            });
        } else {
            this.setState({
                quizCompleted: true,
                quizStarted: false,
                showAnswer: false,
                showHint: false
            }, (): void => {
                generateMessage("success", "Congratulations! You have mastered all of the cards in this deck");
            });
        }
    }

    handleChange(e: ChangeEvent<HTMLInputElement>): void {
        const name: string = e.currentTarget.name;
        const value: string | number = typeof (parseInt(e.currentTarget.value, 10)) === "number" ? parseInt(e.currentTarget.value, 10) : e.currentTarget.value;

        if (name === "answer") {
            this.setState({
                answer: {
                    ...this.state.answer,
                    text: e.currentTarget.value
                }
            });
        } else {
            this.setState((prevState: State) => ({
                ...prevState,
                [name]: value
            }));
        }
    }

    handleCbChange(e: ChangeEvent<HTMLInputElement>): void {
        const id: string = e.currentTarget.id;
        const name: string = e.currentTarget.name;
        const value: any = e.currentTarget.value;
        const checked: boolean = e.currentTarget.checked;

        this.setState((prevState: State) => ({
            ...prevState,
            [name]: id === "rbEnglishToChinese" ? 0 : 1
        }));
    }

    handleFocus(e: FocusEvent<HTMLInputElement>): void {
        e.currentTarget.select();
    }

    toggleAnswer(): void {
        this.setState({
            showAnswer: !this.state.showAnswer
        });
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
            if (parseInt(`${card.timesAnsweredCorrectly}`, 10) < this.state.cycles) {
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
                    <div className={`container container-${this.state.device}`}>
                        <div className="row">
                            <h1 id={`page-title-h1-${this.state.device}`} className={`col${this.state.colSize}-12 center-text`}>Quiz</h1>
                        </div>

                        <Link to="/dashboard/language-learning/decks">Back</Link>

                        <div className="row">
                            <div className={`col${this.state.colSize}-12`}>
                                <hr />
                            </div>
                        </div>

                        <div className="row">
                            <div className={`col${this.state.colSize}-12`}>
                                <label htmlFor="tbCycles">
                                    End quiz after answering each card correctly&nbsp;
                                    <input
                                        type="number"
                                        id="tbCycles"
                                        name="cycles"
                                        defaultValue="1"
                                        onChange={(e: ChangeEvent<HTMLInputElement>): void => this.handleChange(e)}
                                        onFocus={(e: FocusEvent<HTMLInputElement>): void => this.handleFocus(e)}
                                    /> times.
                                </label>
                            </div>
                        </div>

                        <BR colSize={this.state.colSize} />

                        {/* Quiz mode checkbox */}
                        <div className="row">
                            <label htmlFor="rbEnglishToChinese" className={`col${this.state.colSize}-5 middle-align`}>
                                English to Chinese &nbsp;&nbsp;&nbsp;
                                <input
                                    type="radio"
                                    id="rbEnglishToChinese"
                                    name="quizMode"
                                    defaultChecked={true}
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
                                    ref={this.chineseToEnglishRef}
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
                    <div className={`container container-${this.state.device}`}>
                        <div className="row">
                            <h1 id={`page-title-h1-${this.state.device}`} className={`col${this.state.colSize}-12 center-text`}>Quiz</h1>
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
                            <h3 className={`col${this.state.colSize}-11 middle-align center-text`} ref={this.answerStatusRef}>
                                Times answered correctly: {this.state.currentCard.timesAnsweredCorrectly}
                            </h3>

                            <BR colSize={this.state.colSize} />

                            <h3 className={`col${this.state.colSize}-11 middle-align center-text`} ref={this.answerStatusRef}></h3>

                            <BR colSize={this.state.colSize} />

                            <h2 className={`col${this.state.colSize}-11 middle-align center-text`}>
                                {this.state.quizMode === 0
                                    ? this.state.currentCard.english
                                    : this.state.currentCard.chinese
                                }
                            </h2>

                            <BR colSize={this.state.colSize} />

                            {/* Answer */}
                            <input
                                type="text"
                                className={`col${this.state.colSize}-11 middle-align`}
                                name="answer"
                                ref={this.answerRef}
                                onChange={(e: ChangeEvent<HTMLInputElement>): void => this.handleChange(e)}
                                onKeyUp={(e: KeyboardEvent<HTMLInputElement>): void | null => e.key === "Enter" ? this.checkAnswer() : null}
                                onFocus={(e: FocusEvent<HTMLInputElement>): void => this.handleFocus(e)}
                            />

                            <BR colSize={this.state.colSize} />

                            {/* Submit answer button */}
                            <button
                                className={`col${this.state.colSize}-11 middle-align btn btn-primary`}
                                onClick={this.checkAnswer}
                            >Submit</button>

                            <BR colSize={this.state.colSize} />

                            {/* Skip button */}
                            <button
                                className={`col${this.state.colSize}-11 middle-align`}
                                onClick={this.getNextCard}
                            >Skip</button>

                            <BR colSize={this.state.colSize} />

                            {/* Show hint button */}
                            <button
                                className={`col${this.state.colSize}-11 middle-align`}
                                onClick={this.toggleHint}
                            >{this.state.showHint === false
                                ? "Show Hint"
                                : "Hide Hint"
                                }
                            </button>

                            <BR colSize={this.state.colSize} />

                            {/* Hint */}
                            {this.state.showHint === true
                                ? <p className={`col${this.state.colSize}-11 middle-align`}>{this.state.currentCard.pinyin}</p>
                                : <></>
                            }

                            <BR colSize={this.state.colSize} />

                            {/* Show answer button */}

                            <button
                                className={`col${this.state.colSize}-11 middle-align`}
                                onClick={this.toggleAnswer}
                            >{this.state.showAnswer !== true
                                ? "Show Answer"
                                : "Hide Answer"
                                }
                            </button>

                            <BR colSize={this.state.colSize} />

                            {/* Card answer */}
                            {this.state.showAnswer === true
                                ? <p className={`col${this.state.colSize}-11 middle-align center-text`}>
                                    {this.state.quizMode === 0
                                        ? this.state.currentCard.chinese
                                        : this.state.currentCard.english
                                    }
                                </p>
                                : <></>
                            }
                        </div>
                    </div>
                );
        }

        const desktopRender: () => JSX.Element = (): JSX.Element => {
            return this.state.quizStarted === false
                ? (
                    <div className={`container container-${this.state.device}`}>
                        <div className="row">
                            <h1 id={`page-title-h1-${this.state.device}`} className={`col${this.state.colSize}-12 center-text`}>Quiz</h1>
                        </div>

                        <Link to="/dashboard/language-learning/decks">Back</Link>

                        <div className="row">
                            <div className={`col${this.state.colSize}-12`}>
                                <hr />
                            </div>
                        </div>

                        <div className="row">
                            <div className={`col${this.state.colSize}-12`}>
                                <label htmlFor="tbCycles">
                                    End quiz after answering each card correctly&nbsp;
                                    <input
                                        type="number"
                                        id="tbCycles"
                                        name="cycles"
                                        defaultValue="1"
                                        onChange={(e: ChangeEvent<HTMLInputElement>): void => this.handleChange(e)}
                                        onFocus={(e: FocusEvent<HTMLInputElement>): void => this.handleFocus(e)}
                                    /> times.
                                </label>
                            </div>
                        </div>

                        <BR colSize={this.state.colSize} />

                        {/* Quiz mode checkbox */}
                        <div className="row">
                            <label htmlFor="rbEnglishToChinese" className={`col${this.state.colSize}-5 middle-align`}>
                                English to Chinese &nbsp;&nbsp;&nbsp;
                                <input
                                    type="radio"
                                    id="rbEnglishToChinese"
                                    name="quizMode"
                                    defaultChecked={true}
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
                                    ref={this.chineseToEnglishRef}
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
                    <div className={`container container-${this.state.device}`}>
                        <div className="row">
                            <h1 id={`page-title-h1-${this.state.device}`} className={`col${this.state.colSize}-12 center-text`}>Quiz</h1>
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
                            <h3 className={`col${this.state.colSize}-11 middle-align center-text`} ref={this.answerStatusRef}>
                                Times answered correctly: {this.state.currentCard.timesAnsweredCorrectly}
                            </h3>

                            <BR colSize={this.state.colSize} />

                            <h3 className={`col${this.state.colSize}-11 middle-align center-text`} ref={this.answerStatusRef}></h3>

                            <BR colSize={this.state.colSize} />

                            <h2 className={`col${this.state.colSize}-11 middle-align center-text`}>
                                {this.state.quizMode === 0
                                    ? this.state.currentCard.english
                                    : this.state.currentCard.chinese
                                }
                            </h2>

                            <BR colSize={this.state.colSize} />

                            {/* Answer */}
                            <input
                                type="text"
                                className={`col${this.state.colSize}-11 middle-align`}
                                name="answer"
                                ref={this.answerRef}
                                onChange={(e: ChangeEvent<HTMLInputElement>): void => this.handleChange(e)}
                                onKeyUp={(e: KeyboardEvent<HTMLInputElement>): void | null => e.key === "Enter" ? this.checkAnswer() : null}
                                onFocus={(e: FocusEvent<HTMLInputElement>): void => this.handleFocus(e)}
                            />

                            <BR colSize={this.state.colSize} />

                            {/* Submit answer button */}
                            <button
                                className={`col${this.state.colSize}-11 middle-align btn btn-primary`}
                                onClick={this.checkAnswer}
                            >Submit</button>

                            <BR colSize={this.state.colSize} />

                            {/* Skip button */}
                            <button
                                className={`col${this.state.colSize}-11 middle-align`}
                                onClick={this.getNextCard}
                            >Skip</button>

                            <BR colSize={this.state.colSize} />

                            {/* Show hint button */}
                            <button
                                className={`col${this.state.colSize}-11 middle-align`}
                                onClick={this.toggleHint}
                            >{this.state.showHint === false
                                ? "Show Hint"
                                : "Hide Hint"
                                }
                            </button>

                            <BR colSize={this.state.colSize} />

                            {/* Hint */}
                            {this.state.showHint === true
                                ? <p className={`col${this.state.colSize}-11 middle-align`}>{this.state.currentCard.pinyin}</p>
                                : <></>
                            }

                            <BR colSize={this.state.colSize} />

                            {/* Show answer button */}

                            <button
                                className={`col${this.state.colSize}-11 middle-align`}
                                onClick={this.toggleAnswer}
                            >{this.state.showAnswer !== true
                                ? "Show Answer"
                                : "Hide Answer"
                                }
                            </button>

                            <BR colSize={this.state.colSize} />

                            {/* Card answer */}
                            {this.state.showAnswer === true
                                ? <p className={`col${this.state.colSize}-11 middle-align center-text`}>
                                    {this.state.quizMode === 0
                                        ? this.state.currentCard.chinese
                                        : this.state.currentCard.english
                                    }
                                </p>
                                : <></>
                            }
                        </div>
                    </div>
                );
        }

        return this.state.device === "mobile"
            ? mobileRender()
            : desktopRender();
    }
}