"use client";

import { useSheetData } from "@/client/hooks/useSheetData";
import { cn } from "@/shared/utils";

export default function MarstonBooking() {
  const { data, error, loading } = useSheetData("marston");
  const colCount = data[0]?.length ?? 0;

  // Tailwind classes — with dark variants
  const tableWrapper = cn("table-auto min-w-full border-collapse border border-gray-700 text-center font-redhat text-base", "dark:border-gray-400");
  const cellPadding = cn("border border-gray-700 px-3 py-2", "dark:border-gray-400");
  const headerBg = [cn("bg-blue-100", "dark:bg-blue-900"), cn("bg-green-100", "dark:bg-green-900"), cn("bg-white", "dark:bg-gray-800")];

  return (
    <div className="mx-auto flex max-w-6xl flex-col">
      <h2 className="mb-6 font-redhat text-2xl font-semibold text-foreground dark:text-white">Marston Study Room Booking</h2>

      <div className="flex flex-col items-start gap-4 md:flex-row">
        {/* bookings sheets */}
        <div className="w-full overflow-x-auto md:w-2/3">
          {loading ? (
            <div className="rounded border border-gray-300 bg-gray-50 py-8 text-center text-foreground dark:border-gray-600 dark:bg-gray-800 dark:text-gray-200">
              Loading bookings…
            </div>
          ) : error ? (
            <div className="py-4 text-center text-red-500 dark:text-red-400">{error}</div>
          ) : colCount > 0 ? (
            <table className={tableWrapper}>
              <thead>
                <tr>
                  {data[0].map((cell, i) => (
                    <th key={i} className={cn(cellPadding, headerBg[i] || headerBg[2], "text-foreground dark:text-gray-100")}>
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
                      const isLink = cIdx === 2 && cell === "Link to Pi Booking Site";

                      return (
                        <td
                          key={cIdx}
                          className={cn(
                            cellPadding,
                            cIdx === 0
                              ? cn("bg-blue-100", "dark:bg-blue-900")
                              : cIdx === 1
                                ? cn("bg-green-100 font-medium", "dark:bg-green-900 dark:text-gray-200")
                                : "text-foreground dark:text-gray-200",
                          )}
                        >
                          {isLink ? (
                            <a
                              href="https://libcal.uflib.ufl.edu/space/28257"
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-saseBlue underline dark:text-saseBlueLight"
                            >
                              {cell}
                            </a>
                          ) : (
                            cell
                          )}
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          ) : null}

          <a
            href="https://docs.google.com/spreadsheets/d/1qKKHQE5nxGDsBOKozQl2QVFQYEdsOcF7J_p-B-faksc"
            className="mt-3 inline-block font-redhat font-semibold text-saseBlue underline dark:text-saseBlueLight"
            target="_blank"
            rel="noopener noreferrer"
          >
            Google Sheets Link
          </a>
        </div>

        {/* marston hours */}
        <div className="flex w-full justify-center md:w-1/3">
          <table className={tableWrapper}>
            <thead>
              <tr>
                <th className={cn(cellPadding, cn("bg-gray-100", "dark:bg-gray-700"), "text-foreground dark:text-gray-100")}>Marston’s Schedule</th>
              </tr>
            </thead>
            <tbody>
              {["Mon–Thur: 24 hrs", "Friday: 8 AM – 10 PM", "Saturday: 9 AM – 8 PM", "Sunday: 10 AM – 1 AM"].map((line, idx) => (
                <tr key={idx}>
                  <td className={cn(cellPadding, "text-foreground dark:text-gray-200")}>{line}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
