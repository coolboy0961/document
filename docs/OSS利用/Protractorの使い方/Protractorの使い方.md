# Protractorの使い方

## 設定
**package.json**
```json
{
  "name": "sample",
  "version": "0.1.0",
  "private": true,
  "scripts": {
    "deploy_materials:local": "cd ../cicd/ansible && ansible-playbook -i inventories/local deploy_app.yml && cd ../../sample-e2e",
    "deploy_materials:it1": "cd ../cicd/ansible && ansible-playbook -i inventories/it1 deploy_app.yml && cd ../../sample-e2e",
    "test:e2e:local": "./startE2ETest_local.sh",
    "test:e2e:it1": "./startE2ETest_it1.sh",
    "test:e2e:local:all": "run-s deploy_materials:local test:e2e:local",
    "test:e2e:local:mini": "run-s deploy_materials:local && ./startE2ETest_local.sh",
    "test:e2e:it1:all": "run-s deploy_materials:it1 test:e2e:it1",
    "wiremock:run": "cd wiremock && ./wiremock.sh && cd ..",
    "wiremock:shutdown": "cd wiremock && ./wiremock.sh shutdown && cd ..",
    "springboot:run": "cd ../sample && mvn clean && mvn spring-boot:run -Dspring-boot.run.profiles=localconfirm && cd ../sample-e2e",
    "confirm": "run-s wiremock:run springboot:run"
  },
  "dependencies": {},
  "devDependencies": {
    "axios": "^0.18.1",
    "eslint": "^5.16.0",
    "eslint-plugin-node": "^6.0.1",
    "eslint-config-eslint": "^5.0.1",
    "eslint-config-prettier": "^4.2.0",
    "eslint-plugin-jasmine": "^2.10.1",
    "eslint-plugin-prettier": "^3.0.1",
    "eslint-plugin-protractor": "^1.41.1",
    "jasmine-spec-reporter": "^4.2.1",
    "npm-run-all": "^4.1.5",
    "prettier": "^1.17.0",
    "protractor": "^5.4.2",
    "protractor-beautiful-reporter": "^1.2.7"
  }
}

```

**protractor_local_conf.js**
```javascript
// Partractor config file path
var configFilePath = __dirname;

var HtmlReporter = require("protractor-beautiful-reporter");
var SpecReporter = require("jasmine-spec-reporter").SpecReporter;
var testUtil = require(configFilePath + "/testUtil");
var WiremockController = require(configFilePath + "/wiremockController");

// test start time
var startTime;

exports.config = {
  // Testing FrameWorkにjasmineを利用
  framework: "jasmine",

  // WebDriver を設定し、テスト前後の自動起動停止を実現
  chromeDriver: configFilePath + "/webdrivers/mac/chromedriver_2.40",

  // async/awaitを利用するときに、これを設定すると安定性が向上する
  // SELENIUM_PROMISE_MANAGER: false,
  // selenuimServerを経由せず、直接WebDeiverでブラウザを起動する。(chromeとfirefoxのみ)
  directConnect: true,

  // selenium server を standalone で起動する。
  //seleniumServerJar: 'webdrivers/selenium-server-standalone-3.13.0.jar',

  // リモート selenium server のにつなげる。
  //seleniumAddress: 'http://localhost:4444/wd/hub',

  // 動作させるspecファイルを指定
  specs: [configFilePath + "/specs/**/*spec.js"],

  baseUrl: "http://localhost:8081/sample",

  // テストさせるブラウザを指定
  capabilities: {
    shardTestFiles: true, // allows specs to be executed in parallel.
    maxInstances: 1, // total number of specs that can be run at once.

    browserName: "chrome",
    chromeOptions: {
      // args: ["--window-size=1920,1080", "disable-application-cache"],
      args: [
        "--headless",
        "--disable-gpu",
        "--window-size=1024,768",
        "disable-application-cache"
      ]
    }
  },
  // テストさせる複数のブラウザを指定
  // multiCapabilities: [
  //     // {
  //     //     browserName: 'firefox',
  //     //     'moz:firefoxOptions': {
  //     //         args: ["--headless"]
  //     //     }
  //     // },
  //     {
  //         browserName: 'chrome',
  //         chromeOptions: {
  //             args: ["--headless", "--disable-gpu", "--window-size=414,736"],
  //         }
  //     },
  // ],
  // Options to be passed to Jasmine-node.
  jasmineNodeOpts: {
    showColors: true,
    // timeout(ms) for every spec executing
    defaultTimeoutInterval: 300000
  },
  beforeLaunch: function() {
    // calculator execute time
    startTime = new Date();
  },
  // setting custom process for prepare test
  onPrepare: async function() {
    //Need to use Protractor on a non-Angular website
    await browser.waitForAngularEnabled(false);
    // setting for wait time
    browser.shortWaitTime = "1000";
    browser.longWaitTime = "2000";
    // setting directory path in global
    browser.__pages = configFilePath + "/pages/";
    // setting for testUtil
    browser.testUtil = testUtil;
    browser.wiremockController = new WiremockController("localhost");
    // setting for jasmine-spec-reporter
    jasmine.getEnv().addReporter(
      new SpecReporter({
        spec: {
          displayStacktrace: true
        }
      })
    );
    // setting for protractor-beautiful-reporter
    jasmine.getEnv().addReporter(
      new HtmlReporter({
        baseDirectory: configFilePath + "/reports",
        screenshotsSubfolder: "images",
        jsonsSubfolder: "jsons",
        docTitle: "sample e2e test Report",
        docName: "index.html",
        //preserveDirectory: false
        takeScreenShotsOnlyForFailedSpecs: true
      }).getJasmine2Reporter()
    );
  },
  afterLaunch: function() {
    // setting for calculator execute time
    var endTime = new Date();
    var ms = endTime.getTime() - startTime.getTime();
    var s = ms / 1000;
    console.log("Test execution time: " + s + "秒");
  }
};

```

**protractor_it_conf.js**
```javascript
// Partractor config file path
var configFilePath = __dirname;

var HtmlReporter = require('protractor-beautiful-reporter');
var SpecReporter = require('jasmine-spec-reporter').SpecReporter;
var testUtil = require(configFilePath + '/testUtil');
var WiremockController = require(configFilePath + '/wiremockController');

// test start time
var startTime;

exports.config = {
    // Testing FrameWorkにjasmineを利用
    framework: 'jasmine',

    // WebDriver を設定し、テスト前後の自動起動停止を実現
    chromeDriver: configFilePath + '/webdrivers/linux/chromedriver_2.40',

    // async/awaitを利用するときに、これを設定すると安定性が向上する
    // SELENIUM_PROMISE_MANAGER: false,
    // selenuimServerを経由せず、直接WebDeiverでブラウザを起動する。(chromeとfirefoxのみ)
    directConnect: true,

    // selenium server を standalone で起動する。
    //seleniumServerJar: 'webdrivers/selenium-server-standalone-3.13.0.jar',

    // リモート selenium server のにつなげる。
    //seleniumAddress: 'http://localhost:4444/wd/hub',

    // 動作させるspecファイルを指定
    specs: [configFilePath + '/specs/**/*spec.js'],

    baseUrl: 'http://10.10.10.10:8081/sample',

    // テストさせるブラウザを指定
    capabilities: {
        shardTestFiles: true, // allows specs to be executed in parallel.
        maxInstances: 1, // total number of specs that can be run at once.

        browserName: 'chrome',
        chromeOptions: {
            //args: ["--window-size=414,736"],
            args: [
                "--no-sandbox",
                "--headless",
                "--disable-gpu",
                "--window-size=1024,768",
            ],
        }
    },
    // テストさせる複数のブラウザを指定
    // multiCapabilities: [
    //     // {
    //     //     browserName: 'firefox',
    //     //     'moz:firefoxOptions': {
    //     //         args: ["--headless"]
    //     //     }
    //     // },
    //     {
    //         browserName: 'chrome',
    //         chromeOptions: {
    //             args: ["--headless", "--disable-gpu", "--window-size=414,736"],
    //         }
    //     },
    // ],
    // Options to be passed to Jasmine-node.
    jasmineNodeOpts: {
        showColors: true,
        // timeout(ms) for every spec executing
        defaultTimeoutInterval: 300000
    },
    beforeLaunch: function () {
        // calculator execute time
        startTime = new Date();
    },
    // setting custom process for prepare test
    onPrepare: async function () {
        //Need to use Protractor on a non-Angular website
        await browser.waitForAngularEnabled(false);
        // setting for wait time
        browser.shortWaitTime = '1000';
        browser.longWaitTime = '2000';
        // setting directory path in global
        browser.__pages = configFilePath + "/pages/";
        // setting for testUtil
        browser.testUtil = testUtil;
        browser.wiremockController = new WiremockController('10.157.56.121');
        // setting for jasmine-spec-reporter
        jasmine.getEnv().addReporter(new SpecReporter({
            spec: {
                displayStacktrace: true
            }
        }));
        // setting for protractor-beautiful-reporter
        jasmine.getEnv().addReporter(new HtmlReporter({
            baseDirectory: configFilePath + '/reports',
            screenshotsSubfolder: 'images',
            jsonsSubfolder: 'jsons',
            docTitle: 'sample e2e test Report',
            docName: 'index.html',
            //preserveDirectory: false
            takeScreenShotsOnlyForFailedSpecs: true
        }).getJasmine2Reporter());
    },
    afterLaunch: function () {
        // setting for calculator execute time
        var endTime = new Date();
        var ms = endTime.getTime() - startTime.getTime();
        var s = ms / 1000
        console.log("Test execution time: " + s + "秒");
    },
};
```

## テストケースの書き方
http://www.protractortest.org/#/api-overview

## テストの実行方法
```shell
#!/bin/sh
echo 'Delete reports/*'
rm -rf `dirname $0`/reports/*

protractor `dirname $0`/protractor_local_conf.js ${@:1}
exit_status1=$?

echo 'Kill chromedrive processes'
ps aux | grep chromedrive | grep -v grep | awk '{ print "kill -9", $2 }' | sh

exit $exit_status1
```

## 特定のテストケースを実行する
`./startE2ETest_local --specs=specs/sample_spec.js`  
https://stackoverflow.com/questions/31382299/protractor-send-spec-suite-name-as-parameter