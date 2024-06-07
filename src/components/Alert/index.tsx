import { FC } from "react";
import { Accordion, AccordionDetails, AccordionSummary, Box, CircularProgress } from "@mui/material";
import { CircleOutlined, ExpandMore, SvgIconComponent, WarningAmberOutlined } from "@mui/icons-material";

export interface AlertData {
  "alert-id": number;
  "alert-time": string;
  "alert-text": string;
  "alert-severity": number;
  "alert-type": string;
}

export interface AlertProps {
  title?: string;
  data: AlertData[];
  loading?: boolean;
}

const alertIcons: Record<string, SvgIconComponent> = {
  system: CircleOutlined,
};

const alertIconColors: Record<number, 'primary' | 'success' | 'warning' | 'error'> = {
  1: 'primary',
  2: 'success',
  3: 'warning',
  4: 'error',
};

export const Alert: FC<AlertProps> = ({
  title = 'Alerts',
  data,
  loading,
}) => {
  const getAlertIcon = (alert: AlertData) => {
    const Icon = alertIcons[alert["alert-type"]];
    if (!Icon) {
      return null;
    }

    return (
      <Icon color={alertIconColors[alert["alert-severity"]]} sx={{ mr: 1 }}></Icon>
    );
  };

  return (
    <Accordion defaultExpanded>
      <AccordionSummary expandIcon={<ExpandMore />} >
        <WarningAmberOutlined sx={{ color: 'gray', mr: 1, ml: 4 }} /> {title}
      </AccordionSummary>
      <AccordionDetails>
        {loading ? (
          <Box display="flex" justifyContent="center" p={3}>
            <CircularProgress />
          </Box>
        ) : (
          data.map((item) => (
            <Accordion key={item["alert-id"]} sx={{ pl: 4 }} >
              <AccordionSummary expandIcon={<ExpandMore />} sx={{ pl: 5 }}>
                {getAlertIcon(item)}
                {item["alert-text"]}
              </AccordionSummary>
              <AccordionDetails>
                  {item["alert-time"]}
              </AccordionDetails>
            </Accordion>
          ))
        )}
      </AccordionDetails>
    </Accordion>
  );
};
