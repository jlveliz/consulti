import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import { Button, Card, Alert } from "react-bootstrap";

import Http from "./../lib/Http";

class Login extends Component {



  constructor(props) {

    super(props);
    this.state = {
      email: "",
      password: "",
      hasError: false,
      messageError: "",
      redirect:false,
    };
  }

  updateForm(e) {
    const key = e.target.name;
    const value = e.target.value;
    if (key == "email") this.setState({ email: value });
    if (key == "password") this.setState({ password: value });
  }

  handleLogin = async (e) => {

    this.setState({ hasError: false });
    e.stopPropagation();
    e.preventDefault();
    let data = {
      email: this.state.email,
      password: this.state.password,
    };

    const req = await Http.instance.post("/api/login", data);

    if (typeof req === "object" && req.hasOwnProperty("data")) {
      localStorage.setItem("authenticated", true);
      localStorage.setItem("user", JSON.stringify(req.data));
      this.setState({redirect:true});
    } else {
      this.setState({ hasError: true });
      this.setState({ messageError: req.message });
    }
  };

  render() {
    let errorMessage = null;
    if (this.state.hasError) {
      errorMessage = (
        <Alert variant={"danger"}>{this.state.messageError}</Alert>
      );
    }
    let redirect = null;
    if(this.state.redirect) redirect = <Redirect to="/home"/>

    return (
      <div className="container d-flex align-self-center   justify-content-center align-items-center">
        {redirect}
        <Card style={{ width: "31rem" }}>
          <div className="p-3 border-bottom align-self-center d-flex align-items-center justify-content-center">
            <h5>Ingreso</h5>
          </div>
          <div className="p-3 px-4 py-4 border-bottom">
            {errorMessage}
            <form onSubmit={(e) => this.handleLogin(e)}>
              <div className="mb-3">
                <label className="form-label">Correo</label>
                <input
                  className="form-control"
                  type="email"
                  placeholder="mail@example.com"
                  required="required"
                  name="email"
                  value={this.state.email}
                  onChange={(e) => this.updateForm(e)}
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Contraseña</label>
                <input
                  className="form-control"
                  type="password"
                  placeholder="password"
                  name="password"
                  required="required"
                  value={this.state.password}
                  onChange={(e) => this.updateForm(e)}
                />
              </div>

              <Button variant="primary" type="submit">
                Entrar
              </Button>
            </form>
          </div>
          <div className="p-3 d-flex flex-row justify-content-center align-items-center member">
            <Link to="/register" className="text-decoration-none ml-2">
              Registrarse
            </Link>
          </div>
        </Card>
      </div>
    );
  }
}

export default Login;
