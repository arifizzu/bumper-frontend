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

export const FieldTextInputDynamic = ({ fieldList }) => (
  <React.Fragment>
    <Card>
      <Form.Group as={Row} className="mb-3">
        <Form.Label
          column
          sm={5}
          className="text-sm-right"
          style={{ color: "black" }}
        >
          {fieldList.caption} :
        </Form.Label>
        <Col sm={7}>
          <Form.Control type="text" name="" placeholder="" defaultValue={""} />
        </Col>
      </Form.Group>
    </Card>
  </React.Fragment>
);

export const FieldTextareaDynamic = ({ fieldList }) => (
  <React.Fragment>
    <Card>
      <Form.Group as={Row} className="mb-3">
        <Form.Label
          column
          sm={5}
          className="text-sm-right"
          style={{ color: "black" }}
        >
          {fieldList.caption} :
        </Form.Label>
        <Col sm={7}>
          <Form.Control
            type="textarea"
            as="textarea"
            name="textarea"
            placeholder=""
            defaultValue={""}
            // disabled
          />
        </Col>
      </Form.Group>
    </Card>
  </React.Fragment>
);

export const FieldNumberInputDynamic = ({ fieldList }) => (
  <React.Fragment>
    <Card>
      <Form.Group as={Row} className="mb-3">
        <Form.Label
          column
          sm={5}
          className="text-sm-right"
          style={{ color: "black" }}
        >
          {fieldList.caption} :
        </Form.Label>
        <Col sm={7}>
          <Form.Control
            type="number"
            name=""
            placeholder=""
            defaultValue={""}
          />
        </Col>
      </Form.Group>
    </Card>
  </React.Fragment>
);

export const FieldCheckboxDynamic = ({ fieldList }) => {
  // console.log("fieldList in dynamic", fieldList);
  return (
    <React.Fragment>
      <Card>
        <Form.Group as={Row} className="mb-3">
          <Form.Label
            column
            className="text-sm-right"
            style={{ color: "black" }}
          >
            {fieldList.caption} :
          </Form.Label>
          <Col sm={7}>
            {fieldList.list_values.map((listValue, index) => (
              <Form.Check
                key={index}
                inline
                label={listValue.label}
                type="checkbox"
                style={{ color: "black" }}
                // disabled={someCondition}
                // defaultChecked={someCondition}
              />
            ))}
          </Col>
        </Form.Group>
      </Card>
    </React.Fragment>
  );
};

export const FieldRadioButtonDynamic = ({ fieldList }) => {
  // console.log("fieldList in dynamic", fieldList);
  return (
    <React.Fragment>
      <Card>
        <Form.Group as={Row} className="mb-3">
          <Form.Label
            column
            className="text-sm-right"
            style={{ color: "black" }}
          >
            {fieldList.caption} :
          </Form.Label>
          <Col sm={7}>
            {fieldList.list_values.map((listValue, index) => (
              <Form.Check
                key={index}
                inline
                name="radios-example"
                label={listValue.label}
                type="radio"
                style={{ color: "black" }}
                // disabled={someCondition}
                // defaultChecked={someCondition}
              />
            ))}
          </Col>
        </Form.Group>
      </Card>
    </React.Fragment>
  );
};

export const FieldSwitchDynamic = ({ fieldList }) => {
  return (
    <React.Fragment>
      {/* <Form.Label column className="text-sm-right" style={{ color: 'black' }}>
        {fieldList.caption} :
      </Form.Label> */}
      <Card>
        <Form.Check
          type="switch"
          id="switch-example"
          name="switch-example"
          label={fieldList.caption}
          style={{ color: "black" }}
          // disabled
        />
      </Card>
    </React.Fragment>
  );
};

export const FieldDropdownDynamic = ({ fieldList }) => {
  return (
    <React.Fragment>
      <Card>
        <Form.Group as={Row} className="mb-3">
          <Form.Label
            column
            className="text-sm-right"
            style={{ color: "black" }}
          >
            {fieldList.caption} :
          </Form.Label>
          <Col sm={7}>
            <Form.Select aria-label="Floating label select example">
              <option>Not chosen</option>
              {fieldList.list_values.map((listValue, index) => (
                <option key={index} value={listValue.value}>
                  {listValue.label}
                </option>
              ))}
            </Form.Select>
          </Col>
        </Form.Group>
      </Card>
    </React.Fragment>
  );
};

export const FieldFileUploadDynamic = ({ fieldList }) => (
  <React.Fragment>
    <Card>
      <Form.Group as={Row} className="mb-3">
        <Form.Label column className="text-sm-right" style={{ color: "black" }}>
          {fieldList.caption} :
        </Form.Label>
        <Col sm={7}>
          <Form.Control type="file" name="file" />
        </Col>
      </Form.Group>
    </Card>
  </React.Fragment>
);

export const FieldDatePickerDynamic = ({ fieldList }) => (
  <React.Fragment>
    <Card>
      <Form.Group as={Row} className="mb-3">
        <Form.Label column className="text-sm-right" style={{ color: "black" }}>
          {fieldList.caption} :
        </Form.Label>
        <Col sm={7}>
          <Form.Control type="date" placeholder="" defaultValue={""} />
        </Col>
      </Form.Group>
    </Card>
  </React.Fragment>
);

export const FieldTimePickerDynamic = ({ fieldList }) => (
  <React.Fragment>
    <Card>
      <Form.Group as={Row} className="mb-3">
        <Form.Label column className="text-sm-right" style={{ color: "black" }}>
          {fieldList.caption} :
        </Form.Label>
        <Col sm={7}>
          <Form.Control type="time" placeholder="" defaultValue={""} />
        </Col>
      </Form.Group>
    </Card>
  </React.Fragment>
);

export const FieldEmailInputDynamic = ({ fieldList }) => (
  <React.Fragment>
    <Card>
      <Form.Group as={Row} className="mb-3">
        <Form.Label column className="text-sm-right" style={{ color: "black" }}>
          {fieldList.caption} :
        </Form.Label>
        <Col sm={7}>
          <Form.Control
            type="email"
            placeholder=""
            // disabled
            defaultValue={""}
          />
        </Col>
      </Form.Group>
    </Card>
  </React.Fragment>
);

export const FieldPasswordInputDynamic = ({ fieldList }) => (
  <React.Fragment>
    <Card>
      <Form.Group as={Row} className="mb-3">
        <Form.Label column className="text-sm-right" style={{ color: "black" }}>
          {fieldList.caption} :
        </Form.Label>
        <Col sm={7}>
          <Form.Control
            type="password"
            placeholder=""
            // disabled
            defaultValue={""}
          />
        </Col>
      </Form.Group>
    </Card>
  </React.Fragment>
);
