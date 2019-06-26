import React from 'react';
import TeamPage from './TeamPage';
import Home from './Home';
import {
    Route,
    NavLink,
    HashRouter,
    Switch
} from "react-router-dom";

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
                        <Route exact path="/team" render={(props) => <TeamPage {...props} teamList="true" />} />
                        <Route exact path="/team/:team" component={TeamPage} />
                        <Route path="/team/:team/player/:id" render={(props) => <TeamPage {...props} playerTeam={props.match.params.team} />} />
                    </Switch>
                </div>
            </div>
        );
    }
}

export default App;