import React, { useState } from 'react';
import { getCities, City, getWeatherByLocation, WeatherResponse } from '../data/weather';
import {
  IonContent,
  IonHeader,
  IonList,
  IonPage,
  IonTitle,
  IonToolbar,
  useIonViewWillEnter,
  IonButtons,
  IonButton,
  IonIcon,
  IonPopover,
  IonListHeader,
  IonItem,
  IonModal,
  IonLoading
} from '@ionic/react';
import './Home.css';
import { starOutline } from 'ionicons/icons';
import AddCityForm from '../components/AddCityForm';

import { Plugins } from '@capacitor/core';
import WeatherDisplay from '../components/WeatherDisplay';

const { Geolocation } = Plugins;

const Home: React.FC = () => {

  const [cities, setCities] = useState<City[]>([]);

  const [popoverState, setShowPopover] = useState({showPopover: false, event: undefined});

  const [showModal, setShowModal] = useState(false);

  const [weatherResponse, setWeatherResponse] = useState<WeatherResponse>();

  const [showLoading, setShowLoading] = useState(false);

  useIonViewWillEnter(async () => {
    setShowLoading(true);
    const cities = getCities();
    setCities(cities);

    const geoResponse = await Geolocation.getCurrentPosition();

    getWeatherByLocation(geoResponse.coords.latitude, geoResponse.coords.longitude).then(
      (result) => {
        setWeatherResponse(result);
        setShowLoading(false);
      },
      (error) => {
        setShowLoading(false);
      }
    )
  });

  return (
    <IonPage id="home-page">
      <IonHeader>
        <IonToolbar>
          <IonTitle>Current Weather</IonTitle>
          <IonButtons slot="primary">
            <IonButton onClick={(e: any) => {
                e.persist();
                setShowPopover({showPopover: true, event: e})
              }}>
              <IonIcon slot="end" icon={starOutline} />
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>

        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">
            Current Weather
            </IonTitle>
          </IonToolbar>
        </IonHeader>

        { weatherResponse ? 
        <div>
          <p className="current-city">{weatherResponse.name}</p>
          <WeatherDisplay weatherResponse={weatherResponse}></WeatherDisplay>
        </div>
        : ''}

        <IonPopover
          event={popoverState.event}
          isOpen={popoverState.showPopover}
          onDidDismiss={() => setShowPopover({showPopover: false, event: undefined})}
        >
          <IonList>
            <IonListHeader>Favorite Cities</IonListHeader>
            {cities.map((favoriteCity) => 
              <IonItem key={favoriteCity.id} routerLink={`city/${favoriteCity.id}`}>{`${favoriteCity.city}, ${favoriteCity.country}`}</IonItem>
            )}
            <IonItem onClick={() => setShowModal(true)}>+ Add City</IonItem>
            <IonItem button lines="none" detail={false} onClick={() => setShowPopover({showPopover: false, event: undefined})}>Close</IonItem>
          </IonList>
        </IonPopover>

        <IonModal isOpen={showModal}>
          <AddCityForm onClose={() => setShowModal(false)}></AddCityForm>
        </IonModal>

        <IonLoading
          isOpen={showLoading}
          onDidDismiss={() => setShowLoading(false)}
          message={'Please wait...'}
        />

      </IonContent>
    </IonPage>
  );
};

export default Home;
