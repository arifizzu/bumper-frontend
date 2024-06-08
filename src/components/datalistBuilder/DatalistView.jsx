import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import html2pdf from "html2pdf.js";
// import htmlDocx from "html-docx-js/dist/html-docx";
import * as FileSaver from "file-saver";
import * as XLSX from "xlsx";
import {
  useTable,
  usePagination,
  useFilters,
  useGlobalFilter,
} from "react-table";
import {
  Card,
  Table,
  Pagination,
  Row,
  Col,
  Form,
  Button,
  Modal,
  Container,
  Dropdown,
  DropdownButton,
} from "react-bootstrap";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlus,
  faEye,
  faEdit,
  faTrash,
  faFileExport,
} from "@fortawesome/free-solid-svg-icons";

import {
  showDatalistStart,
  showDatalistSuccess,
  showDatalistFailure,
} from "../../redux/slices/datalistSlice";

import { showDatalist } from "../../repositories/api/services/datalistServices";

import { retrieveDataFromDatabase } from "../../repositories/api/services/datalistServices";

function NumberRangeColumnFilter({
  column: { filterValue = [], preFilteredRows, setFilter, id },
}) {
  const [min, max] = React.useMemo(() => {
    let min = Infinity;
    let max = -Infinity;
    preFilteredRows.forEach((row) => {
      const rowValue = row.values[id];
      if (rowValue !== null && rowValue !== undefined) {
        min = Math.min(rowValue, min);
        max = Math.max(rowValue, max);
      }
    });
    return [min === Infinity ? 0 : min, max === -Infinity ? 0 : max];
  }, [id, preFilteredRows]);

  return (
    <div className="d-flex mt-2">
      <Form.Control
        value={filterValue[0] || ""}
        type="number"
        onChange={(e) => {
          const val = e.target.value;
          setFilter((old = []) => [
            val ? parseInt(val, 10) : undefined,
            old[1],
          ]);
        }}
        placeholder={`Min (${min})`}
        // style={{
        //   width: "110px",
        // }}
      />
      <span className="mx-2 mt-1">to</span>
      <Form.Control
        value={filterValue[1] || ""}
        type="number"
        onChange={(e) => {
          const val = e.target.value;
          setFilter((old = []) => [
            old[0],
            val ? parseInt(val, 10) : undefined,
          ]);
        }}
        placeholder={`Max (${max})`}
        // style={{
        //   width: "110px",
        // }}
      />
    </div>
  );
}

// This is a custom filter UI for selecting
// a unique option from a list
function SelectColumnFilter({
  column: { filterValue, setFilter, preFilteredRows, id },
}) {
  // Calculate the options for filtering
  // using the preFilteredRows
  const options = React.useMemo(() => {
    const options = new Set();
    preFilteredRows.forEach((row) => {
      options.add(row.values[id]);
    });
    return [...options.values()];
  }, [id, preFilteredRows]);

  // Render a multi-select box
  return (
    <Form.Select
      value={filterValue}
      onChange={(e) => {
        setFilter(e.target.value || undefined);
      }}
    >
      <option value="">All</option>
      {options.map((option, i) => (
        <option key={i} value={option}>
          {option}
        </option>
      ))}
    </Form.Select>
  );
}

function SearchColumnFilter({
  column: { filterValue, preFilteredRows, setFilter },
}) {
  const count = preFilteredRows.length;

  return (
    <Form.Control
      value={filterValue || ""}
      onChange={(e) => {
        setFilter(e.target.value || undefined); // Set undefined to remove the filter entirely
      }}
      placeholder={`Search ${count} records...`}
      className="mt-2"
    />
  );
}

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
      console.log("sortedItems", sortedItems);

      const columns = sortedItems.map((item) => ({
        Header: item.label,
        accessor: item.column_name,
        Filter:
          item.include_filter && item.filter_type === "Search"
            ? SearchColumnFilter
            : item.include_filter && item.filter_type === "Select"
            ? SelectColumnFilter
            : item.include_filter && item.filter_type === "Range"
            ? NumberRangeColumnFilter
            : false,
        filter: item.filter_type === "Range" ? "numberRange" : undefined,
      }));

      // Add the No. column at the beginning
      const columnsWithNo = [
        {
          Header: "No.",
          accessor: (row, index) => index + 1,
          Filter: false,
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

  const handleExportFormButton = (datalist, format) => {
    const element = document.getElementById("form-content");

    if (format === "pdf") {
      // Create a new div element for export
      const exportContent = document.createElement("div");

      // Create the title element
      const titleElement = document.createElement("h1");
      titleElement.innerText = datalist.title;
      titleElement.style.textAlign = "center";
      titleElement.style.marginBottom = "20px";

      // Clone the table element
      const tableElement = element.cloneNode(true);

      // Remove filter fields from the cloned table
      const filters = tableElement.querySelectorAll("div");
      filters.forEach((filter) => filter.remove());

      // Append the title and cleaned table to the new div element
      exportContent.appendChild(titleElement);
      exportContent.appendChild(tableElement);

      const opt = {
        margin: 0.2,
        filename: `${datalist.title}.pdf`,
        image: { type: "jpeg", quality: 0.98 },
        html2canvas: { scale: 2 },
        jsPDF: { unit: "in", format: "letter", orientation: "portrait" },
      };

      html2pdf().from(exportContent).set(opt).save();
    }
    // else if (format === "word") {
    //   const content = `
    //   <html>
    //     <head>
    //       <meta charset="utf-8">
    //       <title>${datalist.title}</title>
    //     </head>
    //     <body>
    //       ${element.outerHTML}
    //     </body>
    //   </html>
    // `;
    //   const converted = htmlDocx.asBlob(content);
    //   FileSaver.saveAs(converted, `${datalist.title}.docx`);

    // const content = element.innerHTML;
    // const blob = new Blob(["\ufeff", content], {
    //   type: "application/msword",
    // });
    // FileSaver.saveAs(blob, `${datalist.title}.doc`);
    // }
    else if (format === "csv") {
      // Clone the table element
      const tableElement = element.cloneNode(true);

      // Remove filter fields from the cloned table
      const filters = tableElement.querySelectorAll("div");
      filters.forEach((filter) => filter.remove());

      const rows = Array.from(tableElement.querySelectorAll("tr"));
      const csvData = rows
        .map((row) => {
          const columns = Array.from(row.querySelectorAll("td, th"));
          return columns.map((column) => column.innerText).join(",");
        })
        .join("\n");

      const blob = new Blob([csvData], { type: "text/csv;charset=utf-8;" });
      FileSaver.saveAs(blob, `${datalist.title}.csv`);
    }
  };

  // const filterTypes = React.useMemo(
  //   () => ({
  //     // Or, override the default text filter to use
  //     // "startWith"
  //     text: (rows, id, filterValue) => {
  //       return rows.filter((row) => {
  //         const rowValue = row.values[id];
  //         return rowValue !== undefined
  //           ? String(rowValue)
  //               .toLowerCase()
  //               .startsWith(String(filterValue).toLowerCase())
  //           : true;
  //       });
  //     },
  //   }),
  //   []
  // );

  const filterTypes = React.useMemo(
    () => ({
      numberRange: (rows, id, filterValue) => {
        const [min, max] = filterValue;
        return rows.filter((row) => {
          const rowValue = row.values[id];
          if (rowValue === null || rowValue === undefined) {
            return true;
          }
          return (
            (min === undefined || rowValue >= min) &&
            (max === undefined || rowValue <= max)
          );
        });
      },
    }),
    []
  );

  const defaultColumn = React.useMemo(
    () => ({
      // Let's set up our default Filter UI
      Filter: SearchColumnFilter,
    }),
    []
  );

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
      defaultColumn,
      filterTypes,
    },
    useFilters,
    useGlobalFilter,
    usePagination
  );

  return (
    <React.Fragment>
      {datalist ? (
        <Card>
          <Card.Header>
            <Container fluid className="p-0">
              {datalist.actions && datalist.actions.length > 0 ? (
                <React.Fragment>
                  {datalist.actions
                    .slice() // Create a shallow copy of the array
                    .sort((a, b) => b.order - a.order)
                    .map((action, index) => {
                      if (
                        action.segment === "Action" &&
                        action.type === "Create"
                      ) {
                        return (
                          <Button
                            key={`add-new-${index}`}
                            variant="primary"
                            className="float-end mt-n1 me-2"
                            onClick={() => {
                              console.log("Click Add Button");
                              navigate(
                                `/form-builder-v2/view/preview/${datalist.form_id}`
                              );
                            }}
                          >
                            <FontAwesomeIcon icon={faPlus} /> {action.label}
                          </Button>
                        );
                      }
                      if (
                        action.segment === "Action" &&
                        action.type === "Export"
                      ) {
                        return (
                          <DropdownButton
                            key={`export-${index}`}
                            variant="primary"
                            className="float-end mt-n1 me-2"
                            title={
                              <>
                                <FontAwesomeIcon icon={faFileExport} />{" "}
                                {action.label}
                              </>
                            }
                          >
                            <Dropdown.Item
                              onClick={() =>
                                handleExportFormButton(datalist, "pdf")
                              }
                            >
                              Export as PDF
                            </Dropdown.Item>
                            {/* <Dropdown.Item
                              onClick={() =>
                                handleExportFormButton(datalist, "word")
                              }
                            >
                              Export as Word
                            </Dropdown.Item> */}
                            <Dropdown.Item
                              onClick={() =>
                                handleExportFormButton(datalist, "csv")
                              }
                            >
                              Export as CSV
                            </Dropdown.Item>
                          </DropdownButton>
                        );
                      }
                      return null;
                    })}
                  <Card.Title>{datalist.title}</Card.Title>
                  <h6 className="card-subtitle text-muted">
                    {datalist.description}
                  </h6>
                </React.Fragment>
              ) : (
                <React.Fragment>
                  <Card.Title>{datalist.title}</Card.Title>
                  <h6 className="card-subtitle text-muted">
                    {datalist.description}
                  </h6>
                </React.Fragment>
              )}
            </Container>
          </Card.Header>
          <Card.Body>
            {loading ? (
              <div>Loading...</div>
            ) : (
              <Table striped bordered {...getTableProps()} id="form-content">
                <thead>
                  {headerGroups.map((headerGroup) => (
                    <tr {...headerGroup.getHeaderGroupProps()}>
                      {headerGroup.headers.map((column) => (
                        <th {...column.getHeaderProps()}>
                          {column.render("Header")}
                          {/* Render the columns filter UI */}
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
