import { PureComponent } from "react";
import { Link } from "react-router-dom";
import Modal from "react-modal";
import { BR } from "../functional-components/GlobalFC";
import { Props } from "../../types/TGlobal";
import { State } from "../../types/TCollection";
import { TAnimal } from "../../types/TCollection";
import { generateMessage } from "../../helpers/functions";
import "../../css/GlobalCSS.css";
import "../../css/CollectionCSS.css";
import balloonFlowers from "../../media/images/flower-balloon-flowers-1592923522.jpg";
import cosmos from "../../media/images/flower-balloon-flowers-1592923522.jpg";
import flowerPhoto from "../../media/images/flower-photo-1604085572504-a392ddf0d86a.jpg";
import flowerSulfur from "../../media/images/flower-sulfur-cosmos-mexican-aster.jpg";
import banyanTree from "../../media/images/tree-Banyan-tree.jpg";
// import treeImages from "../../media/images/tree-images.jpg";
import treeImagess from "../../media/images/tree-imagess.jpg";
import beets from "../../media/images/vegetable-beets-732x549-thumbnail-732x549.jpg";
import vegetableDownload from "../../media/images/vegetable-download.jpg";
import vegetableDownloads from "../../media/images/vegetable-downloads.jpg";

const arr: string[] = [
    balloonFlowers,
    cosmos,
    flowerPhoto,
    flowerSulfur,
    banyanTree,
    // treeImages,
    treeImagess,
    beets,
    vegetableDownload,
    vegetableDownloads
];

class Collection extends PureComponent<Props, State> {
    _isMounted: boolean = false;

    constructor(props: Props) {
        super(props);
        this.state = {
            animals: [] as TAnimal[],
            featuredAnimal: {
                _id: "",
                age: 0,
                breed: "",
                description: "",
                imageUrl: "",
                name: "",
                price: 0,
                sex: "",
                species: ""
            },
            showDetailsModal: false,
            colSize: "",
            device: ""
        } as State;

        this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
        this.generateAnimalIcons = this.generateAnimalIcons.bind(this);
        this.getAnimals = this.getAnimals.bind(this);
        this.getAnimalDetails = this.getAnimalDetails.bind(this);
        this.handleAddAnimal = this.handleAddAnimal.bind(this);
        this.randomlyChooseAnimal = this.randomlyChooseAnimal.bind(this);
        this.toggleDetailsModal = this.toggleDetailsModal.bind(this);
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

    async getAnimalDetails(): Promise<void> {
        fetch("/animals/")
    }

    handleAddAnimal(): void {
        fetch("/animals/add_animal", {
            method: "POST",
            headers: {
                "Content-Type": "application/JSON; charset=UTF-8"
            },
            body: JSON.stringify({
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
                console.log("res:", res);
                return res;
            })
            .then((res: any): void => {
                console.log("res:", res);
                generateMessage("success", "Entry successfully added to database");
            });
    }

    async randomlyChooseAnimal(): Promise<void> {
        fetch("/animals/get_animals")
            .then((res: Response): Promise<Response> => res.json())
            .then((res: any): TAnimal[] => res.data)
            .then((res: TAnimal[]): void => {
                const animals: TAnimal[] = res.map((animal: TAnimal): TAnimal => animal);

                console.log("res:", res);

                let featuredAnimal: TAnimal = {
                    _id: animals[0]._id,
                    age: parseFloat(`${animals[0].age}`),
                    breed: animals[0].breed,
                    description: animals[0].description,
                    imageUrl: animals[0].imageUrl,
                    name: animals[0].name,
                    price: parseFloat(`${animals[0].price}`),
                    sex: animals[0].sex,
                    species: animals[0].species
                } as TAnimal;

                this.setState({
                    featuredAnimal: featuredAnimal
                }, (): void => {
                    console.log("this.state.featuredAnimal:", this.state.featuredAnimal);
                });
            });
    }

    toggleDetailsModal(): void {
        this.setState({
            showDetailsModal: !this.state.showDetailsModal
        });
    }

    render(): JSX.Element {
        const mobileRender: () => JSX.Element = (): JSX.Element => {
            return (
                <div className={`container container-${this.state.device}`}>
                    <div className="row">
                        <h1 className={`col${this.state.colSize}-12 center-text`}>My Collection</h1>
                    </div>

                    <div className="row">
                        <div className={`col${this.state.colSize}-11 middle-align`}>
                            <hr />
                        </div>
                    </div>

                    <div className="row">
                        <button
                            className={`col${this.state.colSize}-4 middle-align btn btn-secondary`}
                            onClick={this.randomlyChooseAnimal}
                        >Randomly Choose Animal</button>
                    </div>

                    <div className="row">
                        <button
                            className={`col${this.state.colSize}-4 middle-align btn btn-secondary`}
                            onClick={this.handleAddAnimal}
                        >Add Animal</button>
                    </div>
                    <div className="row">
                        <p className={`col${this.state.colSize}-6 middle-align`}>{this.state.featuredAnimal.name !== ""
                            ? `Meet ${this.state.featuredAnimal.name}, the ${this.state.featuredAnimal.age}-year-old ${this.state.featuredAnimal.breed}!`
                            : "Press the button to be assigned a pet"}
                        </p>
                    </div>

                    {this.state.animals.length > 0
                        ? this.generateAnimalIcons()
                        : <p>No results found</p>
                    }

                    {/* {arr.length > 0
                        ? arr.map((img: string): JSX.Element => {
                            
                            return (
                                <>
                                <div className="row">
                                    <img
                                        src={img}
                                        alt={img}
                                        className={`col${this.state.colSize}-11 middle-align`}
                                        onClick={this.toggleDetailsModal}
                                    />
                                </div>
                                <BR colSize={this.state.colSize} />
                                </>
                            )
                        })  
                        : "No plants in collection"
                    } */}

                    <Modal isOpen={this.state.showDetailsModal}>
                        <button onClick={this.toggleDetailsModal}>Close</button>
                        <div className={`container container-${this.state.device}`}>
                            <div className="row">
                                <p className={`col${this.state.colSize}-2 bold`}>Name:</p>
                                <p className={`col${this.state.colSize}-10 bold`}></p>
                            </div>
                            <div className="row">
                                <p className={`col${this.state.colSize}-2 bold`}>Regions:</p>
                                <p className={`col${this.state.colSize}-10 bold`}></p>
                            </div>
                            <div className="row">
                                <p className={`col${this.state.colSize}-2 bold`}>Description:</p>
                                <p className={`col${this.state.colSize}-10 bold`}></p>
                            </div>
                        </div>
                    </Modal>
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

export default Collection;