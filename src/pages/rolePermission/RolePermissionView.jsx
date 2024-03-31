import React from "react";
import { Helmet } from "react-helmet-async";
import { Container, Button, Breadcrumb, Row, Col } from "react-bootstrap";
import { useNavigate, Link, useParams } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit } from "@fortawesome/free-solid-svg-icons";

import RolePermissionView from "../../components/rolePermission/RolePermissionView";

const RolePermissionViewPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  //   console.log("id", id);

  const handleEditButton = async (id) => {
    try {
      navigate(`/role-permission/edit/${id}`);
    } catch (error) {
      console.error("Edit role failed:", error);
    }
  };

  const handleBreadcrumb = () => {
    navigate("/role-permission");
  };

  return (
    <React.Fragment>
      <Helmet title="Role & Permission" />
      <Container fluid className="p-0">
        <Button
          variant="warning"
          className="float-end mt-n1"
          onClick={() => {
            handleEditButton(id);
          }}
        >
          <FontAwesomeIcon icon={faEdit} /> Edit
        </Button>
        <Breadcrumb style={{ fontSize: "1.3rem" }}>
          <Breadcrumb.Item onClick={handleBreadcrumb}>
            Role & Permission
          </Breadcrumb.Item>
          <Breadcrumb.Item active>View</Breadcrumb.Item>
        </Breadcrumb>
        <RolePermissionView id={id} />
      </Container>
    </React.Fragment>
  );
};

export default RolePermissionViewPage;
