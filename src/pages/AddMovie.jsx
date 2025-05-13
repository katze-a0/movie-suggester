import { Link, useHistory } from "react-router-dom/cjs/react-router-dom.min";
import axios from "axios";
import { useRef } from "react";
import MovieNavbar from "../Components/MovieNavbar";
import { Form,Button } from "react-bootstrap";
import FloatingLabel from 'react-bootstrap/FloatingLabel';

const AddMovie = () => {
  const movie_name_reference = useRef();
  const rating_reference = useRef();
  const desc_reference = useRef();
  const history = useHistory();

  const addMovieHandler = async (e) => {
    e.preventDefault();

    const movieData = {
      movie_name: movie_name_reference.current.value,
      rating: rating_reference.current.value,
      description: desc_reference.current.value,
    };

    try {
      const response = await axios.post(
        "https://api.dynoacademy.com/test-api/v1/movies",
        movieData,
        {
          timeout: 10000,
        }
      );
      console.log("lets see the response");
      console.log(response);
      console.log(response.data);

      alert(response.data.message);
      history.replace("/");
    } 
    catch (error) {
      console.log("Helllloo", error);
      if (error.response) {
        alert(error.response.data.errors[0].message);
      } else {
        alert("Unknown error occurred...");
      }
    }
  };

  return (
    <>
     <MovieNavbar/>
      <br />
      <br />
      <form onSubmit={addMovieHandler}>
        {/* Movie name:
        <br />
        <input
          type="text"
          placeholder="movie name"
        
        />
        <br /> */}
             <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Movie name</Form.Label>
        <Form.Control type="text" placeholder="Enter movie name"   ref={movie_name_reference} autoComplete={false}/>
      
      </Form.Group>
        <br />
        {/* Rating: <br />
        <input type="text" placeholder="rating" ref={rating_reference} />
        <br /> */}
            <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Rating</Form.Label>
        <Form.Control type="text"    ref={rating_reference} autoComplete={false}/>
      </Form.Group>
        <br />
        {/* Description: <br />
        <textarea ref={desc_reference}> </textarea>
        <br /> */}
              {/* <FloatingLabel
        controlId="floatingTextarea"
        label="Comments"
        className="mb-3"
      >
        <Form.Control as="textarea" placeholder="Description of movie here" />
      </FloatingLabel> */}
      <FloatingLabel controlId="floatingTextarea2" label="Description of movie here">
        <Form.Control
          as="textarea"
          placeholder="Leave a comment here"
          style={{ height: '100px' }}
        />
      </FloatingLabel>
        <br />
         <Button variant="dark" type="submit">
        Login
      </Button>
      </form>
    </>
  );
};

export default AddMovie;
