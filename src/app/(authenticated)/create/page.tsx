"use client"

import RoundedButton from "@/src/components/RoundedButton";
import ToggleButton from "@/src/components/ToggleButton";
import { useState } from "react";
import styles from "./style.module.css"

export default function Home() {
  const [title, setTitle] = useState("");
  const [isAllDay, setIsAllDay] = useState(false);
  const [startDateString, setStartDateString] = useState(new Date().toLocaleString('sv-SE'));
  const [endDate, setEndDate] = useState("");
  const [startTime, setStartTime] = useState("08:00");
  const [endTime, setEndTime] = useState("09:00");
  const [place, setPlace] = useState("");
  const [url, setUrl] = useState("");

  return (
    <>
      <main>
        <div className={styles.create_panel + " m-2 grid grid-cols-6 grid-rows-6 items-center md:m-10 p-3 md:p-10 md:rounded-xl outline outline-1"}>
          <div className="p-1">タイトル</div>
          <div className="col-span-5 p-1">
            <input
              id="title"
              type="text"
              value={title}
              onChange={e => setTitle(e.target.value)}
              className="w-full"
              placeholder="タイトル"
            />
          </div>

          <div className="p-1">終日</div>
          <div className="col-span-4 p-1" />
          <ToggleButton
            id='allday'
            color='pink'
            className='col-span-1'
            onChange={(cond: boolean) => { setIsAllDay(cond); }} />
          
          <div className="p-1">　開始</div>
          <div className='col-span-3 p-1'>
            <input name="startdate" type='date' value={startDateString}
                onChange={(e) => { 
                  console.log(e.target.value);
                  setStartDateString(e.target.value);
                }} 
                className="w-full"
              />
          </div>
          <div className="col-span-2 p-1">
            {!isAllDay ? 
              <input
                  name="starttime"
                  type='time'
                  value={startTime}
                  onChange={(e) => { setStartTime(e.target.value); }}
                />
            : <div/>}
          </div>
          
          <div className="p-1">　終了</div>
          <div className='col-span-3 p-1'>
            <input name="startdate" type='date' value={startDateString}
                onChange={(e) => { 
                  console.log(e.target.value);
                  setStartDateString(e.target.value);
                }} 
                className="w-full"
              />
          </div>
          <div className="col-span-2 p-1">
            {!isAllDay ? 
              <input
                  name="endtime"
                  type='time'
                  value={endTime}
                  onChange={(e) => { setEndTime(e.target.value); }}
                />
            : <div/>}
          </div>
          
          <div className="p-1">場所</div>
          <div className="col-span-5"/>

          <div  className="p-1">URL</div>
          <div className="col-span-5 p-1">
            <input
              id="title"
              type="text"
              value={url}
              placeholder="https://example.com"
              onChange={e => setUrl(e.target.value)}
              className="w-full"
            />
          </div>
      </div>
      <div className="w-full">
        <div className="mx-auto w-96">
          <RoundedButton 
            onClick={async () => {}}
            >
            予定追加
          </RoundedButton>
        </div>
      </div>
    </main >
    </>
  );
}
