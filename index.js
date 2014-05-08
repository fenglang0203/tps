'use strict';

var fs = require('fs');
var path = require('path');
var url = require('url');
var async = require('async');
var FormData = require('form-data');

module.exports = function(files, cb) {
  // upload single file
  if (typeof files === 'string') {
    return upload(files, cb);
  }

  // upload multi files
  async.concat(files, upload, cb);
};

function upload(file, cb) {
  var form = new FormData();

  if (!fs.existsSync(file)) {
    return cb(new Error('Uncaught Error: ENOENT, open \''+file+'\''));
  }

  var params = {
    nick: encodeURIComponent('云谦'),
    session_id: '012345678',
    photo: fs.createReadStream(file)
  };
  for (var o in params) {
    form.append(o, params[o]);
  }

  var actionURL = "http://tps.tms.taobao.com/photo/upload.htm?_input_charset=utf-8";
  form.submit(url.parse(actionURL), function(err, res) {
    var body = '';
    res.on('data', function(data) {
      body += data.toString();
    });
    res.on('end', function() {
      try {
        var result = JSON.parse(body.toString());
      } catch(e) {}

      var err = null;
      if (!result || !result.url) {
        err = new Error('upload failed');
      }
      cb(err, result.url);
    });
  });
}
