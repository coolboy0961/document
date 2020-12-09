# OS安装

## USB安装盘
我根据下面的介绍制作了安装USB。  
https://www.tonymacx86.com/threads/unibeast-install-macos-catalina-on-any-supported-intel-based-pc.285366/

下载Catalina安装dmg的时候，遇到个问题。  
我通过Apple Store下载的dmg只有19M，无法用它制作安装盘。  
后来我在下面的地方下载到完整的dmg。  
https://imac.hk/clover-install-macos-catalina-10-15-5-19f96.html

## 系统安装
安装盘制作好后，插入PC的USB口。  
启动PC，F12进入选择启动硬盘画面，选择插入的USB启动。  
接着计算机会引导到Clover画面，选择External，进入安装画面。  
因为我使用的显卡是Nvidi GTX760，它可以被苹果系统原生支持，所以在Clover画面选options，将boot args的nv_disable=1删除，enter,ESC。  
然后选择External启动的话，可以在显卡被支持的情况下进入安装界面。

进入安装界面后首先用磁盘工具抹除Macintosh HD，然后选择Install Catalina，将它安装到Maintosh HD上。

在安装过程中PC会重启两次，这两次都必须手动选择USB安装盘启动，然后选择默认的启动盘，最后会进入苹果的设定画面，设定语言等等选项以后就可以进入MacOS了。

进入MacOS后，会发现除了显卡以外，WIFI和声卡都没有北驱动起来。蓝牙是可以用的。