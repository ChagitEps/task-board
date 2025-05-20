
import React, { useState } from "react";
import { HDate,gematriya  } from "hebcal";
import "./Board3.css"
export default function HebrewGregorianCalendar() {
  const [selectedDate,  setSelectedDate] = useState(new Date());
  const [isHebrew, setIsHebrew] = useState(true);
  const [showYearSelector, setShowYearSelector] = useState(false);

  const hDate = new HDate(selectedDate);

  const toggleCalendar = () => setIsHebrew(!isHebrew);

  const hebrewMonthNames = {
    "Nisan": "ניסן",
    "Iyyar": "אייר",
    "Sivan": "סיון",
    "Tamuz": "תמוז",
    "Av": "אב",
    "Elul": "אלול",
    "Tishrei": "תשרי",
    "Cheshvan": "חשוון",
    "Kislev": "כסלו",
    "Tevet": "טבת",
    "Sh'vat": "שבט",
    "Adar": "אדר",
    "Adar 1": "אדר א׳",
    "Adar 2": "אדר ב׳"
  };
  const getDisplayDate = () => {
    if (isHebrew) {
      const hebDate = new HDate(selectedDate);
      const day = gematriya(hebDate.getDate());
      const month = hebrewMonthNames[hebDate.getMonthName()];
      const year = gematriya(hebDate.getFullYear());
      console.log("Month name from HDate:", hDate.getMonthName());
      return `${day} ב${month} ${year}`;
    } else {
      return selectedDate.toLocaleDateString("he-IL");
    }
  };

  const handleDayClick = (offset) => {
    const newDate = new Date(selectedDate);
    newDate.setDate(newDate.getDate() + offset);
    setSelectedDate(newDate);
  };

  const handleDateClick = (day) => {
    const newDate = new Date(selectedDate);
    newDate.setDate(day);
    setSelectedDate(newDate);
  };

  const handleMonthChange = (e) => {
    const newDate = new Date(selectedDate);
    newDate.setMonth(Number(e.target.value));
    setSelectedDate(newDate);
  };

  const handleYearChange = (e) => {
    const newDate = new Date(selectedDate);
    newDate.setFullYear(Number(e.target.value));
    setSelectedDate(newDate);
  };

  const getDaysInMonth = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    return new Date(year, month + 1, 0).getDate();
  };

  const handleMonthOffset = (offset) => {
    const newDate = new Date(selectedDate);
    newDate.setMonth(newDate.getMonth() + offset);
    setSelectedDate(newDate);
  };

  const daysInMonth = getDaysInMonth(selectedDate);
  const currentMonth = selectedDate.getMonth();
  const currentYear = selectedDate.getFullYear();
  const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();

  const monthNames = [
    "ינואר",
    "פברואר",
    "מרץ",
    "אפריל",
    "מאי",
    "יוני",
    "יולי",
    "אוגוסט",
    "ספטמבר",
    "אוקטובר",
    "נובמבר",
    "דצמבר",
  ];

  return (
    <div className="calendar-container" style={{ direction: "rtl", textAlign: "center", padding: 20 }}>
      <button onClick={toggleCalendar} style={{ marginBottom: 20 }}>
       החלף לוח ל{isHebrew ? "לועזי" : "עברי"}
      </button>

      <div className="date-display" style={{ fontSize: "20px", marginBottom: 10 }}>
        התאריך הנבחר: <strong>{getDisplayDate()}</strong>
      </div>

      <div className="selectors" style={{ marginBottom: 10 }}>
  {isHebrew ? (
    <>
      שנה:
      <select
        onChange={(e) => {
          const newDate = new Date(selectedDate);
          const hdate = new HDate(newDate);
          const newYear = Number(e.target.value);
          const newHDate = new HDate(hdate.getDate(), hdate.getMonth(), newYear);
          setSelectedDate(newHDate.greg());
        }}
        value={new HDate(selectedDate).getFullYear()}
      >
        {Array.from({ length: 150 }, (_, i) => 5700 + i).map((year) => (
          <option key={year} value={year}>
            {gematriya(year)}
          </option>
        ))}
      </select>
      חודש:
      <select
        onChange={(e) => {
          const newMonth = e.target.value;
          const hdate = new HDate(selectedDate);
          const newHDate = new HDate(hdate.getDate(), newMonth, hdate.getFullYear());
          setSelectedDate(newHDate.greg());
        }}
        value={new HDate(selectedDate).getMonthName()}
      >
        {Object.entries(hebrewMonthNames).map(([engName, hebName]) => (
          <option key={engName} value={engName}>
            {hebName}
          </option>
        ))}
      </select>
    </>
  ) : (
    <>
      שנה:
      <select onChange={handleYearChange} value={selectedDate.getFullYear()}>
        {Array.from({ length: 200 }, (_, i) => 1925 + i).map((year) => (
          <option key={year} value={year}>
            {year}
          </option>
        ))}
      </select>
      חודש:
      <select onChange={handleMonthChange} value={currentMonth}>
        {monthNames.map((name, idx) => (
          <option key={idx} value={idx}>
            {name}
          </option>
        ))}
      </select>
    </>
  )}
</div>

      <div className="nav-buttons" style={{ marginBottom: 10 }}>
  <button onClick={() => handleMonthOffset(-1)}>חודש קודם</button>
  <button onClick={() => handleMonthOffset(1)} style={{ marginRight: 10 }}>
    חודש הבא
  </button>
</div>

      {/* לוח שנה */}
      <div className="calendar-grid"
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(7, 1fr)",
          gap: "5px",
          marginTop: "20px",
          maxWidth: "400px",
          marginInline: "auto",
        }}
      >
        {["א'", "ב'", "ג'", "ד'", "ה'", "ו'", "ש'"].map((day, idx) => (
          <div key={idx} style={{ fontWeight: "bold" }}>
            {day}
          </div>
        ))}

       {/* רווחים לפני תחילת החודש */}
{Array.from({ length: firstDayOfMonth }).map((_, i) => (
  <div key={`empty-${i}`} />
))}


        {/* ימים בלחיצה */}
        {Array.from({ length: daysInMonth }, (_, i) => {
          const dayNum = i + 1;
          const tempDate = new Date(currentYear, currentMonth, dayNum);
          const tempHDate = new HDate(tempDate);

          return (
            <div
              key={i}
              onClick={() => handleDateClick(dayNum)}
              style={{
                padding: "5px",
                border:
                  dayNum === selectedDate.getDate() &&
                  currentMonth === selectedDate.getMonth()
                    ? "2px solid #2196f3"
                    : "1px solid #ccc",
                cursor: "pointer",
                borderRadius: "4px",
                backgroundColor:
                  dayNum === selectedDate.getDate() &&
                  currentMonth === selectedDate.getMonth()
                    ? "#e3f2fd"
                    : "white",
              }}
            >
              {isHebrew
                ? gematriya(tempHDate.getDate())
                : dayNum.toLocaleString("he-IL")}
            </div>
          );
        })}
      </div>
    </div>
  );
}
