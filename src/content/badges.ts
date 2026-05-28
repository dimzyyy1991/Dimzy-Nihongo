export interface BadgeDef {
  id: string;
  name: string;
  desc: string;
  icon: string; // emoji
  check: (s: BadgeStats) => boolean;
}

export interface BadgeStats {
  streak: number;
  totalDays: number;
  bookmarks: number;
  examsTaken: number;
  reviewsDone: number;
}

export const badgeDefs: BadgeDef[] = [
  { id: "first-step", name: "Langkah Pertama", desc: "Buka aplikasi & belajar pertama kali", icon: "🌱", check: (s) => s.totalDays >= 1 },
  { id: "streak-3", name: "Konsisten 3 Hari", desc: "Streak 3 hari berturut-turut", icon: "🔥", check: (s) => s.streak >= 3 },
  { id: "streak-7", name: "Seminggu Penuh", desc: "Streak 7 hari berturut-turut", icon: "⚡", check: (s) => s.streak >= 7 },
  { id: "streak-30", name: "Bulan Disiplin", desc: "Streak 30 hari berturut-turut", icon: "🏆", check: (s) => s.streak >= 30 },
  { id: "bookmark-10", name: "Kolektor", desc: "Simpan 10 favorit", icon: "📚", check: (s) => s.bookmarks >= 10 },
  { id: "bookmark-50", name: "Pustakawan", desc: "Simpan 50 favorit", icon: "🗂️", check: (s) => s.bookmarks >= 50 },
  { id: "exam-1", name: "Berani Mencoba", desc: "Selesaikan 1 ujian", icon: "📝", check: (s) => s.examsTaken >= 1 },
  { id: "exam-10", name: "Petarung JLPT", desc: "Selesaikan 10 ujian", icon: "⚔️", check: (s) => s.examsTaken >= 10 },
  { id: "review-50", name: "Pengulang Setia", desc: "Selesaikan 50 review", icon: "🔁", check: (s) => s.reviewsDone >= 50 },
  { id: "days-30", name: "Pelajar Sejati", desc: "Belajar total 30 hari", icon: "🎓", check: (s) => s.totalDays >= 30 },
];
