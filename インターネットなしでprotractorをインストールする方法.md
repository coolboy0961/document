# how to install protractor without internet
## prepare on machine which can connect internet
### 前提
すでにnodejsとnpmboxがインストールされている。

### npmboxのパッケージを作成
~~~
npmbox npmbox
~~~

### protractorのパッケージを作成
~~~
npmbox protractor
~~~

### offline machineにコピーする
[protractor_5.4.0.npmbox](protractor_packages/protractor_5.4.0.npmbox)   
[npmbox.npmbox](protractor_packages/npmbox.npmbox)  
- centos 6  
[nodejs-10.6.0-1nodesource.x86_64_el6.rpm](protractor_packages/nodejs-10.6.0-1nodesource.x86_64_el6.rpm)
- centos 7  
[nodejs-10.6.0-1nodesource.x86_64_el7.rpm](protractor_packages/nodejs-10.6.0-1nodesource.x86_64_el7.rpm)

## install package on offline machine
### install nodejs
- centos 6  

~~~
yum -y install nodejs-10.6.0-1nodesource.x86_64_el6.rpm
~~~

- centos 7  

~~~
yum -y install nodejs-10.6.0-1nodesource.x86_64_el7.rpm
~~~

### install npms
~~~
tar --no-same-owner --no-same-permissions -xvzf npmbox.npmbox
npm install --global --cache ./.npmbox.cache --optional --cache-min 99999999999 --shrinkwrap false npmbox
~~~

~~~
npm cache clean
npmunbox -g protractor_5.4.0.npmbox
~~~