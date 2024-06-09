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
  createRole,
  storeRole,
} from "../../repositories/api/services/roleServices";

import {
  createRoleStart,
  createRoleSuccess,
  createRoleFailure,
} from "../../redux/slices/roleSlice";

import {
  getPermissionsStart,
  getPermissionsSuccess,
  getPermissionsFailure,
} from "../../redux/slices/permissionSlice";

import { getPermissions } from "../../repositories/api/services/permissionServices";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSave } from "@fortawesome/free-solid-svg-icons";

const schema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  guard_name: Yup.string().required("Guard name is required"),
});

const RolePermissionNew = ({}) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const form = useSelector((state) => state.role.form);
  const permissions = useSelector((state) => state.permission.permissions);
  const [selectedPermissions, setSelectedPermissions] = useState([]);

  useEffect(() => {
    const fetchRoleForm = async () => {
      try {
        dispatch(createRoleStart());
        const form = await createRole();
        dispatch(createRoleSuccess(form));
        // console.log("form from rolepermissionnew", form);
      } catch (error) {
        dispatch(createRoleFailure(error));
      }
    };

    const fetchPermissions = async () => {
      try {
        dispatch(getPermissionsStart());
        const permissionList = await getPermissions();
        dispatch(getPermissionsSuccess(permissionList));
        // console.log("permissionList", permissionList);
      } catch (error) {
        dispatch(getPermissionsFailure(error));
      }
    };
    fetchRoleForm();
    fetchPermissions();
  }, []);

  // const handleButtonClick = () => {
  //   console.log(selectedPermissions);
  // };

  const handleCheckboxChange = (event) => {
    const { name, checked } = event.target;
    if (checked) {
      setSelectedPermissions((prevPermissions) => [...prevPermissions, name]);
    } else {
      setSelectedPermissions((prevPermissions) =>
        prevPermissions.filter((permission) => permission !== name)
      );
    }
  };

  const handleSelectAllButtonClick = (sectionName) => {
    const checkboxes = document.querySelectorAll(
      `input[name*="${sectionName}"]`
    );
    const allChecked = Array.from(checkboxes).every(
      (checkbox) => checkbox.checked
    );
    checkboxes.forEach((checkbox) => {
      // checkbox.checked = true;
      checkbox.checked = !allChecked;
      handleCheckboxChange({ target: checkbox });
    });
  };

  const handleFormSubmit = async (values) => {
    const updatedValues = { ...values, permissions: selectedPermissions };
    // console.log("Submitted Values:", updatedValues);
    try {
      const result = await storeRole(updatedValues);
      if (result.success === true) {
        // console.log(updatedValues); // Handle form submission
        // console.log("Role saved successfully");
        navigate("/role-permission");
      } else {
        console.error("Error saving role:", result);
      }
    } catch (error) {
      console.error("Unexpected error:", error);
    }
  };

  const initialPermissionNames = [
    "form",
    // "process",
    "role",
    "permission",
    "user",
    "datalist",
  ];

  const permissionSections = {
    form: ["use", "view", "create", "edit", "delete"],
    // process: ["view", "create", "edit", "delete"],
    role: ["view", "create", "edit", "delete"],
    permission: ["view", "create", "edit", "delete"],
    user: ["view", "create", "edit", "delete"],
    datalist: ["use", "view", "create", "edit", "delete"],
  };

  const generateCheckboxes = (sectionName) => {
    return permissionSections[sectionName].map((permission) => (
      <Col key={`${sectionName}-${permission}`}>
        <Form.Check
          inline
          label={`${permission} ${sectionName}`}
          type="checkbox"
          name={`${permission} ${sectionName}`}
          onChange={handleCheckboxChange}
          checked={selectedPermissions.includes(`${permission} ${sectionName}`)}
        />
      </Col>
    ));
  };

  return (
    <React.Fragment>
      <Row>
        <Col md="12" xl="5">
          <Card>
            <Card.Header>
              <Card.Title>Role</Card.Title>
              <h6 className="card-subtitle text-muted">Enter role details</h6>
            </Card.Header>
            <Card.Body>
              <Formik
                validationSchema={schema}
                onSubmit={handleFormSubmit}
                initialValues={{
                  name: (form && form.name) || "",
                  guard_name: (form && form.guard_name) || "api",
                  permissions: (form && form.permissions) || [],
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
                          onBlur={handleBlur}
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
                        controlId="validationFormik17"
                        className="mb-3"
                      >
                        <Form.Label>Guard Name</Form.Label>
                        <Form.Control
                          type="text"
                          name="guard_name"
                          value={values.guard_name}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          isValid={touched.guard_name && !errors.guard_name}
                          isInvalid={touched.guard_name && !!errors.guard_name}
                          disabled
                        />
                        <Form.Control.Feedback type="invalid">
                          {errors.guard_name}
                        </Form.Control.Feedback>
                      </Form.Group>
                    </Row>
                    <div className="text-end">
                      <Button type="submit" variant="success">
                        <FontAwesomeIcon icon={faSave} /> Save
                      </Button>
                    </div>
                  </Form>
                )}
              </Formik>
            </Card.Body>
          </Card>
        </Col>
        <Col md="12" xl="7">
          <Card>
            <Card.Header>
              <Card.Title>Permissions</Card.Title>
              <h6 className="card-subtitle text-muted">
                Tick the permissions for the role
              </h6>
            </Card.Header>
            <Card.Body>
              <Row>
                <Col>
                  <h6 className="card-subtitle ">Form Builder</h6>
                </Col>
              </Row>
              <Form.Group className="mb-2">
                <Row className="mt-2">
                  <Col>
                    <Form.Check
                      inline
                      label="use form"
                      type="checkbox"
                      name="use form"
                      onChange={handleCheckboxChange}
                    />
                  </Col>
                  <Col>
                    <Form.Check
                      inline
                      label="view form"
                      type="checkbox"
                      name="view form"
                      onChange={handleCheckboxChange}
                    />
                  </Col>
                  <Col>
                    <Form.Check
                      inline
                      label="create form"
                      type="checkbox"
                      name="create form"
                      onChange={handleCheckboxChange}
                    />
                  </Col>
                  <Col>
                    <Form.Check
                      inline
                      label="edit form"
                      type="checkbox"
                      name="edit form"
                      onChange={handleCheckboxChange}
                    />
                  </Col>
                  <Col>
                    <Form.Check
                      inline
                      label="delete form"
                      type="checkbox"
                      name="delete form"
                      onChange={handleCheckboxChange}
                    />
                  </Col>
                  <Col className="text-end">
                    <Button
                      variant="secondary"
                      onClick={() => handleSelectAllButtonClick("form")}
                    >
                      Select All
                    </Button>
                  </Col>
                </Row>
              </Form.Group>

              <hr></hr>

              <Row>
                <Col>
                  <h6 className="card-subtitle ">Datalist Builder</h6>
                </Col>
              </Row>
              <Form.Group className="mb-2">
                <Row className="mt-2">
                  <Col>
                    <Form.Check
                      inline
                      label="use datalist"
                      type="checkbox"
                      name="use datalist"
                      onChange={handleCheckboxChange}
                    />
                  </Col>
                  <Col>
                    <Form.Check
                      inline
                      label="view datalist"
                      type="checkbox"
                      name="view datalist"
                      onChange={handleCheckboxChange}
                    />
                  </Col>
                  <Col>
                    <Form.Check
                      inline
                      label="create datalist"
                      type="checkbox"
                      name="create datalist"
                      onChange={handleCheckboxChange}
                    />
                  </Col>
                  <Col>
                    <Form.Check
                      inline
                      label="edit datalist"
                      type="checkbox"
                      name="edit datalist"
                      onChange={handleCheckboxChange}
                    />
                  </Col>
                  <Col>
                    <Form.Check
                      inline
                      label="delete datalist"
                      type="checkbox"
                      name="delete datalist"
                      onChange={handleCheckboxChange}
                    />
                  </Col>
                  <Col className="text-end">
                    <Button
                      variant="secondary"
                      onClick={() => handleSelectAllButtonClick("datalist")}
                    >
                      Select All
                    </Button>
                  </Col>
                </Row>
              </Form.Group>

              <hr></hr>

              {/* <Row>
                <Col>
                  <h6 className="card-subtitle ">Process Builder</h6>
                </Col>
              </Row>
              <Form.Group className="mb-2">
                <Row className="mt-2">
                  <Col>
                    <Form.Check
                      inline
                      label="view process"
                      type="checkbox"
                      name="view process"
                      onChange={handleCheckboxChange}
                    />
                  </Col>
                  <Col>
                    <Form.Check
                      inline
                      label="create process"
                      type="checkbox"
                      name="create process"
                      onChange={handleCheckboxChange}
                    />
                  </Col>
                  <Col>
                    {" "}
                    <Form.Check
                      inline
                      label="edit process"
                      type="checkbox"
                      name="edit process"
                      onChange={handleCheckboxChange}
                    />
                  </Col>
                  <Col>
                    <Form.Check
                      inline
                      label="delete process"
                      type="checkbox"
                      name="delete process"
                      onChange={handleCheckboxChange}
                    />
                  </Col>
                  <Col className="text-end">
                    <Button
                      variant="secondary"
                      onClick={() => handleSelectAllButtonClick("process")}
                    >
                      Select All
                    </Button>
                  </Col>
                </Row>
              </Form.Group>

              <hr></hr> */}

              <Row>
                <Col>
                  <h6 className="card-subtitle">Management Settings</h6>
                </Col>
              </Row>
              <Form.Group className="mb-2">
                <Row className="mt-2">
                  <Col>
                    <Form.Check
                      inline
                      label="view role"
                      type="checkbox"
                      name="view role"
                      onChange={handleCheckboxChange}
                    />
                  </Col>
                  <Col>
                    <Form.Check
                      inline
                      label="create role"
                      type="checkbox"
                      name="create role"
                      onChange={handleCheckboxChange}
                    />
                  </Col>
                  <Col>
                    <Form.Check
                      inline
                      label="edit role"
                      type="checkbox"
                      name="edit role"
                      onChange={handleCheckboxChange}
                    />
                  </Col>
                  <Col>
                    <Form.Check
                      inline
                      label="delete role"
                      type="checkbox"
                      name="delete role"
                      onChange={handleCheckboxChange}
                    />
                  </Col>
                  <Col className="text-end">
                    <Button
                      variant="secondary"
                      onClick={() => handleSelectAllButtonClick("role")}
                    >
                      Select All
                    </Button>
                  </Col>
                </Row>
                <Row className="mt-2">
                  <Col>
                    <Form.Check
                      inline
                      label="view permission"
                      type="checkbox"
                      name="view permission"
                      onChange={handleCheckboxChange}
                    />
                  </Col>
                  <Col>
                    <Form.Check
                      inline
                      label="create permission"
                      type="checkbox"
                      name="create permission"
                      onChange={handleCheckboxChange}
                    />
                  </Col>
                  <Col>
                    <Form.Check
                      inline
                      label="edit permission"
                      type="checkbox"
                      name="edit permission"
                      onChange={handleCheckboxChange}
                    />
                  </Col>
                  <Col>
                    <Form.Check
                      inline
                      label="delete permission"
                      type="checkbox"
                      name="delete permission"
                      onChange={handleCheckboxChange}
                    />
                  </Col>
                  <Col className="text-end">
                    <Button
                      variant="secondary"
                      onClick={() => handleSelectAllButtonClick("permission")}
                    >
                      Select All
                    </Button>
                  </Col>
                </Row>
                <Row className="mt-2">
                  <Col>
                    <Form.Check
                      inline
                      label="view user"
                      type="checkbox"
                      name="view user"
                      onChange={handleCheckboxChange}
                    />
                  </Col>
                  <Col>
                    <Form.Check
                      inline
                      label="create user"
                      type="checkbox"
                      name="create user"
                      onChange={handleCheckboxChange}
                    />
                  </Col>
                  <Col>
                    <Form.Check
                      inline
                      label="edit user"
                      type="checkbox"
                      name="edit user"
                      onChange={handleCheckboxChange}
                    />
                  </Col>
                  <Col>
                    <Form.Check
                      inline
                      label="delete user"
                      type="checkbox"
                      name="delete user"
                      onChange={handleCheckboxChange}
                    />
                  </Col>
                  <Col className="text-end">
                    <Button
                      variant="secondary"
                      onClick={() => handleSelectAllButtonClick("user")}
                    >
                      Select All
                    </Button>
                  </Col>
                </Row>
              </Form.Group>

              <hr></hr>
              {/* <Button variant="primary" onClick={handleButtonClick}>
                  Submit
                </Button> */}
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </React.Fragment>
  );
};

export default RolePermissionNew;
