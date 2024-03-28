import React from "react";
import { Helmet } from "react-helmet-async";
import { Container, Breadcrumb } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

import ProcessNewDetails from "../../components/processBuilder/ProcessNewDetails";

const FormNewPage = () => {
  const navigate = useNavigate();

  const handleUserBreadcrumb = () => {
    navigate("/process-builder");
  };

  return (
    <React.Fragment>
      <Helmet title="Process" />
      <Container fluid className="p-0">
        <Breadcrumb style={{ fontSize: "1.3rem" }}>
          <Breadcrumb.Item onClick={handleUserBreadcrumb}>
            Process
          </Breadcrumb.Item>
          <Breadcrumb.Item active>Create</Breadcrumb.Item>
        </Breadcrumb>
        <ProcessNewDetails />
      </Container>
    </React.Fragment>
  );
};

export default FormNewPage;
