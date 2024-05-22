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

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAnglesLeft,
  faX,
  faGrip,
  faMagnifyingGlass,
  faEdit,
  faWindowMinimize,
  faSave,
  faPlus,
  faMinus,
} from "@fortawesome/free-solid-svg-icons";

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
} from "./fieldType/FieldTypeExample";

import {
  FieldTextInputDynamic,
  FieldTextareaDynamic,
  FieldNumberInputDynamic,
  FieldCheckboxDynamic,
  FieldRadioButtonDynamic,
  FieldSwitchDynamic,
  FieldDropdownDynamic,
  FieldFileUploadDynamic,
  FieldDatePickerDynamic,
  FieldTimePickerDynamic,
  FieldEmailInputDynamic,
  FieldPasswordInputDynamic,
} from "./fieldType/FieldTypeDynamic";

import {
  showForm,
  updateForm,
} from "../../repositories/api/services/formServices";
import {
  showFormStart,
  showFormSuccess,
  showFormFailure,
} from "../../redux/slices/formSlice";

import { getGroups } from "../../repositories/api/services/groupServices";

import {
  getGroupsStart,
  getGroupsSuccess,
  getGroupsFailure,
} from "../../redux/slices/groupSlice";

import {
  createField,
  storeField,
  getFields,
  // editField,
  updateField,
  showAllFieldTypes,
  deleteField,
} from "../../repositories/api/services/fieldServices";

import {
  getFieldsStart,
  getFieldsSuccess,
  getFieldsFailure,
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
  // getLatestId,
} from "../../repositories/api/services/dbRetrievalServices";

import {
  getTablesStart,
  getTablesSuccess,
  getTablesFailure,
  getColumnsStart,
  getColumnsSuccess,
  getColumnsFailure,
  // getLatestIdStart,
  // getLatestIdSuccess,
  // getLatestIdFailure,
} from "../../redux/slices/dbRetrievalSlice";

import { updateFieldLocation } from "../../repositories/api/services/fieldLocationServices";

import {
  storeFieldListValue,
  deleteFieldListValue,
} from "../../repositories/api/services/fieldListValueServices";

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
  is_required: Yup.boolean().required("This field is required"),
  table_name: Yup.string().nullable(),
  column_name: Yup.string().nullable(),
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
        dispatch(showFormSuccess(form));
      } catch (error) {
        dispatch(showFormFailure(error));
      }
    };

    const fetchGroups = async () => {
      try {
        dispatch(getGroupsStart());
        const groupData = await getGroups();
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
              </Card.Header>
              <Card.Body className="text-left">
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
                {/* <h4>Form Layout</h4> */}
                {/* <FormLayout formId={id} /> */}
              </Card.Body>
            </Card>
            <Card>
              <Card.Header>{/* <h4>Form Layout</h4> */}</Card.Header>
              <Card.Body>
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
        // console.log("fieldType", fieldType);
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
  const [showModalField, setShowModalField] = useState({});
  const [tableNameChosen, setTableNameChosen] = useState("");
  const fieldListInputOriginal = useSelector(
    (state) => state.field.fieldListInputOriginal
  );
  // const fieldLatestId = useSelector((state) => state.dbRetrieval.latestId);
  const [fieldOptionsValue, setFieldOptionsValue] = useState([
    { label: "", value: "" },
  ]);
  const handleAddOptionValue = () => {
    setFieldOptionsValue([...fieldOptionsValue, { label: "", value: "" }]);
  };

  const handleRemoveOptionValue = (index) => {
    const newOptions = fieldOptionsValue.filter((_, i) => i !== index);
    setFieldOptionsValue(newOptions);
  };

  const handleChangeOptionValue = (index, event) => {
    const { name, value } = event.target;
    const newOptions = [...fieldOptionsValue];
    newOptions[index][name] = value;
    setFieldOptionsValue(newOptions);
  };

  const handleDrop = (e) => {
    e.preventDefault();

    const field = JSON.parse(e.dataTransfer.getData("field"));

    const newLayoutItem = {
      i: fieldListInput.length,
      x: 0,
      y: Infinity, // puts it at the bottom
      w: 3,
      h: 3,
      // isBounded: false,
      // isDraggable: false,
    };

    dispatch(addField(field));
    // toggleModalField();
    toggleModalField(newLayoutItem.i);
    console.log("field dropped", field);
    console.log("fieldListInput.length", fieldListInput.length);
  };

  useEffect(() => {
    const fetchField = async () => {
      try {
        dispatch(createFieldStart());
        const field = await createField();
        dispatch(createFieldSuccess(field));
      } catch (error) {
        dispatch(createFieldFailure(error));
      }
    };

    const fetchTables = async () => {
      try {
        dispatch(getTablesStart());
        const tableOptions = await getTables();
        dispatch(getTablesSuccess(tableOptions));
      } catch (error) {
        dispatch(getTablesFailure(error));
      }
    };

    const fetchExistingFields = async () => {
      try {
        dispatch(getFieldsStart());
        const fieldListInput = await getFields(formId);
        console.log("fieldListInput", fieldListInput);
        dispatch(getFieldsSuccess(fieldListInput));
      } catch (error) {
        dispatch(getFieldsFailure(error));
      }
    };

    fetchField();
    fetchTables();
    fetchExistingFields();
  }, []);

  const toggleModalField = (id) => {
    setShowModalField((prevState) => ({
      ...prevState,
      [id]: !prevState[id],
    }));
  };

  useEffect(() => {
    console.log("fieldListInput updated:", fieldListInput);
    console.log("fieldListInputOriginal updated:", fieldListInputOriginal);
  }, [fieldListInput]);

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
  }, [tableNameChosen, dispatch]);

  const generateDOM = () => {
    return fieldListInput.map((fieldList, index) => (
      <div
        key={index}
        className="draggable-field"
        style={{ maxWidth: "100%", overflow: "hidden" }}
        data-grid={{
          x: fieldList.location?.x_coordinate ?? 0,
          y: fieldList.location?.y_coordinate ?? 0,
          w: fieldList.location?.width ?? 4,
          h: fieldList.location?.height ?? 2,
        }}
      >
        <div style={{ display: "flex", marginLeft: "3px" }}>
          <span style={{ flex: "1" }}>
            {/* {fieldList.name} - {index + 1} */}
          </span>
          <Button
            // variant="primary"
            variant={fieldList.field_type ? "success" : "warning"}
            onClick={() => {
              toggleModalField(index);
            }}
            style={{ marginRight: "3px", marginBottom: "5px" }}
          >
            <FontAwesomeIcon icon={faEdit} />
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

        {fieldList.field_type ? (
          <>
            {fieldList.field_type.name === "Text Input" && (
              <FieldTextInputDynamic fieldList={fieldList} />
            )}
            {fieldList.field_type.name === "Textarea" && (
              <FieldTextareaDynamic fieldList={fieldList} />
            )}
            {fieldList.field_type.name === "Number Input" && (
              <FieldNumberInputDynamic fieldList={fieldList} />
            )}
            {fieldList.field_type.name === "Checkbox" && (
              <FieldCheckboxDynamic fieldList={fieldList} />
            )}
            {fieldList.field_type.name === "Radio Button" && (
              <FieldRadioButtonDynamic fieldList={fieldList} />
            )}
            {fieldList.field_type.name === "Switch" && (
              <FieldSwitchDynamic fieldList={fieldList} />
            )}
            {fieldList.field_type.name === "Dropdown" && (
              <FieldDropdownDynamic fieldList={fieldList} />
            )}
            {fieldList.field_type.name === "File Upload" && (
              <FieldFileUploadDynamic fieldList={fieldList} />
            )}
            {fieldList.field_type.name === "Date Picker" && (
              <FieldDatePickerDynamic fieldList={fieldList} />
            )}
            {fieldList.field_type.name === "Time Picker" && (
              <FieldTimePickerDynamic fieldList={fieldList} />
            )}
            {fieldList.field_type.name === "Email Input" && (
              <FieldEmailInputDynamic fieldList={fieldList} />
            )}
            {fieldList.field_type.name === "Password Input" && (
              <FieldPasswordInputDynamic fieldList={fieldList} />
            )}
          </>
        ) : (
          <>
            {fieldList.name === "Text Input" && <FieldTextInput />}
            {fieldList.name === "Textarea" && <FieldTextarea />}
            {fieldList.name === "Number Input" && <FieldNumberInput />}
            {fieldList.name === "Checkbox" && <FieldCheckbox />}
            {fieldList.name === "Radio Button" && <FieldRadioButton />}
            {fieldList.name === "Switch" && <FieldSwitch />}
            {fieldList.name === "Dropdown" && <FieldDropdown />}
            {fieldList.name === "File Upload" && <FieldFileUpload />}
            {fieldList.name === "Date Picker" && <FieldDatePicker />}
            {fieldList.name === "Time Picker" && <FieldTimePicker />}
            {fieldList.name === "Email Input" && <FieldEmailInput />}
            {fieldList.name === "Password Input" && <FieldPasswordInput />}
          </>
        )}
        <Modal
          key={index}
          show={showModalField[index]}
          onHide={() => toggleModalField(index)}
          centered
        >
          <Modal.Header closeButton>Enter Field Detail</Modal.Header>
          <h1>fieldList.id = {fieldList.id}</h1>
          <h1>index = {index}</h1>
          <Modal.Body className="text-center m-3">
            <Formik
              onSubmit={async (values, { setSubmitting, setErrors }) => {
                console.log("values", values);
                console.log("fieldOptionsValue", fieldOptionsValue);
                try {
                  setSubmitting(true);
                  values.form_id = formId;

                  if (!fieldList.field_type) {
                    // Creating a new field
                    const latestFieldLayout =
                      fieldLayout[fieldLayout.length - 1];
                    values.type_id = latestFieldLayout.id;

                    console.log("values", values);

                    const result = await storeField(values);

                    if (result.success === true) {
                      console.log("Field saved successfully");

                      // Check if fieldOptionsValue is not empty or only contains an object with empty label and value
                      const hasValidOptions = fieldOptionsValue.some(
                        (option) => option.label !== "" && option.value !== ""
                      );

                      if (hasValidOptions) {
                        for (const fieldOptionV of fieldOptionsValue) {
                          const result2 = await storeFieldListValue(
                            result.latestFieldId,
                            fieldOptionV
                          );
                          if (result2.success === true) {
                            console.log("Field value saved successfully");
                          } else {
                            console.error("Error saving field value:", result2);
                          }
                        }
                      }

                      window.location.reload();
                      toggleModalField(index);
                    } else {
                      console.error("Error saving field:", result);
                    }
                  } else {
                    // Updating an existing field
                    console.log("values", values);
                    console.log("fieldList.id", fieldList.id);

                    const result = await updateField(values, fieldList.id);

                    if (result.success === true) {
                      console.log("Field updated successfully");

                      // Check if fieldOptionsValue is not empty or only contains an object with empty label and value
                      const hasValidOptions = fieldOptionsValue.some(
                        (option) => option.label !== "" && option.value !== ""
                      );

                      if (hasValidOptions) {
                        await deleteFieldListValue(result.latestFieldId);

                        for (const fieldOptionV of fieldOptionsValue) {
                          const result2 = await storeFieldListValue(
                            result.latestFieldId,
                            fieldOptionV
                          );
                          if (result2.success === true) {
                            console.log("Field value updated successfully");
                          } else {
                            console.error(
                              "Error updating field value:",
                              result2
                            );
                          }
                        }
                      }

                      window.location.reload();
                      toggleModalField(index);
                    } else {
                      console.error("Error updating field:", result);
                    }
                  }
                } catch (error) {
                  console.error("Unexpected error:", error);
                } finally {
                  setSubmitting(false); // Reset form submitting state
                }
              }}
              initialValues={{
                caption: fieldList.caption || "",
                is_required: fieldList.is_required || 0,
                table_name: fieldList.table_name || null,
                column_name: fieldList.column_name || null,
              }}
              enableReinitialize={true}
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
                      >
                        <option value="0">No</option>
                        <option value="1">Yes</option>
                      </Form.Select>
                    </Col>
                  </Form.Group>
                  <Form.Group as={Row} className="mb-3">
                    <Form.Label column sm={5} className="text-sm-right">
                      Database Table
                    </Form.Label>
                    <Col sm={7}>
                      <Form.Select
                        name="table_name"
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
                  {tableNameChosen && (
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
                  {fieldLayout &&
                    fieldLayout.length > 0 &&
                    fieldLayout[index] && (
                      <>
                        {fieldLayout[index].name === "Checkbox" ||
                        fieldLayout[index].name === "Radio Button" ||
                        fieldLayout[index].name === "Dropdown" ? (
                          <Form.Group className="mb-3">
                            <Form.Label>Field Options: </Form.Label>
                            {fieldOptionsValue.map((option, optIndex) => (
                              <Row key={optIndex} className="mb-3">
                                <Col>
                                  <Form.Control
                                    type="text"
                                    name="label"
                                    placeholder="Label"
                                    value={option.label}
                                    onChange={(event) =>
                                      handleChangeOptionValue(optIndex, event)
                                    }
                                  />
                                </Col>
                                <Col>
                                  <Form.Control
                                    type="text"
                                    name="value"
                                    placeholder="Value"
                                    value={option.value}
                                    onChange={(event) =>
                                      handleChangeOptionValue(optIndex, event)
                                    }
                                  />
                                </Col>
                                <Col xs="auto">
                                  <Button
                                    variant="danger"
                                    onClick={() =>
                                      handleRemoveOptionValue(optIndex)
                                    }
                                  >
                                    <FontAwesomeIcon icon={faMinus} />
                                  </Button>
                                </Col>
                              </Row>
                            ))}
                            <Button
                              variant="primary"
                              onClick={handleAddOptionValue}
                            >
                              <FontAwesomeIcon icon={faPlus} /> Add Option
                            </Button>
                          </Form.Group>
                        ) : fieldLayout[index].field_type &&
                          fieldLayout[index].field_type.name &&
                          (fieldLayout[index].field_type.name === "Checkbox" ||
                            fieldLayout[index].field_type.name ===
                              "Radio Button" ||
                            fieldLayout[index].field_type.name ===
                              "Dropdown") ? (
                          <Form.Group className="mb-3">
                            <Form.Label>Field Options: </Form.Label>
                            {fieldLayout[index].list_values.map(
                              (listValue, optIndex) => (
                                <Row key={listValue.id} className="mb-3">
                                  <Col>
                                    <Form.Control
                                      type="text"
                                      name="label"
                                      placeholder="Label"
                                      value={
                                        fieldOptionsValue[optIndex]?.label ||
                                        listValue.label
                                      }
                                      onChange={(event) =>
                                        handleChangeOptionValue(optIndex, event)
                                      }
                                    />
                                  </Col>
                                  <Col>
                                    <Form.Control
                                      type="text"
                                      name="value"
                                      placeholder="Value"
                                      value={
                                        fieldOptionsValue[optIndex]?.value ||
                                        listValue.value
                                      }
                                      onChange={(event) =>
                                        handleChangeOptionValue(optIndex, event)
                                      }
                                    />
                                  </Col>
                                  <Col xs="auto">
                                    <Button
                                      variant="danger"
                                      onClick={() =>
                                        handleRemoveOptionValue(optIndex)
                                      }
                                    >
                                      <FontAwesomeIcon icon={faMinus} />
                                    </Button>
                                  </Col>
                                </Row>
                              )
                            )}
                            <Button
                              variant="primary"
                              onClick={handleAddOptionValue}
                            >
                              <FontAwesomeIcon icon={faPlus} /> Add Option
                            </Button>
                          </Form.Group>
                        ) : null}
                      </>
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
        </Modal>
      </div>
    ));
  };

  const onRemoveItem = (index) => {
    console.log("removing", index);
    dispatch(removeField(index));
  };

  const onLayoutChange = (newLayout) => {
    console.log("newLayout", newLayout);
    const updatedFieldLayout = fieldListInput.map((fieldList, index) => ({
      ...fieldList,
      layout: newLayout[index], // Assuming layout has the same length as fieldListInput
    }));

    // Update the fieldLayout state
    setFieldLayout(updatedFieldLayout);
  };

  const onResize = (oldLayoutItem, layoutItem, placeholder) => {
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
      <Container
        style={{
          position: "relative",
          zIndex: 2,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <h4>Form Layout</h4>
        <Button
          variant="success"
          className="float-end mt-n1"
          onClick={async () => {
            const fieldListInputFiltered = fieldListInputOriginal.filter(
              (original) =>
                !fieldListInput.some((input) => input.id === original.id)
            );
            console.log("fieldListInputFiltered", fieldListInputFiltered);
            console.log("fieldLayout", fieldLayout);

            // Create an array of promises for updating all field locations
            const updatePromises = fieldLayout.map((field, index) => {
              const fieldData = {
                form_id: field.form_id,
                caption: field.caption,
                width: field.layout.w,
                height: field.layout.h,
                x_coordinate: field.layout.x,
                y_coordinate: field.layout.y,
              };
              console.log(`fieldData for index ${index}`, fieldData);
              return updateFieldLocation(fieldData)
                .then((result) => {
                  console.log(`Update result for index ${index}`, result);
                  return { index, success: result.success };
                })
                .catch((error) => {
                  console.error(`Error updating index ${index}:`, error);
                  return { index, success: false, error };
                });
            });

            // Create an array of promises for deleting filtered fields
            const deletePromises = fieldListInputFiltered.map((field) =>
              deleteField(field.id)
                .then((result2) => {
                  console.log(
                    `Delete result for field ID ${field.id}`,
                    result2
                  );
                  return { id: field.id, success: result2 };
                })
                .catch((error) => {
                  console.error(`Error deleting field ID ${field.id}:`, error);
                  return { id: field.id, success: false, error };
                })
            );

            try {
              // Wait for all updates and deletions to complete
              const updateResults = await Promise.all(updatePromises);
              const deleteResults = await Promise.all(deletePromises);

              // Check if all updates were successful
              const allUpdatesSuccessful = updateResults.every(
                (result) => result.success === true
              );

              // Check if all deletions were successful
              const allDeletionsSuccessful = deleteResults.every(
                (result) => result.success === true
              );

              if (allUpdatesSuccessful && allDeletionsSuccessful) {
                console.log(
                  "All field locations updated and fields deleted successfully"
                );
                window.location.reload();
              } else {
                console.error(
                  "Error saving some field locations or deleting fields:",
                  {
                    updateResults,
                    deleteResults,
                  }
                );
              }
            } catch (error) {
              console.error("Error in updating field locations:", error);
            }
          }}
        >
          <FontAwesomeIcon icon={faSave} /> Save Form
        </Button>
      </Container>
      <div
        onDrop={handleDrop}
        onDragOver={(e) => e.preventDefault()}
        style={{
          border: "1px solid black",
          minHeight: "400px",
          background: "white",
          marginTop: "10px",
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
    </React.Fragment>
  );
};

export default FormEdit;
