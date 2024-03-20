import React from "react";
import { Helmet } from "react-helmet-async";
import { Container, Breadcrumb } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import { Link } from "react-router-dom";

import UserEdit from "../../components/user/UserEdit";

const UserEditPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const handleUserBreadcrumb = () => {
    navigate("/users");
  };

  return (
    <React.Fragment>
      <Helmet title="User" />
      <Container fluid className="p-0">
        <Breadcrumb style={{ fontSize: "1.3rem" }}>
          <Breadcrumb.Item onClick={handleUserBreadcrumb}>User</Breadcrumb.Item>
          <Breadcrumb.Item active>Edit</Breadcrumb.Item>
        </Breadcrumb>
        <UserEdit id={id} />
      </Container>
    </React.Fragment>
  );
};

export default UserEditPage;
