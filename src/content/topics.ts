export interface TopicPhrase {
  jp: string;
  romaji: string;
  meaning: string;
}

export interface Topic {
  id: string;
  title: string;
  emoji: string;
  description: string;
  phrases: TopicPhrase[];
}

export const topics: Topic[] = [
  {
    id: "salam",
    title: "Salam & Sapaan",
    emoji: "👋",
    description: "Frasa sapaan dasar untuk berbagai situasi sehari-hari.",
    phrases: [
      { jp: "おはようございます", romaji: "ohayou gozaimasu", meaning: "Selamat pagi (sopan)" },
      { jp: "こんにちは", romaji: "konnichiwa", meaning: "Selamat siang / halo" },
      { jp: "こんばんは", romaji: "konbanwa", meaning: "Selamat malam" },
      { jp: "おやすみなさい", romaji: "oyasuminasai", meaning: "Selamat tidur" },
      { jp: "さようなら", romaji: "sayounara", meaning: "Selamat tinggal" },
      { jp: "また明日", romaji: "mata ashita", meaning: "Sampai jumpa besok" },
      { jp: "お元気ですか", romaji: "ogenki desu ka", meaning: "Apa kabar?" },
      { jp: "元気です", romaji: "genki desu", meaning: "Saya baik-baik saja" },
      { jp: "はじめまして", romaji: "hajimemashite", meaning: "Senang berkenalan" },
      { jp: "よろしくお願いします", romaji: "yoroshiku onegaishimasu", meaning: "Mohon kerjasamanya" },
    ],
  },
  {
    id: "restoran",
    title: "Di Restoran",
    emoji: "🍱",
    description: "Memesan makanan, membayar, dan berinteraksi di restoran.",
    phrases: [
      { jp: "いらっしゃいませ", romaji: "irasshaimase", meaning: "Selamat datang" },
      { jp: "メニューをください", romaji: "menyuu o kudasai", meaning: "Tolong menunya" },
      { jp: "おすすめは何ですか", romaji: "osusume wa nan desu ka", meaning: "Apa rekomendasinya?" },
      { jp: "これをください", romaji: "kore o kudasai", meaning: "Tolong yang ini" },
      { jp: "水をください", romaji: "mizu o kudasai", meaning: "Tolong airnya" },
      { jp: "いただきます", romaji: "itadakimasu", meaning: "Terima kasih atas makanannya (sebelum makan)" },
      { jp: "ごちそうさまでした", romaji: "gochisousama deshita", meaning: "Terima kasih untuk hidangannya" },
      { jp: "お会計お願いします", romaji: "okaikei onegaishimasu", meaning: "Tolong tagihannya" },
      { jp: "美味しいです", romaji: "oishii desu", meaning: "Enak" },
      { jp: "辛いですか", romaji: "karai desu ka", meaning: "Apakah pedas?" },
    ],
  },
  {
    id: "transportasi",
    title: "Transportasi",
    emoji: "🚆",
    description: "Naik kereta, taksi, dan menanyakan arah.",
    phrases: [
      { jp: "駅はどこですか", romaji: "eki wa doko desu ka", meaning: "Di mana stasiunnya?" },
      { jp: "切符を買いたいです", romaji: "kippu o kaitai desu", meaning: "Saya ingin membeli tiket" },
      { jp: "東京駅まで一枚ください", romaji: "Tokyo-eki made ichimai kudasai", meaning: "Satu tiket ke Stasiun Tokyo" },
      { jp: "次の電車は何時ですか", romaji: "tsugi no densha wa nanji desu ka", meaning: "Kereta selanjutnya jam berapa?" },
      { jp: "タクシーを呼んでください", romaji: "takushii o yonde kudasai", meaning: "Tolong panggilkan taksi" },
      { jp: "この住所までお願いします", romaji: "kono juusho made onegaishimasu", meaning: "Tolong ke alamat ini" },
      { jp: "どのくらいかかりますか", romaji: "dono kurai kakarimasu ka", meaning: "Berapa lama waktunya?" },
      { jp: "右に曲がってください", romaji: "migi ni magatte kudasai", meaning: "Belok kanan" },
      { jp: "まっすぐ行ってください", romaji: "massugu itte kudasai", meaning: "Lurus saja" },
      { jp: "ここで止めてください", romaji: "koko de tomete kudasai", meaning: "Tolong berhenti di sini" },
    ],
  },
  {
    id: "belanja",
    title: "Belanja",
    emoji: "🛍️",
    description: "Frasa di toko, pasar, dan saat tawar-menawar.",
    phrases: [
      { jp: "いくらですか", romaji: "ikura desu ka", meaning: "Berapa harganya?" },
      { jp: "高すぎます", romaji: "takasugimasu", meaning: "Terlalu mahal" },
      { jp: "安くしてください", romaji: "yasuku shite kudasai", meaning: "Tolong dimurahkan" },
      { jp: "これを試着できますか", romaji: "kore o shichaku dekimasu ka", meaning: "Boleh saya coba ini?" },
      { jp: "もっと大きいサイズはありますか", romaji: "motto ookii saizu wa arimasu ka", meaning: "Ada ukuran lebih besar?" },
      { jp: "クレジットカードで払えますか", romaji: "kurejitto kaado de haraemasu ka", meaning: "Bisa bayar dengan kartu kredit?" },
      { jp: "袋をください", romaji: "fukuro o kudasai", meaning: "Tolong kantongnya" },
      { jp: "見ているだけです", romaji: "mite iru dake desu", meaning: "Hanya melihat-lihat" },
      { jp: "領収書をください", romaji: "ryoushuusho o kudasai", meaning: "Tolong kuitansinya" },
      { jp: "返品できますか", romaji: "henpin dekimasu ka", meaning: "Bisa dikembalikan?" },
    ],
  },
  {
    id: "darurat",
    title: "Darurat & Kesehatan",
    emoji: "🚑",
    description: "Frasa penting saat darurat atau ke rumah sakit.",
    phrases: [
      { jp: "助けて", romaji: "tasukete", meaning: "Tolong!" },
      { jp: "救急車を呼んでください", romaji: "kyuukyuusha o yonde kudasai", meaning: "Tolong panggil ambulans" },
      { jp: "警察を呼んでください", romaji: "keisatsu o yonde kudasai", meaning: "Tolong panggil polisi" },
      { jp: "病院はどこですか", romaji: "byouin wa doko desu ka", meaning: "Di mana rumah sakitnya?" },
      { jp: "気分が悪いです", romaji: "kibun ga warui desu", meaning: "Saya merasa tidak enak badan" },
      { jp: "頭が痛いです", romaji: "atama ga itai desu", meaning: "Kepala saya sakit" },
      { jp: "お腹が痛いです", romaji: "onaka ga itai desu", meaning: "Perut saya sakit" },
      { jp: "熱があります", romaji: "netsu ga arimasu", meaning: "Saya demam" },
      { jp: "アレルギーがあります", romaji: "arerugii ga arimasu", meaning: "Saya punya alergi" },
      { jp: "薬が必要です", romaji: "kusuri ga hitsuyou desu", meaning: "Saya butuh obat" },
    ],
  },
  {
    id: "kantor",
    title: "Kerja & Kantor",
    emoji: "💼",
    description: "Frasa formal untuk lingkungan kerja Jepang.",
    phrases: [
      { jp: "お疲れ様です", romaji: "otsukaresama desu", meaning: "Terima kasih atas kerja kerasnya" },
      { jp: "お世話になっております", romaji: "osewa ni natte orimasu", meaning: "Terima kasih atas bantuannya (formal)" },
      { jp: "失礼します", romaji: "shitsurei shimasu", meaning: "Permisi" },
      { jp: "申し訳ありません", romaji: "moushiwake arimasen", meaning: "Mohon maaf (sangat formal)" },
      { jp: "了解しました", romaji: "ryoukai shimashita", meaning: "Dimengerti" },
      { jp: "確認します", romaji: "kakunin shimasu", meaning: "Saya akan periksa" },
      { jp: "会議は何時からですか", romaji: "kaigi wa nanji kara desu ka", meaning: "Rapat dimulai jam berapa?" },
      { jp: "明日までに送ります", romaji: "ashita made ni okurimasu", meaning: "Saya akan kirim sebelum besok" },
      { jp: "質問があります", romaji: "shitsumon ga arimasu", meaning: "Saya punya pertanyaan" },
      { jp: "お先に失礼します", romaji: "osaki ni shitsurei shimasu", meaning: "Permisi saya pulang duluan" },
    ],
  },
  {
    id: "wisata",
    title: "Wisata & Hotel",
    emoji: "🏨",
    description: "Check-in hotel dan menjelajahi tempat wisata.",
    phrases: [
      { jp: "予約があります", romaji: "yoyaku ga arimasu", meaning: "Saya punya reservasi" },
      { jp: "チェックインお願いします", romaji: "chekku in onegaishimasu", meaning: "Tolong check-in" },
      { jp: "Wi-Fiのパスワードは何ですか", romaji: "Wi-Fi no pasuwaado wa nan desu ka", meaning: "Apa password Wi-Fi-nya?" },
      { jp: "朝食は何時からですか", romaji: "choushoku wa nanji kara desu ka", meaning: "Sarapan mulai jam berapa?" },
      { jp: "観光案内所はどこですか", romaji: "kankou annaijo wa doko desu ka", meaning: "Di mana pusat informasi turis?" },
      { jp: "写真を撮ってもいいですか", romaji: "shashin o totte mo ii desu ka", meaning: "Boleh saya foto?" },
      { jp: "おすすめの場所はどこですか", romaji: "osusume no basho wa doko desu ka", meaning: "Tempat rekomendasi di mana?" },
      { jp: "入場料はいくらですか", romaji: "nyuujouryou wa ikura desu ka", meaning: "Berapa biaya masuknya?" },
      { jp: "地図をください", romaji: "chizu o kudasai", meaning: "Tolong petanya" },
      { jp: "迷子になりました", romaji: "maigo ni narimashita", meaning: "Saya tersesat" },
    ],
  },
  {
    id: "perasaan",
    title: "Perasaan & Emosi",
    emoji: "💭",
    description: "Mengungkapkan perasaan dan emosi sehari-hari.",
    phrases: [
      { jp: "嬉しいです", romaji: "ureshii desu", meaning: "Saya senang" },
      { jp: "悲しいです", romaji: "kanashii desu", meaning: "Saya sedih" },
      { jp: "怒っています", romaji: "okotte imasu", meaning: "Saya marah" },
      { jp: "疲れました", romaji: "tsukaremashita", meaning: "Saya lelah" },
      { jp: "退屈です", romaji: "taikutsu desu", meaning: "Saya bosan" },
      { jp: "楽しかったです", romaji: "tanoshikatta desu", meaning: "Tadi menyenangkan" },
      { jp: "怖いです", romaji: "kowai desu", meaning: "Saya takut" },
      { jp: "心配しないで", romaji: "shinpai shinaide", meaning: "Jangan khawatir" },
      { jp: "大好きです", romaji: "daisuki desu", meaning: "Saya sangat suka" },
      { jp: "ありがとう、感謝しています", romaji: "arigatou, kansha shite imasu", meaning: "Terima kasih, saya berterima kasih" },
    ],
  },
];
