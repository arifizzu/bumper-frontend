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

import FormEdit from "../../components/formBuilderV2/FormEdit";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAnglesLeft,
  faAnglesRight,
  faMaximize,
  faSave,
} from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from "react-redux";

const FormEditPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const handleFormBreadcrumb = () => {
    navigate("/form-builder-v2");
  };

  return (
    <React.Fragment>
      <Helmet title="Form" />
      <Container fluid className="p-0">
        <Button
          variant="success"
          className="float-end mt-n1"
          onClick={() => {
            navigate("/form-builder-v2");
          }}
        >
          <FontAwesomeIcon icon={faSave} /> Save Form
        </Button>
        <Breadcrumb style={{ fontSize: "1.3rem" }}>
          <Breadcrumb.Item onClick={handleFormBreadcrumb}>Form</Breadcrumb.Item>
          <Breadcrumb.Item active>Edit</Breadcrumb.Item>
        </Breadcrumb>
        <FormEdit id={id} />
      </Container>
    </React.Fragment>
  );
};

export default FormEditPage;
