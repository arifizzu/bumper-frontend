import React from "react";
import { Helmet } from "react-helmet-async";
import {
  Container,
  Button,
  Breadcrumb,
  Row,
  Col,
  Modal,
  Card,
} from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

import ProcessNewDetails from "../../components/processBuilder/ProcessNewDetails";
import ActivityDragAndDrop from "../../components/processBuilder/ActivityDragAndDrop";

const ProcessNewPage = () => {
  const navigate = useNavigate();

  const handleProcessBreadcrumb = () => {
    navigate("/process-builder");
  };

  return (
    <React.Fragment>
      <Helmet title="Process" />
      <Container fluid className="p-0">
        <Breadcrumb style={{ fontSize: "1.3rem" }}>
          <Breadcrumb.Item onClick={handleProcessBreadcrumb}>
            Process
          </Breadcrumb.Item>
          <Breadcrumb.Item active>Create</Breadcrumb.Item>
        </Breadcrumb>
        <Card>
          <Row>
            <Col md="3">
              <ActivityDragAndDrop />
            </Col>
            <Col md="9">
              <ProcessNewDetails />
            </Col>
          </Row>
        </Card>
      </Container>
    </React.Fragment>
  );
};

export default ProcessNewPage;
