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

import DatalistView from "../../components/datalistBuilder/DatalistView";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEdit,
  faMagnifyingGlassArrowRight,
  faMagnifyingGlass,
} from "@fortawesome/free-solid-svg-icons";

import { useDispatch, useSelector } from "react-redux";

const DatalistViewPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [showEmbedModal, setShowEmbedModal] = useState(false);
  const url = window.location.origin;
  const permissions = JSON.parse(localStorage.getItem("permissions"));

  const handleEditButton = async (id) => {
    try {
      navigate(`/datalist-builder/edit/${id}`);
    } catch (error) {
      console.error("Edit datalist failed:", error);
    }
  };

  const handleEmbedDatalistButton = async () => {
    setShowEmbedModal(true);
  };

  const handleViewPreviewButton = async (id) => {
    try {
      navigate(`/datalist-builder/view/preview/${id}`);
    } catch (error) {
      console.error("View datalist preview failed:", error);
    }
  };

  const handleDatalistBreadcrumb = () => {
    navigate("/datalist-builder");
  };

  return (
    <React.Fragment>
      <Helmet title="Datalist" />
      <Container fluid className="p-0">
        {permissions.includes("edit datalist") && (
          <Button
            variant="warning"
            className="float-end mt-n1 me-2"
            onClick={() => {
              handleEditButton(id);
            }}
          >
            <FontAwesomeIcon icon={faEdit} /> Edit
          </Button>
        )}
        <Button
          variant="info"
          className="float-end mt-n1 me-2"
          onClick={() => {
            handleEmbedDatalistButton();
          }}
        >
          <FontAwesomeIcon icon={faMagnifyingGlassArrowRight} /> Embed Datalist
        </Button>
        <Button
          variant="info"
          className="float-end mt-n1 me-2"
          onClick={() => {
            handleViewPreviewButton(id);
          }}
        >
          <FontAwesomeIcon icon={faMagnifyingGlass} /> Preview Embedded Datalist
        </Button>
        <Breadcrumb style={{ fontSize: "1.3rem" }}>
          <Breadcrumb.Item onClick={handleDatalistBreadcrumb}>
            Datalist
          </Breadcrumb.Item>
          <Breadcrumb.Item active>View</Breadcrumb.Item>
        </Breadcrumb>
        <DatalistView id={id} />
      </Container>

      <Modal
        show={showEmbedModal}
        onHide={() => setShowEmbedModal(false)}
        centered
      >
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

export default DatalistViewPage;
