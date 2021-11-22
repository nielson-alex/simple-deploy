import { PureComponent, ChangeEvent, MouseEvent } from "react";
import { Props } from "../../types/TGlobal";
import { State } from "../../types/TAddWorkExperience";
import { generateMessage } from "../../helpers/functions";
import "../../css/GlobalCSS.css";
import "../../css/AddWorkExperienceCSS.css";
import { NumericTypes } from "mongoose";

export default class AddWorkExperience extends PureComponent<Props, State> {
    _isMounted: boolean;

    constructor(props: Props) {
        super(props);
        this.state = {
            companyName: "",
            currentResponsibility: "",
            firstName: "",
            lastName: "",
            responsibilities: [] as string[],
            showStartDateExact: null,
            startMonth: "",
            startYear: -1,
            title: "",
            colSize: "",
            device: ""
        } as State;

        this._isMounted = true;
        this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
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
            window.addEventListener("resize", this.updateWindowDimensions);
            this.updateWindowDimensions();
            this.generateYearOptions();
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

    addResponsibility(): void {
        const taResponsibility: HTMLElement | null = document.getElementById("taResponsibility");
        const responsibilities: string[] = this.state.responsibilities.map((responsibility: string): string => responsibility);
        responsibilities.push(this.state.currentResponsibility);

        if (taResponsibility !== null) {
            taResponsibility.innerHTML = "";
        }

        this.setState({
            currentResponsibility: "",
            responsibilities: responsibilities
        });
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

        for (let i: number = currentYear; i > 1899; i--) {
            options.push(<option value={i}>{i}</option>)
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
                    console.log("res:", res);
                    return res;
                })
                .then((res: any): void => {
                    console.log("res:", res);
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
        }));
    }

    handleDdlChange(e: MouseEvent<HTMLSelectElement>): void {
        const name: string = e.currentTarget.name;
        let value: string | number;

        if (name === "startMonth") {
            value = e.currentTarget.value;
        } else {
            value = parseInt(e.currentTarget.value, 10)
        }

        console.log("name:", name);
        console.log("value:", value);

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
                <div className="container">
                    <div className="row">
                        <h1 className={`col${this.state.colSize}-12 center-text`}>Add Work Experience</h1>
                    </div>

                    <div className="row">
                        <div className={`col${this.state.colSize}-11 middle-align`}>
                            <hr />
                        </div>
                    </div>

                    {/* First Name */}
                    <div className="row">
                        <label htmlFor="firstName" className={`col${this.state.colSize}-11 middle-align`}>First Name:</label>
                        <input
                            type="text"
                            id="firstName"
                            className={`col${this.state.colSize}-11 middle-align`}
                            name="firstName"
                            onChange={(e: ChangeEvent<HTMLInputElement>): void => this.handleChange(e)}
                        />
                    </div>

                    {/* Last Name */}
                    <div className="row">
                        <label htmlFor="lastName" className={`col${this.state.colSize}-11 middle-align`}>Last Name:</label>
                        <input
                            type="text"
                            id="lastName"
                            className={`col${this.state.colSize}-11 middle-align`}
                            name="lastName"
                            onChange={(e: ChangeEvent<HTMLInputElement>): void => this.handleChange(e)}
                        />
                    </div>

                    {/* Company name */}
                    <div className="row">
                        <label htmlFor="companyName" className={`col${this.state.colSize}-11 middle-align`}>Company Name:</label>
                        <input
                            type="text"
                            id="companyName"
                            className={`col${this.state.colSize}-11 middle-align`}
                            name="companyName"
                            onChange={(e: ChangeEvent<HTMLInputElement>): void => this.handleChange(e)}
                        />
                    </div>

                    {/* Title */}
                    <div className="row">
                        <label htmlFor="title" className={`col${this.state.colSize}-11 middle-align`}>Title:</label>
                        <input
                            type="text"
                            id="title"
                            className={`col${this.state.colSize}-11 middle-align`}
                            name="title"
                            onChange={(e: ChangeEvent<HTMLInputElement>): void => this.handleChange(e)}
                        />
                    </div>

                    {/* Toggle start date exact buttons */}
                    {/* <div className="row">
                        <button
                            className={`col${this.state.colSize}-5 middle-align btn btn-seconary`}
                            onClick={(): void => this.toggleShowStartDateExact(true)}
                        >I know the exact start date</button>
                        <button
                            className={`col${this.state.colSize}-5 middle-align btn btn-seconary`}
                            onClick={(): void => this.toggleShowStartDateExact(false)}
                        >I do not know the exact start date</button>
                    </div> */}

                    {/* {this.state.showStartDateExact === true
                        ? <>
                            {/* Exact start date /}
                            <div className="row">
                                <label className={`col${this.state.colSize}-3`}>Start Date:</label>
                                <input
                                    type="date"
                                    className={`col${this.state.colSize}-8`}
                                    name="title"
                                    onChange={(e: ChangeEvent<HTMLInputElement>): void => this.handleChange(e)}
                                />
                            </div>
                        </>
                    : <> */}
                    {/* Start month and year only */}
                    <div className="row">
                        <label className={`col${this.state.colSize}-11 middle-align`}>Start month:</label>
                        <select
                            className={`col${this.state.colSize}-11 middle-align`}
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

                        <label className={`col${this.state.colSize}-11 middle-align`}>Start month:</label>
                        <select
                            className={`col${this.state.colSize}-11 middle-align`}
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
                        <label className={`col${this.state.colSize}-4`}>Job responsibilities:</label>
                        <textarea
                            id="taResponsibility"
                            className={`col${this.state.colSize}-7`}
                            name="currentResponsibility"
                            onChange={(e: ChangeEvent<HTMLTextAreaElement>): void => this.handleChange(e)}
                        ></textarea>

                        {/* Save responsibility button */}
                        <button
                            className={`col${this.state.colSize}-8 middle-align`}
                            onClick={this.addResponsibility}
                        >Add Job Responsibility</button>
                    </div>

                    <div className="row">
                        <div className={`col${this.state.colSize}-4`} />
                        {this.state.responsibilities.length > 0
                            ? <ul>
                                {this.state.responsibilities.map((responsibility: string): JSX.Element => <li key={responsibility}>{responsibility}</li>)}
                            </ul>
                            : <></>
                        }
                    </div>

                    {/* Save work experience button */}
                    <div className="row">
                        <button
                            className={`col${this.state.colSize}-8 middle-align`}
                            onClick={this.handleAddWorkExperience}
                        >Save Work Experience</button>
                    </div>
                </div>
            );
        }

        const desktopRender: () => JSX.Element = (): JSX.Element => {
            return (
                <div className="container">
                    <div className="row">
                        <h1 className={`col${this.state.colSize}-12 center-text`}>Add Work Experience</h1>
                    </div>

                    <div className="row">
                        <div className={`col${this.state.colSize}-11 middle-align`}>
                            <hr />
                        </div>
                    </div>

                    {/* First Name */}
                    <div className="row">
                        <label htmlFor="firstName" className={`col${this.state.colSize}-11 middle-align`}>First Name:</label>
                        <input
                            type="text"
                            id="firstName"
                            className={`col${this.state.colSize}-11 middle-align`}
                            name="firstName"
                            onChange={(e: ChangeEvent<HTMLInputElement>): void => this.handleChange(e)}
                        />
                    </div>

                    {/* Last Name */}
                    <div className="row">
                        <label htmlFor="lastName" className={`col${this.state.colSize}-11 middle-align`}>Last Name:</label>
                        <input
                            type="text"
                            id="lastName"
                            className={`col${this.state.colSize}-11 middle-align`}
                            name="lastName"
                            onChange={(e: ChangeEvent<HTMLInputElement>): void => this.handleChange(e)}
                        />
                    </div>

                    {/* Company name */}
                    <div className="row">
                        <label htmlFor="companyName" className={`col${this.state.colSize}-11 middle-align`}>Company Name:</label>
                        <input
                            type="text"
                            id="companyName"
                            className={`col${this.state.colSize}-11 middle-align`}
                            name="companyName"
                            onChange={(e: ChangeEvent<HTMLInputElement>): void => this.handleChange(e)}
                        />
                    </div>

                    {/* Title */}
                    <div className="row">
                        <label htmlFor="title" className={`col${this.state.colSize}-11 middle-align`}>Title:</label>
                        <input
                            type="text"
                            id="title"
                            className={`col${this.state.colSize}-11 middle-align`}
                            name="title"
                            onChange={(e: ChangeEvent<HTMLInputElement>): void => this.handleChange(e)}
                        />
                    </div>

                    {/* Toggle start date exact buttons */}
                    {/* <div className="row">
                        <button
                            className={`col${this.state.colSize}-5 middle-align btn btn-seconary`}
                            onClick={(): void => this.toggleShowStartDateExact(true)}
                        >I know the exact start date</button>
                        <button
                            className={`col${this.state.colSize}-5 middle-align btn btn-seconary`}
                            onClick={(): void => this.toggleShowStartDateExact(false)}
                        >I do not know the exact start date</button>
                    </div> */}

                    {/* {this.state.showStartDateExact === true
                        ? <>
                            {/* Exact start date /}
                            <div className="row">
                                <label className={`col${this.state.colSize}-3`}>Start Date:</label>
                                <input
                                    type="date"
                                    className={`col${this.state.colSize}-8`}
                                    name="title"
                                    onChange={(e: ChangeEvent<HTMLInputElement>): void => this.handleChange(e)}
                                />
                            </div>
                        </>
                    : <> */}
                    {/* Start month and year only */}
                    <div className="row">
                        <label className={`col${this.state.colSize}-11 middle-align`}>Start month:</label>
                        <select
                            className={`col${this.state.colSize}-11 middle-align`}
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

                        <label className={`col${this.state.colSize}-11 middle-align`}>Start month:</label>
                        <select
                            className={`col${this.state.colSize}-11 middle-align`}
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
                        <label className={`col${this.state.colSize}-4`}>Job responsibilities:</label>
                        <textarea
                            id="taResponsibility"
                            className={`col${this.state.colSize}-7`}
                            name="currentResponsibility"
                            onChange={(e: ChangeEvent<HTMLTextAreaElement>): void => this.handleChange(e)}
                        ></textarea>

                        {/* Save responsibility button */}
                        <button
                            className={`col${this.state.colSize}-8 middle-align`}
                            onClick={this.addResponsibility}
                        >Add Job Responsibility</button>
                    </div>

                    <div className="row">
                        <div className={`col${this.state.colSize}-4`} />
                        {this.state.responsibilities.length > 0
                            ? <ul>
                                {this.state.responsibilities.map((responsibility: string): JSX.Element => <li key={responsibility}>{responsibility}</li>)}
                            </ul>
                            : <></>
                        }
                    </div>

                    {/* Save work experience button */}
                    <div className="row">
                        <button
                            className={`col${this.state.colSize}-8 middle-align`}
                            onClick={this.handleAddWorkExperience}
                        >Save Work Experience</button>
                    </div>
                </div>
            );
        }

        return this.state.device === "mobile"
            ? mobileRender()
            : desktopRender();
    }
}