import React from "react";
import dayjs from "dayjs";
import { useState, useEffect } from "react";
import {
  IonButton,
  IonCol,
  IonContent,
  IonHeader,
  IonItem,
  IonLabel,
  IonPage,
  IonRow,
  IonSelect,
  IonSelectOption,
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
  const [kickDates, setKickDates] = useState<string[]>([]);
  const [selectedDate, setSelectedDate] = useState<string>("");

  const fetchData = () => {
    axios
      .get(`/kicks/daily-chart/?date=${selectedDate}`)
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

  const fetchDates = () => {
    axios
      .get("/kicks/dates/")
      .then((res) => setKickDates(res.data))
      .catch((err) => err);
  };

  useEffect(() => {
    fetchData();
    fetchDates();
  }, [selectedDate]);

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
        <IonRow>
          <IonCol>
            <IonItem>
              <IonLabel>Kick for:</IonLabel>
              <IonSelect
                selectedText=""
                okText="Okay"
                cancelText="Cancel"
                onIonChange={(e) => setSelectedDate(e.detail.value)}
                value={selectedDate}
              >
                {kickDates.map((date) => (
                  <IonSelectOption value={date} key={date}>
                    {dayjs(date).format("ddd D MMM YYYY")}
                  </IonSelectOption>
                ))}
              </IonSelect>
            </IonItem>
          </IonCol>
        </IonRow>
        {Boolean(kickPerHour.length) && (
          <IonRow>
            <BarChart data={kickPerHour} maxCount={totalKicks} />
          </IonRow>
        )}
        <IonRow>
          <IonCol style={{ textAlign: "center" }}>
            <IonButton onClick={() => fetchData()}>Refresh</IonButton>
          </IonCol>
        </IonRow>
      </IonContent>
    </IonPage>
  );
};

export default Tab2;
