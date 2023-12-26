exports.checkType = (val, typeString, typeClass) =>
  typeof val == typeString || val instanceof typeClass;
