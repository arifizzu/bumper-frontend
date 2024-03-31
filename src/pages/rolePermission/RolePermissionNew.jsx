import React from "react";
import { Helmet } from "react-helmet-async";
import { Container, Breadcrumb } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

import RolePermissionNew from "../../components/rolePermission/RolePermissionNew";

const RolePermissionNewPage = () => {
  const navigate = useNavigate();

  const handleUserBreadcrumb = () => {
    navigate("/role-permission");
  };

  return (
    <React.Fragment>
      <Helmet title="Role & Permission" />
      <Container fluid className="p-0">
        <Breadcrumb style={{ fontSize: "1.3rem" }}>
          <Breadcrumb.Item onClick={handleUserBreadcrumb}>
            Role & Permission
          </Breadcrumb.Item>
          <Breadcrumb.Item active>Create</Breadcrumb.Item>
        </Breadcrumb>
        <RolePermissionNew />
      </Container>
    </React.Fragment>
  );
};

export default RolePermissionNewPage;
