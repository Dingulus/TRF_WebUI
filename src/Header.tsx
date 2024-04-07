import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import "./Universal.css";

export default function Header() {
  return (
    <>
      <Navbar className="bg-body-tertiary" fixed="top">
        <Container>
          <Navbar.Brand href="#home">
            <img
              alt=""
              src="/src/assets/image.png"
              width="auto"
              height="30"
              className="d-inline-block align-top"
            />{" "}
            Time-Resolved Fluorescence Reader
          </Navbar.Brand>
        </Container>
      </Navbar>
    </>
  );
}
