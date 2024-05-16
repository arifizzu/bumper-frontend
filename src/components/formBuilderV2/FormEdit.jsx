import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
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
  Nav,
  Tab,
  FloatingLabel,
  Accordion,
  Modal,
} from "react-bootstrap";

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
} from "./fieldType/FieldTypeDisabled";

import { showForm } from "../../repositories/api/services/formServices";
import {
  showFormStart,
  showFormSuccess,
  showFormFailure,
} from "../../redux/slices/formSlice";

import { updateForm } from "../../repositories/api/services/formServices";

import { getGroups } from "../../repositories/api/services/groupServices";

import {
  getGroupsStart,
  getGroupsSuccess,
  getGroupsFailure,
} from "../../redux/slices/groupSlice";

import {
  createField,
  storeField,
  //   editField,
  //   updateField,
  showAllFieldTypes,
} from "../../repositories/api/services/fieldServices";

import {
  // getFieldsStart,
  // getFieldsSuccess,
  // getFieldsFailure,
  createFieldStart,
  createFieldSuccess,
  createFieldFailure,
  getFieldTypeStart,
  getFieldTypeSuccess,
  getFieldTypeFailure,
} from "../../redux/slices/fieldSlice";

import {
  getTables,
  getColumns,
  //   getLatestId,
} from "../../repositories/api/services/dbRetrievalServices";

import {
  getTablesStart,
  getTablesSuccess,
  getTablesFailure,
  getColumnsStart,
  getColumnsSuccess,
  getColumnsFailure,
  //   getLatestIdStart,
  //   getLatestIdSuccess,
  //   getLatestIdFailure,
} from "../../redux/slices/dbRetrievalSlice";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAnglesLeft,
  faX,
  faGrip,
  faMagnifyingGlass,
  faEdit,
  faWindowMinimize,
} from "@fortawesome/free-solid-svg-icons";

import { addField, removeField } from "../../redux/slices/fieldSlice";
import _ from "lodash";
import RGL, { WidthProvider } from "react-grid-layout";
import "../../grid-layout/css/styles.css";
import "../../grid-layout/css/example-styles.css";

const ReactGridLayout = WidthProvider(RGL);

const schemaFormDetail = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  short_name: Yup.string().required("Short Name is required"),
  group_id: Yup.number(),
});

const schemaField = Yup.object().shape({
  caption: Yup.string().required("Caption is required"),
  //   form_id: Yup.number().required("Form id is required"),
  //   type_id: Yup.number().required("Type id is required"),
  is_required: Yup.boolean().required("This field is required"),
  table_name: Yup.string(),
  column_name: Yup.string(),
  //   width: Yup.number().required("Width is required"),
  //   height: Yup.number().required("Height is required"),
  //   x_coordinate: Yup.number().required("X-coordinate is required"),
  //   y_coordinate: Yup.number().required("Y-coordinate is required"),
});

const FormEdit = ({ id }) => {
  const dispatch = useDispatch();
  const form = useSelector((state) => state.form.form);
  const [showModalFormDetail, setShowModalFormDetail] = useState(false);
  const { groups } = useSelector((state) => state.group);

  const toggleModalFormDetail = () => {
    setShowModalFormDetail(
      (prevShowModalFormDetail) => !prevShowModalFormDetail
    );
  };

  useEffect(() => {
    const fetchForm = async () => {
      try {
        dispatch(showFormStart());
        const form = await showForm(id);
        console.log("form", form);
        dispatch(showFormSuccess(form));
      } catch (error) {
        dispatch(showFormFailure(error));
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

    fetchForm();
    fetchGroups();
  }, []);

  return (
    <React.Fragment>
      <Container fluid className="p-0">
        <Row>
          <Col md={3}>
            <Card>
              {" "}
              <Card.Header>
                <Card.Title>Fields Details</Card.Title>
                <h6 className="card-subtitle text-muted">
                  You can drag and drop Field Types into the Form Layout
                </h6>
              </Card.Header>
              <Card.Body>
                <FieldList />
              </Card.Body>
            </Card>
          </Col>
          <Col md={9}>
            <Card>
              <Card.Header>
                <Row>
                  <Col>
                    {" "}
                    <Card.Title>Form Detail</Card.Title>
                  </Col>
                  <Col>
                    <Button
                      variant="warning"
                      className="float-end mt-n1 me-2"
                      onClick={toggleModalFormDetail}
                    >
                      <FontAwesomeIcon icon={faEdit} /> Edit Form Detail
                    </Button>
                  </Col>
                </Row>

                <Row>
                  <Col md="6" xl="">
                    <h5>Name: {form ? form.name : "Loading..."}</h5>
                    <h5>Short Name: {form ? form.short_name : "Loading..."}</h5>
                    <h5>
                      Group: {form && form.group ? form.group.name : "No Group"}
                    </h5>
                  </Col>
                  <Col md="6" xl="">
                    <h5>
                      Created By: {form ? form.created_by.name : "Loading..."}
                    </h5>
                    <h5>Created At: {form ? form.created_at : "Loading..."}</h5>
                  </Col>
                </Row>
                <hr></hr>
              </Card.Header>
              <Card.Body className="text-left">
                <h4>Form Layout</h4>
                <FormLayout formId={id} />
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>

      <Modal show={showModalFormDetail} onHide={toggleModalFormDetail} centered>
        <Modal.Header closeButton>Edit Form</Modal.Header>
        <Modal.Body className="text-center m-3">
          <Formik
            validationSchema={schemaFormDetail}
            // onSubmit={console.log}
            onSubmit={async (values, { setSubmitting, setErrors }) => {
              try {
                setSubmitting(true);
                const result = await updateForm(id, values);
                if (result.success === true) {
                  console.log("Form updated successfully");
                  window.location.reload();
                  toggleModalFormDetail();
                } else if (result.name && result.name.length > 0) {
                  setErrors({ name: result.name[0] }); // Set the error for the name field
                } else {
                  console.error("Error update form:", result);
                }
              } catch (error) {
                console.error("Unexpected error:", error);
                setErrors({ name: error.name[0] });
              } finally {
                setSubmitting(false); // Reset form submitting state
              }
            }}
            initialValues={{
              name: (form && form.name) || "",
              short_name: (form && form.short_name) || "",
              group_id: (form && form.group_id) || "",
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
                    Name
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
                    Short Name
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
                  Save Form Detail
                </Button>
              </Form>
            )}
          </Formik>
        </Modal.Body>
      </Modal>
    </React.Fragment>
  );
};

const FieldList = ({}) => {
  const dispatch = useDispatch();
  const fieldType = useSelector((state) => state.field.fieldType);

  const handleDragStart = (e, field) => {
    e.dataTransfer.setData("field", JSON.stringify(field));
  };

  useEffect(() => {
    const fetchFieldType = async () => {
      try {
        dispatch(getFieldTypeStart());
        const fieldType = await showAllFieldTypes();
        console.log("fieldType", fieldType);
        dispatch(getFieldTypeSuccess(fieldType));
      } catch (error) {
        dispatch(getFieldTypeFailure(error));
      }
    };
    fetchFieldType();
  }, []);

  return (
    <React.Fragment>
      <div style={{ maxHeight: "600px", overflowY: "auto" }}>
        {fieldType.map((field) => (
          <Button
            key={field.id}
            className="btn btn-primary draggable-field mt-2 mb-2 w-100"
            draggable
            onDragStart={(e) => handleDragStart(e, field)}
          >
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
    </React.Fragment>
  );
};

const FormLayout = ({ formId }) => {
  const dispatch = useDispatch();
  const [fieldLayout, setFieldLayout] = useState({});
  const fieldListInput = useSelector((state) => state.field.fieldListInput);
  const field = useSelector((state) => state.field.field);
  const tableOptions = useSelector((state) => state.dbRetrieval.tableOptions);
  const columnOptions = useSelector((state) => state.dbRetrieval.columnOptions);
  const [layout, setLayout] = useState([{}]);
  const [layoutLength, setLayoutLength] = useState(0);
  const [showModalField, setShowModalField] = useState(false);
  const [tableNameChosen, setTableNameChosen] = useState("");

  useEffect(() => {
    const fetchField = async () => {
      try {
        dispatch(createFieldStart());
        const field = await createField();
        console.log("field", field);
        dispatch(createFieldSuccess(field));
      } catch (error) {
        dispatch(createFieldSuccess(error));
      }
    };

    const fetchTables = async () => {
      try {
        dispatch(getTablesStart());
        const tableOptions = await getTables();
        console.log("tableOptions", tableOptions);
        dispatch(getTablesSuccess(tableOptions));
      } catch (error) {
        dispatch(getTablesFailure(error));
      }
    };

    fetchField();
    fetchTables();
  }, []);

  const toggleModalField = () => {
    setShowModalField((prevShowModalField) => !prevShowModalField);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    toggleModalField();
    const field = JSON.parse(e.dataTransfer.getData("field"));

    const newLayoutItem = {
      i: field.name + "_" + fieldListInput.length,
      x: 0,
      y: Infinity, // puts it at the bottom
      w: 3,
      h: 3,
      // isBounded: false,
      // isDraggable: false,
    };

    dispatch(addField(field));
    // setLayout([...layout, newLayoutItem]);
    setLayout((prevLayout) => [...prevLayout, newLayoutItem]);
    setLayoutLength(layoutLength + 1);
    console.log("field dropped", field);
  };

  useEffect(() => {
    console.log("fieldListInput updated:", fieldListInput);
  }, [fieldListInput]);

  useEffect(() => {
    console.log("layout updated:", layout);
  }, [layout]);

  useEffect(() => {
    console.log("layoutLength updated:", layoutLength);
  }, [layoutLength]);

  useEffect(() => {
    console.log("fieldLayout updated:", fieldLayout);
  }, [fieldLayout]);

  useEffect(() => {
    if (tableNameChosen !== "") {
      const fetchColumns = async () => {
        try {
          dispatch(getColumnsStart());
          const columnOptions = await getColumns(tableNameChosen);
          console.log("columnOptions", columnOptions);
          dispatch(getColumnsSuccess(columnOptions));
        } catch (error) {
          dispatch(getColumnsFailure(error));
        }
      };

      fetchColumns();
    }
  }, [tableNameChosen]);

  const generateDOM = () => {
    // console.log("generateDom");
    return fieldListInput.map((fieldType, index) => (
      <div
        key={index}
        className="draggable-field"
        style={{ maxWidth: "100%", overflow: "hidden" }}
      >
        <div style={{ display: "flex", marginLeft: "3px" }}>
          <span style={{ flex: "1" }}>
            {/* {fieldType.name} - {index + 1} */}
          </span>
          <Button
            onClick={() => toggleModalField()}
            style={{ marginRight: "3px", marginBottom: "5px" }}
          >
            <FontAwesomeIcon icon={faMagnifyingGlass} />
          </Button>
          <Button
            className="react-grid-dragHandleExample"
            style={{ marginRight: "3px", marginBottom: "5px" }}
          >
            <FontAwesomeIcon icon={faGrip} />
          </Button>
          <Button
            variant="danger"
            onClick={() => onRemoveItem(index)}
            style={{ marginRight: "3px", marginBottom: "5px" }}
          >
            <FontAwesomeIcon icon={faX} />
          </Button>
        </div>

        {fieldType.name === "Text Input" && <FieldTextInput />}
        {fieldType.name === "Textarea" && <FieldTextarea />}
        {fieldType.name === "Number Input" && <FieldNumberInput />}
        {fieldType.name === "Checkbox" && <FieldCheckbox />}
        {fieldType.name === "Radio Button" && <FieldRadioButton />}
        {fieldType.name === "Switch" && <FieldSwitch />}
        {fieldType.name === "Dropdown" && <FieldDropdown />}
        {fieldType.name === "File Upload" && <FieldFileUpload />}
        {fieldType.name === "Date Picker" && <FieldDatePicker />}
        {fieldType.name === "Time Picker" && <FieldTimePicker />}
        {fieldType.name === "Email Input" && <FieldEmailInput />}
        {fieldType.name === "Password Input" && <FieldPasswordInput />}
      </div>
    ));
  };

  const onRemoveItem = (index) => {
    console.log("removing", index);
    dispatch(removeField(index));
    setLayoutLength(layoutLength - 1);
  };

  const onLayoutChange = (newLayout) => {
    setLayout(newLayout);
    console.log("newLayout", newLayout);
    const updatedFieldLayout = fieldListInput.map((fieldType, index) => ({
      ...fieldType,
      layout: newLayout[index], // Assuming layout has the same length as fieldListInput
      detail: {
        field_id: "",
        caption: "",
        type_id: fieldType.id,
        is_required: "",
        column_name: "",
        width: newLayout[index].w,
        height: newLayout[index].h,
        x_coordinate: newLayout[index].x,
        y_coordinate: newLayout[index].y,
      },
    }));

    // Update the fieldLayout state
    setFieldLayout(updatedFieldLayout);
  };

  const onResize = (layout, oldLayoutItem, layoutItem, placeholder) => {
    const newWidth = Math.round(
      layoutItem.w + (layoutItem.x - oldLayoutItem.x)
    );
    const newHeight = Math.round(
      layoutItem.h + (layoutItem.y - oldLayoutItem.y)
    );

    // Ensure minimum dimensions of 4x2
    if (newWidth < 4 || newHeight < 2) {
      layoutItem.w = Math.max(newWidth, 4);
      layoutItem.h = Math.max(newHeight, 2);
      placeholder.w = Math.max(newWidth, 4);
      placeholder.h = Math.max(newHeight, 2);
    }
  };

  return (
    <React.Fragment>
      <div
        onDrop={handleDrop}
        onDragOver={(e) => e.preventDefault()}
        style={{
          border: "1px solid black",
          minHeight: "400px",
          background: "white",
        }}
      >
        <ReactGridLayout
          layout={fieldLayout.layout}
          onLayoutChange={onLayoutChange}
          onResize={onResize}
          draggableHandle=".react-grid-dragHandleExample"
          className="layout"
          cols={12}
          rowHeight={30}
          compactType={null}
          preventCollision={true}
          // minHeight="3"
        >
          {generateDOM()}
        </ReactGridLayout>
      </div>

      <Modal show={showModalField} onHide={toggleModalField} centered>
        <Modal.Header closeButton>Enter Field Detail</Modal.Header>
        <Modal.Body className="text-center m-3">
          <Formik
            validationSchema={schemaField}
            // onSubmit={console.log}
            onSubmit={async (values, { setSubmitting, setErrors }) => {
              try {
                setSubmitting(true);
                const result = await storeField(values);
                if (result.success === true) {
                  console.log("Field saved successfully");
                  window.location.reload();
                  toggleModalField();
                } else {
                  console.error("Error saving field:", result);
                }
              } catch (error) {
                console.error("Unexpected error:", error);
              } finally {
                setSubmitting(false); // Reset form submitting state
              }
            }}
            initialValues={{
              caption: (field && field.caption) || "",
              is_required: (field && field.is_required) || 0,
              table_name: (field && field.table_name) || "",
              column_name: (field && field.column_name) || "",
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
                  <Form.Label column sm={5} className="text-sm-right">
                    Caption*
                  </Form.Label>
                  <Col sm={7}>
                    <Form.Control
                      type="text"
                      name="caption"
                      value={values.caption}
                      onChange={handleChange}
                      isValid={touched.caption && !errors.caption}
                      isInvalid={touched.caption && !!errors.caption}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.caption}
                    </Form.Control.Feedback>
                  </Col>
                </Form.Group>
                <Form.Group as={Row} className="mb-3">
                  <Form.Label column sm={5} className="text-sm-right">
                    Is Required*
                  </Form.Label>
                  <Col sm={7}>
                    <Form.Select
                      aria-label="Floating label select example"
                      name="is_required"
                      value={values.is_required}
                      onChange={handleChange}
                      //   onChange={(e) => {
                      //     const newValue = e.target.value === "1"; // Convert "1" to true, and "0" to false
                      //     handleChange({
                      //       target: {
                      //         name: e.target.name,
                      //         value: newValue,
                      //       },
                      //     });
                      //   }}
                    >
                      <option value="0">No</option>
                      <option value="1">Yes</option>
                    </Form.Select>
                  </Col>
                </Form.Group>
                <Form.Group as={Row} className="mb-3">
                  <Form.Label column sm={5} className="text-sm-right">
                    Database Table (Optional)
                  </Form.Label>
                  <Col sm={7}>
                    <Form.Select
                      name="table_name"
                      //   onChange={handleChange}
                      onChange={(e) => {
                        const selectedTableName = e.target.value;
                        setTableNameChosen(selectedTableName);
                        handleChange(e);
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
                  </Col>
                </Form.Group>
                {tableNameChosen && ( // Render the second Form.Select if tableNameChosen is truthy
                  <Form.Group as={Row} className="mb-3">
                    <Form.Label column sm={5} className="text-sm-right">
                      Database Column
                    </Form.Label>
                    <Col sm={7}>
                      <Form.Select
                        name="column_name"
                        onChange={handleChange}
                        value={values.column_name || ""}
                      >
                        <option value="">Not chosen</option>
                        {columnOptions.map((columnName, index) => (
                          <option key={index} value={columnName}>
                            {columnName}
                          </option>
                        ))}
                      </Form.Select>
                    </Col>
                  </Form.Group>
                )}
                <Button
                  type="submit"
                  variant="success"
                  className="float-end mt-n1 me-2"
                >
                  Save Field
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

export default FormEdit;
