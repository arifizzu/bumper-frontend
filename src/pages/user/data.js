//dummy data
const tableData = [
  {
    name: "Tiger Nixon",
    email: "tn@example.come",
    roles: "Admin",
  },
  {
    name: "Garrett Winters",
    email: "garrwin@example.come",
    roles: "Admin",
  },
  {
    name: "Ashton Cox",
    email: "ashcox@example.come",
    roles: "User",
  },
];

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
    Header: "Email",
    accessor: "email",
  },
  {
    Header: "Roles",
    accessor: "roles",
  },
  {
    Header: "Action",
    accessor: "action",
  },
];

export { tableData, tableColumns };
