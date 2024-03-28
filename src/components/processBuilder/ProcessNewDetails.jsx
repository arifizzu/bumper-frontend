import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { Formik } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

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
  createProcess,
  storeProcess,
} from "../../repositories/api/services/processServices";

import {
  createUser,
  storeUser,
} from "../../repositories/api/services/userServices";

import {
  createUserStart,
  createUserSuccess,
  createUserFailure,
} from "../../redux/slices/userSlice";

const schema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  short_name: Yup.string().required("Short name is required"),
});

const ProcessNewDetails = ({}) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const form = useSelector((state) => state.user.form);

  useEffect(() => {
    const fetchUserForm = async () => {
      try {
        dispatch(createUserStart());
        const form = await createUser();
        dispatch(createUserSuccess(form));
      } catch (error) {
        dispatch(createUserFailure(error));
      }
    };
    fetchUserForm();
  }, []);

  return (
    <React.Fragment>
      <Card>
        <Card.Header>
          <Card.Title>Create New Process</Card.Title>
          <h6 className="card-subtitle text-muted">Enter process details</h6>
        </Card.Header>
        <Card.Body>
          <Formik
            validationSchema={schema}
            onSubmit={async (values, { setSubmitting, setFieldError }) => {
              try {
                setSubmitting(true);
                const { name, email, password } = values; // Destructure name, email, and password from values
                const result = await storeUser({ name, email, password });
                if (result.success === true) {
                  console.log(values); // Handle form submission
                  console.log("User saved successfully");
                  navigate("/users");
                } else {
                  console.error("Error saving user:", result);
                  if (Array.isArray(result.error.email)) {
                    const errorMessage = result.error.email[0];
                    setFieldError("email", errorMessage);
                  }
                }
              } catch (error) {
                console.error("Unexpected error:", error);
                if (error && error.email && Array.isArray(error.email)) {
                  const errorMessage = error.email[0];
                  setFieldError("email", errorMessage);
                } else {
                  console.error("Unexpected error format:", error);
                }
              } finally {
                setSubmitting(false); // Reset form submitting state
              }
            }}
            initialValues={{
              name: (form && form.name) || "",
              email: (form && form.email) || "",
              password: "",
              confirmPassword: "",
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
                  <Form.Group
                    as={Col}
                    md="6"
                    controlId="validationFormik16"
                    className="mb-3"
                  >
                    <Form.Label>Name*</Form.Label>
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
                  </Form.Group>
                  <Form.Group
                    as={Col}
                    md="6"
                    controlId="validationFormik16"
                    className="mb-3"
                  >
                    <Form.Label>Short Name*</Form.Label>
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
                  </Form.Group>
                </Row>
                <div className="text-end">
                  <Button type="submit">Save</Button>
                </div>
              </Form>
            )}
          </Formik>
        </Card.Body>
      </Card>
    </React.Fragment>
  );
};

export default ProcessNewDetails;
