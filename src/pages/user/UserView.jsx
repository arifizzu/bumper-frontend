import React from "react";
import { Helmet } from "react-helmet-async";
import { Container, Button, Breadcrumb, Row, Col } from "react-bootstrap";
import { useNavigate, Link, useParams } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faEdit } from "@fortawesome/free-solid-svg-icons";

import UserView from "../../components/user/UserView";

const UserViewPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const handleEditButton = async () => {
    try {
      navigate("/users/create");
    } catch (error) {
      console.error("Create new user failed:", error);
    }
  };

  const handleUserBreadcrumb = () => {
    navigate("/users/index");
  };

  return (
    <React.Fragment>
      <Helmet title="User" />
      <Container fluid className="p-0">
        <Button
          variant="warning"
          className="float-end mt-n1"
          onClick={handleEditButton}
        >
          <FontAwesomeIcon icon={faEdit} /> Edit
        </Button>
        <Breadcrumb style={{ fontSize: "1.3rem" }}>
          <Breadcrumb.Item onClick={handleUserBreadcrumb}>User</Breadcrumb.Item>
          <Breadcrumb.Item active>View</Breadcrumb.Item>
        </Breadcrumb>
        <Row>
          <Col md="5" xl="4">
            <UserView id={id} />
          </Col>
          <Col md="7" xl="8">
            {/* <Activities /> */}
          </Col>
        </Row>
      </Container>
    </React.Fragment>
  );
};

export default UserViewPage;