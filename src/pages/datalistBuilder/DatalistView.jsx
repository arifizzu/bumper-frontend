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
import { faEdit } from "@fortawesome/free-solid-svg-icons";

import { useDispatch, useSelector } from "react-redux";

const DatalistViewPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const handleEditButton = async (id) => {
    try {
      navigate(`/datalist-builder/edit/${id}`);
    } catch (error) {
      console.error("Edit datalist failed:", error);
    }
  };

  const handleFormBreadcrumb = () => {
    navigate("/datalist-builder");
  };

  return (
    <React.Fragment>
      <Helmet title="Datalist" />
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
          <Breadcrumb.Item onClick={handleFormBreadcrumb}>
            Datalist
          </Breadcrumb.Item>
          <Breadcrumb.Item active>View</Breadcrumb.Item>
        </Breadcrumb>
        <DatalistView id={id} />
      </Container>
    </React.Fragment>
  );
};

export default DatalistViewPage;
