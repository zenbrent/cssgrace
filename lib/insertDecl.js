//在后面插入新的属性，并保持注释在当前行
module.exports = function insertDecl(decl, i, newDecl) {
  var next = decl.next(),
    declAfter;
  if (next && next.type == 'comment' && next.before.indexOf('\n') == -1) {
    declAfter = next;
  } else {
    declAfter = decl;
  }
  decl.parent.insertAfter(declAfter, newDecl)
}


