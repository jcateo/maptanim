import React, { useEffect, useRef } from 'react';
import { MapContainer, TileLayer, FeatureGroup, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet-draw';
import * as turf from '@turf/turf';

// Set up icon for draw markers
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
});

// A component to zoom the map to existing geojson
function ZoomToGeoJSON({ geometry }: { geometry: any }) {
  const map = useMap();

  useEffect(() => {
    if (geometry && geometry.coordinates && geometry.coordinates.length > 0) {
      try {
        const layer = L.geoJSON(geometry);
        const bounds = layer.getBounds();
        if (bounds.isValid()) {
          map.fitBounds(bounds, { padding: [50, 50] });
        }
      } catch (e) {
        console.error("Error zooming to geometry", e);
      }
    }
  }, [map, geometry]);

  return null;
}

interface DrawControlProps {
  readOnly: boolean;
  handleUpdate: () => void;
  featureGroupRef: React.RefObject<L.FeatureGroup | null>;
}

// Custom Draw Control Component
function DrawControl({ readOnly, handleUpdate, featureGroupRef }: DrawControlProps) {
  const map = useMap();
  const drawControlRef = useRef<any>(null);

  useEffect(() => {
    if (!featureGroupRef.current || readOnly) return;

    // Clean up previous control if any
    if (drawControlRef.current) {
      map.removeControl(drawControlRef.current);
    }

    const drawControl = new L.Control.Draw({
      position: 'topright',
      edit: {
        featureGroup: featureGroupRef.current,
        remove: true
      },
      draw: {
        rectangle: false,
        circle: false,
        circlemarker: false,
        marker: false,
        polyline: false,
        polygon: {
          allowIntersection: false,
          showArea: true,
          shapeOptions: {
            color: '#22c55e',
            fillOpacity: 0.2
          }
        }
      }
    });

    map.addControl(drawControl);
    drawControlRef.current = drawControl;

    // Add event listeners
    map.on(L.Draw.Event.CREATED, (e: any) => {
      featureGroupRef.current?.addLayer(e.layer);
      handleUpdate();
    });
    map.on(L.Draw.Event.EDITED, handleUpdate);
    map.on(L.Draw.Event.DELETED, handleUpdate);

    return () => {
      if (drawControlRef.current) {
        map.removeControl(drawControlRef.current);
      }
      map.off(L.Draw.Event.CREATED);
      map.off(L.Draw.Event.EDITED);
      map.off(L.Draw.Event.DELETED);
    };
  }, [map, readOnly, featureGroupRef]);

  return null;
}

interface FarmDrawingMapProps {
  initialGeometry?: GeoJSON.Geometry | null;
  onGeometryChange: (geometry: GeoJSON.Geometry | null, areaHectares: number) => void;
  center?: [number, number];
  readOnly?: boolean;
}

export default function FarmDrawingMap({
  initialGeometry,
  onGeometryChange,
  center = [10.4357, 123.0000],
  readOnly = false
}: FarmDrawingMapProps) {
  const featureGroupRef = useRef<any>(null);

  useEffect(() => {
    setTimeout(() => {
      if (initialGeometry && featureGroupRef.current) {
        const fg = featureGroupRef.current;
        fg.clearLayers();
        try {
          L.geoJSON(initialGeometry, {
            onEachFeature: (_, layer) => {
              fg.addLayer(layer);
            }
          });
        } catch (e) {
          console.error("Error loading initial geometry", e);
        }
      }
    }, 100);
  }, [initialGeometry]);

  const handleUpdate = () => {
    if (!featureGroupRef.current) return;

    const layers = featureGroupRef.current.getLayers();

    if (layers.length === 0) {
      onGeometryChange(null, 0);
      return;
    }

    if (layers.length > 1) {
      for (let i = 0; i < layers.length - 1; i++) {
        featureGroupRef.current.removeLayer(layers[i]);
      }
    }

    const layer = featureGroupRef.current.getLayers()[0];

    if (layer) {
      const geojson = layer.toGeoJSON();
      const areaSqMeters = turf.area(geojson);
      const areaHectares = Number((areaSqMeters / 10000).toFixed(4));

      onGeometryChange(geojson.geometry, areaHectares);
    }
  };

  return (
    <div className="w-full h-full min-h-[400px] z-0 relative rounded-xl overflow-hidden border border-neutral-200">
      <MapContainer
        center={center}
        zoom={13}
        style={{ height: '100%', width: '100%' }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OSM</a>'
          url="https://{s}.google.com/vt/lyrs=s,h&x={x}&y={y}&z={z}"
          maxZoom={20}
          subdomains={['mt0', 'mt1', 'mt2', 'mt3']}
        />

        <FeatureGroup ref={featureGroupRef} />
        <DrawControl readOnly={readOnly} handleUpdate={handleUpdate} featureGroupRef={featureGroupRef} />

        {initialGeometry && <ZoomToGeoJSON geometry={initialGeometry} />}
      </MapContainer>
    </div>
  );
}
