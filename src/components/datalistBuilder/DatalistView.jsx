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
  showDatalistStart,
  showDatalistSuccess,
  showDatalistFailure,
} from "../../redux/slices/datalistSlice";

import { showDatalist } from "../../repositories/api/services/datalistServices";

import { retrieveDataFromDatabase } from "../../repositories/api/services/datalistServices";

const DatalistView = ({ id }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { datalist, loading, error } = useSelector((state) => state.datalist);
  const [datalistItemColumns, setDatalistItemColumns] = useState([]);
  const [retrievedData, setRetrievedData] = useState([]);

  useEffect(() => {
    const fetchDatalist = async () => {
      try {
        dispatch(showDatalistStart());
        const datalistData = await showDatalist(id);
        dispatch(showDatalistSuccess(datalistData));
      } catch (error) {
        dispatch(showDatalistFailure(error));
      }
    };
    fetchDatalist();
  }, [id, dispatch]);

  useEffect(() => {
    console.log("datalist", datalist);
    if (datalist && datalist.items) {
      const sortedItems = [...datalist.items].sort((a, b) => a.order - b.order);
      // Dynamically create columns based on sorted items
      const columns = sortedItems.map((item) => ({
        Header: item.label,
        accessor: item.column_name,
      }));

      // Add the No. column at the beginning
      const columnsWithNo = [
        {
          Header: "No.",
          accessor: (row, index) => index + 1,
        },
        ...columns,
      ];

      setDatalistItemColumns(columnsWithNo);

      const requestData = sortedItems.map((item) => ({
        column_key: item.column_key,
        table_name: item.table_name, // Ensure this is the correct table name
        column_name: item.column_name,
      }));

      const fetchData = async () => {
        console.log("requestData", requestData);
        try {
          const response = await retrieveDataFromDatabase(requestData);
          console.log("response", response);
          if (response.success) {
            const formattedData = formatResponseData(
              response.data,
              sortedItems
            );
            setRetrievedData(formattedData);
          } else {
            console.error("Error retrieving data", response.message);
          }
        } catch (error) {
          console.error("Error retrieving data", error);
        }
      };

      fetchData();
    }
  }, [datalist]);

  const formatResponseData = (data, items) => {
    return Object.values(data).map((row) => {
      const formattedRow = {};
      items.forEach((item) => {
        formattedRow[item.column_name] = row[item.column_name];
      });
      return formattedRow;
    });
  };

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
      columns: datalistItemColumns,
      data: retrievedData,
      initialState: { pageIndex: 0 },
    },
    usePagination
  );

  return (
    <React.Fragment>
      {datalist ? (
        <Card>
          <Card.Header>
            <Card.Title>{datalist.title}</Card.Title>
            <h6 className="card-subtitle text-muted">{datalist.description}</h6>
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
                        {row.cells.map((cell) => (
                          <td {...cell.getCellProps()}>
                            {cell.render("Cell")}
                          </td>
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
                    const page = e.target.value
                      ? Number(e.target.value) - 1
                      : 0;
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
      ) : (
        <p>Loading...</p>
      )}
    </React.Fragment>
  );
};

export default DatalistView;
