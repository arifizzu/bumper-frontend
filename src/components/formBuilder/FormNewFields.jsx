import React, { useState, useEffect } from "react";
import { Card, Row, Button, Container } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { addField, removeField } from "../../redux/slices/fieldSlice";
import _ from "lodash";
import RGL, { WidthProvider } from "react-grid-layout";
import "../../grid-layout/css/styles.css";
import "../../grid-layout/css/example-styles.css";

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
} from "./fieldType/FieldType";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faX, faGrip } from "@fortawesome/free-solid-svg-icons";

const ReactGridLayout = WidthProvider(RGL);

const FormNewFields = ({ fieldLayout, setFieldLayout }) => {
  const dispatch = useDispatch();
  const fields = useSelector((state) => state.field.fields);
  const [layout, setLayout] = useState([{}]);
  const [layoutLength, setLayoutLength] = useState(0);
  // const [fieldLayout, setFieldLayout] = useState([]);

  const handleDrop = (e) => {
    e.preventDefault();
    const field = JSON.parse(e.dataTransfer.getData("field"));

    const newLayoutItem = {
      i: field.name + "_" + fields.length,
      x: 0,
      y: Infinity, // puts it at the bottom
      w: 3,
      h: 3,
      // isBounded: false,
      // isDraggable: false,
    };

    dispatch(addField(field));
    // setLayout([...layout, newLayoutItem]);
    setLayout((prevLayout) => [...prevLayout, newLayoutItem]);
    setLayoutLength(layoutLength + 1);
    console.log("field dropped", field);
  };

  useEffect(() => {
    console.log("fields updated:", fields);
  }, [fields]);

  useEffect(() => {
    console.log("layout updated:", layout);
  }, [layout]);

  useEffect(() => {
    console.log("layoutLength updated:", layoutLength);
  }, [layoutLength]);

  useEffect(() => {
    console.log("fieldLayout updated:", fieldLayout);
  }, [fieldLayout]);

  const generateDOM = () => {
    // console.log("generateDom");
    return fields.map((field, index) => (
      <div
        key={index}
        className="draggable-field"
        style={{ maxWidth: "100%", overflow: "hidden" }}
      >
        <div style={{ display: "flex", marginLeft: "3px" }}>
          <span style={{ flex: "1" }}>
            {field.name} - {index + 1}
          </span>
          <Button
            className="react-grid-dragHandleExample"
            style={{ marginRight: "3px", marginBottom: "5px" }}
          >
            <FontAwesomeIcon icon={faGrip} />
          </Button>
          <Button
            variant="danger"
            onClick={() => onRemoveItem(index)}
            style={{ marginRight: "3px", marginBottom: "5px" }}
          >
            <FontAwesomeIcon icon={faX} />
          </Button>
        </div>

        {field.name === "Text Input" && (
          <FieldTextInput
          // fieldLayout={fieldLayout}
          // setFieldLayout={setFieldLayout}
          />
        )}
        {field.name === "Textarea" && <FieldTextarea />}
        {field.name === "Number Input" && <FieldNumberInput />}
        {field.name === "Checkbox" && <FieldCheckbox />}
        {field.name === "Radio Button" && <FieldRadioButton />}
        {field.name === "Switch" && <FieldSwitch />}
        {field.name === "Dropdown" && <FieldDropdown />}
        {field.name === "File Upload" && <FieldFileUpload />}
        {field.name === "Date Picker" && <FieldDatePicker />}
        {field.name === "Time Picker" && <FieldTimePicker />}
        {field.name === "Email Input" && <FieldEmailInput />}
        {field.name === "Password Input" && <FieldPasswordInput />}
      </div>
    ));
  };

  const onRemoveItem = (index) => {
    console.log("removing", index);
    dispatch(removeField(index));
    setLayoutLength(layoutLength - 1);
  };

  const onLayoutChange = (newLayout) => {
    setLayout(newLayout);
    console.log("newLayout", newLayout);
    const updatedFieldLayout = fields.map((field, index) => ({
      ...field,
      layout: newLayout[index], // Assuming layout has the same length as fields
      detail: {
        caption: "",
        type_id: field.id,
        is_required: "",
        column_name: "",
        width: newLayout[index].w,
        height: newLayout[index].h,
        x_coordinate: newLayout[index].x,
        y_coordinate: newLayout[index].y,
      },
    }));

    // Update the fieldLayout state
    setFieldLayout(updatedFieldLayout);
  };

  const onResize = (layout, oldLayoutItem, layoutItem, placeholder) => {
    const newWidth = Math.round(
      layoutItem.w + (layoutItem.x - oldLayoutItem.x)
    );
    const newHeight = Math.round(
      layoutItem.h + (layoutItem.y - oldLayoutItem.y)
    );

    // Ensure minimum dimensions of 3x3
    if (newWidth < 3 || newHeight < 3) {
      layoutItem.w = Math.max(newWidth, 3);
      layoutItem.h = Math.max(newHeight, 3);
      placeholder.w = Math.max(newWidth, 3);
      placeholder.h = Math.max(newHeight, 3);
    }
  };

  return (
    <React.Fragment>
      <Card>
        <Card.Header>
          <Card.Title>Form Layout</Card.Title>
          <Row>
            <h6 className="card-subtitle text-muted">
              This will be the form preview
            </h6>
          </Row>
        </Card.Header>
        <Card.Body>
          <div
            onDrop={handleDrop}
            onDragOver={(e) => e.preventDefault()}
            style={{
              border: "1px solid black",
              minHeight: "1300px",
              background: "white",
            }}
          >
            <ReactGridLayout
              layout={fieldLayout.layout}
              onLayoutChange={onLayoutChange}
              onResize={onResize}
              draggableHandle=".react-grid-dragHandleExample"
              className="layout"
              cols={12}
              rowHeight={30}
              compactType={null}
              preventCollision={true}
              // minHeight="3"
            >
              {generateDOM()}
            </ReactGridLayout>
          </div>
        </Card.Body>
      </Card>
    </React.Fragment>
  );
};

export default FormNewFields;
