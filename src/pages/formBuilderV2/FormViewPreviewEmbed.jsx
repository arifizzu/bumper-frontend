import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import {
  Container,
  Col,
  Row,
  Breadcrumb,
  Button,
  Modal,
} from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { Link, useParams } from "react-router-dom";
import FormViewPreviewEmbed from "../../components/formBuilderV2/FormViewPreviewEmbed";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlassArrowRight } from "@fortawesome/free-solid-svg-icons";

const FormViewPreviewEmbedPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [showEmbedModal, setShowEmbedModal] = useState(false);

  const handleFormBreadcrumb = () => {
    navigate("/form-builder-v2");
  };

  const handleFormBreadcrumb2 = async (id) => {
    navigate(-1); // Go back to the previous page
  };
  const handleEmbedFormButton = async () => {
    setShowEmbedModal(true);
  };

  const url = window.location.origin;

  return (
    <React.Fragment>
      <Helmet title="Form" />
      <Container fluid className="p-0">
        <Button
          variant="info"
          className="float-end mt-n1"
          onClick={() => {
            handleEmbedFormButton(id);
          }}
        >
          <FontAwesomeIcon icon={faMagnifyingGlassArrowRight} /> Embed Form
        </Button>
        <Breadcrumb style={{ fontSize: "1.3rem" }}>
          <Breadcrumb.Item onClick={handleFormBreadcrumb}>Form</Breadcrumb.Item>
          <Breadcrumb.Item onClick={handleFormBreadcrumb2}>
            View
          </Breadcrumb.Item>
          <Breadcrumb.Item active>Preview Embedded Form</Breadcrumb.Item>
        </Breadcrumb>
      </Container>
      <Container fluid className="p-0">
        <Row className="justify-content-center">
          <Col lg="9">
            <FormViewPreviewEmbed id={id} />
          </Col>
        </Row>
      </Container>

      <Modal show={showEmbedModal} onHide={() => setShowEmbedModal(false)}>
        <Modal.Header closeButton>Embed Form</Modal.Header>
        <Modal.Body className="text-center m-3">
          <p className="mb-0">
            Please copy the URL link provided below and embed it within an
            iframe on your desired website or page to integrate the form
            seamlessly:
          </p>
          <p className="mb-0">
            URL:{" "}
            <a href={url}>
              {url}/forms/view/embed/{id}
            </a>
          </p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowEmbedModal(false)}>
            Close
          </Button>{" "}
        </Modal.Footer>
      </Modal>
    </React.Fragment>
  );
};

export default FormViewPreviewEmbedPage;
