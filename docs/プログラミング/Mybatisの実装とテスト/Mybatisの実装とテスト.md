# Mybatisの実装とテスト

## 実装方法
Mapperクラス
```java
package com.sample.mybatis.mapper;

import java.time.LocalDate;
import java.util.List;
import com.sample.core.biz.domain.SampleEntity;
import org.apache.ibatis.annotations.Delete;
import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.Result;
import org.apache.ibatis.annotations.ResultMap;
import org.apache.ibatis.annotations.Results;
import org.apache.ibatis.annotations.Select;

/**
 * サンプルテーブルを操作するマッパークラス
 */
@Mapper
public interface SampleEntityMapper {

    /**
     * 全件取得する。
     *
     * @return SampleEntityのリスト
     */
    @Select("SELECT * FROM sample_table")
    List<SampleEntity> findAll();

    /**
     * 有効日付内のレコードを取得する
     *
     * @param businessDate 業務日付
     * @return SampleEntityのリスト
     */
    @ResultMap("SampleEntity")
    @Select("SELECT * FROM sample_table WHERE #{businessDate} between effective_dt_from AND effective_dt_to ORDER BY sample_id")
    List<SampleEntity> findAllNotExpired(@Param("businessDate") LocalDate businessDate);

    /**
     * key検索
     *
     * <pre>
     * 主KeyでSampleEntityを検索する。
     * </pre>
     *
     * @param sampleId サンプルID
     * @return サンプルエンティティ
     */
    @Results(id = "SampleEntity", value = {
        @Result(column = "sample_id", property = "sampleId"),
        @Result(column = "sample_nm", property = "sampleNm"),
        @Result(column = "description", property = "description"),
        @Result(column = "effective_dt_from", property = "effectiveDtFrom"),
        @Result(column = "effective_dt_to", property = "effectiveDtTo"),
    })
    @Select("SELECT * FROM sample_table WHERE sample_id = #{sampleId}")
    SampleEntity findById(@Param("sampleId") String sampleId);

    /**
     * sample_tableのデータを全削除。
     */
    @Delete("TRUNCATE TABLE sample_table")
    void truncate();

    /**
     * サンプルを登録する（Mars用）。
     *
     * @param SampleEntity サンプル
     */
    @Insert( {
        "INSERT INTO sample_table (",
        "sample_id,",
        "sample_nm,",
        "description,",
        "effective_dt_from,",
        "effective_dt_to,",
        ") VALUES (",
        "#{SampleEntity.sampleId},",
        "#{SampleEntity.sampleNm},",
        "#{SampleEntity.description},",
        "#{SampleEntity.effectiveDtFrom},",
        "#{SampleEntity.effectiveDtTo},",
        ")"
    })
    void insertMarsMst(@Param("SampleEntity") SampleEntity SampleEntity);
}
```

### 個別説明
```java
@Results(id = "SampleEntity", value = {
        @Result(column = "sample_id", property = "sampleId"),
        @Result(column = "sample_nm", property = "sampleNm"),
        @Result(column = "description", property = "description"),
        @Result(column = "effective_dt_from", property = "effectiveDtFrom"),
        @Result(column = "effective_dt_to", property = "effectiveDtTo"),
    })
```
@Resultsを使って、明示的にEntityのfieldとTableのカラムとマッピンしています。  
ここまで厳格にするのはテーブル定義が変更されるときに、必ずアプリケーションで検知させるためです。

## テスト方法
```java
package com.sample.mybatis.mapper;

import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.jupiter.api.Assertions.assertAll;
import static org.junit.jupiter.api.Assertions.assertEquals;

import java.time.LocalDate;
import java.util.Collections;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import javax.sql.DataSource;

import com.sample.core.biz.domain.SampleEntity;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Nested;
import org.junit.jupiter.api.Test;
import org.mybatis.spring.boot.test.autoconfigure.MybatisTest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.simple.SimpleJdbcInsert;

@MybatisTest
class SampleEntityMapperTests {

    private final SampleEntityMapper SampleEntityMapper;
    private final JdbcTemplate jdbcTemplate;
    private final SimpleJdbcInsert simpleJdbcInsert;

    @Autowired
    public SampleEntityMapperTests(SampleEntityMapper SampleEntityMapper, DataSource dataSource, JdbcTemplate jdbcTemplate) {
        this.SampleEntityMapper = SampleEntityMapper;
        this.jdbcTemplate = jdbcTemplate;
        this.simpleJdbcInsert = new SimpleJdbcInsert(dataSource).withTableName("sample_table");
    }

    @AfterEach
    void tearDown() {
        jdbcTemplate.execute("TRUNCATE TABLE sample_table");
    }

    @Nested
    class FindById {

        @DisplayName("サンプルIDをキーに" +
            "サンプルテーブルからサンプル情報を取得する")
        @Test
        void findSampleEntity() {
            String sampleId = "0001";
            SampleEntity expected = createSampleEntity(sampleId);
            insert(expected);

            SampleEntity actual = SampleEntityMapper.findById(sampleId);

            assertThat(actual).isEqualTo(expected);
        }

        @DisplayName("サンプルIDが存在しない場合サンプル情報を取得できない")
        @Test
        void noSampleEntity() {
            insert(createSampleEntity("001"));

            SampleEntity actual = SampleEntityMapper.findById("002");

            assertThat(actual).isNull();
        }
    }

    @Nested
    class FindAllMstRecord {

        @DisplayName("サンプルテーブルからサンプル情報を全件取得する")
        @Test
        void findAll() {

            insert(createSampleEntity("001"), createSampleEntity("002"));

            List<SampleEntity> actual = SampleEntityMapper.findAll();

            assertThat(actual).containsExactlyInAnyOrder(createSampleEntity("001"), createSampleEntity("002"));
        }
    }


    @Nested
    class FindAllNotExpired {
        @Test
        void findAllNotExpired() {
            SampleEntity expect1 = createSampleEntity("001", LocalDate.of(2019, 7, 14), LocalDate.of(2019, 8, 14));
            SampleEntity expect2 = createSampleEntity("002", LocalDate.of(2019, 8, 16), LocalDate.of(2019, 8, 17));
            SampleEntity expect3 = createSampleEntity("003", LocalDate.of(2019, 7, 15), LocalDate.of(2019, 8, 15));
            SampleEntity expect4 = createSampleEntity("005", LocalDate.of(2019, 7, 15), LocalDate.of(2019, 8, 15));
            SampleEntity expect5 = createSampleEntity("004", LocalDate.of(2019, 7, 14), LocalDate.of(2019, 8, 15));


            insert(expect1, expect2, expect3, expect4, expect5);

            List<SampleEntity> actual = SampleEntityMapper.findAllNotExpired(LocalDate.of(2019, 8, 15));

            assertEquals(List.of(expect3, expect5, expect4), actual);
        }
    }

    @Test
    void truncate() {
        // Arrange
        List<SampleEntity> expected = Collections.emptyList();
        insert(
            createSampleEntity("001", LocalDate.of(2019, 8, 17),
                LocalDate.of(2019, 9, 19)),
            createSampleEntity("002", LocalDate.of(2019, 8, 17),
                LocalDate.of(2019, 9, 19)),
            createSampleEntity("003", LocalDate.of(2019, 8, 17),
                LocalDate.of(2019, 9, 19))
        );

        // Act
        SampleEntityMapper.truncate();
        List<SampleEntity> actual = SampleEntityMapper.findAll();

        // Assert
        assertEquals(expected, actual);
    }

    @Test
    void insert() {
        // Arrange
        SampleEntity expected = createSampleEntity("001", LocalDate.of(2019, 8, 17),
            LocalDate.of(2019, 9, 19));


        // Act
        SampleEntityMapper.insertMarsMst(expected);
        List<SampleEntity> actualList = SampleEntityMapper.findAll();

        // Assert
        assertEquals(1, actualList.size());
        assertAll(() -> actualList.forEach(actual -> {
            assertThat(actual.getsampleId()).isEqualTo(expected.getsampleId());
            assertThat(actual.getSampleNm()).isEqualTo(expected.getSampleNm());
            assertThat(actual.getDescription()).isEqualTo(expected.getDescription());
            assertThat(actual.getEffectiveDtFrom()).isEqualTo(expected.getEffectiveDtFrom());
            assertThat(actual.getEffectiveDtTo()).isEqualTo(expected.getEffectiveDtTo());
        }));
    }

    private SampleEntity createSampleEntity(String sampleId) {
        return createSampleEntity(
            sampleId,
            LocalDate.of(2018, 12, 11),
            LocalDate.of(2018, 12, 13)
        );
    }

    private SampleEntity createSampleEntity(String sampleId, LocalDate effectiveDtFrom, LocalDate effectiveDtTo) {
        return SampleEntity.builder()
            .sampleId(sampleId)
            .SampleNm("111111")
            .description("11")
            .effectiveDtFrom(effectiveDtFrom)
            .effectiveDtTo(effectiveDtTo)
            .build();
    }

    private void insert(SampleEntity... SampleEntitys) {
        for (SampleEntity SampleEntity : SampleEntitys) {
            Map<String, Object> parameters = new HashMap<>();
            parameters.put("Sample_id", SampleEntity.getsampleId());
            parameters.put("Sample_nm", SampleEntity.getSampleNm());
            parameters.put("description", SampleEntity.getDescription());
            parameters.put("effective_dt_from", SampleEntity.getEffectiveDtFrom());
            parameters.put("effective_dt_to", SampleEntity.getEffectiveDtTo());
            simpleJdbcInsert.execute(parameters);
        }
    }

}

```

### 詳細説明
コンストラクタインジェクションで重要なインスタンスを初期化する必要がある。
```java
private final SampleEntityMapper SampleEntityMapper;
private final JdbcTemplate jdbcTemplate;
private final SimpleJdbcInsert simpleJdbcInsert;

@Autowired
public SampleEntityMapperTests(SampleEntityMapper SampleEntityMapper, DataSource dataSource, JdbcTemplate jdbcTemplate) {
    this.SampleEntityMapper = SampleEntityMapper;
    this.jdbcTemplate = jdbcTemplate;
    this.simpleJdbcInsert = new SimpleJdbcInsert(dataSource).withTableName("sample_table");
}
```

jdbcTemplateを使って、直接SQLコマンドを実行することができる。
```java
jdbcTemplate.execute("TRUNCATE TABLE sample_table");
```

simpleJdbcInsertでDBにデータを挿入することができる。
```java
private void insert(SampleEntity... SampleEntitys) {
    for (SampleEntity SampleEntity : SampleEntitys) {
        Map<String, Object> parameters = new HashMap<>();
        parameters.put("Sample_id", SampleEntity.getsampleId());
        parameters.put("Sample_nm", SampleEntity.getSampleNm());
        parameters.put("description", SampleEntity.getDescription());
        parameters.put("effective_dt_from", SampleEntity.getEffectiveDtFrom());
        parameters.put("effective_dt_to", SampleEntity.getEffectiveDtTo());
        simpleJdbcInsert.execute(parameters);
    }
}
```

Entityのぞれぞれの属性を明示的に比較するやり方
```java
assertAll(() -> actualList.forEach(actual -> {
            assertThat(actual.getsampleId()).isEqualTo(expected.getsampleId());
            assertThat(actual.getSampleNm()).isEqualTo(expected.getSampleNm());
            assertThat(actual.getDescription()).isEqualTo(expected.getDescription());
            assertThat(actual.getEffectiveDtFrom()).isEqualTo(expected.getEffectiveDtFrom());
            assertThat(actual.getEffectiveDtTo()).isEqualTo(expected.getEffectiveDtTo());
        }));
```

Entityの比較
```java
Assertions.assertThat(actual.get(0)).isEqualTo(expected);
```

Entityの特定の項目を除外して比較するやり方
```java
Assertions.assertThat(actual.get(0))
            .isEqualToIgnoringGivenFields(expected,"effective_dt_from", "effective_dt_to");
```


## 事前設定
build.gradle
```
testImplementation 'org.springframework.boot:spring-boot-starter-test'                           //SpringBootテスト
testImplementation "org.mybatis.spring.boot:mybatis-spring-boot-starter-test:2.1.1"              //SpringBoot + Mybatisテスト
testImplementation 'org.junit.jupiter:junit-jupiter-engine'                                      //JUnit5
testImplementation 'org.junit.jupiter:junit-jupiter-params'                                      //JUnit5
testImplementation 'org.mockito:mockito-core'                                                    //Mockito
testImplementation 'com.h2database:h2'                                                           //h2
```

application.yml
```yml
  #h2のデータソース設定
  datasource:
    driver-class-name: org.h2.Driver
    url: jdbc:h2:mem:testdb;MODE=PostgreSQL;DB_CLOSE_DELAY=-1
    username: sample-user
    password: sample-pass
```

