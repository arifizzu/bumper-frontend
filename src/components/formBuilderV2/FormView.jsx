import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import html2pdf from "html2pdf.js";
// import * as FileSaver from "file-saver";
// import * as XLSX from "xlsx";
// import htmlDocx from "html-docx-js";

import {
  Badge,
  Button,
  Card,
  Col,
  Container,
  Row,
  Modal,
  Dropdown,
  DropdownButton,
} from "react-bootstrap";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFileExport,
  faMagnifyingGlassArrowRight,
  faMagnifyingGlass,
} from "@fortawesome/free-solid-svg-icons";

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
  showFormStart,
  showFormSuccess,
  showFormFailure,
} from "../../redux/slices/formSlice";

import { showForm } from "../../repositories/api/services/formServices";

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

const FormView = ({ id }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [showEmbedModal, setShowEmbedModal] = useState(false);
  const fields = useSelector((state) => state.field.fields);
  const form = useSelector((state) => state.form.form);

  useEffect(() => {
    const fetchForm = async () => {
      try {
        dispatch(showFormStart());
        const formData = await showForm(id);
        dispatch(showFormSuccess(formData));
        console.log("formData", formData);
      } catch (error) {
        dispatch(showFormFailure(error));
      }
    };

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

    fetchForm();
    fetchFields();
  }, []);

  const fieldLayout = fields.map((field) => ({
    h: field.location.height,
    w: field.location.width,
    x: field.location.x_coordinate,
    y: field.location.y_coordinate,
    detail: field,
  }));

  console.log("fieldLayout", fieldLayout);

  const url = window.location.origin;

  const handleExportFormButton = (format) => {
    const element = document.getElementById("form-content");

    if (format === "pdf") {
      const opt = {
        margin: 0.1,
        filename: `${form.name} Form.pdf`,
        image: { type: "jpeg", quality: 0.98 },
        html2canvas: { scale: 2 },
        jsPDF: { unit: "in", format: "letter", orientation: "portrait" },
      };
      html2pdf().from(element).set(opt).save();
    }
    // else if (format === "word") {
    //   const content = `
    //       <html>
    //         <head>
    //           <meta charset="utf-8">
    //           <title>${form.name}</title>
    //         </head>
    //         <body>
    //           ${element.innerHTML}
    //         </body>
    //       </html>
    //     `;
    //   const converted = htmlDocx.asBlob(content);
    //   FileSaver.saveAs(converted, `${form.name} Form.docx`);
    // }
    // else if (format === "csv") {
    //   const rows = Array.from(element.querySelectorAll("tr"));
    //   const csvData = rows
    //     .map((row) => {
    //       const columns = Array.from(row.querySelectorAll("td, th"));
    //       return columns.map((column) => column.innerText).join(",");
    //     })
    //     .join("\n");

    //   const blob = new Blob([csvData], { type: "text/csv;charset=utf-8;" });
    //   FileSaver.saveAs(blob, `${form.name} Form.csv`);
    // }
  };

  const handleViewPreviewButton = async (id) => {
    try {
      navigate(`/form-builder-v2/view/preview/${id}`);
    } catch (error) {
      console.error("View form preview failed:", error);
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

  return (
    <React.Fragment>
      <Card>
        <Card.Header>
          <Card.Title className="mb-0 text-center">Form Details</Card.Title>
        </Card.Header>
        <Card.Body className="text-left">
          <Row>
            <Col md="6" xl="">
              <h5>Name: {form ? form.name : "Loading..."}</h5>
              <h5>Short Name: {form ? form.short_name : "Loading..."}</h5>
            </Col>
            <Col md="6" xl="">
              <h5>Created By: {form ? form.created_by.name : "Loading..."}</h5>
              <h5>Created At: {form ? form.created_at : "Loading..."}</h5>
            </Col>
          </Row>
        </Card.Body>
        <hr className="my-0" />
      </Card>
      <Card>
        <Card.Header>
          <Card.Title className="mb-0 ">Form Preview</Card.Title>
          <DropdownButton
            variant="primary"
            className="float-end mt-n1 me-2"
            title={
              <>
                <FontAwesomeIcon icon={faFileExport} /> Export Form
              </>
            }
          >
            <Dropdown.Item onClick={() => handleExportFormButton("pdf")}>
              PDF
            </Dropdown.Item>
            {/* <Dropdown.Item onClick={() => handleExportFormButton("word")}>
              Word
            </Dropdown.Item>
            <Dropdown.Item onClick={() => handleExportFormButton("csv")}>
              CSV
            </Dropdown.Item> */}
          </DropdownButton>

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
        <div
          style={{
            border: "1px solid black",
            background: "white",
            marginLeft: "30px",
            marginRight: "30px",
          }}
        >
          <Card.Body>
            <Container
              id="form-content"
              fluid
              className="p-0"
              style={{ width: "800px", maxWidth: "100%", overflow: "hidden" }}
            >
              <div style={{ background: "white" }}>
                <h3 className="mt-3 mb-4 text-center">
                  {form ? form.name : "Loading..."}
                </h3>
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
            </Container>
          </Card.Body>
        </div>
      </Card>

      <Modal
        show={showEmbedModal}
        onHide={() => setShowEmbedModal(false)}
        centered
      >
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
