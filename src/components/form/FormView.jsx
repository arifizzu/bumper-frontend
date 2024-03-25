import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { Badge, Button, Card, Col, Container, Row } from "react-bootstrap";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFileExport } from "@fortawesome/free-solid-svg-icons";
import {
  Briefcase,
  Home,
  MapPin,
  MessageSquare,
  Mail,
  User,
} from "react-feather";

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
} from "./field-type/FieldType";

import {
  showFieldStart,
  showFieldSuccess,
  showFieldFailure,
} from "../../redux/slices/fieldSlice";

import { getFields } from "../../repositories/api/services/fieldServices";

import GridLayout from "react-grid-layout";
import "../../grid-layout/css/styles.css";
import "../../grid-layout/css/example-styles.css";

const FormView = ({ id }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const fields = useSelector((state) => state.field.fields);

  // console.log("user", user);
  // console.log("id in userview", id);

  useEffect(() => {
    const fetchFields = async () => {
      try {
        dispatch(showFieldStart());
        const fieldData = await getFields(id);
        dispatch(showFieldSuccess(fieldData));
        console.log("fieldData", fieldData);
      } catch (error) {
        dispatch(showFieldFailure(error));
      }
    };

    fetchFields();
    console.log("fields from fieldstate", fields);
  }, []);

  const fieldLayout = fields.map((field) => ({
    h: field.height,
    w: field.width,
    x: field.x_coordinate,
    y: field.y_coordinate,
    detail: field,
  }));

  console.log("fieldLayout", fieldLayout);

  const generateDOM = () => {
    // console.log("generateDom");
    return fieldLayout.map((field, index) => (
      //   <div key={index} style={{ maxWidth: "100%", overflow: "hidden" }}>
      //     <div style={{ display: "flex", marginLeft: "3px" }}>
      //       <span style={{ flex: "1" }}>
      //         {field.name} - {index + 1}
      //       </span>
      //       <Button
      //         className="react-grid-dragHandleExample"
      //         style={{ marginRight: "3px", marginBottom: "5px" }}
      //       >
      //         <FontAwesomeIcon icon={faGrip} />
      //       </Button>
      //       <Button
      //         variant="danger"
      //         onClick={() => onRemoveItem(index)}
      //         style={{ marginRight: "3px", marginBottom: "5px" }}
      //       >
      //         <FontAwesomeIcon icon={faX} />
      //       </Button>
      //     </div>

      //     {field.name === "Text Input" && (
      //       <FieldTextInput
      //       // fieldLayout={fieldLayout}
      //       // setFieldLayout={setFieldLayout}
      //       />
      //     )}
      //     {field.name === "Textarea" && <FieldTextarea />}
      //     {field.name === "Number Input" && <FieldNumberInput />}
      //     {field.name === "Checkbox" && <FieldCheckbox />}
      //     {field.name === "Radio Button" && <FieldRadioButton />}
      //     {field.name === "Switch" && <FieldSwitch />}
      //     {field.name === "Dropdown" && <FieldDropdown />}
      //     {field.name === "File Upload" && <FieldFileUpload />}
      //     {field.name === "Date Picker" && <FieldDatePicker />}
      //     {field.name === "Time Picker" && <FieldTimePicker />}
      //     {field.name === "Email Input" && <FieldEmailInput />}
      //     {field.name === "Password Input" && <FieldPasswordInput />}
      //   </div>
      <div
        key={index}
        data-grid={{
          x: field.x,
          y: field.y,
          w: field.w,
          h: field.h,
          static: true,
        }}
      >
        {/* Render the content of each field */}
        <div>
          <h5>{field.detail.caption} : </h5>
          {/* Add more content as needed */}
          {field.detail.field_type.name === "Text Input" && <FieldTextInput />}
          {field.detail.field_type.name === "Textarea" && <FieldTextarea />}
          {field.detail.field_type.name === "Number Input" && (
            <FieldNumberInput />
          )}
          {field.detail.field_type.name === "Checkbox" && <FieldCheckbox />}
          {field.detail.field_type.name === "Radio Button" && (
            <FieldRadioButton />
          )}
          {field.detail.field_type.name === "Switch" && <FieldSwitch />}
          {field.detail.field_type.name === "Dropdown" && <FieldDropdown />}
          {field.detail.field_type.name === "File Upload" && (
            <FieldFileUpload />
          )}
          {field.detail.field_type.name === "Date Picker" && (
            <FieldDatePicker />
          )}
          {field.detail.field_type.name === "Time Picker" && (
            <FieldTimePicker />
          )}
          {field.detail.field_type.name === "Email Input" && (
            <FieldEmailInput />
          )}
          {field.detail.field_type.name === "Password Input" && (
            <FieldPasswordInput />
          )}
        </div>
      </div>
    ));
  };

  return (
    <React.Fragment>
      <Card>
        <Card.Header>
          <Card.Title className="mb-0 text-center">Form Details</Card.Title>
        </Card.Header>
        <Card.Body className="text-left">
          {fields && fields.length > 0 ? (
            <>
              <Row>
                <Col md="6" xl="">
                  <h5>Name: {fields[0]?.form?.name}</h5>
                  <h5>Short Name: {fields[0]?.form?.short_name}</h5>
                </Col>
                <Col md="6" xl="">
                  <h5>Table Name (Database): {fields[0]?.form?.table_name}</h5>
                  <h5>Created At: {fields[0]?.form?.created_at}</h5>
                </Col>
              </Row>
            </>
          ) : (
            <Col>
              <h5>Loading...</h5>
            </Col>
          )}
        </Card.Body>
        <hr className="my-0" />
      </Card>
      <Card>
        <Card.Header>
          <Card.Title className="mb-0 text-center">Form Preview</Card.Title>
          <Button
            variant="info"
            className="float-end mt-n1"
            onClick={() => {
              //   handleEditButton(id);
            }}
          >
            <FontAwesomeIcon icon={faFileExport} /> Export Form
          </Button>
        </Card.Header>
        <Card.Body>
          <GridLayout
            className="fieldLayout"
            layout={fieldLayout}
            cols={12}
            rowHeight={30}
            width={1200}
          >
            {generateDOM()}
          </GridLayout>
        </Card.Body>
      </Card>
    </React.Fragment>
  );
};

export default FormView;
