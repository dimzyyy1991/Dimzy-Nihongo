import { Bookmark as BookmarkIcon } from "lucide-react";
import { useBookmarks, type Bookmark } from "@/hooks/use-bookmarks";

export function BookmarkButton(props: Omit<Bookmark, "addedAt">) {
  const { isBookmarked, toggle } = useBookmarks();
  const active = isBookmarked(props.id);
  return (
    <button
      type="button"
      onClick={(e) => {
        e.stopPropagation();
        toggle(props);
      }}
      className={`inline-flex h-8 w-8 items-center justify-center rounded-md border transition-colors ${
        active
          ? "border-primary/40 bg-primary/10 text-primary"
          : "border-border bg-card text-muted-foreground hover:text-foreground"
      }`}
      title={active ? "Hapus dari favorit" : "Tambah ke favorit"}
      aria-label="Bookmark"
    >
      <BookmarkIcon className="h-4 w-4" fill={active ? "currentColor" : "none"} />
    </button>
  );
}
