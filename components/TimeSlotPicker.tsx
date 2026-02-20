"use client";

import { Clock } from "lucide-react";
import { getAvailableSlots, formatDate } from "@/lib/availability";

interface TimeSlotPickerProps {
  selectedDate: Date;
  selectedTime: string | null;
  onSelectTime: (time: string) => void;
}

export default function TimeSlotPicker({
  selectedDate,
  selectedTime,
  onSelectTime,
}: TimeSlotPickerProps) {
  const slots = getAvailableSlots(selectedDate);

  return (
    <div className="space-y-6">
      {/* Selected Date Display */}
      <div className="bg-primary-50 border border-primary-200 rounded-lg p-4">
        <div className="flex items-center space-x-2 text-primary-700">
          <Clock className="w-5 h-5" />
          <span className="font-semibold">Selected Date:</span>
        </div>
        <p className="text-lg font-heading font-bold text-gray-900 mt-1">
          {formatDate(selectedDate)}
        </p>
      </div>

      {/* Time Slots */}
      <div>
        <h3 className="text-xl font-heading font-bold text-gray-900 mb-4">
          Available Time Slots
        </h3>
        
        {slots.length === 0 ? (
          <p className="text-gray-600">No available slots for this date.</p>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {slots.map((slot) => (
              <button
                key={slot.time}
                onClick={() => slot.available && onSelectTime(slot.time)}
                disabled={!slot.available}
                className={`
                  py-4 px-6 rounded-lg font-semibold text-lg
                  transition-all duration-200
                  ${
                    selectedTime === slot.time
                      ? "bg-green-500 text-white shadow-lg scale-105"
                      : slot.available
                      ? "bg-white border-2 border-gray-200 text-gray-900 hover:border-primary-500 hover:bg-primary-50"
                      : "bg-gray-100 text-gray-400 cursor-not-allowed"
                  }
                `}
              >
                {slot.label}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
