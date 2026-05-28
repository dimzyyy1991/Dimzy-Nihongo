import type { JlptLevel, LevelContent } from "./types";
import { n5 } from "./n5";
import { n4 } from "./n4";
import { n3 } from "./n3";
import { n2 } from "./n2";
import { n1 } from "./n1";

export const levels: Record<JlptLevel, LevelContent> = { N5: n5, N4: n4, N3: n3, N2: n2, N1: n1 };
export const levelOrder: JlptLevel[] = ["N5", "N4", "N3", "N2", "N1"];
