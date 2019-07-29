import React from "react";
import axios from "axios";
import { NavLink } from "react-router-dom";

const requestPlayersUrl =
  "https://nothingbutstatsapi.herokuapp.com/query_current_players";
var name;
const CancelToken = axios.CancelToken;
let cancel;
class PlayerListPage extends React.Component {
  constructor(props) {
    super(props);
  }

  state = {
    players: []
  };

  componentDidMount() {
    name = this.props.match.params.team;
    axios
      .get(requestPlayersUrl, {
        cancelToken: new CancelToken(function executor(c) {
          cancel = c;
        }),
        params: {
          team: name,
          current: "true"
        }
      })
      .then(response => {
        this.setState({
          players: response.data.players ? response.data.players : []
        });
      });
  }

  componentWillReceiveProps(newProps) {
    name = newProps.match.params.team;
    axios
      .get(requestPlayersUrl, {
        cancelToken: new CancelToken(function executor(c) {
          cancel = c;
        }),
        params: {
          team: name,
          current: "true"
        }
      })
      .then(response => {
        this.setState({
          players: response.data.players ? response.data.players : []
        });
      });
  }

  componentWillUnmount() {
    cancel("Operation canceled by the user.");
  }

  render() {
    return (
      <div className="playerPage">
        <h1>{this.props.match.params.team}</h1>
        <ul>
          {this.state.players.map(player => (
            <li>
              <NavLink
                to={
                  "/team/" +
                  this.props.match.params.team +
                  "/player/" +
                  player.id
                }
              >
                {player.name}
              </NavLink>
            </li>
          ))}
        </ul>
      </div>
    );
  }
}
export default PlayerListPage;
