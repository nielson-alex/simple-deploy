import { PureComponent } from "react";
import { Link } from "react-router-dom";
import { Props } from "../types/TGlobal";
import {
    State,
    TAnimal
} from "../types/TLandingPage";
import "../css/GlobalCSS.css";
import "../css/LandingPageCSS.css";

class LandingPage extends PureComponent<Props, State> {
    _isMounted: boolean = false;

    constructor(props: Props) {
        super(props);
        this.state = {
            animals: [] as TAnimal[],
            colSize: "",
            device: "mobile"
        } as State;

        this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
        this.generateAnimalIcons = this.generateAnimalIcons.bind(this);
        this.getAnimals = this.getAnimals.bind(this);
    }

    componentDidMount(): void {
        this._isMounted = true;

        if (this._isMounted === true) {
            window.addEventListener("resize", this.updateWindowDimensions);
            this.updateWindowDimensions();
            this.getAnimals();
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

    generateAnimalIcons(): JSX.Element[] {
        if (this.state.animals.length > 0) {
            const animals: TAnimal[] = this.state.animals.map((animal: TAnimal): TAnimal => animal);
            const icons: JSX.Element[] = [];

            for (let i: number = 0; i < animals.length + 2; i += 3) {
                icons.push(
                    <div key={i} className="row">
                        {animals[i]
                            ? <div className={`col${this.state.colSize}-4 eqx-middle-align center-text`}>
                                <Link to={`/dashboard/animal-details?id=${animals[i]._id}`}>
                                    <div style={{ wordBreak: "break-word", width: "100%", height: "2rem" }}>
                                        {animals[i].name}
                                    </div>
                                </Link>
                            </div >
                            : <div className={`col${this.state.colSize}-4 eqx-middle-align center-text`} />
                        }
                        {animals[i + 1]
                            ? <div className={`col${this.state.colSize}-4 eqx-middle-align center-text`}>
                                <div style={{ wordBreak: "break-word", width: "100%", height: "2rem" }}>
                                    {animals[i + 1].name}
                                </div>
                            </div >
                            : <div className={`col${this.state.colSize}-4 eqx-middle-align center-text`} />
                        }
                        {animals[i + 2]
                            ? <div className={`col${this.state.colSize}-4 eqx-middle-align center-text`}>
                                <div style={{ wordBreak: "break-word", width: "100%", height: "2rem" }}>
                                    {animals[i + 2].name}
                                </div>
                            </div >
                            : <div className={`col${this.state.colSize}-4 eqx-middle-align center-text`} />
                        }
                    </div>
                );
            }

            return icons;
        } else {
            return ([
                <div className="row">
                    <p className={`col${this.state.colSize}-12 center-text`}>No results found</p>
                </div>
            ]);
        }
    }

    async getAnimals(): Promise<void> {
        await fetch("/animals/get_animals")
            .then((res: Response): Promise<Response> => res.json())
            .then((res: any): TAnimal[] => res.animals)
            .then((res: TAnimal[]): void => {
                const animals: TAnimal[] = res.map((animal: TAnimal): TAnimal => animal);
                animals.sort((a: TAnimal, b: TAnimal): number => a.name > b.name ? 1 : -1);

                this.setState({
                    animals: animals
                }, (): void => {
                    console.log("this.state.animals:", this.state.animals);
                });
            });
    }

    render(): JSX.Element {
        const mobileRender: () => JSX.Element = (): JSX.Element => {
            return (
                <div className="container">
                    <div className="row">
                        <h1 id="landing-page-title-h1" className={`col${this.state.colSize}-12 center-text`}>Green Thumb</h1>
                    </div>

                    <div className="row">
                        <div className={`col${this.state.colSize}-12`}>
                            <hr />
                        </div>
                    </div>

                    {this.state.animals.length > 0
                        ? this.generateAnimalIcons()
                        : <p>No results found</p>
                    }

                    {/* <div className="row">
                        <div className={`col${this.state.colSize}-5 center-text middle-align`}>
                            <Link to="/dashboard/my-collection">
                                <p className="landing-page-link">
                                    My collection
                                </p>
                            </Link>
                        </div>

                        <div className={`col${this.state.colSize}-5 center-text middle-align`}>
                            <Link to="/dashboard/profile">
                            <p className="landing-page-link">
                                    Profile
                                </p>
                            </Link>

                        </div>
                    </div>

                    <div className="row">
                        <div className={`col${this.state.colSize}-5 center-text middle-align`}>
                            <Link to="/dashboard/scanner-js">
                            <p className="landing-page-link">
                                    Scan Plant
                                </p>
                            </Link>
                        </div>

                        <div className={`col${this.state.colSize}-5 center-text middle-align`}>
                        <Link to="/dashboard/scanner-js">
                            <p className="landing-page-link">
                                    Scan Plant
                                </p>
                            </Link>
                        </div>
                    </div> */}
                </div>
            );
        }

        const desktopRender: () => JSX.Element = (): JSX.Element => {
            return (
                <div className="container">
                    <div className="row">
                        <h1 className={`col${this.state.colSize}-12 center-text`}></h1>
                    </div>

                    <div className="row">
                        <div className={`col${this.state.colSize}-12`}>
                            <hr />
                        </div>
                    </div>

                    <div className="row">
                        <div className={`col${this.state.colSize}-5 center-text middle-align`}>
                            My collection
                        </div>

                        <div className={`col${this.state.colSize}-5 center-text middle-align`}>
                            Profile
                        </div>
                    </div>

                    <div className="row">
                        <div className={`col${this.state.colSize}-5 center-text middle-align`}>
                            Scan Plant
                        </div>

                        <div className={`col${this.state.colSize}-5 center-text middle-align`}>

                        </div>
                    </div>
                </div>
            );
        }

        return this.state.device === "mobile"
            ? mobileRender()
            : desktopRender();
    }
}

export default LandingPage;