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
    Header: "Action",
    accessor: "action",
  },
];

export { tableColumns };
