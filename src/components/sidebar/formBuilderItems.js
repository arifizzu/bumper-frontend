import {
  Bell,
  BookOpen,
  Calendar,
  CheckSquare,
  Grid,
  Heart,
  Layout,
  List,
  PieChart,
  Sliders,
  MapPin,
  Users,
  Share,
  Key,
  FilePlus,
  FolderPlus,
} from "react-feather";

const formSection = [
  {
    href: "/notifications",
    icon: List,
    title: "Forms",
  },
];

const formBuilderSection = [
  {
    href: "/form-builder",
    icon: List,
    title: "Existing Forms",
  },
  {
    href: "/notifications",
    icon: FilePlus,
    title: "Create New Form",
  },
];

const processBuilderSection = [
  {
    href: "/notifications",
    icon: List,
    title: "Existing Processes",
  },
  {
    href: "/notifications",
    icon: FolderPlus,
    title: "Create New Process",
  },
];

const managementSettingsSection = [
  {
    href: "/notifications",
    icon: Key,
    title: "Role & Permission",
    children: [
      {
        href: "/form-plugins/advanced-inputs",
        title: "Lists",
      },
      // {
      //   href: "/form-plugins/formik",
      //   title: "Create New",
      // },
      {
        href: "/form-plugins/formik",
        title: "Assign to User",
      },
    ],
  },
  {
    href: "/users",
    icon: Users,
    title: "User Account",
    // children: [
    //   {
    //     href: "/users",
    //     title: "Existing Users",
    //   },
    //   {
    //     href: "/form-plugins/advanced-inputs",
    //     title: "Create New User",
    //   },
    // ],
  },
];

const navItems = [
  {
    title: "Form",
    pages: formSection,
  },
  {
    title: "Form Builder",
    pages: formBuilderSection,
  },
  {
    title: "Process Builder",
    pages: processBuilderSection,
  },
  {
    title: "Management Settings",
    pages: managementSettingsSection,
  },
];

export default navItems;
