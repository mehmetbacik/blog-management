import React, { useState, useEffect } from "react";

export const TopBarDate: React.FC = () => {
  const [currentDate, setCurrentDate] = useState("");

  useEffect(() => {
    const today = new Date();
    const formattedDate = today.toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
    setCurrentDate(formattedDate);
  }, []);

  return <span className="topbar__date">{currentDate}</span>;
};
