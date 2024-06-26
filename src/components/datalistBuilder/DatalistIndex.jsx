import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useTable, usePagination } from "react-table";
import {
  Card,
  Table,
  Pagination,
  Row,
  Col,
  Form,
  Button,
  Modal,
  Accordion,
} from "react-bootstrap";

import * as Yup from "yup";
import { Formik } from "formik";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlus,
  faEye,
  faEdit,
  faTrash,
  faMagnifyingGlass,
} from "@fortawesome/free-solid-svg-icons";

import {
  getDatalistsStart,
  getDatalistsSuccess,
  getDatalistsFailure,
  deleteDatalistStart,
  deleteDatalistSuccess,
  deleteDatalistFailure,
} from "../../redux/slices/datalistSlice";

import {
  getDatalists,
  deleteDatalist,
} from "../../repositories/api/services/datalistServices";

import {
  getGroupsStart,
  getGroupsSuccess,
  getGroupsFailure,
  //   editGroupStart,
  //   editGroupSuccess,
  //   editGroupFailure,
  deleteGroupStart,
  deleteGroupSuccess,
  deleteGroupFailure,
} from "../../redux/slices/groupSlice";

import {
  getGroups,
  //   editGroup,
  updateGroup,
  deleteGroup,
} from "../../repositories/api/services/groupServices";

const schema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
});

const DatalistIndex = ({ datalistTableColumns }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { datalists, loading, error } = useSelector((state) => state.datalist);
  const [updatedColumns, setUpdatedColumns] = useState([]);
  const { groups } = useSelector((state) => state.group);
  const [showModalGroupEdit, setShowModalGroupEdit] = useState({});
  //   const formGroup = useSelector((state) => state.group.form);
  const permissions = JSON.parse(localStorage.getItem("permissions"));

  const toggleModalGroupEdit = (id) => {
    setShowModalGroupEdit((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const handleUseButton = async (id) => {
    try {
      navigate(`/datalist-builder/use/${id}`);
    } catch (error) {
      console.error("Use datalist failed:", error);
    }
  };

  const handleViewButton = async (id) => {
    try {
      navigate(`/datalist-builder/view/${id}`);
    } catch (error) {
      console.error("View datalist failed:", error);
    }
  };

  const handleEditButton = async (id) => {
    try {
      navigate(`/datalist-builder/edit/${id}`);
    } catch (error) {
      console.error("Edit datalist failed:", error);
    }
  };

  const handleDeleteButton = async (id) => {
    try {
      dispatch(deleteDatalistStart());
      console.log("Deleting datalist with id:", id);
      await deleteDatalist(id);
      dispatch(deleteDatalistSuccess(id));
    } catch (error) {
      dispatch(deleteDatalistFailure());
      console.error("Delete datalist failed:", error);
    }
  };

  const handleDeleteGroupButton = async (id) => {
    try {
      dispatch(deleteGroupStart());
      console.log("Deleting group with id:", id);
      await deleteGroup(id);
      dispatch(deleteGroupSuccess(id));
      // window.location.reload();
      // toggleModal();
    } catch (error) {
      dispatch(deleteGroupFailure());
      console.error("Delete group failed:", error);
    }
  };

  const renderActions = (row) => {
    // Initialize an object with all row IDs and set their corresponding showModal values to false
    const initialModals = datalists.reduce((acc, datalist) => {
      acc[datalist.id] = false;
      return acc;
    }, {});

    // State to manage the visibility of the modals
    const [showModal, setShowModal] = useState(initialModals);

    // Function to toggle the modal visibility for a specific row ID
    const toggle = (id) => {
      setShowModal((prevShowModal) => ({
        ...prevShowModal,
        [id]: !prevShowModal[id],
      }));
    };

    return (
      <>
        {permissions.includes("use datalist") && (
          <Button
            variant="primary"
            size="sm"
            className="me-2"
            onClick={() => {
              handleUseButton(row.id);
            }}
          >
            <FontAwesomeIcon icon={faMagnifyingGlass} /> Use
          </Button>
        )}
        {permissions.includes("view datalist") && (
          <Button
            variant="info"
            size="sm"
            className="me-2"
            onClick={() => {
              handleViewButton(row.id);
            }}
          >
            <FontAwesomeIcon icon={faEye} /> View
          </Button>
        )}

        {permissions.includes("edit datalist") && (
          <Button
            variant="warning"
            size="sm"
            className="me-2"
            onClick={() => {
              handleEditButton(row.id);
            }}
          >
            <FontAwesomeIcon icon={faEdit} /> Edit
          </Button>
        )}

        <React.Fragment key={row.id}>
          {permissions.includes("delete datalist") && (
            <Button variant="danger" size="sm" onClick={() => toggle(row.id)}>
              <FontAwesomeIcon icon={faTrash} /> Delete
            </Button>
          )}
          <Modal show={showModal[row.id]} onHide={() => toggle(row.id)}>
            <Modal.Header closeButton>Delete Datalist</Modal.Header>
            <Modal.Body className="text-center m-3">
              <p className="mb-0">
                Are you sure you want to delete this datalist?
              </p>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={() => toggle(row.id)}>
                Close
              </Button>{" "}
              <Button
                variant="danger"
                onClick={() => {
                  toggle(row.id);
                  handleDeleteButton(row.id);
                }}
              >
                Confirm Delete
              </Button>
            </Modal.Footer>
          </Modal>
        </React.Fragment>
      </>
    );
  };

  const fetchDatalists = async () => {
    try {
      dispatch(getDatalistsStart());
      const datalistData = await getDatalists();
      console.log("datalistData", datalistData);
      dispatch(getDatalistsSuccess(datalistData));
    } catch (error) {
      dispatch(getDatalistsFailure(error));
    }
  };

  const fetchGroups = async () => {
    try {
      dispatch(getGroupsStart());
      const groupData = await getGroups();
      console.log("groupData", groupData);
      dispatch(getGroupsSuccess(groupData));
    } catch (error) {
      dispatch(getGroupsFailure(error));
    }
  };

  useEffect(() => {
    const updatedColumns = datalistTableColumns.map((column) => {
      if (column.accessor === "action") {
        return {
          ...column,
          Cell: ({ row }) => renderActions(row.original),
        };
      }
      return column;
    });

    setUpdatedColumns(updatedColumns);
    fetchDatalists();
    fetchGroups();
  }, [datalistTableColumns]);

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    page,
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    state: { pageIndex, pageSize },
  } = useTable(
    {
      columns: updatedColumns,
      data: datalists,
      initialState: { pageIndex: 0 },
    },
    usePagination
  );

  return (
    <React.Fragment>
      <Card>
        <Card.Header className="pb-0">
          <Card.Title>Datalists</Card.Title>
          <h6 className="card-subtitle text-muted">
            List of existing datalists
          </h6>
        </Card.Header>
        <Card.Body>
          <Accordion defaultActiveKey="0">
            <Accordion.Item eventKey="0" className="bg-white">
              <Accordion.Header>No group</Accordion.Header>
              <Accordion.Body>
                {page.filter((row) => !row.original.group_id).length > 0 ? (
                  <Table striped bordered {...getTableProps()}>
                    <thead>
                      {headerGroups.map((headerGroup) => (
                        <tr {...headerGroup.getHeaderGroupProps()}>
                          {headerGroup.headers.map((column) => (
                            <th {...column.getHeaderProps()}>
                              {column.render("Header")}
                            </th>
                          ))}
                        </tr>
                      ))}
                    </thead>
                    <tbody {...getTableBodyProps()}>
                      {page
                        .filter((row) => !row.original.group_id)
                        .map((row, i) => {
                          prepareRow(row);
                          return (
                            <tr {...row.getRowProps()}>
                              {/* Adjusted rendering of "No." column */}
                              <td>{i + 1}</td>
                              {row.cells.slice(1).map((cell) => {
                                // Slice to skip the "No." column
                                return (
                                  <td {...cell.getCellProps()}>
                                    {cell.render("Cell")}
                                  </td>
                                );
                              })}
                            </tr>
                          );
                        })}
                    </tbody>
                  </Table>
                ) : (
                  <p>No datalist in this group</p>
                )}
              </Accordion.Body>
            </Accordion.Item>
            {groups.map((group, index) => (
              <Accordion.Item
                key={index}
                eventKey={(index + 1).toString()}
                className="bg-white"
              >
                <Accordion.Header>
                  <div className="d-flex justify-content-between align-items-center w-100">
                    <span>{group.name}</span>
                  </div>
                </Accordion.Header>
                <Accordion.Body>
                  <div className="d-flex justify-content-end align-items-center w-100 mb-2">
                    <Button
                      variant="warning"
                      size="sm"
                      className="me-2"
                      onClick={() => {
                        console.log("ayam");
                        toggleModalGroupEdit(group.id);
                      }}
                    >
                      <FontAwesomeIcon icon={faEdit} /> Edit Group
                    </Button>
                  </div>

                  {page.filter((row) => row.original.group_id === group.id)
                    .length > 0 ? (
                    <Table striped bordered>
                      <thead>
                        {headerGroups.map((headerGroup) => (
                          <tr {...headerGroup.getHeaderGroupProps()}>
                            {headerGroup.headers.map((column) => (
                              <th {...column.getHeaderProps()}>
                                {column.render("Header")}
                              </th>
                            ))}
                          </tr>
                        ))}
                      </thead>
                      <tbody {...getTableBodyProps()}>
                        {page
                          .filter((row) => row.original.group_id === group.id)
                          .map((row, i) => {
                            prepareRow(row);
                            return (
                              <tr {...row.getRowProps()}>
                                {/* Adjusted rendering of "No." column */}
                                <td>{i + 1}</td>
                                {row.cells.slice(1).map((cell) => {
                                  // Slice to skip the "No." column
                                  return (
                                    <td {...cell.getCellProps()}>
                                      {cell.render("Cell")}
                                    </td>
                                  );
                                })}
                              </tr>
                            );
                          })}
                      </tbody>
                    </Table>
                  ) : (
                    <p>No datalists in this group</p>
                  )}
                </Accordion.Body>
              </Accordion.Item>
            ))}
          </Accordion>
        </Card.Body>
      </Card>
      {groups.map((group) => (
        <Modal
          key={group.id}
          show={showModalGroupEdit[group.id] || false}
          onHide={() => toggleModalGroupEdit(group.id)}
          centered
        >
          <Modal.Header closeButton>Edit Group</Modal.Header>
          <Modal.Body className="text-center m-3">
            <Formik
              validationSchema={schema}
              onSubmit={async (values, { setSubmitting, setErrors }) => {
                try {
                  setSubmitting(true);
                  const result = await updateGroup(group.id, values);
                  if (result.success === true) {
                    console.log("Group saved successfully");
                    window.location.reload();
                    toggleModal();
                  } else if (result.name && result.name.length > 0) {
                    setErrors({ name: result.name[0] }); // Set the error for the name field
                  } else {
                    console.error("Error saving group:", result);
                  }
                } catch (error) {
                  console.error("Unexpected error:", error);
                  setErrors({ name: error.name[0] });
                } finally {
                  setSubmitting(false); // Reset form submitting state
                }
              }}
              initialValues={{
                // name: (formGroup && formGroup.name) || "",
                name: group.name,
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
                    <Form.Label column sm={2} className="text-sm-right">
                      Name
                    </Form.Label>
                    <Col sm={10}>
                      <Form.Control
                        type="text"
                        name="name"
                        value={values.name}
                        onChange={handleChange}
                        isValid={touched.name && !errors.name}
                        isInvalid={touched.name && !!errors.name}
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.name}
                      </Form.Control.Feedback>
                    </Col>
                  </Form.Group>
                  <Button
                    type="submit"
                    variant="success"
                    className="float-end mt-n1 me-2"
                  >
                    Save Group
                  </Button>
                  <Button
                    // type="submit"
                    variant="danger"
                    className="float-end mt-n1 me-2"
                    onClick={() => {
                      if (
                        window.confirm(
                          "Are you sure you want to delete this group?"
                        )
                      ) {
                        handleDeleteGroupButton(group.id);
                      }
                    }}
                    disabled={
                      group.data_lists.length > 0 || group.forms.length > 0
                    }
                  >
                    Delete Group
                  </Button>
                </Form>
              )}
            </Formik>
          </Modal.Body>
        </Modal>
      ))}
    </React.Fragment>
  );
};

export default DatalistIndex;
