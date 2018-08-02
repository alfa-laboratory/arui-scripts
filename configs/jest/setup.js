const enzyme = require('enzyme');
const Adapter = require('enzyme-adapter-react-16');

// alternative to webpack provide plugin
window.React = require('react');

enzyme.configure({ adapter: new Adapter() });
