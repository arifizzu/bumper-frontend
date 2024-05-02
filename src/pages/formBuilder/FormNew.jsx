import React, { useEffect, useState } from "react";
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
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

import FormNewDetails from "../../components/formBuilder/FormNewDetails";
import FormNewFields from "../../components/formBuilder/FormNewFields";
import FieldDragAndDrop from "../../components/formBuilder/FieldDragAndDrop";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAnglesLeft,
  faAnglesRight,
  faMaximize,
  faSave,
} from "@fortawesome/free-solid-svg-icons";

import { useDispatch, useSelector } from "react-redux";
import { storeForm } from "../../repositories/api/services/formServices";
import { storeField } from "../../repositories/api/services/fieldServices";

const FormNewPage = () => {
  const navigate = useNavigate();
  const [isFieldDragAndDropOpen, setIsFieldDragAndDropOpen] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [fieldError, setFieldError] = useState({});

  const [formDetails, setFormDetails] = useState({});
  const [formIsFilled, setFormIsFilled] = useState(false);

  const [fieldDetails, setFieldDetails] = useState({});
  const [fieldIsFilled, setFieldIsFilled] = useState(false);

  const [formId, setFormId] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [isValid, setIsValid] = useState(false);
  const [fieldLayout, setFieldLayout] = useState({});

  const handleUserBreadcrumb = () => {
    navigate("/form-builder");
  };

  const toggleFieldDragAndDrop = () => {
    setIsFieldDragAndDropOpen(!isFieldDragAndDropOpen); // Toggle visibility
  };

  useEffect(() => {
    console.log("FormDetails changed:", formDetails);
  }, [formDetails]);

  useEffect(() => {
    console.log("FieldDetails changed:", fieldDetails);
  }, [fieldDetails]);

  useEffect(() => {
    console.log("Field Error in useEffect:", fieldError);
  }, [fieldError]);

  useEffect(() => {
    console.log("fieldLayout updated in parent component:", fieldLayout);
  }, [fieldLayout]);

  const handleFormNewDetailsData = async () => {
    try {
      setSubmitting(true);
      const result = await storeForm(formDetails);
      console.log("Result from formDetails", result);
    } catch (error) {
      console.error("Unexpected error:", error);
    } finally {
      setSubmitting(false);
    }
  };

  const handleFormNewFieldsData = async () => {
    try {
      setSubmitting(true);
      // const result = await storeField(fieldDetails);
      // console.log("Result from storeField", result);
      for (const field of fieldDetails) {
        // await storeField(field);
        console.log("field in handleFormNewFieldsData", field);
        const result = await storeField(field);
        console.log("Result from storeField", result);
      }
    } catch (error) {
      console.error("Unexpected error:", error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <React.Fragment>
      <Helmet title="Form" />
      <Container fluid className="p-0">
        <Button
          variant="success"
          className="float-end mt-n1"
          hidden={!formIsFilled || !fieldIsFilled}
          onClick={() => {
            handleFormNewDetailsData();
            handleFormNewFieldsData();
            // setFieldLayout({});
            navigate("/form-builder");
            // window.location.href = "/form-builder";
          }}
        >
          <FontAwesomeIcon icon={faSave} /> Save Form
        </Button>
        <Breadcrumb style={{ fontSize: "1.3rem" }}>
          <Breadcrumb.Item onClick={handleUserBreadcrumb}>Form</Breadcrumb.Item>
          <Breadcrumb.Item active>Create</Breadcrumb.Item>
        </Breadcrumb>

        <Modal show={showModal} onHide={() => setShowModal(false)}>
          <Modal.Header closeButton>
            Incomplete Form and Field Details
          </Modal.Header>
          <Modal.Body className="text-center m-3">
            <p className="mb-0">
              Please complete the form and field details...
            </p>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowModal(false)}>
              Close
            </Button>{" "}
          </Modal.Footer>
        </Modal>

        <FormNewDetails
          setFormDetails={setFormDetails}
          fieldError={fieldError}
          formIsFilled={formIsFilled}
          setFormIsFilled={setFormIsFilled}
        />
        <Card>
          <Row>
            <Col md={isFieldDragAndDropOpen ? 4 : 1}>
              {isFieldDragAndDropOpen && (
                <React.Fragment>
                  <FieldDragAndDrop
                    toggleFieldDragAndDrop={toggleFieldDragAndDrop}
                    formDetails={formDetails}
                    tableData={{ tableName: formDetails.table_name }}
                    formId={formId}
                    fieldLayout={fieldLayout}
                    setFieldLayout={setFieldLayout}
                    fieldDetails={fieldDetails}
                    setFieldDetails={setFieldDetails}
                    fieldIsFilled={fieldIsFilled}
                    setFieldIsFilled={setFieldIsFilled}
                  />
                </React.Fragment>
              )}
              {!isFieldDragAndDropOpen && (
                <Button variant="primary" onClick={toggleFieldDragAndDrop}>
                  Field <FontAwesomeIcon icon={faAnglesRight} />
                </Button>
              )}
            </Col>

            <Col md={isFieldDragAndDropOpen ? 8 : 11}>
              <FormNewFields
                setFieldDetails={setFieldDetails}
                fieldLayout={fieldLayout}
                setFieldLayout={setFieldLayout}
              />
            </Col>
          </Row>
        </Card>
      </Container>
    </React.Fragment>
  );
};

export default FormNewPage;
