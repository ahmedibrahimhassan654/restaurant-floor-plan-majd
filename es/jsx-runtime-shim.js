'use strict';

// This is a compatibility shim for older React versions
var React = require('react');

// CommonJS exports
exports.jsx = React.createElement;
exports.jsxs = React.createElement;
exports.Fragment = React.Fragment;

// No need for the default export when using CommonJS
// Remove these lines:
// export default {
//   jsx,
//   jsxs,
//   Fragment
// };