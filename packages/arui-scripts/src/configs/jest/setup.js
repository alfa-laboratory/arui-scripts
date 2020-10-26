const enzyme = require('enzyme');
try {
    const Adapter = require('enzyme-adapter-react-16');

// alternative to webpack provide plugin
    window.React = require('react');

    enzyme.configure({ adapter: new Adapter() });
} catch (e) {
    console.warn('Error while loading enzyme adapter', e);
}

