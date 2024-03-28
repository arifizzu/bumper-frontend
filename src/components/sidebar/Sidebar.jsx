import React from "react";

import PerfectScrollbar from "react-perfect-scrollbar";

import useSidebar from "../../hooks/useSidebar";
import SidebarFooter from "./SidebarFooter";
import SidebarNav from "./SidebarNav";
import { ReactComponent as Logo } from "../../assets/img/logo.svg";

const Sidebar = ({ items, showFooter = true, roles, permissions }) => {
  const { isOpen } = useSidebar();

  const roleNames = roles ? roles.map((role) => role.name) : [];

  const filteredItems = items.filter((item) => {
    // Check if item.pages exists and is an array
    if (Array.isArray(item.pages)) {
      // Iterate over each page
      for (const page of item.pages) {
        // Check if the page has roles
        if (page.roles && page.roles.length > 0) {
          // If roles are found, check if any of them match the roleNames
          if (page.roles.some((role) => roleNames.includes(role))) {
            // If a matching role is found, return true to keep the item
            return true;
          }
        }
      }
      // If no matching roles are found in any page, return false to filter out the item
      return false;
    } else {
      // If item.pages is not an array, handle it as needed
      return false; // or true depending on your logic
    }
  });

  // console.log("items", items);
  // console.log("filteredItems", filteredItems);

  return (
    <nav className={`sidebar ${!isOpen ? "collapsed" : ""}`}>
      <div className="sidebar-content">
        <PerfectScrollbar>
          <a className="sidebar-brand" href="/">
            <Logo /> <span className="align-middle me-3">BUMPER</span>
          </a>

          {/* <SidebarNav items={filteredItems} /> */}

          <SidebarNav items={items} />
          {/* {!!showFooter && <SidebarFooter />} */}
        </PerfectScrollbar>
      </div>
    </nav>
  );
};

export default Sidebar;
