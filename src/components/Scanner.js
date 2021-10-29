import { PureComponent } from "react";
import BarcodeScannerComponent from "react-webcam-barcode-scanner";
import "../css/GlobalCSS.css";
import "../css/ScannerCSS.css";

import balloonFlowers from "../media/images/flower-balloon-flowers-1592923522.jpg";


const arr = [balloonFlowers
    /* 
        ,
        cosmos,
        flowerPhoto,
        sulfurCosmos,
        banyanTree,
        treeImages,
        treeImagess,
        willow,
        beets,
        vegDownload,
        vegDownloads
    */
];

class Scanner extends PureComponent {
    _isMounted = false;

    constructor(props) {
        super(props);
        this.state = {
            count: 0,
            data: "",
            colSize: "",
            device: "desktop"
        }

        this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
        this.decrement = this.decrement.bind(this);
        this.increment = this.increment.bind(this);
    }

    componentDidMount() {
        this._isMounted = true;

        if (this._isMounted === true) {
            window.addEventListener("resize", this.updateWindowDimensions);
            this.updateWindowDimensions();
        }
    }

    componentWillUnmount() {
        window.removeEventListener("resize", this.updateWindowDimensions);
        this._isMounted = false;
    }

    updateWindowDimensions() {
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

    decrement(e) {
        const name = e.currentTarget.name;

        this.setState({
            [name]: this.state.count + 1
        });
    }

    increment(e) {
        const name = e.currentTarget.name;

        this.setState({
            [name]: this.state.count - 1
        });
    }

    render() {
        const mobileRender = () => {
            return (
                <div className="container">
                    <div className="row">
                        <h1 className={`col${this.state.colSize}-12 center-text`}>Scan Plant</h1>
                    </div>

                    <div className="row">
                        <div className={`col${this.state.colSize}-12`}>
                            <BarcodeScannerComponent
                                width={500}
                                height={500}
                                onUpdate={(err, result) => {
                                    if (result) {
                                        this.setState({
                                            data: result.text
                                        });
                                    } else {
                                        this.setState({
                                            data: "Not Found"
                                        });
                                    }
                                }}
                            />
                            <p>
                                {this.state.data === ""
                                    ? "No image found"
                                    : this.state.data
                                }
                            </p>
                        </div>
                    </div>
                </div>
            );
        }

        const desktopRender = () => {
            return (
                <div className="container">
                    <div className="row">
                        <h1 className={`col${this.state.colSize}-12 center-text`}>Counter</h1>
                    </div>

                    <div className="row">
                        <div className={`col${this.state.colSize}-12`}>
                            <hr />
                            <img src={arr[1]} alt={"ooh la la"} />
                        </div>
                    </div>

                    <div className="row">
                        <div className={`col${this.state.colSize}-12`}>
                            <BarcodeScannerComponent
                                width={500}
                                height={500}
                                onUpdate={(err, result) => {
                                    if (result) {
                                        this.setState({
                                            data: result.text
                                        });
                                    } else {
                                        this.setState({
                                            data: "Not Found"
                                        });
                                    }
                                }}
                            />
                            <p>
                                {this.state.data === ""
                                    ? "No image found"
                                    : this.state.data
                                }
                            </p>
                        </div>
                    </div>

                    <div className="row">
                        <button
                            className={`col${this.state.colSize}-3 middle-align btn btn-secondary`}
                            name="count"
                            onClick={(e) => this.decrement(e)}
                        >-</button>
                        <label className={`col${this.state.colSize}-1`}>{this.state.count}</label>
                        <button
                            className={`col${this.state.colSize}-3 middle-align btn btn-secondary`}
                            name="count"
                            onClick={(e) => this.increment(e)}
                        >+</button>
                    </div>
                </div>
            )
        }

        return this.state.device === "mobile"
            ? mobileRender()
            : desktopRender();
    }
}

export default Scanner;