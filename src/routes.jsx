import React from "react";
import { lazy } from "@loadable/component";

// Layouts
import AuthLayout from "./layouts/Auth";
import DashboardLayout from "./layouts/Dashboard";
import DocLayout from "./layouts/Doc";
import LandingLayout from "./layouts/Landing";
import FormBuilderLayout from "./layouts/FormBuilder";
import FormViewEmbedExport from "./layouts/FormViewEmbedExport";

// Guards
import AuthGuard from "./components/guards/AuthGuard";

// Landing
const Landing = lazy(() => import("./pages/landing/Landing"));

// Dashboards
const Default = lazy(() => import("./pages/dashboards/Default"));
const Analytics = lazy(() => import("./pages/dashboards/Analytics"));
const SaaS = lazy(() => import("./pages/dashboards/SaaS"));
const Social = lazy(() => import("./pages/dashboards/Social"));
const Crypto = lazy(() => import("./pages/dashboards/Crypto"));

// Pages
const Profile = lazy(() => import("./pages/pages/Profile"));
const Settings = lazy(() => import("./pages/pages/Settings"));
const Clients = lazy(() => import("./pages/pages/Clients"));
const Projects = lazy(() => import("./pages/pages/Projects"));
const Invoice = lazy(() => import("./pages/pages/Invoice"));
const Pricing = lazy(() => import("./pages/pages/Pricing"));
const Tasks = lazy(() => import("./pages/pages/Tasks"));
const Chat = lazy(() => import("./pages/pages/Chat"));
const Blank = lazy(() => import("./pages/pages/Blank"));

// Auth
const Page500 = lazy(() => import("./pages/auth/Page500"));
const Page404 = lazy(() => import("./pages/auth/Page404"));
const SignIn = lazy(() => import("./pages/auth/SignIn"));
const SignUp = lazy(() => import("./pages/auth/SignUp"));
const ResetPassword = lazy(() => import("./pages/auth/ResetPassword"));

// UI components
const Alerts = lazy(() => import("./pages/ui/Alerts"));
const Buttons = lazy(() => import("./pages/ui/Buttons"));
const Cards = lazy(() => import("./pages/ui/Cards"));
const Carousel = lazy(() => import("./pages/ui/Carousel"));
const EmbedVideo = lazy(() => import("./pages/ui/EmbedVideo"));
const General = lazy(() => import("./pages/ui/General"));
const Grid = lazy(() => import("./pages/ui/Grid"));
const Modals = lazy(() => import("./pages/ui/Modals"));
const Offcanvas = lazy(() => import("./pages/ui/Offcanvas"));
const Tabs = lazy(() => import("./pages/ui/Tabs"));
const Typography = lazy(() => import("./pages/ui/Typography"));

// Icons
const Feather = lazy(() => import("./pages/icons/Feather"));
const FontAwesome = lazy(() => import("./pages/icons/FontAwesome"));

// Forms
const Layouts = lazy(() => import("./pages/forms/Layouts"));
const BasicInputs = lazy(() => import("./pages/forms/BasicInputs"));
const InputGroups = lazy(() => import("./pages/forms/InputGroups"));
const FloatingLabels = lazy(() => import("./pages/forms/FloatingLabels"));
const AdvancedInputs = lazy(() => import("./pages/forms/AdvancedInputs"));
const Formik = lazy(() => import("./pages/forms/Formik"));
const Editors = lazy(() => import("./pages/forms/Editors"));

// Tables
const Tables = lazy(() => import("./pages/tables/Tables"));
const Pagination = lazy(() => import("./pages/tables/Pagination"));
const ColumnSorting = lazy(() => import("./pages/tables/ColumnSorting"));
const ColumnFiltering = lazy(() => import("./pages/tables/ColumnFiltering"));
const RowExpanding = lazy(() => import("./pages/tables/RowExpanding"));
const RowSelection = lazy(() => import("./pages/tables/RowSelection"));

// Charts
const Chartjs = lazy(() => import("./pages/charts/Chartjs"));
const ApexCharts = lazy(() => import("./pages/charts/ApexCharts"));

// Notifications
const Notifications = lazy(() => import("./pages/notifications/Notifications"));

// Maps
const GoogleMaps = lazy(() => import("./pages/maps/GoogleMaps"));
const VectorMaps = lazy(() => import("./pages/maps/VectorMaps"));

// Calendar
const Calendar = lazy(() => import("./pages/calendar/Calendar"));

// Documentation
const Introduction = lazy(() => import("./pages/docs/Introduction"));
const GettingStarted = lazy(() => import("./pages/docs/GettingStarted"));
const Routing = lazy(() => import("./pages/docs/Routing"));
const Auth0 = lazy(() => import("./pages/docs/auth/Auth0"));
const Cognito = lazy(() => import("./pages/docs/auth/Cognito"));
const Firebase = lazy(() => import("./pages/docs/auth/Firebase"));
const JWT = lazy(() => import("./pages/docs/auth/JWT"));
const Guards = lazy(() => import("./pages/docs/Guards"));
const APICalls = lazy(() => import("./pages/docs/APICalls"));
const Redux = lazy(() => import("./pages/docs/Redux"));
const Internationalization = lazy(() =>
  import("./pages/docs/Internationalization")
);
const EnvironmentVariables = lazy(() =>
  import("./pages/docs/EnvironmentVariables")
);
const ESLintAndPrettier = lazy(() => import("./pages/docs/ESLintAndPrettier"));
const Deployment = lazy(() => import("./pages/docs/Deployment"));
const MigratingToNextJS = lazy(() => import("./pages/docs/MigratingToNextJS"));
const Support = lazy(() => import("./pages/docs/Support"));
const Changelog = lazy(() => import("./pages/docs/Changelog"));

// Protected routes
const ProtectedPage = lazy(() => import("./pages/protected/ProtectedPage"));

// Users
const UserIndex = lazy(() => import("./pages/user/userIndex"));
const UserNew = lazy(() => import("./pages/user/UserNew"));
const UserView = lazy(() => import("./pages/user/UserView"));
const UserEdit = lazy(() => import("./pages/user/UserEdit"));

// Form Builder
const FormIndex = lazy(() => import("./pages/formBuilder/FormIndex"));
const FormNew = lazy(() => import("./pages/formBuilder/FormNew"));
const FormView = lazy(() => import("./pages/formBuilder/FormView"));
const FormViewPreviewEmbed = lazy(() =>
  import("./pages/formBuilder/FormViewPreviewEmbed")
);
const FormViewEmbed = lazy(() => import("./pages/formBuilder/FormViewEmbed"));
const FormEdit = lazy(() => import("./pages/formBuilder/FormEdit"));

// Form Builder V2
const FormIndexV2 = lazy(() => import("./pages/formBuilderV2/FormIndex"));
// const FormNewV2 = lazy(() => import("./pages/formBuilderV2/FormNew"));
const FormViewV2 = lazy(() => import("./pages/formBuilderV2/FormView"));
const FormViewPreviewEmbedV2 = lazy(() =>
  import("./pages/formBuilderV2/FormViewPreviewEmbed")
);
const FormViewEmbedV2 = lazy(() =>
  import("./pages/formBuilderV2/FormViewEmbed")
);
const FormEditV2 = lazy(() => import("./pages/formBuilderV2/FormEdit"));

// Datalist Builder
const DatalistIndex = lazy(() =>
  import("./pages/datalistBuilder/DatalistIndex")
);
// const DatalistNew = lazy(() => import("./pages/datalistBuilder/DatalistNew"));
// const DatalistView = lazy(() => import("./pages/datalistBuilder/DatalistView"));
const DatalistEdit = lazy(() => import("./pages/datalistBuilder/DatalistEdit"));

// Process Builder
const ProcessIndex = lazy(() => import("./pages/processBuilder/ProcessIndex"));
// const ProcessNew = lazy(() => import("./pages/processBuilder/ProcessNew"));
// const ProcessView = lazy(() => import("./pages/processBuilder/ProcessView"));
const ProcessEdit = lazy(() => import("./pages/processBuilder/ProcessEdit"));

// Management Settings
const RolePermissionIndex = lazy(() =>
  import("./pages/rolePermission/RolePermissionIndex")
);
const RolePermissionNew = lazy(() =>
  import("./pages/rolePermission/RolePermissionNew")
);
const RolePermissionView = lazy(() =>
  import("./pages/rolePermission/RolePermissionView")
);
const RolePermissionEdit = lazy(() =>
  import("./pages/rolePermission/RolePermissionEdit")
);

const routes = [
  {
    path: "/",
    element: <LandingLayout />,
    children: [
      {
        path: "",
        element: <Landing />,
      },
    ],
  },
  {
    path: "dashboard",
    element: <DashboardLayout />,
    children: [
      {
        path: "default",
        element: <Default />,
      },
      {
        path: "analytics",
        element: <Analytics />,
      },
      {
        path: "saas",
        element: <SaaS />,
      },
      {
        path: "social",
        element: <Social />,
      },
      {
        path: "crypto",
        element: <Crypto />,
      },
    ],
  },
  {
    path: "pages",
    element: <DashboardLayout />,
    children: [
      {
        path: "profile",
        element: <Profile />,
      },
      {
        path: "settings",
        element: <Settings />,
      },
      {
        path: "clients",
        element: <Clients />,
      },
      {
        path: "projects",
        element: <Projects />,
      },
      {
        path: "invoice",
        element: <Invoice />,
      },
      {
        path: "pricing",
        element: <Pricing />,
      },
      {
        path: "tasks",
        element: <Tasks />,
      },
      {
        path: "chat",
        element: <Chat />,
      },
      {
        path: "blank",
        element: <Blank />,
      },
    ],
  },
  {
    path: "auth",
    element: <AuthLayout />,
    children: [
      {
        path: "sign-in",
        element: <SignIn />,
      },
      {
        path: "sign-up",
        element: <SignUp />,
      },
      {
        path: "reset-password",
        element: <ResetPassword />,
      },
      {
        path: "404",
        element: <Page404 />,
      },
      {
        path: "500",
        element: <Page500 />,
      },
    ],
  },
  {
    path: "ui",
    element: <DashboardLayout />,
    children: [
      {
        path: "alerts",
        element: <Alerts />,
      },
      {
        path: "buttons",
        element: <Buttons />,
      },
      {
        path: "cards",
        element: <Cards />,
      },
      {
        path: "carousel",
        element: <Carousel />,
      },
      {
        path: "embed-video",
        element: <EmbedVideo />,
      },
      {
        path: "general",
        element: <General />,
      },
      {
        path: "grid",
        element: <Grid />,
      },
      {
        path: "modals",
        element: <Modals />,
      },
      {
        path: "tabs",
        element: <Tabs />,
      },
      {
        path: "offcanvas",
        element: <Offcanvas />,
      },
      {
        path: "typography",
        element: <Typography />,
      },
    ],
  },
  {
    path: "icons",
    element: <DashboardLayout />,
    children: [
      {
        path: "feather",
        element: <Feather />,
      },
      {
        path: "font-awesome",
        element: <FontAwesome />,
      },
    ],
  },
  {
    path: "forms",
    element: <DashboardLayout />,
    children: [
      {
        path: "layouts",
        element: <Layouts />,
      },
      {
        path: "basic-inputs",
        element: <BasicInputs />,
      },
      {
        path: "input-groups",
        element: <InputGroups />,
      },
      {
        path: "floating-labels",
        element: <FloatingLabels />,
      },
    ],
  },
  {
    path: "tables",
    element: <DashboardLayout />,
    children: [
      {
        path: "",
        element: <Tables />,
      },
    ],
  },
  {
    path: "form-plugins",
    element: <DashboardLayout />,
    children: [
      {
        path: "advanced-inputs",
        element: <AdvancedInputs />,
      },
      {
        path: "formik",
        element: <Formik />,
      },
      {
        path: "editors",
        element: <Editors />,
      },
    ],
  },
  {
    path: "advanced-tables",
    element: <DashboardLayout />,
    children: [
      {
        path: "pagination",
        element: <Pagination />,
      },
      {
        path: "column-sorting",
        element: <ColumnSorting />,
      },
      {
        path: "column-filtering",
        element: <ColumnFiltering />,
      },
      {
        path: "row-expanding",
        element: <RowExpanding />,
      },
      {
        path: "row-selection",
        element: <RowSelection />,
      },
    ],
  },
  {
    path: "charts",
    element: <DashboardLayout />,
    children: [
      {
        path: "chartjs",
        element: <Chartjs />,
      },
      {
        path: "apexcharts",
        element: <ApexCharts />,
      },
    ],
  },
  {
    path: "notifications",
    element: <DashboardLayout />,
    children: [
      {
        path: "",
        element: <Notifications />,
      },
    ],
  },
  {
    path: "maps",
    element: <DashboardLayout />,
    children: [
      {
        path: "google-maps",
        element: <GoogleMaps />,
      },
      {
        path: "vector-maps",
        element: <VectorMaps />,
      },
    ],
  },
  {
    path: "calendar",
    element: <DashboardLayout />,
    children: [
      {
        path: "",
        element: <Calendar />,
      },
    ],
  },
  {
    path: "docs",
    element: <DocLayout />,
    children: [
      {
        path: "introduction",
        element: <Introduction />,
      },
      {
        path: "getting-started",
        element: <GettingStarted />,
      },
      {
        path: "routing",
        element: <Routing />,
      },
      {
        path: "auth/auth0",
        element: <Auth0 />,
      },
      {
        path: "auth/cognito",
        element: <Cognito />,
      },
      {
        path: "auth/firebase",
        element: <Firebase />,
      },
      {
        path: "auth/jwt",
        element: <JWT />,
      },
      {
        path: "guards",
        element: <Guards />,
      },
      {
        path: "api-calls",
        element: <APICalls />,
      },
      {
        path: "redux",
        element: <Redux />,
      },
      {
        path: "internationalization",
        element: <Internationalization />,
      },
      {
        path: "environment-variables",
        element: <EnvironmentVariables />,
      },
      {
        path: "eslint-and-prettier",
        element: <ESLintAndPrettier />,
      },
      {
        path: "deployment",
        element: <Deployment />,
      },
      {
        path: "migrating-to-next-js",
        element: <MigratingToNextJS />,
      },
      {
        path: "support",
        element: <Support />,
      },
      {
        path: "changelog",
        element: <Changelog />,
      },
    ],
  },
  {
    path: "private",
    element: (
      <AuthGuard>
        <DashboardLayout />
      </AuthGuard>
    ),
    children: [
      {
        path: "",
        element: <ProtectedPage />,
      },
    ],
  },
  {
    path: "*",
    element: <AuthLayout />,
    children: [
      {
        path: "*",
        element: <Page404 />,
      },
    ],
  },
  {
    path: "users",
    // element: <DashboardLayout />,
    element: (
      <AuthGuard>
        <DashboardLayout />
      </AuthGuard>
    ),
    children: [
      {
        path: "",
        element: <UserIndex />,
      },
      {
        path: "create",
        element: <UserNew />,
      },
      {
        path: "view/:id",
        element: <UserView />,
      },
      {
        path: "edit/:id",
        element: <UserEdit />,
      },
    ],
  },
  {
    path: "form-builder",
    // element: <DashboardLayout />,
    element: (
      <AuthGuard>
        <DashboardLayout />
      </AuthGuard>
    ),
    children: [
      {
        path: "",
        element: <FormIndex />,
      },
      {
        path: "create",
        element: <FormNew />,
      },
      {
        path: "view/:id",
        element: <FormView />,
      },
      {
        path: "view/preview/:id",
        element: <FormViewPreviewEmbed />,
      },
      {
        path: "edit/:id",
        element: <FormEdit />,
      },
      ,
    ],
  },

  {
    path: "datalist-builder",
    // element: <DashboardLayout />,
    element: (
      <AuthGuard>
        <DashboardLayout />
      </AuthGuard>
    ),
    children: [
      {
        path: "",
        element: <DatalistIndex />,
      },
      // {
      //   path: "view/:id",
      //   element: <DatalistView />,
      // },
      {
        path: "edit/:id",
        element: <DatalistEdit />,
      },
      ,
    ],
  },

  {
    path: "form-builder-v2",
    // element: <DashboardLayout />,
    element: (
      <AuthGuard>
        <DashboardLayout />
      </AuthGuard>
    ),
    children: [
      {
        path: "",
        element: <FormIndexV2 />,
      },
      {
        path: "view/:id",
        element: <FormViewV2 />,
      },
      {
        path: "view/preview/:id",
        element: <FormViewPreviewEmbedV2 />,
      },
      {
        path: "edit/:id",
        element: <FormEditV2 />,
      },
      ,
    ],
  },

  {
    path: "forms",
    element: (
      <AuthGuard>
        <FormViewEmbedExport />
      </AuthGuard>
    ),
    // element: <AuthGuard></AuthGuard>,
    children: [
      {
        path: "view/embed/:id",
        // element: <FormViewEmbed />,
        element: <FormViewEmbedV2 />,
      },
    ],
  },

  {
    path: "process-builder",
    element: (
      <AuthGuard>
        <DashboardLayout />
      </AuthGuard>
    ),
    children: [
      {
        path: "",
        element: <ProcessIndex />,
      },
      // {
      //   path: "create",
      //   element: <ProcessNew />,
      // },
      // {
      //   path: "view/:id",
      //   element: <ProcessView />,
      // },
      {
        path: "edit/:id",
        element: <ProcessEdit />,
      },
    ],
  },

  {
    path: "role-permission",
    element: (
      <AuthGuard>
        <DashboardLayout />
      </AuthGuard>
    ),
    children: [
      {
        path: "",
        element: <RolePermissionIndex />,
      },
      {
        path: "create",
        element: <RolePermissionNew />,
      },
      {
        path: "view/:id",
        element: <RolePermissionView />,
      },
      {
        path: "edit/:id",
        element: <RolePermissionEdit />,
      },
    ],
  },
];

export default routes;
