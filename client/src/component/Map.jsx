import React, { useEffect, useRef, useState } from 'react';
import Map, { Marker } from 'react-map-gl';
import mapboxgl from 'mapbox-gl';

// eslint-disable-next-line import/no-webpack-loader-syntax
mapboxgl.workerClass = require("worker-loader!mapbox-gl/dist/mapbox-gl-csp-worker").default;

export const MapComponent = ({ lat, lon }) => {
  const [viewPort, setViewPort] = useState({
    latitude: lat,
    longitude: lon,
    zoom: 11,
    pitch: 50,
  });

  return (
    <>
      {lat && (
        <Map
          mapStyle="mapbox://styles/astrokachi/cl8j0vjpr001114pe619fq3rz"
          mapboxAccessToken="pk.eyJ1IjoiYXN0cm9rYWNoaSIsImEiOiJjbDhpMDl4dzUwZWkwM3BueXBpYTVtdTk2In0.vk9lejdIxnjrDKSqjRAFiA"
          {...viewPort}
          // onMove={(e) => setViewPort(e.viewState)}
        >
          {/* <Marker latitude={+coords.latitude} longitude={+coords.longitude}></Marker> */}
        </Map>
      )}
    </>
  );
};
