import React, { useContext, useEffect, useState } from 'react'
import ReactMapGL, { GeolocateControl, Marker, NavigationControl, Popup } from 'react-map-gl'
import { path } from '../../../utils/constant'
import 'mapbox-gl/dist/mapbox-gl.css';
import Axios from 'axios';
import Button from 'react-bootstrap/Button';

import { StepperContext } from '../FormThongTin/FormThongTin'


function DaiLyXe({ handleClick }) {
  const [toado, setToaDo] = useState(null)
  const [daily, setDaiLy] = useState([])
  const [callback, setCallback] = useState(false)
  const [currentPlaceId, setCurrentPlaceId] = useState(null);
  const [clickDaiLy, setClickDaiLy] = useState([])

  const state = useContext(StepperContext)
  const [dailyData, setDaiLyData] = state.dailyContent.dailyData

  const [viewport, setViewport] = useState({
    width: "100%",
    height: "420px",
    latitude: 11.134113,
    longitude: 106.554409,
    zoom: 8
  })

  useEffect(() => {
    get()
  }, [callback])


  const get = async () => {
    const res = await Axios.get('/api/daily')
    setDaiLy(res.data)
  }

  const handleMarkerClick = (id, lat, long, dl) => {
    setCurrentPlaceId(id)
    setViewport({ ...viewport, latitude: lat, longitude: long })
    setClickDaiLy(dl)
  }

  const handleMarkerClickUser = (id) => {
    setCurrentPlaceId(id)
  }

  // latitude: 10.9784309
  // longitude: 106.675044

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(({ coords: { latitude, longitude } }) => {
      setToaDo({ lat: latitude, lng: longitude })
    })
  }, [])

  // const handleClick = (giatri) => {
  //   setDaiLyData(giatri)
  // }

  // console.log(dailyData)

  const handleCickClose = () => {
    setClickDaiLy([])
  }

  return (
    <>
      <div className='Form-DaiLyXe'>
        <div className='Form-DaiLyXe-Header pb-3'>
          <h4>Chọn đại lý xe</h4>
        </div>
        <div className='Form-DaiLyXe-body overflow-auto'>
          <ReactMapGL
            style={{ width: "100%", height: "400px" }}
            mapStyle="mapbox://styles/minhnguyen7/clece19sp001501qnjewr6dee"
            mapboxAccessToken={path.TOKENMAP}
            initialViewState={{
              ...viewport
            }}
            onViewportChange={(viewport) => setViewport(viewport)}
          >
            {
              daily.map(dl => (
                <>
                  <Marker
                    key={dl._id}
                    latitude={dl.Latitude}
                    longitude={dl.Longitude}
                    offsetLeft={-20}
                    offsetTop={-30}
                    style={{ cursor: "pointer", }}
                    // onClick={(e) => setToaDo(e)}
                    onClick={() => handleMarkerClick(dl._id, dl.Latitude, dl.Longitude, dl)}
                  >
                    <i className="fa-solid fa-location-dot text-danger" style={{ width: 30, height: 35.35, fontSize: 35 }}></i>
                  </Marker>

                  {
                    dl._id === currentPlaceId && (
                      <Popup
                        latitude={dl.Latitude}
                        longitude={dl.Longitude}
                        closeButton={true}
                        closeOnClick={false}
                        anchor="bottom"
                        style={{ cursor: "pointer", }}
                        onClose={() => setCurrentPlaceId(null)}
                      >
                        <div className='card-address'>
                          <p className='m-0'>{dl.Name}</p>
                        </div>

                      </Popup>
                    )
                  }
                </>
              ))
            }

            {
              toado
                ?
                <>
                  <>
                    <Marker
                      latitude={toado.lat}
                      longitude={toado.lng}
                      offsetLeft={-20}
                      offsetTop={-30}
                      style={{ cursor: "pointer", }}
                      // onClick={(e) => setToaDo(e)}
                      onClick={() => handleMarkerClickUser(toado._id)}
                    >
                      <i className="fa-solid fa-location-dot text-success" style={{ width: 30, height: 35.35, fontSize: 35 }}></i>
                    </Marker>

                    {
                      toado._id === currentPlaceId && (
                        <Popup
                          key={toado._id}
                          latitude={toado.lat}
                          longitude={toado.lng}
                          closeButton={true}
                          closeOnClick={false}
                          anchor="bottom"
                          style={{ cursor: "pointer", }}
                          onClose={() => setCurrentPlaceId(null)}
                        >
                          <div className='card-address'>
                            <p className='m-0'>Vị trí của bạn</p>
                          </div>

                        </Popup>
                      )
                    }
                  </>
                </>
                :
                null
            }

            <NavigationControl position="bottom-right" />
            <GeolocateControl
              position="top-left"
              trackUserLocation
            />
          </ReactMapGL>
        </div>
        {
          clickDaiLy.length != 0
            ?
            <>
              <div className=''>
                <div className='form-thongtin-daily pt-2' style={{ height: "250px" }}>
                  <div className='form-thongtin-daily-body p-3'>
                    <span className='close-icon' onClick={handleCickClose}><i className="fa-solid fa-xmark d-flex justify-content-end"></i></span>
                    <div className='form-thongtin-daily-body-title pb-2 d-flex align-items-center'>
                      <span className='text-primary' style={{ width: "11.666667%" }}> Tên đại lý:</span>
                      <span>{clickDaiLy.Name}</span>
                    </div>
                    <div className='pb-2 d-flex align-items-center'>
                      <span className='' style={{ width: "11.666667%" }}>
                        <i className="fa-solid fa-location-dot text-primary pr-2"></i><span className='text-primary'>Địa chỉ:</span>
                      </span>
                      <span>{clickDaiLy.Address}</span>
                    </div>
                    <div className='pb-2 d-flex align-items-center'>
                      <span className='' style={{ width: "11.666667%" }}><i className="fa-solid fa-phone-volume text-primary pr-2"></i><span className='text-primary'>Phone:</span></span>
                      <span>{clickDaiLy.Phone}</span>
                    </div>
                    <div className='pb-2 d-flex align-items-center'>
                      <span className='' style={{ width: "11.666667%" }}>
                        <i className="fa-solid fa-envelope text-success pr-2"></i><span className='text-success'>Email:</span>
                      </span>
                      <span>{clickDaiLy.Email}</span>
                    </div>
                    <div className='form-thongtin-daily-body-controll pt-4 d-flex justify-content-center'>
                      <Button onClick={() => handleClick(clickDaiLy, "next")} className='bg-danger' style={{ width: "130px" }}>Chọn đại lý</Button>
                    </div>
                  </div>
                </div>
              </div>
            </>
            :
            null
        }
      </div>
    </>
  )
}

export default DaiLyXe