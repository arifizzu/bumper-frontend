import React from "react";
import { Helmet } from "react-helmet-async";
import { Container, Button, Breadcrumb } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

import RolePermissionIndex from "../../components/rolePermission/RolePermissionIndex";
import { tableColumns } from "./data.js";

const RolePermissionIndexPage = () => {
  const navigate = useNavigate();
  const handleCreateNew = async () => {
    try {
      navigate("/role-permission/create");
    } catch (error) {
      console.error("Create new role failed:", error);
    }
  };

  return (
    <React.Fragment>
      <Helmet title="Role & Permission" />
      <Container fluid className="p-0">
        <Button
          variant="primary"
          className="float-end mt-n1"
          onClick={handleCreateNew}
        >
          <FontAwesomeIcon icon={faPlus} /> New role
        </Button>
        <Breadcrumb style={{ fontSize: "1.3rem" }}>
          <Breadcrumb.Item active>Role & Permission</Breadcrumb.Item>
        </Breadcrumb>
        <RolePermissionIndex tableColumns={tableColumns} />
      </Container>
    </React.Fragment>
  );
};

export default RolePermissionIndexPage;
