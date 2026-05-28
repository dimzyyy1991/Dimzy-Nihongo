export type VerbGroup = "ichidan" | "godan" | "irregular";
export type ConjForm =
  | "masu"
  | "nai"
  | "ta"
  | "te"
  | "potential"
  | "volitional"
  | "passive"
  | "causative";

export interface Verb {
  dict: string;
  reading: string;
  meaning: string;
  group: VerbGroup;
  ending?: string; // last kana for godan
}

export const verbs: Verb[] = [
  { dict: "食べる", reading: "taberu", meaning: "makan", group: "ichidan" },
  { dict: "見る", reading: "miru", meaning: "melihat", group: "ichidan" },
  { dict: "起きる", reading: "okiru", meaning: "bangun", group: "ichidan" },
  { dict: "寝る", reading: "neru", meaning: "tidur", group: "ichidan" },
  { dict: "教える", reading: "oshieru", meaning: "mengajar", group: "ichidan" },
  { dict: "覚える", reading: "oboeru", meaning: "mengingat", group: "ichidan" },
  { dict: "書く", reading: "kaku", meaning: "menulis", group: "godan", ending: "く" },
  { dict: "話す", reading: "hanasu", meaning: "berbicara", group: "godan", ending: "す" },
  { dict: "読む", reading: "yomu", meaning: "membaca", group: "godan", ending: "む" },
  { dict: "飲む", reading: "nomu", meaning: "minum", group: "godan", ending: "む" },
  { dict: "買う", reading: "kau", meaning: "membeli", group: "godan", ending: "う" },
  { dict: "行く", reading: "iku", meaning: "pergi", group: "godan", ending: "く" },
  { dict: "待つ", reading: "matsu", meaning: "menunggu", group: "godan", ending: "つ" },
  { dict: "泳ぐ", reading: "oyogu", meaning: "berenang", group: "godan", ending: "ぐ" },
  { dict: "遊ぶ", reading: "asobu", meaning: "bermain", group: "godan", ending: "ぶ" },
  { dict: "死ぬ", reading: "shinu", meaning: "mati", group: "godan", ending: "ぬ" },
  { dict: "作る", reading: "tsukuru", meaning: "membuat", group: "godan", ending: "る" },
  { dict: "聞く", reading: "kiku", meaning: "mendengar", group: "godan", ending: "く" },
  { dict: "する", reading: "suru", meaning: "melakukan", group: "irregular" },
  { dict: "来る", reading: "kuru", meaning: "datang", group: "irregular" },
];

const godanAMap: Record<string, string> = { う: "わ", く: "か", ぐ: "が", す: "さ", つ: "た", ぬ: "な", ぶ: "ば", む: "ま", る: "ら" };
const godanIMap: Record<string, string> = { う: "い", く: "き", ぐ: "ぎ", す: "し", つ: "ち", ぬ: "に", ぶ: "び", む: "み", る: "り" };
const godanEMap: Record<string, string> = { う: "え", く: "け", ぐ: "げ", す: "せ", つ: "て", ぬ: "ね", ぶ: "べ", む: "め", る: "れ" };
const godanOMap: Record<string, string> = { う: "お", く: "こ", ぐ: "ご", す: "そ", つ: "と", ぬ: "の", ぶ: "ぼ", む: "も", る: "ろ" };

function stem(v: Verb): string {
  return v.dict.slice(0, -1);
}

export function conjugate(v: Verb, form: ConjForm): string {
  if (v.group === "irregular") {
    if (v.dict === "する") {
      return { masu: "します", nai: "しない", ta: "した", te: "して", potential: "できる", volitional: "しよう", passive: "される", causative: "させる" }[form];
    }
    if (v.dict === "来る") {
      return { masu: "きます", nai: "こない", ta: "きた", te: "きて", potential: "こられる", volitional: "こよう", passive: "こられる", causative: "こさせる" }[form];
    }
  }
  if (v.group === "ichidan") {
    const s = stem(v);
    return { masu: s + "ます", nai: s + "ない", ta: s + "た", te: s + "て", potential: s + "られる", volitional: s + "よう", passive: s + "られる", causative: s + "させる" }[form];
  }
  // godan
  const last = v.dict.slice(-1);
  const s = v.dict.slice(0, -1);
  if (form === "masu") return s + godanIMap[last] + "ます";
  if (form === "nai") return s + godanAMap[last] + "ない";
  if (form === "potential") return s + godanEMap[last] + "る";
  if (form === "volitional") return s + godanOMap[last] + "う";
  if (form === "passive") return s + godanAMap[last] + "れる";
  if (form === "causative") return s + godanAMap[last] + "せる";
  // ta / te
  if (v.dict === "行く") return form === "ta" ? "行った" : "行って";
  const teMap: Record<string, [string, string]> = {
    う: ["った", "って"], つ: ["った", "って"], る: ["った", "って"],
    む: ["んだ", "んで"], ぶ: ["んだ", "んで"], ぬ: ["んだ", "んで"],
    く: ["いた", "いて"], ぐ: ["いだ", "いで"],
    す: ["した", "して"],
  };
  const [ta, te] = teMap[last] ?? ["った", "って"];
  return s + (form === "ta" ? ta : te);
}

export const formLabels: Record<ConjForm, string> = {
  masu: "Masu (sopan)",
  nai: "Nai (negatif)",
  ta: "Ta (past)",
  te: "Te-form",
  potential: "Potensial (bisa)",
  volitional: "Volitional (mari)",
  passive: "Pasif",
  causative: "Kausatif",
};
