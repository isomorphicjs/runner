/*
 * Module dependencies
 */
var events = require("events");


exports.init = function init(root, app) {
  window.onpopstate = function() {
    var req = new (require("req"));
    var res = new (require("res"));

    res.on("data", function(data) {
      root.innerHTML = data;
    });
    res.on("end", function() {
      console.log("ended");
    });

    exports.update(app, req, res, root);
  };
};

exports.update = function update(app, req, res, root) {
  app(req, res, function(err) {
    if(!err) return;

    console.error(err.stack || err.message);
    var pre = document.createElement("pre");
    pre.innerHTML = err.stack;
    document.body.appendChild(pre);
  });
};