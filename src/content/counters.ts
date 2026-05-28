export interface Counter {
  kanji: string;
  reading: string;
  use: string;
  examples: { n: number; reading: string }[];
}

export const counters: Counter[] = [
  {
    kanji: "つ",
    reading: "tsu",
    use: "Penghitung umum (1–10)",
    examples: [
      { n: 1, reading: "ひとつ" }, { n: 2, reading: "ふたつ" }, { n: 3, reading: "みっつ" },
      { n: 4, reading: "よっつ" }, { n: 5, reading: "いつつ" }, { n: 6, reading: "むっつ" },
      { n: 7, reading: "ななつ" }, { n: 8, reading: "やっつ" }, { n: 9, reading: "ここのつ" }, { n: 10, reading: "とお" },
    ],
  },
  {
    kanji: "人",
    reading: "nin",
    use: "Menghitung orang",
    examples: [
      { n: 1, reading: "ひとり" }, { n: 2, reading: "ふたり" }, { n: 3, reading: "さんにん" },
      { n: 4, reading: "よにん" }, { n: 5, reading: "ごにん" }, { n: 10, reading: "じゅうにん" },
    ],
  },
  {
    kanji: "匹",
    reading: "hiki",
    use: "Hewan kecil (kucing, anjing, ikan)",
    examples: [
      { n: 1, reading: "いっぴき" }, { n: 2, reading: "にひき" }, { n: 3, reading: "さんびき" },
      { n: 4, reading: "よんひき" }, { n: 6, reading: "ろっぴき" }, { n: 8, reading: "はっぴき" }, { n: 10, reading: "じゅっぴき" },
    ],
  },
  {
    kanji: "枚",
    reading: "mai",
    use: "Benda pipih (kertas, tiket, baju)",
    examples: [
      { n: 1, reading: "いちまい" }, { n: 2, reading: "にまい" }, { n: 3, reading: "さんまい" }, { n: 10, reading: "じゅうまい" },
    ],
  },
  {
    kanji: "本",
    reading: "hon",
    use: "Benda panjang silindris (pena, botol, pohon)",
    examples: [
      { n: 1, reading: "いっぽん" }, { n: 2, reading: "にほん" }, { n: 3, reading: "さんぼん" },
      { n: 6, reading: "ろっぽん" }, { n: 8, reading: "はっぽん" }, { n: 10, reading: "じゅっぽん" },
    ],
  },
  {
    kanji: "冊",
    reading: "satsu",
    use: "Buku, majalah, notebook",
    examples: [
      { n: 1, reading: "いっさつ" }, { n: 2, reading: "にさつ" }, { n: 3, reading: "さんさつ" },
      { n: 8, reading: "はっさつ" }, { n: 10, reading: "じゅっさつ" },
    ],
  },
  {
    kanji: "台",
    reading: "dai",
    use: "Mesin, kendaraan, peralatan",
    examples: [
      { n: 1, reading: "いちだい" }, { n: 2, reading: "にだい" }, { n: 3, reading: "さんだい" }, { n: 10, reading: "じゅうだい" },
    ],
  },
  {
    kanji: "歳",
    reading: "sai",
    use: "Umur",
    examples: [
      { n: 1, reading: "いっさい" }, { n: 8, reading: "はっさい" }, { n: 10, reading: "じゅっさい" }, { n: 20, reading: "はたち" },
    ],
  },
  {
    kanji: "階",
    reading: "kai",
    use: "Lantai",
    examples: [
      { n: 1, reading: "いっかい" }, { n: 3, reading: "さんがい" }, { n: 6, reading: "ろっかい" }, { n: 10, reading: "じゅっかい" },
    ],
  },
  {
    kanji: "杯",
    reading: "hai",
    use: "Gelas / mangkuk berisi",
    examples: [
      { n: 1, reading: "いっぱい" }, { n: 2, reading: "にはい" }, { n: 3, reading: "さんばい" }, { n: 10, reading: "じゅっぱい" },
    ],
  },
];
