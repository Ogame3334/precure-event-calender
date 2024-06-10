import { GoogleMap, LoadScript } from "@react-google-maps/api";

interface CustomMapProps {
  place_name: string;
}

export default function CustomMap(props: CustomMapProps) {
  // const searchPlace = async () => {
  //   try {
  //     const response = await fetch(`https://maps.googleapis.com/maps/api/place/textsearch/json?query=${props.place_name}&key=${process.env.GOOGLEMAP_APIKEY}`);
  //     const data = await response.json();
      
  //   }
  // }

  const API_KEY = process.env.NEXT_PUBLIC_GOOGLEMAP_APIKEY || '';
  
  return (
    <>
      <LoadScript googleMapsApiKey={API_KEY}>
        <GoogleMap
          mapContainerStyle={{width: '100%', height: '100%'}}
          center={{lat: 34.72, lng: 135.49}}
          zoom={13} 
          
          />
      </LoadScript>
    </>
  );
}
