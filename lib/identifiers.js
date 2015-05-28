module.exports = {
    reVALUE        : /([\.0-9]+)(%|em|ex|ch|rem|vw|vh|vmin|vmax|cm|mm|in|pt|pc|px|deg|grad|rad|turn|s|ms|dpi|dpcm|dppx|fr)/i,
    reIMAGE_VALUE  : /^(?!(?:url\(|"|').*?(image-width|image-height)).*?(image-width|image-height).*?/i,
    reRGBA         : /rgba\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*([\d\.]+\s*)/gi,
    reURL          : /url\s*\(\s*(['"]?)([^\)'"]+)\1\s*\)\s+(\dx)/gi,
    reIMAGE_SET    : /-webkit-image-set\(\s*,\s*\)/gi,
    reALL_PSEUDO   : /::(before|after|first-line|first-letter)/gi,
    reNO_SETURL    : /url\(\s*(['"]?)([^\)'"]+)\1\s*\)/gi,
    reBLANK_LINE   : /(\r\n|\n|\r)(\s*?\1)+/gi,
    reBEFORE_AFTER : /::|:(before|after)/gi,
    reBASE64       : /^data:image\/png;base64,/,
};
