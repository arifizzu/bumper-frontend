const groupTableColumns = [
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

const formTableColumns = [
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
    Header: "Group",
    accessor: "group.name",
  },
  {
    Header: "Action",
    accessor: "action",
  },
];

export { groupTableColumns, formTableColumns };
