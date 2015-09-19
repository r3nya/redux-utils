'use strict';

exports.__esModule = true;

exports['default'] = function (type) {
  if (!/^[A-Z\_\.]+$/.test(type)) {
    throw new Error('Action definition object "type" property value must consist only of uppercase alphabetical characters and underscores.');
  }
};

module.exports = exports['default'];
//# sourceMappingURL=validateActionType.js.map