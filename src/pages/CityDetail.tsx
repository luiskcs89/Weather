import React, { useState } from 'react';
import {
  IonBackButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonPage,
  IonToolbar,
  useIonViewWillEnter,
  IonLoading,
  IonTitle
} from '@ionic/react';
import { RouteComponentProps } from 'react-router';
import './CityDetail.css';
import { WeatherResponse, getWeatherById } from '../data/weather';
import WeatherDisplay from '../components/WeatherDisplay';

interface CityDetailProps extends RouteComponentProps<{ id: string; }> { }

const CityDetail: React.FC<CityDetailProps> = ({ match }) => {

  const [weatherResponse, setWeatherResponse] = useState<WeatherResponse>();

  const [showLoading, setShowLoading] = useState(false);

  useIonViewWillEnter(() => {
    setShowLoading(true);
    getWeatherById(parseInt(match.params.id)).then(
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
    <IonPage>
      <IonHeader translucent>
        <IonToolbar>
          <IonButtons>
            <IonBackButton defaultHref="/home"></IonBackButton>
          </IonButtons>
          <IonTitle>
            { weatherResponse ? weatherResponse.name : '' }
          </IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">
              { weatherResponse ? weatherResponse.name : '' }
            </IonTitle>
          </IonToolbar>
        </IonHeader>
        { weatherResponse ? 
        <WeatherDisplay weatherResponse={weatherResponse}></WeatherDisplay>
        : ''}
      </IonContent>

      <IonLoading
        isOpen={showLoading}
        onDidDismiss={() => setShowLoading(false)}
        message={'Please wait...'}
      />
    </IonPage>
  );
};

export default CityDetail;
