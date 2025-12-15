// import { useState, useEffect } from "react";
// import { Card, Button, Table, Label, TextInput } from "flowbite-react";
// import axios from "axios";

// const Reports = () => {
//   const [reports, setReports] = useState([]);
//   const [fromDate, setFromDate] = useState("");
//   const [toDate, setToDate] = useState("");
//   const [loading, setLoading] = useState(false);

//   // Fetch reports from backend
//   const fetchReports = async () => {
//     if (!fromDate || !toDate) return;
//     setLoading(true);
//     try {
//       const res = await axios.get("/api/reports", {
//         params: { from: fromDate, to: toDate },
//       });
//       setReports(res.data);
//     } catch (err) {
//       console.error("Error fetching reports:", err);
//     }
//     setLoading(false);
//   };

//   // Download reports as TXT
//   const downloadTXT = () => {
//     if (!reports.length) return;
//     let txtContent = "Tank\tWater Level (%)\tPump Status\tTimestamp\n";
//     reports.forEach((r) => {
//       txtContent += `${r.tank}\t${r.waterLevel}\t${r.pumpStatus}\t${r.timestamp}\n`;
//     });

//     const blob = new Blob([txtContent], { type: "text/plain;charset=utf-8" });
//     const link = document.createElement("a");
//     link.href = URL.createObjectURL(blob);
//     link.download = `H2Otronics_Report_${fromDate}_to_${toDate}.txt`;
//     document.body.appendChild(link);
//     link.click();
//     document.body.removeChild(link);
//   };

//   return (
//     <div className="p-6 relative z-10">
//       <h1 className="text-3xl font-bold mb-6 text-blue-800">Reports</h1>

//       <Card className="mb-6">
//         <div className="flex flex-wrap gap-4 items-end">
//           <div>
//             <Label htmlFor="from-date">From Date</Label>
//             <TextInput
//               id="from-date"
//               type="date"
//               value={fromDate}
//               onChange={(e) => setFromDate(e.target.value)}
//             />
//           </div>
//           <div>
//             <Label htmlFor="to-date">To Date</Label>
//             <TextInput
//               id="to-date"
//               type="date"
//               value={toDate}
//               onChange={(e) => setToDate(e.target.value)}
//             />
//           </div>
//           <Button color="blue" onClick={fetchReports}>
//             {loading ? "Loading..." : "Fetch Reports"}
//           </Button>
//           <Button color="green" onClick={downloadTXT}>
//             Download TXT
//           </Button>
//         </div>
//       </Card>

//       <Card>
//         {reports.length ? (
//           <Table hoverable>
//             <Table.Head>
//               <Table.HeadCell>Tank</Table.HeadCell>
//               <Table.HeadCell>Water Level (%)</Table.HeadCell>
//               <Table.HeadCell>Pump Status</Table.HeadCell>
//               <Table.HeadCell>Timestamp</Table.HeadCell>
//             </Table.Head>
//             <Table.Body className="divide-y">
//               {reports.map((r, i) => (
//                 <Table.Row key={i}>
//                   <Table.Cell>{r.tank}</Table.Cell>
//                   <Table.Cell>{r.waterLevel}</Table.Cell>
//                   <Table.Cell>{r.pumpStatus}</Table.Cell>
//                   <Table.Cell>
//                     {new Date(r.timestamp).toLocaleString()}
//                   </Table.Cell>
//                 </Table.Row>
//               ))}
//             </Table.Body>
//           </Table>
//         ) : (
//           <p className="text-gray-500">
//             No reports to display. Please select a date range.
//           </p>
//         )}
//       </Card>
//     </div>
//   );
// };

// export default Reports;
import { useState } from "react";
import { Card, Button, Label, TextInput } from "flowbite-react";
import {
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  TableHeadCell,
} from "flowbite-react";

const Reports = () => {
  // Dummy data
  const [reports] = useState([
    {
      tank: "Roof Tank 1",
      waterLevel: 78,
      pumpStatus: "ON",
      timestamp: "2025-11-25T10:00:00Z",
    },
    {
      tank: "Roof Tank 2",
      waterLevel: 55,
      pumpStatus: "OFF",
      timestamp: "2025-11-25T10:05:00Z",
    },
    {
      tank: "Basement Tank",
      waterLevel: 32,
      pumpStatus: "ON",
      timestamp: "2025-11-25T10:10:00Z",
    },
  ]);

  // Static date range (optional)
  const [fromDate, setFromDate] = useState("2025-11-25");
  const [toDate, setToDate] = useState("2025-11-25");

  // Download reports as TXT
  const downloadTXT = () => {
    if (!reports.length) return;

    let txtContent = "Tank\tWater Level (%)\tPump Status\tTimestamp\n";
    reports.forEach((r) => {
      txtContent += `${r.tank}\t${r.waterLevel}\t${r.pumpStatus}\t${r.timestamp}\n`;
    });

    const blob = new Blob([txtContent], { type: "text/plain;charset=utf-8" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = `H2Otronics_Report_${fromDate}_to_${toDate}.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="p-6 relative z-10">
      <h1 className="text-3xl font-bold mb-6 ">Reports</h1>

      {/* Date filters and download button */}
      <Card className="mb-6 tableCard">
        <div className="flex flex-wrap gap-4 items-end">
          <div className="gap-1.5 flex flex-col">
            <Label htmlFor="from-date">From Date</Label>
            <TextInput
              id="from-date"
              type="date"
              value={fromDate}
              onChange={(e) => setFromDate(e.target.value)}
            />
          </div>
          <div className="gap-1.5 flex flex-col">
            <Label htmlFor="to-date">To Date</Label>
            <TextInput
              id="to-date"
              type="date"
              value={toDate}
              onChange={(e) => setToDate(e.target.value)}
            />
          </div>
          <Button
            className="
                text-black border p-2 rounded-md 
                hover:bg-sky-200 hover:text-white 
                hover:scale-105 hover:shadow-lg 
                transition transform duration-200 ease-in-out
              "
            onClick={downloadTXT}
          >
            Download TXT
          </Button>
        </div>
      </Card>

      {/* Table */}
      <Card className="tableCard overflow-x-auto">
        <Table className="min-w-full">
          <TableHead>
            <TableRow>
              <TableHeadCell>Tank</TableHeadCell>
              <TableHeadCell>Water Level (%)</TableHeadCell>
              <TableHeadCell>Pump Status</TableHeadCell>
              <TableHeadCell>Timestamp</TableHeadCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {reports.map((r, i) => (
              <TableRow key={i}>
                <TableCell className="rounded-l-2xl px-4 py-2 text-center hover:bg-gray-200 dark:hover:bg-slate-300 transition-colors duration-200">
                  {r.tank}
                </TableCell>
                <TableCell className="px-4 py-2 text-center hover:bg-gray-200 dark:hover:bg-slate-200 transition-colors duration-200">
                  {r.waterLevel}
                </TableCell>
                <TableCell className="px-4 py-2 text-center hover:bg-gray-200 dark:hover:bg-slate-200 transition-colors duration-200">
                  {r.pumpStatus}
                </TableCell>
                <TableCell className="rounded-r-2xl px-4 py-2 text-center hover:bg-gray-200 dark:hover:bg-slate-200 transition-colors duration-200">
                  {new Date(r.timestamp).toLocaleString()}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </div>
  );
};

export default Reports;
