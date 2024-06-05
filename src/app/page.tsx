"use client"
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin, { Draggable, DropArg } from '@fullcalendar/interaction'
import timeGridPlugin from '@fullcalendar/timegrid'
import { Fragment, useEffect, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { CheckIcon, ExclamationTriangleIcon } from '@heroicons/react/20/solid'
import { EventSourceInput } from '@fullcalendar/core/index.js'
import jaLocale from '@fullcalendar/core/locales/ja';
import Calendar from '../components/Calendar'

interface Event {
  tile: string;
  start: Date | string;
  allday: boolean;
  id: number;
}

export default function Home() {


  return (
    <>
      <nav className="mb-12 bg-pink-200 border-b border-violet-100 p-4">
        <h1 className="text-center font-bold text-2xl text-gray-700">プリキュアイベントカレンダー</h1>
      </nav>
      <main className="flex min-h-screen flex-col items-center justify-between p-10">
        <div className="grid grid-cols-10 w-full">
          <div className="col-span-2">
          </div>
          <div className="col-span-6">
            <Calendar />
          </div>
          <div className="col-span-2">
          <button className="bg-pink-400 hover:bg-pink-500 w-auto text-white rounded-full px-4 py-2 border border-black my-5 mx-10 active:bg-green-400">追加</button>
          </div>
        </div>
      </main>
    </>
  );
}
   