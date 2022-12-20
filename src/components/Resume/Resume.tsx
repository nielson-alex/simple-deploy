import { PureComponent } from "react";
import { Props } from "../../types/TGlobal";
import { State } from "../../types/TResume";
import AccordionFC from "../functional-components/AccordionFC";
import { TWorkExperience } from "../../types/TResume";
import "../../css/GlobalCSS.css";
import "../../css/ResumeCSS.css";

export default class Resume extends PureComponent<any, State> {
    _isMounted: boolean = false;

    constructor(props: Props) {
        super(props);
        this.state = {
            workExperience: [] as TWorkExperience[]
        };

        this.getWorkExperience = this.getWorkExperience.bind(this);
    }

    async componentDidMount(): Promise<void> {
        this._isMounted = true;

        if (this._isMounted === true) {
            await this.getWorkExperience();
        }
    }

    componentWillUnmount(): void {
        this._isMounted = false;
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

                if (this._isMounted === true) {
                    this.setState({
                        workExperience: workExperience
                    }, (): void => {

                    });
                }
            });
    }

    render(): JSX.Element {
        const mobileRender: () => JSX.Element = (): JSX.Element => {
            return (
                <div className={`container container-${this.props._device()}`}>
                    <div className="row">
                        <h1 id={`page-title-h1-${this.props._device()}`} className={`col${this.props._colSize()}-12 center-text`}>Resume</h1>
                    </div>

                    <div className="row">
                        <div className={`col${this.props._colSize()}-12`}>
                            <hr />
                        </div>
                    </div>

                    <div className="row">
                        <div className={`col${this.props._colSize()}-12 App2`}>
                            <div className="accordion">
                                {this.state.workExperience.length > 0
                                    ? this.state.workExperience.map((entry: TWorkExperience): JSX.Element => {

                                        return (
                                            <AccordionFC title={entry.companyName} device={this.props._device()}>
                                                <div className={`col${this.props._colSize()}-11 middle-align`}>
                                                    <p>{entry.title}</p>
                                                    <p>{entry.startMMMM} {entry.startYYYY}</p>
                                                    <div>{entry.responsibilities.length > 0
                                                        ? entry.responsibilities.map((responsibility: string): JSX.Element => <p>{responsibility}</p>)
                                                        : <p>No work responsibilities found</p>
                                                    }</div>
                                                </div>
                                            </AccordionFC>
                                        )
                                    })
                                    : <p className={`col${this.props._colSize()}-12`}>
                                        No work experience found
                                    </p>
                                }
                            </div>
                        </div>
                    </div>
                </div>
            );
        }

        const desktopRender: () => JSX.Element = (): JSX.Element => {
            return (
                <div className={`container container-${this.props._device()}`}>
                    <div className="row">
                        <h1 id={`page-title-h1-${this.props._device()}`} className={`col${this.props._colSize()}-12 center-text`}>Resume</h1>
                    </div>

                    <div className="row">
                        <div className={`col${this.props._colSize()}-12`}>
                            <hr />
                        </div>
                    </div>

                    <div className="row">
                        <div className={`col${this.props._colSize()}-12 App2`}>
                            <div className="accordion">
                                {this.state.workExperience.length > 0
                                    ? this.state.workExperience.map((entry: TWorkExperience): JSX.Element => {

                                        return (
                                            <AccordionFC title={entry.companyName} device={this.props._device()} className="no-link">
                                                <div className={`col${this.props._colSize()}-11 middle-align`}>
                                                    <p>{entry.companyName}</p>
                                                    <p>{entry.title}</p>
                                                    <p>{entry.startMMMM} {entry.startYYYY}</p>
                                                    <div>{entry.responsibilities.length > 0
                                                        ? entry.responsibilities.map((responsibility: string): JSX.Element => <p>{responsibility}</p>)
                                                        : <p>No work responsibilities found</p>
                                                    }</div>
                                                </div>
                                            </AccordionFC>
                                        )
                                    })
                                    : <p className={`col${this.props._colSize()}-12`}>
                                        No work experience found
                                    </p>
                                }
                            </div>
                        </div>
                    </div>
                </div>
            );
        }

        return this.props._device() === "mobile"
            ? mobileRender()
            : desktopRender();
    }
}