const datalistTableColumns = [
  {
    Header: "No.",
    accessor: (row, index) => index + 1,
  },
  {
    Header: "Title",
    accessor: "title",
  },
  {
    Header: "Description",
    accessor: "description",
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

export { datalistTableColumns };
