# Java(Google)

## CheckStyle
[Google のチェックスタイル](https://kazurof.github.io/GoogleJavaStyle-ja/)を流用していて、タブだけ 4 スペースにしました。  
```
<?xml version="1.0"?>
<!DOCTYPE module PUBLIC
          "-//Puppy Crawl//DTD Check Configuration 1.3//EN"
          "http://checkstyle.sourceforge.net/dtds/configuration_1_3.dtd">

<!--
    Checkstyle configuration that checks the Google coding conventions from Google Java Style
    that can be found at https://google.github.io/styleguide/javaguide.html.

    Checkstyle is very configurable. Be sure to read the documentation at
    http://checkstyle.sf.net (or in your downloaded distribution).

    To completely disable a check, just comment it out or delete it from the file.

    Authors: Max Vetrenko, Ruslan Diachenko, Roman Ivanov.
 -->

<module name = "Checker">
    <property name="charset" value="UTF-8"/>

    <property name="severity" value="warning"/>

    <property name="fileExtensions" value="java, properties, xml"/>
    <!-- Checks for whitespace                               -->
    <!-- See http://checkstyle.sf.net/config_whitespace.html -->
    <module name="FileTabCharacter">
        <property name="eachLine" value="true"/>
    </module>

    <module name="TreeWalker">
        <module name="OuterTypeFilename"/>
        <module name="IllegalTokenText">
            <property name="tokens" value="STRING_LITERAL, CHAR_LITERAL"/>
            <property name="format"
             value="\\u00(09|0(a|A)|0(c|C)|0(d|D)|22|27|5(C|c))|\\(0(10|11|12|14|15|42|47)|134)"/>
            <property name="message"
             value="Consider using special escape sequence instead of octal value or Unicode escaped value."/>
        </module>
        <module name="AvoidEscapedUnicodeCharacters">
            <property name="allowEscapesForControlCharacters" value="true"/>
            <property name="allowByTailComment" value="true"/>
            <property name="allowNonPrintableEscapes" value="true"/>
        </module>
        <module name="LineLength">
            <property name="max" value="100"/>
            <property name="ignorePattern" value="^package.*|^import.*|a href|href|http://|https://|ftp://"/>
        </module>
        <module name="AvoidStarImport"/>
        <module name="OneTopLevelClass"/>
        <module name="NoLineWrap"/>
        <module name="EmptyBlock">
            <property name="option" value="TEXT"/>
            <property name="tokens"
             value="LITERAL_TRY, LITERAL_FINALLY, LITERAL_IF, LITERAL_ELSE, LITERAL_SWITCH"/>
        </module>
        <module name="NeedBraces"/>
        <module name="LeftCurly"/>
        <module name="RightCurly">
            <property name="id" value="RightCurlySame"/>
            <property name="tokens"
             value="LITERAL_TRY, LITERAL_CATCH, LITERAL_FINALLY, LITERAL_IF, LITERAL_ELSE,
                    LITERAL_DO"/>
        </module>
        <module name="RightCurly">
            <property name="id" value="RightCurlyAlone"/>
            <property name="option" value="alone"/>
            <property name="tokens"
             value="CLASS_DEF, METHOD_DEF, CTOR_DEF, LITERAL_FOR, LITERAL_WHILE, STATIC_INIT,
                    INSTANCE_INIT"/>
        </module>
        <module name="WhitespaceAround">
            <property name="allowEmptyConstructors" value="true"/>
            <property name="allowEmptyMethods" value="true"/>
            <property name="allowEmptyTypes" value="true"/>
            <property name="allowEmptyLoops" value="true"/>
            <message key="ws.notFollowed"
             value="WhitespaceAround: ''{0}'' is not followed by whitespace. Empty blocks may only be represented as '{}' when not part of a multi-block statement (4.1.3)"/>
            <message key="ws.notPreceded"
             value="WhitespaceAround: ''{0}'' is not preceded with whitespace."/>
        </module>
        <module name="OneStatementPerLine"/>
        <module name="MultipleVariableDeclarations"/>
        <module name="ArrayTypeStyle"/>
        <module name="MissingSwitchDefault"/>
        <module name="FallThrough"/>
        <module name="UpperEll"/>
        <module name="ModifierOrder"/>
        <module name="EmptyLineSeparator">
            <property name="allowNoEmptyLineBetweenFields" value="true"/>
        </module>
        <module name="SeparatorWrap">
            <property name="id" value="SeparatorWrapDot"/>
            <property name="tokens" value="DOT"/>
            <property name="option" value="nl"/>
        </module>
        <module name="SeparatorWrap">
            <property name="id" value="SeparatorWrapComma"/>
            <property name="tokens" value="COMMA"/>
            <property name="option" value="EOL"/>
        </module>
        <module name="SeparatorWrap">
            <!-- ELLIPSIS is EOL until https://github.com/google/styleguide/issues/258 -->
            <property name="id" value="SeparatorWrapEllipsis"/>
            <property name="tokens" value="ELLIPSIS"/>
            <property name="option" value="EOL"/>
        </module>
        <module name="SeparatorWrap">
            <!-- ARRAY_DECLARATOR is EOL until https://github.com/google/styleguide/issues/259 -->
            <property name="id" value="SeparatorWrapArrayDeclarator"/>
            <property name="tokens" value="ARRAY_DECLARATOR"/>
            <property name="option" value="EOL"/>
        </module>
        <module name="SeparatorWrap">
            <property name="id" value="SeparatorWrapMethodRef"/>
            <property name="tokens" value="METHOD_REF"/>
            <property name="option" value="nl"/>
        </module>
        <module name="PackageName">
            <property name="format" value="^[a-z]+(\.[a-z][a-z0-9]*)*$"/>
            <message key="name.invalidPattern"
             value="Package name ''{0}'' must match pattern ''{1}''."/>
        </module>
        <module name="TypeName">
            <message key="name.invalidPattern"
             value="Type name ''{0}'' must match pattern ''{1}''."/>
        </module>
        <module name="MemberName">
            <property name="format" value="^[a-z][a-z0-9][a-zA-Z0-9]*$"/>
            <message key="name.invalidPattern"
             value="Member name ''{0}'' must match pattern ''{1}''."/>
        </module>
        <module name="ParameterName">
            <property name="format" value="^[a-z]([a-z0-9][a-zA-Z0-9]*)?$"/>
            <message key="name.invalidPattern"
             value="Parameter name ''{0}'' must match pattern ''{1}''."/>
        </module>
        <module name="CatchParameterName">
            <property name="format" value="^[a-z]([a-z0-9][a-zA-Z0-9]*)?$"/>
            <message key="name.invalidPattern"
             value="Catch parameter name ''{0}'' must match pattern ''{1}''."/>
        </module>
        <module name="LocalVariableName">
            <property name="tokens" value="VARIABLE_DEF"/>
            <property name="format" value="^[a-z]([a-z0-9][a-zA-Z0-9]*)?$"/>
            <message key="name.invalidPattern"
             value="Local variable name ''{0}'' must match pattern ''{1}''."/>
        </module>
        <module name="ClassTypeParameterName">
            <property name="format" value="(^[A-Z][0-9]?)$|([A-Z][a-zA-Z0-9]*[T]$)"/>
            <message key="name.invalidPattern"
             value="Class type name ''{0}'' must match pattern ''{1}''."/>
        </module>
        <module name="MethodTypeParameterName">
            <property name="format" value="(^[A-Z][0-9]?)$|([A-Z][a-zA-Z0-9]*[T]$)"/>
            <message key="name.invalidPattern"
             value="Method type name ''{0}'' must match pattern ''{1}''."/>
        </module>
        <module name="InterfaceTypeParameterName">
            <property name="format" value="(^[A-Z][0-9]?)$|([A-Z][a-zA-Z0-9]*[T]$)"/>
            <message key="name.invalidPattern"
             value="Interface type name ''{0}'' must match pattern ''{1}''."/>
        </module>
        <module name="NoFinalizer"/>
        <module name="GenericWhitespace">
            <message key="ws.followed"
             value="GenericWhitespace ''{0}'' is followed by whitespace."/>
            <message key="ws.preceded"
             value="GenericWhitespace ''{0}'' is preceded with whitespace."/>
            <message key="ws.illegalFollow"
             value="GenericWhitespace ''{0}'' should followed by whitespace."/>
            <message key="ws.notPreceded"
             value="GenericWhitespace ''{0}'' is not preceded with whitespace."/>
        </module>
        <module name="Indentation">
            <property name="basicOffset" value="4"/>
            <property name="braceAdjustment" value="0"/>
            <property name="caseIndent" value="4"/>
            <property name="throwsIndent" value="4"/>
            <property name="lineWrappingIndentation" value="4"/>
            <property name="arrayInitIndent" value="4"/>
        </module>
        <module name="AbbreviationAsWordInName">
            <property name="ignoreFinal" value="false"/>
            <property name="allowedAbbreviationLength" value="1"/>
        </module>
        <module name="OverloadMethodsDeclarationOrder"/>
        <module name="VariableDeclarationUsageDistance"/>
        <module name="CustomImportOrder">
            <property name="sortImportsInGroupAlphabetically" value="true"/>
            <property name="separateLineBetweenGroups" value="true"/>
            <property name="customImportOrderRules" value="STATIC###THIRD_PARTY_PACKAGE"/>
        </module>
        <module name="MethodParamPad"/>
        <module name="NoWhitespaceBefore">
            <property name="tokens"
             value="COMMA, SEMI, POST_INC, POST_DEC, DOT, ELLIPSIS, METHOD_REF"/>
            <property name="allowLineBreaks" value="true"/>
        </module>
        <module name="ParenPad"/>
        <module name="OperatorWrap">
            <property name="option" value="NL"/>
            <property name="tokens"
             value="BAND, BOR, BSR, BXOR, DIV, EQUAL, GE, GT, LAND, LE, LITERAL_INSTANCEOF, LOR,
                    LT, MINUS, MOD, NOT_EQUAL, PLUS, QUESTION, SL, SR, STAR, METHOD_REF "/>
        </module>
        <module name="AnnotationLocation">
            <property name="id" value="AnnotationLocationMostCases"/>
            <property name="tokens"
             value="CLASS_DEF, INTERFACE_DEF, ENUM_DEF, METHOD_DEF, CTOR_DEF"/>
        </module>
        <module name="AnnotationLocation">
            <property name="id" value="AnnotationLocationVariables"/>
            <property name="tokens" value="VARIABLE_DEF"/>
            <property name="allowSamelineMultipleAnnotations" value="true"/>
        </module>
        <module name="NonEmptyAtclauseDescription"/>
        <module name="JavadocTagContinuationIndentation"/>
        <module name="SummaryJavadoc">
            <property name="forbiddenSummaryFragments"
                      value="^@return the *|^This method returns |^A [{]@code [a-zA-Z0-9]+[}]( is a )"/>
            <property name="period"
                      value="。"/>
        </module>
        <module name="JavadocParagraph"/>
        <module name="AtclauseOrder">
            <property name="tagOrder" value="@param, @return, @throws, @deprecated"/>
            <property name="target"
             value="CLASS_DEF, INTERFACE_DEF, ENUM_DEF, METHOD_DEF, CTOR_DEF, VARIABLE_DEF"/>
        </module>
        <module name="JavadocMethod">
            <property name="scope" value="public"/>
            <property name="allowMissingParamTags" value="true"/>
            <property name="allowMissingThrowsTags" value="true"/>
            <property name="allowMissingReturnTag" value="true"/>
            <property name="minLineCount" value="2"/>
            <property name="allowedAnnotations" value="Override, Test"/>
            <property name="allowThrowsTagsForSubclasses" value="true"/>
        </module>
        <module name="MethodName">
            <property name="format" value="^[a-z][a-z0-9][a-zA-Z0-9_]*$"/>
            <message key="name.invalidPattern"
             value="Method name ''{0}'' must match pattern ''{1}''."/>
        </module>
        <module name="SingleLineJavadoc">
            <property name="ignoreInlineTags" value="false"/>
        </module>
        <module name="EmptyCatchBlock">
            <property name="exceptionVariableName" value="expected"/>
        </module>
        <module name="CommentsIndentation"/>
    </module>
</module>

```

## Formatter
Eclipseの場合、Formatterが必要。Intellijの場合、checkstyleファイルだけでいい。
```
<?xml version="1.0" encoding="UTF-8" standalone="no"?>
<profiles version="13">
<profile kind="CodeFormatterProfile" name="GoogleStyle" version="13">
<setting id="org.eclipse.jdt.core.formatter.comment.insert_new_line_before_root_tags" value="insert"/>
<setting id="org.eclipse.jdt.core.formatter.disabling_tag" value="@formatter:off"/>
<setting id="org.eclipse.jdt.core.formatter.insert_space_after_comma_in_annotation" value="insert"/>
<setting id="org.eclipse.jdt.core.formatter.insert_space_before_comma_in_type_parameters" value="do not insert"/>
<setting id="org.eclipse.jdt.core.formatter.insert_space_before_opening_brace_in_type_declaration" value="insert"/>
<setting id="org.eclipse.jdt.core.formatter.insert_space_after_comma_in_type_arguments" value="insert"/>
<setting id="org.eclipse.jdt.core.formatter.brace_position_for_anonymous_type_declaration" value="end_of_line"/>
<setting id="org.eclipse.jdt.core.formatter.insert_space_before_colon_in_case" value="do not insert"/>
<setting id="org.eclipse.jdt.core.formatter.insert_space_after_opening_brace_in_array_initializer" value="do not insert"/>
<setting id="org.eclipse.jdt.core.formatter.comment.new_lines_at_block_boundaries" value="true"/>
<setting id="org.eclipse.jdt.core.formatter.alignment_for_cascading_method_invocation_with_arguments.count_dependent" value="16|-1|16"/>
<setting id="org.eclipse.jdt.core.formatter.insert_new_line_in_empty_annotation_declaration" value="insert"/>
<setting id="org.eclipse.jdt.core.formatter.insert_space_after_opening_paren_in_annotation" value="do not insert"/>
<setting id="org.eclipse.jdt.core.formatter.blank_lines_before_field" value="0"/>
<setting id="org.eclipse.jdt.core.formatter.insert_space_after_opening_paren_in_while" value="do not insert"/>
<setting id="org.eclipse.jdt.core.formatter.use_on_off_tags" value="true"/>
<setting id="org.eclipse.jdt.core.formatter.wrap_prefer_two_fragments" value="false"/>
<setting id="org.eclipse.jdt.core.formatter.insert_space_between_empty_parens_in_annotation_type_member_declaration" value="do not insert"/>
<setting id="org.eclipse.jdt.core.formatter.insert_new_line_before_else_in_if_statement" value="do not insert"/>
<setting id="org.eclipse.jdt.core.formatter.insert_space_after_prefix_operator" value="do not insert"/>
<setting id="org.eclipse.jdt.core.formatter.keep_else_statement_on_same_line" value="false"/>
<setting id="org.eclipse.jdt.core.formatter.insert_space_after_ellipsis" value="insert"/>
<setting id="org.eclipse.jdt.core.formatter.comment.insert_new_line_for_parameter" value="do not insert"/>
<setting id="org.eclipse.jdt.core.formatter.wrap_comment_inline_tags" value="false"/>
<setting id="org.eclipse.jdt.core.formatter.insert_space_before_opening_brace_in_annotation_type_declaration" value="insert"/>
<setting id="org.eclipse.jdt.core.formatter.indent_breaks_compare_to_cases" value="true"/>
<setting id="org.eclipse.jdt.core.formatter.insert_space_after_at_in_annotation" value="do not insert"/>
<setting id="org.eclipse.jdt.core.formatter.alignment_for_local_variable_declaration" value="16"/>
<setting id="org.eclipse.jdt.core.formatter.alignment_for_multiple_fields" value="16"/>
<setting id="org.eclipse.jdt.core.formatter.alignment_for_annotations_on_parameter" value="1040"/>
<setting id="org.eclipse.jdt.core.formatter.alignment_for_expressions_in_array_initializer" value="16"/>
<setting id="org.eclipse.jdt.core.formatter.alignment_for_annotations_on_type.count_dependent" value="1585|-1|1585"/>
<setting id="org.eclipse.jdt.core.formatter.alignment_for_conditional_expression" value="80"/>
<setting id="org.eclipse.jdt.core.formatter.insert_space_before_opening_paren_in_for" value="insert"/>
<setting id="org.eclipse.jdt.core.formatter.alignment_for_multiple_fields.count_dependent" value="16|-1|16"/>
<setting id="org.eclipse.jdt.core.formatter.insert_space_after_binary_operator" value="insert"/>
<setting id="org.eclipse.jdt.core.formatter.insert_space_before_question_in_wildcard" value="do not insert"/>
<setting id="org.eclipse.jdt.core.formatter.brace_position_for_array_initializer" value="end_of_line"/>
<setting id="org.eclipse.jdt.core.formatter.insert_space_between_empty_parens_in_enum_constant" value="do not insert"/>
<setting id="org.eclipse.jdt.core.formatter.insert_new_line_before_finally_in_try_statement" value="do not insert"/>
<setting id="org.eclipse.jdt.core.formatter.insert_new_line_after_annotation_on_local_variable" value="insert"/>
<setting id="org.eclipse.jdt.core.formatter.insert_new_line_before_catch_in_try_statement" value="do not insert"/>
<setting id="org.eclipse.jdt.core.formatter.insert_space_before_opening_paren_in_while" value="insert"/>
<setting id="org.eclipse.jdt.core.formatter.blank_lines_after_package" value="1"/>
<setting id="org.eclipse.jdt.core.formatter.alignment_for_arguments_in_qualified_allocation_expression.count_dependent" value="16|4|80"/>
<setting id="org.eclipse.jdt.core.formatter.alignment_for_throws_clause_in_method_declaration.count_dependent" value="16|4|48"/>
<setting id="org.eclipse.jdt.core.formatter.insert_space_after_comma_in_type_parameters" value="insert"/>
<setting id="org.eclipse.jdt.core.formatter.continuation_indentation" value="2"/>
<setting id="org.eclipse.jdt.core.formatter.alignment_for_superinterfaces_in_enum_declaration.count_dependent" value="16|4|49"/>
<setting id="org.eclipse.jdt.core.formatter.insert_space_after_postfix_operator" value="do not insert"/>
<setting id="org.eclipse.jdt.core.formatter.alignment_for_arguments_in_method_invocation" value="16"/>
<setting id="org.eclipse.jdt.core.formatter.insert_space_before_closing_angle_bracket_in_type_arguments" value="do not insert"/>
<setting id="org.eclipse.jdt.core.formatter.insert_space_before_comma_in_superinterfaces" value="do not insert"/>
<setting id="org.eclipse.jdt.core.formatter.blank_lines_before_new_chunk" value="1"/>
<setting id="org.eclipse.jdt.core.formatter.insert_space_before_binary_operator" value="insert"/>
<setting id="org.eclipse.jdt.core.formatter.blank_lines_before_package" value="0"/>
<setting id="org.eclipse.jdt.core.formatter.alignment_for_cascading_method_invocation_with_arguments" value="16"/>
<setting id="org.eclipse.jdt.core.compiler.source" value="1.7"/>
<setting id="org.eclipse.jdt.core.formatter.alignment_for_throws_clause_in_constructor_declaration.count_dependent" value="16|4|48"/>
<setting id="org.eclipse.jdt.core.formatter.insert_space_after_comma_in_enum_constant_arguments" value="insert"/>
<setting id="org.eclipse.jdt.core.formatter.insert_space_after_opening_paren_in_constructor_declaration" value="do not insert"/>
<setting id="org.eclipse.jdt.core.formatter.comment.format_line_comments" value="true"/>
<setting id="org.eclipse.jdt.core.formatter.insert_space_after_closing_angle_bracket_in_type_arguments" value="do not insert"/>
<setting id="org.eclipse.jdt.core.formatter.insert_space_after_comma_in_enum_declarations" value="insert"/>
<setting id="org.eclipse.jdt.core.formatter.join_wrapped_lines" value="true"/>
<setting id="org.eclipse.jdt.core.formatter.insert_space_before_opening_brace_in_block" value="insert"/>
<setting id="org.eclipse.jdt.core.formatter.alignment_for_arguments_in_explicit_constructor_call" value="16"/>
<setting id="org.eclipse.jdt.core.formatter.wrap_non_simple_local_variable_annotation" value="true"/>
<setting id="org.eclipse.jdt.core.formatter.insert_space_before_comma_in_method_invocation_arguments" value="do not insert"/>
<setting id="org.eclipse.jdt.core.formatter.align_type_members_on_columns" value="false"/>
<setting id="org.eclipse.jdt.core.formatter.blank_lines_before_member_type" value="0"/>
<setting id="org.eclipse.jdt.core.formatter.insert_space_after_opening_paren_in_enum_constant" value="do not insert"/>
<setting id="org.eclipse.jdt.core.formatter.alignment_for_enum_constants.count_dependent" value="16|5|48"/>
<setting id="org.eclipse.jdt.core.formatter.insert_space_after_opening_paren_in_for" value="do not insert"/>
<setting id="org.eclipse.jdt.core.formatter.insert_space_before_opening_brace_in_method_declaration" value="insert"/>
<setting id="org.eclipse.jdt.core.formatter.alignment_for_selector_in_method_invocation" value="16"/>
<setting id="org.eclipse.jdt.core.formatter.insert_space_after_opening_paren_in_switch" value="do not insert"/>
<setting id="org.eclipse.jdt.core.formatter.insert_space_after_unary_operator" value="do not insert"/>
<setting id="org.eclipse.jdt.core.formatter.insert_space_after_colon_in_case" value="insert"/>
<setting id="org.eclipse.jdt.core.formatter.comment.indent_parameter_description" value="false"/>
<setting id="org.eclipse.jdt.core.formatter.insert_space_before_closing_paren_in_method_declaration" value="do not insert"/>
<setting id="org.eclipse.jdt.core.formatter.insert_space_before_closing_paren_in_switch" value="do not insert"/>
<setting id="org.eclipse.jdt.core.formatter.insert_space_before_opening_brace_in_enum_declaration" value="insert"/>
<setting id="org.eclipse.jdt.core.formatter.insert_space_before_opening_angle_bracket_in_type_parameters" value="do not insert"/>
<setting id="org.eclipse.jdt.core.formatter.comment.clear_blank_lines_in_block_comment" value="false"/>
<setting id="org.eclipse.jdt.core.formatter.insert_new_line_in_empty_type_declaration" value="insert"/>
<setting id="org.eclipse.jdt.core.formatter.lineSplit" value="100"/>
<setting id="org.eclipse.jdt.core.formatter.insert_space_before_opening_paren_in_if" value="insert"/>
<setting id="org.eclipse.jdt.core.formatter.alignment_for_selector_in_method_invocation.count_dependent" value="16|4|48"/>
<setting id="org.eclipse.jdt.core.formatter.insert_space_between_brackets_in_array_type_reference" value="do not insert"/>
<setting id="org.eclipse.jdt.core.formatter.insert_space_after_opening_paren_in_parenthesized_expression" value="do not insert"/>
<setting id="org.eclipse.jdt.core.formatter.insert_space_before_comma_in_explicitconstructorcall_arguments" value="do not insert"/>
<setting id="org.eclipse.jdt.core.formatter.insert_space_before_opening_brace_in_constructor_declaration" value="insert"/>
<setting id="org.eclipse.jdt.core.formatter.blank_lines_before_first_class_body_declaration" value="0"/>
<setting id="org.eclipse.jdt.core.formatter.insert_new_line_after_annotation_on_method" value="insert"/>
<setting id="org.eclipse.jdt.core.formatter.indentation.size" value="4"/>
<setting id="org.eclipse.jdt.core.formatter.insert_space_between_empty_parens_in_method_declaration" value="do not insert"/>
<setting id="org.eclipse.jdt.core.formatter.enabling_tag" value="@formatter:on"/>
<setting id="org.eclipse.jdt.core.formatter.insert_space_before_opening_paren_in_enum_constant" value="do not insert"/>
<setting id="org.eclipse.jdt.core.formatter.alignment_for_annotations_on_package" value="1585"/>
<setting id="org.eclipse.jdt.core.formatter.alignment_for_superclass_in_type_declaration" value="16"/>
<setting id="org.eclipse.jdt.core.formatter.alignment_for_assignment" value="16"/>
<setting id="org.eclipse.jdt.core.compiler.problem.assertIdentifier" value="error"/>
<setting id="org.eclipse.jdt.core.formatter.tabulation.char" value="space"/>
<setting id="org.eclipse.jdt.core.formatter.insert_space_after_semicolon_in_try_resources" value="insert"/>
<setting id="org.eclipse.jdt.core.formatter.insert_space_after_comma_in_constructor_declaration_parameters" value="insert"/>
<setting id="org.eclipse.jdt.core.formatter.insert_space_before_prefix_operator" value="do not insert"/>
<setting id="org.eclipse.jdt.core.formatter.indent_statements_compare_to_body" value="true"/>
<setting id="org.eclipse.jdt.core.formatter.blank_lines_before_method" value="1"/>
<setting id="org.eclipse.jdt.core.formatter.wrap_outer_expressions_when_nested" value="true"/>
<setting id="org.eclipse.jdt.core.formatter.wrap_non_simple_type_annotation" value="true"/>
<setting id="org.eclipse.jdt.core.formatter.format_guardian_clause_on_one_line" value="false"/>
<setting id="org.eclipse.jdt.core.formatter.insert_space_before_colon_in_for" value="insert"/>
<setting id="org.eclipse.jdt.core.formatter.alignment_for_field_declaration" value="16"/>
<setting id="org.eclipse.jdt.core.formatter.insert_space_before_closing_paren_in_cast" value="do not insert"/>
<setting id="org.eclipse.jdt.core.formatter.alignment_for_parameters_in_constructor_declaration" value="16"/>
<setting id="org.eclipse.jdt.core.formatter.insert_space_after_colon_in_labeled_statement" value="insert"/>
<setting id="org.eclipse.jdt.core.formatter.brace_position_for_annotation_type_declaration" value="end_of_line"/>
<setting id="org.eclipse.jdt.core.formatter.insert_new_line_in_empty_method_body" value="do not insert"/>
<setting id="org.eclipse.jdt.core.formatter.alignment_for_method_declaration" value="0"/>
<setting id="org.eclipse.jdt.core.formatter.insert_space_before_closing_paren_in_try" value="do not insert"/>
<setting id="org.eclipse.jdt.core.formatter.insert_space_before_closing_paren_in_method_invocation" value="do not insert"/>
<setting id="org.eclipse.jdt.core.formatter.insert_space_after_opening_bracket_in_array_allocation_expression" value="do not insert"/>
<setting id="org.eclipse.jdt.core.formatter.insert_space_before_opening_brace_in_enum_constant" value="insert"/>
<setting id="org.eclipse.jdt.core.formatter.insert_space_before_comma_in_annotation" value="do not insert"/>
<setting id="org.eclipse.jdt.core.formatter.insert_space_after_at_in_annotation_type_declaration" value="do not insert"/>
<setting id="org.eclipse.jdt.core.formatter.insert_space_before_comma_in_method_declaration_throws" value="do not insert"/>
<setting id="org.eclipse.jdt.core.formatter.insert_space_before_closing_paren_in_if" value="do not insert"/>
<setting id="org.eclipse.jdt.core.formatter.brace_position_for_switch" value="end_of_line"/>
<setting id="org.eclipse.jdt.core.formatter.insert_space_after_comma_in_method_declaration_throws" value="insert"/>
<setting id="org.eclipse.jdt.core.formatter.insert_space_before_parenthesized_expression_in_return" value="insert"/>
<setting id="org.eclipse.jdt.core.formatter.insert_space_before_opening_paren_in_annotation" value="do not insert"/>
<setting id="org.eclipse.jdt.core.formatter.insert_space_after_question_in_conditional" value="insert"/>
<setting id="org.eclipse.jdt.core.formatter.insert_space_after_question_in_wildcard" value="do not insert"/>
<setting id="org.eclipse.jdt.core.formatter.insert_space_after_opening_paren_in_try" value="do not insert"/>
<setting id="org.eclipse.jdt.core.formatter.insert_space_before_closing_bracket_in_array_allocation_expression" value="do not insert"/>
<setting id="org.eclipse.jdt.core.formatter.comment.preserve_white_space_between_code_and_line_comments" value="false"/>
<setting id="org.eclipse.jdt.core.formatter.insert_space_before_parenthesized_expression_in_throw" value="insert"/>
<setting id="org.eclipse.jdt.core.formatter.insert_space_before_comma_in_type_arguments" value="do not insert"/>
<setting id="org.eclipse.jdt.core.compiler.problem.enumIdentifier" value="error"/>
<setting id="org.eclipse.jdt.core.formatter.alignment_for_generic_type_arguments" value="16"/>
<setting id="org.eclipse.jdt.core.formatter.indent_switchstatements_compare_to_switch" value="true"/>
<setting id="org.eclipse.jdt.core.formatter.comment_new_line_at_start_of_html_paragraph" value="true"/>
<setting id="org.eclipse.jdt.core.formatter.insert_space_before_ellipsis" value="do not insert"/>
<setting id="org.eclipse.jdt.core.formatter.brace_position_for_block" value="end_of_line"/>
<setting id="org.eclipse.jdt.core.formatter.insert_space_after_comment_prefix" value="do not insert"/>
<setting id="org.eclipse.jdt.core.formatter.insert_space_before_comma_in_for_inits" value="do not insert"/>
<setting id="org.eclipse.jdt.core.formatter.brace_position_for_method_declaration" value="end_of_line"/>
<setting id="org.eclipse.jdt.core.formatter.compact_else_if" value="true"/>
<setting id="org.eclipse.jdt.core.formatter.wrap_non_simple_parameter_annotation" value="false"/>
<setting id="org.eclipse.jdt.core.formatter.wrap_before_or_operator_multicatch" value="true"/>
<setting id="org.eclipse.jdt.core.formatter.insert_space_before_comma_in_array_initializer" value="do not insert"/>
<setting id="org.eclipse.jdt.core.formatter.insert_space_after_comma_in_for_increments" value="insert"/>
<setting id="org.eclipse.jdt.core.formatter.alignment_for_annotations_on_method" value="1585"/>
<setting id="org.eclipse.jdt.core.formatter.format_line_comment_starting_on_first_column" value="true"/>
<setting id="org.eclipse.jdt.core.formatter.insert_space_before_closing_bracket_in_array_reference" value="do not insert"/>
<setting id="org.eclipse.jdt.core.formatter.insert_new_line_after_annotation_on_field" value="insert"/>
<setting id="org.eclipse.jdt.core.formatter.comment.indent_root_tags" value="true"/>
<setting id="org.eclipse.jdt.core.formatter.brace_position_for_enum_constant" value="end_of_line"/>
<setting id="org.eclipse.jdt.core.formatter.insert_space_before_comma_in_enum_declarations" value="do not insert"/>
<setting id="org.eclipse.jdt.core.formatter.alignment_for_union_type_in_multicatch" value="16"/>
<setting id="org.eclipse.jdt.core.formatter.insert_space_after_comma_in_explicitconstructorcall_arguments" value="insert"/>
<setting id="org.eclipse.jdt.core.formatter.insert_space_before_opening_brace_in_switch" value="insert"/>
<setting id="org.eclipse.jdt.core.formatter.insert_space_before_comma_in_method_declaration_parameters" value="do not insert"/>
<setting id="org.eclipse.jdt.core.formatter.insert_space_after_comma_in_superinterfaces" value="insert"/>
<setting id="org.eclipse.jdt.core.formatter.insert_space_before_comma_in_allocation_expression" value="do not insert"/>
<setting id="org.eclipse.jdt.core.formatter.tabulation.size" value="4"/>
<setting id="org.eclipse.jdt.core.formatter.insert_space_before_opening_bracket_in_array_type_reference" value="do not insert"/>
<setting id="org.eclipse.jdt.core.formatter.insert_new_line_after_opening_brace_in_array_initializer" value="do not insert"/>
<setting id="org.eclipse.jdt.core.formatter.insert_space_after_closing_brace_in_block" value="insert"/>
<setting id="org.eclipse.jdt.core.formatter.insert_space_before_opening_bracket_in_array_reference" value="do not insert"/>
<setting id="org.eclipse.jdt.core.formatter.insert_new_line_in_empty_enum_constant" value="do not insert"/>
<setting id="org.eclipse.jdt.core.formatter.insert_space_after_opening_angle_bracket_in_type_arguments" value="do not insert"/>
<setting id="org.eclipse.jdt.core.formatter.insert_space_before_opening_paren_in_constructor_declaration" value="do not insert"/>
<setting id="org.eclipse.jdt.core.formatter.insert_space_before_comma_in_constructor_declaration_throws" value="do not insert"/>
<setting id="org.eclipse.jdt.core.formatter.insert_space_after_opening_paren_in_if" value="do not insert"/>
<setting id="org.eclipse.jdt.core.formatter.alignment_for_arguments_in_method_invocation.count_dependent" value="16|5|80"/>
<setting id="org.eclipse.jdt.core.formatter.comment.clear_blank_lines_in_javadoc_comment" value="false"/>
<setting id="org.eclipse.jdt.core.formatter.alignment_for_annotations_on_parameter.count_dependent" value="1040|-1|1040"/>
<setting id="org.eclipse.jdt.core.formatter.alignment_for_throws_clause_in_constructor_declaration" value="16"/>
<setting id="org.eclipse.jdt.core.formatter.insert_space_before_assignment_operator" value="insert"/>
<setting id="org.eclipse.jdt.core.formatter.insert_space_after_assignment_operator" value="insert"/>
<setting id="org.eclipse.jdt.core.formatter.alignment_for_annotations_on_package.count_dependent" value="1585|-1|1585"/>
<setting id="org.eclipse.jdt.core.formatter.indent_empty_lines" value="false"/>
<setting id="org.eclipse.jdt.core.formatter.insert_space_after_opening_paren_in_synchronized" value="do not insert"/>
<setting id="org.eclipse.jdt.core.formatter.insert_space_after_closing_paren_in_cast" value="insert"/>
<setting id="org.eclipse.jdt.core.formatter.insert_space_after_comma_in_method_declaration_parameters" value="insert"/>
<setting id="org.eclipse.jdt.core.formatter.force_if_else_statement_brace" value="true"/>
<setting id="org.eclipse.jdt.core.formatter.brace_position_for_block_in_case" value="end_of_line"/>
<setting id="org.eclipse.jdt.core.formatter.number_of_empty_lines_to_preserve" value="3"/>
<setting id="org.eclipse.jdt.core.formatter.wrap_non_simple_package_annotation" value="true"/>
<setting id="org.eclipse.jdt.core.formatter.insert_space_before_opening_paren_in_method_declaration" value="do not insert"/>
<setting id="org.eclipse.jdt.core.formatter.insert_space_after_opening_paren_in_catch" value="do not insert"/>
<setting id="org.eclipse.jdt.core.formatter.insert_space_before_closing_paren_in_constructor_declaration" value="do not insert"/>
<setting id="org.eclipse.jdt.core.formatter.insert_space_before_opening_paren_in_method_invocation" value="do not insert"/>
<setting id="org.eclipse.jdt.core.formatter.insert_space_after_opening_bracket_in_array_reference" value="do not insert"/>
<setting id="org.eclipse.jdt.core.formatter.alignment_for_arguments_in_qualified_allocation_expression" value="16"/>
<setting id="org.eclipse.jdt.core.formatter.alignment_for_arguments_in_annotation.count_dependent" value="16|-1|16"/>
<setting id="org.eclipse.jdt.core.formatter.insert_space_after_and_in_type_parameter" value="insert"/>
<setting id="org.eclipse.jdt.core.formatter.alignment_for_annotations_on_type" value="1585"/>
<setting id="org.eclipse.jdt.core.compiler.compliance" value="1.7"/>
<setting id="org.eclipse.jdt.core.formatter.continuation_indentation_for_array_initializer" value="2"/>
<setting id="org.eclipse.jdt.core.formatter.insert_space_between_empty_brackets_in_array_allocation_expression" value="do not insert"/>
<setting id="org.eclipse.jdt.core.formatter.insert_space_before_at_in_annotation_type_declaration" value="insert"/>
<setting id="org.eclipse.jdt.core.formatter.alignment_for_arguments_in_allocation_expression" value="16"/>
<setting id="org.eclipse.jdt.core.formatter.insert_space_after_opening_paren_in_cast" value="do not insert"/>
<setting id="org.eclipse.jdt.core.formatter.insert_space_before_unary_operator" value="do not insert"/>
<setting id="org.eclipse.jdt.core.formatter.alignment_for_new_anonymous_class" value="20"/>
<setting id="org.eclipse.jdt.core.formatter.insert_space_before_closing_angle_bracket_in_parameterized_type_reference" value="do not insert"/>
<setting id="org.eclipse.jdt.core.formatter.alignment_for_annotations_on_local_variable.count_dependent" value="1585|-1|1585"/>
<setting id="org.eclipse.jdt.core.formatter.insert_space_before_opening_brace_in_anonymous_type_declaration" value="insert"/>
<setting id="org.eclipse.jdt.core.formatter.keep_empty_array_initializer_on_one_line" value="false"/>
<setting id="org.eclipse.jdt.core.formatter.insert_new_line_in_empty_enum_declaration" value="insert"/>
<setting id="org.eclipse.jdt.core.formatter.alignment_for_annotations_on_field.count_dependent" value="1585|-1|1585"/>
<setting id="org.eclipse.jdt.core.formatter.keep_imple_if_on_one_line" value="false"/>
<setting id="org.eclipse.jdt.core.formatter.insert_space_before_comma_in_constructor_declaration_parameters" value="do not insert"/>
<setting id="org.eclipse.jdt.core.formatter.insert_space_after_closing_angle_bracket_in_type_parameters" value="insert"/>
<setting id="org.eclipse.jdt.core.formatter.insert_space_before_colon_in_labeled_statement" value="do not insert"/>
<setting id="org.eclipse.jdt.core.formatter.insert_new_line_at_end_of_file_if_missing" value="insert"/>
<setting id="org.eclipse.jdt.core.formatter.insert_space_after_colon_in_for" value="insert"/>
<setting id="org.eclipse.jdt.core.formatter.insert_space_before_comma_in_parameterized_type_reference" value="do not insert"/>
<setting id="org.eclipse.jdt.core.formatter.alignment_for_parameters_in_constructor_declaration.count_dependent" value="16|5|80"/>
<setting id="org.eclipse.jdt.core.formatter.alignment_for_superinterfaces_in_type_declaration" value="16"/>
<setting id="org.eclipse.jdt.core.formatter.brace_position_for_enum_declaration" value="end_of_line"/>
<setting id="org.eclipse.jdt.core.formatter.alignment_for_binary_expression" value="16"/>
<setting id="org.eclipse.jdt.core.formatter.insert_space_before_closing_paren_in_while" value="do not insert"/>
<setting id="org.eclipse.jdt.core.formatter.insert_new_line_after_annotation_on_type" value="insert"/>
<setting id="org.eclipse.jdt.core.compiler.codegen.inlineJsrBytecode" value="enabled"/>
<setting id="org.eclipse.jdt.core.formatter.insert_space_before_opening_paren_in_try" value="insert"/>
<setting id="org.eclipse.jdt.core.formatter.put_empty_statement_on_new_line" value="false"/>
<setting id="org.eclipse.jdt.core.formatter.insert_new_line_after_label" value="do not insert"/>
<setting id="org.eclipse.jdt.core.formatter.insert_new_line_after_annotation_on_parameter" value="do not insert"/>
<setting id="org.eclipse.jdt.core.formatter.insert_space_after_opening_angle_bracket_in_type_parameters" value="do not insert"/>
<setting id="org.eclipse.jdt.core.formatter.insert_space_between_empty_parens_in_method_invocation" value="do not insert"/>
<setting id="org.eclipse.jdt.core.formatter.comment.format_javadoc_comments" value="true"/>
<setting id="org.eclipse.jdt.core.formatter.alignment_for_arguments_in_enum_constant" value="16"/>
<setting id="org.eclipse.jdt.core.formatter.insert_new_line_before_while_in_do_statement" value="do not insert"/>
<setting id="org.eclipse.jdt.core.formatter.alignment_for_arguments_in_enum_constant.count_dependent" value="16|-1|16"/>
<setting id="org.eclipse.jdt.core.formatter.comment.line_length" value="100"/>
<setting id="org.eclipse.jdt.core.formatter.insert_new_line_after_annotation_on_package" value="insert"/>
<setting id="org.eclipse.jdt.core.formatter.blank_lines_between_import_groups" value="0"/>
<setting id="org.eclipse.jdt.core.formatter.insert_space_before_comma_in_enum_constant_arguments" value="do not insert"/>
<setting id="org.eclipse.jdt.core.formatter.insert_space_before_semicolon" value="do not insert"/>
<setting id="org.eclipse.jdt.core.formatter.brace_position_for_constructor_declaration" value="end_of_line"/>
<setting id="org.eclipse.jdt.core.formatter.number_of_blank_lines_at_beginning_of_method_body" value="0"/>
<setting id="org.eclipse.jdt.core.formatter.insert_space_before_colon_in_conditional" value="insert"/>
<setting id="org.eclipse.jdt.core.formatter.indent_body_declarations_compare_to_type_header" value="true"/>
<setting id="org.eclipse.jdt.core.formatter.insert_space_before_opening_paren_in_annotation_type_member_declaration" value="do not insert"/>
<setting id="org.eclipse.jdt.core.formatter.wrap_before_binary_operator" value="true"/>
<setting id="org.eclipse.jdt.core.formatter.blank_lines_between_type_declarations" value="2"/>
<setting id="org.eclipse.jdt.core.formatter.indent_body_declarations_compare_to_enum_declaration_header" value="true"/>
<setting id="org.eclipse.jdt.core.formatter.insert_space_before_closing_paren_in_synchronized" value="do not insert"/>
<setting id="org.eclipse.jdt.core.formatter.alignment_for_superinterfaces_in_enum_declaration" value="16"/>
<setting id="org.eclipse.jdt.core.formatter.indent_statements_compare_to_block" value="true"/>
<setting id="org.eclipse.jdt.core.formatter.join_lines_in_comments" value="true"/>
<setting id="org.eclipse.jdt.core.formatter.insert_space_before_question_in_conditional" value="insert"/>
<setting id="org.eclipse.jdt.core.formatter.insert_space_before_comma_in_multiple_field_declarations" value="do not insert"/>
<setting id="org.eclipse.jdt.core.formatter.alignment_for_compact_if" value="16"/>
<setting id="org.eclipse.jdt.core.formatter.insert_space_after_comma_in_for_inits" value="insert"/>
<setting id="org.eclipse.jdt.core.formatter.indent_switchstatements_compare_to_cases" value="true"/>
<setting id="org.eclipse.jdt.core.formatter.insert_space_after_comma_in_array_initializer" value="insert"/>
<setting id="org.eclipse.jdt.core.formatter.insert_space_before_colon_in_default" value="do not insert"/>
<setting id="org.eclipse.jdt.core.formatter.insert_space_before_and_in_type_parameter" value="insert"/>
<setting id="org.eclipse.jdt.core.formatter.insert_space_between_empty_parens_in_constructor_declaration" value="do not insert"/>
<setting id="org.eclipse.jdt.core.formatter.blank_lines_before_imports" value="0"/>
<setting id="org.eclipse.jdt.core.formatter.insert_space_after_colon_in_assert" value="insert"/>
<setting id="org.eclipse.jdt.core.formatter.alignment_for_annotations_on_field" value="1585"/>
<setting id="org.eclipse.jdt.core.formatter.comment.format_html" value="true"/>
<setting id="org.eclipse.jdt.core.formatter.alignment_for_throws_clause_in_method_declaration" value="16"/>
<setting id="org.eclipse.jdt.core.formatter.insert_space_before_closing_angle_bracket_in_type_parameters" value="do not insert"/>
<setting id="org.eclipse.jdt.core.formatter.insert_space_before_opening_bracket_in_array_allocation_expression" value="do not insert"/>
<setting id="org.eclipse.jdt.core.formatter.insert_new_line_in_empty_anonymous_type_declaration" value="do not insert"/>
<setting id="org.eclipse.jdt.core.formatter.insert_space_after_colon_in_conditional" value="insert"/>
<setting id="org.eclipse.jdt.core.formatter.insert_space_after_opening_angle_bracket_in_parameterized_type_reference" value="do not insert"/>
<setting id="org.eclipse.jdt.core.formatter.insert_space_before_closing_paren_in_for" value="do not insert"/>
<setting id="org.eclipse.jdt.core.formatter.alignment_for_expressions_in_array_initializer.count_dependent" value="16|5|80"/>
<setting id="org.eclipse.jdt.core.formatter.insert_space_before_postfix_operator" value="do not insert"/>
<setting id="org.eclipse.jdt.core.formatter.comment.format_source_code" value="true"/>
<setting id="org.eclipse.jdt.core.formatter.insert_space_before_opening_paren_in_synchronized" value="insert"/>
<setting id="org.eclipse.jdt.core.formatter.insert_space_after_comma_in_allocation_expression" value="insert"/>
<setting id="org.eclipse.jdt.core.formatter.insert_space_after_comma_in_constructor_declaration_throws" value="insert"/>
<setting id="org.eclipse.jdt.core.formatter.alignment_for_parameters_in_method_declaration" value="16"/>
<setting id="org.eclipse.jdt.core.formatter.insert_space_before_closing_brace_in_array_initializer" value="do not insert"/>
<setting id="org.eclipse.jdt.core.compiler.codegen.targetPlatform" value="1.7"/>
<setting id="org.eclipse.jdt.core.formatter.alignment_for_resources_in_try" value="80"/>
<setting id="org.eclipse.jdt.core.formatter.use_tabs_only_for_leading_indentations" value="false"/>
<setting id="org.eclipse.jdt.core.formatter.alignment_for_arguments_in_annotation" value="16"/>
<setting id="org.eclipse.jdt.core.formatter.comment.format_header" value="true"/>
<setting id="org.eclipse.jdt.core.formatter.comment.format_block_comments" value="true"/>
<setting id="org.eclipse.jdt.core.formatter.insert_space_before_closing_paren_in_enum_constant" value="do not insert"/>
<setting id="org.eclipse.jdt.core.formatter.alignment_for_enum_constants" value="0"/>
<setting id="org.eclipse.jdt.core.formatter.insert_space_before_closing_paren_in_parenthesized_expression" value="do not insert"/>
<setting id="org.eclipse.jdt.core.formatter.indent_body_declarations_compare_to_annotation_declaration_header" value="true"/>
<setting id="org.eclipse.jdt.core.formatter.insert_new_line_in_empty_block" value="insert"/>
<setting id="org.eclipse.jdt.core.formatter.insert_space_before_opening_paren_in_parenthesized_expression" value="do not insert"/>
<setting id="org.eclipse.jdt.core.formatter.insert_space_before_closing_paren_in_catch" value="do not insert"/>
<setting id="org.eclipse.jdt.core.formatter.insert_space_before_comma_in_multiple_local_declarations" value="do not insert"/>
<setting id="org.eclipse.jdt.core.formatter.alignment_for_superinterfaces_in_type_declaration.count_dependent" value="16|4|48"/>
<setting id="org.eclipse.jdt.core.formatter.insert_space_before_opening_paren_in_switch" value="insert"/>
<setting id="org.eclipse.jdt.core.formatter.insert_space_before_comma_in_for_increments" value="do not insert"/>
<setting id="org.eclipse.jdt.core.formatter.alignment_for_annotations_on_method.count_dependent" value="1585|-1|1585"/>
<setting id="org.eclipse.jdt.core.formatter.insert_space_after_opening_paren_in_method_invocation" value="do not insert"/>
<setting id="org.eclipse.jdt.core.formatter.insert_space_before_colon_in_assert" value="insert"/>
<setting id="org.eclipse.jdt.core.formatter.brace_position_for_type_declaration" value="end_of_line"/>
<setting id="org.eclipse.jdt.core.formatter.insert_space_before_opening_brace_in_array_initializer" value="insert"/>
<setting id="org.eclipse.jdt.core.formatter.insert_space_between_empty_braces_in_array_initializer" value="do not insert"/>
<setting id="org.eclipse.jdt.core.formatter.alignment_for_binary_expression.count_dependent" value="16|-1|16"/>
<setting id="org.eclipse.jdt.core.formatter.wrap_non_simple_member_annotation" value="true"/>
<setting id="org.eclipse.jdt.core.formatter.alignment_for_annotations_on_local_variable" value="1585"/>
<setting id="org.eclipse.jdt.core.formatter.insert_space_after_opening_paren_in_method_declaration" value="do not insert"/>
<setting id="org.eclipse.jdt.core.formatter.insert_space_before_semicolon_in_for" value="do not insert"/>
<setting id="org.eclipse.jdt.core.formatter.alignment_for_arguments_in_explicit_constructor_call.count_dependent" value="16|5|80"/>
<setting id="org.eclipse.jdt.core.formatter.insert_space_before_opening_paren_in_catch" value="insert"/>
<setting id="org.eclipse.jdt.core.formatter.insert_space_before_opening_angle_bracket_in_parameterized_type_reference" value="do not insert"/>
<setting id="org.eclipse.jdt.core.formatter.insert_space_after_comma_in_multiple_field_declarations" value="insert"/>
<setting id="org.eclipse.jdt.core.formatter.insert_space_before_closing_paren_in_annotation" value="do not insert"/>
<setting id="org.eclipse.jdt.core.formatter.alignment_for_generic_type_arguments.count_dependent" value="16|-1|16"/>
<setting id="org.eclipse.jdt.core.formatter.insert_space_after_comma_in_parameterized_type_reference" value="insert"/>
<setting id="org.eclipse.jdt.core.formatter.alignment_for_arguments_in_allocation_expression.count_dependent" value="16|5|80"/>
<setting id="org.eclipse.jdt.core.formatter.insert_space_after_comma_in_method_invocation_arguments" value="insert"/>
<setting id="org.eclipse.jdt.core.formatter.alignment_for_parameters_in_method_declaration.count_dependent" value="16|5|80"/>
<setting id="org.eclipse.jdt.core.formatter.comment.new_lines_at_javadoc_boundaries" value="true"/>
<setting id="org.eclipse.jdt.core.formatter.blank_lines_after_imports" value="1"/>
<setting id="org.eclipse.jdt.core.formatter.insert_space_after_comma_in_multiple_local_declarations" value="insert"/>
<setting id="org.eclipse.jdt.core.formatter.indent_body_declarations_compare_to_enum_constant_header" value="true"/>
<setting id="org.eclipse.jdt.core.formatter.insert_space_after_semicolon_in_for" value="insert"/>
<setting id="org.eclipse.jdt.core.formatter.never_indent_line_comments_on_first_column" value="false"/>
<setting id="org.eclipse.jdt.core.formatter.insert_space_before_semicolon_in_try_resources" value="do not insert"/>
<setting id="org.eclipse.jdt.core.formatter.alignment_for_for_statement" value="16"/>
<setting id="org.eclipse.jdt.core.formatter.insert_space_before_opening_angle_bracket_in_type_arguments" value="do not insert"/>
<setting id="org.eclipse.jdt.core.formatter.never_indent_block_comments_on_first_column" value="false"/>
<setting id="org.eclipse.jdt.core.formatter.keep_then_statement_on_same_line" value="false"/>
</profile>
</profiles>
```