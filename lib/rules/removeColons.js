var identifiers = require('../identifiers');

//伪元素只保留一个冒号
module.exports = function removeColons(rule, i) {
  if (rule.selector.match(identifiers.reALL_PSEUDO)) {
    rule.selector = rule.selector.replace(/::/g, ':');
  }
}
