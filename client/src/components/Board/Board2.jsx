import DatePicker from "react-multi-date-picker";
import hebrew from "react-date-object/calendars/hebrew";
import hebrew_he from "react-date-object/locales/hebrew_he";

export default function HebrewCalendar() {
  return (
    <div style={{ direction: "rtl", padding: "20px" }}>
      <h2>לוח שנה עברי פתוח</h2>
      <DatePicker
        calendar={hebrew}
        locale={hebrew_he}
        value={new Date()}
        style={{ width: "100%", fontSize: "18px" }}
        calendarPosition="bottom-right"
        disableDayPicker={false}
        format="iD iMMMM iYYYY"
      />
    </div>
  );
}
