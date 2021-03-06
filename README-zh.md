
# CSS Grace

[![Build Status](https://travis-ci.org/cssdream/cssgrace.svg?branch=master)](https://travis-ci.org/cssdream/cssgrace) 
[![NPM Downloads](https://img.shields.io/npm/dm/cssgrace.svg?style=flat)](https://www.npmjs.com/package/cssgrace) 
[![NPM Version](http://img.shields.io/npm/v/cssgrace.svg?style=flat)](https://www.npmjs.com/package/cssgrace) 
[![License](https://img.shields.io/npm/l/cssgrace.svg?style=flat)](http://opensource.org/licenses/MIT) 

  >**d;d;
e$)h57o<eg. e
d<ii"ef*f%g CSSc **

--------------

[English](README.md)

CSS Grace f/d8 d8*g1 PostCSS i)1e
(o<i"ef*f%g CSS ee$ge7%e7c e.g0d:e$'i(ee88g(g IE Hacko<h7ee>g	e.=i+g-	o<position: center g-	e
h=c ef6e/d;%i
e Sass/Less g-	i"e$ge7%e7d=?g(o<f i
h&gf/e.d8
f9e CSS eggh/-f3o<h.) CSS eh57f%f4g. e
o<f4d<ic 


![CSS Grace e
(g;f<g$:](http://gtms03.alicdn.com/tps/i3/TB1OXJaGpXXXXbbXFXXZ.oU0pXX-848-504.gif)


* ee	
o<CSS Grace e/d;%d=d8:d8 g'
 Polyfill e7%e7o<h.)d= e/d;%fe	
d=?g(d8 d: CSS3 gf0g	9f 'c 
* eeo<CSS Grace e/d;%gfe<e.9f'f5h'e(geg'
 Hacko<h.)d= f i fe?'e<e.9f 'c 
* h d= o<e*g(d9&eee3e?f eg CSS h/-f3c 

f d9f 7o<e/f;e/ee'o<

![post and pre](test/img/post-and-pre.png)


d>e&o<i*e94d;,d<g;e88g(d8i"h?f.5 CSS g(f%h'#e3i-ef5.e
(gi.i"o<

```css
.clearfix {
  *zoom: 1;
}
.clearfix:after {
  clear: both;
}
.clearfix:before,
.clearfix:after {
  content: '';
  display: table;
}
```

h?d8*h/-f3g3h=g6e%=g(o<e<e.9f 'h	/e%=o<d=e( HTML d8-d<e:g0ie88e$g `class="clearfix"`c gh3f	d:e0f9e72g;i-ed:f5.e
(o<f	d:d::d8:d:d?i)h57h'o<h?f/if	e
 d8
d:`class="clearfix"`c o(b/b!b0)o

e&f-$d8 f%d;#g f>e>e0$d8:ed=o<h d8e
 d:e>e$f h/-fg classc f4h?d8 f-%o<fd;,g%ie&fh'&ed: BFC geg4 f/h*e8&i-ef5.e
(g	9f 'go<clearfix eg%fh?ec 

Q: i#d9o<CSS Grace e&d=h'#e3e"o<

> A: g4f%d=?g( `clear: fix` e
3e/c 

input:

```css
.foo {
  clear: fix;
}
```

output:

```css
.foo {
  *zoom: 1;
}
.foo:after {
  clear: both;
}
.foo:before,
.foo:after {
  content: '';
  display: table;
}
```

Q: i#d9o<e&d=h'#e3ed=i.i"e"o<

> A: h?f/g4f%d=?g( `clear: fix` e
3e/o<\(^o^)/~

f:h=h/e+o<e&fe-e(h'&e BFC ge1f 'o<d8
gfh/-f3g3c 

input:

```css
.foo {
  clear: fix;
  overflow: hidden; /* e72g;e/d;%i-ef5.e
(d: */
}
```

output:

```css
.foo {
  overflow: hidden; /* e72g;e/d;%i-ef5.e
(d: */
}
```

e01f/i#d9d;;f 'o<

g.e	
e
h=e$d:ef-%i6f.5o<f,"h?e$'e.6fe:f4e$fh'ef3f3c 


## e?+i e< e'

1. d8h==e96e.	h# Node.js

2. f0e;:d8 d8*g.e=o<f/e& test o<e(e=d;$h!d8-ef
"e0h/%g.e=o<e.	h# cssgracec 

```console
npm install cssgrace
```

3. e(i!9g.g.e=f0e"d8 d8* test.jso<d;#g e&d8o<

```console
npm install chokidar
```

```js
var fs       = require('fs')
var cssgrace = require('cssgrace')

var src = 'src/input.css'
console.info('Watchingb &\nModify the input.css and save.')

chokidar.watch(src, {
  ignored: /[\/\\]\./,
  persistent: true
}).on('all',
  function(event, path, stats) {
    var css = fs.readFileSync(src, 'utf8')
    fs.writeFileSync('build/output.css', cssgrace.pack(css))
  })
```

4. e(i!9g.g.e=f0e"d8 d8* input.csso<f3(fg<g h&e ```fs.readFileSync``` d8-gd?fd8 h4c h>e%f5h/g CSS d;#g g	f.5o<f/e&o<

```css
.foo::after {
  position: center;
  width: 210px;
  height: 80px;
  background: rgba(112, 26, 0, .3);
}

.bar {
  display: inline-block;
  opacity: .5;
}
```

5. e(e=d;$h!d8-f	'h! `node test`o<e?+e;gg output.css d8-egd:d; d9e'o<

```css
.foo:after {
  position: absolute;
  left: 50%;
  top: 50%;
  margin-left: -105px;
  margin-top: -40px;
  width: 210px;
  height: 80px;
  background: rgba(112, 26, 0, .3);
  filter: progid:DXImageTransform.Microsoft.gradient(startColorstr='#4c701a00', endColorstr='#4c701a00');
}

:root .foo:after {
  filter: none\9;
}

.bar {
  display: inline-block;
  *display: inline;
  *zoom: 1;
  opacity: .5;
  filter: alpha(opacity=50);
}
```

-------------

## e&d=d=?g(

###  Node Watch & i
ee6d;fd;6

d=?g( chokidar f(!ee.f6gf5 CSS fd;6ee
(o<ef6e/d;%e
 h==e6d;fd;6o<g5f4;f	)e1c 

```js
var fs       = require('fs')
var chokidar = require('chokidar')
var postcss  = require('postcss')
var cssgrace = require('cssgrace')
var nested   = require('postcss-nested') //CSS d;#g e5e%
var minmax   = require('postcss-media-minmax') //d=?g( >=/<= d;#f? @media d8-g min-/max
var selector = require('postcss-custom-selectors') //h*e.d9	i 	f)e(


var src = 'src/input.css'

console.info('Watchingb &\nModify the input.css and save.')


chokidar.watch(src, {
  ignored: /[\/\\]\./,
  persistent: true
}).on('all',
  function(event, path, stats) {
    var css = fs.readFileSync(src, 'utf8')
    var output = postcss()
      .use(minmax())
      .use(cssgrace)
      .use(selector())
      .use(nested)
      .process(css)
      .css;
    fs.writeFileSync('build/output.css', output)
  })
```

### Grunt

```
npm install grunt-postcss
```

```js
module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    postcss: {
      options: {
        processors: [
          require('postcss-custom-selector')(),
          require('cssgrace'),
        ]
      },
      dist: {
        src: ['src/*.css'],
        dest: 'build/grunt.css'
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-postcss');

  grunt.registerTask('default', ['postcss']);
}
```

### Gulp

```
npm install gulp-postcss
```

```js
var gulp = require('gulp');
var rename = require('gulp-rename');
var postcss = require('gulp-postcss');
var cssgrace = require('cssgrace');
var autoprefixer = require('autoprefixer-core')

gulp.task('default', function () {
    var processors = [
        require('cssgrace')
    ];
    gulp.src('src/input.css')
        .pipe(postcss(processors))
        .pipe(rename('gulp.css'))
        .pipe(gulp.dest('build'))
});
gulp.watch('src/*.css', ['default']);
```

## f4e$e
h=

### h*e
(gf 2x hf/e>e<e.9d;#g 

g0d;#f5h'e(d8-o<e/d;%d=?g(f eg `image-set()` e=f0o<d<h*e
(gfd8 f.5 Media Queries f%e<e.9d8
f/f `image-set()` gf5h'e(c 

input:

```css
.foo {
  background-image: -webkit-image-set(
                    url(../img/yuxifan@1x.jpg) 1x,
                    url(../img/yuxifan@2x.jpg) 2x);
}
```

output:

```css
.foo {
  background-image: url(../img/yuxifan@1x.jpg); /* Fallback */
  background-image: -webkit-image-set(
                    url(../img/yuxifan@1x.jpg) 1x,
                    url(../img/yuxifan@2x.jpg) 2x);
}

@media only screen and (min-resolution: 2dppx) {
  .foo {
    background-image: url(../img/yuxifan@2x.jpg);
    background-size: 320px 427px;
}
}
```

### h7ehf/e>e.=i+

d=?g( `image-width` e `image-height` h7ee>g	ge.=i+c 

**f3(fo<** url ee<e7eg image-width e image-height d8
d<h"+h=,f
"c 

input:

```css
.foo {
  background: url(../img/post-and-pre.png);
  width: image-width;
  height: image-height;
}

.foo {
  background: url(../img/post-and-pre.png);
  margin: image-width image-height -image-height;
  content: 'image-width';
}
```

output:

```css
.foo {
  background: url(../img/post-and-pre.png);
  width: 720px;
  height: 719px;
}

.foo {
  background: url(../img/post-and-pre.png);
  margin: 720px 719px -719px;
  content: 'image-width';
}
```

### position:center

e72g%e.=i+eg4 e1d8-o<h*e
(h.!g. margin ee <o<i:;i:;e
d9d8
g(fe?ff0e-&d8
e%=d:c 

input:

```css
.foo {
  position: center;
  width: 300px;
  height: 123px;
}
```

output:

```css
.foo {
  position: absolute;
  left: 50%;
  top: 50%;
  margin-left: -150px;
  margin-top: -61.5px;
  width: 300px;
  height: 123px;
}
```

### d?.e$
e88h'ih//

#### f5.e
(fg;e/9e.d=
eg4 d8
g(e display: block

e=e-e( float: left|right fh  position: absolute|fixed f6o<d<h*e
(e i$e$d=g display: block|inline-blockc 


input:

```css
.foo {
  position: absolute;
  display: block;
}

.foo {
  position: center;
  display: block;
}

.foo {
  float: left;
  display: block;
}
```

output:

```css
.foo {
  position: absolute;
}

.foo {
  position: center;
}

.foo {
  float: left;
}
```

#### g;e/9e.d=
eg4 f5.e
(d8
gf

e-e( position: absolute|fixed f6o<d<h*e
(e i$e$d=g float: left|rightc 

input:

```css
.foo {
  position: absolute;
  float: left;
}
```

output:

```css
.foo {
  position: absolute;
}
```

### h*e
(h!%e(f<ee1f '

#### h*e
(d?.e$
 resize

resize gf overflow e?i!;d8
f/i;h.$g visiblec 

input:

```css
.foo {
  resize: vertical;
}

.foo {
  resize: both;
  overflow: hidden;
}
```

output:

```css
.foo {
  resize: vertical;
  overflow: auto;
}

.foo {
  resize: both;
  overflow: hidden;
}
```

#### h*e
(d?.e$
 text-overflow: ellipsis

input:

```css
.foo {
  text-overflow: ellipsis;
}

.foo {
  text-overflow: ellipsis;
  overflow: auto;
  white-space: normal;
}

```

output:

```css
.foo {
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
}

.foo {
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
}
```

### IE Hack

#### IE opacity

h*e
(gf IE opacity filterc 

input:

```css
.foo {
  opacity: .6;
}

.foo {
  opacity: 0.8293;
}
```

output:

```css
.foo {
  opacity: .6;
  filter: alpha(opacity=60);
}

.foo {
  opacity: 0.8293;
  filter: alpha(opacity=83);
}
```

#### IE RGBA

h*e
(gf IE RGBA filterc 

> g1d: IE9 ef6f/f filter e rgbao<d<e/<h4i"h	2e e
 o<d=?g( IE9 + f/fg `:root` i 	f)e(e;f	 IE9 d8-g filterc 

input:

```css
.foo {
  background: rgba(153, 85, 102, 0.3);
}
```

output:

```css
.foo {
  background: rgba(153, 85, 102, 0.3);
  filter: progid:DXImageTransform.Microsoft.gradient(startColorstr='#4c995566', endColorstr='#4c995566');
}

:root .foo {
  filter: none\9;
}
```

#### IE inline-block

input:

```css
.foo {
  display: inline-block;
}
```

output:

```css
.foo {
  display: inline-block;
  *display: inline;
  *zoom: 1;
}
```

## h4!g.

* e.	h#g8e3gd>h5f(!ec 
* e0
i
g<g i#f <o<e.	h# [EditorConfig](http://editorconfig.org/)o<	c 
* e([test](test)g.e=f7;e
 f5h/g(d>c 
* h?h!f5h/c 

```console
$ git clone git@github.com:cssdream/cssgrace.git
$ git checkout -b patch
$ npm install
$ npm test
```

## [Changelog](CHANGELOG.md)

## [License](LICENSE)
