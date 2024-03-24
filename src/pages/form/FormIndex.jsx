import React from "react";
import { Helmet } from "react-helmet-async";
import { Container, Button, Breadcrumb } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

import FormIndex from "../../components/form/FormIndex";
import { tableColumns } from "./data.js";

const FormIndexPage = () => {
  const navigate = useNavigate();
  const handleCreateNew = async () => {
    try {
      navigate("/forms/create");
    } catch (error) {
      console.error("Create new form failed:", error);
    }
  };

  return (
    <React.Fragment>
      <Helmet title="Form" />
      <Container fluid className="p-0">
        <Button
          variant="primary"
          className="float-end mt-n1"
          onClick={handleCreateNew}
        >
          <FontAwesomeIcon icon={faPlus} /> New Form
        </Button>
        <Breadcrumb style={{ fontSize: "1.3rem" }}>
          <Breadcrumb.Item active>Form</Breadcrumb.Item>
        </Breadcrumb>
        <FormIndex tableColumns={tableColumns} />
      </Container>
    </React.Fragment>
  );
};

export default FormIndexPage;
