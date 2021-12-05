import React, { useState } from 'react';

import Icon from '../components/Icon/Icon';
import Navbar from '../components/navbar/Navbar';
import NavbarContainer from '../components/navbar/NavbarContainer';
import NavbarWrapper from '../components/navbar/NavbarWrapper';
import NavbarBrand from '../components/navbar/NavbarBrand';
import NavbarToggler from '../components/navbar/NavbarToggler';
import NavbarCollapse from '../components/navbar/NavbarCollapse';
import NavbarInput from '../components/navbar/NavbarInput';

import Nav from '../components/nav/Nav';
import NavItem from '../components/nav/NavItem';
import NavLink from '../components/nav/NavLink';
export const DemoNav = () => {
  const [openNavbar, setOpenNavbar] = useState(false);
  return (
    <>
      <div className="flex flex-col w-full mt-5 gap-y-4">
        <Navbar navbar>
          <NavbarContainer>
            <NavbarWrapper>
              <NavbarBrand className="text-white">Navbar</NavbarBrand>
              <NavbarToggler
                color="primary"
                onClick={() => setOpenNavbar(!openNavbar)}
                ripple="light"
              />
            </NavbarWrapper>

            <NavbarCollapse open={openNavbar}>
              <Nav leftSide>
                <NavItem active={true}>
                  <Icon name="language" size="xl" />
                  Discover
                </NavItem>
                <NavLink href="#navbar">
                  <Icon name="account_circle" size="xl" />
                  Profile
                </NavLink>
                <NavItem>
                  <Icon name="settings" size="xl" />
                  Settings
                </NavItem>
              </Nav>
              <NavbarInput type="text" placeholder="Search here" />
            </NavbarCollapse>
          </NavbarContainer>
        </Navbar>
      </div>
    </>
  );
};
