
import { Button, Card, Col } from "react-bootstrap";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
const SingleMovie =(props)=>{
    return <>
<Col key={props.data.id}>



<Card style={{ width: '18rem' }}>
      <Card.Img variant="top" src={props.data.image} />
      <Card.Body>
        <Card.Title>{props.data.name}</Card.Title>
        <Card.Text>
        <br />
                    Info:{props.data.info}
                   <br />
                    Rating:{props.data.rating} <br />
        </Card.Text>
        <Button variant="dark">  <Link to={`/view/${props.data.id}`} className="text-white"> View Details</Link></Button>
      </Card.Body>
    </Card>
       {/* <div key={props.data.id}>
                    <Link to={`/view/${props.data.id}`}>
                      {" "}
                    <span style={{ fontWeight: "bold" }}>{props.data.name} </span>
                    </Link>
                     <br />
                     <br />
                    <img
                      src={props.data.image}
                      alt="movieImage"
                      style={{ height: "120px" }}
                     />
                    <br />
                    Info:{props.data.info}
                   <br />
                    Rating:{props.data.rating} <br />
                    <br />
                   </div> */}
                   </Col>
    </>
}
export default SingleMovie;