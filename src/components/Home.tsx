import { PureComponent } from "react";
import { Link } from "react-router-dom";
import { Props } from "../types/TGlobal";
import { State } from "../types/THome";
import logo from "../logo.svg";
import "../css/GlobalCSS.css";
import "../css/HomeCSS.css";

class Home extends PureComponent<Props, State> {
    render() {
        return (
            <>            <h2>Green Thumb</h2>
                <h4>Single Page Application Demo</h4>
                <Link to="/dashboard/landing-page">
                    <img src={logo} className="App-logo" alt="logo" />
                </Link>
                <h4>Alex Nielson & Bekah</h4>

                <button
                    onClick={async () => {
                        fetch("/animals/animals")
                            .then((res: any): any => res.json())
                            .then((res: any): void => console.log("res:", res));
                    }}
                >Click</button>
                <p>
                    Edit <code>src/App.tsx</code> and save to reload.
                </p>
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
}

export default Home;