import axios from "axios";
import { useRef, useState } from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { Container,Form,Button, Modal } from "react-bootstrap";

const Login = () => {
  const email = useRef();
  const password = useRef();
const [modalShown,setModalShown]=useState(false);
const [modalText, setModalText]=useState("");
 const history=useHistory();

  const loginhandler = async (e) => {
    e.preventDefault();


     const loginData = {
    email: email.current.value,
    password: password.current.value,
  };
    try {
      const response = await axios.post(
        "https://api.dynoacademy.com/test-api/v1/login",
        loginData,
        {
          timeout: 10000,
        }
      );
      // console.log(response);
      // alert(response.data.message);
      setTimeout(()=>{history.replace("/");},2000);
        
      
      const getAccessToken= response.data.accessToken;

      localStorage.setItem("accessToken",getAccessToken);  //setting key value pair for localstorage

      if (response.data.status === "success") {
        setModalText("Logged in successfully!");
   setModalShown(true);

      }
    } catch (error) {
      try {
        if (error.response) {
          setModalText(error.response.data.errors[0].message);
          // alert(error.response.data.errors[0].message);
            setModalShown(true);
        } else {
          setModalText("unknown error occurred");
           setModalShown(true);
        }
      } catch (errors) {
        setModalText("unknown error occurred");
             setModalShown(true);
      }
    }
  };

  return (
    <><Container>
      <form onSubmit={loginhandler}>
        {/* Email:
        <br />
        <input type="text" placeholder="enter email"  /> */}
        <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control type="email" placeholder="Enter email" ref={email} autoComplete={false}/>
        {/* <Form.Text className="text-muted">
          We'll never share your email with anyone else.
        </Form.Text> */}
      </Form.Group>
        <br />
        
        {/* Password:
     
        <input type="password" placeholder="enter password"  /> */}
         <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control type="password" ref={password} autoComplete={false}/>
      </Form.Group>
     
        <br />
         <Button variant="dark" type="submit">
        Login
      </Button>
      </form>
      </Container>

      <Modal show={modalShown} onHide={()=>{setModalShown(false)}}>
        <Modal.Header closeButton>
        </Modal.Header>
        <Modal.Body> {modalText}</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={()=>{setModalShown(false)}}>
            Close
          </Button>
         
        </Modal.Footer>
      </Modal>
    </>
  );
};
export default Login;
