import React, { useState } from "react";
import { Calendar, ArrowRight, AlertTriangle } from "lucide-react";

const MONTHS = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
const currentYear = new Date().getFullYear();

export default function DobStep({ data, updateData, onContinue }) {
  const initial = data.birthday ? new Date(data.birthday) : null;
  const [day, setDay] = useState(initial ? initial.getDate() : "");
  const [month, setMonth] = useState(initial ? initial.getMonth() + 1 : "");
  const [year, setYear] = useState(initial ? initial.getFullYear() : "");
  const [underage, setUnderage] = useState(false);

  const days = Array.from({ length: 31 }, (_, i) => i + 1);
  const years = Array.from({ length: 100 }, (_, i) => currentYear - i);

  const calculateAge = () => {
    if (!day || !month || !year) return null;
    const today = new Date();
    const birth = new Date(year, month - 1, day);
    let age = today.getFullYear() - birth.getFullYear();
    const m = today.getMonth() - birth.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birth.getDate())) age--;
    return age;
  };

  const age = calculateAge();
  const canContinue = age !== null && age >= 18;

  const handleContinue = () => {
    if (age < 18) { setUnderage(true); return; }
    const dateStr = `${year}-${String(month).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
    updateData({ birthday: dateStr });
    onContinue();
  };

  if (underage) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center">
        <div className="w-20 h-20 rounded-full bg-red-100 flex items-center justify-center mb-6">
          <AlertTriangle size={36} className="text-red-500" />
        </div>
        <h3 className="text-lg font-bold text-[#2D1B4E] mb-2">You are not eligible to create an account.</h3>
        <p className="text-sm text-gray-400 mb-8">You must be at least 18 years old to use VYRO.</p>
        <div className="flex gap-3 w-full max-w-xs">
          <button
            onClick={() => setUnderage(false)}
            className="flex-1 py-3 rounded-2xl bg-gray-100 text-gray-600 font-semibold text-sm"
          >
            Back
          </button>
          <button
            onClick={() => window.location.href = "/welcome"}
            className="flex-1 py-3 rounded-2xl bg-red-500 text-white font-semibold text-sm"
          >
            Exit
          </button>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="flex justify-center mb-6">
        <div className="w-20 h-20 rounded-full bg-gradient-to-br from-purple-200 to-blue-200 flex items-center justify-center">
          <Calendar size={32} className="text-purple-500" />
        </div>
      </div>

      <div className="grid grid-cols-3 gap-2 mb-4">
        <select
          value={day}
          onChange={(e) => setDay(parseInt(e.target.value))}
          className="rounded-2xl bg-white border border-gray-100 text-sm shadow-sm px-3 outline-none focus:border-purple-300"
          style={{ height: "52px" }}
        >
          <option value="">Day</option>
          {days.map((d) => <option key={d} value={d}>{d}</option>)}
        </select>
        <select
          value={month}
          onChange={(e) => setMonth(parseInt(e.target.value))}
          className="rounded-2xl bg-white border border-gray-100 text-sm shadow-sm px-3 outline-none focus:border-purple-300"
          style={{ height: "52px" }}
        >
          <option value="">Month</option>
          {MONTHS.map((m, i) => <option key={i} value={i + 1}>{m}</option>)}
        </select>
        <select
          value={year}
          onChange={(e) => setYear(parseInt(e.target.value))}
          className="rounded-2xl bg-white border border-gray-100 text-sm shadow-sm px-3 outline-none focus:border-purple-300"
          style={{ height: "52px" }}
        >
          <option value="">Year</option>
          {years.map((y) => <option key={y} value={y}>{y}</option>)}
        </select>
      </div>

      {age !== null && age < 18 && (
        <div className="mb-4 p-3 rounded-xl bg-red-50 text-red-500 text-xs font-medium">
          You must be at least 18 years old to create an account.
        </div>
      )}
      {age !== null && age >= 18 && (
        <div className="mb-4 p-3 rounded-xl bg-green-50 text-green-600 text-xs font-medium">
          ✓ You are {age} years old — eligible to continue.
        </div>
      )}

      <p className="text-[10px] text-gray-300 mb-6">Your date of birth is used to verify your age and won't be displayed publicly.</p>

      <button
        onClick={handleContinue}
        disabled={!canContinue}
        className="w-full rounded-2xl bg-gradient-to-r from-[#6F35E0] to-[#C135E0] text-white font-bold text-sm shadow-lg shadow-purple-200 transition-all active:scale-[0.98] disabled:opacity-40 flex items-center justify-center gap-2"
        style={{ height: "52px" }}
      >
        Continue <ArrowRight size={16} />
      </button>
    </div>
  );
}