import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import {
  Container,
  Button,
  Breadcrumb,
  Modal,
  Col,
  Row,
  Form,
} from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import * as Yup from "yup";
import { Formik } from "formik";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import { storeProcess } from "../../repositories/api/services/processServices";

import ProcessIndex from "../../components/processBuilder/ProcessIndex.jsx";
import { tableColumns } from "./data.js";

const schemaProcess = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  short_name: Yup.string().required("Short Name is required"),
});

const ProcessIndexPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [showModalProcess, setShowModalProcess] = useState(false);

  const toggleModalProcess = () => {
    setShowModalProcess((prevShowModalProcess) => !prevShowModalProcess);
  };

  return (
    <React.Fragment>
      <Helmet title="Process" />
      <Container fluid className="p-0">
        <Button
          variant="primary"
          className="float-end mt-n1"
          onClick={toggleModalProcess}
        >
          <FontAwesomeIcon icon={faPlus} /> New process
        </Button>
        <Breadcrumb style={{ fontSize: "1.3rem" }}>
          <Breadcrumb.Item active>Process</Breadcrumb.Item>
        </Breadcrumb>
        <ProcessIndex tableColumns={tableColumns} />
      </Container>

      <Modal show={showModalProcess} onHide={toggleModalProcess} centered>
        <Modal.Header closeButton>Create New Process</Modal.Header>
        <Modal.Body className="text-center m-3">
          <Formik
            validationSchema={schemaProcess}
            onSubmit={async (values, { setSubmitting, setErrors }) => {
              // console.log("values", values);
              try {
                setSubmitting(true);
                const result = await storeProcess(values);
                if (result.success === true) {
                  console.log("Process saved successfully");
                  toggleModalProcess();
                  navigate(`/process-builder/edit/${result.data.id}`);
                } else if (result.name && result.name.length > 0) {
                  setErrors({ name: result.name[0] }); // Set the error for the name field
                } else {
                  console.error("Error saving process:", result);
                }
              } catch (error) {
                console.error("Unexpected error:", error);
                setErrors({ name: error.name[0] });
              } finally {
                setSubmitting(false); // Reset form submitting state
              }
            }}
            initialValues={{
              name: "",
              short_name: "",
            }}
          >
            {({
              handleSubmit,
              handleChange,
              handleBlur,
              values,
              touched,
              isValid,
              errors,
            }) => (
              <Form noValidate onSubmit={handleSubmit}>
                <Form.Group as={Row} className="mb-3">
                  <Form.Label column sm={2} className="text-sm-right">
                    Name*
                  </Form.Label>
                  <Col sm={10}>
                    <Form.Control
                      type="text"
                      name="name"
                      value={values.name}
                      onChange={handleChange}
                      isValid={touched.name && !errors.name}
                      isInvalid={touched.name && !!errors.name}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.name}
                    </Form.Control.Feedback>
                  </Col>
                </Form.Group>
                <Form.Group as={Row} className="mb-3">
                  <Form.Label column sm={2} className="text-sm-right">
                    Short Name*
                  </Form.Label>
                  <Col sm={10}>
                    <Form.Control
                      type="text"
                      name="short_name"
                      value={values.short_name}
                      onChange={handleChange}
                      isValid={touched.short_name && !errors.short_name}
                      isInvalid={touched.short_name && !!errors.short_name}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.short_name}
                    </Form.Control.Feedback>
                  </Col>
                </Form.Group>
                <Button
                  type="submit"
                  variant="success"
                  className="float-end mt-n1 me-2"
                >
                  Save Process
                </Button>
              </Form>
            )}
          </Formik>
        </Modal.Body>
        {/* <Modal.Footer></Modal.Footer> */}
      </Modal>
    </React.Fragment>
  );
};

export default ProcessIndexPage;
