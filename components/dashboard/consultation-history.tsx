import { MoreHorizontal, Download } from "lucide-react";

export function ConsultationHistory() {
  const consultations = [
    {
      id: 1,
      lawyer: {
        name: "Mathilda Bell",
        avatar: "/placeholder.svg?height=40&width=40",
      },
      date: "11/0/2024",
      notes: "Legal explanation or advice given",
    },
    {
      id: 2,
      lawyer: {
        name: "Mathilda Bell",
        avatar: "/placeholder.svg?height=40&width=40",
      },
      date: "11/0/2024",
      notes: "Legal explanation or advice given",
    },
    {
      id: 3,
      lawyer: {
        name: "Mathilda Bell",
        avatar: "/placeholder.svg?height=40&width=40",
      },
      date: "11/0/2024",
      notes: "Legal explanation or advice given",
    },
    {
      id: 4,
      lawyer: {
        name: "Mathilda Bell",
        avatar: "/placeholder.svg?height=40&width=40",
      },
      date: "11/0/2024",
      notes: "Legal explanation or advice given",
    },
  ];

  return (
    <div className="bg-white rounded-lg shadow-sm border">
      <div className="flex justify-between items-center p-6 pb-4">
        <div>
          <h2 className="text-lg font-medium">Consultation History</h2>
          <p className="text-sm text-gray-500">Last 2 Weeks</p>
        </div>
        <button className="text-gray-400 hover:text-gray-600">
          <MoreHorizontal size={20} />
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="text-sm text-gray-500 bg-gray-50">
              <th className="font-normal text-left py-1.5 px-4 border-b">No</th>
              <th className="font-normal text-left py-1.5 px-4 border-b">Lawyer name</th>
              <th className="font-normal text-left py-1.5 px-4 border-b">Date of consultation</th>
              <th className="font-normal text-left py-1.5 px-4 border-b">Notes or summary</th>
              <th className="font-normal text-left py-1.5 px-4 border-b">Download</th>
            </tr>
          </thead>
          <tbody>
            {consultations.map((consultation, index) => (
              <tr
                key={index}
                className={index % 2 === 0 ? "bg-gray-100" : "bg-white"}
              >
                <td className="py-2.5 px-4">{index + 1}</td>
                <td className="py-2.5 px-4">
                  <div className="flex items-center gap-2">
                    <div className="h-6 w-6 rounded-full overflow-hidden">
                      <img
                        src={consultation.lawyer.avatar || "/placeholder.svg"}
                        alt={consultation.lawyer.name}
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <span>{consultation.lawyer.name}</span>
                  </div>
                </td>
                <td className="py-2.5 px-4">{consultation.date}</td>
                <td className="py-2.5 px-4 text-gray-600">{consultation.notes}</td>
                <td className="py-2.5 px-4 text-center">
                  <button className="text-gray-400 hover:text-gray-600 rounded-full p-0.5 hover:bg-gray-100">
                    <Download size={18} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
