import { Polygon } from '@react-google-maps/api';

const paths = [
  { lat: 14.07699, lng: 100.793444 },
  { lat: 15.07699, lng: 100.793444 },
  { lat: 14.07699, lng: 99.793444 },
];

const options = {
  fillColor: 'lightblue',
  fillOpacity: 1,
  strokeColor: 'red',
  strokeOpacity: 1,
  strokeWeight: 2,
  clickable: false,
  draggable: false,
  editable: false,
  geodesic: false,
  zIndex: 1,
};

const onLoad = (polygon: google.maps.Polygon) => {
  console.log('polygon: ', polygon);
};

export const PolygonExample = () => (
  <Polygon onLoad={onLoad} paths={paths} options={options} />
);
