# English Island v0.9 第2回教材レビュー・改善バックログ

対象: main `22e1c82c2bd4f9e260e9be5c1d50f959c7d5b8c9` の本番合成済み200問。レビュー日: 2026-10-01。

## 判定

|領域|KEEP|REVISE|REPLACE|
|---|---:|---:|---:|
|vocab|47|13|0|
|grammar|9|51|0|
|listening|6|34|0|
|reading|6|34|0|

KEEPは基礎練習としての暫定採用。REVISEは局所修正可能、REPLACEは全面作り直しを要する場合。今回の再判定はKEEP 68 / REVISE 132 / REPLACE 0。AIの編集判断であり、正答の言語的・教育的妥当性をCIが認証するものではない。

## 次工程の優先順と完了条件

1. P0: 競合する解答を先に修正。該当ID: v41, v46, v48, v53, v59, v60, g2, g7, g8, g11, g21, g25, g26, g40, g44, l26, l37, r11, r33。根拠追加／選択肢変更後に独立の読み直しを行い、正答・診断タグの一致を確認する。
2. P1: 105問の汎用解説を個別化。文法規則、本文・音声の根拠、主要な誤答理由を記載する。Vocabulary 60問の正答先頭固定は表示時に選択肢・正答・misを一緒に並べ替えて解消する。
3. P1: Skill誤分類・未宣言診断タグ・学年属性継承を修正。級・学年は既存内部ラベルを評価しただけで、学校の実教科書や英検の公式問題との照合は未実施。難易度不一致は推定します。
4. P1: target知識IDとbaseQuestionIdを導入し、別文脈Transferを知識単位で配置。現在125問にTransferフラグがあるが、フラグ数を習得評価の有効性と同一視しない。
5. P2: 未収録Writing 3 / Speaking 4 Skillと1問のvocab_school / vocab_feelingを補う。まず現在のMCQ領域で基礎→練習→Transferを整え、生成・音声評価は別仕様を定義する。最低3問は設計目安。
6. その後にmisconception→Remediation、Skill TreeベースDaily Questを実装。今回の工程では出題制御と教材内容を変更していない。

## Skillカバレッジ

|Skill|全問|基礎|Transferフラグ|KEEP|REVISE|不足目安(<3)|
|---|---:|---:|---:|---:|---:|---|
|vocab_basic|4|4|0|4|0||
|vocab_school|1|1|0|1|0|不足|
|vocab_daily|12|12|0|7|5||
|vocab_feeling|1|1|0|1|0|不足|
|vocab_town|7|7|0|7|0||
|vocab_nature|6|6|0|4|2||
|vocab_society|29|9|20|23|6||
|grammar_be|4|1|3|1|3||
|grammar_present|3|1|2|0|3||
|grammar_question|4|1|3|1|3||
|grammar_negative|3|1|2|1|2||
|grammar_third|7|2|5|0|7||
|grammar_can|6|2|4|1|5||
|grammar_wh|3|1|2|1|2||
|grammar_progressive|3|1|2|1|2||
|grammar_past|6|2|4|2|4||
|grammar_future|3|1|2|1|2||
|grammar_infinitive|3|1|2|0|3||
|grammar_gerund|3|1|2|0|3||
|grammar_comparison|3|1|2|0|3||
|grammar_passive|3|1|2|0|3||
|grammar_present_perfect|3|1|2|0|3||
|grammar_relative|3|1|2|0|3||
|listening_basic|6|1|5|1|5||
|listening_time|9|2|7|2|7||
|listening_detail|14|3|11|3|11||
|listening_main|11|2|9|0|11||
|reading_detail|10|2|8|2|8||
|reading_main|10|2|8|1|9||
|reading_inference|10|2|8|1|9||
|reading_email|10|2|8|2|8||
|writing_sentence|0|0|0|0|0|不足|
|writing_email|0|0|0|0|0|不足|
|writing_opinion|0|0|0|0|0|不足|
|speaking_response|0|0|0|0|0|不足|
|speaking_readaloud|0|0|0|0|0|不足|
|speaking_picture|0|0|0|0|0|不足|
|speaking_opinion|0|0|0|0|0|不足|

収録31 / 38 Skill。Writing・Speakingは未収録。SiblingはSkill名をまとめるだけで、同一対象知識の基礎／転移ペアを保証していない。全SkillのverifiedTransferPairsを0として未検証を明示している。

## レビューの保持とCI

各問の英文・選択肢・解説・診断・属性をreviewedContentに保存。現在データとの差異や未レビューの新問はREVISEとして扱う。9観点のチェックにはprovisionalを設け、級・学年・Transferを自動認証しない。教材レビュー画面で英文、音声台本、全選択肢、解説、Skill、級、学年、Sibling、診断と理由を確認できる。

75検証で構造・レビュー鮮度・集計・カバレッジ欠落を確認。未解決132問があるままでも、判定が正しく保持されていれば構造CIはPASSする。教材品質がすべて合格したという意味ではない。
