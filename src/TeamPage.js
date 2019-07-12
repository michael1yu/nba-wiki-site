import React from 'react';
import axios from 'axios';
import PlayerPage from './PlayerPage';
import {
    NavLink,
    HashRouter
} from "react-router-dom";

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
const requestUrl = "https://nbaspringboot.herokuapp.com/query_current_players";
var name;
const CancelToken = axios.CancelToken;
let cancel;
class TeamPage extends React.Component {
    constructor(props) {
        super(props);
    }

    state = {
        players: []
    }

    componentDidMount() {
        name = this.props.match.params.team;
        axios.get(requestUrl, {
            cancelToken: new CancelToken(function executor(c) {
                cancel = c;
            }),
            params: {
                team: name,
                current: "true"
            }
        }).then(
            response => {
                this.setState({ players: response.data.players ? response.data.players : [] });
            }
        );

    }

    componentWillReceiveProps(newProps) {
        name = newProps.match.params.team;
        axios.get(requestUrl, {
            cancelToken: new CancelToken(function executor(c) {
                cancel = c;
            }),
            params: {
                team: name,
                current: "true"
            }
        }).then(
            response => {
                this.setState({ players: response.data.players ? response.data.players : [] });
            }
        );

    }

    componentWillUnmount() {
        cancel('Operation canceled by the user.');
    }

    render() {
        if (this.props.teamList == "true") {
            return (
                <div className="teamList">
                    <ul>
                        {teams.map((team) => <li><NavLink to={"/team/" + team}>{team}</NavLink></li>)}
                    </ul>
                </div>
            )
        }
        else if (this.props.playerTeam) {
            return (
                <PlayerPage id={this.props.match.params.id} team={this.props.playerTeam} />
            );
        } else {
            return (
                <div className="teamPage">
                    <h1>{this.props.match.params.team}</h1>
                    <ul>
                        {this.state.players.map((player) => <li><NavLink to={"/team/" + this.props.match.params.team + "/player/" + player.id}>{player.name}</NavLink></li>)}
                    </ul>
                </div>
            );
        }

    }
}
export default TeamPage;