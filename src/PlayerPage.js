import React from 'react';
import axios from 'axios';
import Collapsible from 'react-collapsible';

const requestStatsUrl = "https://nbaspringboot.herokuapp.com/get_player_stats";
const requestInfoUrl = "https://nbaspringboot.herokuapp.com/get_player_info";
var player_id;

const CancelToken = axios.CancelToken;
let cancel;
let playerStats;
let playerInfo;

class PlayerPage extends React.Component {
    constructor(props) {
        super(props);
        this.axiosStatsCall = this.axiosStatsCall.bind(this);
        this.axiosInfoCall = this.axiosInfoCall.bind(this);
    }

    state = {
        stats: [],
        info: [],
    };

    componentWillUnmount() {
        cancel('Operation canceled by the user.');
    }

    axiosInfoCall() {
        return axios.get(requestInfoUrl, {
            cancelToken: new CancelToken(function executor(c) {
                // An executor function receives a cancel function as a parameter
                cancel = c;
            }),
            params: {
                team: this.props.team,
                id: player_id
            }
        });
    }

    axiosStatsCall() {
        return axios.get(requestStatsUrl, {
            cancelToken: new CancelToken(function executor(c) {
                cancel = c;
            }),
            params: {
                team: this.props.team,
                id: player_id
            }
        });
    }


    componentDidMount() {
        player_id = this.props.id;
        let self = this;
        axios.all([
            this.axiosStatsCall(),
            this.axiosInfoCall()
        ]).then(axios.spread(function (statsResponse, infoResponse) {
            self.setState({
                stats: statsResponse.data ? statsResponse.data : [],
                info: infoResponse.data ? infoResponse.data : []
            });
        }));

    }

    render() {
        playerStats = this.state.stats;
        playerInfo = this.state.info;
        return (
            <div className="player">
                <h1>{playerInfo.first_name} {playerInfo.last_name}</h1>
                <div className="playerInfo">
                    <ul>
                        <li>Position: {playerInfo.position}</li>
                        <li>Height: {playerInfo.height_feet}' {playerInfo.height_inches}"</li>
                        <li>Weight: {playerInfo.weight_pounds} lbs</li>
                    </ul>
                </div>
                <div className="playerStats">
                    <ul>
                        <li>Games Played: {playerStats.games_played}</li>
                        <li>Minutes Per Game: {playerStats.min}</li>
                        <Collapsible trigger={"Points Per Game: " + playerStats.pts + " +"} triggerWhenOpen={"Points Per Game: " + playerStats.pts + " -"} >
                            <ul>
                                <Collapsible trigger={"Field Goal: " + (Number.parseFloat(playerStats.fg_pct, 10) * 100).toFixed(1) + "%" + " +"} triggerWhenOpen={"Field Goal: " + (Number.parseFloat(playerStats.fg_pct, 10) * 100).toFixed(1) + "%" + " -"}>
                                    <ul>
                                        <li>Field Goals Made: {playerStats.fgm}</li>
                                        <li>Field Goals Attempted: {playerStats.fga}</li>
                                    </ul>
                                </Collapsible>
                                <Collapsible trigger={"3 Point: " + (Number.parseFloat(playerStats.fg3_pct, 10) * 100).toFixed(1) + "%" + " +"} triggerWhenOpen={"3 Point: " + (Number.parseFloat(playerStats.fg3_pct, 10) * 100).toFixed(1) + "%" + " -"}>
                                    <ul>
                                        <li>3 Points Made: {playerStats.fg3m}</li>
                                        <li>3 Point Attempts: {playerStats.fg3a}</li>
                                    </ul>
                                </Collapsible>
                                <Collapsible trigger={"Free Throw: " + (Number.parseFloat(playerStats.ft_pct, 10) * 100).toFixed(1) + "%" + " +"} triggerWhenOpen={"Free Throw: " + (Number.parseFloat(playerStats.ft_pct, 10) * 100).toFixed(1) + "%" + " -"}>
                                    <ul>
                                        <li>Free Throws Made: {playerStats.ftm}</li>
                                        <li>Free Throws Attemped: {playerStats.fta}</li>
                                    </ul>
                                </Collapsible>
                            </ul>
                        </Collapsible>
                        <Collapsible trigger={"Rebounds: " + playerStats.reb + " +"} triggerWhenOpen={"Rebounds: " + playerStats.reb + " -"}>
                            <ul>
                                <li>Offensive Rebounds: {playerStats.oreb}</li>
                                <li>Defensive Rebounds: {playerStats.dreb}</li>
                            </ul>
                        </Collapsible>
                        <li>Assists Per Game: {playerStats.ast}</li>
                        <li>Steals Per Game: {playerStats.stl}</li>
                        <li>Blocks Per Game: {playerStats.blk}</li>
                        <li>Turnovers Per Game: {playerStats.turnover}</li>
                        <li>Personal Fouls Per Game: {playerStats.pf}</li>
                    </ul>
                </div>
            </div>
        );
    }
}

export default PlayerPage;