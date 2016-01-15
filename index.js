var t = require('babel-types');

function getName(key) {
  if (t.isIdentifier(key)) {
    return key.name;
  }
  return key.value.toString();
}

module.exports = function() {
  return {
    visitor: {
      ObjectExpression: function(path) {
        var node = path.node;
        var plainProps = node
          .properties.filter(function(prop) {
            return !t.isSpreadProperty(prop) && !prop.computed;
          });

        var alreadySeenNames = {};

        plainProps
          .filter(function(prop) {
            var name = getName(prop.key);
            if (Object.prototype.hasOwnProperty.call(alreadySeenNames, name)) {
              return true;
            } else {
              alreadySeenNames[name] = true;
              return false;
            }
          })
          .forEach(function(prop) {
            prop.computed = true;
            prop.key = t.stringLiteral(getName(prop.key));
          });
      }
    }
  };
};
