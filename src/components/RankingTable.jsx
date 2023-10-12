import React from "react";

const RankingTable = ({ rankings }) => {
  return (
    <table className="w-3/4 bg-white text-black rounded-lg shadow-lg border-collapse overflow-hidden">
      <thead>
        <tr>
          <th className="w-8 py-2 border">#</th>
          <th className="px-4 py-2 border">Name</th>
          <th className="px-4 py-2 border">Points</th>
        </tr>
      </thead>
      <tbody>
        {rankings.length === 0 ? (
          <tr>
            <td colSpan="3" className="px-4 text-center border py-2">
              No one ranked yet, Be the first!
            </td>
          </tr>
        ) : (
          rankings.map((rank, index) => (
            <tr key={index} className={index % 2 !== 0 ? "bg-gray-50" : ""}>
              <td
                className={`px-4 py-2 border-b border-r ${
                  index === 0 && "bg-yellow-500 font-bold"
                } ${index === 1 && "bg-slate-300 font-bold"} ${
                  index === 2 && "bg-orange-800 font-bold"
                }`}
              >
                {index + 1}
              </td>
              <td className="px-4 py-2 border-b border-r">{rank.name}</td>
              <td className="px-4 py-2 border-b">{rank.score}</td>
            </tr>
          ))
        )}
      </tbody>
    </table>
  );
};

export default RankingTable;
