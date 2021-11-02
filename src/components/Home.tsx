import { PureComponent } from "react";
import { Link } from "react-router-dom";
import { Props } from "../types/TGlobal";
import { State, TAnimal } from "../types/THome";
import logo from "../logo.svg";
import "../css/GlobalCSS.css";
import "../css/HomeCSS.css";

class Home extends PureComponent<Props, State> {
    _isMounted: boolean = false;

    constructor(props: Props) {
        super(props);
        this.state = {
            featuredAnimal: {
                id: "",
                age: 0,
                breed: "",
                description: "",
                imageUrl: "",
                name: "",
                price: 0,
                sex: "",
                species: ""
            },
            colSize: "",
            device: ""
        } as State;

        this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
        this.handleCallServer = this.handleCallServer.bind(this);
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

    async handleCallServer(): Promise<void> {
        fetch("/animals/animals")
            .then((res: any): any => res.json())
            .then((res: any): void => {
                console.log("res:", res)
                let featuredAnimal: TAnimal = {
                    id: res.animals.id,
                    age: parseFloat(res.animals.age),
                    breed: res.animals.breed,
                    description: res.animals.description,
                    imageUrl: res.animals.imageUrl,
                    name: res.animals.name,
                    price: parseFloat(res.animals.price),
                    sex: res.animals.sex,
                    species: res.animals.species
                } as TAnimal;

                this.setState({
                    featuredAnimal: featuredAnimal
                }, (): void => {
                    console.log("this.state.featuredAnimal:", this.state.featuredAnimal);
                });
            });
    }

    render(): JSX.Element {
        const mobileRender: () => JSX.Element = (): JSX.Element => {
            return (
                <></>
            );
        }

        const desktopRender: () => JSX.Element = (): JSX.Element => {
            return (
                <>
                    <h2>Green Thumb</h2>
                    <h4>Single Page Application Demo</h4>
                    <Link to="/dashboard/landing-page">
                        <img src={logo} className="App-logo" alt="logo" />
                    </Link>
                    <h4>Alex Nielson</h4>

                    <button className="btn btn-secondary" onClick={this.handleCallServer}>Randomly Choose Animal</button>
                    <p>{this.state.featuredAnimal.name !== ""
                        ? `Meet ${this.state.featuredAnimal.name}, the ${this.state.featuredAnimal.age}-year-old ${this.state.featuredAnimal.breed}!`
                        : "Press the button to be assigned a pet"
                    }</p>
                    <p>Edit <code>src/App.tsx</code> and save to reload.</p>

                    <a
                        className="App-link"
                        href="https://reactjs.org"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        Learn React
                    </a>
                </>
            );
        }

        return this.state.device === "mobile"
            ? mobileRender()
            : desktopRender();
    }
}

export default Home;