import React from "react";


import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import { Provider } from "react-redux";
import store from "./store";

import Header from "./components/Layout/Header/Header";
import Footer from "./components/Layout/Footer/Footer";

const HomeScreen = React.lazy(() =>
    import ("./containers/01_home/Home"));
const TicketScreen = React.lazy(() =>
    import ("./containers/04_tickets/Ticket"));

class App extends React.Component {
        componentDidMount() {}
        render() {
            return ( <
                Provider store = { store } >
                <
                Router >
                <
                React.Fragment >
                <
                Header / >
                <
                main >
                <
                React.Suspense fallback = { < div > loading.. < /div>}> <
                    Switch >
                    <
                    Route path = "/"
                    exact = { true }
                    component = { HomeScreen }
                    /> <
                    Route path = "/ticket"
                    exact = { true }
                    component = { TicketScreen }
                    />  < /
                    Switch > <
                    /React.Suspense> < /
                    main > <
                    Footer / >
                    <
                    /React.Fragment> < /
                    Router > <
                    /Provider>
                );
            }
        }

        export default App;