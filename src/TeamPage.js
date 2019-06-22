import React from 'react';
import axios from 'axios';
import PlayerPage from './PlayerPage';
import {
    Route,
    NavLink,
    HashRouter
} from "react-router-dom";

const requestUrl = "https://nbaspringboot.herokuapp.com/query_current_players";
const proxyurl = "https://cors-anywhere.herokuapp.com/"
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
        axios.get(proxyurl + requestUrl, {
            params: {
                team: name,
                current: "true"
            },
            headers: {
                header: "Access-Control-Allow-Origin: *"
            }
        }
        ).then(
            (response) => {
                var output = response.data;
                this.setState({ players: response.data.players });
            }
        );
    }

    async componentWillReceiveProps(newProps) {
        name = newProps.match.params.team;
        const { data } = await axios.get(proxyurl + requestUrl, {
            params: {
                team: name,
                current: "true"
            },
            headers: {
                header: "Access-Control-Allow-Origin: *"
            }
        }
        );
        this.setState({ players: data.players });

    }

    render() {
        return (
            <HashRouter>
                <div>
                    <h1>{this.props.match.params.team}</h1>
                    <ul>
                        {this.state.players.map(player => <li><NavLink to = {"/team/" + this.props.match.params.team + "/player/" + player.id}>{player.name}</NavLink></li>)}
                    </ul>
                </div>
                <div>
                    <Route path = {"/team/" + this.props.match.params.team + "/player/:id"} component = {PlayerPage}/>
                </div>
            </HashRouter>

        );
    }
}
export default TeamPage;