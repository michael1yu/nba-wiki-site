import React from 'react';
import axios from 'axios';
import PlayerPage from './PlayerPage';
import {
    Route,
    NavLink,
    HashRouter
} from "react-router-dom";

const requestUrl = "https://nbaspringboot.herokuapp.com/query_current_players";
const proxyUrl = "https://m-y-cors-proxy.herokuapp.com/";
var name;
class TeamPage extends React.Component {
    constructor(props) {
        super(props);
    }

    state = {
        players: []
    }

    componentDidMount() {
        name = this.props.match.params.team;
        axios.get(proxyUrl + requestUrl, {
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
        axios.get(proxyUrl + requestUrl, {
            params: {
                team: name,
                current: "true"
            }
        }).then(
            response => {
                this.setState({ players: response.data.players ? response.data.players : []});
            }
        );
        
    }

    render() {
        return (
            <HashRouter>
                <div>
                    <h1>{this.props.match.params.team}</h1>
                    <ul>
                        {this.state.players.map(player => <li><NavLink to={"/team/" + this.props.match.params.team + "/player/" + player.id}>{player.name}</NavLink></li>)}
                    </ul>
                </div>
                <div>
                    <Route path={"/team/" + this.props.match.params.team + "/player/:id"} component = {PlayerPage} />
                </div>
            </HashRouter>

        );
    }
}
export default TeamPage;