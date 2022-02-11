import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { Login, Main, Page } from './container';

const App = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/login" component={Login} />
      <Route
        path="/"
        render={() => (
          <Main>
            <Route exact path="/dict" component={Page.Dict} />
            <Route exact path="/" component={Page.Home} />
          </Main>
        )}
      />
    </Switch>
  </BrowserRouter>
);
export default App;
