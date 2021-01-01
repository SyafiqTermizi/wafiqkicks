import React from "react";
import { useState, useEffect } from "react";
import {
  IonButton,
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";

import axios from "../axiosConfig";
import { BarChart, Data } from "../components/BarChart";
import "./Tab1.css";

const Tab2: React.FC = () => {
  const isObjectEmpty = (obj: { [key: string]: string }) =>
    Object.keys(obj).length === 0 && obj.constructor === Object;

  const [kickPerHour, setKickPerHour] = useState<Data[]>([]);
  const [totalKicks, setTotalKicks] = useState<number>(0);

  const fetchData = () => {
    axios
      .get("/kicks/daily-chart/")
      .then((res) => {
        if (isObjectEmpty(res.data)) return;
        const mappedResponse = Object.keys(res.data).map((key) => ({
          label: key,
          y: res.data[key],
        }));
        const sum = (previousValue: any, currentValue: any) =>
          previousValue + currentValue;
        const totalKicks = Object.values(res.data).reduce(sum, 0) as number;
        setTotalKicks(totalKicks + 3);
        setKickPerHour(mappedResponse);
      })
      .catch((err) => err);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Hourly Kicks</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Tab 2</IonTitle>
          </IonToolbar>
        </IonHeader>
        {Boolean(kickPerHour.length) && (
          <BarChart data={kickPerHour} maxCount={totalKicks} />
        )}
        <br />
        <div style={{ textAlign: "center" }}>
          <IonButton onClick={() => fetchData()}>Refresh</IonButton>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Tab2;
