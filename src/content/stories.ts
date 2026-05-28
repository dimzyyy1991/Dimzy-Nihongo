import type { JlptLevel } from "./types";

export interface StoryParagraph {
  jp: string;
  romaji: string;
  meaning: string;
}

export interface Story {
  id: string;
  level: JlptLevel;
  title: string;
  titleId: string;
  minutes: number;
  emoji: string;
  paragraphs: StoryParagraph[];
}

export const stories: Story[] = [
  {
    id: "n5-pagi",
    level: "N5",
    title: "私の朝",
    titleId: "Pagi Saya",
    minutes: 2,
    emoji: "🌅",
    paragraphs: [
      { jp: "私は毎朝六時に起きます。", romaji: "watashi wa maiasa rokuji ni okimasu.", meaning: "Saya bangun jam 6 setiap pagi." },
      { jp: "まず、顔を洗います。", romaji: "mazu, kao o araimasu.", meaning: "Pertama, saya cuci muka." },
      { jp: "それから、朝ご飯を食べます。", romaji: "sorekara, asagohan o tabemasu.", meaning: "Lalu, saya sarapan." },
      { jp: "朝ご飯はパンとコーヒーです。", romaji: "asagohan wa pan to koohii desu.", meaning: "Sarapannya roti dan kopi." },
      { jp: "七時半に家を出ます。", romaji: "shichiji han ni ie o demasu.", meaning: "Saya keluar rumah jam setengah delapan." },
      { jp: "電車で会社に行きます。", romaji: "densha de kaisha ni ikimasu.", meaning: "Saya pergi ke kantor naik kereta." },
    ],
  },
  {
    id: "n5-keluarga",
    level: "N5",
    title: "家族",
    titleId: "Keluarga",
    minutes: 2,
    emoji: "👨‍👩‍👧",
    paragraphs: [
      { jp: "私の家族は四人です。", romaji: "watashi no kazoku wa yonin desu.", meaning: "Keluarga saya empat orang." },
      { jp: "父と母と妹と私です。", romaji: "chichi to haha to imouto to watashi desu.", meaning: "Ayah, ibu, adik perempuan, dan saya." },
      { jp: "父は先生です。", romaji: "chichi wa sensei desu.", meaning: "Ayah saya seorang guru." },
      { jp: "母はとても優しいです。", romaji: "haha wa totemo yasashii desu.", meaning: "Ibu saya sangat baik." },
      { jp: "妹は十二歳で、学生です。", romaji: "imouto wa juuni-sai de, gakusei desu.", meaning: "Adik saya 12 tahun, masih pelajar." },
      { jp: "私は家族が大好きです。", romaji: "watashi wa kazoku ga daisuki desu.", meaning: "Saya sangat sayang keluarga saya." },
    ],
  },
  {
    id: "n4-akhir-pekan",
    level: "N4",
    title: "週末の予定",
    titleId: "Rencana Akhir Pekan",
    minutes: 3,
    emoji: "🍣",
    paragraphs: [
      { jp: "今週末、友達と京都へ行くつもりです。", romaji: "konshuumatsu, tomodachi to Kyoto e iku tsumori desu.", meaning: "Akhir pekan ini, saya berencana ke Kyoto dengan teman." },
      { jp: "新幹線で行く予定です。", romaji: "shinkansen de iku yotei desu.", meaning: "Rencananya naik shinkansen." },
      { jp: "京都ではお寺を見たり、お茶を飲んだりしたいです。", romaji: "Kyoto de wa otera o mitari, ocha o nondari shitai desu.", meaning: "Di Kyoto saya ingin melihat kuil dan minum teh." },
      { jp: "もし時間があれば、奈良にも行きたいです。", romaji: "moshi jikan ga areba, Nara ni mo ikitai desu.", meaning: "Kalau ada waktu, saya juga ingin ke Nara." },
      { jp: "天気が良いといいですね。", romaji: "tenki ga yoi to ii desu ne.", meaning: "Semoga cuacanya bagus ya." },
    ],
  },
  {
    id: "n3-belajar",
    level: "N3",
    title: "日本語を勉強する理由",
    titleId: "Alasan Belajar Bahasa Jepang",
    minutes: 3,
    emoji: "📚",
    paragraphs: [
      { jp: "私が日本語を勉強し始めたのは三年前のことです。", romaji: "watashi ga nihongo o benkyou shihajimeta no wa sannen mae no koto desu.", meaning: "Saya mulai belajar bahasa Jepang tiga tahun lalu." },
      { jp: "きっかけはアニメと漫画でした。", romaji: "kikkake wa anime to manga deshita.", meaning: "Awalnya karena anime dan manga." },
      { jp: "字幕なしで好きな作品を楽しめるようになりたかったのです。", romaji: "jimaku nashi de suki na sakuhin o tanoshimeru you ni naritakatta no desu.", meaning: "Saya ingin bisa menikmati karya favorit tanpa subtitle." },
      { jp: "勉強すればするほど、日本の文化に興味を持つようになりました。", romaji: "benkyou sureba suru hodo, nihon no bunka ni kyoumi o motsu you ni narimashita.", meaning: "Semakin saya belajar, semakin tertarik dengan budaya Jepang." },
      { jp: "いつか日本に住んでみたいと思っています。", romaji: "itsuka nihon ni sundemitai to omotte imasu.", meaning: "Suatu hari saya ingin mencoba tinggal di Jepang." },
    ],
  },
  {
    id: "n2-teknologi",
    level: "N2",
    title: "技術と私たちの生活",
    titleId: "Teknologi dan Kehidupan Kita",
    minutes: 4,
    emoji: "📱",
    paragraphs: [
      { jp: "近年、スマートフォンの普及により、私たちの生活は大きく変化した。", romaji: "kinnen, sumaatofon no fukyuu ni yori, watashitachi no seikatsu wa ookiku henka shita.", meaning: "Belakangan, dengan menyebarnya smartphone, hidup kita berubah drastis." },
      { jp: "情報を得るスピードは飛躍的に向上した一方で、集中力が低下したと指摘する声もある。", romaji: "jouhou o eru supiido wa hiyakuteki ni koujou shita ippou de, shuuchuuryoku ga teika shita to shiteki suru koe mo aru.", meaning: "Di satu sisi kecepatan mendapat informasi melonjak, di sisi lain ada yang menyebut konsentrasi menurun." },
      { jp: "便利さと引き換えに、私たちは何を失っているのだろうか。", romaji: "benrisa to hikikae ni, watashitachi wa nani o ushinatte iru no darou ka.", meaning: "Sebagai gantinya kemudahan, apa yang kita kehilangan?" },
      { jp: "技術と上手に付き合っていくことが、これからの課題と言えるだろう。", romaji: "gijutsu to jouzu ni tsukiatte iku koto ga, korekara no kadai to ieru darou.", meaning: "Bisa dibilang berdampingan baik dengan teknologi adalah tantangan ke depan." },
    ],
  },
  {
    id: "n1-budaya",
    level: "N1",
    title: "おもてなしの精神",
    titleId: "Semangat Omotenashi",
    minutes: 5,
    emoji: "🍵",
    paragraphs: [
      { jp: "「おもてなし」とは、見返りを求めずに相手を心から歓待する日本独自の精神を指す。", romaji: "\"omotenashi\" to wa, mikaeri o motomezu ni aite o kokoro kara kantai suru nihon dokuji no seishin o sasu.", meaning: "\"Omotenashi\" merujuk pada semangat khas Jepang menyambut tamu dengan tulus tanpa mengharap balasan." },
      { jp: "茶道に代表されるように、細やかな心配りこそがその本質である。", romaji: "sadou ni daihyou sareru you ni, komayaka na kokorokubari koso ga sono honshitsu de aru.", meaning: "Seperti yang terwakili dalam upacara teh, perhatian halus itulah esensinya." },
      { jp: "近年、観光業のみならず、医療や接客業の現場においても、この概念が再評価されつつある。", romaji: "kinnen, kankougyou nomi narazu, iryou ya sekkyakugyou no genba ni oite mo, kono gainen ga saihyouka sare tsutsu aru.", meaning: "Belakangan, tidak hanya pariwisata, di lapangan medis dan layanan pun konsep ini dievaluasi ulang." },
      { jp: "形式に囚われず、相手の立場に立って考える姿勢が、真のおもてなしを生むのではないだろうか。", romaji: "keishiki ni torawarezu, aite no tachiba ni tatte kangaeru shisei ga, shin no omotenashi o umu no de wa nai darou ka.", meaning: "Tidak terikat formalitas, sikap berdiri di posisi lawan—bukankah itu yang melahirkan omotenashi sejati?" },
    ],
  },
];
