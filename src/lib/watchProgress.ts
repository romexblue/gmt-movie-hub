const STORAGE_KEY_PREFIX = "gmt_watch_progress_tv_";

export interface WatchProgress {
    seasonName: string;
    seasonNumber: number;
    episode: number;
}

export const getWatchProgress = (tvId: number): WatchProgress | null => {
    if (typeof window === "undefined") return null;
    const raw = localStorage.getItem(`${STORAGE_KEY_PREFIX}${tvId}`);
    if (!raw) return null;
    try {
        return JSON.parse(raw) as WatchProgress;
    } catch {
        return null;
    }
};

export const setWatchProgress = (
    tvId: number,
    progress: WatchProgress
): void => {
    if (typeof window === "undefined") return;
    localStorage.setItem(
        `${STORAGE_KEY_PREFIX}${tvId}`,
        JSON.stringify(progress)
    );
};

export const clearWatchProgress = (tvId: number): void => {
    if (typeof window === "undefined") return;
    localStorage.removeItem(`${STORAGE_KEY_PREFIX}${tvId}`);
};
