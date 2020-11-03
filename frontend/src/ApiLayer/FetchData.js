import { navigate } from "@reach/router";
import Api from "./Api";

const logout = () => {
  localStorage.clear();
  navigate("/");
};

export default function FetchData({
  setAttendance,
  setFullAttendance,
  setTimetable,
  enqueueSnackbar
}) {
  const uid = localStorage.getItem("uid");
  const pass = localStorage.getItem("password");
  const formdata = new FormData();
  formdata.append("uid", uid);
  formdata.append("password", pass);

  Api.post("/attendance", formdata).then((response) => {
    if (!response.ok) {
      console.log(response.problem);
    } else {
      // response ok
      if (response.data.error) {
        // uims api has responded with an error, set an error state
        enqueueSnackbar(`${response.data.error} Visit UIMS to resolve`, {variant: 'error'})
        console.log(response.data.error);
        logout()
      } else {
        // correct response
        setAttendance(response.data);
        localStorage.setItem("attendance", JSON.stringify(response.data));
        localStorage.setItem("timestamp", Date.now());
      }
    }
  });

  Api.post("/fullattendance", formdata).then((response) => {
    if (!response.ok) {
      console.log(response.problem);
    } else {
      // response ok
      if (response.data.error) {
        // project api has responded with an error, set an error state
        enqueueSnackbar(`${response.data.error} Visit UIMS to resolve`, {variant: 'error'})
        console.log(response.data.error);
        logout()
      } else {
        // correct response
        setFullAttendance(response.data);
        localStorage.setItem("fullattendance", JSON.stringify(response.data));
        localStorage.setItem("timestamp", Date.now());
      }
    }
  });

  Api.post("/timetable", formdata).then((response) => {
    if (!response.ok) {
      console.log(response.problem);
    } else {
      // response ok
      if (response.data.error) {
        // project api has responded with an error, set an error state
        enqueueSnackbar(`${response.data.error} Visit UIMS to resolve`, {variant: 'error'})
        console.log(response.data.error);
        logout()
      } else {
        // correct response
        setTimetable(response.data);
        localStorage.setItem("timetable", JSON.stringify(response.data));
        localStorage.setItem("timestamp", Date.now());
      }
    }
  });
}
