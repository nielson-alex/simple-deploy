import { PureComponent } from "react";
import { Link } from "react-router-dom";
import { Props } from "../../types/TGlobal";
import { State, TAnimal } from "../../types/TAnimals";
import "../../css/GlobalCSS.css";
import "../../css/AnimalsCSS.css";

export default class Animals extends PureComponent<Props, State> {
    _isMounted: boolean = false;

    constructor(props: Props) {
        super(props);
        this.state = {
            animals: [] as TAnimal[],
            featuredAnimal: {
                _id: "",
                age: -1,
                breed: "",
                description: "",
                imageUrl: "",
                name: "",
                price: -1,
                sex: "",
                species: ""
            } as TAnimal,
            colSize: "",
            device: ""
        } as State;

        this.updateWindowDimensions.bind(this);
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
                                    <div className="animals-animal-icon">
                                        {animals[i].name}
                                    </div>
                                </Link>
                            </div >
                            : <div className={`col${this.state.colSize}-4 eqx-middle-align center-text`} />
                        }
                        {animals[i + 1]
                            ? <div className={`col${this.state.colSize}-4 eqx-middle-align center-text`}>
                                <div className="animals-animal-icon">
                                    {animals[i + 1].name}
                                </div>
                            </div >
                            : <div className={`col${this.state.colSize}-4 eqx-middle-align center-text`} />
                        }
                        {animals[i + 2]
                            ? <div className={`col${this.state.colSize}-4 eqx-middle-align center-text`}>
                                <div className="animals-animal-icon">
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

                console.log("animals:", animals);

                if (this._isMounted === true) {
                    this.setState({
                        animals: animals,
                        featuredAnimal: animals[0]
                    }, (): void => {
                        console.log("this.state.animals:", this.state.animals);
                    });
                }
            });
    }

    render(): JSX.Element {
        const mobileRender: () => JSX.Element = (): JSX.Element => {
            return (
                <div className="container">
                    <div className="row">
                        <h1 id="landing-page-title-h1" className={`col${this.state.colSize}-12 center-text`}>Weclome</h1>
                    </div>

                    <div className="row">
                        <div className={`col${this.state.colSize}-12`}>
                            <hr />
                        </div>
                    </div>

                    {/* Featured animal */}
                    <div className="row">
                        <p className={`col${this.state.colSize}-6 middle-align`}>{this.state.featuredAnimal.name !== ""
                            ? `Meet ${this.state.featuredAnimal.name}, the ${this.state.featuredAnimal.age}-year-old ${this.state.featuredAnimal.breed}!`
                            : "Press the button to be assigned a pet"}
                        </p>
                    </div>

                    {/* All animals */}
                    <div className="row">
                        {this.state.animals.length > 0
                            ? this.generateAnimalIcons()
                            : <p>No results found</p>
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