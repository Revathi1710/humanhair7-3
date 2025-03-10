import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './sidebar.css'; // Import your CSS for styling
import 'bootstrap/dist/css/bootstrap.min.css';

const Sidebar = () => {
  const location = useLocation();

  // State to track the active submenu
  const [activeSubMenu, setActiveSubMenu] = useState(null);

  // Define submenu items
  const menuItems = {
    0: ["/SuperAdmin/AllCategories", "/SuperAdmin/AddCategory", "/SuperAdmin/AllSubCategory", "/SuperAdmin/AddSubCategoryAdmin"],
    1: ["/SuperAdmin/AllCustomer", "/SuperAdmin/AddCustomer"],
    2: ["/SuperAdmin/AllEnquiry"],
    3: ["/SuperAdmin/AllSlider", "/SuperAdmin/AllBanner"],
    6: ["/SuperAdmin/AllUser", "/SuperAdmin/AddBuyer"],
    7: ["/SuperAdmin/AllProduct", "/SuperAdmin/AddProductAdmin"]
  };

  // Set active submenu based on current location
  useEffect(() => {
    Object.keys(menuItems).forEach((key) => {
      if (menuItems[key].includes(location.pathname)) {
        setActiveSubMenu(Number(key));
      }
    });
  }, [location.pathname]);

  return (
    <aside className="sidebar">
      <div id="leftside-navigation" className="nano">
        <ul className="nano-content">
          <li>
            <Link to="/SuperAdmin/AdminDashboard"><i className="fa fa-dashboard"></i><span>Dashboard</span></Link>
          </li>
          
          <li className={`sub-menu ${activeSubMenu === 0 ? 'active' : ''}`}>
            <a href="javascript:void(0);" onClick={() => setActiveSubMenu(activeSubMenu === 0 ? null : 0)}>
              <i className="fas fa-th-large"></i><span>Category</span><i className="arrow fa fa-angle-right pull-right"></i>
            </a>
            <ul style={{ display: activeSubMenu === 0 ? 'block' : 'none' }}>
              <li className={location.pathname === "/SuperAdmin/AllCategories" ? "active-menu" : ""}>
                <Link to="/SuperAdmin/AllCategories">All Categories</Link>
              </li>
              <li className={location.pathname === "/SuperAdmin/AddCategory" ? "active-menu" : ""}>
                <Link to="/SuperAdmin/AddCategory">Add Category</Link>
              </li>
              <li className={location.pathname === "/SuperAdmin/AllSubCategory" ? "active-menu" : ""}>
                <Link to="/SuperAdmin/AllSubCategory">All Subcategories</Link>
              </li>
              <li className={location.pathname === "/SuperAdmin/AddSubCategoryAdmin" ? "active-menu" : ""}>
                <Link to="/SuperAdmin/AddSubCategoryAdmin">Add Subcategory</Link>
              </li>
            </ul>
          </li>

          <li className={`sub-menu ${activeSubMenu === 7 ? 'active' : ''}`}>
            <a href="javascript:void(0);" onClick={() => setActiveSubMenu(activeSubMenu === 7 ? null : 7)}>
              <i className="fa fa-cogs"></i><span>Product</span><i className="arrow fa fa-angle-right pull-right"></i>
            </a>
            <ul style={{ display: activeSubMenu === 7 ? 'block' : 'none' }}>
              <li className={location.pathname === "/SuperAdmin/AllProduct" ? "active-menu" : ""}>
                <Link to="/SuperAdmin/AllProduct">All Products</Link>
              </li>
              <li className={location.pathname === "/SuperAdmin/AddProductAdmin" ? "active-menu" : ""}>
                <Link to="/SuperAdmin/AddProductAdmin">Add Product</Link>
              </li>
            </ul>
          </li>

          <li className={`sub-menu ${activeSubMenu === 1 ? 'active' : ''}`}>
            <a href="javascript:void(0);" onClick={() => setActiveSubMenu(activeSubMenu === 1 ? null : 1)}>
              <i className="fa fa-cogs"></i><span>Seller</span><i className="arrow fa fa-angle-right pull-right"></i>
            </a>
            <ul style={{ display: activeSubMenu === 1 ? 'block' : 'none' }}>
              <li className={location.pathname === "/SuperAdmin/AllCustomer" ? "active-menu" : ""}>
                <Link to="/SuperAdmin/AllCustomer">All Seller</Link>
              </li>
              <li className={location.pathname === "/SuperAdmin/AddCustomer" ? "active-menu" : ""}>
                <Link to="/SuperAdmin/AddCustomer">Add Seller</Link>
              </li>
            </ul>
          </li>
          <li className={`sub-menu ${activeSubMenu === 6 ? 'active' : ''}`}>
            <a href="javascript:void(0);" onClick={() => setActiveSubMenu(activeSubMenu === 6 ? null : 6)}>
              <i className="fa fa-cogs"></i><span>Buyer</span><i className="arrow fa fa-angle-right pull-right"></i>
            </a>
            <ul style={{ display: activeSubMenu === 6 ? 'block' : 'none' }}>
              <li className={location.pathname === "/SuperAdmin/AllBuyer" ? "active-menu" : ""}>
                <Link to="/SuperAdmin/AllUser">All Buyer</Link>
              </li>
              <li className={location.pathname === "/SuperAdmin/AddBuyer" ? "active-menu" : ""}>
                <Link to="/SuperAdmin/AddBuyer">Add Buyer</Link>
              </li>
            </ul>
          </li>
          <li className={`sub-menu ${activeSubMenu === 2 ? 'active' : ''}`}>
            <a href="javascript:void(0);" onClick={() => setActiveSubMenu(activeSubMenu === 2 ? null : 2)}>
              <i className="fa fa-cogs"></i><span>Enquiry</span><i className="arrow fa fa-angle-right pull-right"></i>
            </a>
            <ul style={{ display: activeSubMenu === 2 ? 'block' : 'none' }}>
              <li className={location.pathname === "/SuperAdmin/AllEnquiry" ? "active-menu" : ""}>
                <Link to="/SuperAdmin/AllEnquiry">All Enquiry</Link>
              </li>
            </ul>
          </li>

          <li className={`sub-menu ${activeSubMenu === 3 ? 'active' : ''}`}>
            <a href="javascript:void(0);" onClick={() => setActiveSubMenu(activeSubMenu === 3 ? null : 3)}>
              <i className="fa fa-cogs"></i><span>Homepage Setting</span><i className="arrow fa fa-angle-right pull-right"></i>
            </a>
            <ul style={{ display: activeSubMenu === 3 ? 'block' : 'none' }}>
              <li className={location.pathname === "/SuperAdmin/AllSlider" ? "active-menu" : ""}>
                <Link to="/SuperAdmin/AllSlider">All Slider</Link>
              </li>
              <li className={location.pathname === "/SuperAdmin/AllBanner" ? "active-menu" : ""}>
                <Link to="/SuperAdmin/AllBanner">All Banner</Link>
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </aside>
  );
};

export default Sidebar;
