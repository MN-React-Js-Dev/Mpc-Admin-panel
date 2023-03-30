import React, { useState } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import Footer from "../Footer";
import WithNav from "../WithNav";
import Header from "./Header";
import profile from "../../../assets/img/icons/unicons/man.png"

const SmallNav = () => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)
  const usersData = JSON.parse(sessionStorage.getItem("MPCADMIN"));

  const handleOpen = () => {
    setOpen(!open);
  };

  const [toggle, setToggle] = useState(false);
  const triggerToggle = () => {
    setToggle(!toggle);
    document.body.classList.toggle("dark-theme");
  };

  const handleLogout = () => {
    sessionStorage.removeItem("MPCADMIN");
    navigate("/");
    window.location.reload();
  };

  const handleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen)
  
  }

  return (
    <>
      <nav
        class="layout-navbar container-xxl navbar navbar-expand-xl navbar-detached align-items-center bg-navbar-theme"
        id="layout-navbar"
      >

        <div class="layout-menu-toggle navbar-nav align-items-xl-center me-3 me-xl-0 d-xl-none" onClick={handleDrawer}>
          <a class="nav-item nav-link px-0 me-xl-4">
            <i class="bx bx-menu bx-sm"></i>
          </a>
        </div>
      
        <div
          class="navbar-nav-right d-flex align-items-center"
          id="navbar-collapse"
        >
          <div class="navbar-nav align-items-center">
            <div class="nav-item d-flex align-items-center">
              <i class="bx bx-search fs-4 lh-0"></i>
              <input
                type="text"
                class="form-control border-0 shadow-none"
                placeholder="Search..."
                aria-label="Search..."
              />
            </div>
          </div>

          <ul class="navbar-nav flex-row align-items-center ms-auto">
            <li class="nav-item lh-1 me-3">
              <div
                class={`darklighttoggle ${toggle ? "darklighttoggle2" : ""}`}
                onClick={triggerToggle}
              ></div>
            </li>
           

            <li class="nav-item navbar-dropdown dropdown-user dropdown">
              <a
                class="nav-link dropdown-toggle hide-arrow"
                data-bs-toggle="dropdown"
              >
                <div class="avatar avatar-online" onClick={handleOpen}>
                  <img
                    src={profile}
                    alt
                    class="w-px-40 h-auto rounded-circle"
                  />
                </div>
              </a>
              <ul
                class={`dropdown-menu dropdown-menu-end ${open ? "show" : ""}`}
              >
                <li>
                  <a class="dropdown-item" href="#">
                    <div class="d-flex">
                      <div class="flex-shrink-0 me-3">
                        <div class="avatar avatar-online">
                          <img
                            src={profile}
                            alt
                            class="w-px-40 h-auto rounded-circle"
                          />
                        </div>
                      </div>
                      <div class="flex-grow-1">
                        <span class="fw-semibold d-block">John Doe</span>
                        <small class="text-muted">{usersData?.role}</small>
                      </div>
                    </div>
                  </a>
                </li>
                <li>
                  <div class="dropdown-divider"></div>
                </li>
               
                <li>
                  <Link to='/change-password'>
                    <a class="dropdown-item">
                      <i class="bx bx-cog me-2"></i>
                      <span class="align-middle">Change Password</span>
                    </a>
                  </Link>
                </li>
                <li>
                  <div class="dropdown-divider"></div>
                </li>
                <li>
                  <a class="dropdown-item" onClick={handleLogout}>
                    <i class="bx bx-power-off me-2"></i>
                    <span class="align-middle">Log Out</span>
                  </a>
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </nav>
    </>
  );
};

export default SmallNav;
