"use client";

import { useSheetData } from "@/client/hooks/useSheetData";
import { cn } from "@/shared/utils";

export default function BoardOfficeHours() {
  const { data, error, loading } = useSheetData("board");
  const colCount = data[0]?.length ?? 0;

  const tableWrapper = cn("table-auto min-w-full border-collapse border border-gray-700 text-center font-redhat text-base", "dark:border-gray-400");
  const cellPadding = cn("border border-gray-700 px-3 py-2", "dark:border-gray-400");
  const headerBg = (idx: number) => (idx === 0 ? cn("bg-white", "dark:bg-gray-800") : cn("bg-gray-100", "dark:bg-gray-700"));

  return (
    <div className="mx-auto flex max-w-6xl flex-col">
      <h2 className="mb-6 font-redhat text-2xl font-semibold text-foreground dark:text-white">Board Office Hours</h2>

      <div className="flex flex-col justify-center gap-4 md:flex-row md:gap-12">
        {/* MALA Map image */}
        <div className="w-full md:w-2/5">
          <img src="/images/malaMap.png" alt="MALA Location Map" className="max-h-80 w-full rounded-md object-cover shadow-md" />
        </div>

        {/* schdule sheets */}
        <div className="w-full overflow-x-auto md:w-3/5">
          {loading ? (
            <div className="rounded border border-gray-300 bg-gray-50 py-8 text-center text-foreground dark:border-gray-600 dark:bg-gray-800 dark:text-gray-200">
              Loading schedule…
            </div>
          ) : error ? (
            <div className="py-4 text-center text-red-500 dark:text-red-400">{error}</div>
          ) : colCount > 0 ? (
            <table className={tableWrapper}>
              <thead>
                <tr>
                  {data[0].map((cell, i) => (
                    <th key={i} className={cn(cellPadding, headerBg(i), "text-foreground dark:text-gray-100")}>
                      {cell}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {data.slice(1).map((row, rIdx) => (
                  <tr key={rIdx}>
                    {Array.from({ length: colCount }).map((_, cIdx) => {
                      const cell = row[cIdx] ?? "";
                      return (
                        <td
                          key={cIdx}
                          className={cn(
                            cellPadding,
                            cIdx > 0 && cell
                              ? cn("bg-green-100 font-medium text-foreground", "dark:bg-green-900 dark:text-gray-200")
                              : "text-foreground dark:text-gray-200",
                          )}
                        >
                          {cell}
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          ) : null}

          <a
            href="https://docs.google.com/spreadsheets/d/10Wx6CTsjUDtoSTYmVplydyAfoCm55FGVUNhEQRpiYVY"
            className="mt-3 inline-block font-redhat font-semibold text-saseBlue underline dark:text-saseBlueLight"
            target="_blank"
            rel="noopener noreferrer"
          >
            Google Sheets Link
          </a>
        </div>
      </div>
    </div>
  );
}
