import {
    PureComponent,
    createRef,
    RefObject,
    ChangeEvent,
    MouseEvent
} from "react";
import { Props } from "../../types/TGlobal";
import { State } from "../../types/TAddWorkExperience";
import { generateMessage } from "../../helpers/functions";
import "../../css/GlobalCSS.css";
import "../../css/AddWorkExperienceCSS.css";

export default class AddWorkExperience extends PureComponent<Props, State> {
    _isMounted: boolean;
    textAreaRef: RefObject<HTMLTextAreaElement>;

    constructor(props: Props) {
        super(props);
        this.state = {
            companyName: "",
            currentResponsibility: "",
            endMonth: "",
            endYear: "",
            firstName: "",
            lastName: "",
            responsibilities: [] as string[],
            showStartDateExact: null,
            startMonth: "",
            startYear: -1,
            title: ""
        };

        this._isMounted = true;
        this.textAreaRef = createRef();
        this.addResponsibility = this.addResponsibility.bind(this);
        this.allFieldsValid = this.allFieldsValid.bind(this);
        this.generateYearOptions = this.generateYearOptions.bind(this);
        this.handleAddWorkExperience = this.handleAddWorkExperience.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleDdlChange = this.handleDdlChange.bind(this);
        this.responsibilitiesValid = this.responsibilitiesValid.bind(this);
        this.toggleShowStartDateExact = this.toggleShowStartDateExact.bind(this);
    }

    componentDidMount(): void {
        this._isMounted = true;

        if (this._isMounted === true) {
            this.generateYearOptions();
        }
    }

    componentWillUnmount(): void {
        this._isMounted = false;
    }

    addResponsibility(): void {
        const responsibilities: string[] = this.state.responsibilities.map((responsibility: string): string => responsibility);
        responsibilities.push(this.state.currentResponsibility);

        if (this.textAreaRef !== null && this.textAreaRef.current !== null) {
            this.textAreaRef.current.select();
            this.textAreaRef.current.value = "";
        }

        this.setState((prevState: State) => ({
            ...prevState,
            currentResponsibility: "",
            responsibilities: responsibilities
        }));
    }

    allFieldsValid(): boolean {
        let isValid: boolean = true;
        const currentYear: number = new Date().getFullYear();

        if (this.state.firstName === "") {
            generateMessage("error", "Please provide a first name");
            isValid = false;
        } else if (this.state.firstName === "") {
            generateMessage("error", "Please provide a last name");
            isValid = false;
        } else if (this.state.companyName === "") {
            generateMessage("error", "Please provide the name of the company worked for");
            isValid = false;
        } else if (this.state.startMonth === "") {
            generateMessage("error", "Please provide a start month");
            isValid = false;
        } else if (this.state.startYear < 1900 || this.state.startYear > currentYear) {
            generateMessage("error", "Please provide a valid year");
            isValid = false;
        } else if (this.state.title === "") {
            generateMessage("error", "Please provide a job title");
            isValid = false;
        } else if (this.state.responsibilities.length < 1) {
            generateMessage("error", "Please include at least one job responsibility");
            isValid = false;
        } else if (this.responsibilitiesValid() === false) {
            generateMessage("error", "Please ensure all job responsibilites are valid");
            isValid = false;
        }

        return isValid;
    }

    generateYearOptions(): JSX.Element[] {
        const options: JSX.Element[] = [] as JSX.Element[];
        const currentYear: number = new Date().getFullYear();

        for (let i: number = currentYear; i > 1949; i--) {
            options.push(<option key={i} value={i}>{i}</option>)
        }

        return options;
    }

    handleAddWorkExperience(): void {
        if (this.allFieldsValid()) {
            fetch("/resume/add_work_experience", {
                method: "POST",
                headers: {
                    "Content-Type": "application/JSON; charset=UTF-8"
                },
                body: JSON.stringify({
                    company_name: this.state.companyName,
                    first_name: this.state.firstName,
                    last_name: this.state.lastName,
                    start_mm: this.state.startMonth.substr(0, 2),
                    start_mmmm: this.state.startMonth,
                    start_yy: parseInt(`${this.state.startYear}`.substr(0, 2), 10),
                    start_yyyy: parseInt(`${this.state.startYear}`),
                    title: this.state.title,
                    responsibilities: this.state.responsibilities,
                })
            })
                .then((res: any): any => {
                    return res;
                })
                .then((res: any): void => {
                    generateMessage("success", "Entry successfully added to database");
                });
        }
    }

    handleChange(e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void {
        const name: string = e.currentTarget.name;
        const value: string = e.currentTarget.value;

        this.setState((prevState: State) => ({
            ...prevState,
            [name]: value
        }), (): void => {
            console.log(this.state);
        });
    }

    handleDdlChange(e: MouseEvent<HTMLSelectElement>): void {
        const name: string = e.currentTarget.name;
        let value: string | number;

        if (name === "startMonth") {
            value = e.currentTarget.value;
        } else {
            value = parseInt(e.currentTarget.value, 10)
        }

        this.setState((prevState: State) => ({
            ...prevState,
            [name]: value
        }));
    }

    responsibilitiesValid(): boolean {
        let isValid: boolean = true;

        this.state.responsibilities.forEach((responsibility: string): void => {
            if (responsibility === "") {
                isValid = false;
            }
        });

        return isValid;
    }

    toggleShowStartDateExact(e: boolean): void {
        this.setState({
            showStartDateExact: e
        });
    }

    render(): JSX.Element {
        const mobileRender: () => JSX.Element = (): JSX.Element => {
            return (
                <div className={`container container-${this.props._device()}`}>
                    <div className="row">
                        <h1 className={`col${this.props._colSize()}-12 center-text`}>Add Work Experience</h1>
                    </div>

                    <div className="row">
                        <div className={`col${this.props._colSize()}-11 middle-align`}>
                            <hr />
                        </div>
                    </div>

                    {/* First Name */}
                    <div className="row">
                        <label htmlFor="firstName" className={`col${this.props._colSize()}-11 middle-align`}>First Name:</label>
                        <input
                            type="text"
                            id="firstName"
                            className={`col${this.props._colSize()}-11 middle-align`}
                            name="firstName"
                            onChange={(e: ChangeEvent<HTMLInputElement>): void => this.handleChange(e)}
                        />
                    </div>

                    {/* Last Name */}
                    <div className="row">
                        <label htmlFor="lastName" className={`col${this.props._colSize()}-11 middle-align`}>Last Name:</label>
                        <input
                            type="text"
                            id="lastName"
                            className={`col${this.props._colSize()}-11 middle-align`}
                            name="lastName"
                            onChange={(e: ChangeEvent<HTMLInputElement>): void => this.handleChange(e)}
                        />
                    </div>

                    {/* Company name */}
                    <div className="row">
                        <label htmlFor="companyName" className={`col${this.props._colSize()}-11 middle-align`}>Company Name:</label>
                        <input
                            type="text"
                            id="companyName"
                            className={`col${this.props._colSize()}-11 middle-align`}
                            name="companyName"
                            onChange={(e: ChangeEvent<HTMLInputElement>): void => this.handleChange(e)}
                        />
                    </div>

                    {/* Title */}
                    <div className="row">
                        <label htmlFor="title" className={`col${this.props._colSize()}-11 middle-align`}>Title:</label>
                        <input
                            type="text"
                            id="title"
                            className={`col${this.props._colSize()}-11 middle-align`}
                            name="title"
                            onChange={(e: ChangeEvent<HTMLInputElement>): void => this.handleChange(e)}
                        />
                    </div>

                    {/* Toggle start date exact buttons */}
                    {/* <div className="row">
                        <button
                            className={`col${this.props._colSize()}-5 middle-align btn btn-seconary`}
                            onClick={(): void => this.toggleShowStartDateExact(true)}
                        >I know the exact start date</button>
                        <button
                            className={`col${this.props._colSize()}-5 middle-align btn btn-seconary`}
                            onClick={(): void => this.toggleShowStartDateExact(false)}
                        >I do not know the exact start date</button>
                    </div> */}

                    {/* {this.state.showStartDateExact === true
                        ? <>
                            {/* Exact start date /}
                            <div className="row">
                                <label className={`col${this.props._colSize()}-3`}>Start Date:</label>
                                <input
                                    type="date"
                                    className={`col${this.props._colSize()}-8`}
                                    name="title"
                                    onChange={(e: ChangeEvent<HTMLInputElement>): void => this.handleChange(e)}
                                />
                            </div>
                        </>
                    : <> */}
                    {/* Start month and year only */}
                    <div className="row">
                        <label className={`col${this.props._colSize()}-11 middle-align`}>Start month:</label>
                        <select
                            className={`col${this.props._colSize()}-11 middle-align`}
                            name="startMonth"
                            onClick={(e: MouseEvent<HTMLSelectElement>): void => this.handleDdlChange(e)}
                        >
                            <option value="January">01 January</option>
                            <option value="February">02 February</option>
                            <option value="March">03 March</option>
                            <option value="April">04 April</option>
                            <option value="May">05 May</option>
                            <option value="June">06 June</option>
                            <option value="July">07 July</option>
                            <option value="August">08 August</option>
                            <option value="September">09 September</option>
                            <option value="October">10 October</option>
                            <option value="November">11 November</option>
                            <option value="December">12 December</option>
                        </select>

                        <label className={`col${this.props._colSize()}-11 middle-align`}>Start month:</label>
                        <select
                            className={`col${this.props._colSize()}-11 middle-align`}
                            name="startYear"
                            onClick={(e: MouseEvent<HTMLSelectElement>): void => this.handleDdlChange(e)}
                        >
                            {this.generateYearOptions()}
                        </select>
                    </div>
                    {/*//     </>
                    // */}

                    {/* Responsibilities */}
                    <div className="row">
                        <label className={`col${this.props._colSize()}-4`}>Job responsibilities:</label>
                        <textarea
                            id="taResponsibility"
                            ref={this.textAreaRef}
                            className={`col${this.props._colSize()}-7`}
                            name="currentResponsibility"
                            onChange={(e: ChangeEvent<HTMLTextAreaElement>): void => this.handleChange(e)}
                        ></textarea>

                        {/* Save responsibility button */}
                        <button
                            className={`col${this.props._colSize()}-8 middle-align`}
                            onClick={this.addResponsibility}
                        >Add Job Responsibility</button>
                    </div>

                    <div className="row">
                        <div className={`col${this.props._colSize()}-4`} />
                        {this.state.responsibilities.length > 0
                            ? <ul>
                                {this.state.responsibilities.map((responsibility: string): JSX.Element =>
                                    <li key={`${Math.random()}`}>
                                        {responsibility}
                                    </li>
                                )}
                            </ul>
                            : <></>
                        }
                    </div>

                    {/* Save work experience button */}
                    <div className="row">
                        <button
                            className={`col${this.props._colSize()}-8 middle-align`}
                            onClick={this.handleAddWorkExperience}
                        >Save Work Experience</button>
                    </div>
                </div>
            );
        }

        const desktopRender: () => JSX.Element = (): JSX.Element => {
            return (
                <div className={`container container-${this.props._device()}`}>
                    <div className="row">
                        <h1 className={`col${this.props._colSize()}-12 center-text`}>Add Work Experience</h1>
                    </div>

                    <div className="row">
                        <div className={`col${this.props._colSize()}-11 middle-align`}>
                            <hr />
                        </div>
                    </div>

                    {/* First Name */}
                    <div className="row">
                        <label htmlFor="firstName" className={`col${this.props._colSize()}-11 middle-align`}>First Name:</label>
                        <input
                            type="text"
                            id="firstName"
                            className={`col${this.props._colSize()}-11 middle-align`}
                            name="firstName"
                            onChange={(e: ChangeEvent<HTMLInputElement>): void => this.handleChange(e)}
                        />
                    </div>

                    {/* Last Name */}
                    <div className="row">
                        <label htmlFor="lastName" className={`col${this.props._colSize()}-11 middle-align`}>Last Name:</label>
                        <input
                            type="text"
                            id="lastName"
                            className={`col${this.props._colSize()}-11 middle-align`}
                            name="lastName"
                            onChange={(e: ChangeEvent<HTMLInputElement>): void => this.handleChange(e)}
                        />
                    </div>

                    {/* Company name */}
                    <div className="row">
                        <label htmlFor="companyName" className={`col${this.props._colSize()}-11 middle-align`}>Company Name:</label>
                        <input
                            type="text"
                            id="companyName"
                            className={`col${this.props._colSize()}-11 middle-align`}
                            name="companyName"
                            onChange={(e: ChangeEvent<HTMLInputElement>): void => this.handleChange(e)}
                        />
                    </div>

                    {/* Title */}
                    <div className="row">
                        <label htmlFor="title" className={`col${this.props._colSize()}-11 middle-align`}>Title:</label>
                        <input
                            type="text"
                            id="title"
                            className={`col${this.props._colSize()}-11 middle-align`}
                            name="title"
                            onChange={(e: ChangeEvent<HTMLInputElement>): void => this.handleChange(e)}
                        />
                    </div>

                    {/* Toggle start date exact buttons */}
                    {/* <div className="row">
                        <button
                            className={`col${this.props._colSize()}-5 middle-align btn btn-seconary`}
                            onClick={(): void => this.toggleShowStartDateExact(true)}
                        >I know the exact start date</button>
                        <button
                            className={`col${this.props._colSize()}-5 middle-align btn btn-seconary`}
                            onClick={(): void => this.toggleShowStartDateExact(false)}
                        >I do not know the exact start date</button>
                    </div> */}

                    {/* {this.state.showStartDateExact === true
                        ? <>
                            {/* Exact start date /}
                            <div className="row">
                                <label className={`col${this.props._colSize()}-3`}>Start Date:</label>
                                <input
                                    type="date"
                                    className={`col${this.props._colSize()}-8`}
                                    name="title"
                                    onChange={(e: ChangeEvent<HTMLInputElement>): void => this.handleChange(e)}
                                />
                            </div>
                        </>
                    : <> */}

                    {/* Start month and year only */}
                    <div className="row">
                        <label className={`col${this.props._colSize()}-11 middle-align`}>Start month:</label>
                        <select
                            className={`col${this.props._colSize()}-11 middle-align`}
                            name="startMonth"
                            onClick={(e: MouseEvent<HTMLSelectElement>): void => this.handleDdlChange(e)}
                        >
                            <option key="01-jan-start" value="January">1 January</option>
                            <option key="02-feb-start" value="February">2 February</option>
                            <option key="03-mar-start" value="March">3 March</option>
                            <option key="04-apr-start" value="April">4 April</option>
                            <option key="05-may-start" value="May">5 May</option>
                            <option key="06-jun-start" value="June">6 June</option>
                            <option key="07-jul-start" value="July">7 July</option>
                            <option key="08-oct-start" value="August">8 August</option>
                            <option key="09-sep-start" value="September">9 September</option>
                            <option key="10-oct-start" value="October">10 October</option>
                            <option key="11-nov-start" value="November">11 November</option>
                            <option key="12-dec-start" value="December">12 December</option>
                        </select>

                        <label className={`col${this.props._colSize()}-11 middle-align`}>Start year:</label>
                        <select
                            className={`col${this.props._colSize()}-11 middle-align`}
                            name="startYear"
                            onClick={(e: MouseEvent<HTMLSelectElement>): void => this.handleDdlChange(e)}
                        >
                            {this.generateYearOptions()}
                        </select>
                    </div>

                    {/* End month and year only */}
                    <div className="row">
                        <label className={`col${this.props._colSize()}-11 middle-align`}>End month:</label>
                        <select
                            className={`col${this.props._colSize()}-11 middle-align`}
                            name="endMonth"
                            onClick={(e: MouseEvent<HTMLSelectElement>): void => this.handleDdlChange(e)}
                        >
                            <option key="01-jan-end" value="January">1 January</option>
                            <option key="02-feb-end" value="February">2 February</option>
                            <option key="03-mar-end" value="March">3 March</option>
                            <option key="04-apr-end" value="April">4 April</option>
                            <option key="05-may-end" value="May">5 May</option>
                            <option key="06-jun-end" value="June">6 June</option>
                            <option key="07-jul-end" value="July">7 July</option>
                            <option key="08-oct-end" value="August">8 August</option>
                            <option key="09-sep-end" value="September">9 September</option>
                            <option key="10-oct-end" value="October">10 October</option>
                            <option key="11-nov-end" value="November">11 November</option>
                            <option key="12-dec-end" value="December">12 December</option>
                        </select>

                        <label className={`col${this.props._colSize()}-11 middle-align`}>End year:</label>
                        <select
                            className={`col${this.props._colSize()}-11 middle-align`}
                            name="startYear"
                            onClick={(e: MouseEvent<HTMLSelectElement>): void => this.handleDdlChange(e)}
                        >
                            {this.generateYearOptions()}
                        </select>
                    </div>

                    {/* Responsibilities */}
                    <div className="row">
                        <label className={`col${this.props._colSize()}-4`}>Job responsibilities:</label>
                        <textarea
                            id="taResponsibility"
                            ref={this.textAreaRef}
                            className={`col${this.props._colSize()}-7`}
                            name="currentResponsibility"
                            onChange={(e: ChangeEvent<HTMLTextAreaElement>): void => this.handleChange(e)}
                        ></textarea>

                        {/* Save responsibility button */}
                        <button
                            className={`col${this.props._colSize()}-8 middle-align`}
                            onClick={this.addResponsibility}
                        >Add Job Responsibility</button>
                    </div>

                    <div className="row">
                        <div className={`col${this.props._colSize()}-4`} />
                        {this.state.responsibilities.length > 0
                            ? <ul>
                                {this.state.responsibilities.map((responsibility: string): JSX.Element => (
                                    <li key={`${Math.random()}`}>
                                        {responsibility}
                                    </li>
                                ))}
                            </ul>
                            : <></>
                        }
                    </div>

                    {/* Save work experience button */}
                    <div className="row">
                        <button
                            className={`col${this.props._colSize()}-8 middle-align`}
                            onClick={this.handleAddWorkExperience}
                        >Save Work Experience</button>
                    </div>
                </div>
            );
        }

        return desktopRender();
    }
}