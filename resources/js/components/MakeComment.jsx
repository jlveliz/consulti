import React, { Component } from "react";
import { Form, Container, Button } from "react-bootstrap";
import { Link, Redirect } from "react-router-dom";

import NavbarSite from './NavbarSite';

import Http from "./../lib/Http";
// import ShowTask from "./ShowTask";

class MakeComment extends Component {
  constructor(props) {
    super(props);
    this.state = {
     comment: "",
     user: {},
     hasError: false,
     hasSuccess: false,

    };
  }



  updateForm = (e) => {
    // let form = this.state.comment;
    // const currentForm = form;
    // const { name, value } = e.target;
    // currentForm[name] = value;
    // this.setState({ comment: currentForm });

    this.setState({ comment: e.target.value });
  }


  getUser = () => {
    const user = JSON.parse(localStorage.getItem("user"));
    return user;
  }

  async componentDidMount() {



    const user = this.getUser();
    this.setState({ user });

  }


  handleSaveComment = async (e) => {
    this.setState({ hasError: false });
    this.setState({ hasSuccess: false });
    e.stopPropagation();
    e.preventDefault();
    let comment = this.state.comment;
    const data = {
        comment,
        user_id : JSON.parse(localStorage.getItem("user")).id

    }
     const req = await Http.instance.post("/api/comments", data);

    if (typeof req === "object" && req.hasOwnProperty("data")) {
      this.setState({ hasSuccess: true });
        alert("Comentario insertado correctamente");
        this.setState({comment:  ""})
    } else {
      this.setState({ hasError: true });
      this.setState({ messageError: req.message });
      this.setMessageErrorsForm(req.errors.children);
    }
  };

  render() {


    return (

<>
        <NavbarSite  user={this.state.user} handleLogout={this.handleLogout}/>
        <Container>
        <Form>

  <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
    <Form.Label>Comentario</Form.Label>
    <Form.Control as="textarea" rows={3} name="comment" value={this.state.comment} onChange={this.updateForm} />
  </Form.Group>
  <Button variant="primary" type="submit" onClick={this.handleSaveComment}>
    Enviar
  </Button>
</Form>
        </Container>
      </>
    );
  }
}

export default MakeComment;
