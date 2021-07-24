import React, { Component } from "react";
import { Table, Container, Button, Badge } from "react-bootstrap";
import { Link, Redirect } from "react-router-dom";

import NavbarSite from './NavbarSite';

import Http from "./../lib/Http";
// import ShowTask from "./ShowTask";

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tasks: [],
      showModalHistory: false,
      tareaSelected: null,
      showModalCreateEdit: false,
      user: {
          name: ""
      },
      hasLogout: false
    };
  }

  loadTasks = async () => {
    const { id } = JSON.parse(localStorage.getItem("user"));
    const req = await Http.instance.get(`/api/list-commnets/${id}`);

    return req.data;
  };

  async loadComments(tareaSelected) {
    const req = await Http.instance.get(
      `/api/list-commnets/${tareaSelected}`
    );
    this.setState({ comments: req.data });
  }

  toggleModalHistory = (state, tareaSelected) => {
    this.setState({ showModalHistory: state });
    this.setState({ tareaSelected });
  };

  toggleModalCreateEditTask = (state, tareaSelected) => {
    this.setState({ showModalCreateEdit: state });
    this.setState({ tareaSelected });
  };

  setVariantColor(stateId) {
    let color = "";
    switch (stateId) {
      case 1:
        color = "primary";
        break;
      case 2:
        color = "success";
        break;
      case 3:
        color = "warning";
        break;
      case 4:
        color = "secondary";
        break;
      default:
        color = "primary";
        break;
    }

    return color;
  }


  getUser = () => {
    const user = JSON.parse(localStorage.getItem("user"));
    return user;
  }

  async componentDidMount() {

    const tasks = await this.loadTasks();
    this.setState({ tasks });

    const user = this.getUser();
    this.setState({ user });

  }

   handleLogout = () => {
        localStorage.removeItem("user");
        localStorage.removeItem("authenticated")
        this.setState({hasLogout: true})
  }

  render() {

    let redirect = null
    if(this.state.hasLogout) redirect = <Redirect to="/"/>
    return (
        <>
        {redirect}
        {/* <ShowTask
          showModalHistory={this.state.showModalHistory}
          handleHide={this.toggleModalHistory}
          tareaSelected={this.state.tareaSelected}
          comments={this.state.comments}
        />

        <CreateEditTask
          showModalCreateEdit={this.state.showModalCreateEdit}
          handleHide={this.toggleModalCreateEditTask}
        /> */}

        <NavbarSite  user={this.state.user} handleLogout={this.handleLogout}/>
        <Container>


          <Table striped bordered hover>
            <thead>
              <tr>
                <th>#</th>
                <th>Comentario</th>

              </tr>
            </thead>
            <tbody>
              {this.state.tasks.map((task, idx) => (
                <tr key={idx}>
                  <td>{idx + 1}</td>
                  <td>{task.comment}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Container>
      </>
    );
  }
}

export default Home;
