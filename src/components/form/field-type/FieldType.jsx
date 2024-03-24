import React from "react";
import { Helmet } from "react-helmet-async";
import {
  Card,
  Col,
  Container,
  Form,
  Row,
  FloatingLabel,
} from "react-bootstrap";

export const FieldTextInput = () => (
  <React.Fragment>
    <FloatingLabel
      controlId="input"
      label="Text Input"
      style={{ color: "grey", marginLeft: "5px", marginRight: "5px" }}
    >
      <Form.Control type="text" placeholder="" />
    </FloatingLabel>
  </React.Fragment>
);

export const FieldTextarea = () => (
  <React.Fragment>
    <FloatingLabel
      controlId="textarea"
      label="Textarea"
      style={{ color: "grey", marginLeft: "5px", marginRight: "5px" }}
    >
      <Form.Control as="textarea" name="textarea" placeholder="" />
    </FloatingLabel>
  </React.Fragment>
);

export const FieldNumberInput = () => (
  <React.Fragment>
    <FloatingLabel
      controlId="number"
      label="Number Input"
      style={{ color: "grey", marginLeft: "5px", marginRight: "5px" }}
    >
      <Form.Control type="number" placeholder="" />
    </FloatingLabel>
  </React.Fragment>
);

export const FieldCheckbox = () => (
  <React.Fragment>
    <Card>
      <Form.Check
        inline
        label="Option one"
        type="checkbox"
        style={{ color: "grey", marginLeft: "5px", marginRight: "5px" }}
      />
      <Form.Check
        inline
        label="Option two"
        type="checkbox"
        style={{ color: "grey", marginLeft: "5px", marginRight: "5px" }}
      />
      <Form.Check
        inline
        label="Option three"
        type="checkbox"
        style={{ color: "grey", marginLeft: "5px", marginRight: "5px" }}
      />
    </Card>
  </React.Fragment>
);

export const FieldRadioButton = () => (
  <React.Fragment>
    <Card>
      <Form.Check
        label="Option one"
        type="radio"
        name="radios-example"
        style={{ color: "grey", marginLeft: "5px", marginRight: "5px" }}
      />
      <Form.Check
        label="Option two"
        type="radio"
        name="radios-example"
        style={{ color: "grey", marginLeft: "5px", marginRight: "5px" }}
      />
    </Card>
  </React.Fragment>
);

export const FieldSwitch = () => (
  <React.Fragment>
    <Card>
      <Form.Check
        type="switch"
        id="switch-example"
        name="switch-example"
        label="Toggle this switch"
        style={{ color: "grey", marginLeft: "5px", marginRight: "5px" }}
      />
    </Card>
  </React.Fragment>
);

export const FieldDropdown = () => (
  <React.Fragment>
    <FloatingLabel
      controlId="dropdown"
      label="Dropdown"
      style={{ color: "grey", marginLeft: "5px", marginRight: "5px" }}
    >
      <Form.Select aria-label="Floating label select example">
        <option>Open this select menu</option>
        <option value="1">Option 1</option>
        <option value="2">Option 2</option>
      </Form.Select>
    </FloatingLabel>
  </React.Fragment>
);

export const FieldFileUpload = () => (
  <React.Fragment>
    <Card>
      <Form.Control type="file" name="file" />
    </Card>
  </React.Fragment>
);

export const FieldDatePicker = () => (
  <React.Fragment>
    <FloatingLabel
      controlId="date"
      label="Date Picker"
      style={{ color: "grey", marginLeft: "5px", marginRight: "5px" }}
    >
      <Form.Control type="date" placeholder="" />
    </FloatingLabel>
  </React.Fragment>
);

export const FieldTimePicker = () => (
  <React.Fragment>
    <FloatingLabel
      controlId="time"
      label="Time Picker"
      style={{ color: "grey", marginLeft: "5px", marginRight: "5px" }}
    >
      <Form.Control type="time" placeholder="" />
    </FloatingLabel>
  </React.Fragment>
);

export const FieldEmailInput = () => (
  <React.Fragment>
    <FloatingLabel
      controlId="email"
      label="Email Input"
      style={{ color: "grey", marginLeft: "5px", marginRight: "5px" }}
    >
      <Form.Control type="email" placeholder="" />
    </FloatingLabel>
  </React.Fragment>
);

export const FieldPasswordInput = () => (
  <React.Fragment>
    <FloatingLabel
      controlId="password"
      label="Password Input"
      style={{ color: "grey", marginLeft: "5px", marginRight: "5px" }}
    >
      <Form.Control type="password" placeholder="" />
    </FloatingLabel>
  </React.Fragment>
);
