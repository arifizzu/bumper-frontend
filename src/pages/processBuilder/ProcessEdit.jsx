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
import { useNavigate, useParams } from "react-router-dom";
import { Link } from "react-router-dom";

import ProcessEdit from "../../components/processBuilder/ProcessEdit";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSave } from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from "react-redux";

const ProcessEditPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const handleFormBreadcrumb = () => {
    navigate("/process-builder");
  };

  return (
    <React.Fragment>
      <Helmet title="Process" />
      <Container fluid className="p-0">
        <Breadcrumb style={{ fontSize: "1.3rem" }}>
          <Breadcrumb.Item onClick={handleFormBreadcrumb}>
            Process
          </Breadcrumb.Item>
          <Breadcrumb.Item active>Edit</Breadcrumb.Item>
        </Breadcrumb>
        <ProcessEdit id={id} />
      </Container>
    </React.Fragment>
  );
};

export default ProcessEditPage;
