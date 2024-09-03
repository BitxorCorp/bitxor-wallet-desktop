"use strict";

// eslint-disable-next-line @typescript-eslint/no-var-requires
var _require = require('electron-notarize'),
    notarize = _require.notarize;

exports["default"] = function notarizing(context) {
  var electronPlatformName, appOutDir, appName;
  return regeneratorRuntime.async(function notarizing$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          electronPlatformName = context.electronPlatformName, appOutDir = context.appOutDir; // Skip notarization when not on Mac OS.

          if (!(electronPlatformName !== 'darwin')) {
            _context.next = 3;
            break;
          }

          return _context.abrupt("return");

        case 3:
          appName = context.packager.appInfo.productFilename;
          return _context.abrupt("return", notarize({
            appBundleId: 'io.bitxor.desktop-wallet',
            appPath: "".concat(appOutDir, "/").concat(appName, ".app"),
            appleApiKey: process.env.APPLE_API_KEY_ID,
            appleApiIssuer: process.env.APPLE_API_KEY_ISSUER_ID
          }));

        case 5:
        case "end":
          return _context.stop();
      }
    }
  });
};