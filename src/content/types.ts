export type JlptLevel = "N5" | "N4" | "N3" | "N2" | "N1";

export interface KanjiEntry {
  kanji: string;
  on: string;
  kun: string;
  meaning: string;
  example: string;
}

export interface VocabEntry {
  jp: string;
  romaji: string;
  meaning: string;
  category: string;
}

export interface GrammarEntry {
  pattern: string;
  meaning: string;
  example: string;
  exampleMeaning: string;
}

export interface SentenceEntry {
  jp: string;
  romaji: string;
  meaning: string;
}

export interface LevelContent {
  level: JlptLevel;
  title: string;
  tagline: string;
  description: string;
  hours: string;
  kanjiCount: number;
  vocabCount: number;
  grammarCount: number;
  kanji: KanjiEntry[];
  vocabulary: VocabEntry[];
  grammar: GrammarEntry[];
  sentences: SentenceEntry[];
}
