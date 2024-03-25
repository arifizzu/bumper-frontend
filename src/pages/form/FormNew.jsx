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
import { Link } from "react-router-dom";

import FormNewDetails from "../../components/form/FormNewDetails";
import FormNewFields from "../../components/form/FormNewFields";
import FieldDragAndDrop from "../../components/form/FieldDragAndDrop";

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
    navigate("/forms");
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

  // const handleFormNewDetailsData = async () => {
  //   try {
  //     setSubmitting(true);
  //     const result = await storeForm(formDetails);
  //     console.log("Result from storeForm", result);
  //     //   console.log("Result.data from storeForm", result.data);
  //     //   console.log("Result.data.id from storeForm", result.data.id);
  //     if (result.success === true) {
  //       console.log(formDetails); // Handle form submission
  //       console.log("Form saved successfully");
  //       setFormId(result.data.id);
  //     }
  //   } catch (error) {
  //     //   setShowModal(true);
  //     console.error("Unexpected error:", error);
  //     const formattedErrors = {};

  //     if (error.name && !error.short_name) {
  //       formattedErrors.name = [error.name[0]];
  //     }

  //     if (error.short_name && !error.name) {
  //       formattedErrors.short_name = [error.short_name[0]];
  //     }

  //     if (error.name && error.short_name) {
  //       formattedErrors.name = [error.name[0]];
  //       formattedErrors.short_name = [error.short_name[0]];
  //     }
  //     //   console.error("formattedErrors", formattedErrors);
  //     setFieldError(formattedErrors);
  //     //   console.error("Field Error:", fieldError);
  //   } finally {
  //     setSubmitting(false); // Reset form submitting state
  //   }
  //   console.log("FormNewDetails:", formDetails);
  // };

  // const handleFormNewFieldsData = async () => {
  //   try {
  //     setSubmitting(true);
  //     const result = await storeField(fieldDetails);
  //     console.log("Result from storeField", result);
  //     //   console.log("Result.data from storeField", result.data);
  //     //   console.log("Result.data.id from storeField", result.data.id);
  //     if (result.success === true) {
  //       console.log(fieldDetails); // Handle form submission
  //       console.log("Field saved successfully");
  //     }
  //   } catch (error) {
  //     console.error("Unexpected error:", error);
  //   } finally {
  //     setSubmitting(false); // Reset form submitting state
  //   }
  //   console.log("FormNewFields:", fieldDetails);
  // };

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
          // onClick={() => {
          //   if (
          //     !formDetails ||
          //     !formDetails.name ||
          //     formDetails.name === "" ||
          //     !formDetails.short_name ||
          //     formDetails.short_name === ""
          //   ) {
          //     setShowModal(true);
          //     setIsValid(false);
          //   } else if (
          //     !fieldDetails ||
          //     !fieldDetails.caption ||
          //     fieldDetails.caption === "" ||
          //     !fieldDetails.is_required ||
          //     fieldDetails.is_required === "" ||
          //     !fieldDetails.width ||
          //     fieldDetails.width === "" ||
          //     !fieldDetails.height ||
          //     fieldDetails.height === "" ||
          //     !fieldDetails.x_coordinate ||
          //     fieldDetails.x_coordinate === "" ||
          //     !fieldDetails.y_coordinate ||
          //     fieldDetails.y_coordinate === ""
          //   ) {
          //     setShowModal(true);
          //     setIsValid(false);
          //   } else {
          //     setIsValid(true);
          //     console.log("isValid dalam else statement", isValid);
          //   }
          //   console.log("isValid di luar ifelse statement", isValid);
          //   if (isValid) {
          //     handleFormNewDetailsData();
          //     handleFormNewFieldsData();
          //   }
          //   console.log("FormNewDetails:", formDetails);
          //   console.log("FormNewFields:", fieldDetails);
          //   //   navigate("/forms");
          // }}
          onClick={() => {
            handleFormNewDetailsData();
            handleFormNewFieldsData();
            // setFieldLayout({});
            navigate("/forms");
            // window.location.href = "/forms";
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
      </Container>
    </React.Fragment>
  );
};

export default FormNewPage;
