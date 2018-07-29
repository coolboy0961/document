## 背景
servicespec、ansible_specなど自動デプロイのテストができるOSS製品を社内サーバーにインストールしたい。  
rubyは社内リポジトリに存在するので、  
```
yum install -y ruby
```
でgemコマンドもインストールできますが、
```
gem install ansible_spec
```
を実行しても、Internetに繋がらないから、インストールすることができません。

## 解決方法
1. [gem-fetch-dependencies.rb](gems/gem-fetch-dependencies.rb)を任意のディレクトリ(ex. /root/gem_packages)に配置する。  
2. 関連のgemsをカレントディレクトリにダウンロードする  

```
cd /root/gem_packages
ruby gem-fetch-dependencies.rb fetch ansible_spec --dependencies
```

## 取得したansible_specのgems  
[ansible_spec.zip](ansible_spec_packages/ansible_spec.zip)
