var path = require('path'),
    postcss = require('postcss'),
    sizeOf = require('image-size'),
    identifiers = require('../identifiers');

//获取css文件中的资源的绝对地址
function getAbsolutePath(currentFilePath, sourcePath) {
  //移除url中带有 ？参数的内容
  return path.resolve(currentFilePath, sourcePath.split("?")[0]);
}

//根据decl.value的值，返回paths数组
function returnURL(val, reg) {
  var result, paths = []
  while ((result = reg.exec(val)) != null) {
    paths.push(result);
  }
  return paths;
}

module.exports = function imageSetMixin(decl, i, currentFilePath) {
  /**
   * 兼容高清屏背景图片
   * 1x = 1dppx = 96dpi ≈0.39dpcm
   * 1dpcm ≈ 2.54dpi
   Todo: 获取在线图片尺寸
   */
   // 暂不考虑 border-image
  if (decl.prop == 'background' || decl.prop == 'background-image') {
    if (decl.value.indexOf('image-set(') != -1) {
      var paths = returnURL(decl.value, identifiers.reURL);

      var obj = {};
      for (var j = 0; j < paths.length; j++) {
        obj.url = paths[j][2];
        obj.path = "url(" + obj.url + ")";
        var fullPath = decl.value.replace(identifiers.reURL, '').replace(identifiers.reIMAGE_SET, obj.path);
        obj.whichImg = paths[j][3];
        if (obj.whichImg == "1x" || obj.whichImg == "1x") {
          // var normalSizes = sizeOf(getAbsolutePath(currentFilePath, obj.url));
          var normalSizes = identifiers.reBASE64.test(obj.url) ?
            sizeOf(new Buffer(obj.url.replace(identifiers.reBASE64, ''), 'base64')) :
            sizeOf(getAbsolutePath(currentFilePath, obj.url));

          normalWidth = normalSizes.width + 'px';
          normalHeight = normalSizes.height + 'px';

          if (decl.prop == 'background') {
            decl.parent.insertBefore(i, {
              prop: 'background',
              value: fullPath
            });
          } else if (decl.prop == 'background-image') {
            decl.parent.insertBefore(i, {
              prop: 'background-image',
              value: obj.path
            });
          }

        } else if (obj.whichImg == "2x" || obj.whichImg == "2x") {
          var rSizes = sizeOf(getAbsolutePath(currentFilePath, obj.url)); //2倍图尺寸
          rWidth = rSizes.width / 2 + 'px';
          rHeight = rSizes.height / 2 + 'px';
          bgSize = rWidth + ' ' + rHeight; //2倍图的宽和高

          var atRuleObj = {};
          atRuleObj.name = "media";
          //其他前缀交给 Autoprefixer 处理
          var newParams = 'only screen and (min-resolution: 192dpi), only screen and (min-resolution: 2dppx)';

          var atRule = postcss.atRule({
            name: 'media',
            params: newParams
          });

          var nextrule = postcss.rule({
            selector: decl.parent.selector,
            after: decl.parent.after,
            before: '\n  '
          });
          //插入 @规则 中的选择器
          nextrule.append({
            prop: 'background-image',
            value: obj.path
          }).append({
            prop: 'background-size',
            value: bgSize
          });
          atRule.append(nextrule);

          //插入 @规则
          decl.parent.parent.insertAfter(decl.parent, atRule);
        }
      }
    } else if (decl.value.indexOf('url(') != -1) {
      //没有image-set，执行以下
      var retinaPaths = returnURL(decl.value, identifiers.reNO_SETURL) //获取第一个url图片的路径

      // var retinaSizes = sizeOf(getAbsolutePath(currentFilePath, retinaPaths[0][2]));

      // 计算 base64 图片尺寸
      var retinaSizes = identifiers.reBASE64.test(retinaPaths[0][2]) ?
        sizeOf(new Buffer(retinaPaths[0][2].replace(identifiers.reBASE64, ''), 'base64')) :
        sizeOf(getAbsolutePath(currentFilePath, retinaPaths[0][2]));

      normalWidth = retinaSizes.width + 'px';
      normalHeight = retinaSizes.height + 'px';
    }
  }

  /**
   * 获取图片尺寸
   .foo{
     background: url(images/foo.png);
     width: image-width;
     height: image-height;
   }
   */
  //decl的值中有image-width和image-height都替换掉
  //只替换非 url() 非引号中的值
  if (identifiers.reIMAGE_VALUE.test(decl.value)) {
    decl.value = decl.value.replace(/image-width/gi, normalWidth)
                           .replace(/image-height/gi, normalHeight);
  }
}

