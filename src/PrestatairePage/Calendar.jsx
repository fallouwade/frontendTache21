
import React, { useState } from 'react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

const Calendar = ({ onDateSelect }) => { 
  const [selectedDate, setSelectedDate] = useState(null);
  const [currentMonth, setCurrentMonth] = useState(new Date(2025, 0));
  
  const today = new Date();

  const getDaysInMonth = (date) => new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  const getFirstDayOfMonth = (date) => {
    const firstDay = new Date(date.getFullYear(), date.getMonth(), 1).getDay();
    return firstDay === 0 ? 6 : firstDay - 1;
  };

  const handlePrevMonth = () => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1));
  const handleNextMonth = () => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1));

  const handleDateSelect = (day) => {
    const date = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day);
    setSelectedDate(date);
    onDateSelect(date); 
  };

  const monthFormatter = new Intl.DateTimeFormat('fr-FR', { month: 'long', year: 'numeric' });

  const isPastDay = (day) => {
    const date = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day);
    return date < today; // Si la date est dans le passé
  };

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-medium">Disponibilités du plombier</h2>
      
      <div className="flex justify-between items-center my-4">
        <button 
          className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          onClick={handlePrevMonth}
        >
          <FaChevronLeft className="w-4 h-4" />
        </button>
        <span className="font-medium">{monthFormatter.format(currentMonth)}</span>
        <button 
          className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          onClick={handleNextMonth}
        >
          <FaChevronRight className="w-4 h-4" />
        </button>
      </div>

      <div className="border rounded-lg p-4">
        <div className="grid grid-cols-7 gap-2 text-center">
          <div className="text-sm text-gray-500">Lun.</div>
          <div className="text-sm text-gray-500">Mar.</div>
          <div className="text-sm text-gray-500">Mer.</div>
          <div className="text-sm text-gray-500">Jeu.</div>
          <div className="text-sm text-gray-500">Ven.</div>
          <div className="text-sm text-gray-500">Sam.</div>
          <div className="text-sm text-gray-500">Dim.</div>
          
          {[...Array(42)].map((_, index) => {
            const firstDayOfMonth = getFirstDayOfMonth(currentMonth);
            const daysInMonth = getDaysInMonth(currentMonth);
            const day = index - firstDayOfMonth + 1;
            const isValidDay = day > 0 && day <= daysInMonth;
            const isSelected = selectedDate && 
              selectedDate.getDate() === day && 
              selectedDate.getMonth() === currentMonth.getMonth() && 
              selectedDate.getFullYear() === currentMonth.getFullYear();
            const isPast = isValidDay && isPastDay(day); 

            return (
              <div 
                key={index}
                onClick={() => isValidDay && !isPast ? handleDateSelect(day) : null} // Désactiver la sélection des jours passés
                className={`
                  text-center p-2 text-sm
                  ${isValidDay ? 'cursor-pointer hover:border hover:border-blue-600 hover:rounded-full' : 'invisible'}
                  ${isSelected ? 'bg-blue-600 text-white rounded-full hover:bg-blue-700' : ''}
                  ${isPast ? 'text-gray-400 line-through' : ''}
                `}
              >
                {isValidDay ? day : ''}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Calendar;
