import { useEffect, useState } from "react";

interface CustomMapProps {
  place_id: string;
}

interface GoogleMapCenter {
  lat: number;
  lng: number;
}

export default function CustomMap(props: CustomMapProps) {
  const API_KEY = process.env.NEXT_PUBLIC_GOOGLEMAP_APIKEY || '';

  const API_GET_URL = `https://www.google.com/maps/embed/v1/place?key=${API_KEY}&q=place_id:${encodeURIComponent(props.place_id)}`;

  return (
    <>
      <iframe
      width={'100%'}
      height={'100%'}
      // frameBorder=""
      style={{ border: 0 }}
      src={API_GET_URL}
      allowFullScreen
    ></iframe>
    </>
  );
}
