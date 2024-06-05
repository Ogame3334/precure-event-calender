// components/Calendar.tsx
import React from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import timeGridPlugin from '@fullcalendar/timegrid';
import jaLocale from '@fullcalendar/core/locales/ja';

const Calendar: React.FC = () => {
  return (
    <FullCalendar
      plugins={[
        dayGridPlugin,
        interactionPlugin,
        timeGridPlugin
      ]}
      headerToolbar={{
        left: 'prev next today',
        center: 'title',
        right: 'dayGridMonth timeGridWeek'
      }}
      initialView="dayGridMonth"
      locales={[jaLocale]}
      locale="ja"
      dayCellContent={(args) => {
        return args.dayNumberText.replace('日', '');
      }}
      events={[
        { title: 'イベント 1', start: '2024-06-01', end: '2024-06-05' }
      ]}
    />
  );
};

export default Calendar;
