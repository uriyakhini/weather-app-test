// polyfill PhantomJS environment
import 'babel-polyfill'
import 'whatwg-fetch'

import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({ adapter: new Adapter() });

// require all the test files in the test folder that end with .spec.js or .spec.jsx
const testsContext = require.context("../src", true, /\.spec\.jsx?$/);
testsContext.keys().forEach(testsContext);

// output at when the test were run
console.info(`TESTS RAN AT ${new Date().toLocaleTimeString()}`);