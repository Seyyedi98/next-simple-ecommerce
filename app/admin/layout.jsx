import React from "react";
import { Nav, NavLink } from "../_components/Nav";

export const dynamic = "force-dynamic"; // not cache any of admin pages

const AdminLayout = ({ children }) => {
  return (
    <>
      <Nav>
        <NavLink href="/admin">Dashboard</NavLink>
        <NavLink href="/admin/products">Products</NavLink>
        <NavLink href="/admin/user">Customers</NavLink>
        <NavLink href="/admin/orders">Sales</NavLink>
      </Nav>
      <div className="container my-6">{children}</div>
    </>
  );
};

export default AdminLayout;
