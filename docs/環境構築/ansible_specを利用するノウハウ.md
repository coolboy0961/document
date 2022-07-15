# ansible\_specを利用するノウハウ


## ディレクトリ構成

```
green-repo/cicd/ansible
├── README.md # 全体説明ドキュメント
├── Rakefile  # ansible_spec起動用ファイル、修正不可
├── ansible.cfg # ansible設定ファイル
├── deploy.yml # ansibleのデプロイ用playbook
├── inventories # 各環境ごとに環境情報を保持
│   ├── it2
│   │   ├── group_vars
│   │   │   └── webservers # サーバータイプ単位の変数を宣言
│   │   ├── host_vars
│   │   │   └── 192.168.3.126 # ホスト単位の変数を宣言
│   │   └── hosts # ホストIPをまとめて記述
│   ├── local # ローカル試験用
│   │   ├── group_vars
│   │   │   └── webservers
│   │   ├── host_vars
│   │   │   └── localhost
│   │   └── hosts
│   ├── production
│   │   ├── group_vars
│   │   │   └── webservers
│   │   ├── host_vars
│   │   │   ├── 192.168.4.107
│   │   │   ├── 192.168.4.108
│   │   │   └── 192.168.4.109
│   │   └── hosts
│   └── st
│       ├── group_vars
│       │   └── webservers
│       ├── host_vars
│       │   └── 192.168.3.193
│       └── hosts
├── roles 
│   ├── deploy_fluentd # fluentdのデプロイのansibleファイル一式
│   │   ├── README.md
│   │   ├── defaults
│   │   │   └── main.yml
│   │   ├── files
│   │   ├── handlers
│   │   │   └── main.yml
│   │   ├── meta
│   │   │   └── main.yml
│   │   ├── spec # ansibleのファイルではなく、ansible_specのファイルで、ここにfluentdの設定をテストする内容を記述
│   │   │   └── deploy_fluentd_spec.rb
│   │   ├── tasks
│   │   │   └── main.yml
│   │   ├── templates
│   │   │   └── td-agent-apollon.conf.j2
│   │   ├── tests
│   │   │   ├── inventory
│   │   │   └── test.yml
│   │   └── vars
│   │       └── main.yml
│   ├── deploy_material_to_wildfly
│   │   ├── README.md
│   │   ├── defaults
│   │   │   └── main.yml
│   │   ├── files
│   │   ├── handlers
│   │   │   └── main.yml
│   │   ├── meta
│   │   │   └── main.yml
│   │   ├── spec
│   │   │   └── deploy_material_to_wildfly_spec.rb
│   │   ├── tasks
│   │   │   └── main.yml
│   │   ├── templates
│   │   ├── tests
│   │   │   ├── inventory
│   │   │   └── test.yml
│   │   └── vars
│   │       └── main.yml
│   └── server_init
│       ├── README.md
│       ├── defaults
│       │   └── main.yml
│       ├── files
│       │   └── add_message_pattern.cli
│       ├── handlers
│       │   └── main.yml
│       ├── meta
│       │   └── main.yml
│       ├── spec
│       │   └── server_init_spec.rb
│       ├── tasks
│       │   └── main.yml
│       ├── templates
│       │   ├── add_wildfly_settings.cli.j2
│       │   └── remove_wildfly_settings.cli.j2
│       ├── tests
│       │   ├── inventory
│       │   └── test.yml
│       └── vars
│           └── main.yml
├── spec # ansible_specのファイルで一箇所修正することで自動的にsshログインできるようになる。後で説明
│   └── spec_helper.rb
├── test # ローカルテスト時に使うフォルダ
│   ├── etc
│   │   └── jmx-agent
│   │       └── config
│   │           └── wildfly
│   │               └── wildfly10
│   │                   └── applicationContext.xml
│   └── root
│       └── work
│           └── materials
│               └── wildfly
│                   ├── CHK.war
│                   ├── add_message_pattern.cli
│                   ├── plan-entry-system-web.war
│                   └── plan-entry-system.war
└── test.yml # ansible_specのファイルで、テストケースごとに記述
```

## テストの実行コマンド
```
INVENTORY=inventories/it2/hosts VARS_DIRS_PATH=inventories/it2 rake serverspec:test_deploy_fluentd
```

## 自動的にsshログインの実現方法
VARS_DIRS_PATHを`inventories/it2`に指定することで、it2環境のgroup変数、host変数に定義されたsshパスワードを`property['ansible_ssh_pass']で取得ができる。  
`spec/spec_helper.rb`に`options[:password] = property['ansible_ssh_pass']`を追加することで、自動ログインできるようになる。  
具体的な場所は`spec_helper.rb`をご参照ください。

### spec_helper.rb
```ruby
require 'serverspec'
require 'net/ssh'
require 'ansible_spec'
require 'winrm'

#
# Set ansible variables to serverspec property
#
host = ENV['TARGET_HOST']
hosts = ENV["TARGET_HOSTS"]

group_idx = ENV['TARGET_GROUP_INDEX'].to_i
vars = AnsibleSpec.get_variables(host, group_idx,hosts)
ssh_config_file = AnsibleSpec.get_ssh_config_file
set_property vars

connection = 'ssh'

case connection
when 'ssh'
#
# OS type: UN*X
#
  set :backend, :ssh

  if ENV['ASK_BECOME_PASSWORD']
    begin
      require 'highline/import'
    rescue LoadError
      fail "highline is not available. Try installing it."
    end
    set :become_password, ask("Enter become password: ") { |q| q.echo = false }
  else
    set :become_password, ENV['BECOME_PASSWORD']
  end

  options = Net::SSH::Config.for(host)

  options[:user] = ENV['TARGET_USER'] || options[:user]
  options[:port] = ENV['TARGET_PORT'] || options[:port]
  options[:keys] = ENV['TARGET_PRIVATE_KEY'] || options[:keys]

  if ssh_config_file
    from_config_file = Net::SSH::Config.for(host,files=[ssh_config_file])
    options.merge!(from_config_file)
  end

  options[:password] = property['ansible_ssh_pass']

  set :host,        options[:host_name] || host
  set :ssh_options, options

  # Disable become
  # set :become, false


  # Set environment variables
  # set :env, :LANG => 'C', :LC_MESSAGES => 'C'

  # Set PATH
  # set :path, '/sbin:/usr/local/sbin:$PATH'
when 'winrm'
#
# OS type: Windows
#
  set :backend, :winrm
  set :os, :family => 'windows'

  user = ENV['TARGET_USER']
  port = ENV['TARGET_PORT']
  pass = ENV['TARGET_PASSWORD']

  if user.nil?
    begin
      require 'highline/import'
    rescue LoadError
      fail "highline is not available. Try installing it."
    end
    user = ask("\nEnter #{host}'s login user: ") { |q| q.echo = true }
  end
  if pass.nil?
    begin
      require 'highline/import'
    rescue LoadError
      fail "highline is not available. Try installing it."
    end
    pass = ask("\nEnter #{user}@#{host}'s login password: ") { |q| q.echo = false }
  end

  endpoint = "http://#{host}:#{port}/wsman"

  winrm = ::WinRM::WinRMWebService.new(endpoint, :ssl, :user => user, :pass => pass, :basic_auth_only => true)
  winrm.set_timeout 300 # 5 minutes max timeout for any operation
  Specinfra.configuration.winrm = winrm

when 'local'
#
# local connection
#
    set :backend, :exec
end

```

## 参考資料
[ansible_specの説明資料](https://github.com/volanja/ansible_spec)

[serverspecの説明資料](https://serverspec.org/resource_types.html)
