import React, { useEffect, useState, useRef } from "react";
import { Helmet } from "react-helmet-async";
import { Formik } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import Select from "react-select";

import {
  Button,
  Card,
  Container,
  Col,
  Row,
  Form,
  InputGroup,
  Modal,
} from "react-bootstrap";
import dragula from "react-dragula";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEdit,
  faAdd,
  faPlus,
  faSave,
  faX,
  faTag,
  faDatabase,
  faTableColumns,
} from "@fortawesome/free-solid-svg-icons";

import { useDispatch, useSelector } from "react-redux";

import {
  createDatalistFilter,
  storeDatalistFilter,
  deleteDatalistFilter,
  getDatalistFilters,
  updateDatalistFilter,
  updateDatalistFilterOrder,
} from "../../repositories/api/services/datalistFilterServices";
import {
  getDatalistFiltersStart,
  getDatalistFiltersSuccess,
  getDatalistFiltersFailure,
  createDatalistFilterStart,
  createDatalistFilterSuccess,
  createDatalistFilterFailure,
} from "../../redux/slices/datalistFilterSlice";

import {
  showDatalist,
  updateDatalist,
} from "../../repositories/api/services/datalistServices";
import {
  showDatalistStart,
  showDatalistSuccess,
  showDatalistFailure,
} from "../../redux/slices/datalistSlice";

import { getGroups } from "../../repositories/api/services/groupServices";
import {
  getGroupsStart,
  getGroupsSuccess,
  getGroupsFailure,
} from "../../redux/slices/groupSlice";

import { getForms } from "../../repositories/api/services/formServices";
import {
  getFormsStart,
  getFormsSuccess,
  getFormsFailure,
} from "../../redux/slices/formSlice";

import {
  getTables,
  getColumns,
} from "../../repositories/api/services/dbRetrievalServices";

import {
  getTablesStart,
  getTablesSuccess,
  getTablesFailure,
  getColumnsStart,
  getColumnsSuccess,
  getColumnsFailure,
} from "../../redux/slices/dbRetrievalSlice";

const schemaDatalist = Yup.object().shape({
  title: Yup.string().required("Title is required"),
  description: Yup.string().required("Description is required"),
  form_id: Yup.number(),
  group_id: Yup.number(),
});

const schemaDatalistFilter = Yup.object().shape({
  label: Yup.string().required("Label is required"),
  table_name: Yup.string().required("Table Name is required"),
  column_name: Yup.string().required("Column Name is required"),
});

const DatalistEdit = ({ id }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const datalist = useSelector((state) => state.datalist.datalist);
  const [showModalDatalistDetail, setShowDatalistDetail] = useState(false);
  const { groups } = useSelector((state) => state.group);
  const formOptions = useSelector((state) => state.form.forms);

  const toggleModalDatalistDetail = () => {
    setShowDatalistDetail(
      (prevShowModalDatalistDetail) => !prevShowModalDatalistDetail
    );
  };

  useEffect(() => {
    const fetchDatalist = async () => {
      try {
        dispatch(showDatalistStart());
        const datalist = await showDatalist(id);
        console.log("datalist", datalist);
        dispatch(showDatalistSuccess(datalist));
      } catch (error) {
        dispatch(showDatalistFailure(error));
      }
    };

    const fetchGroups = async () => {
      try {
        dispatch(getGroupsStart());
        const groupData = await getGroups();
        // console.log("groupData", groupData);
        dispatch(getGroupsSuccess(groupData));
      } catch (error) {
        dispatch(getGroupsFailure(error));
      }
    };

    const fetchForms = async () => {
      try {
        dispatch(getFormsStart());
        const form = await getForms();
        // console.log("form", form);
        dispatch(getFormsSuccess(form));
      } catch (error) {
        dispatch(getFormsFailure(error));
      }
    };

    fetchDatalist();
    fetchGroups();
    fetchForms();
  }, []);

  return (
    <React.Fragment>
      <Container fluid className="p-0">
        <Row>
          <Col md={12}>
            <Card>
              <Card.Header>
                <Row>
                  <Col>
                    {" "}
                    <Card.Title>Datalist Detail</Card.Title>
                  </Col>
                  <Col>
                    <Button
                      variant="warning"
                      className="float-end mt-n1 me-2"
                      onClick={toggleModalDatalistDetail}
                    >
                      <FontAwesomeIcon icon={faEdit} /> Edit Form Detail
                    </Button>
                  </Col>
                </Row>
              </Card.Header>
              <Card.Body className="text-left">
                <Row>
                  <Col md="3" xl="">
                    <h5>Title:</h5>
                    <h5>Description:</h5>
                    <h5>Form Related:</h5>
                    <h5>Group:</h5>
                  </Col>
                  <Col md="9" xl="">
                    <h5>{datalist ? datalist.title : "Loading..."}</h5>
                    <h5>{datalist ? datalist.description : "Loading..."}</h5>
                    <h5>
                      {datalist && datalist.form
                        ? datalist.form.name
                        : "No Form Related"}
                    </h5>
                    <h5>
                      {datalist && datalist.group
                        ? datalist.group.name
                        : "No Group"}
                    </h5>
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          </Col>
        </Row>
        <DatalistLayout datalist={datalist} />
      </Container>

      <Modal
        show={showModalDatalistDetail}
        onHide={toggleModalDatalistDetail}
        centered
      >
        <Modal.Header closeButton>Edit Datalist</Modal.Header>
        <Modal.Body className="text-center m-3">
          <Formik
            validationSchema={schemaDatalist}
            // onSubmit={console.log}
            onSubmit={async (values, { setSubmitting, setErrors }) => {
              try {
                setSubmitting(true);
                const result = await updateDatalist(id, values);
                if (result.success === true) {
                  console.log("Datalist updated successfully");
                  window.location.reload();
                  toggleModalDatalistDetail();
                } else if (result.name && result.name.length > 0) {
                  setErrors({ name: result.name[0] }); // Set the error for the name field
                } else {
                  console.error("Error update form:", result);
                }
              } catch (error) {
                console.error("Unexpected error:", error);
                setErrors({ name: error.name[0] });
              } finally {
                setSubmitting(false); // Reset form submitting state
              }
            }}
            initialValues={{
              title: (datalist && datalist.title) || "",
              description: (datalist && datalist.description) || "",
              group_id: (datalist && datalist.group_id) || "",
              form_id: (datalist && datalist.form_id) || "",
            }}
          >
            {({
              handleSubmit,
              handleChange,
              handleBlur,
              values,
              touched,
              isValid,
              errors,
            }) => (
              <Form noValidate onSubmit={handleSubmit}>
                <Form.Group as={Row} className="mb-3">
                  <Form.Label column sm={3} className="text-sm-right">
                    Title*
                  </Form.Label>
                  <Col sm={9}>
                    <Form.Control
                      type="text"
                      name="title"
                      value={values.title}
                      onChange={handleChange}
                      isValid={touched.title && !errors.title}
                      isInvalid={touched.title && !!errors.title}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.title}
                    </Form.Control.Feedback>
                  </Col>
                </Form.Group>
                <Form.Group as={Row} className="mb-3">
                  <Form.Label column sm={3} className="text-sm-right">
                    Description*
                  </Form.Label>
                  <Col sm={9}>
                    <Form.Control
                      type="text"
                      name="description"
                      value={values.description}
                      onChange={handleChange}
                      isValid={touched.description && !errors.description}
                      isInvalid={touched.description && !!errors.description}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.description}
                    </Form.Control.Feedback>
                  </Col>
                </Form.Group>
                <Form.Group as={Row} className="mb-3">
                  <Form.Label column sm={3} className="text-sm-right">
                    Form Related
                  </Form.Label>
                  <Col sm={9}>
                    <Form.Select
                      name="form_id"
                      onChange={(e) => {
                        handleChange(e);
                      }}
                      value={values.form_id || ""}
                    >
                      <option value="">No Form Related</option>
                      {formOptions.map((formOption) => (
                        <option key={formOption.id} value={formOption.id}>
                          {formOption.name} ({formOption.short_name})
                        </option>
                      ))}
                    </Form.Select>
                  </Col>
                </Form.Group>
                <Form.Group as={Row} className="mb-3">
                  <Form.Label column sm={3} className="text-sm-right">
                    Group
                  </Form.Label>
                  <Col sm={9}>
                    <Form.Select
                      name="group_id"
                      onChange={(e) => {
                        handleChange(e);
                      }}
                      value={values.group_id || ""}
                    >
                      <option value="">No Group</option>
                      {groups.map((group) => (
                        <option key={group.id} value={group.id}>
                          {group.name}
                        </option>
                      ))}
                    </Form.Select>
                  </Col>
                </Form.Group>
                <Button
                  type="submit"
                  variant="success"
                  className="float-end mt-n1 me-2"
                >
                  Save Form Detail
                </Button>
              </Form>
            )}
          </Formik>
        </Modal.Body>
      </Modal>
    </React.Fragment>
  );
};

// Dummy unique ID generator
let idCounter = 100;
let filterOrder = 0;
let columnOrder = 0;
let rowActionOrder = 0;
let actionOrder = 0;

const DatalistLayout = ({ datalist }) => {
  const dispatch = useDispatch();

  const [datalistColumns, setDatalistColumns] = useState([]);
  const [datalistFilters, setDatalistFilters] = useState([]);
  const [datalistRowActions, setDatalistRowActions] = useState([]);
  const [datalistActions, setDatalistActions] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [currentType, setCurrentType] = useState("");
  const [currentSetter, setCurrentSetter] = useState(() => {});
  const [currentItem, setCurrentItem] = useState(null);
  const [storeOrUpdate, setStoreOrUpdate] = useState("store");

  useEffect(() => {
    if (datalist && datalist.filters) {
      const mappedFilters = datalist.filters.map((filter, index) => {
        filterOrder++;
        return {
          id: idCounter++,
          itemData: filter,
        };
      });
      setDatalistFilters([]);
      setDatalistFilters(mappedFilters);
    }
  }, [datalist]);

  const columnsRef = useRef(null);
  const filtersRef = useRef(null);
  const rowActionsRef = useRef(null);
  const actionsRef = useRef(null);

  const handleClose = () => {
    setShowModal(false);
    setCurrentItem(null); // Reset the current item on close
  };

  const handleShow = (type, setter, item = null) => {
    setCurrentType(type);
    setCurrentSetter(() => setter);
    setCurrentItem(item); // Set the current item for editing
    setShowModal(true);
    console.log("currentType dalam handleShow", currentType);
    console.log("item dalam handleShow", item);
  };

  const handleAddItem = (itemData) => {
    if (currentItem) {
      // Edit existing item
      currentSetter((prevItems) =>
        prevItems.map((item) =>
          item.id === currentItem.id ? { ...item, itemData } : item
        )
      );
    } else {
      // Add new item
      currentSetter((prevItems) => [
        ...prevItems,
        {
          id: ++idCounter,
          itemData: itemData,
        },
      ]);
    }
    handleClose();
  };

  const deleteItem = async (setter, id) => {
    try {
      const deletedItem = datalistFilters.find((item) => item.id === id);
      await deleteDatalistFilter(deletedItem.itemData.id);
      setter((prevItems) => prevItems.filter((item) => item.id !== id));
    } catch (error) {
      console.error("Error deleting item:", error);
    }
  };

  const onEdit = (item, type, setter) => {
    setStoreOrUpdate("update");
    setCurrentItem(item);
    handleShow(type, setter, item);
    console.log("item", item);
    console.log("type", type);
  };

  const getOrder = (container, items) => {
    const order = [];
    container.querySelectorAll(".item").forEach((item) => {
      const itemId = item.dataset.id;
      const itemData = items.find((i) => i.id.toString() === itemId).itemData;
      order.push({ id: itemId, itemData });
    });
    return order;
  };

  useEffect(() => {
    const drakeColumns = dragula([columnsRef.current], {
      direction: "horizontal",
    }).on("dragend", () => {
      console.log(
        "Columns order:",
        getOrder(columnsRef.current, datalistColumns)
      );
    });

    const drakeFilters = dragula([filtersRef.current], {
      direction: "horizontal",
    }).on("dragend", () => {
      console.log(
        "Filters order:",
        getOrder(filtersRef.current, datalistFilters)
      );
    });

    const drakeRowActions = dragula([rowActionsRef.current], {
      direction: "horizontal",
    }).on("dragend", () => {
      console.log(
        "Row Actions order:",
        getOrder(rowActionsRef.current, datalistRowActions)
      );
    });

    const drakeActions = dragula([actionsRef.current], {
      direction: "horizontal",
    }).on("dragend", () => {
      console.log(
        "Actions order:",
        getOrder(actionsRef.current, datalistActions)
      );
    });

    return () => {
      drakeColumns.destroy();
      drakeFilters.destroy();
      drakeRowActions.destroy();
      drakeActions.destroy();
    };
  }, [datalistColumns, datalistFilters, datalistRowActions, datalistActions]);

  useEffect(() => {
    console.log("datalistColumns", datalistColumns);
  }, [datalistColumns]);

  useEffect(() => {
    console.log("datalistFilters", datalistFilters);
  }, [datalistFilters]);

  useEffect(() => {
    console.log("datalistRowActions", datalistRowActions);
  }, [datalistRowActions]);

  useEffect(() => {
    console.log("datalistActions", datalistActions);
  }, [datalistActions]);

  useEffect(() => {
    const fetchTables = async () => {
      try {
        dispatch(getTablesStart());
        const tableOptions = await getTables();
        dispatch(getTablesSuccess(tableOptions));
      } catch (error) {
        dispatch(getTablesFailure(error));
      }
    };

    fetchTables();
  }, []);

  return (
    <React.Fragment>
      <Container fluid className="p-0">
        <Button
          variant="success"
          className="float-end mt-n1"
          onClick={async () => {
            console.log(datalistFilters, "datalistFilters");
            console.log(datalistColumns, "datalistColumns");
            console.log(datalistRowActions, "datalistRowActions");
            console.log(datalistActions, "datalistActions");

            const newOrder = getOrder(filtersRef.current, datalistFilters);

            for (let index = 0; index < newOrder.length; index++) {
              const item = newOrder[index];
              try {
                const result = await updateDatalistFilterOrder(
                  item.itemData.id,
                  { order: index + 1 }
                );
                if (result.success === true) {
                  console.log("Datalist Filter Order updated successfully");
                } else {
                  console.error(
                    "Error updating datalist filter order:",
                    result
                  );
                }
              } catch (error) {
                console.error("Error updating datalist filter order:", error);
              }
            }

            console.log("hehe", newOrder);
          }}
        >
          <FontAwesomeIcon icon={faSave} /> Save Datalist
        </Button>
        <h1 className="h3 mb-3">Datalist Layout</h1>
        <Card>
          <Row>
            <Col>
              <Segment
                name="Filter"
                items={datalistFilters}
                onAdd={() => handleShow("Filter", setDatalistFilters)}
                onDelete={(id) => deleteItem(setDatalistFilters, id)}
                containerRef={filtersRef}
                borderStyle={{ border: "2px solid blue" }}
                onEdit={onEdit}
                setStoreOrUpdate={setStoreOrUpdate}
              />
            </Col>
          </Row>
          <Row>
            <Col lg="9" xl="9">
              <Segment
                name="Column"
                items={datalistColumns}
                onAdd={() => handleShow("Column", setDatalistColumns)}
                onDelete={(id) => deleteItem(setDatalistColumns, id)}
                containerRef={columnsRef}
                borderStyle={{ border: "2px solid blue" }}
                onEdit={onEdit}
                setStoreOrUpdate={setStoreOrUpdate}
              />
            </Col>
            <Col lg="3" xl="3">
              <Segment
                name="Row Action"
                items={datalistRowActions}
                onAdd={() => handleShow("Row Action", setDatalistRowActions)}
                onDelete={(id) => deleteItem(setDatalistRowActions, id)}
                containerRef={rowActionsRef}
                borderStyle={{ border: "2px solid blue" }}
                onEdit={onEdit}
                setStoreOrUpdate={setStoreOrUpdate}
              />
            </Col>
          </Row>
          <Row>
            <Col>
              <Segment
                name="Action"
                items={datalistActions}
                onAdd={() => handleShow("Action", setDatalistActions)}
                onDelete={(id) => deleteItem(setDatalistActions, id)}
                containerRef={actionsRef}
                borderStyle={{ border: "2px solid blue" }}
                onEdit={onEdit}
                setStoreOrUpdate={setStoreOrUpdate}
              />
            </Col>
          </Row>
        </Card>
      </Container>

      <Modal show={showModal} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Add New {currentType} Item</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {currentType === "Filter" && (
            <DatalistFilterForm
              datalist={datalist}
              handleAddItem={handleAddItem}
              handleClose={handleClose}
              storeOrUpdate={storeOrUpdate}
              setStoreOrUpdate={setStoreOrUpdate}
              currentItem={currentItem}
            />
          )}
          {currentType === "Column" && (
            <Form>
              <Form.Group>
                <Form.Label>hehe</Form.Label>
                <Form.Control
                  type="text"
                  placeholder={`Enter ${currentType} item text`}
                />
              </Form.Group>
            </Form>
          )}
          {currentType === "Row Action" && (
            <Form>
              <Form.Group>
                <Form.Label>ayam</Form.Label>
                <Form.Control
                  type="text"
                  placeholder={`Enter ${currentType} item text`}
                />
              </Form.Group>
            </Form>
          )}
          {currentType === "Action" && (
            <Form>
              <Form.Group>
                <Form.Label>itik</Form.Label>
                <Form.Control
                  type="text"
                  placeholder={`Enter ${currentType} item text`}
                />
              </Form.Group>
            </Form>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleAddItem}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </React.Fragment>
  );
};

const Segment = ({
  name,
  items,
  onAdd,
  onDelete,
  containerRef,
  borderStyle,
  onEdit,
  setStoreOrUpdate,
}) => {
  const getColumnSizes = () => {
    if (name === "Filter" || name === "Column" || name === "Action") {
      return { xs: 3, sm: 3, md: 3, lg: 3, xl: 3 };
    } else if (name === "Row Action") {
      return { xs: 6, sm: 6, md: 6, lg: 6, xl: 6 };
    }
  };

  const columnSizes = getColumnSizes();

  return (
    <Card style={borderStyle}>
      <Card.Header>
        <Card.Title>
          {name}
          <Button
            variant="primary"
            className="float-end mt-n1"
            onClick={() => {
              onAdd();
              setStoreOrUpdate("store");
            }}
          >
            <FontAwesomeIcon icon={faPlus} /> Add {name}
          </Button>
        </Card.Title>
      </Card.Header>
      <Card.Body>
        <div
          ref={containerRef}
          style={{
            display: "flex",
            flexDirection: "row",
            flexWrap: "nowrap",
            maxHeight: "300px",
            maxWidth: "1500px",
            overflowX: "auto",
          }}
        >
          {items.map((item) => (
            <Col
              key={item.id}
              {...columnSizes}
              className="item"
              data-id={item.id}
            >
              <div style={{ marginRight: "10px", flex: "0 0 auto" }}>
                {name === "Filter" && (
                  <DatalistFilter
                    {...item}
                    onDelete={() => onDelete(item.id)}
                    onEdit={() => onEdit(item, "Filter")}
                  />
                )}
                {/* Similar updates for other item types */}
              </div>
            </Col>
          ))}
        </div>
      </Card.Body>
    </Card>
  );
};

const DatalistFilter = ({ id, onDelete, onEdit, itemData }) => (
  <Card className="mb-3 bg-light cursor-grab border">
    <Card.Body className="p-3">
      <div className="float-end">
        <Button
          variant="danger"
          className="float-end mt-n1 me-2"
          size="sm"
          onClick={onDelete}
        >
          <FontAwesomeIcon icon={faX} />
        </Button>
        <Button
          variant="warning"
          className="float-end mt-n1 me-2"
          size="sm"
          onClick={onEdit}
        >
          <FontAwesomeIcon icon={faEdit} />
        </Button>
      </div>
      <p>Filter - {id}</p>
      <hr />
      <p style={{ color: "blue" }}>
        <FontAwesomeIcon icon={faTag} /> Label: {itemData.label}
      </p>
      <p style={{ color: "blue" }}>
        <FontAwesomeIcon icon={faDatabase} /> Table Name: {itemData.table_name}
      </p>
      <p style={{ color: "blue" }}>
        <FontAwesomeIcon icon={faTableColumns} /> Column Name:{" "}
        {itemData.column_name}
      </p>
    </Card.Body>
  </Card>
);

const DatalistFilterForm = ({
  datalist,
  handleAddItem,
  handleClose,
  currentItem,
  storeOrUpdate,
  setStoreOrUpdate,
}) => {
  const dispatch = useDispatch();
  const tableOptions = useSelector((state) => state.dbRetrieval.tableOptions);
  const columnOptions = useSelector((state) => state.dbRetrieval.columnOptions);
  const [tableNameChosen, setTableNameChosen] = useState(
    currentItem?.itemData?.table_name || ""
  );

  useEffect(() => {
    if (tableNameChosen !== "") {
      const fetchColumns = async () => {
        try {
          dispatch(getColumnsStart());
          const columnOptions = await getColumns(tableNameChosen);
          dispatch(getColumnsSuccess(columnOptions));
        } catch (error) {
          dispatch(getColumnsFailure(error));
        }
      };

      fetchColumns();
    }
  }, [tableNameChosen, dispatch]);

  console.log("currentItem", currentItem);

  return (
    <Formik
      validationSchema={schemaDatalistFilter}
      // onSubmit={async (values, { setSubmitting, setErrors }) => {
      //   console.log("values", values);
      //   handleAddItem();
      // }}
      initialValues={{
        label: currentItem?.itemData?.label || "",
        table_name: currentItem?.itemData?.table_name || "",
        column_name: currentItem?.itemData?.column_name || "",
      }}
      onSubmit={async (values, { setSubmitting, setErrors }) => {
        const updatedValues = {
          ...values,
          list_id: datalist.id,
          order: currentItem ? currentItem.itemData.order : ++filterOrder,
        };

        try {
          console.log("updatedValues", updatedValues);
          setSubmitting(true);
          console.log("storeOrUpdate", storeOrUpdate);
          if (storeOrUpdate === "store") {
            const result = await storeDatalistFilter(updatedValues);
            if (result.success === true) {
              console.log("Datalist Filter saved successfully");
              handleAddItem(result.data);
            } else if (result.label && result.label.length > 0) {
              setErrors({ label: result.label[0] }); // Set the error for the label field
            } else {
              console.error("Error saving datalist filter:", result);
            }
          } else {
            console.log("currenITEM in the submit button", currentItem);
            const result = await updateDatalistFilter(
              currentItem.itemData.id,
              updatedValues
            );
            if (result.success === true) {
              console.log("Datalist Filter updated successfully");
              handleAddItem(result.data);
            } else if (result.label && result.label.length > 0) {
              setErrors({ label: result.label[0] }); // Set the error for the label field
            } else {
              console.error("Error saving datalist filter:", result);
            }
          }
        } catch (error) {
          console.error("Unexpected error:", error);
          setErrors({ label: error.label[0] });
        } finally {
          setSubmitting(false); // Reset form submitting state
        }
      }}
    >
      {({
        handleSubmit,
        handleChange,
        handleBlur,
        values,
        touched,
        isValid,
        errors,
      }) => (
        <Form noValidate onSubmit={handleSubmit}>
          <Form.Group as={Row} className="mb-3">
            <Form.Label column sm={3} className="text-sm-right">
              Label
            </Form.Label>
            <Col sm={9}>
              <Form.Control
                type="text"
                name="label"
                value={values.label}
                onChange={handleChange}
                isValid={touched.label && !errors.label}
                isInvalid={touched.label && !!errors.label}
              />
              <Form.Control.Feedback type="invalid">
                {errors.label}
              </Form.Control.Feedback>
            </Col>
          </Form.Group>
          <Form.Group as={Row} className="mb-3">
            <Form.Label column sm={3} className="text-sm-right">
              Table Name*
            </Form.Label>
            <Col sm={9}>
              <Form.Select
                name="table_name"
                onChange={(e) => {
                  const selectedTableName = e.target.value;
                  setTableNameChosen(selectedTableName);
                  handleChange(e);
                }}
                value={values.table_name || ""}
                isValid={touched.table_name && !errors.table_name}
                isInvalid={touched.table_name && !!errors.table_name}
              >
                <option value="">Not chosen</option>
                {tableOptions.map((tableName, index) => (
                  <option key={index} value={tableName}>
                    {tableName}
                  </option>
                ))}
              </Form.Select>
              <Form.Control.Feedback type="invalid">
                {errors.table_name}
              </Form.Control.Feedback>
            </Col>
          </Form.Group>
          {tableNameChosen && (
            <Form.Group as={Row} className="mb-3">
              <Form.Label column sm={3} className="text-sm-right">
                Table Column*
              </Form.Label>
              <Col sm={9}>
                <Form.Select
                  name="column_name"
                  onChange={handleChange}
                  value={values.column_name || ""}
                >
                  <option value="">Not chosen</option>
                  {columnOptions.map((columnName, index) => (
                    <option key={index} value={columnName}>
                      {columnName}
                    </option>
                  ))}
                </Form.Select>
                <Form.Control.Feedback type="invalid">
                  {errors.column_name}
                </Form.Control.Feedback>
              </Col>
            </Form.Group>
          )}

          <Button
            type="submit"
            variant="success"
            className="float-end mt-n1 me-2"
            // onClick={handleAddItem}
          >
            Save Changes
          </Button>
          <Button
            variant="secondary"
            className="float-end mt-n1 me-2"
            onClick={handleClose}
          >
            Close
          </Button>
        </Form>
      )}
    </Formik>
  );
};

const DatalistColumn = ({ id, onDelete, itemData }) => (
  <Card className="mb-3 bg-light cursor-grab border">
    <Card.Body className="p-3">
      <div className="float-end">
        <Button
          variant="danger"
          className="float-end mt-n1 me-2"
          size="sm"
          onClick={onDelete}
        >
          <FontAwesomeIcon icon={faX} />
        </Button>
        <Button variant="warning" className="float-end mt-n1 me-2" size="sm">
          <FontAwesomeIcon icon={faEdit} />
        </Button>
      </div>
      <p>Column {id}</p>
    </Card.Body>
  </Card>
);

const DatalistRowAction = ({ id, onDelete, itemData }) => (
  <Card className="mb-3 bg-light cursor-grab border">
    <Card.Body className="p-3">
      <div className="float-end">
        <Button
          variant="danger"
          className="float-end mt-n1 me-2"
          size="sm"
          onClick={onDelete}
        >
          <FontAwesomeIcon icon={faX} />
        </Button>
        <Button variant="warning" className="float-end mt-n1 me-2" size="sm">
          <FontAwesomeIcon icon={faEdit} />
        </Button>
      </div>
      <p>Row Action - {id}</p>
    </Card.Body>
  </Card>
);

const DatalistAction = ({ id, onDelete, itemData }) => (
  <Card className="mb-3 bg-light cursor-grab border">
    <Card.Body className="p-3">
      <div className="float-end">
        <Button
          variant="danger"
          className="float-end mt-n1 me-2"
          size="sm"
          onClick={onDelete}
        >
          <FontAwesomeIcon icon={faX} />
        </Button>
        <Button variant="warning" className="float-end mt-n1 me-2" size="sm">
          <FontAwesomeIcon icon={faEdit} />
        </Button>
      </div>
      <p>Action - {id}</p>
    </Card.Body>
  </Card>
);

export default DatalistEdit;
