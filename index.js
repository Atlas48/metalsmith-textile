/* Forked from `metalsmith-markdown` by GitHub:segmentio
*  <https://github.com/segmentio/metalsmith-markdown> */
var textile, path, dirname, extname, debug, fnmatch, txti;
textile = require('textile-js');
path = require('path'), dirname = path.dirname, extname = path.extname;
debug = require('debug')('metalsmith-textile');
fnmatch = /txti$|txtl$|textile$/;
/**
* Check if a file is a textile file 
*
* @param string fn
* @return boolean
*/
txti = function(fn){
  return fnmatch.test(extname(fn));
};
module.exports = function(options){
  var keys;
  options = options ?? {};
  keys = options.keys ?? [];
  return function(files, metalsmith, done){
    var file, value, data, dir, html, str, e, i$, ref$, len$, i, results$ = [];
    setImmediate(done);
    for (file in files) {
      value = files[file];
      if (!txti(file)) continue;
      data = files[file];
      dir = dirname[file];
      html = file.replace(fnmatch, 'html');
      debug('converting file: %s', file);
      str = textile(data.contents.toString(), options);
      try {
        data.contents = Buffer.from(str);
      } catch (e$) {
        e = e$;
        data.contents(new Buffer(str));
        for (i$ = 0, len$ = (ref$ = keys).length; i$ < len$; ++i$) {
          i = ref$[i$];
          if (data[i]) {
            data[i] = textile(data[key].toString(), options);
          }
        }
      }
      delete files[file];
      results$.push(files[html] = data);
    }
    return results$;
  };
};
