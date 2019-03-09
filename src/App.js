import React, { Component } from 'react';
class App extends Component {
  state = {
    data: [
      { id: 1, firtname: "amit", lastname: "Verma", point: 50, active: true, team: "india" },
      { id: 2, firtname: "shiv", lastname: "kumar", point: 80, active: true, team: "pakishtan" },
      { id: 3, firtname: "dinesh", lastname: "Tailor", point: 70, active: true, team: "india" },
      { id: 4, firtname: "Ravi", lastname: "kumar", point: 50, active: true, team: "india" },
      { id: 5, firtname: "sahid", lastname: "ansari", point: 90, active: true, team: "india" }
    ],
    firstname: "",
    lastname: "",
    score: "",
    team: "",
    id: 0,
    editdata: 0
  }
  Updatedatahandler = (demo) => {
    debugger
    this.setState({ editdata: demo.id, firstname: demo.firtname, lastname: demo.lastname, score: demo.point, team: demo.team })
  }
  SubmitHandler = (e) => {
    let lastid = this.state.data.length + 1
    e.preventDefault();
    let data = {
      id: lastid, firtname: this.state.firstname, lastname: this.state.lastname, point: this.state.score, active: true, team: this.state.team
    }
    let newdata = this.state.data
    newdata.push(data)
    this.setState({ data: newdata })
  }
  deletedatahandler = (demo) => {
    let newdata = []
    this.state.data.map(data => {
      if (data.id !== demo.id) {
        newdata.push(data)
      }
      return null
    })
    this.setState({ data: newdata })
  }
  sortTotalPoint = (data) => {
    let newdata = data
    newdata.sort(function (a, b) {
      return parseInt(a.totalscore) - parseInt(b.totalscore)
    })
    return newdata
  }
  sortdata = () => {
    let newdata = this.state.data
    newdata.sort(function (a, b) {
      if (a.point === b.point) {
        let alastname = a.lastname.toLowerCase()
        let Blastname = b.lastname.toLowerCase()
        if (alastname < Blastname) {
          return - 1
        }
      } else {
        return parseInt(a.point) - parseInt(b.point)
      }
      return null
    })
    return newdata
  }
  UpdateHandler = (e) => {
    e.preventDefault();
    let data2 = {
      id: this.state.editdata, firtname: this.state.firstname, lastname: this.state.lastname, team: this.state.team, point: this.state.score, active: true
    }
    let eid = this.state.editdata;
    let newdata = []
    this.state.data.map(data => {
      if (data.id === eid) {
        newdata.push(data2)
      } else {
        newdata.push(data)
      }
      return null
    })
    this.setState({ data: newdata, editdata: 0, firstname: "", lastname: "", score: "" })
  }
  render() {
    let data = this.sortdata();
    let teams = [];
    data.map(data => {
      if (!teams.includes(data.team)) {
        teams.push(data.team)
      }
      return null
    })
    let newdata = []
    teams.map(data => {
      let data2 = {
        teams: data,
        totalscore: 0
      }
      newdata.push(data2)
      return null
    })
    for (let i = 0; i < data.length; i++) {
      if (data[i].active) {
        for (let k = 0; k < newdata.length; k++) {
          if (data[i].team === newdata[k].teams) {
            let newdat2 = newdata[k]
            newdat2.totalscore = parseInt(newdat2.totalscore) + parseInt(data[i].point)
          }
        }
      }
    }
    let b = this.sortTotalPoint(newdata)
    let a = b.map((data, key) => {
      if (data.totalscore !== 0) {
        return <tr key={key}>
          <th>{data.teams}</th>
          <th>{data.totalscore}</th>
        </tr>
      } return null

    })

    let data2
    data2 = data.map((data, key) => {
      if (data.active === true) {
        return <tr key={key}>
          <td>{data.firtname},{data.lastname}</td>
          <td>{data.point}</td>
          <td>{data.team}</td>
          <td><button onClick={() => this.deletedatahandler(data)} className="btn btn-danger">Delete</button> &nbsp;
            <button onClick={() => this.Updatedatahandler(data)} className="btn btn-success" >Edit</button>
          </td>
        </tr>
      }
      return null
    })
    return (
      <div className="container" style={{ marginTop: 20 }}>
        <div className="row">
          <div className="col-md-12" >
            <div className="col-md-4" style={{ boxShadow: "-2px 2px 4px 6px blue", height: 400 }}>
              <h3>Players</h3>
              <form >
                First name:<br />
                <input type="text" id="firstname" className="form-control" name="firstname" onChange={(event) => this.setState({ firstname: event.target.value })} defaultValue={this.state.firstname} />
                <br />
                Last name:<br />
                <input type="text" id="lastname" className="form-control" name="lastname" onChange={(event) => this.setState({ lastname: event.target.value })} defaultValue={this.state.lastname} />
                <br />
                score:<br />
                <input type="text" id="score" className="form-control" name="score" onChange={(event) => this.setState({ score: event.target.value })} defaultValue={this.state.score} />
                <br />
                teams:<br />
                <input type="text" id="team" className="form-control" name="team" onChange={(event) => this.setState({ team: event.target.value })} defaultValue={this.state.team} />
                <br />
                {this.state.editdata === 0 ?
                  <input type="submit" className="btn btn-primary" value="Submit" onClick={this.SubmitHandler.bind(this)} /> :
                  <input type="submit" className="btn btn-primary" value="Update" onClick={this.UpdateHandler.bind(this)} />}
              </form>
            </div>
            <div className="col-md-2"></div>
            <div className="col-md-6">
              <table className="table" >
                <thead>
                  <tr >
                    <th>Name</th>
                    <th>Score</th>
                    <th>Teams</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {data2}
                </tbody>
              </table>
              <table className="table" >
                <thead>
                  <tr >
                    <th>teams</th>
                    <th>score</th>
                  </tr>
                </thead>
                <tbody>
                  {a}
                </tbody>
              </table>

            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
