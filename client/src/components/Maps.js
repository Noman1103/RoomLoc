import React, { useEffect, useState } from "react";
import axios from 'axios';
import { MapContainer, TileLayer, Marker } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { Button, Modal, Box } from '@mui/material';


const MapsButton = (adress) => {
  const Maps = (lat) => {
    const pos1 = lat.lat > 0 ? lat.lat : '';
    const pos2 = lat.long > 0 ? lat.long : '';

    const position = [pos1, pos2];
    const customIcon = L.icon({
        iconUrl: '../img/loc.svg',
        iconSize: [32, 32],
        iconAnchor: [16, 32],
        popupAnchor: [0, -32]
    });
      
    return (
        <MapContainer center={position} zoom={16} style={{ height: "100%", width: "100%" }}>
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"/>
            <Marker position={position} icon={customIcon}></Marker>
        </MapContainer>

    );
  };
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
    geocodeAddress();
  }
  const handleClose = () => setOpen(false);

  const [positions,setPositions] = useState([]);
  const API_KEY = '2858a2295bd6fcb719a5836ec80d363b';
  const lat = positions.length > 0 ? positions[0].latitude : null;
  const long = positions.length > 0 ? positions[0].longitude : null;

  useEffect(() => {
    console.log('Updated positions:', positions);
  }, [positions]);

  const geocodeAddress = () => {
    axios.get(`http://api.positionstack.com/v1/forward`, {
      params: {
        access_key: API_KEY,
        query: adress.adress,
      },
    }).then(res => {
      setPositions(res.data.data);
    });
  }

  return (
    <div>
      <Button className="button-loc" variant="contained" onClick={handleOpen}>
        Ouvrir l'emplacement du logement
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-map-title"
        aria-describedby="modal-map-description"
      >
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '80%',
            height: '80%',
            bgcolor: 'background.paper',
            boxShadow: 24,
          }}
        >
          <div className='loc'>L'adresse du logement : {adress.adress}</div>
          <Maps lat={lat} long={long}/>
        </Box>
      </Modal>
    </div>
  );
}
export default MapsButton;