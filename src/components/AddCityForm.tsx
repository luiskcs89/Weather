import React, { useState } from 'react';
import {
  IonItem,
  IonLabel,
  IonContent,
  IonList,
  IonInput,
  IonButton,
  IonAlert,
  IonLoading,
  } from '@ionic/react';
import './AddCityForm.css';
import { getWeatherByCity, addCity } from '../data/weather';

interface AddCityFormProps {
  onClose: () => void;
}

const AddCityForm: React.FC<AddCityFormProps> = ({ onClose }) => {

  const [city, setCity] = useState<string>('');
  const [country, setCountry] = useState<string>('');

  const [showLoading, setShowLoading] = useState(false);
  const [showAlert, setShowAlert] = useState(false);

  const getCityIdAndAdd = () => {
    setShowLoading(true);
    getWeatherByCity(city, country).then(
      (result) => {
        const newCity = {
          city,
          country,
          id: result.id
        };
        addCity(newCity);
        setShowLoading(false);
        onClose();
      },
      (error) => {
        setShowLoading(false);
        setShowAlert(true);
      }
    )
  }

  return (
    <IonContent>
      <IonList lines="full">
        <IonItem>
          <IonLabel position="stacked">City</IonLabel>
          <IonInput required type="text" name="city" value={city} onIonChange={(e: any) => setCity(e.target.value)}></IonInput>
        </IonItem>
        <IonItem>
          <IonLabel position="stacked">Country</IonLabel>
          <IonInput required type="text" name="country" value={country} onIonChange={(e: any) => setCountry(e.target.value)}></IonInput>
        </IonItem>
      </IonList>
      <IonButton expand="block" disabled={!city || !country} onClick={() => getCityIdAndAdd()}>Add as Favorite City</IonButton>
      <IonButton color="secondary" expand="block" size="default" onClick={onClose}>Cancel</IonButton>

      <IonLoading
        isOpen={showLoading}
        onDidDismiss={() => setShowLoading(false)}
        message={'Please wait...'}
      />
      
      <IonAlert
        isOpen={showAlert}
        onDidDismiss={() => setShowAlert(false)}
        header={'Alert'}
        message={'City not found.'}
        buttons={['OK']}
      />

    </IonContent>
  );
};

export default AddCityForm;
