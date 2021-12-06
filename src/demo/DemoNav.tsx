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

import Tab from '../components/tab/Tab';
import TabContent from '../components/tab/TabContent';
import TabItem from '../components/tab/TabItem';
import TabList from '../components/tab/TabList';
import TabPane from '../components/tab/TabPane';

import Pagination from '../components/pagination/Pagination';
import PaginationItem from '../components/pagination/PaginationItem';
import Progress from '../components/Progress';
export const DemoNav = () => {
  const [openNavbar, setOpenNavbar] = useState(false);
  const [openTab, setOpenTab] = useState(1);
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
      <div className="flex flex-col w-full mt-5 gap-y-4">
        <Tab>
          <TabList>
            <TabItem
              onClick={(e) => {
                e.preventDefault();
                setOpenTab(1);
              }}
              ripple="light"
              active={openTab === 1 ? true : false}
              href="tabItem"
            >
              <Icon name="language" size="lg" />
              Discover
            </TabItem>
            <TabItem
              onClick={(e) => {
                e.preventDefault();
                setOpenTab(2);
              }}
              ripple="light"
              active={openTab === 2 ? true : false}
              href="tabItem"
            >
              <Icon name="account_circle" size="lg" />
              Profile
            </TabItem>
            <TabItem
              onClick={(e) => {
                e.preventDefault();
                setOpenTab(3);
              }}
              ripple="light"
              active={openTab === 3 ? true : false}
              href="tabItem"
            >
              <Icon name="settings" size="lg" />
              Settings
            </TabItem>
          </TabList>

          <TabContent>
            <TabPane active={openTab === 1 ? true : false}>
              <p>
                I think that’s a responsibility that I have, to push
                possibilities, to show people, this is the level that things
                could be at. So when you get something that has the name Kanye
                West on it, it’s supposed to be pushing the furthest
                possibilities. I will be the leader of a company that ends up
                being worth billions of dollars, because I got the answers. I
                understand culture. I am the nucleus.
              </p>
            </TabPane>
            <TabPane active={openTab === 2 ? true : false}>
              <p>
                I will be the leader of a company that ends up being worth
                billions of dollars, because I got the answers. I understand
                culture. I am the nucleus. I think that’s a responsibility that
                I have, to push possibilities, to show people, this is the level
                that things could be at. I think that’s a responsibility that I
                have, to push possibilities, to show people, this is the level
                that things could be at.
              </p>
            </TabPane>
            <TabPane active={openTab === 3 ? true : false}>
              <p>
                I think that’s a responsibility that I have, to push
                possibilities, to show people, this is the level that things
                could be at. So when you get something that has the name Kanye
                West on it, it’s supposed to be pushing the furthest
                possibilities. I will be the leader of a company that ends up
                being worth billions of dollars, because I got the answers. I
                understand culture. I am the nucleus.
              </p>
            </TabPane>
          </TabContent>
        </Tab>
      </div>
      <div>
        <Progress value={50} percentage={true} />
      </div>
      <div>
        <Pagination>
          <PaginationItem href="#last" ripple="dark">
            <Icon name="keyboard_arrow_left" />
          </PaginationItem>
          <PaginationItem href="#1" ripple="light">
            1
          </PaginationItem>
          <PaginationItem color="primary" href="#2" ripple="dark">
            2
          </PaginationItem>
          <PaginationItem href="#3" ripple="dark">
            3
          </PaginationItem>
          <PaginationItem href="#4" ripple="dark">
            4
          </PaginationItem>
          <PaginationItem href="#5" ripple="dark">
            5
          </PaginationItem>
          <PaginationItem href="#last" ripple="dark">
            <Icon name="keyboard_arrow_right" />
          </PaginationItem>
        </Pagination>
      </div>
    </>
  );
};
