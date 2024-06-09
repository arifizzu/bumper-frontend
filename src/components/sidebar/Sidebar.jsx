import React from "react";

import PerfectScrollbar from "react-perfect-scrollbar";

import useSidebar from "../../hooks/useSidebar";
import SidebarFooter from "./SidebarFooter";
import SidebarNav from "./SidebarNav";
import { ReactComponent as Logo } from "../../assets/img/logo.svg";

const Sidebar = ({ items, showFooter = true, roles, permissions }) => {
  const { isOpen } = useSidebar();

  console.log("roles", roles);
  console.log("permissions", permissions);
  // Ensure permissions is an array
  const permissionNames = Array.isArray(permissions) ? permissions : [];

  // Filter items based on permissions
  const filteredItems = items
    .map((item) => {
      // Filter pages within each item based on permissions
      const filteredPages = item.pages.filter((page) => {
        // Check if the page has permissions and if any of them match the user's permissions
        return (
          page.permissions &&
          page.permissions.some((permission) =>
            permissionNames.includes(permission)
          )
        );
      });

      // Return the item only if it has any pages left after filtering
      return { ...item, pages: filteredPages };
    })
    .filter((item) => item.pages.length > 0);

  console.log("items", items);
  console.log("filteredItems", filteredItems);

  return (
    <nav className={`sidebar ${!isOpen ? "collapsed" : ""}`}>
      <div className="sidebar-content">
        <PerfectScrollbar>
          <a className="sidebar-brand" href="/dashboard">
            <Logo /> <span className="align-middle me-3">BUMPER</span>
          </a>

          <SidebarNav items={filteredItems} />
          {/* <SidebarNav items={items} /> */}

          {/* {!!showFooter && <SidebarFooter />} */}
        </PerfectScrollbar>
      </div>
    </nav>
  );
};

export default Sidebar;
