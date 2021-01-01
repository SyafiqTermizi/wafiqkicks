import React from "react";
import { useState, useEffect } from "react";
import dayjs from "dayjs";
import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonButton,
  IonText,
} from "@ionic/react";

import axios from "../axiosConfig";
import "./Tab1.css";

const Tab1: React.FC = () => {
  const [disableButton, setDisableButton] = useState(false);
  const [dailySummary, setDailySummary] = useState({
    kicks: 0,
    first: 0,
    last: 0,
  });

  const fetchDailySummary = () => {
    axios
      .get("/kicks/daily-summary/")
      .then((res) => setDailySummary(res.data))
      .catch((err) => err);
  };

  useEffect(() => {
    fetchDailySummary();
  }, []);

  const submit = () => {
    setDisableButton(true);
    axios
      .post("/kicks/count-up/")
      .then((_) => {
        fetchDailySummary();
        setTimeout(() => {
          setDisableButton(false);
        }, 59999);
      })
      .catch((err) => err);
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
          {Boolean(dailySummary.kicks) && (
            <>
              <IonText>
                <p>
                  <strong>Kicks:&nbsp;</strong>
                  {dailySummary.kicks}
                </p>
              </IonText>
              <IonText>
                <p>
                  <strong>First:&nbsp;</strong>
                  {dayjs(dailySummary.first).format("h:mm A")}
                </p>
              </IonText>
              <IonText>
                <p>
                  <strong>Latest:&nbsp;</strong>
                  {dayjs(dailySummary.last).format("h:mm A")}
                </p>
              </IonText>
            </>
          )}
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Tab1;
