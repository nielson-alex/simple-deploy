import { PureComponent } from "react";
import Modal from "react-modal";
import { Props } from "../types/TGlobal";
import { State } from "../types/TCollection";
import "../css/GlobalCSS.css";
import "../css/CollectionCSS.css";
import balloonFlowers from "../media/images/flower-balloon-flowers-1592923522.jpg";
import cosmos from "../media/images/flower-balloon-flowers-1592923522.jpg";
import flowerPhoto from "../media/images/flower-photo-1604085572504-a392ddf0d86a.jpg";
import flowerSulfur from "../media/images/flower-sulfur-cosmos-mexican-aster.jpg";
import banyanTree from "../media/images/tree-Banyan-tree.jpg";
// import treeImages from "..media/images/tree-images.jpg";
import treeImagess from "../media/images/tree-imagess.jpg";
import beets from "../media/images/vegetable-beets-732x549-thumbnail-732x549.jpg";
import vegetableDownload from "../media/images/vegetable-download.jpg";
import vegetableDownloads from "../media/images/vegetable-downloads.jpg";

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
            showDetailsModal: false,
            colSize: "",
            device: ""
        } as State;

        this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
        this.toggleDetailsModal = this.toggleDetailsModal.bind(this);
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

    toggleDetailsModal(): void {
        this.setState({
            showDetailsModal: !this.state.showDetailsModal
        });
    }

    render(): JSX.Element {
        const mobileRender: () => JSX.Element = (): JSX.Element => {
            return (
                <div className="container">
                    <div className="row">
                        <h1 className={`col${this.state.colSize}-12 center-text`}>My Collection</h1>
                        <hr />
                    </div>

                    {arr.length > 0
                        ? arr.map((img: string): JSX.Element => {
                            

                            return (
                                <div className="row">
                                    <img
                                        src={img}
                                        alt={img}
                                        className={`col${this.state.colSize}-5 middle-align`}
                                        onClick={this.toggleDetailsModal}
                                    />
                                </div>
                            )
                        })  
                        : "No plants in collection"
                    }

                    <Modal isOpen={this.state.showDetailsModal}>
                        <button onClick={this.toggleDetailsModal}>Close</button>
                        <h2>Hi-o</h2>
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