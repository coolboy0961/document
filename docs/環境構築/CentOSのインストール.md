# CentOS7のインストール
## 目次

<!-- @import "[TOC]" {cmd="toc" depthFrom=2 depthTo=6 orderedList=true} -->
<!-- code_chunk_output -->

1. [目次](#目次)
2. [OS](#os)
    1. [isoを.imgに変換](#isoをimgに変換)
    2. [USBに書き込み](#usbに書き込み)
3. [Boot with Clover](#boot-with-clover)
4. [git(2.x)](#git2x)
5. [VSCode](#vscode)
6. [VirtualBox](#virtualbox)
7. [VLC](#vlc)

<!-- /code_chunk_output -->

## OS
下記でEverything ISOをダウンロードする。  
https://www.centos.org/download/

### isoを.imgに変換
CentOSのISOがあるディレクトリで以下を実行  
```
hdiutil convert -format UDRW -o CentOS.img CentOS.iso
```
### USBに書き込み
USBを挿した状態で以下のコマンドを実行  
```
diskutil list
```
USBのディスクを見つけたらアンマウントする  
ex.( /dev/disk2の場合  
```
diskutil unmountDisk /dev/disk2
```
実際の書き込み処理(長い)  
```
sudo dd if=CentOS.img.dmg of=/dev/disk2 bs=1m
```

それからはUSBブートしてガイドに従ってインストール。完了すると、CentOSの起動が最優先されるようになるので、
MacのEFIを優先的に起動するようにブート順序を変える。

## Boot with Clover
主に下記を参照した。  
https://wiki.archlinux.jp/index.php/Clover

CentOSでroot deviceのUUIDを確認する  
```
[coolboy0961@coolboy0961 ~]$ sudo blkid
[sudo] password for coolboy0961: 
/dev/mapper/centos-root: UUID="a7dbe5aa-8792-45b9-8378-02b6935f8505" TYPE="xfs" 
/dev/sde3: UUID="CZkcsP-Lef1-Mpyj-YPoK-s4Ct-5Tlf-vmdbiZ" TYPE="LVM2_member" PARTUUID="de01a4b7-5034-457f-a328-4fa8420a1f9f" 
/dev/sde2: UUID="860c6951-fb4e-4cf5-b658-244bf4897726" TYPE="xfs" PARTUUID="8768924b-1417-46df-99f8-5334a6762ecb" 
/dev/sde1: SEC_TYPE="msdos" UUID="D222-B17A" TYPE="vfat" PARTLABEL="EFI System Partition" PARTUUID="b8bac8b7-0f78-40d3-8a78-b101ccf82f19" 
/dev/mapper/centos-swap: UUID="46806307-117b-4257-a1e1-09368da83c45" TYPE="swap" 
/dev/sda1: LABEL="EFI" UUID="67E3-17ED" TYPE="vfat" PARTLABEL="EFI System Partition" PARTUUID="16512500-426b-4e23-a8c8-0ee57b462cfa" 
/dev/sda2: UUID="f0011557-2c15-3588-aa21-f121017ce404" LABEL="Macintosh HD" TYPE="hfsplus" PARTLABEL="Untitled 1" PARTUUID="e329ac66-e4aa-489e-9b18-9a284485b272" 
/dev/sda3: UUID="ddbb769e-bc42-3993-abdd-fd30fbe7c9d8" LABEL="Recovery HD" TYPE="hfsplus" PARTLABEL="Recovery HD" PARTUUID="faa9ec7d-c2b8-4f2c-99f0-86e7231bbffa" 
/dev/sdb1: LABEL="EFI" UUID="67E3-17ED" TYPE="vfat" PARTLABEL="EFI System Partition" PARTUUID="e00ce13a-266a-40ec-be08-ed709b428ccc" 
/dev/sdb2: PARTLABEL="Raid Partition 2" PARTUUID="52bcafa6-d71f-4217-8e9f-705f18cc9801" 
/dev/sdb3: UUID="d911c482-c26c-3957-bed9-bc7d71b30f4a" LABEL="Boot OS X" TYPE="hfsplus" PARTLABEL="Booter" PARTUUID="9743e866-48bb-4300-a9c8-66c0f68aa7ec" 
/dev/sdc1: LABEL="EFI" UUID="67E3-17ED" TYPE="vfat" PARTLABEL="EFI System Partition" PARTUUID="5cfd5dd5-5004-4fb6-a97b-c46805d5aab8" 
/dev/sdc2: UUID="7e6bff39-0783-3158-9ece-69c9bfddb8a8" TYPE="hfsplus" PARTLABEL="Raid Partition 1" PARTUUID="5928cc45-451b-4199-a53c-c998735aae55" 
/dev/sdc3: UUID="f5390722-0c29-3c44-9fd0-b39046b69fed" LABEL="Boot OS X" TYPE="hfsplus" PARTLABEL="Booter" PARTUUID="085e12e4-ae54-4c9a-8767-d89b86ec67db" 
/dev/sdd1: LABEL="EFI" UUID="67E3-17ED" TYPE="vfat" PARTLABEL="EFI System Partition" PARTUUID="a8f7df3f-1c22-4345-a884-5074e5a93da1" 
/dev/sdd2: UUID="bb5f8b56-56d9-3c64-828c-4d3e81d469e1" TYPE="hfsplus" PARTLABEL="Backup" PARTUUID="2c729832-c2e2-4978-9015-dc23eb63f035" 
/dev/mapper/centos-home: UUID="f4b0620e-08cf-4ca1-8419-3d25e7248127" TYPE="xfs" 
[coolboy0961@coolboy0961 ~]$ sudo df -h
Filesystem               Size  Used Avail Use% Mounted on
/dev/mapper/centos-root   50G  4.9G   46G  10% /
devtmpfs                 7.8G     0  7.8G   0% /dev
tmpfs                    7.9G   70M  7.8G   1% /dev/shm
tmpfs                    7.9G  9.3M  7.8G   1% /run
tmpfs                    7.9G     0  7.9G   0% /sys/fs/cgroup
/dev/sde2               1014M  210M  805M  21% /boot
/dev/mapper/centos-home   53G  8.6G   45G  17% /home
/dev/sde1                200M   11M  190M   6% /boot/efi
tmpfs                    1.6G   68K  1.6G   1% /run/user/1000

```
上記からroot deviceのUUIDを特定できた。
```
/dev/mapper/centos-root: UUID="a7dbe5aa-8792-45b9-8378-02b6935f8505" TYPE="xfs"
/dev/mapper/centos-root   50G  4.9G   46G  10% /
```

CentOS起動用ファイルを特定する。下記の場合は`initramfs-3.10.0-693.el7.x86_64.img`と`vmlinuz-3.10.0-693.el7.x86_64`である。  
この2ファイルをMacのHDのEFIのルートディレクトリにコピーする。  
```
[coolboy0961@coolboy0961 ~]$ sudo ls -l /boot
total 181716
-rw-r--r--. 1 root root   140915 Jan 26 05:26 config-3.10.0-693.17.1.el7.x86_64
-rw-r--r--. 1 root root   140894 Aug 23 06:21 config-3.10.0-693.el7.x86_64
drwx------. 6 root root    16384 Jan  1  1970 efi
drwxr-xr-x. 2 root root       27 Feb 17 09:54 grub
drwx------. 2 root root       21 Feb 17 15:39 grub2
-rw-------. 1 root root 69268313 Feb 17 09:59 initramfs-0-rescue-871697bef0b548d58690405c2c53464e.img
-rw-------. 1 root root 31050131 Feb 17 15:40 initramfs-3.10.0-693.17.1.el7.x86_64.img
-rw-------. 1 root root 31047528 Feb 17 15:40 initramfs-3.10.0-693.el7.x86_64.img
-rw-------. 1 root root 19508811 Feb 17 10:01 initramfs-3.10.0-693.el7.x86_64kdump.img
-rw-r--r--. 1 root root 10182688 Feb 17 09:59 initrd-plymouth.img
-rw-r--r--. 1 root root   293109 Jan 26 05:28 symvers-3.10.0-693.17.1.el7.x86_64.gz
-rw-r--r--. 1 root root   293027 Aug 23 06:24 symvers-3.10.0-693.el7.x86_64.gz
-rw-------. 1 root root  3232454 Jan 26 05:26 System.map-3.10.0-693.17.1.el7.x86_64
-rw-------. 1 root root  3228420 Aug 23 06:21 System.map-3.10.0-693.el7.x86_64
-rwxr-xr-x. 1 root root  5877760 Feb 17 09:59 vmlinuz-0-rescue-871697bef0b548d58690405c2c53464e
-rwxr-xr-x. 1 root root  5890720 Jan 26 05:26 vmlinuz-3.10.0-693.17.1.el7.x86_64
-rwxr-xr-x. 1 root root  5877760 Aug 23 06:21 vmlinuz-3.10.0-693.el7.x86_64
```



下記のようにMacのHDのEFIのconfig.plistを編集する。  
keyタグの下にCustomタグを追加する  
```
<key>GUI</key>
<dict>
   <key>Custom</key>
   <dict>
      <key>Entries</key>
      <array>
         <dict>
            <key>AddArguments</key>
            <string>root=UUID=a7dbe5aa-8792-45b9-8378-02b6935f8505 rw add_efi_memmap initrd=/initramfs-3.10.0-693.el7.x86_64.img</string>
            <key>Disabled</key>
            <false/>
            <key>FullTitle</key>
            <string>CentOS</string>
            <key>Hidden</key>
            <false/>
            <key>Ignore</key>
            <false/>
            <key>Path</key>
            <string>vmlinuz-3.10.0-693.el7.x86_64</string>
            <key>Type</key>
            <string>Linux</string>
            <key>Volume</key>
            <string>EFI</string>
            <key>VolumeType</key>
            <string>Internal</string>
         </dict>
      </array>
   </dict>
   ...
   ...
   ...
</dict>
```
下記部分ですが、MacでClover Configure Toolで編集時にMacのEFIになるように設定する。  
```
<key>Volume</key>
<string>EFI</string>
```
config.plistを保存して、再起動すれば、Cloverの起動画面でCentOSの起動オプションが見れる。

## git(2.x)
最新のGitのバージョンを確認し、ファイルパスを取得。  

[ここ](https://git-scm.com/)で現在の最新のバージョンを確認する。  
確認したバージョンのファイルパスを取得（マウス右クリックでリンクのアドレスをコピー）  
[Gitデータ一覧](https://www.kernel.org/pub/software/scm/git/)  
https://www.kernel.org/pub/software/scm/git/git-2.16.2.tar.gz

Gitの導入に必要なツールを先にインストールする。  
```
# sudo yum -y install curl-devel expat-devel gettext-devel openssl-devel zlib-devel
```

  Gitを導入していきます。まずはソースコードを取得し、解凍する。
```
$ sudo wget https://www.kernel.org/pub/software/scm/git/git-2.16.2.tar.gz
$ sudo tar xzvf git-2.16.2.tar.gz
```

makeコマンドでインストールする。  
```
$ sudo make prefix=/usr/local all
$ sudo make prefix=/usr/local install
$ source /etc/profile
```

確認する。  
```
$ git --version
git version 2.16.2
```

気になる場合はtar.gzファイルは削除してしまう。
```
$ rm -rf git-2.13.3.tar.gz
```

makeコマンドでエラーが出た場合<

<p>昔調べたときにどなたかがエラーの対応コマンドを載せていたのを借用させていただきます。<br>
引用元を見つけたらリンクをはらせていただきます。</p>

<blockquote>
<p>/bin/sh: curl-config: command not found</p>
</blockquote>

<div class="code-frame" data-lang="text"><div class="highlight"><pre>yum install curl-devel
</pre></div></div>

<blockquote>
<p>/bin/sh: cc: command not found</p>
</blockquote>

<div class="code-frame" data-lang="text"><div class="highlight"><pre>yum install gcc
</pre></div></div>

<blockquote>
<p>git-compat-util.h:208:25: warning: openssl/ssl.h: No such file or directory g</p>
</blockquote>

<div class="code-frame" data-lang="text"><div class="highlight"><pre>yum install openssl-devel
</pre></div></div>

<blockquote>
<p>http-push.c:14:19: warning: expat.h: No such file or directory</p>
</blockquote>

<div class="code-frame" data-lang="text"><div class="highlight"><pre>yum install expat-devel
</pre></div></div>

<blockquote>
<p>Can't locate ExtUtils/MakeMaker.pm in @INC  at Makefile.PL line 3.<br>
BEGIN failed--compilation aborted at Makefile.PL line 3.<br>
make[1]: *** [perl.mak] Error 2<br>
make: *** [perl/perl.mak] Error 2</p>
</blockquote>

<div class="code-frame" data-lang="text"><div class="highlight"><pre>yum install cpan
</pre></div></div>

<blockquote>
<p>MSGFMT po/de.msg make[1]: *** [po/de.msg] Error 127</p>
</blockquote>

<div class="code-frame" data-lang="text"><div class="highlight"><pre>yum install gettext
</pre></div></div>

## VSCode
下記を参照した  
https://code.visualstudio.com/docs/setup/linux#_rhel-fedora-and-centos-based-distributions

リポジトリ追加  
```
sudo rpm --import https://packages.microsoft.com/keys/microsoft.asc
sudo sh -c 'echo -e "[code]\nname=Visual Studio Code\nbaseurl=https://packages.microsoft.com/yumrepos/vscode\nenabled=1\ngpgcheck=1\ngpgkey=https://packages.microsoft.com/keys/microsoft.asc" > /etc/yum.repos.d/vscode.repo'
```

インストール  
```
yum check-update
sudo yum install code
```

ユーザ設定の保存場所  
```
$HOME/.config/Code/User/settings.json
```
Extensionsの保存場所  
```
$HOME/.vscode
```

## VirtualBox

必要なパッケージを先にインストール  
```
# sudo yum install -y gcc make
# sudo yum install -y kernel-devel kernel-devel-3.10.0-693.el7.x86_64
```

SELINUXをOFFにする  
```
# sudo setenforce 0
# sudo sed -i.bak "/SELINUX/s/enforcing/disabled/g" /etc/selinux/config
```

Oracleのpublic keyを導入する  
```
# wget http://download.virtualbox.org/virtualbox/debian/oracle_vbox.asc
# sudo rpm --import oracle_vbox.asc
```

Virtual Boxに関するリポジトリを追加
```
wget http://download.virtualbox.org/virtualbox/rpm/el/virtualbox.repo -O /etc/yum.repos.d/virtualbox.repo
```

確認  
```
# sudo yum check-update
# sudo yum list *virtualbox*
Loaded plugins: fastestmirror, langpacks
Repository google-chrome is listed more than once in the configuration
Loading mirror speeds from cached hostfile
 * base: ftp.jaist.ac.jp
 * extras: ftp.jaist.ac.jp
 * updates: ftp.jaist.ac.jp
Installed Packages
VirtualBox-5.2.x86_64              5.2.6_120293_el7-1                @virtualbox
Available Packages
VirtualBox-4.3.x86_64              4.3.40_110317_el7-1               virtualbox 
VirtualBox-5.0.x86_64              5.0.40_115130_el7-1               virtualbox 
VirtualBox-5.1.x86_64              5.1.32_120294_el7-1               virtualbox 
```

一番新しいものをインストール  
```
# sudo yum install -y VirtualBox-5.1.x86_64 
```

サービスの確認  
```
# sudo systemctl status vboxdrv
● vboxdrv.service - VirtualBox Linux kernel module
   Loaded: loaded (/usr/lib/virtualbox/vboxdrv.sh; enabled; vendor preset: disabled)
   Active: active (exited) since Sat 2018-02-17 17:18:28 JST; 37s ago
  Process: 29023 ExecStart=/usr/lib/virtualbox/vboxdrv.sh start (code=exited, status=0/SUCCESS)

Feb 17 17:18:27 coolboy0961.centos systemd[1]: Starting VirtualBox Linux kernel module...
Feb 17 17:18:28 coolboy0961.centos vboxdrv.sh[29023]: vboxdrv.sh: Starting VirtualBox services.
Feb 17 17:18:28 coolboy0961.centos systemd[1]: Started VirtualBox Linux kernel module.
```

サービス確認で下記のように失敗となった場合  
```
[coolboy0961@coolboy0961 ~]$  systemctl -l status vboxdrv
● vboxdrv.service - VirtualBox Linux kernel module
   Loaded: loaded (/usr/lib/virtualbox/vboxdrv.sh; enabled; vendor preset: disabled)
   Active: failed (Result: exit-code) since Sat 2018-02-17 17:12:22 JST; 1min 20s ago
  Process: 11983 ExecStart=/usr/lib/virtualbox/vboxdrv.sh start (code=exited, status=1/FAILURE)

Feb 17 17:12:22 coolboy0961.centos vboxdrv.sh[11983]: vboxdrv.sh: Building VirtualBox kernel modules.
Feb 17 17:12:22 coolboy0961.centos vboxdrv.sh[11983]: This system is currently not set up to build kernel modules.
Feb 17 17:12:22 coolboy0961.centos vboxdrv.sh[11983]: Please install the Linux kernel "header" files matching the current kernel
Feb 17 17:12:22 coolboy0961.centos vboxdrv.sh[11983]: for adding new hardware support to the system.
Feb 17 17:12:22 coolboy0961.centos vboxdrv.sh[11983]: The distribution packages containing the headers are probably:
Feb 17 17:12:22 coolboy0961.centos vboxdrv.sh[11983]: kernel-devel kernel-devel-3.10.0-693.el7.x86_64
Feb 17 17:12:22 coolboy0961.centos systemd[1]: vboxdrv.service: control process exited, code=exited status=1
Feb 17 17:12:22 coolboy0961.centos systemd[1]: Failed to start VirtualBox Linux kernel module.
Feb 17 17:12:22 coolboy0961.centos systemd[1]: Unit vboxdrv.service entered failed state.
Feb 17 17:12:22 coolboy0961.centos systemd[1]: vboxdrv.service failed.

```

下記で分かるようにkernel-devel kernel-devel-3.10.0-693.el7.x86_64をインストールする必要があることが分かる。  
```
Feb 17 17:12:22 coolboy0961.centos vboxdrv.sh[11983]: The distribution packages containing the headers are probably:
Feb 17 17:12:22 coolboy0961.centos vboxdrv.sh[11983]: kernel-devel kernel-devel-3.10.0-693.el7.x86_64
```

原因が分からなかったら、下記を実行して、何かわかるか試す  
```
sudo /sbin/vboxconfig
Feb 17 17:08:34 coolboy0961.centos virtualbox.desktop[11491]: You will not be able to start VMs until this problem is fixed.
Feb 17 17:08:38 coolboy0961.centos org.gnome.Shell.desktop[2041]: Window manager warning: Invalid WM_TRANSIENT_FOR window 0x3600006 specified for 0x3600004 (VirtualBox).
Feb 17 17:08:52 coolboy0961.centos sudo[11558]: coolboy0961 : TTY=pts/1 ; PWD=/home/coolboy0961 ; USER=root ; COMMAND=/bin/systemctl start vboxdrv
Feb 17 17:08:52 coolboy0961.centos polkitd[907]: Registered Authentication Agent for unix-process:11559:812696 (system bus name :1.225 [/usr/bin/pkttyagent --notify-fd 5 --fallback], object path /org/freedesktop
Feb 17 17:08:52 coolboy0961.centos systemd[1]: Starting VirtualBox Linux kernel module...
-- Subject: Unit vboxdrv.service has begun start-up
-- Defined-By: systemd
-- Support: http://lists.freedesktop.org/mailman/listinfo/systemd-devel
-- 
-- Unit vboxdrv.service has begun starting up.
Feb 17 17:08:52 coolboy0961.centos vboxdrv.sh[11565]: vboxdrv.sh: Starting VirtualBox services.
Feb 17 17:08:52 coolboy0961.centos vboxdrv.sh[11574]: Starting VirtualBox services.
Feb 17 17:08:52 coolboy0961.centos vboxdrv.sh[11565]: vboxdrv.sh: Building VirtualBox kernel modules.
Feb 17 17:08:52 coolboy0961.centos vboxdrv.sh[11579]: Building VirtualBox kernel modules.
Feb 17 17:08:52 coolboy0961.centos vboxdrv.sh[11565]: This system is currently not set up to build kernel modules.
Feb 17 17:08:52 coolboy0961.centos vboxdrv.sh[11565]: Please install the Linux kernel "header" files matching the current kernel
Feb 17 17:08:52 coolboy0961.centos vboxdrv.sh[11565]: for adding new hardware support to the system.
Feb 17 17:08:52 coolboy0961.centos vboxdrv.sh[11565]: The distribution packages containing the headers are probably:
Feb 17 17:08:52 coolboy0961.centos vboxdrv.sh[11565]: kernel-devel kernel-devel-3.10.0-693.el7.x86_64
Feb 17 17:08:52 coolboy0961.centos systemd[1]: vboxdrv.service: control process exited, code=exited status=1
Feb 17 17:08:52 coolboy0961.centos systemd[1]: Failed to start VirtualBox Linux kernel module.
-- Subject: Unit vboxdrv.service has failed
-- Defined-By: systemd
-- Support: http://lists.freedesktop.org/mailman/listinfo/systemd-devel
-- 
-- Unit vboxdrv.service has failed.
-- 
-- The result is failed.
Feb 17 17:08:52 coolboy0961.centos systemd[1]: Unit vboxdrv.service entered failed state.
Feb 17 17:08:52 coolboy0961.centos systemd[1]: vboxdrv.service failed.
Feb 17 17:08:52 coolboy0961.centos polkitd[907]: Unregistered Authentication Agent for unix-process:11559:812696 (system bus name :1.225, object path /org/freedesktop/PolicyKit1/AuthenticationAgent, locale en_US
```


インストールしたあと、下記コマンドを実行し、vboxdrvサービスを開始する。  
```
# sudo /sbin/vboxconfig
vboxdrv.sh: Stopping VirtualBox services.
vboxdrv.sh: Building VirtualBox kernel modules.
vboxdrv.sh: Starting VirtualBox services.

```


## VLC
nux-desktopをインストール  
```
sudo yum -y install http://li.nux.ro/download/nux/dextop/el7/x86_64/nux-dextop-release-0-5.el7.nux.noarch.rpm
```

VLCのインストール  
```
sudo yum install -y vlc
```