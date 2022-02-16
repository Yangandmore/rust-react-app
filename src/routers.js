import React from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import { Login, Main, ErrorContainer, Page } from './container';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  urlToContrainer = (url) => {
    switch (url) {
      case 'dict':
        return Page.Dict;
      case 'role':
        return Page.Role;
      default:
        return ErrorContainer;
    }
  }

  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route exact path="/login" component={Login} />
          <Route exact path="/error" component={ErrorContainer} />

          <Route
            path="/"
            render={() => (
              <Main>
                <Route exact path="/dict" component={Page.Dict} />
                <Route exact path="/role" component={Page.Role} />
                <Route exact path="/" component={Page.Home} />
              </Main>
            )}
          />
          <Redirect to="/error" />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
