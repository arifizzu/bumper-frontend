import React from "react";

import PerfectScrollbar from "react-perfect-scrollbar";

import useSidebar from "../../hooks/useSidebar";
import SidebarFooter from "./SidebarFooter";
import SidebarNav from "./SidebarNav";
import { ReactComponent as Logo } from "../../assets/img/logo.svg";

const Sidebar = ({ items, showFooter = true, roles, permissions }) => {
  const { isOpen } = useSidebar();

  const roleNames = roles ? roles.map((role) => role.name) : [];
  // console.log("roleNames", roleNames);

  const filteredItems = items.filter((item) => {
    // console.log("items", items);
    return !item.roles || item.roles.some((role) => roleNames.includes(role));
  });

  return (
    <nav className={`sidebar ${!isOpen ? "collapsed" : ""}`}>
      <div className="sidebar-content">
        <PerfectScrollbar>
          <a className="sidebar-brand" href="/">
            <Logo /> <span className="align-middle me-3">BUMPER</span>
          </a>

          {/* <SidebarNav items={filteredItems} />
          {!!showFooter && <SidebarFooter />} */}
          <SidebarNav items={items} />
          {/* {!!showFooter && <SidebarFooter />} */}
        </PerfectScrollbar>
      </div>
    </nav>
  );
};

export default Sidebar;
