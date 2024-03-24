import React, { useState } from "react";
import PerfectScrollbar from "react-perfect-scrollbar";
import { useNavigate } from "react-router-dom";
import {
  Button,
  Navbar,
  Nav,
  Form,
  InputGroup,
  Offcanvas,
  Row,
} from "react-bootstrap";

import {
  AlertCircle,
  Bell,
  BellOff,
  Home,
  MessageCircle,
  UserPlus,
  Search,
} from "react-feather";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlus,
  faHouse,
  faFile,
  faDiagramProject,
  faPenToSquare,
  faAnglesRight,
} from "@fortawesome/free-solid-svg-icons";

import useSidebar from "../../hooks/useSidebar";

import NavbarDropdown from "./NavbarDropdown";
import NavbarDropdownItem from "./NavbarDropdownItem";
import NavbarUser from "./NavbarUser";

// import Sidebar from "../sidebar/Sidebar";
import { ReactComponent as Logo } from "../../assets/img/logo.svg";
import formBuilderItems from "../sidebar/formBuilderItems";

const Sidebar = ({ items, showFooter = true }) => {
  const { isOpen } = useSidebar();

  return (
    <nav className={`sidebar ${!isOpen ? "collapsed" : ""}`}>
      <div className="sidebar-content">
        <PerfectScrollbar>
          {/* <a className="sidebar-brand" href="/">
            <Logo /> <span className="align-middle me-3">BUMPER</span>
          </a> */}

          {/* <SidebarNav items={items} /> */}
        </PerfectScrollbar>
      </div>
    </nav>
  );
};

const NavbarComponent = () => {
  const navigate = useNavigate();
  const { isOpen, setIsOpen } = useSidebar();

  const [isOpenOffcanvas, setIsOpenOffcanvas] = useState(false);
  const handleCloseOffcanvas = () => setIsOpenOffcanvas(false);
  const handleShowOffcanvas = () => setIsOpenOffcanvas(true);

  const navigateToDashboard = () => {
    navigate("/dashboard");
  };

  const navigateToFormBuilder = () => {
    navigate("/dashboard");
  };

  const navigateToProcessBuilder = () => {
    navigate("/dashboard");
  };

  return (
    <>
      <Navbar variant="light" expand className="navbar-bg">
        {/* <span
          className="sidebar-toggle d-flex"
          onClick={() => {
            setIsOpen(!isOpen);
            console.log("open Dashboard.jsx");
          }}
        >
          <FontAwesomeIcon icon={faAnglesRight} size="3x" />
        </span> */}
        <span
          className="sidebar-toggle d-flex"
          onClick={() => {
            setIsOpen(!isOpen);
            console.log("open Dashboard.jsx");
          }}
        >
          <i className="hamburger align-self-center" />
        </span>

        <span className="sidebar-toggle d-flex" onClick={handleShowOffcanvas}>
          <i className="hamburger align-self-center" />
        </span>

        <Navbar.Collapse>
          <Nav className="navbar-align">
            <NavbarUser />
          </Nav>
        </Navbar.Collapse>
      </Navbar>
      <Offcanvas
        show={isOpenOffcanvas}
        onHide={handleCloseOffcanvas}
        style={{ maxWidth: "270px" }}
      >
        <Offcanvas.Header closeButton className="d-flex align-items-center">
          <Offcanvas.Title className="flex-grow-1">
            <div className="d-flex align-items-center">
              <Logo />
              <span className="align-middle ms-2 text-black">BUMPER</span>
            </div>
          </Offcanvas.Title>
        </Offcanvas.Header>

        <Offcanvas.Body>
          {/* <Row>
            <Button>
              <FontAwesomeIcon icon={faPlus} /> New Form
            </Button>
          </Row>
          <hr></hr> */}
          <Row className="mb-3">
            <Button
              variant="light"
              className="float-end mt-n1"
              onClick={navigateToDashboard}
            >
              <FontAwesomeIcon icon={faHouse} /> Home
            </Button>
          </Row>
          <hr></hr>
          <Row className="mb-3">
            <Button
              variant="light"
              className="float-end mt-n1 "
              onClick={navigateToFormBuilder}
            >
              <FontAwesomeIcon icon={faFile} /> Form Builder
            </Button>
          </Row>
          <Row className="mb-3">
            <Button
              variant="light"
              className="float-end mt-n1"
              onClick={navigateToProcessBuilder}
            >
              <FontAwesomeIcon icon={faDiagramProject} /> Process Builder
            </Button>
          </Row>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
};

export default NavbarComponent;
