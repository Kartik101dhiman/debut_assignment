import React from "react";
import MUIBox from "../Component/MUIcomponent/MUIBox";
import { Grid } from "@mui/material";
import MUITypography from "../Component/MUIcomponent/MUITypography";
import { useTranslation } from "react-i18next";

const Dashboard = () => {
  const { t } = useTranslation();

  const cards = [
    { id: "Posts", value: "100" },
    { id: "Comments", value: "300" },
    { id: "Albums", value: "200" },
  ];

  return (
    <MUIBox className="Dashboardcontainer">
      <Grid container>
        {cards.map((card) => (
          <Grid item md={6}>
            <MUIBox className="cards" key={card.id}>
              <MUITypography variant="h4">{t(card.id)}</MUITypography>
              <MUITypography variant="h5">{card.value}</MUITypography>
            </MUIBox>
          </Grid>
        ))}
      </Grid>
    </MUIBox>
  );
};

export default Dashboard;
