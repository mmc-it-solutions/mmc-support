import React from "react";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import { Provider } from "react-redux";
import store from "./store";

import Header from "./components/Layout/Header/Header";
import Footer from "./components/Layout/Footer/Footer";

import "./App.css";

const HomeScreen = React.lazy(() => import("./containers/01_home/Home"));
const TicketScreen = React.lazy(() => import("./containers/04_tickets/Ticket"));
const TicketDetailScreen = React.lazy(() =>
  import("./containers/04_tickets/TicketDetail/TicketDetail")
);
const CustomerScreen = React.lazy(() =>
  import("./containers/02_Customer/Customer")
);
const CustomerInfo = React.lazy(() =>
  import("./containers/02_Customer/CustomerInfo/CustomerInfo")
);

class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <div className="mmc-support">
            <Header />
            <main>
              <React.Suspense fallback={<div> loading.. </div>}>
                <Switch>
                  <Route path="/" exact={true} component={HomeScreen} />
                  <Route
                    path="/tickets"
                    exact={true}
                    component={TicketScreen}
                  />
                  <Route path="/tickets/:id" component={TicketDetailScreen} />
                  <Route path="/customers" exact component={CustomerScreen} />
                  <Route path="/customers/:id" component={CustomerInfo} />
                </Switch>
              </React.Suspense>
            </main>
            <Footer />
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
