import React from "react";
import { Helmet } from "react-helmet-async";
import { Container, Button, Breadcrumb } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

import UserIndex from "../../components/user/UserIndex";
import { tableColumns } from "./data.js";

const UserIndexPage = () => {
  const navigate = useNavigate();
  const permissions = JSON.parse(localStorage.getItem("permissions"));

  const handleCreateNew = async () => {
    try {
      navigate("/users/create");
    } catch (error) {
      console.error("Create new user failed:", error);
    }
  };

  return (
    <React.Fragment>
      <Helmet title="User" />
      <Container fluid className="p-0">
        {permissions.includes("create user") && (
          <Button
            variant="primary"
            className="float-end mt-n1"
            onClick={handleCreateNew}
          >
            <FontAwesomeIcon icon={faPlus} /> New user
          </Button>
        )}
        <Breadcrumb style={{ fontSize: "1.3rem" }}>
          <Breadcrumb.Item active>User</Breadcrumb.Item>
        </Breadcrumb>
        {/* <UserIndex tableColumns={tableColumns} /> */}
        <UserIndex />
      </Container>
    </React.Fragment>
  );
};

export default UserIndexPage;
