# TPS

TPS is a cli for [tps.tms.taobao.com](http://tps.tms.taobao.com/), and can only be used in company or with vpn.

## Install

```
$ npm install tps -g
```

## Usage

in command line

```
$ tps a.jpg
$ tps a.jpg b.jpg
```

in node

``` javascript
var tps = require('tps');
tps('a.jpg', function(e, url) {
  console.log(url);
});
```

``` javascript
var tps = require('tps');
tps(['a.jpg', 'b.jpg'], function(e, urls) {
  console.log(urls.join('\n'));
});
```

## LISENCE

(MIT License)

Copyright (c) 2014 ChenCheng sorrycc@gmail.com
