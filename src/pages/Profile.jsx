import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import axios from "axios";
import { useEffect, useState } from "react";
import MovieNavbar from "../Components/MovieNavbar";
import { Container } from "react-bootstrap";

const Profile = () => {
  const [userData, setUserData] = useState("");
  const history = useHistory();

  useEffect(() => {
    getProfile();
  }, []);

  const getProfile = async () => {
    try {
      const response = await axios.get(
        "https://api.dynoacademy.com/test-api/v1/me",

        {
          timeout: 10000,
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      );
      console.log("profile check", response.data.data);
      setUserData(response.data.data);

    } catch (error) {
      console.log("This is error", error);
      if (error.response) {
        alert(error.response.data.errors[0].message);
      } else {
        alert("Unknown error occurred...");
      }
    }
  };

  const onLogout = () => {
    localStorage.removeItem("accessToken");
    history.push("/");
  };

  return (
    <>
    <MovieNavbar/>
    <br/>
    <Container>
      Name:{userData.name}<br/><br/>
      Email:{userData.email}<br/><br/>
      Location:{userData.country}<br/><br/><br/>
      <button onClick={onLogout}>Logout </button>
      </Container>
    </>
  );
};
export default Profile;
