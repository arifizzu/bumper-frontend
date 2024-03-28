import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { Container, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { Link, useParams } from "react-router-dom";
import FormViewEmbed from "../../components/formBuilder/FormViewEmbed";

const FormViewEmbedPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  return (
    <React.Fragment>
      <Helmet title="Form" />
      <Container fluid className="p-0">
        <Col lg="12">
          <FormViewEmbed id={id} />
        </Col>
      </Container>
    </React.Fragment>
  );
};

export default FormViewEmbedPage;
