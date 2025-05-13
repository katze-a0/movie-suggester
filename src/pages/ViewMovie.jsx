import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import axios from "axios";
import { useEffect, useState } from "react";
import { Card, Container } from "react-bootstrap";

const ViewMovie = () => {
  const getParams = useParams();
  console.log(getParams);
  const getID = getParams.id;
  const [movieData, setmovieData] = useState([]);

  //first time, component is rendered

  useEffect(() => {
    singleMovieData();
  }, []);

  //everytime each component is changed/updated...

  // useEffect(()=>{

  // })

  //each time dependencies are updated or changed
  // useEffect(()=>{

  // },[movieData,logged])

  const singleMovieData = async () => {
    try {
      const response = await axios.get(
        `https://api.dynoacademy.com/test-api/v1/movie/${getID}`
      );
      console.log(response.data);
      console.log("check");
      setmovieData(response.data.singleMovieData);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Container>
        {" "}
        {/* <button onClick={singleMovieData}>View Info</button>
      <br/> */}
        <br />
        <h1>{movieData.name}</h1>
        <br />
        <Card.Body> Movie info:{movieData.info} </Card.Body>
        <br />
        <Card.Body>
          {" "}
          <img
            src={movieData.image}
            alt="movieImage"
            style={{ height: "120px" }}
          />
        </Card.Body>
        <br />
        <Card style={{ width: "18rem" }}>
          <Card.Body>
            <Card.Subtitle className="mb-2 text-muted">
              Description:{" "}
            </Card.Subtitle>
            <Card.Text>{movieData.desc}</Card.Text>
          </Card.Body>
        </Card>
        <br />
        <br />
        <Card.Body> Movie Rating:{movieData.rating}</Card.Body>
        <br />
      </Container>
    </>
  );
};
export default ViewMovie;
