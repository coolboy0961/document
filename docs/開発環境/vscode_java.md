# VSCode での Java 開発環境構築

下記公式サイトを参考して、VSCode上でのJava開発環境構築をやってみた。
- https://code.visualstudio.com/docs/languages/java

## まとめ
Eclipseと比べていいところ
- Frontend と Backend 両方同じEditorでプログラミングできる
- 起動が軽い
- 検索機能が使いやすい
- ショートカットキーが使いやすい。Eclipseの場合よくMacOSのショートカットキーと衝突したりして効かなくなる

Eclipseと比べて劣っていること
- SonarLint(Java)が使えない
- Editorでカバレッジテストができない

## インストールした拡張機能
- Language Support for Java(TM) by Red Hat
- Debugger for Java
- Java Test Runner
- Maven for Java
- Java Dependency Viewer
- Visual Studio IntelliCode
- Spring Boot Tools
- Spring Initializr Java Support
- Spring Boot Dashboard
- CheckStyle

それぞれの拡張機能は何をやるかについてそれぞれの拡張機能のサイトで確認してください。

## 設定
VSCode の user setting (settings.json)に下記設定を追加
```json
{
  // Maven 設定ファイルの指定
  "java.configuration.maven.userSettings": "/usr/local/sb/mvn/conf/settings.xml",
  // Maven JavaHome の指定
  "maven.terminal.useJavaHome": true,
  // Lombokの導入 この設定は自動生成されるので、各自のパスが設定される。
  "java.jdt.ls.vmargs": "-noverify -Xmx1G -XX:+UseG1GC -XX:+UseStringDeduplication -javaagent:\"/Users/chenj49/.vscode/extensions/gabrielbb.vscode-lombok-0.9.7/server/lombok.jar\" -Xbootclasspath/a:\"/Users/chenj49/.vscode/extensions/gabrielbb.vscode-lombok-0.9.7/server/lombok.jar\"",
  // Java関連の見る必要のないファイルをファイル検索対象から除外
  "files.exclude": {
    "**/.classpath": true,
    "**/.project": true,
    "**/.settings": true,
    "**/.factorypath": true
  },
  // SpringBoot 起動時にソースの変更を検知
  "boot-java.change-detection.on": true,
  // Java フォーマッターの指定
  "[java]": {
    "editor.defaultFormatter": "redhat.java"
  },
  // Java Checkstyle 設定ファイルの指定
  "java.checkstyle.configuration": "${workspaceFolder}/checkstyle.xml",
  // Javaフォーマッター設定ファイルの指定
  "java.format.settings.url": "formatter.xml",
  // Javaフォーマッター設定ファイル内のProfile Name指定
  "java.format.settings.profile": "GoogleStyle"
}
```

Run all junit test のショートカットキー追加  
Command + Shift + P でコマンド入力欄を開いて、Open Keyboard Shortcuts(JSON)を入力して選択し、下記のように追記する。
```json
[
    {
        "key": "cmd+k t",
        "command": "java.test.explorer.run",
        "when": "resourceLangId == java"
    }
]
```


## トラブルシューティング
### Junit Test は実行されません
Execute palette command: Java: Clean the Java language server workspace  
Choose Restart and delete  
And recompile your project by: Java: Force Java Compilation

### test 結果の ○ × が下の状態欄に出てこない
VSCode再起動

### Junit5の @Nested と @Paramterized を利用するときに、test見つからないエラー
下記のようにJunit 5 のdependencyを追加  
```xml
    <dependency>
			<groupId>org.junit.jupiter</groupId>
			<artifactId>junit-jupiter-engine</artifactId>
			<scope>test</scope>
		</dependency>
		<dependency>
			<groupId>org.junit.jupiter</groupId>
			<artifactId>junit-jupiter-api</artifactId>
			<scope>test</scope>
		</dependency>
		<dependency>
			<groupId>org.junit.jupiter</groupId>
			<artifactId>junit-jupiter-params</artifactId>
			<scope>test</scope>
		</dependency>
```