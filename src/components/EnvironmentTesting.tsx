import { PureComponent } from "react";
import { Props } from "../types/TGlobal";
import {
    State,
    TWorkExperience
} from "../types/TEnvironmentTesting";
import { generateMessage } from "../helpers/functions";
import "../css/GlobalCSS.css";
import "../css/EnvironmentTestingCSS.css";

export default class EnvironmentTesting extends PureComponent<Props, State> {
    _isMounted: boolean = false;

    constructor(props: Props) {
        super(props);
        this.state = {
            entries: [] as any[],
            workExperience: [] as TWorkExperience[],
            colSize: "",
            device: ""
        } as State;

        this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
        this.getWorkExperience = this.getWorkExperience.bind(this);
        this.handleAddTest = this.handleAddTest.bind(this);
    }

    componentDidMount(): void {
        this._isMounted = true;

        if (this._isMounted === true) {
            window.addEventListener("resize", this.updateWindowDimensions);
            this.updateWindowDimensions();
            this.getWorkExperience();
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
        await fetch("/environment_testing/get_all_tests")
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
                    console.log("this.state.workExperience:", this.state.workExperience);
                });
            });
    }

    handleAddTest(): void {
        fetch("/environment_testing/post_add_test", {
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
                responsibilities: ["One responsibility"]
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

    render(): JSX.Element {
        const mobileRender: () => JSX.Element = (): JSX.Element => {
            return (
                <div className="container">
                    <div className="row">
                        <h1
                            className={`col${this.state.colSize}-12 landing-page-title-h1 center-text`}
                        >Resume</h1>
                    </div>

                    <div className="row">
                        <div className={`col${this.state.colSize}-11 middle-align`}>
                            <hr />
                        </div>
                    </div>

                    <div className="row">
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
                    </div>

                    <div className="row">
                        <button
                            className={`col${this.state.colSize}-4 middle-align btn btn-secondary`}
                            onClick={this.handleAddTest}
                        >Add Animal</button>
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

        // return ( 
        //     <div className="container">
        //         <div className="row">
        //             <h1
        //                 id="landing-page-title-h1"
        //                 className={`col${this.state.colSize}-12 center-text`}
        //             >Environment Testing</h1>
        //         </div>

        //         <div className="row">
        //             <div className={`col${this.state.colSize}-12`}>
        //                 <hr />
        //             </div>
        //         </div>
        //     </div>
        // );
    }
}