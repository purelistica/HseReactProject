import React from "react";
import dataService, {SeriesItem} from "./DataService";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import {SeriesItemComponent} from "./SeriesItemComponent";
import Container from "react-bootstrap/Container";
import {Link} from "react-router-dom";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faImdb} from "@fortawesome/free-brands-svg-icons";


interface CartState {

    cartItems: SeriesItem[];

}

export class CartComponent extends React.Component<{}, CartState> {


    constructor(props: Readonly<{}>) {
        super(props);
        this.state = {
            cartItems: []
        };

        dataService.getCart().then(value => {
            this.setState({
                cartItems: value
            });
        })
    }

    render(): React.ReactNode {
        return (
            <div>
                <h2>Bookmarks</h2>
                <Container className='bookmarks'>
                    <Row className="mb-2">
                        {
                            this.state.cartItems.map(item => {
                                return (<Col md="3" xs="12" className="item">
                                        <Card className="seriesCard">
                                            <Card.Body className="card-img-body">
                                                <Link to={`/home/series/${item.id}`}>
                                                    <div className="card-img"
                                                         style={{backgroundImage: 'url(' + item.image + ')'}}></div>
                                                </Link>
                                                <Card.Title className='card-name'>
                                                    <Link to={`/home/series/${item.id}`}>
                                                        {item.name}
                                                    </Link>
                                                </Card.Title>
                                                <Button variant="primary" className='card-btn'>
                                                    <FontAwesomeIcon icon="trash"/>
                                                </Button>
                                            </Card.Body>
                                        </Card>
                                    </Col>
                                )
                            })
                        }
                    </Row>
                </Container>
            </div>
        );
    }
}