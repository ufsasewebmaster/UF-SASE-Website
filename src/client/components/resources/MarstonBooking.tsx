"use client";

//import { cn } from "@/shared/utils";

const MarstonBooking = () => {
  return (
    <div className="mx-auto flex max-w-6xl flex-col">
      <h2 className="mb-6 font-redhat text-2xl font-semibold">Marston Study Room Booking</h2>

      <div className="flex flex-col items-start gap-8 md:flex-row">
        {/* temp image for google sheets */}
        <div className="w-full overflow-x-auto md:w-3/5">
          <img src="/images/marstonBookings.png" alt="Marston Bookings Schedule" className="w-full rounded-md shadow-md" />

          {/* implement later w sheets */}
          {/*
          {data.length > 0 ? (
            <table className="min-w-full border border-gray-300 text-sm text-center font-redhat">
              <thead>
                <tr>
                  {data[0]?.map((cell, i) => (
                    <th key={i} className="bg-blue-100 border px-2 py-1">{cell}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {data.slice(1).map((row, i) => (
                  <tr key={i}>
                    {row.map((cell, j) => (
                      <td key={j} className={cn(
                        "border px-2 py-1", 
                        j === 0 ? "bg-blue-100" : j === 1 ? "bg-green-100" : ""
                      )}>
                        {cell}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <div className="text-center py-8 bg-gray-50 rounded border">
              Loading booking data...
            </div>
          )}
          */}

          <a
            href="https://docs.google.com/spreadsheets/d/1qKKHQE5nxGDsBOKozQl2QVFQYEdsOcF7J_p-B-faksc"
            className="mt-3 inline-block font-redhat font-semibold text-saseBlue underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            Google Sheets Link
          </a>
        </div>

        {/* marston hours */}
        <div className="flex w-full justify-center md:w-2/5">
          <img src="/images/marstonHours.png" alt="Marston Library Schedule" className="max-h-64 max-w-xs rounded-md object-contain shadow-md" />
        </div>
      </div>
    </div>
  );
};

export default MarstonBooking;
