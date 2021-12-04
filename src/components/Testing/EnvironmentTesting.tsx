import { PureComponent, MouseEvent } from "react";
import { Props } from "../../types/TGlobal";
import {
    State,
    TWorkExperience
} from "../../types/TEnvironmentTesting";
import { Link } from "react-router-dom";
import { TAnimal } from "../../types/TAnimals";
import { generateMessage } from "../../helpers/functions";
import "../../css/GlobalCSS.css";
import "../../css/EnvironmentTestingCSS.css";

export default class EnvironmentTesting extends PureComponent<Props, State> {
    _isMounted: boolean = false;

    constructor(props: Props) {
        super(props);
        this.state = {
            animals: [] as TAnimal[],
            entries: [] as any[],
            featuredAnimal: {} as TAnimal,
            showShelterSection: false,
            showWorkExperienceSection: false,
            workExperience: [] as TWorkExperience[],
            colSize: "",
            device: ""
        } as State;

        this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
        this.getWorkExperience = this.getWorkExperience.bind(this);
        this.handleAddTest = this.handleAddTest.bind(this);
        this.generateAnimalIcons = this.generateAnimalIcons.bind(this);
        this.getAnimalDetails = this.getAnimalDetails.bind(this);
        this.getAnimals = this.getAnimals.bind(this);
        this.handleAddAnimal = this.handleAddAnimal.bind(this);
        this.handleCallServer = this.handleCallServer.bind(this);
        this.hideSection = this.hideSection.bind(this);
        this.showSection = this.showSection.bind(this);
    }

    componentDidMount(): void {
        this._isMounted = true;

        if (this._isMounted === true) {
            window.addEventListener("resize", this.updateWindowDimensions);
            this.updateWindowDimensions();
            this.getWorkExperience();
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

    async getWorkExperience(): Promise<void> {
        await fetch("/environment_testing/get_all_animals_test")
            .then((res: Response): Promise<Response> => res.json())
            .then((res: any): any => res.work_experience)
            .then((res: any): void => {
                const workExperience: TWorkExperience[] = res.map((entry: any): TWorkExperience => ({
                    companyName: entry.company_name,
                    startMM: entry.start_mm,
                    startMMMM: entry.start_mmmm,
                    startYY: entry.start_yy,
                    startYYYY: entry.start_yyyy,
                    title: entry.title,
                    responsibilities: entry.responsibilities.map((responsibility: string): string => responsibility)
                } as TWorkExperience));
                workExperience.sort((a: TWorkExperience, b: TWorkExperience): number => `${a.startMM}/${a.startYY}` > `${b.startMM}/${b.startYY}` ? 1 : -1);

                this.setState({
                    workExperience: workExperience
                }, (): void => {

                });
            });
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
                                    <div className="environment-testing-animal-icon">
                                        {animals[i].name}
                                    </div>
                                </Link>
                            </div >
                            : <div className={`col${this.state.colSize}-4 eqx-middle-align center-text`} />
                        }
                        {animals[i + 1]
                            ? <div className={`col${this.state.colSize}-4 eqx-middle-align center-text`}>
                                <div className="environment-testing-animal-icon">
                                    {animals[i + 1].name}
                                </div>
                            </div >
                            : <div className={`col${this.state.colSize}-4 eqx-middle-align center-text`} />
                        }
                        {animals[i + 2]
                            ? <div className={`col${this.state.colSize}-4 eqx-middle-align center-text`}>
                                <div className="environment-testing-animal-icon">
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

    async getAnimalDetails(): Promise<void> {
        fetch("/animals/")
    }

    async getAnimals(): Promise<void> {
        await fetch("/animals/get_animals")
            .then((res: Response): Promise<Response> => res.json())
            .then((res: any): TAnimal[] => res.animals)
            .then((res: TAnimal[]): void => {
                const animals: TAnimal[] = res.map((animal: TAnimal): TAnimal => animal);
                animals.sort((a: TAnimal, b: TAnimal): number => a.name > b.name ? 1 : -1);

                this.setState({
                    animals: animals,
                    featuredAnimal: animals[0]
                }, (): void => {

                });
            });
    }

    handleAddTest(): void {
        fetch("/environment_testing/post_add_test", {
        })
    }

    handleAddAnimal(): void {
        fetch("/animals/add_animal", {
            method: "POST",
            headers: {
                "Content-Type": "application/JSON; charset=UTF-8"
            },
            body: JSON.stringify({
                company_name: "Equinox Nutraceutical",
                start_mm: "Jul",
                start_mmmm: "July",
                start_yy: 20,
                start_yyyy: 2020,
                title: "Fullstack React Developer",
                responsibilities: ["One responsibility"],
                name: "Claire Redfield",
                imageUrl: "",
                species: "Human",
                breed: "Caucasian",
                age: 25,
                sex: "Female",
                description: "Tottie",
                price: 100
            })
        })
            .then((res: any): any => {
                return res;
            })
            .then((res: any): void => {
                generateMessage("success", "Entry successfully added to database");
            });
    }

    async handleCallServer(): Promise<void> {
        fetch("/animals/get_animals")
            .then((res: any): any => res.json())
            .then((res: any): void => {

                let featuredAnimal: TAnimal = {
                    _id: res.animals.id,
                    age: parseFloat(`${res.animals.age}`),
                    breed: res.animals.breed,
                    description: res.animals.description,
                    imageUrl: res.animals.imageUrl,
                    name: res.animals.name,
                    price: parseFloat(`${res.animals.price}`),
                    sex: res.animals.sex,
                    species: res.animals.species
                } as TAnimal;

                this.setState({
                    featuredAnimal: featuredAnimal
                }, (): void => {

                });
            });
    }

    hideSection(e: MouseEvent<HTMLButtonElement>): void {
        const name: string = e.currentTarget.name;

        this.setState((prevState: State) => ({
            ...prevState,
            [`show${name}`]: false
        }));
    }

    showSection(e: MouseEvent<HTMLButtonElement>): void {
        const name: string = e.currentTarget.name;

        this.setState((prevState: State) => ({
            ...prevState,
            [`show${name}`]: true
        }));
    }

    render(): JSX.Element {
        const mobileRender: () => JSX.Element = (): JSX.Element => {
            return (
                <div className={`container container-${this.state.device}`}>
                    <div className="row">
                        <h1
                            className={`col${this.state.colSize}-12 landing-page-title-h1 center-text`}
                        >Testing</h1>
                    </div>

                    <div className="row">
                        <div className={`col${this.state.colSize}-12`}>
                            <hr />
                        </div>
                    </div>

                    {/* Toggle work experience button */}
                    <div className="row">
                        <button
                            className={`col${this.state.colSize}-8 middle-align btn btn-secondary`}
                            name="WorkExperienceSection"
                            onClick={(e: MouseEvent<HTMLButtonElement>): void => this.state.showWorkExperienceSection === true
                                ? this.hideSection(e)
                                : this.showSection(e)
                            }
                        >{this.state.showWorkExperienceSection !== true
                            ? "Show Work Experience"
                            : "Hide Work Experience"
                            }
                        </button>
                    </div>

                    {/* Show work experience section */}
                    {this.state.showWorkExperienceSection === true
                        ? <div className="row">
                            {this.state.workExperience.length > 0
                                ? this.state.workExperience.map((entry: TWorkExperience): JSX.Element => {

                                    return (
                                        <div className={`col${this.state.colSize}-11 card custom-card-2 middle-align`}>
                                            <p>{entry.companyName}</p>
                                            <p>{entry.title}</p>
                                            <p>{entry.startMMMM} {entry.startYYYY}</p>
                                            <div>{entry.responsibilities.length > 0
                                                ? entry.responsibilities.map((responsibility: string): JSX.Element => <p>{responsibility}</p>)
                                                : <p>No work responsibilities found</p>
                                            }</div>
                                        </div>
                                    )
                                })
                                : <p className={`col${this.state.colSize}-12`}>
                                    No work experience found
                                </p>
                            }
                            <button
                                className={`col${this.state.colSize}-4 middle-align btn btn-secondary`}
                                onClick={this.handleCallServer}
                            >Randomly Choose Animal</button>
                        </div>
                        : <></>
                    }

                    {/* Toggle shelter section button */}
                    <div className="row">
                        <button
                            className={`col${this.state.colSize}-8 middle-align btn btn-secondary`}
                            name="ShelterSection"
                            onClick={(e: MouseEvent<HTMLButtonElement>): void => this.state.showShelterSection === true
                                ? this.hideSection(e)
                                : this.showSection(e)
                            }
                        >{this.state.showShelterSection !== true
                            ? "Show Shelter"
                            : "Hide Shelter"
                            }
                        </button>
                    </div>

                    {this.state.showShelterSection === true
                        ? <>
                            {/* Add animal button */}
                            <div className="row">
                                <button
                                    className={`col${this.state.colSize}-6 middle-align`}
                                    onClick={this.handleAddAnimal}
                                >Add Animal</button>
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
                        </>
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