import React, { Suspense } from "react";
import { Outlet } from "react-router-dom";

import Wrapper from "../components/Wrapper";
import Sidebar from "../components/sidebar/Sidebar";
import Main from "../components/Main";
import Navbar from "../components/navbar-formBuilder/Navbar";
import Content from "../components/Content";
import Footer from "../components/Footer";
import Settings from "../components/Settings";
import Sidebarfb from "../components/sidebar-formBuilder/Sidebarfb";
import Loader from "../components/Loader";

import formBuilderItems from "../components/sidebar/formBuilderItems";

const ViewEmbedExport = ({ children }) => (
  <React.Fragment>
    <Wrapper>
      {/* <Sidebar items={formBuilderItems} /> */}
      <Main>
        {/* <Navbar /> */}
        <Content>
          <Suspense fallback={<Loader />}>
            {children}
            <Outlet />
          </Suspense>
        </Content>
        {/* <Footer /> */}
      </Main>
    </Wrapper>
    {/* <Settings /> */}
    {/* <Sidebarfb /> */}
  </React.Fragment>
);

export default ViewEmbedExport;
