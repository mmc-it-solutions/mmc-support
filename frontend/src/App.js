import React from "react";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import { Provider } from "react-redux";
import store from "./store";

import Header from "./components/Layout/Header/Header";
import Footer from "./components/Layout/Footer/Footer";

import "./App.css";

const HomeScreen = React.lazy(() => import("./containers/01_home/Home"));
const TicketScreen = React.lazy(() => import("./containers/04_tickets/Ticket"));
const CustomerScreen = React.lazy(() =>
  import("./containers/02_Customer/Customer")
);
const TicketDetailScreen = React.lazy(() =>
  import("./containers/04_tickets/TicketDetail/TicketDetail")
const CustomerInfo = React.lazy(() =>
  import("./containers/02_Customer/CustomerInfo/CustomerInfo")
);

class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <React.Fragment>
            <Header />
            <main>
              <React.Suspense fallback={<div> loading.. </div>}>
                <Switch>
                  
                  <Route path="/" exact={true} component={HomeScreen} />
                  <Route path="/ticket" exact={true} component={TicketScreen} />
                  <Route path="/ticket/:id" component={TicketDetailScreen} />
                  <Route path="/customers" exact component={CustomerScreen} />
                  <Route path="/customers/:id" component={CustomerInfo} />
                </Switch>
              </React.Suspense>
            </main>
            <Footer />
          </React.Fragment>
        </Router>
      </Provider>
    );
  }
}

export default App;
