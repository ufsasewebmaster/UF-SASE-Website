import { useEffect, useState } from "react";

export type SheetName = "board" | "marston";

export function useSheetData(sheet: SheetName) {
  const [data, setData] = useState<Array<Array<string>>>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    setError(null);

    fetch(`/api/resources/sheet?sheet=${sheet}`)
      .then(async (res) => {
        if (!res.ok) {
          const err = await res.json().catch(() => ({}));
          throw new Error((err as unknown as { message?: string }).message || res.statusText);
        }
        return res.json() as Promise<{ data: Array<Array<string>> }>;
      })
      .then((payload) => setData(payload.data))
      .catch((err: Error) => setError(err.message))
      .finally(() => setLoading(false));
  }, [sheet]);

  return { data, loading, error };
}
