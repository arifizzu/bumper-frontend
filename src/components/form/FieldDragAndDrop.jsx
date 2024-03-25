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

import {
  getColumns,
  getLatestId,
} from "../../repositories/api/services/dbRetrievalServices";

import {
  getColumnsStart,
  getColumnsSuccess,
  getColumnsFailure,
  getLatestIdStart,
  getLatestIdSuccess,
  getLatestIdFailure,
} from "../../redux/slices/dbRetrievalSlice";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAnglesLeft,
  faX,
  faWindowMinimize,
} from "@fortawesome/free-solid-svg-icons";

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
  fieldLayout,
  setFieldLayout,
  fieldDetails,
  setFieldDetails,
  fieldIsFilled,
  setFieldIsFilled,
}) => {
  const fieldType = useSelector((state) => state.field.fieldType);
  const formLatestId = useSelector((state) => state.dbRetrieval.latestId);

  //   console.log("fieldType dalam tabswithfieldtypes", fieldType);

  const handleDragStart = (e, field) => {
    e.dataTransfer.setData("field", JSON.stringify(field));
  };

  useEffect(() => {
    console.log(
      "formLatestId updated in FieldDragAndDrop child:",
      formLatestId
    );
  }, [formLatestId]);

  useEffect(() => {
    console.log("fieldLayout updated in FieldDragAndDrop child:", fieldLayout);
  }, [fieldLayout]);

  const generateInitialValues = (fieldLayout) => {
    const initialValues = {};
    if (Array.isArray(fieldLayout) && fieldLayout.length > 0) {
      fieldLayout.forEach((field, index) => {
        initialValues[`caption-${index}`] =
          (field && field.detail.caption) || "";
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
              // onSubmit={(values) => {}}
              onSubmit={(values) => {
                console.log(values);
                // setFieldIsFilled(true);
                // console.log("fieldIsFilled", fieldIsFilled);
              }}
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
                              controlId={`is_required-${index}`}
                              className="mb-3"
                            >
                              <FloatingLabel
                                label="Is Required*"
                                style={{ color: "grey" }}
                              >
                                <Form.Select
                                  aria-label="Floating label select example"
                                  name={`is_required-${index}`}
                                  value={values[`is_required-${index}`]}
                                  // onChange={(e) => handleChange(e)}
                                  onChange={(e) => {
                                    const newValue = e.target.value === "1"; // Convert "1" to true, and "0" to false
                                    handleChange({
                                      target: {
                                        name: e.target.name,
                                        value: newValue,
                                      },
                                    });
                                  }}
                                >
                                  <option value="0">No</option>
                                  <option value="1">Yes</option>
                                </Form.Select>
                              </FloatingLabel>
                            </Form.Group>

                            <Form.Group
                              as={Col}
                              controlId={`column_name-${index}`}
                              className="mb-3"
                            >
                              <FloatingLabel
                                label="Database Column (Optional)"
                                style={{ color: "grey" }}
                              >
                                <Form.Select
                                  aria-label="Floating label select example"
                                  name={`column_name-${index}`}
                                  value={values[`column_name-${index}`]}
                                  onChange={(e) => handleChange(e)}
                                >
                                  <option value="">Not chosen</option>
                                  {columnOptions !== null ? (
                                    columnOptions.map((columnName, index) => (
                                      <option key={index} value={columnName}>
                                        {columnName}
                                      </option>
                                    ))
                                  ) : (
                                    <option value="" disabled>
                                      You need to choose Database Table first...
                                    </option>
                                  )}
                                </Form.Select>
                              </FloatingLabel>
                            </Form.Group>

                            {/* <Row>
                              <Form.Group
                                as={Col}
                                md="6"
                                controlId={`width-${index}`}
                                className="mb-3"
                              >
                                <FloatingLabel
                                  label="Width*"
                                  className="mb-3"
                                  style={{ color: "grey" }}
                                >
                                  <Form.Control
                                    type="number"
                                    name={`width-${index}`}
                                    value={values[`width-${index}`]}
                                    onChange={(e) => handleChange(e)}
                                    isValid={
                                      touched[`width-${index}`] &&
                                      !errors[`width-${index}`]
                                    }
                                    isInvalid={
                                      touched[`width-${index}`] &&
                                      !!errors[`width-${index}`]
                                    }
                                    placeholder=""
                                    min={3}
                                  />
                                </FloatingLabel>
                              </Form.Group>

                              <Form.Group
                                as={Col}
                                md="6"
                                controlId={`height-${index}`}
                                className="mb-3"
                              >
                                <FloatingLabel
                                  label="Height*"
                                  className="mb-3"
                                  style={{ color: "grey" }}
                                >
                                  <Form.Control
                                    type="number"
                                    name={`height-${index}`}
                                    value={values[`height-${index}`]}
                                    onChange={(e) => handleChange(e)}
                                    isValid={
                                      touched[`height-${index}`] &&
                                      !errors[`height-${index}`]
                                    }
                                    isInvalid={
                                      touched[`height-${index}`] &&
                                      !!errors[`height-${index}`]
                                    }
                                    placeholder=""
                                    min={3}
                                  />
                                </FloatingLabel>
                              </Form.Group>
                            </Row>

                            <Row>
                              <Form.Group
                                as={Col}
                                md="6"
                                controlId={`x_coordinate-${index}`}
                                className="mb-3"
                              >
                                <FloatingLabel
                                  label="X-coordinate*"
                                  className="mb-3"
                                  style={{ color: "grey" }}
                                >
                                  <Form.Control
                                    type="number"
                                    name={`x_coordinate-${index}`}
                                    value={values[`x_coordinate-${index}`]}
                                    onChange={(e) => handleChange(e)}
                                    isValid={
                                      touched[`x_coordinate-${index}`] &&
                                      !errors[`x_coordinate-${index}`]
                                    }
                                    isInvalid={
                                      touched[`x_coordinate-${index}`] &&
                                      !!errors[`x_coordinate-${index}`]
                                    }
                                    placeholder=""
                                    min={0}
                                  />
                                </FloatingLabel>
                              </Form.Group>

                              <Form.Group
                                as={Col}
                                md="6"
                                controlId={`y_coordinate-${index}`}
                                className="mb-3"
                              >
                                <FloatingLabel
                                  label="Y-coordinate*"
                                  className="mb-3"
                                  style={{ color: "grey" }}
                                >
                                  <Form.Control
                                    type="number"
                                    name={`y_coordinate-${index}`}
                                    value={values[`y_coordinate-${index}`]}
                                    onChange={(e) => handleChange(e)}
                                    isValid={
                                      touched[`y_coordinate-${index}`] &&
                                      !errors[`y_coordinate-${index}`]
                                    }
                                    isInvalid={
                                      touched[`y_coordinate-${index}`] &&
                                      !!errors[`y_coordinate-${index}`]
                                    }
                                    placeholder=""
                                    min={0}
                                  />
                                </FloatingLabel>
                              </Form.Group>
                            </Row> */}
                            <div className="text-end">
                              <Button
                                type="submit"
                                variant="primary"
                                // onClick={() =>
                                //   console.log("values from save button", values)
                                // }
                                onClick={() => {
                                  setFieldIsFilled(true);
                                  const arrayValues = fieldLayout.map(
                                    (field, index) => ({
                                      caption: values[`caption-${index}`] || "",
                                      is_required:
                                        values[`is_required-${index}`] || false,
                                      column_name:
                                        values[`column_name-${index}`] ||
                                        "none",
                                      // height: values[`height-${index}`] || 3,
                                      // width: values[`width-${index}`] || 3,
                                      // x_coordinate:
                                      //   values[`x_coordinate-${index}`] || 0,
                                      // y_coordinate:
                                      //   values[`y_coordinate-${index}`] || 0,
                                      height: field.layout.h || 3,
                                      width: field.layout.w || 3,
                                      x_coordinate: field.layout.x || 0,
                                      y_coordinate: field.layout.y || 0,
                                      type_id: field.detail.type_id,
                                      form_id: formLatestId + 1,
                                    })
                                  );
                                  setFieldDetails(arrayValues);
                                  console.log(
                                    "values from save button",
                                    values
                                  );
                                  console.log(
                                    "arrayValues from save button",
                                    arrayValues
                                  );
                                  console.log(
                                    "fieldDetails from save button",
                                    fieldDetails
                                  );
                                }}
                              >
                                Save
                              </Button>
                            </div>
                          </Accordion.Body>
                        </Accordion.Item>
                      ))}
                    </Accordion>
                  ) : (
                    <div>Drag and Drop field first</div>
                  )}
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
  fieldLayout,
  setFieldLayout,
  fieldDetails,
  setFieldDetails,
  fieldIsFilled,
  setFieldIsFilled,
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

  useEffect(() => {
    const formTableName = { tableName: "forms" };
    const fetchLatestId = async () => {
      try {
        dispatch(getLatestIdStart());
        const latestId = await getLatestId(formTableName);
        console.log("latestId", latestId);
        dispatch(getLatestIdSuccess(latestId));
      } catch (error) {
        dispatch(getLatestIdFailure(error));
      }
    };
    fetchLatestId();
  }, []);

  return (
    <React.Fragment>
      <Card>
        <Card.Header>
          <Card.Title>
            Fields Type
            <Button
              variant="primary"
              className="float-end mt-n1"
              onClick={toggleFieldDragAndDrop}
            >
              <FontAwesomeIcon icon={faWindowMinimize} />
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
            fieldLayout={fieldLayout}
            setFieldLayout={setFieldLayout}
            fieldDetails={fieldDetails}
            setFieldDetails={setFieldDetails}
            fieldIsFilled={fieldIsFilled}
            setFieldIsFilled={setFieldIsFilled}
          />
        </Card.Body>
      </Card>
    </React.Fragment>
  );
};

export default FieldDragAndDrop;
