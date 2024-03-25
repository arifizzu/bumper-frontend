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
import {
  faFileExport,
  faMagnifyingGlassArrowRight,
  faMagnifyingGlass,
} from "@fortawesome/free-solid-svg-icons";
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
  const [showEmbedModal, setShowEmbedModal] = useState(false);
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

  const url = window.location.origin;

  const handleExportFormButton = (urlDownload) => {
    const newWindow = window.open(urlDownload, "_blank");
    if (newWindow) {
      setTimeout(() => {
        newWindow.print();
      }, 1000); // Wait for 1 second (adjust as needed)
    } else {
      alert("Popup blocked! Please allow popups and try again.");
    }
  };

  const handleViewPreviewButton = async (id) => {
    try {
      navigate(`/forms/view/preview/${id}`);
    } catch (error) {
      console.error("View form previewfailed:", error);
    }
  };

  const handleEmbedFormButton = async () => {
    setShowEmbedModal(true);
  };

  const generateDOM = () => {
    return fieldLayout.map((field, index) => (
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
          <Card.Title className="mb-0 ">Form Preview</Card.Title>

          <Button
            variant="primary"
            className="float-end mt-n1 me-2"
            onClick={() => {
              handleExportFormButton(url + "/forms/view/embed/" + id);
            }}
          >
            <FontAwesomeIcon icon={faFileExport} /> Export Form
          </Button>

          <Button
            variant="info"
            className="float-end mt-n1 me-2"
            onClick={() => {
              handleEmbedFormButton();
            }}
          >
            <FontAwesomeIcon icon={faMagnifyingGlassArrowRight} /> Embed Form
          </Button>

          <Button
            variant="info"
            className="float-end mt-n1 me-2"
            onClick={() => {
              handleViewPreviewButton(id);
            }}
          >
            <FontAwesomeIcon icon={faMagnifyingGlass} /> Preview Embedded Form
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

      <Modal show={showEmbedModal} onHide={() => setShowEmbedModal(false)}>
        <Modal.Header closeButton>Embed Form</Modal.Header>
        <Modal.Body className="text-center m-3">
          <p className="mb-0">
            Please copy the URL link provided below and embed it within an
            iframe on your desired website or page to integrate the form
            seamlessly:
          </p>
          <p className="mb-0">
            URL:{" "}
            <a href={url}>
              {url}/forms/view/embed/{id}
            </a>
          </p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowEmbedModal(false)}>
            Close
          </Button>{" "}
        </Modal.Footer>
      </Modal>
    </React.Fragment>
  );
};

export default FormView;
