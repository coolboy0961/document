# 社内サーバーでansible_specをインストールする方法

## 前提
- centos 6 or 7

## Packages
### centos6の場合
[ruby-2.5.1-1.el6.x86_64.rpm](ansible_spec_packages/ruby-2.5.1-1.el6.x86_64.rpm)

### centos7の場合
[ruby-2.5.1-1.el7.centos.x86_64.rpm](ansible_spec_packages/ruby-2.5.1-1.el7.centos.x86_64.rpm)

### 共通
[highline.zip](ansible_spec_packages/highline.zip)

[rake.zip](ansible_spec_packages/rake.zip)

[ansible_spec.zip](ansible_spec_packagess/ansible_spec.zip)

## インストール手順
```
# yum install ruby-2.5.1-1.el6.x86_64.rpm
読み込んだプラグイン:fastestmirror, security
インストール処理の設定をしています
ruby-2.5.1-1.el6.x86_64.rpm を調べています: ruby-2.5.1-1.el6.x86_64
ruby-2.5.1-1.el6.x86_64.rpm をインストール済みとして設定しています
Loading mirror speeds from cached hostfile
in-house-base                                                                                                           | 3.0 kB     00:00
依存性の解決をしています
--> トランザクションの確認を実行しています。
---> Package ruby.x86_64 0:2.5.1-1.el6 will be インストール
--> 依存性解決を終了しました。

依存性を解決しました

===============================================================================================================================================
 パッケージ                アーキテクチャ              バージョン                          リポジトリー                                   容量
===============================================================================================================================================
インストールしています:
 ruby                      x86_64                      2.5.1-1.el6                         /ruby-2.5.1-1.el6.x86_64                       23 M

トランザクションの要約
===============================================================================================================================================
インストール         1 パッケージ

合計容量: 23 M
インストール済み容量: 23 M
これでいいですか? [y/N]y
パッケージをダウンロードしています:
rpm_check_debug を実行しています
トランザクションのテストを実行しています
トランザクションのテストを成功しました
トランザクションを実行しています
  インストールしています  : ruby-2.5.1-1.el6.x86_64                                                                                        1/1
  Verifying               : ruby-2.5.1-1.el6.x86_64                                                                                        1/1

インストール:
  ruby.x86_64 0:2.5.1-1.el6

完了しました!
```

```
# yum install gcc
```

```
# gem install --local --force ansible_spec/*.gem
Successfully installed ansible_spec-0.2.23
Parsing documentation for ansible_spec-0.2.23
Installing ri documentation for ansible_spec-0.2.23
Done installing documentation for ansible_spec after 0 seconds
Successfully installed builder-3.2.3
Parsing documentation for builder-3.2.3
Installing ri documentation for builder-3.2.3
Done installing documentation for builder after 0 seconds
Successfully installed diff-lcs-1.3
Parsing documentation for diff-lcs-1.3
Couldn't find file to include 'Contributing.rdoc' from README.rdoc
Couldn't find file to include 'License.rdoc' from README.rdoc
Installing ri documentation for diff-lcs-1.3
Done installing documentation for diff-lcs after 1 seconds
Successfully installed erubis-2.7.0
Parsing documentation for erubis-2.7.0
Installing ri documentation for erubis-2.7.0
Done installing documentation for erubis after 0 seconds
Building native extensions. This could take a while...
Successfully installed ffi-1.9.25
Parsing documentation for ffi-1.9.25
Installing ri documentation for ffi-1.9.25
Done installing documentation for ffi after 14 seconds
Successfully installed gssapi-1.2.0
Parsing documentation for gssapi-1.2.0
Installing ri documentation for gssapi-1.2.0
Done installing documentation for gssapi after 0 seconds
Successfully installed gyoku-1.3.1
Parsing documentation for gyoku-1.3.1
Installing ri documentation for gyoku-1.3.1
Done installing documentation for gyoku after 0 seconds
Successfully installed hostlist_expression-0.2.1
Parsing documentation for hostlist_expression-0.2.1
Installing ri documentation for hostlist_expression-0.2.1
Done installing documentation for hostlist_expression after 0 seconds
Successfully installed httpclient-2.8.3
Parsing documentation for httpclient-2.8.3
Installing ri documentation for httpclient-2.8.3
Done installing documentation for httpclient after 2 seconds
Successfully installed inifile-3.0.0
Parsing documentation for inifile-3.0.0
Installing ri documentation for inifile-3.0.0
Done installing documentation for inifile after 0 seconds
Successfully installed little-plugger-1.1.4
Parsing documentation for little-plugger-1.1.4
Installing ri documentation for little-plugger-1.1.4
Done installing documentation for little-plugger after 0 seconds
Successfully installed logging-2.2.2
Parsing documentation for logging-2.2.2
Installing ri documentation for logging-2.2.2
Done installing documentation for logging after 0 seconds
Successfully installed multi_json-1.13.1
Parsing documentation for multi_json-1.13.1
Installing ri documentation for multi_json-1.13.1
Done installing documentation for multi_json after 0 seconds
Successfully installed net-scp-1.2.1
Parsing documentation for net-scp-1.2.1
Installing ri documentation for net-scp-1.2.1
Done installing documentation for net-scp after 0 seconds
Successfully installed net-ssh-4.2.0
Parsing documentation for net-ssh-4.2.0
Installing ri documentation for net-ssh-4.2.0
Done installing documentation for net-ssh after 1 seconds
Successfully installed net-telnet-0.1.1
Parsing documentation for net-telnet-0.1.1
Installing ri documentation for net-telnet-0.1.1
Done installing documentation for net-telnet after 0 seconds
Successfully installed nori-2.6.0
Parsing documentation for nori-2.6.0
Installing ri documentation for nori-2.6.0
Done installing documentation for nori after 0 seconds
Building native extensions. This could take a while...
Successfully installed oj-3.6.2
Parsing documentation for oj-3.6.2
Installing ri documentation for oj-3.6.2
Done installing documentation for oj after 2 seconds
Successfully installed rspec-3.7.0
Parsing documentation for rspec-3.7.0
Installing ri documentation for rspec-3.7.0
Done installing documentation for rspec after 0 seconds
Successfully installed rspec-core-3.7.1
Parsing documentation for rspec-core-3.7.1
Installing ri documentation for rspec-core-3.7.1
Done installing documentation for rspec-core after 1 seconds
Successfully installed rspec-expectations-3.7.0
Parsing documentation for rspec-expectations-3.7.0
Installing ri documentation for rspec-expectations-3.7.0
Done installing documentation for rspec-expectations after 1 seconds
Successfully installed rspec-its-1.2.0
Parsing documentation for rspec-its-1.2.0
Installing ri documentation for rspec-its-1.2.0
Done installing documentation for rspec-its after 0 seconds
Successfully installed rspec-mocks-3.7.0
Parsing documentation for rspec-mocks-3.7.0
Installing ri documentation for rspec-mocks-3.7.0
Done installing documentation for rspec-mocks after 1 seconds
Successfully installed rspec-support-3.7.1
Parsing documentation for rspec-support-3.7.1
Installing ri documentation for rspec-support-3.7.1
Done installing documentation for rspec-support after 0 seconds
Successfully installed rubyntlm-0.6.2
Parsing documentation for rubyntlm-0.6.2
Installing ri documentation for rubyntlm-0.6.2
Done installing documentation for rubyntlm after 0 seconds
Successfully installed serverspec-2.41.3
Parsing documentation for serverspec-2.41.3
Installing ri documentation for serverspec-2.41.3
Done installing documentation for serverspec after 0 seconds
Successfully installed sfl-2.3
Parsing documentation for sfl-2.3
Installing ri documentation for sfl-2.3
Done installing documentation for sfl after 0 seconds
Successfully installed specinfra-2.73.3
Parsing documentation for specinfra-2.73.3
Installing ri documentation for specinfra-2.73.3
Done installing documentation for specinfra after 1 seconds
Successfully installed winrm-2.2.3
Parsing documentation for winrm-2.2.3
Installing ri documentation for winrm-2.2.3
Done installing documentation for winrm after 1 seconds
29 gems installed
```

```
# gem install --local --force rake/rake-12.3.1.gem
Successfully installed rake-12.3.1
Parsing documentation for rake-12.3.1
Installing ri documentation for rake-12.3.1
Done installing documentation for rake after 0 seconds
1 gem installed
```

```
# gem install --local --force highline/highline-2.0.0.gem
Successfully installed highline-2.0.0
Parsing documentation for highline-2.0.0
Installing ri documentation for highline-2.0.0
Done installing documentation for highline after 3 seconds
1 gem installed
```
