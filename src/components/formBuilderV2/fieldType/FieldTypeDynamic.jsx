import React, { useState } from "react";
import { Helmet } from "react-helmet-async";
import {
  Card,
  Col,
  Container,
  Form,
  Row,
  FloatingLabel,
} from "react-bootstrap";

export const FieldTextInputDynamic = ({ fieldList }) => {
  return (
    <React.Fragment>
      <Container>
        <Form.Group as={Row} className="mb-3 align-items-center">
          <Col sm={5} className="text-right">
            <Form.Label
              style={{ color: "black", textAlign: "right", marginBottom: "0" }}
            >
              {fieldList.caption}:
            </Form.Label>
          </Col>
          <Col sm={7}>
            <Form.Control
              type="text"
              name={fieldList.caption} // Use field caption as the input name
              placeholder=""
              defaultValue={""}
            />
          </Col>
        </Form.Group>
      </Container>
    </React.Fragment>
  );
};

export const FieldTextareaDynamic = ({ fieldList }) => {
  return (
    <React.Fragment>
      <Form.Group as={Row} className="mb-3">
        <Col sm={5} className="text-right">
          <Form.Label
            column
            style={{ color: "black", textAlign: "right", marginBottom: "0" }}
          >
            {fieldList.caption}:
          </Form.Label>
        </Col>

        <Col sm={7}>
          <Form.Control
            type="textarea"
            name={fieldList.caption} // Use field caption as the input name
            placeholder=""
            defaultValue={""}
          />
        </Col>
      </Form.Group>
    </React.Fragment>
  );
};

export const FieldNumberInputDynamic = ({ fieldList }) => {
  return (
    <React.Fragment>
      <Form.Group as={Row} className="mb-3">
        <Form.Label
          column
          sm={5}
          className="text-sm-left"
          style={{ color: "black", textAlign: "left" }}
        >
          {fieldList.caption}:
        </Form.Label>
        <Col sm={7}>
          <Form.Control
            type="number"
            name={fieldList.caption} // Use field caption as the input name
            placeholder=""
            defaultValue={""}
          />
        </Col>
      </Form.Group>
    </React.Fragment>
  );
};

export const FieldCheckboxDynamic = ({ fieldList }) => {
  return (
    <React.Fragment>
      <Form.Group as={Row} className="mb-3">
        <Form.Label
          column
          sm={5}
          className="text-sm-left"
          style={{ color: "black", textAlign: "left" }}
        >
          {fieldList.caption}:
        </Form.Label>
        <Col sm={7}>
          {fieldList.list_values.map((listValue, index) => (
            <Form.Check
              key={index}
              inline
              name={fieldList.caption}
              label={listValue.label}
              value={listValue.value} // Set value to listValue.value
              type="checkbox"
              style={{ color: "black" }}
            />
          ))}
        </Col>
      </Form.Group>
    </React.Fragment>
  );
};

export const FieldRadioButtonDynamic = ({ fieldList }) => {
  return (
    <React.Fragment>
      <Form.Group as={Row} className="mb-3">
        <Form.Label
          column
          sm={5}
          className="text-sm-left"
          style={{ color: "black", textAlign: "left" }}
        >
          {fieldList.caption}:
        </Form.Label>
        <Col sm={7}>
          {fieldList.list_values.map((listValue, index) => (
            <Form.Check
              key={index}
              inline
              name={fieldList.caption} // Use field caption as the input name
              label={listValue.label}
              value={listValue.value} // Set value to listValue.value
              type="radio"
              style={{ color: "black" }}
            />
          ))}
        </Col>
      </Form.Group>
    </React.Fragment>
  );
};

export const FieldSwitchDynamic = ({ fieldList }) => {
  return (
    <React.Fragment>
      <Form.Check
        type="switch"
        id={fieldList.caption}
        name={fieldList.caption} // Use field caption as the input name
        label={fieldList.caption}
        style={{ color: "black" }}
      />
    </React.Fragment>
  );
};

export const FieldDropdownDynamic = ({ fieldList }) => {
  return (
    <React.Fragment>
      <Form.Group as={Row} className="mb-3">
        <Form.Label
          column
          sm={5}
          className="text-sm-left"
          style={{ color: "black", textAlign: "left" }}
        >
          {fieldList.caption}:
        </Form.Label>
        <Col sm={7}>
          <Form.Select
            name={fieldList.caption} // Use field caption as the input name
            aria-label="Floating label select example"
          >
            <option value="">Not chosen</option>
            {fieldList.list_values.map((listValue, index) => (
              <option key={index} value={listValue.value}>
                {listValue.label}
              </option>
            ))}
          </Form.Select>
        </Col>
      </Form.Group>
    </React.Fragment>
  );
};

export const FieldFileUploadDynamic = ({ fieldList }) => {
  return (
    <React.Fragment>
      <Form.Group as={Row} className="mb-3">
        <Form.Label
          column
          sm={5}
          className="text-sm-left"
          style={{ color: "black", textAlign: "left" }}
        >
          {fieldList.caption}:
        </Form.Label>
        <Col sm={7}>
          <Form.Control
            type="file"
            name={fieldList.caption} // Use field caption as the input name
          />
        </Col>
      </Form.Group>
    </React.Fragment>
  );
};

export const FieldDatePickerDynamic = ({ fieldList }) => {
  return (
    <React.Fragment>
      <Form.Group as={Row} className="mb-3">
        <Form.Label
          column
          sm={5}
          className="text-sm-left"
          style={{ color: "black", textAlign: "left" }}
        >
          {fieldList.caption}:
        </Form.Label>
        <Col sm={7}>
          <Form.Control
            type="date"
            name={fieldList.caption} // Use field caption as the input name
            placeholder=""
            defaultValue={""}
          />
        </Col>
      </Form.Group>
    </React.Fragment>
  );
};

export const FieldTimePickerDynamic = ({ fieldList }) => {
  return (
    <React.Fragment>
      <Form.Group as={Row} className="mb-3">
        <Form.Label
          column
          sm={5}
          className="text-sm-left"
          style={{ color: "black", textAlign: "left" }}
        >
          {fieldList.caption}:
        </Form.Label>
        <Col sm={7}>
          <Form.Control
            type="time"
            name={fieldList.caption} // Use field caption as the input name
            placeholder=""
            defaultValue={""}
          />
        </Col>
      </Form.Group>
    </React.Fragment>
  );
};

export const FieldEmailInputDynamic = ({ fieldList }) => {
  return (
    <React.Fragment>
      <Form.Group as={Row} className="mb-3">
        <Form.Label
          column
          sm={5}
          className="text-sm-left"
          style={{ color: "black", textAlign: "left" }}
        >
          {fieldList.caption}:
        </Form.Label>
        <Col sm={7}>
          <Form.Control
            type="email"
            name={fieldList.caption} // Use field caption as the input name
            placeholder=""
            defaultValue={""}
          />
        </Col>
      </Form.Group>
    </React.Fragment>
  );
};

export const FieldPasswordInputDynamic = ({ fieldList }) => {
  return (
    <React.Fragment>
      <Form.Group as={Row} className="mb-3">
        <Form.Label
          column
          sm={5}
          className="text-sm-left"
          style={{ color: "black", textAlign: "left" }}
        >
          {fieldList.caption}:
        </Form.Label>
        <Col sm={7}>
          <Form.Control
            type="password"
            name={fieldList.caption} // Use field caption as the input name
            placeholder=""
            defaultValue={""}
          />
        </Col>
      </Form.Group>
    </React.Fragment>
  );
};
