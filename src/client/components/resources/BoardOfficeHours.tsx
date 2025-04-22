"use client";

//import { cn } from "@/shared/utils";

const BoardOfficeHours = () => {
  return (
    <div className="mx-auto flex max-w-6xl flex-col">
      <h2 className="mb-6 font-redhat text-2xl font-semibold">Board Office Hours</h2>

      <div className="flex flex-col justify-center gap-8 md:flex-row">
        {/* MALA Map image */}
        <div className="w-full md:w-2/5">
          <img src="/images/malaMap.png" alt="MALA Location Map" className="max-h-80 w-full rounded-md object-cover shadow-md" />
        </div>

        {/* temp image for google sheets */}
        <div className="w-full overflow-x-auto md:w-3/5">
          <img src="/images/boardOH.png" alt="Board Office Hours Schedule" className="w-full rounded-md shadow-md" />

          {/* need to implement google sheets data later */}
          {/* 
          {data.length > 0 ? (
            <table className="min-w-full border border-gray-300 text-sm text-center font-redhat">
              <thead>
                <tr>
                  {data[0]?.map((cell, i) => (
                    <th key={i} className="bg-gray-100 border px-2 py-1">{cell}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {data.slice(1).map((row, i) => (
                  <tr key={i}>
                    {row.map((cell, j) => (
                      <td key={j} className={cn("border px-2 py-1", j > 0 && cell && "bg-green-100")}>{cell}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <div className="text-center py-8 bg-gray-50 rounded border">
              Loading schedule data...
            </div>
          )}
          */}

          <a
            href="https://docs.google.com/spreadsheets/d/10Wx6CTsjUDtoSTYmVplydyAfoCm55FGVUNhEQRpiYVY"
            className="mt-3 inline-block font-redhat font-semibold text-saseBlue underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            Google Sheets Link
          </a>
        </div>
      </div>
    </div>
  );
};

export default BoardOfficeHours;
