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
} from "react-bootstrap";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlus,
  faEye,
  faEdit,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";

import {
  getProcessesStart,
  getProcessesSuccess,
  getProcessesFailure,
  deleteProcessStart,
  deleteProcessSuccess,
  deleteProcessFailure,
} from "../../redux/slices/processSlice";

import {
  getProcesses,
  deleteProcess,
} from "../../repositories/api/services/processServices";

const ProcessIndex = ({ tableColumns }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { processes, loading, error } = useSelector((state) => state.process);
  const [updatedColumns, setUpdatedColumns] = useState([]);

  const handleViewButton = async (id) => {
    try {
      navigate(`/process-builder/view/${id}`);
    } catch (error) {
      console.error("View process failed:", error);
    }
  };

  const handleEditButton = async (id) => {
    try {
      navigate(`/process-builder/edit/${id}`);
    } catch (error) {
      console.error("Edit process failed:", error);
    }
  };

  const handleDeleteButton = async (id) => {
    try {
      dispatch(deleteProcessStart());
      console.log("Deleting process with id:", id);
      await deleteProcess(id);
      dispatch(deleteProcessSuccess(id));
    } catch (error) {
      dispatch(deleteProcessFailure());
      console.error("Delete process failed:", error);
    }
  };

  const renderActions = (row) => {
    // Initialize an object with all row IDs and set their corresponding showModal values to false
    const initialModals = processes.reduce((acc, process) => {
      acc[process.id] = false;
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

        <React.Fragment key={row.id}>
          <Button variant="danger" size="sm" onClick={() => toggle(row.id)}>
            <FontAwesomeIcon icon={faTrash} /> Delete
          </Button>
          <Modal show={showModal[row.id]} onHide={() => toggle(row.id)}>
            <Modal.Header closeButton>Delete Process</Modal.Header>
            <Modal.Body className="text-center m-3">
              <p className="mb-0">
                Are you sure you want to delete this process?
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

  const fetchProcesses = async () => {
    try {
      dispatch(getProcessesStart());
      const processData = await getProcesses();
      dispatch(getProcessesSuccess(processData));
    } catch (error) {
      dispatch(getProcessesFailure(error));
    }
  };

  useEffect(() => {
    const updatedColumns = tableColumns.map((column) => {
      if (column.accessor === "action") {
        return {
          ...column,
          Cell: ({ row }) => renderActions(row.original),
        };
      }
      return column;
    });

    setUpdatedColumns(updatedColumns);
    fetchProcesses();
  }, [tableColumns]);

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
      data: processes,
      initialState: { pageIndex: 0 },
    },
    usePagination
  );

  return (
    <Card>
      <Card.Header>
        <Card.Title>Processes</Card.Title>
        <h6 className="card-subtitle text-muted">Lists of created process</h6>
      </Card.Header>
      <Card.Body>
        {loading ? (
          <div>Loading...</div>
        ) : (
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
              {page.map((row, i) => {
                prepareRow(row);
                return (
                  <tr {...row.getRowProps()}>
                    {row.cells.map((cell) => {
                      return (
                        <td {...cell.getCellProps()}>
                          {/* Modify the rendering of the cell based on the column ID */}
                          {cell.column.id === "roles"
                            ? // If the column is "roles", render the role names as a string
                              row.original.roles
                                .map((role) => role.name)
                                .join(", ")
                            : cell.render("Cell")}
                        </td>
                      );
                    })}
                  </tr>
                );
              })}
            </tbody>
          </Table>
        )}

        <Row>
          <Col md="6">
            <span className="mx-2">
              Page{" "}
              <strong>
                {pageIndex + 1} of {pageOptions.length}
              </strong>
            </span>
            <span className="ms-3 me-2">Show:</span>
            <Form.Select
              className="d-inline-block w-auto"
              value={pageSize}
              onChange={(e) => {
                setPageSize(Number(e.target.value));
              }}
            >
              {[10, 20, 30, 40, 50].map((pageSize) => (
                <option key={pageSize} value={pageSize}>
                  {pageSize}
                </option>
              ))}
            </Form.Select>

            <span className="ms-3 me-2">Go to page:</span>
            <Form.Control
              className="d-inline-block"
              type="number"
              defaultValue={pageIndex + 1}
              onChange={(e) => {
                const page = e.target.value ? Number(e.target.value) - 1 : 0;
                gotoPage(page);
              }}
              style={{ width: "75px" }}
            />
          </Col>
          <Col md="6">
            <Pagination className="float-end">
              <Pagination.First
                onClick={() => gotoPage(0)}
                disabled={!canPreviousPage}
              />
              <Pagination.Prev
                onClick={() => previousPage()}
                disabled={!canPreviousPage}
              />
              <Pagination.Next
                onClick={() => nextPage()}
                disabled={!canNextPage}
              />
              <Pagination.Last
                onClick={() => gotoPage(pageCount - 1)}
                disabled={!canNextPage}
              />
            </Pagination>
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
};

export default ProcessIndex;
