import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import MovieNavbar from "../Components/MovieNavbar";
import SingleMovie from "../Components/SingleMovie";
import { Form, Row,Spinner } from "react-bootstrap";

const Index = () => {
  const [movies, setMovies] = useState([]);
  const [isError, setisError] = useState(false);
  const [searchErrorText, setSearchErrorText] = useState(false);
  const [errorText, seterrorText] = useState("");
  const [searchmovie, setSearchmovie] = useState("");
  const [loading, setLoading] = useState(false);
  const [firstRun, setFirstRun] = useState(true);

  useEffect(() => {
    fetchMovies();
  }, []);

  useEffect(() => {
    if (!firstRun) {
      const fetchTimer = setTimeout(() => {
        if (searchmovie && searchmovie.length > 2) {
          fetchMovies();
          setSearchErrorText("");
        } else if (searchmovie.length < 1) {
          fetchMovies();
          setSearchErrorText("");
        } else {
          setSearchErrorText(
            "Please enter atleast 3 characters for searching.."
          );
        }
      }, 2000);

      //cleanup function
      return () => {
        clearTimeout(fetchTimer);
      };
    }
  }, [searchmovie]);

  const fetchMovies = async () => {
    setLoading(true);
    setisError(false);
    console.log("Calling API..");
    axios
      .get(
        `https://api.dynoacademy.com/test-api/v1/movies?search=${searchmovie}`
      )
      .then((response) => {
        setMovies(response.data.moviesData);
        console.log(movies);
        setisError(false);
        setLoading(false);
        setFirstRun(false);
      })
      .catch((error) => {
        setisError(true);
        seterrorText("cannot get movie");
        console.error("Error fetching movies:", error);
        setLoading(false);
        setFirstRun(false);
      });
  };

  return (
    <div className="App">
      <MovieNavbar/>
     
       
     
    
      <div>
        {/* <input
          type="text"
          value={searchmovie}
          placeholder="search movie title here"
          onChange={(e) => setSearchmovie(e.target.value)}
        /> */}
         <Form.Group className="mb-3 mt-4" controlId="formBasicEmail">
       
        <Form.Control type="email" placeholder="Search movies here" onChange={(e) => setSearchmovie(e.target.value)}  value={searchmovie} autoComplete={false}/>
       
      </Form.Group>
        <span style={{ color: "red" }}>{searchErrorText}</span>
      </div>
      {/* <button onClick={fetchMovies}>Get movies</button>
        <br/><br/> */}
      Suggested Movies <br />
      <br />
      {isError ? (
        <>
          <div
            style={{
              background: "red",
              color: "#fff",
              padding: "10px",
              margin: "10px",
            }}
          >
            {" "}
            {errorText}{" "}
          </div>
        </>
      ) : (
        <>
          <div className="abc">
            {" "}
            <div>{loading ? <>  <Spinner animation="border" role="status">
      <span className="visually-hidden">Loading...</span>
    </Spinner></> : <> </>}</div>
            {!loading && movies.length < 1 ? (
              <> No movies Found</>
            ) : (
              <>
              <Row>
                {movies.map((el) => (

             <SingleMovie data={el}/> ))} {" "} 
             </Row> </>
            )}
          </div>
        </>
      )}
    </div>
  );
};
export default Index;
