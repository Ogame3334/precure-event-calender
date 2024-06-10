import { useEffect, useState } from 'react';

const MapPage = () => {
  const [map, setMap] = useState<google.maps.Map | null>(null);

  useEffect(() => {
    // Google Maps APIを読み込むスクリプトを動的に追加
    const script = document.createElement('script');
    script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyCeSrlM1RElqPmiCwZfz5AChcqIeXLYiIA&libraries=places`;
    script.async = true;
    script.onload = initMap;
    document.body.appendChild(script);

    // Google Maps APIを使用するためのinitMap関数
    function initMap() {
      const map = document.getElementById("map");
      if(!map) return;
      const mapInstance = new google.maps.Map(map, {
        center: { lat: -34.397, lng: 150.644 },
        zoom: 8,
      });
      setMap(mapInstance);
    }

    return () => {
      // コンポーネントがアンマウントされるときにスクリプトを削除
      document.body.removeChild(script);
    };
  }, []);

  useEffect(() => {
    // マーカーを追加する関数
    const addMarker = (place: google.maps.places.PlaceResult) => {
      if (place.geometry && place.geometry.location && map)  {
        new google.maps.Marker({
          position: place.geometry.location,
          map: map,
          title: place.name
        });
      }
    };

    // Google Places APIで場所を検索する関数
    const searchPlaces = async () => {
      try {
        const response = await fetch(`https://maps.googleapis.com/maps/api/place/textsearch/json?query=山口市民会館&key=AIzaSyCeSrlM1RElqPmiCwZfz5AChcqIeXLYiIA`);
        const data = await response.json();
        if (data.results) {
          data.results.forEach((place: google.maps.places.PlaceResult) => {
            addMarker(place);
          });
        }
      } catch (error) {
        console.error('There was a problem with your fetch operation:', error);
      }
    };

    if (map) {
      searchPlaces();
    }
  }, [map]);

  return <div id="map" style={{ width: '100%', height: '400px' }}></div>;
};

export default MapPage;
