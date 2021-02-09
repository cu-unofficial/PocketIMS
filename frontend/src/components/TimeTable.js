import React, { useState } from "react";
import {
  Step,
  Stepper,
  StepLabel,
  Container,
  Card,
  CardHeader,
  Avatar,
  CardContent,
  Chip,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import { deepOrange } from "@material-ui/core/colors";
import TimetableSkeleton from "./TimetableSkeleton.js";

const useColorlibStepIconStyles = makeStyles({
  root: {
    backgroundColor: "#2196f3",
    zIndex: 1,
    color: "#fff",
    width: 40,
    height: 40,
    display: "flex",
    borderRadius: "50%",
    justifyContent: "center",
    alignItems: "center",
    cursor: "pointer",
    transition: ".2s",
  },
  active: {
    transform: "scale(1.5)",
    backgroundColor: "#ff5722",
    boxShadow: "0px 0px 20px #ff5744aa",
    transition: ".2s",
  },
});

const useStyles = makeStyles((theme) => ({
  time_table: {
    position: "relative",
    top: "80px",
    maxWidth: "860px",
    display: "flex",
    flexDirection: "row",
  },

  stepper: {
    display: "flex",
    marginRight: "2%",
    flexDirection: "column",
    alignItems: "center",
    background: "transparent",
    paddingLeft: "0",
  },

  step: {
    width: "40px",
    height: "40px",
  },

  card_wrapper: {
    flex: "1",
  },

  card: {
    marginBottom: "20px",
    boxShadow:
      "0px 6px 6px -3px rgba(0,0,0,0.2), 0px 10px 14px 1px rgba(0,0,0,0.14), 0px 4px 18px 3px rgba(0,0,0,0.12)",
  },
  connector: {
    width: "2px",
    height: "60px",
    backgroundColor: "#ededed",
  },
  orange: {
    color: theme.palette.getContrastText(deepOrange[500]),
    backgroundColor: deepOrange[500],
  },
}));

const Days = {
  1: "Mon",
  2: "Tue",
  3: "Wed",
  4: "Thu",
  5: "Fri",
  6: "Sat",
  7: "Sun",
};

function Icon(props) {
  const classes = useColorlibStepIconStyles();

  return (
    <div
      className={clsx(classes.root, {
        [classes.active]: props.active,
      })}
    >
      {Days[String(props.icon)]}
    </div>
  );
}

function Connector() {
  const classes = useStyles();
  return <div className={classes.connector} />;
}

function getPresentDay() {
  let date = new Date();
  let day = date.getDay();
  return day - 1;
}

function TimeTable(props) {
  const [activeStep, setActiveStep] = useState(getPresentDay());
  const styles = useStyles();
  const handleStep = (step) => () => {
    window.scroll({ top: 0, left: 0, behavior: "smooth" });
    setActiveStep(step - 1);
  };

  function TimeTableCards({ timetable }) {
    var lunchBreak = false;
    const cards = [];
    Object.keys(
      timetable[Days[activeStep + 1]] === undefined
        ? { "#": "#" }
        : timetable[Days[activeStep + 1]]
    ).forEach((key, id, arr) => {
      // Empty key ["#"] (ex: sunday )
      if (arr[0] === "#")
        cards.push(
          <Card id={id} className={styles.card}>
            <CardHeader title="Wohooooo!" subheader="Enjoy today" />
            <CardContent>No classes on this day</CardContent>
          </Card>
        );
      else {
        const sub = timetable[Days[activeStep + 1]][key];
        if (sub !== null) {
          cards.push(
            <Card key={id} className={styles.card}>
              <CardHeader
                title={sub.title}
                subheader={sub.teacher}
                avatar={
                  <Avatar className={styles.orange}>{sub.title[0]}</Avatar>
                }
              />
              <CardContent>
                <Chip label={key} />
                <Chip
                  style={{ marginLeft: "2%" }}
                  variant="outlined"
                  color="primary"
                  size="small"
                  label={sub.type}
                />
              </CardContent>
            </Card>
          );
        } else {
          if (!lunchBreak) {
            lunchBreak = true;
            cards.push(<hr key={key} />);
          }
        }
      }
    });
    return cards;
  }

  return props.timetable ? (
    <Container className={styles.time_table}>
      <Stepper
        orientation="vertical"
        nonLinear
        connector={<Connector />}
        activeStep={activeStep}
        className={styles.stepper}
      >
        {Object.keys(Days).map((elm) => (
          <Step key={elm} className={styles.step}>
            <StepLabel StepIconComponent={Icon} onClick={handleStep(elm)} />
          </Step>
        ))}
      </Stepper>
      <div className={styles.card_wrapper}>
        <TimeTableCards timetable={props.timetable} />
      </div>
    </Container>
  ) : (
    <TimetableSkeleton />
  );
}

export default TimeTable;
