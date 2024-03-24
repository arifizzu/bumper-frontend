import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Helmet } from "react-helmet-async";
import { Formik } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import {
  FieldTextInput,
  FieldTextarea,
  FieldNumberInput,
  FieldCheckbox,
  FieldRadioButton,
  FieldSwitch,
  FieldDropdown,
  FieldFileUpload,
  FieldDatePicker,
  FieldTimePicker,
  FieldEmailInput,
  FieldPasswordInput,
} from "./field-type/FieldTypeDisabled";

import {
  Button,
  Card,
  Container,
  Col,
  Row,
  Form,
  InputGroup,
  Nav,
  Tab,
  FloatingLabel,
  Accordion,
} from "react-bootstrap";

import { Home, Settings, Table, PenTool } from "react-feather";
import {
  createField,
  storeField,
  editField,
  updateField,
  showAllFieldTypes,
} from "../../repositories/api/services/fieldServices";

import {
  //   getfieldsStart,
  //   getfieldsSuccess,
  //   getfieldsFailure,
  getCreateFieldStart,
  getCreateFieldSuccess,
  getCreateFieldFailure,
  getFieldTypeStart,
  getFieldTypeSuccess,
  getFieldTypeFailure,
  addField,
} from "../../redux/slices/fieldSlice";

import { getColumns } from "../../repositories/api/services/dbRetrievalServices";

import {
  getColumnsStart,
  getColumnsSuccess,
  getColumnsFailure,
} from "../../redux/slices/dbRetrievalSlice";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAnglesLeft, faX } from "@fortawesome/free-solid-svg-icons";

const schema = Yup.object().shape({
  caption: Yup.string().required("Name is required"),
  form_id: Yup.number().required("Form id is required"),
  type_id: Yup.number().required("Type id is required"),
  is_required: Yup.boolean().required("This field is required"),
  column_name: Yup.string(),
  width: Yup.number().required("Width is required"),
  height: Yup.number().required("Height is required"),
  x_coordinate: Yup.number().required("X-coordinate is required"),
  y_coordinate: Yup.number().required("Y-coordinate is required"),
});

const TabsWithFieldTypes = ({
  className,
  field,
  columnOptions,
  formId,
  setFieldDetails,
  fieldLayout,
  setFieldLayout,
}) => {
  const fieldType = useSelector((state) => state.field.fieldType);
  //   console.log("fieldType dalam tabswithfieldtypes", fieldType);

  const handleDragStart = (e, field) => {
    e.dataTransfer.setData("field", JSON.stringify(field));
  };

  useEffect(() => {
    console.log("fieldLayout updated in FieldDragAndDrop child:", fieldLayout);
  }, [fieldLayout]);

  const generateInitialValues = (fieldLayout) => {
    const initialValues = {};
    if (Array.isArray(fieldLayout) && fieldLayout.length > 0) {
      fieldLayout.forEach((field, index) => {
        initialValues[`caption-${index}`] = field.detail.caption || "";
        // Add other initial values here
      });
    }
    return initialValues;
  };

  return (
    <div className={"tab " + className}>
      <Tab.Container id="left-tabs-example" defaultActiveKey="first">
        <Nav variant="tabs">
          <Nav.Item>
            <Nav.Link eventKey="first">
              <Table />
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link eventKey="second">
              <PenTool />
            </Nav.Link>
          </Nav.Item>
        </Nav>
        <Tab.Content>
          <Tab.Pane eventKey="first">
            <h4 className="tab-title">Field Types</h4>
            <div>
              {fieldType.map((field) => (
                <Button
                  key={field.id}
                  className="btn btn-info draggable-field mb-2 w-100"
                  draggable
                  onDragStart={(e) => handleDragStart(e, field)}
                >
                  {field.name}
                  {field.name === "Text Input" && <FieldTextInput />}
                  {field.name === "Textarea" && <FieldTextarea />}
                  {field.name === "Number Input" && <FieldNumberInput />}
                  {field.name === "Checkbox" && <FieldCheckbox />}
                  {field.name === "Radio Button" && <FieldRadioButton />}
                  {field.name === "Switch" && <FieldSwitch />}
                  {field.name === "Dropdown" && <FieldDropdown />}
                  {field.name === "File Upload" && <FieldFileUpload />}
                  {field.name === "Date Picker" && <FieldDatePicker />}
                  {field.name === "Time Picker" && <FieldTimePicker />}
                  {field.name === "Email Input" && <FieldEmailInput />}
                  {field.name === "Password Input" && <FieldPasswordInput />}
                </Button>
              ))}
            </div>
          </Tab.Pane>

          <Tab.Pane eventKey="second">
            <h4 className="tab-title">Field Details</h4>
            <Formik
              validationSchema={schema}
              onSubmit={(values) => {}}
              initialValues={generateInitialValues(fieldLayout)}
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
                <Form onSubmit={handleSubmit}>
                  {Array.isArray(fieldLayout) && fieldLayout.length > 0 ? (
                    <Accordion>
                      {fieldLayout.map((field, index) => (
                        <Accordion.Item
                          key={index}
                          eventKey={index.toString()}
                          className="bg-white"
                        >
                          <Accordion.Header>
                            {field.name} - {index + 1}
                          </Accordion.Header>
                          <Accordion.Body>
                            <Form.Group
                              as={Col}
                              controlId={`caption-${index}`}
                              className="mb-3"
                            >
                              <FloatingLabel
                                label="Caption*"
                                className="mb-3"
                                style={{ color: "grey" }}
                              >
                                <Form.Control
                                  type="text"
                                  name={`caption-${index}`}
                                  value={values[`caption-${index}`]}
                                  onChange={(e) => handleChange(e)}
                                  isValid={
                                    touched[`caption-${index}`] &&
                                    !errors[`caption-${index}`]
                                  }
                                  isInvalid={
                                    touched[`caption-${index}`] &&
                                    !!errors[`caption-${index}`]
                                  }
                                  placeholder=""
                                />
                              </FloatingLabel>
                            </Form.Group>

                            <Form.Group
                              as={Col}
                              controlId={`type_id-${index}`}
                              className="mb-3"
                            >
                              <FloatingLabel
                                label="Field Type (view-only)"
                                style={{ color: "grey" }}
                              >
                                <Form.Control
                                  readOnly
                                  type="number"
                                  name={`type_id-${index}`}
                                  value={field.detail.type_id}
                                />
                              </FloatingLabel>
                            </Form.Group>
                          </Accordion.Body>
                        </Accordion.Item>
                      ))}
                    </Accordion>
                  ) : (
                    <div>Drag and Drop field first</div>
                  )}
                  <Button
                    type="submit"
                    variant="primary"
                    // onClick={() =>
                    //   console.log("values from save button", values)
                    // }
                    onClick={() => {
                      const arrayValues = fieldLayout.map((field, index) => ({
                        caption: values[`caption-${index}`],
                        type_id: values[`type_id-${index}`],
                      }));
                      console.log("values from save button", values);
                      console.log("values from save button", arrayValues);
                    }}
                  >
                    Save
                  </Button>
                </Form>
              )}
            </Formik>
          </Tab.Pane>
        </Tab.Content>
      </Tab.Container>
    </div>
  );
};

const FieldDragAndDrop = ({
  toggleFieldDragAndDrop,
  formDetails,
  tableData,
  formId,
  setFieldDetails,
  fieldLayout,
  setFieldLayout,
}) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const field = useSelector((state) => state.field.field);
  const columnOptions = useSelector((state) => state.dbRetrieval.columnOptions);
  const { tableName } = tableData;

  //   console.log("{ tableName } dalam field drag and drop:", { tableName });
  //   console.log("tableData dalam field drag and drop:", tableData);
  //   console.log("formDetails dalam field drag and drop:", formDetails);
  //   console.log("columnOptions dalam field drag and drop:", columnOptions);
  //   console.log("formId dalam field drag and drop:", formId);

  useEffect(() => {
    const fetchField = async () => {
      try {
        dispatch(getCreateFieldStart());
        const field = await createField();
        dispatch(getCreateFieldSuccess(field));
      } catch (error) {
        dispatch(getCreateFieldFailure(error));
      }
    };

    const fetchColumnOptions = async () => {
      try {
        dispatch(getColumnsStart());
        const columnOptions = await getColumns(tableName);
        // console.log("columnOptions", columnOptions);
        dispatch(getColumnsSuccess(columnOptions));
      } catch (error) {
        dispatch(getColumnsFailure(error));
      }
    };

    const fetchFieldType = async () => {
      try {
        dispatch(getFieldTypeStart());
        const fieldType = await showAllFieldTypes();
        // console.log("fieldType", fieldType);
        dispatch(getFieldTypeSuccess(fieldType));
      } catch (error) {
        dispatch(getFieldTypeFailure(error));
      }
    };

    fetchField();
    fetchFieldType();
    dispatch(getColumnsSuccess(null));
    if (tableName) {
      fetchColumnOptions();
    }
  }, [dispatch, formDetails]);

  return (
    <React.Fragment>
      <Card>
        <Card.Header>
          <Card.Title>
            Fields Type
            <Button
              variant="danger"
              className="float-end mt-n1"
              onClick={toggleFieldDragAndDrop}
            >
              <FontAwesomeIcon icon={faX} />
            </Button>
          </Card.Title>

          <h6 className="card-subtitle text-muted">
            You can drag and drop Field Types into the Form Layout
          </h6>
        </Card.Header>
        <Card.Body>
          <TabsWithFieldTypes
            className="tab-vertical tab-secondary"
            field={field}
            columnOptions={columnOptions}
            formId={formId}
            setFieldDetails={setFieldDetails}
            fieldLayout={fieldLayout}
            setFieldLayout={setFieldLayout}
          />
        </Card.Body>
      </Card>
    </React.Fragment>
  );
};

export default FieldDragAndDrop;