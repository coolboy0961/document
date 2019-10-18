# インターネットなしでAnsibleをインストールする方法

## 前提
- centos 6.7
- python 2.6.6

## Packages
[sshpass-1.06-1.el6.x86_64.rpm](ansible_packages/sshpass-1.06-1.el6.x86_64.rpm)  
[ansible-2.4.2.0-1.el6.ans.noarch.rpm](ansible_packages/ansible-2.4.2.0-1.el6.ans.noarch.rpm)


## インストール手順
```
root@kjdv07514# yum install sshpass-1.06-1.el6.x86_64.rpm
読み込んだプラグイン:fastestmirror, security
インストール処理の設定をしています
sshpass-1.06-1.el6.x86_64.rpm を調べています: sshpass-1.06-1.el6.x86_64
sshpass-1.06-1.el6.x86_64.rpm をインストール済みとして設定しています
Loading mirror speeds from cached hostfile
依存性の解決をしています
--> トランザクションの確認を実行しています。
---> Package sshpass.x86_64 0:1.06-1.el6 will be インストール
--> 依存性解決を終了しました。

依存性を解決しました

===============================================================================================================================================
 パッケージ                  アーキテクチャ             バージョン                        リポジトリー                                    容量
===============================================================================================================================================
インストールしています:
 sshpass                     x86_64                     1.06-1.el6                        /sshpass-1.06-1.el6.x86_64                      34 k

トランザクションの要約
===============================================================================================================================================
インストール         1 パッケージ

合計容量: 34 k
インストール済み容量: 34 k
これでいいですか? [y/N]y
パッケージをダウンロードしています:
rpm_check_debug を実行しています
トランザクションのテストを実行しています
トランザクションのテストを成功しました
トランザクションを実行しています
  インストールしています  : sshpass-1.06-1.el6.x86_64                                                                                      1/1
  Verifying               : sshpass-1.06-1.el6.x86_64                                                                                      1/1

インストール:
  sshpass.x86_64 0:1.06-1.el6

完了しました!
```
```
root@kjdv07514# yum install ansible-2.4.2.0-1.el6.ans.noarch.rpm
読み込んだプラグイン:fastestmirror, security
インストール処理の設定をしています
ansible-2.4.2.0-1.el6.ans.noarch.rpm を調べています: ansible-2.4.2.0-1.el6.ans.noarch
ansible-2.4.2.0-1.el6.ans.noarch.rpm をインストール済みとして設定しています
Loading mirror speeds from cached hostfile
依存性の解決をしています
--> トランザクションの確認を実行しています。
---> Package ansible.noarch 0:2.4.2.0-1.el6.ans will be インストール
--> 依存性の処理をしています: python-crypto のパッケージ: ansible-2.4.2.0-1.el6.ans.noarch
--> 依存性の処理をしています: python-jinja2 のパッケージ: ansible-2.4.2.0-1.el6.ans.noarch
--> 依存性の処理をしています: python-paramiko のパッケージ: ansible-2.4.2.0-1.el6.ans.noarch
--> トランザクションの確認を実行しています。
---> Package python-crypto.x86_64 0:2.0.1-22.el6 will be インストール
---> Package python-jinja2.x86_64 0:2.2.1-3.el6 will be インストール
--> 依存性の処理をしています: python-babel >= 0.8 のパッケージ: python-jinja2-2.2.1-3.el6.x86_64
---> Package python-paramiko.noarch 0:1.7.5-2.1.el6 will be インストール
--> トランザクションの確認を実行しています。
---> Package python-babel.noarch 0:0.9.4-5.1.el6 will be インストール
--> 依存性解決を終了しました。

依存性を解決しました

===============================================================================================================================================
 パッケージ                     アーキテクチャ        バージョン                        リポジトリー                                      容量
===============================================================================================================================================
インストールしています:
 ansible                        noarch                2.4.2.0-1.el6.ans                 /ansible-2.4.2.0-1.el6.ans.noarch                 38 M
依存性関連でのインストールをします。:
 python-babel                   noarch                0.9.4-5.1.el6                     in-house-base                                    1.4 M
 python-crypto                  x86_64                2.0.1-22.el6                      in-house-base                                    159 k
 python-jinja2                  x86_64                2.2.1-3.el6                       in-house-base                                    466 k
 python-paramiko                noarch                1.7.5-2.1.el6                     in-house-base                                    728 k

トランザクションの要約
===============================================================================================================================================
インストール         5 パッケージ

合計容量: 41 M
総ダウンロード容量: 2.7 M
インストール済み容量: 54 M
これでいいですか? [y/N]
パッケージをダウンロードしています:
(1/4): python-babel-0.9.4-5.1.el6.noarch.rpm                                                                            | 1.4 MB     00:00
(2/4): python-crypto-2.0.1-22.el6.x86_64.rpm                                                                            | 159 kB     00:00
(3/4): python-jinja2-2.2.1-3.el6.x86_64.rpm                                                                             | 466 kB     00:00
(4/4): python-paramiko-1.7.5-2.1.el6.noarch.rpm                                                                         | 728 kB     00:00
-----------------------------------------------------------------------------------------------------------------------------------------------
合計                                                                                                           9.0 MB/s | 2.7 MB     00:00
rpm_check_debug を実行しています
トランザクションのテストを実行しています
トランザクションのテストを成功しました
トランザクションを実行しています
  インストールしています  : python-crypto-2.0.1-22.el6.x86_64                                                                              1/5
  インストールしています  : python-paramiko-1.7.5-2.1.el6.noarch                                                                           2/5
  インストールしています  : python-babel-0.9.4-5.1.el6.noarch                                                                              3/5
  インストールしています  : python-jinja2-2.2.1-3.el6.x86_64                                                                               4/5
  インストールしています  : ansible-2.4.2.0-1.el6.ans.noarch                                                                               5/5
  Verifying               : python-paramiko-1.7.5-2.1.el6.noarch                                                                           1/5
  Verifying               : python-jinja2-2.2.1-3.el6.x86_64                                                                               2/5
  Verifying               : python-babel-0.9.4-5.1.el6.noarch                                                                              3/5
  Verifying               : python-crypto-2.0.1-22.el6.x86_64                                                                              4/5
  Verifying               : ansible-2.4.2.0-1.el6.ans.noarch                                                                               5/5

インストール:
  ansible.noarch 0:2.4.2.0-1.el6.ans

依存性関連をインストールしました:
  python-babel.noarch 0:0.9.4-5.1.el6              python-crypto.x86_64 0:2.0.1-22.el6           python-jinja2.x86_64 0:2.2.1-3.el6
  python-paramiko.noarch 0:1.7.5-2.1.el6

完了しました!
```

## インストール済み確認
```
root@kjdv07514# ansible --version
ansible 2.4.2.0
  config file = /etc/ansible/ansible.cfg
  configured module search path = [u'/root/.ansible/plugins/modules', u'/usr/share/ansible/plugins/modules']
  ansible python module location = /usr/lib/python2.6/site-packages/ansible
  executable location = /usr/bin/ansible
  python version = 2.6.6 (r266:84292, Jul 23 2015, 15:22:56) [GCC 4.4.7 20120313 (Red Hat 4.4.7-11)]
```

## Ansibleの使い方の公式資料
https://docs.ansible.com/ansible/latest/index.html