import React from 'react';

import { OverlayView } from '@react-google-maps/api';
import { markerType } from '../pages/map';
type MenuProps = {
  isOpen: boolean;
  marker: markerType | null;
  handleShowJson: () => null;
};

const center = {
  lat: 13.07699,
  lng: 100.793444,
};

function Menu({ isOpen, marker, handleShowJson }: MenuProps) {
  console.log('marker = ', marker);
  return isOpen ? (
    // <OverlayView mapPaneName={OverlayView.FLOAT_PANE} position={undefined}>
    <div
      style={{
        width: '500px',
        height: '500px',
        background: 'white',
        position: 'absolute',
      }}
    >
      <button onClick={handleShowJson}>click</button>
      <h1>Selected : {marker?.id}</h1>
      <h1>Status : {`${!marker?.isError}`}</h1>
    </div>
  ) : (
    // </OverlayView>
    <></>
  );
}

export default Menu;
