import React, {useCallback, useEffect, useState} from 'react';
import {Box} from "@mui/material";
import {Alert, AlertData} from "./components";

const sampleData: AlertData[] = [
  {
    "alert-id": 123,
    "alert-time": "2023-06-13T18:30:00.000Z",
    "alert-text": "Patient is delayed > 30 min",
    "alert-severity": 1,
    "alert-type": "system"
  },
  {
    "alert-id": 456,
    "alert-time": "2023-06-11T18:30:00.000Z",
    "alert-text": "Gap between to images > 15 min",
    "alert-severity": 3,
    "alert-type": "system"
  },
  {
    "alert-id": 789,
    "alert-time": "2023-06-15T18:30:00.000Z",
    "alert-text": "Acquisition XXX is repeated",
    "alert-severity": 2,
    "alert-type": "system"
  }
];

function App() {
  const [loading, setLoading] = useState(false);
  const [alerts, setAlerts] = useState<AlertData[]>([]);

  const loadAlerts = useCallback(() => {
    // fake loading data for 3 seconds
    return new Promise<AlertData[]>((resolve) => {
      setTimeout(() => {
        resolve(sampleData);
      }, 3000);
    });
  }, []);

  useEffect(() => {
    setLoading(true);
    loadAlerts().then((data) => {
      setAlerts(
        data.sort((a, b) => b["alert-time"].localeCompare(a["alert-time"]))
      );
      setLoading(false);
    });
  }, [loadAlerts]);
  
  return (
    <Box p={5}>
      <Alert data={alerts} loading={loading} />
    </Box>
  );
}

export default App;
