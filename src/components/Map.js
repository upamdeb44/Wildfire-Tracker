import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';


import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

let DefaultIcon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow,
    iconSize: [25, 41],
    iconAnchor: [12, 41]
});
L.Marker.prototype.options.icon = DefaultIcon;

const Map = ({ eventData = [], center = [42.3265, -122.8756], zoom = 6 }) => {

    // Add defensive checks to prevent silent crashes from malformed API data
    const markers = eventData.map(ev => {
        if (ev.categories && ev.categories.length > 0 && ev.categories[0].id === 'wildfires') {
            if (ev.geometry && ev.geometry.length > 0) {

                const latestGeo = ev.geometry[ev.geometry.length - 1];

                if (latestGeo.type === 'Point') {
                    return (
                        <Marker
                            key={ev.id}
                            position={[latestGeo.coordinates[1], latestGeo.coordinates[0]]}
                        >
                            <Popup>
                                <strong>{ev.title}</strong><br />
                                ID: {ev.id}
                            </Popup>
                        </Marker>
                    );
                }
            }
        }
        return null;
    });

    return (
        <MapContainer
            center={center}
            zoom={zoom}
            style={{ height: '100vh', width: '100vw' }}
        >
            <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; OpenStreetMap contributors'
            />
            {markers}
        </MapContainer>
    );
};

export default Map;