import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useTable, usePagination, useFilters } from "react-table";
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
  getUsersStart,
  getUsersSuccess,
  getUsersFailure,
  deleteUserStart,
  deleteUserSuccess,
  deleteUserFailure,
} from "../../redux/slices/userSlice";

import {
  getUsers,
  deleteUser,
} from "../../repositories/api/services/userServices";

// Default column filter for text input
const DefaultColumnFilter = ({ column: { filterValue, setFilter } }) => (
  <Form.Control
    value={filterValue || ""}
    onChange={(e) => setFilter(e.target.value || undefined)}
    placeholder="Search..."
  />
);

// Select column filter for dropdown selection
const SelectColumnFilter = ({
  column: { filterValue, setFilter, preFilteredRows, id },
}) => {
  const options = React.useMemo(() => {
    const options = new Set();
    preFilteredRows.forEach((row) => {
      row.values[id].forEach((role) => options.add(role.name));
    });
    return [...options.values()];
  }, [id, preFilteredRows]);

  return (
    <Form.Select
      value={filterValue}
      onChange={(e) => setFilter(e.target.value || undefined)}
    >
      <option value="">All</option>
      {options.map((option, i) => (
        <option key={i} value={option}>
          {option}
        </option>
      ))}
    </Form.Select>
  );
};

// Custom filter function for roles
const filterRoles = (rows, id, filterValue) => {
  return rows.filter((row) => {
    const roles = row.values[id];
    return roles.some((role) => role.name === filterValue);
  });
};

const tableColumns = [
  {
    Header: "No.",
    accessor: (row, index) => index + 1,
    disableFilters: true,
  },
  {
    Header: "Name",
    accessor: "name",
    Filter: DefaultColumnFilter,
  },
  {
    Header: "Email",
    accessor: "email",
    Filter: DefaultColumnFilter,
  },
  {
    Header: "Roles",
    accessor: "roles",
    Filter: SelectColumnFilter,
    filter: filterRoles,
    Cell: ({ row }) => row.original.roles.map((role) => role.name).join(", "),
  },
  {
    Header: "Action",
    accessor: "action",
    disableFilters: true,
  },
];

const UserIndex = ({}) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { users, loading, error } = useSelector((state) => state.user);
  const [updatedColumns, setUpdatedColumns] = useState([]);
  const permissions = JSON.parse(localStorage.getItem("permissions"));

  const handleViewButton = async (id) => {
    try {
      navigate(`/users/view/${id}`);
    } catch (error) {
      console.error("View user failed:", error);
    }
  };

  const handleEditButton = async (id) => {
    try {
      navigate(`/users/edit/${id}`);
    } catch (error) {
      console.error("Edit user failed:", error);
    }
  };

  const handleDeleteButton = async (id) => {
    try {
      dispatch(deleteUserStart());
      console.log("Deleting user with id:", id);
      await deleteUser(id);
      dispatch(deleteUserSuccess(id));
    } catch (error) {
      dispatch(deleteUserFailure());
      console.error("Delete user failed:", error);
    }
  };

  const renderActions = (row) => {
    // Initialize an object with all row IDs and set their corresponding showModal values to false
    const initialModals = users.reduce((acc, user) => {
      acc[user.id] = false;
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
        {permissions.includes("view user") && (
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

        {permissions.includes("edit user") && (
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
          {permissions.includes("delete user") && (
            <Button variant="danger" size="sm" onClick={() => toggle(row.id)}>
              <FontAwesomeIcon icon={faTrash} /> Delete
            </Button>
          )}
          <Modal show={showModal[row.id]} onHide={() => toggle(row.id)}>
            <Modal.Header closeButton>Delete User</Modal.Header>
            <Modal.Body className="text-center m-3">
              <p className="mb-0">Are you sure you want to delete this user?</p>
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

  const fetchUsers = async () => {
    try {
      dispatch(getUsersStart());
      const userData = await getUsers();
      dispatch(getUsersSuccess(userData));
    } catch (error) {
      dispatch(getUsersFailure(error));
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
    fetchUsers();
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
      data: users,
      initialState: { pageIndex: 0 },
    },
    useFilters,
    usePagination
  );

  return (
    <Card>
      <Card.Header>
        <Card.Title>User Accounts</Card.Title>
        <h6 className="card-subtitle text-muted">Lists of users accounts</h6>
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
                      <div>
                        {column.canFilter ? column.render("Filter") : null}
                      </div>
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
                    {row.cells.map((cell) => (
                      <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                    ))}
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
              onChange={(e) => setPageSize(Number(e.target.value))}
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
              onChange={(e) =>
                gotoPage(e.target.value ? Number(e.target.value) - 1 : 0)
              }
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

export default UserIndex;
