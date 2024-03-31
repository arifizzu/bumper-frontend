import React from "react";
import { Helmet } from "react-helmet-async";
import { Container, Breadcrumb } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import { Link } from "react-router-dom";

import RolePermissionEdit from "../../components/rolePermission/RolePermissionEdit";

const RolePermissionEditPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const handleBreadcrumb = () => {
    navigate("/role-permission");
  };

  return (
    <React.Fragment>
      <Helmet title="Role & Permission" />
      <Container fluid className="p-0">
        <Breadcrumb style={{ fontSize: "1.3rem" }}>
          <Breadcrumb.Item onClick={handleBreadcrumb}>
            Role & Permission
          </Breadcrumb.Item>
          <Breadcrumb.Item active>Edit</Breadcrumb.Item>
        </Breadcrumb>
        <RolePermissionEdit id={id} />
      </Container>
    </React.Fragment>
  );
};

export default RolePermissionEditPage;
