
/*import React, { useState } from "react";
import { ReactJewishDatePicker } from "react-jewish-datepicker";

function Board() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [isHebrew, setIsHebrew] = useState(true); // עברי כברירת מחדל

  const toggleCalendarLanguage = () => {
    setIsHebrew(prev => !prev);
  };

  return (
    <div style={{ direction: isHebrew ? "rtl" : "ltr", textAlign: "center" }}>
      <button
        onClick={toggleCalendarLanguage}
        style={{
          padding: "8px 16px",
          marginBottom: "10px",
          borderRadius: "5px",
          border: "none",
          backgroundColor: "#007bff",
          color: "white",
          cursor: "pointer",
        }}
      >
        החלף ל{isHebrew ? "תצוגה לועזית" : "תצוגה עברית"}
      </button>

      <ReactJewishDatePicker
        value={selectedDate}
        onChange={setSelectedDate}
        isHebrew={isHebrew}
        showCalendar 
        style={{
          fontSize: "16px",
          padding: "10px",
          borderRadius: "8px",
          border: "2px solid #ccc",
          boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
          marginTop: "10px",
        }}
      />

      <h2 style={{ marginTop: "20px" }}>
        התאריך שנבחר: {selectedDate.toLocaleDateString()}
      </h2>
    </div>
  );
}

export default Board;*/
import React, { useState } from "react";
import { ReactJewishDatePicker } from "react-jewish-datepicker";

function Board() {
  const [date, setDate] = useState(new Date());
  const [isHebrew, setIsHebrew] = useState(true);

  const toggleCalendar = () => setIsHebrew(!isHebrew);

  return (
    <div style={{ direction: isHebrew ? "rtl" : "ltr", textAlign: "center" }}>
      <button onClick={toggleCalendar}>
        החלף לוח ל{isHebrew ? "לועזי" : "עברי"}
      </button>

      <div style={{ marginTop: "10px" }}>
        <ReactJewishDatePicker
          value={date}
          onClick={setDate}
          isHebrew={isHebrew}
          style={{
            fontSize: "16px",
            padding: "10px",
            borderRadius: "8px",
            border: "2px solid #ccc",
            boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
            marginTop: "10px",
          }}
        />
      </div>
    </div>
  );
}

export default Board;

