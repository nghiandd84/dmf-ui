import React from 'react';
import ReactDOM from 'react-dom';
import { Route, Routes, BrowserRouter, NavLink } from 'react-router-dom';
import tw from 'twin.macro';

import { DemoForm } from './demo/DemoForm';
import { DemoAlert } from './demo/DemoAlert';
import { DemoCard } from './demo/DemoCard';
import { DemoTypography } from './demo/DemoTypography';
import { DemoModal } from './demo/DemoModal';
import { DemoNav } from './demo/DemoNav';
import { DemoDynamicForm } from './demo/DemoDynamicForm';

const App = () => {
  const linkTw = tw`text-xl text-indigo-600 no-underline hover:underline`;
  const baseName = process.env.baseName || '/';
  return (
    <BrowserRouter basename={baseName}>
      <div tw="mx-auto mt-10 mx-10 my-10">
        <Routes>
          <Route path="form" element={<DemoForm />} />
          <Route path="alert" element={<DemoAlert />} />
          <Route path="card" element={<DemoCard />} />
          <Route path="typography" element={<DemoTypography />} />
          <Route path="modal" element={<DemoModal />} />
          <Route path="nav" element={<DemoNav />} />
          <Route path="dynamic-form" element={<DemoDynamicForm />} />
          DemoNav
        </Routes>
        <div tw="my-10">
          <ul>
            <li>
              <NavLink css={[linkTw]} to="/form">
                Form
              </NavLink>
            </li>
            <li>
              <NavLink css={[linkTw]} to="/alert">
                Alert
              </NavLink>
            </li>
            <li>
              <NavLink css={[linkTw]} to="/card">
                Card
              </NavLink>
            </li>
            <li>
              <NavLink css={[linkTw]} to="/typography">
                Typography
              </NavLink>
            </li>
            <li>
              <NavLink css={[linkTw]} to="/modal">
                Modal
              </NavLink>
            </li>
            <li>
              <NavLink css={[linkTw]} to="/nav">
                Nav & Tab
              </NavLink>
            </li>
            <li>
              <NavLink css={[linkTw]} to="/dynamic-form">
                Dynamic Form
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </BrowserRouter>
  );
};
ReactDOM.render(<App />, document.getElementById('app'));
