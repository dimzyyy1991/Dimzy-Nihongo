export interface ParticleQ {
  sentence: string; // use ___ as blank
  answer: string;
  options: string[];
  meaning: string;
  hint: string;
}

export const particleQuestions: ParticleQ[] = [
  { sentence: "わたし___がくせいです。", answer: "は", options: ["は", "が", "を", "に"], meaning: "Saya adalah pelajar.", hint: "Topik kalimat" },
  { sentence: "ねこ___います。", answer: "が", options: ["は", "が", "を", "で"], meaning: "Ada kucing.", hint: "Subjek baru / ada" },
  { sentence: "りんご___たべます。", answer: "を", options: ["は", "が", "を", "に"], meaning: "Saya makan apel.", hint: "Objek langsung" },
  { sentence: "がっこう___いきます。", answer: "に", options: ["は", "を", "で", "に"], meaning: "Saya pergi ke sekolah.", hint: "Arah / tujuan" },
  { sentence: "としょかん___べんきょうします。", answer: "で", options: ["に", "で", "を", "へ"], meaning: "Saya belajar di perpustakaan.", hint: "Tempat aksi" },
  { sentence: "ペン___かきます。", answer: "で", options: ["を", "で", "に", "が"], meaning: "Menulis dengan pena.", hint: "Alat" },
  { sentence: "ともだち___あいます。", answer: "に", options: ["を", "に", "で", "と"], meaning: "Bertemu teman.", hint: "Au = bertemu (に)" },
  { sentence: "ともだち___はなします。", answer: "と", options: ["に", "と", "で", "を"], meaning: "Berbicara dengan teman.", hint: "Bersama-sama" },
  { sentence: "あさ7じ___おきます。", answer: "に", options: ["に", "で", "を", "へ"], meaning: "Bangun jam 7 pagi.", hint: "Waktu spesifik" },
  { sentence: "うち___かえります。", answer: "へ", options: ["へ", "で", "を", "が"], meaning: "Pulang ke rumah.", hint: "Arah pergerakan" },
  { sentence: "みず___のみたいです。", answer: "が", options: ["を", "が", "は", "に"], meaning: "Ingin minum air.", hint: "Tai-form pakai が" },
  { sentence: "にほんご___じょうずです。", answer: "が", options: ["を", "が", "は", "に"], meaning: "Pandai bahasa Jepang.", hint: "Jouzu / heta pakai が" },
  { sentence: "バス___がっこうへいきます。", answer: "で", options: ["に", "で", "を", "と"], meaning: "Pergi ke sekolah dengan bus.", hint: "Alat transportasi" },
  { sentence: "こうえん___さんぽします。", answer: "を", options: ["を", "で", "に", "へ"], meaning: "Jalan-jalan di taman.", hint: "Sanpo / aruku pakai を" },
  { sentence: "せんせい___ほんをもらいました。", answer: "に", options: ["を", "に", "で", "が"], meaning: "Saya menerima buku dari guru.", hint: "Sumber pemberian" },
  { sentence: "あめ___ふっています。", answer: "が", options: ["は", "が", "を", "に"], meaning: "Hujan turun.", hint: "Subjek fenomena alam" },
  { sentence: "コーヒー___おちゃ、どちらがすき？", answer: "と", options: ["と", "や", "も", "に"], meaning: "Kopi atau teh, mana yang kamu suka?", hint: "Membandingkan dua hal" },
  { sentence: "わたし___いきません。", answer: "も", options: ["は", "も", "が", "を"], meaning: "Saya juga tidak pergi.", hint: "Juga" },
  { sentence: "5じ___べんきょうしました。", answer: "まで", options: ["から", "まで", "に", "で"], meaning: "Belajar sampai jam 5.", hint: "Hingga / sampai" },
  { sentence: "9じ___はじまります。", answer: "から", options: ["から", "まで", "に", "で"], meaning: "Mulai dari jam 9.", hint: "Dari" },
];
