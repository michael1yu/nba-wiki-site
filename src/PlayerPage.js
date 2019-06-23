import React from 'react';
import axios from 'axios';

const requestTeamUrl = "https://nbaspringboot.herokuapp.com/get_player_team";
const requestStatsUrl = "https://nbaspringboot.herokuapp.com/get_player_stats";
const proxyUrl = "https://m-y-cors-proxy.herokuapp.com/";
var player_id;

const CancelToken = axios.CancelToken;
let cancel;

class PlayerPage extends React.Component {
    constructor(props) {
        super(props);
    }

    state = {
        stats: []
    };

    componentWillUnmount() {
        cancel('Operation canceled by the user.');
    }


    componentDidMount() {
        player_id = this.props.id;
        axios.get(proxyUrl + requestStatsUrl, {
            cancelToken: new CancelToken(function executor(c) {
                // An executor function receives a cancel function as a parameter
                cancel = c;
              }),
            params: {
                team: this.props.team,
                id: player_id
            }
        }
        ).then(
            response => {
                this.setState({ stats : response.data ? response.data : [] });
            }
        );

    }

    render() {
        return (
            <div>
                <h1>{this.state.stats.games_played}</h1>
            </div>
        );
    }
}

export default PlayerPage;