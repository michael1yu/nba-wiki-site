import React from 'react';
import TeamPage from './TeamPage';
import Home from './Home';
import PlayerListPage from './PlayerListPage';
import {
    Route,
    NavLink,
    HashRouter,
    Switch
} from "react-router-dom";
import PlayerPage from './PlayerPage';

class App extends React.Component {

    render() {
        return (
            <div className="page">
                <div className="navBar">
                    <ul className="header">
                        <li><NavLink to="/">Home</NavLink></li>
                        <li><NavLink to="/team">Teams</NavLink></li>
                    </ul>
                </div>
                <div className="content">
                    <Switch>
                        <Route exact path="/" component={Home} />
                        <Route exact path="/team" component={TeamPage} />
                        <Route exact path="/team/:team" component={PlayerListPage} />
                        <Route path="/team/:team/player/:id" component={PlayerPage} />
                    </Switch>
                </div>
            </div>
        );
    }
}

export default App;