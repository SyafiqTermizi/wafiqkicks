import React from "react";
import { useState } from "react";
import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonButton,
} from "@ionic/react";

import axios from "../axiosConfig";
import "./Tab1.css";

const Tab1: React.FC = () => {
  const [disableButton, setDisableButton] = useState(false);

  const submit = () => {
    setDisableButton(true);
    axios.post("/kicks/count-up/").then((res) =>
      setTimeout(() => {
        setDisableButton(false);
      }, 59999)
    );
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Tab 1</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Tab 1</IonTitle>
          </IonToolbar>
        </IonHeader>
        <div className="container">
          <IonButton
            color="primary"
            onClick={() => submit()}
            disabled={disableButton}
          >
            Kick!
          </IonButton>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Tab1;
