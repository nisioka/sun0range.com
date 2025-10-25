---
title: "Spring Bootでテストする際にDBUnitとMockitを同時に使う共存定義はこれだ！"
categories: 
  - "information-technology"
draft: true
---

package diva.dx3advance.support;

import com.github.springtestdbunit.TransactionDbUnitTestExecutionListener; import com.github.springtestdbunit.annotation.DbUnitConfiguration; import diva.dx3advance.JobExecutionManagerApplication; import diva.dx3advance.util.Dx3StringUtils; import org.dbunit.dataset.Column; import org.dbunit.dataset.ITable; import org.dbunit.dataset.csv.CsvDataSet; import org.junit.Before; import org.junit.Rule; import org.junit.runner.RunWith; import org.mockito.MockitoAnnotations; import org.mockito.internal.listeners.MockingProgressListener; import org.mockito.junit.MockitoJUnit; import org.mockito.junit.MockitoRule; import org.springframework.beans.factory.annotation.Autowired; import org.springframework.boot.test.context.SpringBootTest; import org.springframework.boot.test.mock.mockito.MockitoTestExecutionListener; import org.springframework.security.test.context.support.WithSecurityContextTestExecutionListener; import org.springframework.test.context.TestExecutionListeners; import org.springframework.test.context.junit4.SpringRunner; import org.springframework.test.context.support.DependencyInjectionTestExecutionListener; import org.springframework.test.context.support.DirtiesContextTestExecutionListener; import org.springframework.test.web.servlet.MockMvc; import org.springframework.test.web.servlet.setup.MockMvcBuilders; import org.springframework.transaction.annotation.Transactional; import org.springframework.web.context.WebApplicationContext;

import java.io.File; import java.lang.reflect.Field; import java.time.LocalDateTime; import java.util.ArrayList; import java.util.List; import java.util.Objects;

import static org.hamcrest.Matchers.hasItems; import static org.hamcrest.Matchers.is; import static org.junit.Assert.assertThat; import static org.springframework.security.test.web.servlet.setup.SecurityMockMvcConfigurers.springSecurity;

/\*\* \* DB接続を伴うクラスのテストadviceクラス。 \* @since 1.0.3 \*/ @RunWith(value = SpringRunner.class) @SpringBootTest @DbUnitConfiguration(dataSetLoader = TestCsvDataSetLoader.class) @TestExecutionListeners({ DependencyInjectionTestExecutionListener.class, DirtiesContextTestExecutionListener.class, TransactionDbUnitTestExecutionListener.class, WithSecurityContextTestExecutionListener.class, MockitoTestExecutionListener.class}) @Transactional public abstract class DBTestSupport { /\*\* Mockitoを使用するための定義。@RunWithで別クラスが設定されているのでここで定義。 \*/ @Rule public final MockitoRule rule = MockitoJUnit.rule();

/\*\* テスト用コンテキスト. \*/ @Autowired private WebApplicationContext context;

/\*\* テスト用DIコンテナを用いたモック. \*/ protected MockMvc mockMvc;

/\*\* \* モックをビルドする。 \*/ @Before public void setUpMockMvc() { MockitoAnnotations.initMocks(this); mockMvc = MockMvcBuilders .webAppContextSetup(context) .apply(springSecurity()) .build(); }

/\*\* \* アサートの検証モード。 \* @since 1.0.3 \*/ public enum AssertionMode { /\*\* 順序も含めて厳密にアサートする。 \*/ DEFAULT, /\*\* 順序をアサートしない。 \*/ NON\_STRICT\_UNORDERED }

/\*\* \* CSVの期待値データとassertする。順序を含めて厳密に比較する。 \* <ul> 期待値データ制約 \* <li>同ディレクトリにtable-ordering.txtを作成し、テーブル名称を1行づつ列挙すること</li> \* <li>ファイル名は、テーブル名称.csvとすること</li> \* <li>1行目は、カラム物理名とすること</li> \* <li>BOM無しUTF-8で保存されていること</li> \* <li>nullデータを表す場合は、nullと記載すること</li> \* </ul> \* @param actual 実際のデータ。単一オブジェクト、もしくは、Listデータ。 \* @param pathName 期待値csvの格納パス \* @param expectedFileName 期待値csvのファイル名 \* @throws Exception 例外 \*/ public void assertCsv(Object actual, String pathName, String expectedFileName) throws Exception { assertCsv(actual, pathName, expectedFileName, AssertionMode.DEFAULT); }

/\*\* \* CSVの期待値データとassertする。 \* <ul> 期待値データ制約 \* <li>同ディレクトリにtable-ordering.txtを作成し、テーブル名称を1行づつ列挙すること</li> \* <li>ファイル名は、テーブル名称.csvとすること</li> \* <li>1行目は、カラム物理名とすること</li> \* <li>BOM無しUTF-8で保存されていること</li> \* <li>nullデータを表す場合は、nullと記載すること</li> \* </ul> \* @param actual 実際のデータ。単一オブジェクト、もしくは、Listデータ。 \* @param pathName 期待値csvの格納パス \* @param expectedFileName 期待値csvのファイル名 \* @param assertionMode アサートの検証モード \* @throws Exception 例外 \*/ public void assertCsv(Object actual, String pathName, String expectedFileName, AssertionMode assertionMode) throws Exception { List actualList; if (actual instanceof List) { actualList = (List) actual; } else { actualList = new ArrayList<>(1); actualList.add(actual); }

ITable expectedTable = new CsvDataSet(new File(DBTestSupport.class.getClassLoader().getResource(pathName.replaceFirst("^/", "")).getPath())).getTable(expectedFileName); assertThat("Row count is not match.", actualList.size(), is(expectedTable.getRowCount()));

if (assertionMode == null || Objects.equals(AssertionMode.DEFAULT, assertionMode)) { assertCsvDefault(actualList, expectedTable); } else if (Objects.equals(AssertionMode.NON\_STRICT\_UNORDERED, assertionMode)) { assertCsvNonStrictUnordered(actualList, expectedTable); } }

/\*\* \* CSVからテストデータオブジェクトを作成する。 \* <ul> CSVデータ制約 \* <li>同ディレクトリにtable-ordering.txtを作成し、ファイル名を1行づつ列挙すること</li> \* <li>1行目は、プロパティ名とすること</li> \* <li>BOM無しUTF-8で保存されていること</li> \* <li>nullデータを表す場合は、nullと記載すること</li> \* </ul> \* @param <T> T テストデータのオブジェクトの型 \* @param targetClass テストデータのオブジェクトクラス \* @param pathName csvの格納パス \* @param expectedFileName csvのファイル名 \* @return テストデータリスト \* @throws Exception 例外 \*/ public <T> List<T> createTestDataFromCsv(Class<T> targetClass, String pathName, String expectedFileName) throws Exception { ITable expectedTable = new CsvDataSet(new File(DBTestSupport.class.getClassLoader().getResource(pathName.replaceFirst("^/", "")).getPath())).getTable(expectedFileName);

List<T> targetList = new ArrayList<>(expectedTable.getRowCount()); for (int i = 0; i < expectedTable.getRowCount(); i++) { T target = targetClass.newInstance(); for (Column column : expectedTable.getTableMetaData().getColumns()) { String columnName = column.getColumnName(); Object value = expectedTable.getValue(i, columnName); if (value == null) { continue; } String valueStr = value.toString(); Field field = targetClass.getField(columnName);

// 対象プロパティの型に合わせてsetする。 if (String.class.equals(field.getType())) { field.set(target, valueStr); } else if (Long.class.equals(field.getType())) { field.set(target, Long.valueOf(valueStr)); } else if (Integer.class.equals(field.getType())) { field.set(target, Integer.valueOf(valueStr)); } else if (Double.class.equals(field.getType())) { field.set(target, Double.valueOf(valueStr)); } else if (Float.class.equals(field.getType())) { field.set(target, Float.valueOf(valueStr)); } else if (Short.class.equals(field.getType())) { field.set(target, Short.valueOf(valueStr)); } else if (Boolean.class.equals(field.getType())) { field.set(target, Boolean.valueOf(valueStr)); } else if (Byte.class.equals(field.getType())) { field.set(target, Byte.valueOf(valueStr)); } else if (LocalDateTime.class.equals(field.getType())) { field.set(target, LocalDateTime.parse(valueStr)); } else { field.set(target, valueStr); } } targetList.add(target); } return targetList; }

/\*\* \* CSVの期待値データとassertする。順序を含めて厳密に比較する。 \* @param actualList 実データリスト \* @param expectedTable 期待値CSVデータ \* @throws Exception 例外 \*/ private void assertCsvDefault(List actualList, ITable expectedTable) throws Exception { for (int i = 0; i < expectedTable.getRowCount(); i++) { for (Column column : expectedTable.getTableMetaData().getColumns()) { String columnName = column.getColumnName(); // 各行、各列に対して一つづつ厳密にアサートする。 assertThat("{columnName->" + columnName + ", rowNumber->" + i + "} is not match.", toSafeString(getPropertyValue(actualList.get(i), toCamelCase(columnName))), is(toSafeString(expectedTable.getValue(i, columnName)))); } } }

/\*\* \* CSVの期待値データとassertする。順序は比較しない。 \* @param actualList 実データリスト \* @param expectedTable 期待値CSVデータ \* @throws Exception 例外 \*/ private void assertCsvNonStrictUnordered(List actualList, ITable expectedTable) throws Exception { // Beanの各プロパティを文字列結合して比較する。 List<String> convertedActualList = new ArrayList<>(); List<String> convertedExpectedList = new ArrayList<>(); for (int i = 0; i < expectedTable.getRowCount(); i++) { StringBuilder convertedActual = new StringBuilder(); StringBuilder convertedExpected = new StringBuilder(); for (Column column : expectedTable.getTableMetaData().getColumns()) { String columnName = column.getColumnName(); convertedActual.append(toSafeString(getPropertyValue(actualList.get(i), toCamelCase(columnName)))).append("\\t"); convertedExpected.append(toSafeString(expectedTable.getValue(i, columnName))).append("\\t"); } convertedActualList.add(convertedActual.toString()); convertedExpectedList.add(convertedExpected.toString()); } // 順不同のアサートとするためにhasItemsを用いる。両方向のアサートをすることで、行の重複にも対応。 assertThat(convertedActualList, hasItems(convertedExpectedList.toArray(new String\[0\]))); assertThat(convertedExpectedList, hasItems(convertedActualList.toArray(new String\[0\]))); }

/\*\* \* スネークケースからキャメルケースへ変換する。 \* @param snakeCaseStr スネークケース文字列 \* @return キャメルケース文字列 \*/ private String toCamelCase(String snakeCaseStr) { if (Dx3StringUtils.isBlank(snakeCaseStr) || !snakeCaseStr.contains("\_")) { return snakeCaseStr; } StringBuilder sb = new StringBuilder(); char\[\] chars = snakeCaseStr.toCharArray(); sb.append(Character.toLowerCase(chars\[0\])); for (int i = 1; i < chars.length; i++) { char c = chars\[i\]; if (c == '\_') { sb.append(Character.toUpperCase(chars\[++i\])); } else { sb.append(Character.toLowerCase(chars\[i\])); } } return sb.toString(); }

/\*\* \* オブジェクトからフィールド値を取得する。 \* @param object 対象オブジェクト \* @param fieldName フィールド名 \* @return フィールド値 \* @throws NoSuchFieldException 想定外の例外 \* @throws IllegalAccessException 想定外の例外 \*/ private Object getPropertyValue(Object object, String fieldName) throws NoSuchFieldException, IllegalAccessException { Field field = object.getClass().getField(fieldName); field.setAccessible(true); return field.get(object); }

/\*\* \* {@link NullPointerException}を起こさないようにtoStringする。 \* @param nullableStr nullかもしれない文字列 \* @return toString結果。元がnullならばnullを返却する。 \*/ private String toSafeString(Object nullableStr) { return nullableStr == null ? null : nullableStr.toString(); } }

 

 

### 参考：

https://qiita.com/Plemling138/items/c48b3805cafa9dec7675

https://spring.io/blog/2016/04/15/testing-improvements-in-spring-boot-1-4#mocking-and-spying

https://terasolunaorg.github.io/guideline/5.4.1.RELEASE/ja/UnitTest/ImplementsOfUnitTest/UsageOfLibraryForTest.html#spring-testdi
