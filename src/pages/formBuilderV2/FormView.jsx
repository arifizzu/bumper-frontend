import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import {
  Container,
  Button,
  Breadcrumb,
  Row,
  Col,
  Modal,
} from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { Link, useParams } from "react-router-dom";

import FormView from "../../components/formBuilderV2/FormView";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit } from "@fortawesome/free-solid-svg-icons";

import { useDispatch, useSelector } from "react-redux";

const FormViewPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const handleEditButton = async (id) => {
    try {
      navigate(`/form-builder-v2/edit/${id}`);
    } catch (error) {
      console.error("Edit form failed:", error);
    }
  };

  const handleFormBreadcrumb = () => {
    navigate("/form-builder-v2");
  };

  return (
    <React.Fragment>
      <Helmet title="Form" />
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
          <Breadcrumb.Item onClick={handleFormBreadcrumb}>Form</Breadcrumb.Item>
          <Breadcrumb.Item active>View</Breadcrumb.Item>
        </Breadcrumb>
        <FormView id={id} />
      </Container>
    </React.Fragment>
  );
};

export default FormViewPage;
