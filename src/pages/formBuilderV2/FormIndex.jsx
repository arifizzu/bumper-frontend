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
import {
  faFileCirclePlus,
  faFolderPlus,
} from "@fortawesome/free-solid-svg-icons";

import FormIndex from "../../components/formBuilderV2/FormIndex.jsx";
import { groupTableColumns, formTableColumns } from "./data.js";

import { useDispatch, useSelector } from "react-redux";
import {
  getGroups,
  createGroup,
  storeGroup,
} from "../../repositories/api/services/groupServices";

import {
  getGroupsStart,
  getGroupsSuccess,
  getGroupsFailure,
  createGroupStart,
  createGroupSuccess,
  createGroupFailure,
} from "../../redux/slices/groupSlice";

import {
  createForm,
  storeForm,
} from "../../repositories/api/services/formServices";

import {
  createFormStart,
  createFormSuccess,
  createFormFailure,
} from "../../redux/slices/formSlice";

const schemaGroup = Yup.object().shape({
  name: Yup.string().required("Name is required"),
});

const schemaForm = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  short_name: Yup.string().required("Short Name is required"),
  group_id: Yup.number(),
});

const FormIndexPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [showModalGroup, setShowModalGroup] = useState(false);
  const [showModalForm, setShowModalForm] = useState(false);
  const formGroup = useSelector((state) => state.group.form);
  const formDetail = useSelector((state) => state.form.formDetailInput);
  const { groups } = useSelector((state) => state.group);

  useEffect(() => {
    const fetchGroupForm = async () => {
      try {
        dispatch(createGroupStart());
        const formGroup = await createGroup();
        dispatch(createGroupSuccess(formGroup));
      } catch (error) {
        dispatch(createGroupFailure(error));
      }
    };
    const fetchGroups = async () => {
      try {
        dispatch(getGroupsStart());
        const groupData = await getGroups();
        console.log("groupData", groupData);
        dispatch(getGroupsSuccess(groupData));
      } catch (error) {
        dispatch(getGroupsFailure(error));
      }
    };

    console.log("groups", groups);
    fetchGroupForm();
    fetchGroups();
  }, []);

  const toggleModalGroup = () => {
    setShowModalGroup((prevShowModalGroup) => !prevShowModalGroup);
  };

  const toggleModalForm = () => {
    setShowModalForm((prevShowModalForm) => !prevShowModalForm);
  };

  return (
    <React.Fragment>
      <Modal show={showModalGroup} onHide={toggleModalGroup} centered>
        <Modal.Header closeButton>Create New Group</Modal.Header>
        <Modal.Body className="text-center m-3">
          <Formik
            validationSchema={schemaGroup}
            onSubmit={async (values, { setSubmitting, setErrors }) => {
              try {
                setSubmitting(true);
                const result = await storeGroup(values);
                if (result.success === true) {
                  console.log("Group saved successfully");
                  window.location.reload();
                  toggleModalGroup();
                } else if (result.name && result.name.length > 0) {
                  setErrors({ name: result.name[0] }); // Set the error for the name field
                } else {
                  console.error("Error saving group:", result);
                }
              } catch (error) {
                console.error("Unexpected error:", error);
                setErrors({ name: error.name[0] });
              } finally {
                setSubmitting(false); // Reset form submitting state
              }
            }}
            initialValues={{
              name: (formGroup && formGroup.name) || "",
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
                <Button
                  type="submit"
                  variant="success"
                  className="float-end mt-n1 me-2"
                >
                  Save Group
                </Button>
              </Form>
            )}
          </Formik>
        </Modal.Body>
        {/* <Modal.Footer></Modal.Footer> */}
      </Modal>

      <Modal show={showModalForm} onHide={toggleModalForm} centered>
        <Modal.Header closeButton>Create New Form</Modal.Header>
        <Modal.Body className="text-center m-3">
          <Formik
            validationSchema={schemaForm}
            // onSubmit={console.log}
            onSubmit={async (values, { setSubmitting, setErrors }) => {
              try {
                setSubmitting(true);
                const result = await storeForm(values);
                if (result.success === true) {
                  console.log("Form saved successfully");
                  // window.location.reload();
                  toggleModalForm();
                  navigate(`/form-builder-v2/edit/${result.data.id}`);
                } else if (result.name && result.name.length > 0) {
                  setErrors({ name: result.name[0] }); // Set the error for the name field
                } else {
                  console.error("Error saving form:", result);
                }
              } catch (error) {
                console.error("Unexpected error:", error);
                setErrors({ name: error.name[0] });
              } finally {
                setSubmitting(false); // Reset form submitting state
              }
            }}
            initialValues={{
              name: (formDetail && formDetail.name) || "",
              short_name: (formDetail && formDetail.short_name) || "",
              group_id: (formDetail && formDetail.group_id) || "",
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
                  <Form.Label column sm={3} className="text-sm-right">
                    Name*
                  </Form.Label>
                  <Col sm={9}>
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
                  <Form.Label column sm={3} className="text-sm-right">
                    Short Name*
                  </Form.Label>
                  <Col sm={9}>
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
                <Form.Group as={Row} className="mb-3">
                  <Form.Label column sm={3} className="text-sm-right">
                    Group
                  </Form.Label>
                  <Col sm={9}>
                    <Form.Select
                      name="group_id"
                      onChange={(e) => {
                        handleChange(e);
                      }}
                      value={values.group_id || ""}
                    >
                      <option value="">No Group</option>
                      {groups.map((group) => (
                        <option key={group.id} value={group.id}>
                          {group.name}
                        </option>
                      ))}
                    </Form.Select>
                  </Col>
                </Form.Group>
                <Button
                  type="submit"
                  variant="success"
                  className="float-end mt-n1 me-2"
                >
                  Save Form
                </Button>
              </Form>
            )}
          </Formik>
        </Modal.Body>
        {/* <Modal.Footer></Modal.Footer> */}
      </Modal>

      <Helmet title="Form" />
      <Container fluid className="p-0">
        <Button
          variant="primary"
          className="float-end mt-n1 me-2"
          onClick={toggleModalForm}
        >
          <FontAwesomeIcon icon={faFileCirclePlus} /> New Form
        </Button>
        <Button
          variant="primary"
          className="float-end mt-n1 me-2"
          onClick={toggleModalGroup}
        >
          <FontAwesomeIcon icon={faFolderPlus} /> New Group
        </Button>
        <Breadcrumb style={{ fontSize: "1.3rem" }}>
          <Breadcrumb.Item active>Form</Breadcrumb.Item>
        </Breadcrumb>
        <FormIndex
          formTableColumns={formTableColumns}
          groupTableColumns={groupTableColumns}
        />
      </Container>
    </React.Fragment>
  );
};

export default FormIndexPage;
