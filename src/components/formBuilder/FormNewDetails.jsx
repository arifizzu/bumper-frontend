import React, { useEffect, useState } from "react";
import * as Yup from "yup";
import { Formik } from "formik";
import { useNavigate } from "react-router-dom";
import {
  Button,
  Card,
  Container,
  Col,
  Row,
  Form,
  InputGroup,
} from "react-bootstrap";

import { useDispatch, useSelector } from "react-redux";

import {
  createForm,
  storeForm,
} from "../../repositories/api/services/formServices";

import {
  createFormStart,
  createFormSuccess,
  createFormFailure,
} from "../../redux/slices/formSlice";

import { getTables } from "../../repositories/api/services/dbRetrievalServices";

import {
  getTablesStart,
  getTablesSuccess,
  getTablesFailure,
} from "../../redux/slices/dbRetrievalSlice";

const schema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  short_name: Yup.string().required("Short Name is required"),
  table_name: Yup.string(),
});

const FormNewDetails = ({ setFormDetails, setFormIsFilled, formIsFilled }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const formDetailInput = useSelector((state) => state.form.formDetailInput);
  const tableOptions = useSelector((state) => state.dbRetrieval.tableOptions);
  const loading = useSelector((state) => state.form.loading);

  useEffect(() => {
    const fetchForm = async () => {
      try {
        dispatch(createFormStart());
        const form = await createForm();
        // console.log("form", form);
        dispatch(createFormSuccess(form));
      } catch (error) {
        dispatch(createFormFailure(error));
      }
    };

    const fetchTableOptions = async () => {
      try {
        dispatch(getTablesStart());
        const tableOptions = await getTables();
        // console.log("tableOptions", tableOptions);
        dispatch(getTablesSuccess(tableOptions));
      } catch (error) {
        dispatch(getTablesFailure(error));
      }
    };
    fetchForm();
    fetchTableOptions();
  }, [dispatch]);

  const handleEdit = () => {
    setFormIsFilled(false); // Reset formIsFilled to false
    console.log("formIsFilled", formIsFilled);
  };

  return (
    <React.Fragment>
      <Card>
        <Card.Header>
          <Card.Title>Form Details*</Card.Title>
          <Row>
            <h6 className="card-subtitle text-muted mb-3 mt-3">
              Kindly provide the necessary form details.
            </h6>
            <h6 className="card-subtitle text-muted mb-3">
              Ensure all mandatory fields are filled out before proceeding with
              saving.
            </h6>
            <h6 className="card-subtitle text-muted mb-3">
              The Save Button will only be accessible once both sections are
              fully completed.
            </h6>
          </Row>
        </Card.Header>
        <Card.Body>
          <Formik
            validationSchema={schema}
            // onSubmit={(values) => {}}
            onSubmit={(values) => {
              // Handle form submission logic here
              console.log(values); // For example, you can log the form values
              setFormIsFilled(true);
              console.log("formIsFilled", formIsFilled);
            }}
            initialValues={{
              name: (formDetailInput && formDetailInput.name) || "",
              short_name: (formDetailInput && formDetailInput.short_name) || "",
              table_name: (formDetailInput && formDetailInput.table_name) || "",
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
                <Row>
                  {!formIsFilled ? (
                    <>
                      <Form.Group
                        as={Col}
                        md="4"
                        controlId="validationFormik09"
                        className="mb-3"
                      >
                        <Form.Label>Name*</Form.Label>
                        <Form.Control
                          type="text"
                          name="name"
                          value={values.name}
                          //   onChange={handleChange}
                          onChange={(e) => {
                            handleChange(e);
                            setFormDetails((prevFormDetails) => ({
                              ...prevFormDetails,
                              name: e.target.value,
                            }));
                          }}
                          isValid={touched.name && !errors.name}
                          isInvalid={touched.name && !!errors.name}
                        />
                        <Form.Control.Feedback type="invalid">
                          {errors.name}
                        </Form.Control.Feedback>
                      </Form.Group>
                      <Form.Group
                        as={Col}
                        md="4"
                        controlId="validationFormik10"
                        className="mb-3"
                      >
                        <Form.Label>Short Name*</Form.Label>
                        <Form.Control
                          type="text"
                          name="short_name"
                          value={values.short_name}
                          //   onChange={handleChange}
                          onChange={(e) => {
                            handleChange(e);
                            setFormDetails((prevFormDetails) => ({
                              ...prevFormDetails,
                              short_name: e.target.value,
                            }));
                          }}
                          isValid={touched.short_name && !errors.short_name}
                          isInvalid={touched.short_name && !!errors.short_name}
                        />
                        <Form.Control.Feedback type="invalid">
                          {errors.short_name}
                        </Form.Control.Feedback>
                      </Form.Group>
                      <Form.Group
                        as={Col}
                        md="4"
                        controlId="validationFormik11"
                        className="mb-3"
                      >
                        <Form.Label>Database Table (Optional)</Form.Label>
                        <Form.Select
                          name="table_name"
                          //   onChange={handleChange}
                          onChange={(e) => {
                            handleChange(e);
                            setFormDetails((prevFormDetails) => ({
                              ...prevFormDetails,
                              table_name: e.target.value,
                            }));
                          }}
                          value={values.table_name || ""}
                        >
                          <option value="">Not chosen</option>
                          {tableOptions.map((tableName, index) => (
                            <option key={index} value={tableName}>
                              {tableName}
                            </option>
                          ))}
                        </Form.Select>
                      </Form.Group>
                    </>
                  ) : (
                    <>
                      <Form.Group
                        as={Col}
                        md="4"
                        controlId="validationFormik09"
                        className="mb-3"
                      >
                        <Form.Label>Name*</Form.Label>
                        <Form.Control
                          type="text"
                          name="name"
                          value={values.name}
                          //   onChange={handleChange}
                          disabled
                        />
                      </Form.Group>
                      <Form.Group
                        as={Col}
                        md="4"
                        controlId="validationFormik10"
                        className="mb-3"
                      >
                        <Form.Label>Short Name*</Form.Label>
                        <Form.Control
                          type="text"
                          name="short_name"
                          value={values.short_name}
                          disabled
                        />
                      </Form.Group>
                      <Form.Group
                        as={Col}
                        md="4"
                        controlId="validationFormik11"
                        className="mb-3"
                      >
                        <Form.Label>Database Table (Optional)</Form.Label>
                        <Form.Select
                          name="table_name"
                          //   onChange={handleChange}
                          disabled
                          value={values.table_name || ""}
                        >
                          <option value="">Not chosen</option>
                          {tableOptions.map((tableName, index) => (
                            <option key={index} value={tableName}>
                              {tableName}
                            </option>
                          ))}
                        </Form.Select>
                      </Form.Group>
                    </>
                  )}
                </Row>
                <div className="text-end">
                  {!formIsFilled && <Button type="submit">Confirm</Button>}
                  {formIsFilled && (
                    <Button onClick={handleEdit} variant="warning">
                      Edit
                    </Button>
                  )}
                </div>
              </Form>
            )}
          </Formik>
        </Card.Body>
      </Card>
    </React.Fragment>
  );
};

export default FormNewDetails;
