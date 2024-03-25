const tableColumns = [
  {
    Header: "No.",
    accessor: (row, index) => index + 1,
  },
  {
    Header: "Name",
    accessor: "name",
  },
  {
    Header: "Short Name",
    accessor: "short_name",
  },
  {
    Header: "Action",
    accessor: "action",
  },
];

export { tableColumns };
