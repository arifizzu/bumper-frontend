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

import FormViewEmbed from "../../components/formBuilderV2/FormViewEmbed";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit } from "@fortawesome/free-solid-svg-icons";

import { useDispatch, useSelector } from "react-redux";

const FormUsePage = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const handleFormBreadcrumb = () => {
    navigate("/form-builder-v2");
  };

  return (
    <React.Fragment>
      <Helmet title="Form" />
      <Container fluid className="p-0">
        <Breadcrumb style={{ fontSize: "1.3rem" }}>
          <Breadcrumb.Item onClick={handleFormBreadcrumb}>Form</Breadcrumb.Item>
          <Breadcrumb.Item active>Use</Breadcrumb.Item>
        </Breadcrumb>
        <FormViewEmbed id={id} />
      </Container>
    </React.Fragment>
  );
};

export default FormUsePage;
