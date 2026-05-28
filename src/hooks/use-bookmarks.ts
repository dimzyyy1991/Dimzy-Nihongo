import { useEffect, useState, useCallback } from "react";

export type BookmarkType = "kanji" | "vocab" | "grammar" | "sentence";

export interface Bookmark {
  id: string;
  type: BookmarkType;
  jp: string;
  reading?: string;
  meaning: string;
  level?: string;
  addedAt: number;
}

const KEY = "dimzy-bookmarks";

function load(): Bookmark[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(KEY);
    if (raw) return JSON.parse(raw) as Bookmark[];
  } catch {}
  return [];
}

function save(items: Bookmark[]) {
  try {
    localStorage.setItem(KEY, JSON.stringify(items));
    window.dispatchEvent(new Event("dimzy-bookmarks-changed"));
  } catch {}
}

export function useBookmarks() {
  const [items, setItems] = useState<Bookmark[]>(() => load());

  useEffect(() => {
    setItems(load());
    const handler = () => setItems(load());
    window.addEventListener("dimzy-bookmarks-changed", handler);
    window.addEventListener("storage", handler);
    return () => {
      window.removeEventListener("dimzy-bookmarks-changed", handler);
      window.removeEventListener("storage", handler);
    };
  }, []);

  const toggle = useCallback((b: Omit<Bookmark, "addedAt">) => {
    const list = load();
    const idx = list.findIndex((x) => x.id === b.id);
    let next: Bookmark[];
    if (idx >= 0) next = list.filter((_, i) => i !== idx);
    else next = [{ ...b, addedAt: Date.now() }, ...list];
    save(next);
    setItems(next);
  }, []);

  const isBookmarked = useCallback((id: string) => items.some((x) => x.id === id), [items]);

  const clear = useCallback(() => {
    save([]);
    setItems([]);
  }, []);

  return { items, toggle, isBookmarked, clear };
}
