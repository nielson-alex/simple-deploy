import { PureComponent } from "react";
import { Props } from "../../types/TGlobal";
import { State, TCard } from "../../types/TQuiz";
import "../../css/GlobalCSS.css";
import "../../css/QuizCSS.css";

export default class Quiz extends PureComponent<Props, State> {
    _isMounted: boolean;

    constructor(props: Props) {
        super(props);
        this.state = {
            cards: [] as TCard[],
            colSize: "",
            device: ""
        } as State;

        this._isMounted = true;
        this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
        this.getCards = this.getCards.bind(this);
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
                    number: card.number
                } as TCard));

                if (this._isMounted === true) {
                    this.setState({
                        cards: cards
                    });
                }
            })
    }

    render(): JSX.Element {
        const mobileRender: () => JSX.Element = (): JSX.Element => {
            return (
                <div className="container">
                    <div className="row">
                        <h1 id="landing-page-title-h1" className={`col${this.state.colSize}-12 center-text`}>Quiz</h1>
                    </div>

                    <div className="row">
                        <div className={`col${this.state.colSize}-12`}>
                            <hr />
                        </div>
                    </div>

                    {/* Cards */}
                    {this.state.cards.length > 0
                        ? <ul>
                            {this.state.cards.map((card: TCard): JSX.Element => <li key={card._id}>{card.english}</li>)}
                        </ul>
                        : <></>
                    }
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