import React from "react";
import { Helmet } from "react-helmet-async";
import { Container, Button, Breadcrumb } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

import ProcessIndex from "../../components/processBuilder/ProcessIndex.jsx";
import { tableColumns } from "./data.js";

const ProcessIndexPage = () => {
  const navigate = useNavigate();
  const handleCreateNew = async () => {
    try {
      navigate("/process-builder/create");
    } catch (error) {
      console.error("Create new user failed:", error);
    }
  };

  return (
    <React.Fragment>
      <Helmet title="Process" />
      <Container fluid className="p-0">
        <Button
          variant="primary"
          className="float-end mt-n1"
          onClick={handleCreateNew}
        >
          <FontAwesomeIcon icon={faPlus} /> New process
        </Button>
        <Breadcrumb style={{ fontSize: "1.3rem" }}>
          <Breadcrumb.Item active>Process</Breadcrumb.Item>
        </Breadcrumb>
        <ProcessIndex tableColumns={tableColumns} />
      </Container>
    </React.Fragment>
  );
};

export default ProcessIndexPage;
