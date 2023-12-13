module.exports = require("./" +
  { x64: "x64" }[process.arch] +
  "-" +
  { win32: "win", linux: "linux" }[process.platform] +
  "-meta_banner.node");
