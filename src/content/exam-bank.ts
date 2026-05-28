import type { JlptLevel } from "./types";

export interface ExamQuestion {
  id: string;
  type: "vocab" | "kanji" | "grammar";
  question: string;
  prompt?: string;
  choices: string[];
  answer: number;
  explanation?: string;
}

export const examBank: Record<JlptLevel, ExamQuestion[]> = {
  N5: [
    { id: "n5-1", type: "vocab", question: "「ありがとう」 artinya?", choices: ["Selamat pagi", "Terima kasih", "Maaf", "Selamat tinggal"], answer: 1 },
    { id: "n5-2", type: "vocab", question: "「みず」 artinya?", choices: ["Api", "Tanah", "Air", "Angin"], answer: 2 },
    { id: "n5-3", type: "kanji", question: "Cara baca 「学生」?", choices: ["gakusei", "sensei", "shounen", "kyoushi"], answer: 0 },
    { id: "n5-4", type: "kanji", question: "Cara baca 「日本」?", choices: ["nippon / nihon", "honjitsu", "hinata", "tsuki"], answer: 0 },
    { id: "n5-5", type: "grammar", question: "私 ___ 学生です。", choices: ["を", "は", "に", "で"], answer: 1 },
    { id: "n5-6", type: "grammar", question: "毎日 学校 ___ 行きます。", choices: ["を", "が", "に", "は"], answer: 2 },
    { id: "n5-7", type: "vocab", question: "「いぬ」 artinya?", choices: ["Kucing", "Anjing", "Burung", "Ikan"], answer: 1 },
    { id: "n5-8", type: "kanji", question: "Cara baca 「一」?", choices: ["ichi", "ni", "san", "shi"], answer: 0 },
    { id: "n5-9", type: "grammar", question: "これ ___ 何ですか。", choices: ["は", "を", "で", "に"], answer: 0 },
    { id: "n5-10", type: "vocab", question: "「あした」 artinya?", choices: ["Kemarin", "Hari ini", "Besok", "Minggu depan"], answer: 2 },
  ],
  N4: [
    { id: "n4-1", type: "grammar", question: "雨が降って ___、出かけません。", choices: ["いるので", "いるのに", "いるけど", "いるから"], answer: 0 },
    { id: "n4-2", type: "vocab", question: "「しんぱい」 artinya?", choices: ["Senang", "Sedih", "Khawatir", "Marah"], answer: 2 },
    { id: "n4-3", type: "kanji", question: "Cara baca 「世界」?", choices: ["sekai", "seikai", "kaisha", "shikai"], answer: 0 },
    { id: "n4-4", type: "grammar", question: "日本語を 話す ___ できますか。", choices: ["ことが", "のが", "ものが", "ところが"], answer: 0 },
    { id: "n4-5", type: "vocab", question: "「べんり」 artinya?", choices: ["Praktis / nyaman", "Sulit", "Mahal", "Lambat"], answer: 0 },
    { id: "n4-6", type: "grammar", question: "もう 宿題を し ___ 。", choices: ["ました", "ません", "ています", "てください"], answer: 0 },
    { id: "n4-7", type: "kanji", question: "Cara baca 「電車」?", choices: ["densha", "denwa", "kuruma", "jitensha"], answer: 0 },
    { id: "n4-8", type: "grammar", question: "テストの ために、毎日 勉強し ___ 。", choices: ["なければなりません", "ても いいです", "ないでください", "たいです"], answer: 0 },
    { id: "n4-9", type: "vocab", question: "「やくそく」 artinya?", choices: ["Janji", "Pekerjaan", "Sekolah", "Pertemanan"], answer: 0 },
    { id: "n4-10", type: "grammar", question: "先生に 質問 ___ 。", choices: ["します", "あります", "なります", "います"], answer: 0 },
  ],
  N3: [
    { id: "n3-1", type: "grammar", question: "雨が降る ___ 、試合は中止になった。", choices: ["ために", "のに", "ばかりで", "ように"], answer: 0 },
    { id: "n3-2", type: "vocab", question: "「めったに〜ない」 artinya?", choices: ["Selalu", "Sering", "Jarang sekali", "Hampir tidak pernah hari ini"], answer: 2 },
    { id: "n3-3", type: "kanji", question: "Cara baca 「経験」?", choices: ["keiken", "keiei", "keizai", "kenkyuu"], answer: 0 },
    { id: "n3-4", type: "grammar", question: "この 仕事は 大変だ ___ 、やりがいがある。", choices: ["けれども", "から", "ので", "ために"], answer: 0 },
    { id: "n3-5", type: "vocab", question: "「我慢する」 artinya?", choices: ["Mengejar", "Menahan / sabar", "Menyerah", "Mengingat"], answer: 1 },
    { id: "n3-6", type: "grammar", question: "彼は 病気な ___ 、会社に来た。", choices: ["のに", "ので", "ために", "ように"], answer: 0 },
    { id: "n3-7", type: "kanji", question: "Cara baca 「努力」?", choices: ["doryoku", "doryou", "noryoku", "kyouryoku"], answer: 0 },
    { id: "n3-8", type: "grammar", question: "勉強すれば する ___ 、上手になります。", choices: ["ほど", "だけ", "まで", "より"], answer: 0 },
    { id: "n3-9", type: "vocab", question: "「あいまい」 artinya?", choices: ["Jelas", "Ambigu", "Sederhana", "Sulit"], answer: 1 },
    { id: "n3-10", type: "grammar", question: "雨が降りそうだ ___ 、傘を持って行こう。", choices: ["から", "のに", "ばかり", "ように"], answer: 0 },
  ],
  N2: [
    { id: "n2-1", type: "grammar", question: "成功する ___ には、努力が必要だ。", choices: ["ため", "もの", "こと", "わけ"], answer: 0 },
    { id: "n2-2", type: "vocab", question: "「ふさわしい」 artinya?", choices: ["Cocok / pantas", "Aneh", "Sulit", "Murah"], answer: 0 },
    { id: "n2-3", type: "kanji", question: "Cara baca 「環境」?", choices: ["kankyou", "kankei", "kakei", "kanyou"], answer: 0 },
    { id: "n2-4", type: "grammar", question: "彼の話を 聞く ___ 、信じられない。", choices: ["につけ", "に限り", "に応じて", "に比べて"], answer: 0 },
    { id: "n2-5", type: "vocab", question: "「思いがけない」 artinya?", choices: ["Yang diharapkan", "Tak terduga", "Membosankan", "Berbahaya"], answer: 1 },
    { id: "n2-6", type: "grammar", question: "彼女は 美しい ___ 、頭もいい。", choices: ["上に", "うちに", "うえで", "ばかりで"], answer: 0 },
    { id: "n2-7", type: "kanji", question: "Cara baca 「影響」?", choices: ["eikyou", "eikou", "eien", "eigyou"], answer: 0 },
    { id: "n2-8", type: "grammar", question: "天気予報に ___ 、明日は晴れる。", choices: ["よると", "おいて", "対して", "ついて"], answer: 0 },
    { id: "n2-9", type: "vocab", question: "「乗り越える」 artinya?", choices: ["Mengatasi", "Menyerah", "Memulai", "Menunggu"], answer: 0 },
    { id: "n2-10", type: "grammar", question: "努力 ___ 努力を重ねて、ようやく成功した。", choices: ["に", "を", "が", "で"], answer: 0 },
  ],
  N1: [
    { id: "n1-1", type: "grammar", question: "実力 ___ いえども、油断は禁物だ。", choices: ["と", "に", "が", "を"], answer: 0 },
    { id: "n1-2", type: "vocab", question: "「そぐわない」 artinya?", choices: ["Sesuai", "Tidak cocok / tidak pantas", "Penting", "Mendesak"], answer: 1 },
    { id: "n1-3", type: "kanji", question: "Cara baca 「曖昧」?", choices: ["aimai", "akumei", "anmei", "aibou"], answer: 0 },
    { id: "n1-4", type: "grammar", question: "彼の言うことを 信じる ___ あたわず。", choices: ["に", "を", "が", "へ"], answer: 0 },
    { id: "n1-5", type: "vocab", question: "「割り切る」 artinya?", choices: ["Pasrah / menerima dengan logika", "Menghancurkan", "Membagi rata", "Mengabaikan"], answer: 0 },
    { id: "n1-6", type: "grammar", question: "彼の努力 ___ なくして、この成功はなかった。", choices: ["に", "を", "が", "へ"], answer: 1 },
    { id: "n1-7", type: "kanji", question: "Cara baca 「躊躇」?", choices: ["chuucho", "chouchou", "shucho", "tochuu"], answer: 0 },
    { id: "n1-8", type: "grammar", question: "学生 ___ 、社会のルールは守るべきだ。", choices: ["たりとも", "なりとも", "とはいえ", "といえども"], answer: 3 },
    { id: "n1-9", type: "vocab", question: "「腑に落ちない」 artinya?", choices: ["Sangat senang", "Tidak masuk akal / mengganjal", "Sangat lelah", "Jatuh sakit"], answer: 1 },
    { id: "n1-10", type: "grammar", question: "成功するか否か は、本人の努力 ___ かかっている。", choices: ["に", "を", "が", "で"], answer: 0 },
  ],
};
