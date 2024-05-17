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
import { faSave, faFileExport } from "@fortawesome/free-solid-svg-icons";
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
  showFieldStart,
  showFieldSuccess,
  showFieldFailure,
} from "../../redux/slices/fieldSlice";

import { getFields } from "../../repositories/api/services/fieldServices";

import RGL, { WidthProvider } from "react-grid-layout";
const ReactGridLayout = WidthProvider(RGL);
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
    h: field.location.height,
    w: field.location.width,
    x: field.location.x_coordinate,
    y: field.location.y_coordinate,
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
          {field.detail.field_type.name === "Text Input" && (
            <FieldTextInputDynamic fieldList={field.detail} />
          )}
          {field.detail.field_type.name === "Textarea" && (
            <FieldTextareaDynamic fieldList={field.detail} />
          )}
          {field.detail.field_type.name === "Number Input" && (
            <FieldNumberInputDynamic fieldList={field.detail} />
          )}
          {field.detail.field_type.name === "Checkbox" && (
            <FieldCheckboxDynamic fieldList={field.detail} />
          )}
          {field.detail.field_type.name === "Radio Button" && (
            <FieldRadioButtonDynamic fieldList={field.detail} />
          )}
          {field.detail.field_type.name === "Switch" && (
            <FieldSwitchDynamic fieldList={field.detail} />
          )}
          {field.detail.field_type.name === "Dropdown" && (
            <FieldDropdownDynamic fieldList={field.detail} />
          )}
          {field.detail.field_type.name === "File Upload" && (
            <FieldFileUploadDynamic fieldList={field.detail} />
          )}
          {field.detail.field_type.name === "Date Picker" && (
            <FieldDatePickerDynamic fieldList={field.detail} />
          )}
          {field.detail.field_type.name === "Time Picker" && (
            <FieldTimePickerDynamic fieldList={field.detail} />
          )}
          {field.detail.field_type.name === "Email Input" && (
            <FieldEmailInputDynamic fieldList={field.detail} />
          )}
          {field.detail.field_type.name === "Password Input" && (
            <FieldPasswordInputDynamic fieldList={field.detail} />
          )}
        </div>
      </div>
    ));
  };

  console.log("fields", fields);
  return (
    <React.Fragment>
      <Container id="form-content" fluid className="p-0">
        <Card>
          <Card.Header>
            {/* <Card.Title className="mb-0 text-center">
              {fields && fields.length > 0 ? (
                <>
                  <h3>{fields[0]?.form?.name}</h3>
                </>
              ) : (
                <Col>
                  <h5>Loading...</h5>
                </Col>
              )}
            </Card.Title> */}
          </Card.Header>
          <Card.Body>
            <div style={{ marginBottom: "20px" }}>
              <div
                style={{
                  //   border: "1px solid black",
                  // minHeight: "400px",
                  background: "white",
                  marginTop: "10px",
                }}
              >
                <h2 className="mt-3 mb-4 text-center">
                  {fields && fields.length > 0 ? (
                    <>
                      <h3>{fields[0]?.form?.name}</h3>
                    </>
                  ) : (
                    <Col>
                      <h5>Loading...</h5>
                    </Col>
                  )}
                </h2>
                <ReactGridLayout
                  className="fieldLayout"
                  layout={fieldLayout}
                  cols={12}
                  rowHeight={30}
                  width={1200}
                >
                  {generateDOM()}
                </ReactGridLayout>
              </div>
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
      </Container>

      <Modal show={isValid} onHide={() => setIsValid(false)} centered>
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
