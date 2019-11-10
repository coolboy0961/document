# GruntでProtractorのテストのJavascript_Coverageを取得する方法

## 設定
**Gruntfile.js**
```javascript
module.exports = function (grunt) {
    grunt.initConfig({
        babel: {
            options: {
                sourceMaps: true,
                presets: ['@babel/preset-env'],
                sourceType: "script"
            },
            dist: {
                files: [{
                    expand: true,
                    cwd: '../materials_ui/nginx/sample/js/',
                    src: ['**/*.js'],
                    dest: '../materials_ui/nginx/sample/js_tmp/'
                }]
            }
        },
        cssmin: {
            minify: {
                files: [{
                    expand: true,
                    cwd: '../materials_ui/nginx/sample/css/',
                    src: ['**/*.css'],
                    dest: '../materials_ui/nginx/sample/css_tmp/'
                }]
            }
        },
        copy: {
            main: {
                expand: true,
                cwd: '../materials_ui/nginx/sample',
                src: ['**', '!js/**/*.js'],
                dest: 'test/coverage/instrumented/sample'
            },
            js_instrument: {
                expand: true,
                cwd: '../materials_ui/nginx/sample/js',
                src: ['**/*.js'],
                dest: 'js'
            }
        },
        instrument: {
            files: 'js/**/*.js',
            options: {
                lazy: true,
                basePath: "test/coverage/instrumented/sample"
            }
        },
        connect: {
            server: {
                options: {
                    port: 9000,
                    base: 'test/coverage/instrumented'
                }
            },
            server_mocked: {
                options: {
                    port: 9000,
                    base: 'test/coverage/instrumented',
                    keepalive: true
                }
            },
            server_proxied: {
                options: {
                    port: 9000,
                    base: 'test/coverage/instrumented',
                    keepalive: true,
                    middleware: function (connect, options, defaultMiddleware) {
                        var proxy = require('grunt-connect-proxy/lib/utils').proxyRequest;
                        return [proxy].concat(defaultMiddleware);
                    }
                },
                proxies: [{
                    context: '/cmecsSelf',
                    host: 'localhost',
                    port: 18080
                }]
            }
        },
        protractor_coverage: {
            options: {
                keepAlive: false,
                noColor: false,
                coverageDir: 'test/coverage/json',
                args: {
                    baseUrl: 'http://localhost:9000/sample/html'
                },
            },
            local: {
                options: {
                    configFile: 'test/dev_ut_conf.js',
                }
            },
            local_pc: {
                options: {
                    configFile: 'test/dev_ut_conf_pc.js',
                }
            },
            ci: {
                options: {
                    configFile: 'test/ci_ut_conf.js',
                }
            },
            ci_pc: {
                options: {
                    configFile: 'test/ci_ut_conf_pc.js',
                }
            }
        },
        makeReport: {
            src: 'test/coverage/json/*.json',
            options: {
                type: 'lcov',
                dir: 'test/coverage/report',
                print: 'detail'
            }
        },
        clean: {
            instrument: ['js', './test/coverage/instrumented'],
            report: ['test/ut_reports/*', 'test/coverage/report', 'test/coverage/json']
        },
        exec: {
            create_materials: {
                cwd: '../cicd/ansible/',
                command: 'ansible-playbook -i inventories/local --tags create_materials deploy.yml'
            },
            create_materials_mocked: {
                cwd: '../cicd/ansible/',
                command: 'ansible-playbook -i inventories/local_mock --tags create_materials deploy.yml'
            },
            create_materials_unmocked: {
                cwd: '../cicd/ansible/',
                command: 'ansible-playbook -i inventories/it2 --tags create_materials deploy.yml'
            },
            kill_chromedrivers: {
                command: `echo 'Kill chromedrive processes';` +
                    `ps aux | grep chromedrive | grep -v grep | awk '{ print "kill -9", $2 }' | sh`,
                stdout: true,
                stderr: true
            },
            sonar_scanner: {
                command: 'sonar-scanner'
            }
        }
    });

    grunt.loadNpmTasks('grunt-babel');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-connect-proxy');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-istanbul');
    grunt.loadNpmTasks('grunt-protractor-coverage');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-exec');

    grunt.registerTask('compile', ['babel', 'cssmin']);
    // grunt test --disableChecks
    grunt.registerTask('test', [
        'exec:create_materials',
        'clean:report',
        'copy',
        'instrument',
        'connect:server',
        'protractor_coverage:local_pc',
        'protractor_coverage:local',
        'makeReport',
        'clean:instrument',
        'exec:kill_chromedrivers'
    ]);
    grunt.registerTask('test-ci', [
        'exec:create_materials',
        'clean:report',
        'copy',
        'instrument',
        'connect:server',
        'protractor_coverage:ci_pc',
        'protractor_coverage:ci',
        'makeReport',
        'exec:sonar_scanner',
        'clean:instrument',
        'exec:kill_chromedrivers'
    ]);
    grunt.registerTask('serve', 'Start a connect web server on port 9000 with proxy to REST API.', [
        'exec:create_materials_unmocked',
        'copy',
        'instrument',
        'configureProxies:server_proxied',
        'connect:server_proxied'
    ]);
    grunt.registerTask('serve-mocked', 'Start a connect web server on port 9000 with API mock.', [
        'exec:create_materials_mocked',
        'copy',
        'instrument',
        'connect:server_mocked'
    ]);
}
```

## SonarScanの設定ファイル
**sonar-project.properties**
```properties
sonar.projectKey=sample-JS
sonar.sources=.
sonar.host.url=http://10.10.10.10:19000
# sonar.login=sonarqubeのaccess key

sonar.projectName=sample-JS
sonar.projectVersion=0.0.1-SNAPSHOT

sonar.javascript.lcov.reportPaths=./test/coverage/report/lcov.info

sonar.sources=js
sonar.exclusions=js/common/tracking-analytics.js
```