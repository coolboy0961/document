# WSDLからDTOを生成する方法(wildfly)

## wsconsume によるDTOの自動作成
WSDL から Java のスタブの作成方法は JDK 同梱の wsimport がありますが、
WildFly との親和性を考慮して、wsconcume を利用します。-logic プロジェクト直下
から、wsconsume は以下のように実行します。ここで、WSDL はランタイム上のものを
指定すると、都度 WSDL の取得の HTTP アクセスが発生するため、WSDL は src/main/resources
下に配置し、--wsdlLocation で指定するようにします。

```
/usr/local/wildfly10.1.0/bin/wsconsume.sh --keep --wsdlLocation=CO2014.wsdl http://localhost:8080/sample.ws?wsdl

```