'use strict';

var tps = require('../');

describe('tps', function() {

  it('should upload single img', function(done) {
    tps('./test/fixtures/anima.png', function(e, url) {
      (typeof url).should.be.eql('string');
      /^http:\/\/.+?alicdn\.com/.test(url).should.be.eql(true);
      done();
    });
  });

  it('should upload multiple img', function(done) {
    tps(['./test/fixtures/anima.png', './test/fixtures/dog.jpg'], function(e, urls) {
      (typeof urls).should.be.eql('object');
      /^http:\/\/.+?alicdn\.com/.test(urls[0]).should.be.eql(true);
      /^http:\/\/.+?alicdn\.com/.test(urls[1]).should.be.eql(true);
      done();
    });
  });

  it('should throw error when img is not exist', function(done) {
    tps('./test/fixtures/img-not-exist.png', function(e, url) {
      e.should.not.be.eql(null);
      done();
    });
  });

  it('should throw error when img is not exist in multiple img upload', function(done) {
    tps(['./test/fixtures/img-not-exist.png', './test/fixtures/dog.jpg'], function(e, url) {
      e.should.not.be.eql(null);
      done();
    });
  });
});

