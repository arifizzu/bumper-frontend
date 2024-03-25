import React, { Suspense, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Outlet } from "react-router-dom";

import Wrapper from "../components/Wrapper";
import Sidebar from "../components/sidebar/Sidebar";
import Main from "../components/Main";
import Navbar from "../components/navbar/Navbar";
import Content from "../components/Content";
import Footer from "../components/Footer";
import Settings from "../components/Settings";
import Loader from "../components/Loader";

import dashboardItems from "../components/sidebar/dashboardItems";

const Dashboard = ({ children }) => {
  // const { roles, permissions } = useSelector((state) => state.auth);

  const roles = JSON.parse(localStorage.getItem("roles"));
  const permissions = JSON.parse(localStorage.getItem("permissions"));
  console.log("roles", roles);
  console.log("permissions", permissions);
  return (
    <React.Fragment>
      <Wrapper>
        <Sidebar
          items={dashboardItems}
          roles={roles}
          permissions={permissions}
        />
        <Main>
          <Navbar />
          <Content>
            <Suspense fallback={<Loader />}>
              {children}
              <Outlet />
            </Suspense>
          </Content>
          <Footer />
        </Main>
      </Wrapper>
      <Settings />
    </React.Fragment>
  );
};

export default Dashboard;
