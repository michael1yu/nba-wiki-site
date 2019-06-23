import React from 'react';
import TeamPage from './TeamPage';
import Home from './Home';
import {
    Route,
    NavLink,
    HashRouter,
    Switch
} from "react-router-dom";
import PlayerPage from './PlayerPage';

const teams = [
    "Atlanta Hawks",
    "Boston Celtics",
    "Brooklyn Nets",
    "Charlotte Hornets",
    "Chicago Bulls",
    "Cleveland Cavaliers",
    "Dallas Mavericks",
    "Denver Nuggets",
    "Detroit Pistons",
    "Golden State Warriors",
    "Houston Rockets",
    "Indiana Pacers",
    "LA Clippers",
    "Los Angeles Lakers",
    "Memphis Grizzlies",
    "Miami Heat",
    "Milwaukee Bucks",
    "Minnesota Timberwolves",
    "New Orleans Pelicans",
    "New York Knicks",
    "Oklahoma City Thunder",
    "Orlando Magic",
    "Philadelphia 76ers",
    "Phoenix Suns",
    "Portland Trail Blazers",
    "Sacramento Kings",
    "San Antonio Spurs",
    "Toronto Raptors",
    "Utah Jazz",
    "Washington Wizards"];

const abbreviations = [
    "ATL",
    "BOS",
    "BKN",
    "CHA",
    "CHI",
    "CLE",
    "DAL",
    "DEN",
    "DET",
    "GS",
    "HOU",
    "IND",
    "LAC",
    "LAL",
    "MEM",
    "MIA",
    "MIL",
    "MIN",
    "NO",
    "NY",
    "OKC",
    "ORL",
    "PHI",
    "PHX",
    "POR",
    "SAC",
    "SA",
    "TOR",
    "UTH",
    "WSH"];

class App extends React.Component {

    render() {
        return (
            <HashRouter>
                <div className="page">
                    <div className="navBar">
                        <ul className="header">
                            <li><NavLink to="/">Home</NavLink></li>
                            {teams.map((team, index) => <li><NavLink to={"/team/" + team}>{abbreviations[index]}</NavLink></li>)}
                        </ul>
                    </div>

                    <div className="content">
                        <Switch>
                            <Route exact path="/" component={Home} />
                            <Route exact path="/team/:team" component={TeamPage} />
                            <Route path={"/team/:team/player/:id"} render = {(props) => <TeamPage {...props} playerTeam = {props.match.params.team} />} />
                        </Switch>
                    </div>
                </div>
            </HashRouter>

        );
    }
}

export default App;