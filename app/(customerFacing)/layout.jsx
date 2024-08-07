import { Nav, NavLink } from "../_components/Nav";
export const dynamic = "force-dynamic"; // not cache any of admin pages

const Layout = ({ children }) => {
  return (
    <>
      <Nav>
        <NavLink href="/">Home</NavLink>
        <NavLink href="/products">Products</NavLink>
        <NavLink href="/orders">My Orders</NavLink>
      </Nav>
      <div className="container my-6">{children}</div>
    </>
  );
};

export default Layout;
