import QUnit from '../../test/qunit.js';
import parseURI from './parse-uri.js';

QUnit.module("can-util/js/parse-uri");

QUnit.test("basics", function () {
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