import React, { Fragment, useEffect } from 'react';
import {
  GoogleMap,
  useJsApiLoader,
  Marker,
  MarkerF,
  MarkerClustererF,
} from '@react-google-maps/api';
import MarkerExample from '../components/MarkerExample';
import { PolygonExample } from '../components/PolygonExamply';
import Menu from '../components/Menu';
import mockJson from '../mock/district.json';
import pin from '../public/alert.png';
import { isConstructorDeclaration } from 'typescript';
const containerStyle = {
  width: '100vw',
  height: '100vh',
};

const markers: markerType[] = [
  {
    title: 'cu',
    id: '001',
    lat: 13.07699,
    lng: 100.793444,
    isError: false,
  },
  {
    title: 'cu',
    id: '002',
    lat: 12.07699,
    lng: 100.793444,
    isError: false,
  },
  {
    title: 'cu',
    id: '003',
    lat: 13.07699,
    lng: 102.793444,
    isError: true,
  },
];
export type markerType = {
  title: string;
  id: string;
  lat: number;
  lng: number;
  isError: boolean;
};

const center = {
  lng: 100.51649349210246,
  lat: 13.800334643279882,
};

// const center = { lat: -28, lng: 137 };

function MyComponent() {
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: '-nRkz8sqKpXws',
  });

  const [map, setMap] = React.useState<null | google.maps.Map>(null);
  const [load, setLoad] = React.useState(false);
  const [data, setData] = React.useState<google.maps.Data.Feature[][]>([]);

  const [selected, setSelected] = React.useState<markerType | null>(null);

  const onLoad = React.useCallback(function callback(map: google.maps.Map) {
    // This is just an example of getting and using the map instance!!! don't just blindly copy!
    console.log('mappp');

    setMap(map);
  }, []);

  useEffect(() => {
    console.log('effect!!');
    if (window.google?.maps) {
      const bounds = new window.google.maps.LatLngBounds(center);

      // map?.data.loadGeoJson(
      //   'https://data.go.th/dataset/663ed528-97d7-4dd2-a463-be865e6fda28/resource/4e1ef8b7-db98-4e16-b6a8-b4cf0f2ca471/download/district.json'
      // );

      map?.fitBounds(bounds);
      var zoom = map?.getZoom();
      map?.setZoom(zoom > 6 ? 6 : zoom);
    }
  }, [map]);

  const onUnmount = React.useCallback(function callback(map: google.maps.Map) {
    setMap(null);
  }, []);

  const onSelectMarker = (e: google.maps.MapMouseEvent, marker: markerType) => {
    if (selected === marker) {
      setSelected(null);
    } else {
      setSelected(marker);
    }
    // setSelected(marker);
  };

  function processPoints(geometry, callback, thisArg) {
    if (geometry instanceof google.maps.LatLng) {
      callback.call(thisArg, geometry);
    } else if (geometry instanceof google.maps.Data.Point) {
      callback.call(thisArg, geometry.get());
    } else {
      geometry.getArray().forEach(function (g) {
        processPoints(g, callback, thisArg);
      });
    }
  }

  const handleShowJson = () => {
    if (window.google?.maps && map) {
      console.log('data = ', data);
      if (load) {
        const deleteTarget = data[0];
        if (deleteTarget) {
          deleteTarget.map((point) => {
            map?.data.remove(point);
          });
        }

        setData([]);
      } else {
        console.log('add mock : ', mockJson);
        const features = map?.data.addGeoJson(mockJson);

        // set global styles
        map?.data.setStyle({
          fillColor: '#FFFFFF',
          strokeColor: '#707070',
        });

        map.data.setStyle(function (feature: google.maps.Data.Feature) {
          // console.log('feature = ', feature);

          var bounds = new google.maps.LatLngBounds();
          const ObjectId = feature.getProperty('OBJECTID');
          if (ObjectId === '12' || ObjectId === '21') {
            const center = feature.getProperty('center');
            const bottomcenter = {
              lat: center.lat - 0.002,
              lng: center.lng,
            };
            const name = feature.getProperty('dname_e');
            console.log('nam,e = ', name);
            console.log('feature = ', center);

            // feature.getGeometry()?.forEachLatLng((latlng) => {
            //   // console.log('latlng = ', {
            //   //   lat: latlng.lat(),
            //   //   lng: latlng.lng(),
            //   // });
            //   bounds.extend(latlng);
            // });
            // var centre = bounds.getCenter();
            // console.log('centre = ', [centre.lat(), centre.lng()]);
            if (center) {
              var marker = new google.maps.Marker({
                position: center,
                map: map,
                icon: './alert.png',
              });

              var marker = new google.maps.Marker({
                position: bottomcenter,
                icon: {
                  path: google.maps.SymbolPath.CIRCLE,
                  scale: 0,
                },
                map: map,
                label: {
                  text: name,
                  color: 'white',
                  fontSize: '16px',
                  fontWeight: 'bold',
                },
              });
            }

            return {
              fillColor: '#FF0000',
              fillOpacity: 0.7,
              strokeWeight: 1,
            };
          }

          return {
            fillColor: '#FFFFFF',
            strokeWeight: 1,
          };
        });

        map.data.addListener('click', function (event) {
          console.log('click name : ', event.feature.j.dname_e);
          map.data.overrideStyle(event.feature, { fillColor: '#8F8F8F' });
        });
        if (features) {
          setData((p) => [...p, features]);
        }
      }
      setLoad((p) => !p);
    }
  };

  return isLoaded ? (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={center}
      zoom={5}
      onLoad={onLoad}
      onUnmount={onUnmount}
    >
      <>
        <MarkerExample markers={markers} onSelectMarker={onSelectMarker} />
        {/* <PolygonExample /> */}
        <Menu isOpen={true} marker={selected} handleShowJson={handleShowJson} />
      </>
    </GoogleMap>
  ) : (
    <></>
  );
}

export default React.memo(MyComponent);
