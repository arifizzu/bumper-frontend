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

import DatalistIndex from "../../components/datalistBuilder/DatalistIndex.jsx";
import { datalistTableColumns } from "./data.js";

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
  createDatalist,
  storeDatalist,
} from "../../repositories/api/services/datalistServices";

import {
  createDatalistStart,
  createDatalistSuccess,
  createDatalistFailure,
} from "../../redux/slices/datalistSlice";

import { getForms } from "../../repositories/api/services/formServices";

import {
  getFormsStart,
  getFormsSuccess,
  getFormsFailure,
} from "../../redux/slices/formSlice";

const schemaGroup = Yup.object().shape({
  name: Yup.string().required("Name is required"),
});

const schemaDatalist = Yup.object().shape({
  title: Yup.string().required("Title is required"),
  description: Yup.string().required("Description is required"),
  form_id: Yup.number(),
  group_id: Yup.number(),
});

const DatalistIndexPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [showModalGroup, setShowModalGroup] = useState(false);
  const [showModalDatalist, setShowModalDatalist] = useState(false);
  const formGroup = useSelector((state) => state.group.form);
  const formDatalist = useSelector((state) => state.datalist.formDatalist);
  const { groups } = useSelector((state) => state.group);
  const formOptions = useSelector((state) => state.form.forms);

  const permissions = JSON.parse(localStorage.getItem("permissions"));

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

    const fetchFormOptions = async () => {
      try {
        dispatch(getFormsStart());
        const formOptions = await getForms();
        console.log("formOptions", formOptions);
        dispatch(getFormsSuccess(formOptions));
      } catch (error) {
        dispatch(getFormsFailure(error));
      }
    };

    const fetchDatalistForm = async () => {
      try {
        dispatch(createDatalistStart());
        const formDatalist = await createDatalist();
        dispatch(createDatalistSuccess(formDatalist));
      } catch (error) {
        dispatch(createDatalistFailure(error));
      }
    };

    console.log("groups", groups);
    fetchGroupForm();
    fetchGroups();
    fetchDatalistForm();
    fetchFormOptions();
  }, []);

  const toggleModalGroup = () => {
    setShowModalGroup((prevShowModalGroup) => !prevShowModalGroup);
  };

  const toggleModalDatalist = () => {
    setShowModalDatalist((prevShowModalDatalist) => !prevShowModalDatalist);
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

      <Modal show={showModalDatalist} onHide={toggleModalDatalist} centered>
        <Modal.Header closeButton>Create New Datalist</Modal.Header>
        <Modal.Body className="text-center m-3">
          <Formik
            validationSchema={schemaDatalist}
            // onSubmit={console.log}
            onSubmit={async (values, { setSubmitting, setErrors }) => {
              try {
                setSubmitting(true);
                const result = await storeDatalist(values);
                if (result.success === true) {
                  console.log("Datalist saved successfully");
                  // window.location.reload();
                  toggleModalDatalist();
                  navigate(`/datalist-builder/edit/${result.data.id}`);
                } else if (result.name && result.name.length > 0) {
                  setErrors({ name: result.name[0] }); // Set the error for the name field
                } else {
                  console.error("Error saving datalist:", result);
                }
              } catch (error) {
                console.error("Unexpected error:", error);
                setErrors({ name: error.name[0] });
              } finally {
                setSubmitting(false); // Reset form submitting state
              }
            }}
            initialValues={{
              title: (formDatalist && formDatalist.title) || "",
              description: (formDatalist && formDatalist.description) || "",
              group_id: (formDatalist && formDatalist.group_id) || "",
              form_id: (formDatalist && formDatalist.form_id) || "",
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
                    Title*
                  </Form.Label>
                  <Col sm={9}>
                    <Form.Control
                      type="text"
                      name="title"
                      value={values.title}
                      onChange={handleChange}
                      isValid={touched.title && !errors.title}
                      isInvalid={touched.title && !!errors.title}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.title}
                    </Form.Control.Feedback>
                  </Col>
                </Form.Group>
                <Form.Group as={Row} className="mb-3">
                  <Form.Label column sm={3} className="text-sm-right">
                    Description*
                  </Form.Label>
                  <Col sm={9}>
                    <Form.Control
                      type="text"
                      name="description"
                      value={values.description}
                      onChange={handleChange}
                      isValid={touched.description && !errors.description}
                      isInvalid={touched.description && !!errors.description}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.description}
                    </Form.Control.Feedback>
                  </Col>
                </Form.Group>
                <Form.Group as={Row} className="mb-3">
                  <Form.Label column sm={3} className="text-sm-right">
                    Form Related
                  </Form.Label>
                  <Col sm={9}>
                    <Form.Select
                      name="form_id"
                      onChange={(e) => {
                        handleChange(e);
                      }}
                      value={values.form_id || ""}
                    >
                      <option value="">No Form Related</option>
                      {formOptions.map((formOption) => (
                        <option key={formOption.id} value={formOption.id}>
                          {formOption.name} ({formOption.short_name})
                        </option>
                      ))}
                    </Form.Select>
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
                  Save Datalist
                </Button>
              </Form>
            )}
          </Formik>
        </Modal.Body>
        {/* <Modal.Footer></Modal.Footer> */}
      </Modal>

      <Helmet title="Form" />
      <Container fluid className="p-0">
        {permissions.includes("create datalist") && (
          <Button
            variant="primary"
            className="float-end mt-n1 me-2"
            onClick={toggleModalDatalist}
          >
            <FontAwesomeIcon icon={faFileCirclePlus} /> New Datalist
          </Button>
        )}
        {permissions.includes("create datalist") && (
          <Button
            variant="primary"
            className="float-end mt-n1 me-2"
            onClick={toggleModalGroup}
          >
            <FontAwesomeIcon icon={faFolderPlus} /> New Group
          </Button>
        )}
        <Breadcrumb style={{ fontSize: "1.3rem" }}>
          <Breadcrumb.Item active>Datalist</Breadcrumb.Item>
        </Breadcrumb>
        <DatalistIndex datalistTableColumns={datalistTableColumns} />
      </Container>
    </React.Fragment>
  );
};

export default DatalistIndexPage;
