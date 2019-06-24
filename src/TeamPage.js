import React from 'react';
import axios from 'axios';
import PlayerPage from './PlayerPage';
import {
    NavLink,
    HashRouter
} from "react-router-dom";

const requestUrl = "https://nbaspringboot.herokuapp.com/query_current_players";
const proxyUrl = "https://m-y-cors-proxy.herokuapp.com/";
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
        axios.get(proxyUrl + requestUrl, {
            cancelToken: new CancelToken(function executor(c){
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
        axios.get(proxyUrl + requestUrl, {
            cancelToken: new CancelToken(function executor(c){
                cancel = c;
            }),
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

    componentWillUnmount(){
        cancel('Operation canceled by the user.');
    }

    render() {
        if(this.props.playerTeam){
            return (
                <PlayerPage id = {this.props.match.params.id} team = {this.props.playerTeam} />
            )
        } else {
            return (
                    <div>
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