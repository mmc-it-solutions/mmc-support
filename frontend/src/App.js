import React from "react";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import { Provider } from "react-redux";
import store from "./store";

import Header from "./components/Layout/Header/Header";
import Footer from "./components/Layout/Footer/Footer";

import "./App.css";

const HomeScreen = React.lazy(() => import("./containers/01_home/Home"));
const ProductsScreen = React.lazy(() =>
  import("./containers/03_products/Products")
);

class App extends React.Component {
  componentDidMount() {}
  render() {
    return (
      <Provider store={store}>
        <Router>
          <React.Fragment>
            <Header />
            <main>
              <React.Suspense fallback={<div>loading..</div>}>
                <Switch>
                  <Route path="/" exact={true} component={HomeScreen} />
                  <Route
                    path="/products"
                    exact={true}
                    component={ProductsScreen}
                  />
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
