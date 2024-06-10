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

export const FieldTextInputDynamic = ({ fieldList, onChange }) => {
  const handleInputChange = (e) => {
    const fieldName = e.target.name;
    const value = e.target.value;
    const tableName = fieldList.table_name;
    const columnName = fieldList.column_name;
    onChange(fieldName, tableName, columnName, value);
  };

  console.log("fieldList in dynamic", fieldList);

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
            type="text"
            name={fieldList.caption} // Use field caption as the input name
            placeholder=""
            defaultValue={""}
            onChange={handleInputChange} // Call handleInputChange on input change
          />
        </Col>
      </Form.Group>
    </React.Fragment>
  );
};

export const FieldTextareaDynamic = ({ fieldList, onChange }) => {
  const handleInputChange = (e) => {
    const fieldName = e.target.name;
    const value = e.target.value;
    const tableName = fieldList.table_name;
    const columnName = fieldList.column_name;
    onChange(fieldName, tableName, columnName, value);
  };
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
            type="textarea"
            name={fieldList.caption} // Use field caption as the input name
            placeholder=""
            defaultValue={""}
            onChange={handleInputChange} // Call handleInputChange on input change
          />
        </Col>
      </Form.Group>
    </React.Fragment>
  );
};

export const FieldNumberInputDynamic = ({ fieldList, onChange }) => {
  const handleInputChange = (e) => {
    const fieldName = e.target.name;
    const value = e.target.value;
    const tableName = fieldList.table_name;
    const columnName = fieldList.column_name;
    onChange(fieldName, tableName, columnName, value);
  };
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
            onChange={handleInputChange} // Call handleInputChange on input change
          />
        </Col>
      </Form.Group>
    </React.Fragment>
  );
};

export const FieldCheckboxDynamic = ({ fieldList, onChange }) => {
  const [selectedValues, setSelectedValues] = useState([]);

  const handleInputChange = (e) => {
    const fieldName = e.target.name;
    const value = e.target.value;
    const tableName = fieldList.table_name;
    const columnName = fieldList.column_name;

    let updatedValues;
    if (e.target.checked) {
      // Add the value to the array if it's checked
      updatedValues = [...selectedValues, value];
    } else {
      // Remove the value from the array if it's unchecked
      updatedValues = selectedValues.filter((val) => val !== value);
    }

    setSelectedValues(updatedValues);
    const valueString = updatedValues.join(","); // Create a comma-separated string
    onChange(fieldName, tableName, columnName, valueString);
  };

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
              onChange={handleInputChange}
            />
          ))}
        </Col>
      </Form.Group>
    </React.Fragment>
  );
};

export const FieldRadioButtonDynamic = ({ fieldList, onChange }) => {
  const handleInputChange = (e) => {
    const fieldName = e.target.name;
    const value = e.target.checked ? e.target.value : ""; // Use checked value or empty string if unchecked
    const tableName = fieldList.table_name;
    const columnName = fieldList.column_name;
    onChange(fieldName, tableName, columnName, value);
  };

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
              onChange={handleInputChange}
            />
          ))}
        </Col>
      </Form.Group>
    </React.Fragment>
  );
};

export const FieldSwitchDynamic = ({ fieldList, onChange }) => {
  const handleInputChange = (e) => {
    const fieldName = e.target.name;
    const value = e.target.checked ? "1" : "0"; // Convert to 1 if checked, 0 if unchecked
    const tableName = fieldList.table_name;
    const columnName = fieldList.column_name;
    onChange(fieldName, tableName, columnName, value);
  };

  return (
    <React.Fragment>
      <Form.Check
        type="switch"
        id={fieldList.caption}
        name={fieldList.caption} // Use field caption as the input name
        label={fieldList.caption}
        style={{ color: "black" }}
        onChange={handleInputChange}
      />
    </React.Fragment>
  );
};

export const FieldDropdownDynamic = ({ fieldList, onChange }) => {
  const handleInputChange = (e) => {
    const fieldName = e.target.name;
    const value = e.target.value === "" ? null : e.target.value;
    const tableName = fieldList.table_name;
    const columnName = fieldList.column_name;
    onChange(fieldName, tableName, columnName, value);
  };

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
            onChange={handleInputChange}
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

export const FieldFileUploadDynamic = ({ fieldList, onChange }) => {
  const handleInputChange = (e) => {
    const fieldName = e.target.name;
    const value = e.target.files[0]; // For file input, get the first selected file
    const tableName = fieldList.table_name;
    const columnName = fieldList.column_name;
    onChange(fieldName, tableName, columnName, value);
  };

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
            onChange={handleInputChange}
          />
        </Col>
      </Form.Group>
    </React.Fragment>
  );
};

export const FieldDatePickerDynamic = ({ fieldList, onChange }) => {
  const handleInputChange = (e) => {
    const fieldName = e.target.name;
    const value = e.target.value;
    const tableName = fieldList.table_name;
    const columnName = fieldList.column_name;
    onChange(fieldName, tableName, columnName, value);
  };

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
            onChange={handleInputChange}
          />
        </Col>
      </Form.Group>
    </React.Fragment>
  );
};

export const FieldTimePickerDynamic = ({ fieldList, onChange }) => {
  const handleInputChange = (e) => {
    const fieldName = e.target.name;
    const value = e.target.value;
    const tableName = fieldList.table_name;
    const columnName = fieldList.column_name;
    onChange(fieldName, tableName, columnName, value);
  };

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
            onChange={handleInputChange}
          />
        </Col>
      </Form.Group>
    </React.Fragment>
  );
};

export const FieldEmailInputDynamic = ({ fieldList, onChange }) => {
  const handleInputChange = (e) => {
    const fieldName = e.target.name;
    const value = e.target.value;
    const tableName = fieldList.table_name;
    const columnName = fieldList.column_name;
    onChange(fieldName, tableName, columnName, value);
  };

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
            onChange={handleInputChange}
          />
        </Col>
      </Form.Group>
    </React.Fragment>
  );
};

export const FieldPasswordInputDynamic = ({ fieldList, onChange }) => {
  const handleInputChange = (e) => {
    const fieldName = e.target.name;
    const value = e.target.value;
    const tableName = fieldList.table_name;
    const columnName = fieldList.column_name;
    onChange(fieldName, tableName, columnName, value);
  };

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
            onChange={handleInputChange}
          />
        </Col>
      </Form.Group>
    </React.Fragment>
  );
};
