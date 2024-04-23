// pages/javascript.tsx
import React, { useState, useEffect } from "react";

const JavaScriptPage: React.FC = () => {
  const [stations, setStations] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");

  useEffect(() => {
    const fetchStations = async () => {
      try {
        const response = await fetch(
          "https://api.irail.be/stations/?format=json"
        );
        const data = await response.json();
        setStations(data.station);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchStations();
  }, []);

  const sortedStations = stations
    .filter((station: any) =>
      station.name.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a: any, b: any) => {
      if (sortDirection === "asc") {
        return a.name.localeCompare(b.name);
      } else {
        return b.name.localeCompare(a.name);
      }
    });

  const toggleSortDirection = () => {
    setSortDirection(prev => (prev === "asc" ? "desc" : "asc"));
  };

  return (
    <div className="table">
      <input
        type="text"
        placeholder="Search by name"
        value={searchTerm}
        onChange={e => setSearchTerm(e.target.value)}
      />
      <table>
        <thead>
          <tr>
            <th>
              <span>
                Name<button onClick={toggleSortDirection}>Sort</button>
              </span>
            </th>
            <th>Latitude</th>
            <th>Longitude</th>
            <th>Note</th>
          </tr>
        </thead>
        <tbody>
          {sortedStations.map((station: any) =>
            <tr key={station.id}>
              <td>
                <a
                  href={`https://www.google.com/maps/search/?api=1&query=${station.locationX},${station.locationY}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {station.name}
                </a>
              </td>
              <td>
                {station.locationX}
              </td>
              <td>
                {station.locationY}
              </td>
              <td>
                <input type="text" placeholder="Enter note" />
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default JavaScriptPage;
