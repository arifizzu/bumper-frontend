import React from "react";
import { Helmet } from "react-helmet-async";
import { Container, Breadcrumb } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

import UserNew from "../../components/user/UserNew";

const UserNewPage = () => {
  const navigate = useNavigate();

  const handleUserBreadcrumb = () => {
    navigate("/users");
  };

  return (
    <React.Fragment>
      <Helmet title="User" />
      <Container fluid className="p-0">
        <Breadcrumb style={{ fontSize: "1.3rem" }}>
          <Breadcrumb.Item onClick={handleUserBreadcrumb}>User</Breadcrumb.Item>
          <Breadcrumb.Item active>Create</Breadcrumb.Item>
        </Breadcrumb>
        <UserNew />
      </Container>
    </React.Fragment>
  );
};

export default UserNewPage;
