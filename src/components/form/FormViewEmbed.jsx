import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import {
  Badge,
  Button,
  Card,
  Col,
  Container,
  Row,
  Modal,
} from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSave } from "@fortawesome/free-solid-svg-icons";
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

const FormViewEmbed = ({ id }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isValid, setIsValid] = useState(false);
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

  const handleSubmitButton = async () => {
    setIsValid(true);
  };

  console.log("fieldLayout", fieldLayout);

  const generateDOM = () => {
    return fieldLayout.map((field, index) => (
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

  console.log("fields", fields);
  return (
    <React.Fragment>
      <Card>
        <Card.Header>
          <Card.Title className="mb-0 text-center">
            {fields && fields.length > 0 ? (
              <>
                <h3>{fields[0]?.form?.name}</h3>
              </>
            ) : (
              <Col>
                <h5>Loading...</h5>
              </Col>
            )}
          </Card.Title>
        </Card.Header>
        <Card.Body>
          <div style={{ marginBottom: "20px" }}>
            <GridLayout
              className="fieldLayout"
              layout={fieldLayout}
              cols={12}
              rowHeight={30}
              width={1200}
            >
              {generateDOM()}
            </GridLayout>
          </div>
          <div>
            <Button
              variant="primary"
              className="float-end mt-n1 me-2"
              onClick={() => {
                //   handleSubmitButton(id);
                handleSubmitButton();
              }}
            >
              <FontAwesomeIcon icon={faSave} /> Submit
            </Button>
          </div>
        </Card.Body>
      </Card>

      <Modal show={isValid} onHide={() => setIsValid(false)}>
        <Modal.Header closeButton>Submit Form</Modal.Header>
        <Modal.Body className="text-center m-3">
          <p className="mb-0">This is just a form preview</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setIsValid(false)}>
            Close
          </Button>{" "}
        </Modal.Footer>
      </Modal>
    </React.Fragment>
  );
};

export default FormViewEmbed;
