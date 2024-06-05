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
import DatalistViewPreviewEmbed from "../../components/datalistBuilder/DatalistViewPreviewEmbed";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlassArrowRight } from "@fortawesome/free-solid-svg-icons";

const DatalistViewPreviewEmbedPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [showEmbedModal, setShowEmbedModal] = useState(false);

  const handleDatalistBreadcrumb = () => {
    navigate("/datalist-builder");
  };

  const handleDatalistBreadcrumb2 = async (id) => {
    navigate(-1); // Go back to the previous page
  };
  const handleEmbedDatalistButton = async () => {
    setShowEmbedModal(true);
  };

  const url = window.location.origin;

  return (
    <React.Fragment>
      <Helmet title="Datalist" />
      <Container fluid className="p-0">
        <Button
          variant="info"
          className="float-end mt-n1"
          onClick={() => {
            handleEmbedDatalistButton(id);
          }}
        >
          <FontAwesomeIcon icon={faMagnifyingGlassArrowRight} /> Embed Datalist
        </Button>
        <Breadcrumb style={{ fontSize: "1.3rem" }}>
          <Breadcrumb.Item onClick={handleDatalistBreadcrumb}>
            Datalist
          </Breadcrumb.Item>
          <Breadcrumb.Item onClick={handleDatalistBreadcrumb2}>
            View
          </Breadcrumb.Item>
          <Breadcrumb.Item active>Preview Embedded Datalist</Breadcrumb.Item>
        </Breadcrumb>
      </Container>
      <Container fluid className="p-0">
        <Row className="justify-content-center">
          <Col lg="9">
            <DatalistViewPreviewEmbed id={id} />
          </Col>
        </Row>
      </Container>

      <Modal show={showEmbedModal} onHide={() => setShowEmbedModal(false)}>
        <Modal.Header closeButton>Embed Datalist</Modal.Header>
        <Modal.Body className="text-center m-3">
          <p className="mb-0">
            Please copy the URL link provided below and embed it within an
            iframe on your desired website or page to integrate the datalist
            seamlessly:
          </p>
          <p className="mb-0">
            URL:{" "}
            <a href={url}>
              {url}/datalists/view/embed/{id}
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

export default DatalistViewPreviewEmbedPage;
