import React, { Fragment } from 'react';
import { MarkerF, MarkerClustererF } from '@react-google-maps/api';
import { markerType } from '../pages/map';

type MarkerExampleProps = {
  markers: markerType[];
  onSelectMarker: (e: google.maps.MapMouseEvent, marker: markerType) => void;
};

function MarkerExample({ markers, onSelectMarker }: MarkerExampleProps) {
  return (
    <MarkerClustererF>
      {(clusterer) => {
        return (
          <Fragment>
            {markers.map((marker, index) => {
              return (
                <MarkerF
                  icon={marker.isError ? './alertPin.svg' : './pin.svg'}
                  key={marker.id}
                  position={marker}
                  label={marker.id}
                  clusterer={clusterer}
                  onClick={(e: google.maps.MapMouseEvent) =>
                    onSelectMarker(e, marker)
                  }
                />
              );
            })}
          </Fragment>
        );
      }}
    </MarkerClustererF>
  );
}

export default MarkerExample;
