import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { Formik } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import Select from "react-select";

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
  editUser,
  updateUser,
} from "../../repositories/api/services/userServices";

import {
  editUserStart,
  editUserSuccess,
  editUserFailure,
} from "../../redux/slices/userSlice";

import {
  getRolesStart,
  getRolesSuccess,
  getRolesFailure,
} from "../../redux/slices/roleSlice";

import { getRoles } from "../../repositories/api/services/roleServices";

const schema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string()
    .required("Password is required")
    .min(8, "Password must be at least 8 characters"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), null], "Passwords must match")
    .required("Confirm Password is required"),
});

const UserEdit = ({ id }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const form = useSelector((state) => state.user.forms[id]);
  const roles = useSelector((state) => state.role.roles);
  const [selectedRoles, setSelectedRoles] = React.useState([]);

  const mapRoleOptions = (roles) => {
    return roles.map((role) => ({
      value: role.name,
      label: role.name,
    }));
  };

  const roleOptions = mapRoleOptions(roles);

  useEffect(() => {
    const fetchUserForm = async (id) => {
      try {
        dispatch(editUserStart());
        const formData = await editUser(id);
        dispatch(editUserSuccess({ id, formData }));
      } catch (error) {
        dispatch(editUserFailure(error));
      }
    };
    const fetchRoles = async () => {
      try {
        dispatch(getRolesStart());
        const rolesData = await getRoles();
        dispatch(getRolesSuccess(rolesData));
      } catch (error) {
        dispatch(getRolesFailure(error));
      }
    };
    fetchUserForm(id);
    fetchRoles();
  }, [dispatch, id]);

  useEffect(() => {
    if (form && form.roles) {
      setSelectedRoles((prevRoles) => {
        return form.roles.map((role) => ({
          value: role.name,
          label: role.name,
        }));
      });
    }
  }, [form]);

  if (!form) {
    return <div>Loading...</div>;
  }

  return (
    <React.Fragment>
      <Card>
        <Card.Header>
          <Card.Title>Edit User</Card.Title>
          <h6 className="card-subtitle text-muted">Enter user details</h6>
        </Card.Header>
        <Card.Body>
          <Formik
            validationSchema={schema}
            onSubmit={async (values, { setSubmitting, setFieldError }) => {
              try {
                setSubmitting(true);
                const { name, email, password, roles } = values; // Destructure name, email, and password from values
                const result = await updateUser(id, {
                  name,
                  email,
                  password,
                  roles,
                });
                if (result.success === true) {
                  console.log(values); // Handle form submission
                  console.log("User updated successfully");
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
              roles: (form && form.roles) || [],
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
                    controlId="validationFormik12"
                    className="mb-3"
                  >
                    <Form.Label>Name</Form.Label>
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
                    controlId="validationFormik13"
                    className="mb-3"
                  >
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                      type="email"
                      name="email"
                      value={values.email}
                      onChange={handleChange}
                      isValid={touched.email && !errors.email}
                      isInvalid={touched.email && !!errors.email}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.email}
                    </Form.Control.Feedback>
                  </Form.Group>
                </Row>
                <Row>
                  <Form.Group
                    as={Col}
                    md="4"
                    controlId="validationFormik14"
                    className="mb-3"
                  >
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                      type="password"
                      name="password"
                      value={values.password}
                      onChange={handleChange}
                      isValid={touched.password && !errors.password}
                      isInvalid={touched.password && !!errors.password}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.password}
                    </Form.Control.Feedback>
                  </Form.Group>

                  <Form.Group
                    as={Col}
                    md="4"
                    controlId="validationFormik15"
                    className="mb-3"
                  >
                    <Form.Label>Confirm Password</Form.Label>
                    <Form.Control
                      type="password"
                      name="confirmPassword"
                      value={values.confirmPassword}
                      onChange={handleChange}
                      isValid={
                        touched.confirmPassword && !errors.confirmPassword
                      }
                      isInvalid={
                        touched.confirmPassword && !!errors.confirmPassword
                      }
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.confirmPassword}
                    </Form.Control.Feedback>
                  </Form.Group>
                  <Form.Group
                    as={Col}
                    md="4"
                    controlId="validationFormik21"
                    className="mb-3"
                  >
                    <Form.Label>Roles</Form.Label>
                    <Select
                      className="react-select-container"
                      classNamePrefix="react-select"
                      name="roles"
                      value={selectedRoles}
                      onChange={(selectedOptions) => {
                        setSelectedRoles(selectedOptions);
                        handleChange({
                          target: {
                            name: "roles",
                            value: selectedOptions.map(
                              (option) => option.value
                            ),
                          },
                        });
                      }}
                      options={roleOptions}
                      isMulti
                    />
                  </Form.Group>
                </Row>
                <Button type="submit">Save</Button>
              </Form>
            )}
          </Formik>
        </Card.Body>
      </Card>
    </React.Fragment>
  );
};

export default UserEdit;
