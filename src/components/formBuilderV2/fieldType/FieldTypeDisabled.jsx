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
    <Form.Group as={Row} className="mb-3">
      <Form.Label column sm={5} className="text-sm-right">
        Text Input
      </Form.Label>
      <Col sm={7}>
        <Form.Control type="text" name="" placeholder="" defaultValue={"Abc"} />
      </Col>
    </Form.Group>
  </React.Fragment>
);

export const FieldTextarea = () => (
  <React.Fragment>
    <Form.Group as={Row} className="mb-3">
      <Form.Label column sm={5} className="text-sm-right">
        Textarea
      </Form.Label>
      <Col sm={7}>
        <Form.Control
          type="textarea"
          as="textarea"
          name="textarea"
          placeholder=""
          defaultValue={"Abc"}
          // disabled
        />
      </Col>
    </Form.Group>
  </React.Fragment>
);

export const FieldNumberInput = () => (
  <React.Fragment>
    <Form.Group as={Row} className="mb-3">
      <Form.Label column sm={5} className="text-sm-right">
        Number Input
      </Form.Label>
      <Col sm={7}>
        <Form.Control
          type="number"
          name=""
          placeholder=""
          defaultValue={"12"}
        />
      </Col>
    </Form.Group>
  </React.Fragment>
);

export const FieldCheckbox = () => (
  <React.Fragment>
    <Form.Label column className="text-sm-right">
      Checkbox
    </Form.Label>
    <Card>
      <Form.Check
        inline
        label="Option one"
        type="checkbox"
        style={{ color: "grey" }}
        // disabled
        defaultChecked
      />
      <Form.Check
        inline
        label="Option two"
        type="checkbox"
        style={{ color: "grey" }}
        // disabled
      />
      <Form.Check
        inline
        label="Option three"
        type="checkbox"
        style={{ color: "grey" }}
        // disabled
        defaultChecked
      />
    </Card>
  </React.Fragment>
);

export const FieldRadioButton = () => (
  <React.Fragment>
    <Form.Label column className="text-sm-right">
      Radio Button
    </Form.Label>
    <Card>
      <Form.Check
        label="Option one"
        type="radio"
        name="radios-example"
        style={{ color: "grey" }}
        // disabled
        defaultChecked
      />
      <Form.Check
        label="Option two"
        type="radio"
        name="radios-example"
        style={{ color: "grey" }}
        // disabled
      />
    </Card>
  </React.Fragment>
);

export const FieldSwitch = () => (
  <React.Fragment>
    <Form.Label column className="text-sm-right">
      Switch
    </Form.Label>
    <Card>
      <Form.Check
        type="switch"
        id="switch-example"
        name="switch-example"
        label="Toggle this switch"
        style={{ color: "grey" }}
        // disabled
      />
    </Card>
  </React.Fragment>
);

export const FieldDropdown = () => (
  <React.Fragment>
    <Form.Label column className="text-sm-right">
      Dropdown
    </Form.Label>

    <Form.Select aria-label="Floating label select example">
      <option>Open this select menu</option>
      <option value="1">Option 1</option>
      <option value="2">Option 2</option>
    </Form.Select>
  </React.Fragment>
);

export const FieldFileUpload = () => (
  <React.Fragment>
    <Form.Label column className="text-sm-right">
      File Upload
    </Form.Label>
    <Card>
      <Form.Control type="file" name="file" />
    </Card>
  </React.Fragment>
);

export const FieldDatePicker = () => (
  <React.Fragment>
    <Form.Label column className="text-sm-right">
      Date Picker
    </Form.Label>

    <Form.Control type="date" placeholder="" defaultValue={"2024-03-24"} />
  </React.Fragment>
);

export const FieldTimePicker = () => (
  <React.Fragment>
    <Form.Label column className="text-sm-right">
      Time Picker
    </Form.Label>
    <Form.Control type="time" placeholder="" defaultValue={"04:29"} />
  </React.Fragment>
);

export const FieldEmailInput = () => (
  <React.Fragment>
    <Form.Label column className="text-sm-right">
      Email Input
    </Form.Label>
    <Form.Control
      type="email"
      placeholder=""
      // disabled
      defaultValue={"test@example.com"}
    />
  </React.Fragment>
);

export const FieldPasswordInput = () => (
  <React.Fragment>
    <Form.Label column className="text-sm-right">
      Password
    </Form.Label>

    <Form.Control
      type="password"
      placeholder=""
      // disabled
      defaultValue={"password"}
    />
  </React.Fragment>
);
