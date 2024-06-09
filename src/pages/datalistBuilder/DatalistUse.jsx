import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { Container, Col, Button, Breadcrumb } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { Link, useParams } from "react-router-dom";
import DatalistUse from "../../components/datalistBuilder/DatalistUse";

const DatalistUsePage = () => {
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
          <Breadcrumb.Item active>Use</Breadcrumb.Item>
        </Breadcrumb>
        <DatalistUse id={id} />
      </Container>
    </React.Fragment>
  );
};

export default DatalistUsePage;
