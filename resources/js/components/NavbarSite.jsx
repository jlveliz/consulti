import React from 'react';
import {Navbar, Container, Nav, NavDropdown} from 'react-bootstrap'



export default function NavbarSite(props) {





    return(

        <Navbar bg="primary" variant="dark">
        <Container>
          <Navbar.Brand href="#home">Comentarios</Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarScroll" />
  <Navbar.Collapse id="navbarScroll">
    <Nav
      className="mr-auto my-2 my-lg-0"
      style={{ maxHeight: '100px' }}
      navbarScroll
    >
      <NavDropdown title="Comentarios" id="navbarScrollingComentarios">
        <NavDropdown.Item href="/crear-comentario">Gestión</NavDropdown.Item>
        <NavDropdown.Item href="/home">Listado</NavDropdown.Item>
      </NavDropdown>
      <NavDropdown title="Reportes" id="navbarScrollingDropdown">
        <NavDropdown.Item href="#action3">Eliminar Comentarios</NavDropdown.Item>
      </NavDropdown>
    </Nav>

  </Navbar.Collapse>
          <Navbar.Toggle />
          <Navbar.Collapse className="justify-content-end">
            <Navbar.Text>
             Hola {props.user.name}: <a onClick={props.handleLogout} >Salir</a>
            </Navbar.Text>
          </Navbar.Collapse>
        </Container>
      </Navbar>

    )
}

