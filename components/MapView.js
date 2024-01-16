import { getCenter } from "geolib";
import React, { useState } from "react";
import ReactMapGL, { Marker, Popup } from "react-map-gl";
import { ImLocation2 } from "react-icons/im";

function MapView({ searchResults }) {
  const [selectedLocation, setSelectedLocation] = useState({});

  const coordinates = searchResults?.results.map((item) => ({
    longitude: item.lng,
    latitude: item.lat,
  }));

  // The lat and lng of the geographical center of location of all stays
  const center = getCenter(coordinates);

  const [viewport, setViewport] = useState({
    latitude: center.latitude,
    longitude: center.longitude,
    zoom: 11,
  });

  return (
    <ReactMapGL
      mapStyle="mapbox://styles/kabelog/cloif6fnr003v01pmc0u01ohp"
      mapboxAccessToken={process.env.mapbox_key}
      initialViewState={{ ...viewport }}
      onMouseDown={(nextViewPort) => setViewport(nextViewPort)}
      cursor="grab"
      doubleClickZoom={false}
      attributionControl={false}
      style={{ overflow: "hidden", maxHeight: 11600 }}
    >
      {searchResults?.results.map((item) => (
        <div key={item.lng}>
          <Marker longitude={item.lng} latitude={item.lat}>
            <ImLocation2
              className="h-8 w-8 text-red-500 cursor-pointer 
            animate-bounce"
              onClick={() => setSelectedLocation(item)}
            />
          </Marker>

          {selectedLocation.lng === item.lng ? (
            <Popup
              onClose={() => setSelectedLocation({})}
              closeOnClick={true}
              latitude={item.lat}
              longitude={item.lng}
            >
              {/* remember to style the popup */}
              <div>{item.name}</div>
            </Popup>
          ) : (
            false
          )}
        </div>
      ))}
    </ReactMapGL>
  );
}

export default MapView;
