import React from 'react';
import axios from 'axios';

const requestTeamUrl = "https://nbaspringboot.herokuapp.com/get_player_team";
const requestStatsUrl = "https://nbaspringboot.herokuapp.com/get_player_stats";
const proxyUrl = "https://m-y-cors-proxy.herokuapp.com/";
var player_id;

const source = axios.CancelToken.source();

class PlayerPage extends React.Component {
    constructor(props) {
        super(props);
    }

    state = {
        stats: []
    };

    componentWillUnmount(){
        source.cancel('Operation canceled by the user.');
    }


    async componentDidMount() {
        player_id = this.props.match.params.id;
        const firstResponse = await (
                axios.get(proxyUrl + requestTeamUrl, {
                    cancelToken: source.token,
                    params: {
                        id: player_id
                    }
                })
            );
        const secondResponse = await (
            axios.get(proxyUrl + requestStatsUrl, {
                cancelToken: source.token,
                params: {
                    team: firstResponse.data.team,
                    id: player_id
                }
            })
        );
        this.setState({stats: secondResponse.data});
    }

    render() {
        return (
            <div>
                <h1>Hello</h1>
            </div>


        );
    }
}

export default PlayerPage;