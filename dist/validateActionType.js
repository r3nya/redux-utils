'use strict';

exports.__esModule = true;

exports['default'] = function (name) {
  if (!/^[A-Z\_]+$/.test(name)) {
    throw new Error('Action definition object "name" property value must consist only of uppercase alphabetical characters and underscores.');
  }
};

module.exports = exports['default'];
//# sourceMappingURL=validateActionType.js.map