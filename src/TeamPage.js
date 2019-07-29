import React from "react";
import axios from "axios";
import { NavLink } from "react-router-dom";
import SVG from "react-inlinesvg";
import Collapsible from "react-collapsible";

const requestTeamsUrl = "https://nothingbutstatsapi.herokuapp.com/get_teams";
var name;
const CancelToken = axios.CancelToken;
let cancel;
class TeamPage extends React.Component {
  constructor(props) {
    super(props);
  }

  state = {
    teams: []
  };

  componentDidMount() {
    axios
      .get(requestTeamsUrl, {
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
          teams: response.data.teams ? response.data.teams : []
        });
      });
  }

  componentWillUnmount() {
    cancel("Operation canceled by the user.");
  }

  render() {
    let teams = this.state.teams;
    let atlantic = [];
    let central = [];
    let southeast = [];
    let northwest = [];
    let pacific = [];
    let southwest = [];
    for (let i = 0; i < teams.length; i++) {
      switch (teams[i].division) {
        case "Atlantic":
          atlantic.push(teams[i]);
          break;
        case "Central":
          central.push(teams[i]);
          break;
        case "Southeast":
          southeast.push(teams[i]);
          break;
        case "Northwest":
          northwest.push(teams[i]);
          break;
        case "Pacific":
          pacific.push(teams[i]);
          break;
        case "Southwest":
          southwest.push(teams[i]);
          break;
      }
    }
    return (
      <div className="teamPage">
        <Collapsible open="true" trigger="Eastern Conference +" triggerWhenOpen="Eastern Conference -">
          <div className="conferenceList">
            <Collapsible open="true" trigger="Atlantic Division +" triggerWhenOpen="Atlantic Division -">
              <ul>
                {atlantic.map(team => (
                  <div className="teamItem">
                    <NavLink to={"/team/" + team.full_name}>
                      <div className="teamItemContent">
                        <SVG src={team.logo} />
                        {team.full_name}
                      </div>
                    </NavLink>
                  </div>
                ))}
              </ul>
            </Collapsible>
            <Collapsible open="true" trigger="Central Division +" triggerWhenOpen="Central Division -">
              <ul>
                {central.map(team => (
                  <div className="teamItem">
                    <NavLink to={"/team/" + team.full_name}>
                      <div className="teamItemContent">
                        <SVG src={team.logo} />
                        {team.full_name}
                      </div>
                    </NavLink>
                  </div>
                ))}
              </ul>
            </Collapsible>
            <Collapsible open="true" trigger="Southeast Division +" triggerWhenOpen="Southeast Division -">
              <ul>
                {southeast.map(team => (
                  <div className="teamItem">
                    <NavLink to={"/team/" + team.full_name}>
                      <div className="teamItemContent">
                        <SVG src={team.logo} />
                        {team.full_name}
                      </div>
                    </NavLink>
                  </div>
                ))}
              </ul>
            </Collapsible>
          </div>
        </Collapsible>

        <Collapsible open="true" trigger="Western Conference +" triggerWhenOpen="Western Conference -">
          <div className="conferenceList">
            <Collapsible open="true" trigger="Northwest Division +" triggerWhenOpen="Northwest Division -">
              <ul>
                {northwest.map(team => (
                  <div className="teamItem">
                    <NavLink to={"/team/" + team.full_name}>
                      <div className="teamItemContent">
                        <SVG src={team.logo} />
                        {team.full_name}
                      </div>
                    </NavLink>
                  </div>
                ))}
              </ul>
            </Collapsible>
            <Collapsible open="true" trigger="Pacific Division +" triggerWhenOpen="Pacific Division -">
              <ul>
                {pacific.map(team => (
                  <div className="teamItem">
                    <NavLink to={"/team/" + team.full_name}>
                      <div className="teamItemContent">
                        <SVG src={team.logo} />
                        {team.full_name}
                      </div>
                    </NavLink>
                  </div>
                ))}
              </ul>
            </Collapsible>
            <Collapsible open="true" trigger="Southwest Division +" triggerWhenOpen="Southwest Division -">
              <ul>
                {southwest.map(team => (
                  <div className="teamItem">
                    <NavLink to={"/team/" + team.full_name}>
                      <div className="teamItemContent">
                        <SVG src={team.logo} />
                        {team.full_name}
                      </div>
                    </NavLink>
                  </div>
                ))}
              </ul>
            </Collapsible>
          </div>
        </Collapsible>
      </div>
    );
  }
}
export default TeamPage;
