"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import {
  getMonthName,
  getYear,
  getDaysInMonth,
  getFirstDayOfMonth,
  getNextMonth,
  getPreviousMonth,
  hasAvailableSlots,
  getAvailableSlotCount,
  isPastDate,
} from "@/lib/availability";

interface BookingCalendarProps {
  selectedDate: Date | null;
  onSelectDate: (date: Date) => void;
}

export default function BookingCalendar({
  selectedDate,
  onSelectDate,
}: BookingCalendarProps) {
  const [currentMonth, setCurrentMonth] = useState(new Date());

  const daysInMonth = getDaysInMonth(currentMonth);
  const firstDayOfMonth = getFirstDayOfMonth(currentMonth);
  const monthName = getMonthName(currentMonth);
  const year = getYear(currentMonth);

  // Generate calendar days
  const calendarDays: (Date | null)[] = [];
  
  // Add empty cells for days before the first day of the month
  for (let i = 0; i < firstDayOfMonth; i++) {
    calendarDays.push(null);
  }
  
  // Add actual days of the month
  for (let day = 1; day <= daysInMonth; day++) {
    calendarDays.push(
      new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day)
    );
  }

  const handlePreviousMonth = () => {
    setCurrentMonth(getPreviousMonth(currentMonth));
  };

  const handleNextMonth = () => {
    setCurrentMonth(getNextMonth(currentMonth));
  };

  const handleDateClick = (date: Date) => {
    if (!isPastDate(date) && hasAvailableSlots(date)) {
      onSelectDate(date);
    }
  };

  const isSelected = (date: Date | null) => {
    if (!date || !selectedDate) return false;
    return (
      date.getDate() === selectedDate.getDate() &&
      date.getMonth() === selectedDate.getMonth() &&
      date.getFullYear() === selectedDate.getFullYear()
    );
  };

  const isToday = (date: Date | null) => {
    if (!date) return false;
    const today = new Date();
    return (
      date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear()
    );
  };

  return (
    <div className="bg-gradient-to-br from-primary-600 to-primary-700 rounded-2xl shadow-2xl overflow-hidden">
      {/* Calendar Header */}
      <div className="bg-primary-700 px-6 py-4 flex items-center justify-between">
        <button
          onClick={handlePreviousMonth}
          className="p-2 hover:bg-primary-600 rounded-lg transition-colors"
          aria-label="Previous month"
        >
          <ChevronLeft className="w-6 h-6 text-white" />
        </button>
        
        <h2 className="text-2xl font-heading font-bold text-white">
          {monthName} {year}
        </h2>
        
        <button
          onClick={handleNextMonth}
          className="p-2 hover:bg-primary-600 rounded-lg transition-colors"
          aria-label="Next month"
        >
          <ChevronRight className="w-6 h-6 text-white" />
        </button>
      </div>

      {/* Day Labels */}
      <div className="grid grid-cols-7 bg-primary-600 text-white font-semibold text-sm">
        {["MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"].map((day) => (
          <div key={day} className="text-center py-3">
            {day}
          </div>
        ))}
      </div>

      {/* Calendar Grid */}
      <div className="grid grid-cols-7 bg-white p-4 gap-2">
        {calendarDays.map((date, index) => {
          if (!date) {
            return <div key={`empty-${index}`} className="aspect-square" />;
          }

          const available = hasAvailableSlots(date);
          const past = isPastDate(date);
          const selected = isSelected(date);
          const today = isToday(date);
          const slotCount = getAvailableSlotCount(date);

          return (
            <div key={index} className="aspect-square relative">
              <button
                onClick={() => handleDateClick(date)}
                disabled={past || !available}
                className={`
                  w-full h-full rounded-lg font-semibold text-lg
                  transition-all duration-200 relative
                  ${
                    selected
                      ? "bg-green-500 text-white shadow-lg scale-105"
                      : today
                      ? "border-2 border-primary-500 text-primary-700"
                      : available && !past
                      ? "bg-gray-50 text-gray-900 hover:bg-primary-100 hover:scale-105"
                      : "bg-gray-100 text-gray-400 cursor-not-allowed"
                  }
                `}
              >
                {date.getDate()}
                
                {/* Availability indicator */}
                {available && !past && !selected && slotCount > 0 && (
                  <div className="absolute bottom-1 left-1/2 transform -translate-x-1/2">
                    <div className="text-xs text-green-600 font-normal whitespace-nowrap">
                      {slotCount} Available
                    </div>
                  </div>
                )}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
