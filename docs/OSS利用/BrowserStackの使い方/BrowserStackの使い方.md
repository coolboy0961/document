# BrowserStackの使い方

## ProtractorでBrowserStackのテストを実行するための設定
**dev_ut_browserstack_conf.js**
```javascript
var browserstack = require('browserstack-local');
var HtmlReporter = require('protractor-beautiful-reporter');
var testUtil = require('./testUtil');

// Partractor config file path
var configFilePath = __dirname;

exports.config = {
    // timeout(ms) for waitting angular, default is 11000ms
    // allScriptsTimeout: 20000000,

    framework: 'jasmine',

    // リモート selenium server の待ち受けURLを指定
    seleniumAddress: 'http://hub-cloud.browserstack.com/wd/hub',

    commonCapabilities: {
        'project': 'sample_' + testUtil.getCurrentTime(),
        'browserstack.user': 'sample_username',
        'browserstack.key': 'sample_key',
        'browserstack.local': true,
        'browserstack.console': "errors",
        // 'browserstack.debug': true,
        // 'browserstack.networkLogs': true
    },

    // multiCapabilitiesの最大同時実行数
    maxSessions: 1,

    multiCapabilities: [
        // ios 9,10,11 Safari
        {
            'browserName': 'Safari',
            'device': 'iPhone 6S Plus',
            'realMobile': 'true',
            'os_version': '9.0',
        },
        {
            'browserName': 'Safari',
            'device': 'iPhone 6S Plus',
            'realMobile': 'true',
            'os_version': '9.0',
            'deviceOrientation': 'landscape',
        },
        {
            'browserName': 'Safari',
            'device': 'iPhone 7 Plus',
            'realMobile': 'true',
            'os_version': '10.0',
        },
        {
            'browserName': 'Safari',
            'device': 'iPhone 7 Plus',
            'realMobile': 'true',
            'os_version': '10.0',
            'deviceOrientation': 'landscape',
        },
        {
            'browserName': 'Safari',
            'device': 'iPhone X',
            'realMobile': 'true',
            'os_version': '11.0',
        },
        {
            'browserName': 'Safari',
            'device': 'iPhone X',
            'realMobile': 'true',
            'os_version': '11.0',
            'deviceOrientation': 'landscape',
        },
        // ios 9,10,11 Chrome automationの場合、Browserstackはサポートしない。iphoneならsafariのみ
        // {
        //     'browserName': 'Chrome',
        //     'device': 'iPhone 6S Plus',
        //     'realMobile': 'true',
        //     'os_version': '9.0'
        // },
        // {
        //     'browserName': 'Chrome',
        //     'device': 'iPhone 7',
        //     'realMobile': 'true',
        //     'os_version': '10.0'
        // },
        // {
        //     'browserName': 'Chrome',
        //     'device': 'iPhone 8 Plus',
        //     'realMobile': 'true',
        //     'os_version': '11.0'
        // },
        //Android 4, 5, 6, 7 Chrome 
        {
            'browserName': 'Chrome',
            'device': 'Google Nexus 5',
            'realMobile': 'true',
            'os_version': '4.4',
        },
        {
            'browserName': 'Chrome',
            'device': 'Google Nexus 5',
            'realMobile': 'true',
            'os_version': '4.4',
            'deviceOrientation': 'landscape',
        },
        {
            'browserName': 'Chrome',
            'device': 'Samsung Galaxy S6',
            'realMobile': 'true',
            'os_version': '5.0',
        },
        {
            'browserName': 'Chrome',
            'device': 'Samsung Galaxy S6',
            'realMobile': 'true',
            'os_version': '5.0',
            'deviceOrientation': 'landscape',
        },
        {
            'browserName': 'Chrome',
            'device': 'Samsung Galaxy S7',
            'realMobile': 'true',
            'os_version': '6.0',
        },
        {
            'browserName': 'Chrome',
            'device': 'Samsung Galaxy S7',
            'realMobile': 'true',
            'os_version': '6.0',
            'deviceOrientation': 'landscape',
        },
        {
            'browserName': 'Chrome',
            'device': 'Google Pixel',
            'realMobile': 'true',
            'os_version': '7.1',
        },
        {
            'browserName': 'Chrome',
            'device': 'Google Pixel',
            'realMobile': 'true',
            'os_version': '7.1',
            'deviceOrientation': 'landscape',
        },
        //Windows 7, 10 IE Javascriptに問題あり、 失敗する 
        {
            'os': 'Windows',
            'os_version': '7',
            'browserName': 'IE',
            'browser_version': '11.0',
            'resolution': '1920x1080'
        },
        {
            'os': 'Windows',
            'os_version': '10',
            'browserName': 'IE',
            'browser_version': '11.0',
            'resolution': '1920x1080'
        },
        // Windows 10 Edge
        {
            'os': 'Windows',
            'os_version': '10',
            'browserName': 'Edge',
            'browser_version': '17.0',
            'resolution': '1920x1080'
        },
        // Windows 7 Firefox
        {
            'os': 'Windows',
            'os_version': '7',
            'browserName': 'Firefox',
            'browser_version': '61.0',
            'resolution': '1920x1080'
        },
        // Windows 7,10 Chrome
        {
            'os': 'Windows',
            'os_version': '7',
            'browserName': 'Chrome',
            'browser_version': '68.0',
            'resolution': '1920x1080'
        },
        {
            'os': 'Windows',
            'os_version': '10',
            'browserName': 'Chrome',
            'browser_version': '68.0',
            'resolution': '1920x1080'
        },
        // macOS 10.13 Safari ブラウザウィンドウのサイズを調整する必要がある
        {
            'os': 'OS X',
            'os_version': 'High Sierra',
            'browserName': 'Safari',
            'browser_version': '11.0',
            'resolution': '1920x1080'
        },
    ],

    // 動作させるspecファイルを指定
    specs: ['ut_browserstack_specs/*spec.js'],

    baseUrl: 'http://192.168.31.23:8080/aw/html',
    //baseUrl: 'http://172.20.10.13:8080/aw/html',
    //baseUrl: 'http://10.38.32.110:8080/aw/html',

    // Options to be passed to Jasmine-node.
    jasmineNodeOpts: {
        showColors: true,
        // timeout(ms) for every spec executing
        defaultTimeoutInterval: 30000000
    },

    // setting custom process for prepare test
    onPrepare: function () {
        //Need to use Protractor on a non-Angular website
        browser.waitForAngularEnabled(false);
        // setting for wait time
        browser.shortWaitTime = '3000';
        browser.longWaitTime = '60000';
        // setting for testUtil
        browser.testUtil = testUtil;
        // setting for browser window size
        setTimeout(function () {
            browser.getCapabilities().then(function (s) {
                var realMobile = s.map_.get('realMobile');
                console.log('realMobile : ' + realMobile);
                // モバイル端末の場合、Windowの最大化をしない
                if (!realMobile) {
                    browser.driver.executeScript(function () {
                        return {
                            width: window.screen.availWidth,
                            height: window.screen.availHeight
                        };
                    }).then(function (result) {
                        browser.driver.manage().window().setSize(result.width, result.height);
                        browser.driver.manage().window().setPosition(0, 0);
                    });
                }
            });
        });
        // setting for protractor-beautiful-reporter
        jasmine.getEnv().addReporter(new HtmlReporter({
            baseDirectory: configFilePath + '/ut_browserstack_reports',
            screenshotsSubfolder: 'images',
            jsonsSubfolder: 'jsons',
            docTitle: 'Sample UI BrowserStack Test Report',
            docName: 'index.html',
            //preserveDirectory: false
            //takeScreenShotsOnlyForFailedSpecs: true
        }).getJasmine2Reporter());
    },

    // Code to start browserstack local before start of test
    beforeLaunch: function () {
        console.log("Connecting local");
        return new Promise(function (resolve, reject) {
            exports.bs_local = new browserstack.Local();
            exports.bs_local.start({
                'key': exports.config.commonCapabilities['browserstack.key']
            }, function (error) {
                if (error) return reject(error);
                console.log('Connected. Now testing...');

                resolve();
            });
        });
    },

    // Code to stop browserstack local after end of test
    afterLaunch: function () {
        return new Promise(function (resolve, reject) {
            exports.bs_local.stop(resolve);
        });
    }
};

// Code to support common capabilities
exports.config.multiCapabilities.forEach(function (caps) {
    for (var i in exports.config.commonCapabilities) caps[i] = caps[i] || exports.config.commonCapabilities[i];
});
```