import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import toJson from 'enzyme-to-json';

import toApp from '../client/App.js';
import signup from '../client/pages/SingUp.page.js';
import profile from '../client/pages/Profile.page.js';
import login from '../client/pages/Login.page.js';
import createspot from '../client/pages/CreateSpot.page.js';
import deatailspot from '../client/pages/DetailSpot.page.js';
import searchspot from '../clinet/pages/SearchSpots.page.js';

// Newer Enzyme versions require an adapter to a particular version of React
configure({ adapter: new Adapter() });
