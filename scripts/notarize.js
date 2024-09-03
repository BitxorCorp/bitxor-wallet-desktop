// eslint-disable-next-line @typescript-eslint/no-var-requires
const { notarize } = require('electron-notarize');

exports.default = async function notarizing(context) {
    const { electronPlatformName, appOutDir } = context;

    // Skip notarization when not on Mac OS.
    if (electronPlatformName !== 'darwin') {
        return;
    }

    const appName = context.packager.appInfo.productFilename;

    return notarize({
        appBundleId: 'io.bitxor.desktop-wallet',
        appPath: `${appOutDir}/${appName}.app`,
        appleId: 'xxxxx@gmail.com',
        appleIdPassword: 'xxxxxxxxxx',
    });
};
