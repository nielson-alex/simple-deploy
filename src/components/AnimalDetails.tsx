import { PureComponent } from "react";
import { Props } from "../types/TGlobal";
import {
    State
} from "../types/TAnimalDetails";
import { TAnimal } from "../types/TAnimalDetails";
import { useParams } from "react-router-dom";
import "../css/GlobalCSS.css";
import "../css/AnimalDetailsCSS.css";

export default class AnimalDetails extends PureComponent<Props, State> {
    _isMounted: boolean = false;

    constructor(props: Props) {
        super(props);
        this.state = {
            featuredAnimal: {
                _id: "",
                breed: "",
                description: "",
                imageUrl: "",
                name: "",
                price: 0,
                sex: "",
                species: ""
            } as TAnimal,
            colSize: "",
            device: ""
        } as State;

        this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
        this.getAnimalDetails = this.getAnimalDetails.bind(this);
    }

    componentDidMount(): void {
        console.log("this.props:", this.props);
        this._isMounted = true;

        if (this._isMounted === true) {
            window.addEventListener("resize", this.updateWindowDimensions);
            this.updateWindowDimensions();
            this.getAnimalDetails();
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

    async getAnimalDetails(): Promise<void> {
        const breakpoint: number = window.location.href.indexOf("?");
        let url: string = window.location.href.substr(breakpoint + 4, window.location.href.length - 1);

        console.log("url:", url);

        await fetch(`/animals/animal_details/${url}`)
            .then((res: Response): Promise<Response> => res.json())
            .then((res: any): TAnimal => res.data)
            .then((res: any): void => {
                console.log("res:", res);

                this.setState({
                    featuredAnimal: {
                        _id: res._id,
                        breed: res.breed,
                        description: res.description,
                        imageUrl: res.imageUrl,
                        name: res.name,
                        price: res.price,
                        sex: res.sex,
                        species: res.species,
                    } as TAnimal
                });
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

                    <div className="row">
                        <div className={`col${this.state.colSize}-5 middle-align center-text`}>
                            {this.state.featuredAnimal._id}
                        </div>
                        <div className={`col${this.state.colSize}-5 middle-align center-text`}>
                            {this.state.featuredAnimal.name}
                        </div>
                    </div>

                    <div className="row">
                        <div className={`col${this.state.colSize}-5 middle-align center-text`}>
                            {this.state.featuredAnimal.species}
                        </div>
                        <div className={`col${this.state.colSize}-5 middle-align center-text`}>
                            {this.state.featuredAnimal.breed}
                        </div>
                    </div>

                    <div className="row">
                        <div className={`col${this.state.colSize}-5 middle-align center-text`}>
                            {this.state.featuredAnimal.description}
                        </div>
                        <div className={`col${this.state.colSize}-5 middle-align center-text`}>
                            {this.state.featuredAnimal.price}
                        </div>
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