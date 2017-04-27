'use strict';

var QUnit = require('../../test/qunit');
var parseURI = require('./parse-uri');

QUnit.module("can-util/js/parse-uri");

QUnit.test("basics", function(){
	QUnit.deepEqual(parseURI("http://foo:8080/bar.html#change"), {
    authority: "//foo:8080",
    hash: "#change",
    host: "foo:8080",
    hostname: "foo",
    href: "http://foo:8080/bar.html#change",
    pathname: "/bar.html",
    port: "8080",
    protocol: "http:",
    search: ""
  });
});