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

import FormView from "../../components/form/FormView";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit } from "@fortawesome/free-solid-svg-icons";

import { useDispatch, useSelector } from "react-redux";
import { storeForm } from "../../repositories/api/services/formServices";
import { storeField } from "../../repositories/api/services/fieldServices";

const FormViewPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const handleEditButton = async (id) => {
    // try {
    //   navigate(`/forms/edit/${id}`);
    // } catch (error) {
    //   console.error("Edit form failed:", error);
    // }
  };

  const handleFormBreadcrumb = () => {
    navigate("/forms");
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
        {/* <Row>
          <Col md="5" xl="4">
            <FormView id={id} />
          </Col>
        </Row> */}
      </Container>
    </React.Fragment>
  );
};

export default FormViewPage;
