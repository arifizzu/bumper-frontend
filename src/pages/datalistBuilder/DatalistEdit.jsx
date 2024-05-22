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

import DataListEdit from "../../components/datalistBuilder/DatalistEdit";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSave } from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from "react-redux";

const DataListEditPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const handleDatalistBreadcrumb = () => {
    navigate("/datalist-builder");
  };

  return (
    <React.Fragment>
      <Helmet title="Datalist" />
      <Container fluid className="p-0">
        <Breadcrumb style={{ fontSize: "1.3rem" }}>
          <Breadcrumb.Item onClick={handleDatalistBreadcrumb}>
            Datalist
          </Breadcrumb.Item>
          <Breadcrumb.Item active>Edit</Breadcrumb.Item>
        </Breadcrumb>
        <DataListEdit id={id} />
      </Container>
    </React.Fragment>
  );
};

export default DataListEditPage;
