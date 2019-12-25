import React from "react";
import dataService, {SeriesItem} from "./DataService";
import {RouteComponentProps, withRouter} from "react-router";
import Row from "react-bootstrap/Row";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import Col from "react-bootstrap/Col";


interface SeriesProps extends RouteComponentProps<SeriesMatch> {

}

interface SeriesMatch {
    item: string;
}

interface SeriesComponentState {
    item: SeriesItem[];
}

export class SeriesComponent extends React.Component<SeriesProps, SeriesComponentState> {

    constructor(props: Readonly<SeriesProps>) {
        super(props);
        this.state = {
            item: [],
        };
        this.getItem();
    };

    getItem() {
        console.log("getItem()");
        dataService.getSeries(this.props.match.params.item).then(value => {
            // console.log(value.title);
            this.setState({
                item: value
            });
        })
    }

    componentDidMount(): void {
        console.log("componentDidMount()");
    }

    render(): React.ReactNode {
        console.log('render');
        return (
            <div>
                {
                    this.state.item.map(it => {
                            return (
                                <Card className="seriesInfo">
                                    <Card.Body className="infoBody">
                                        <Row className="mb-2">
                                            <Col md="3" xs="12">
                                                <div className="info-card-img"
                                                     style={{backgroundImage: 'url(' + it.image + ')'}}></div>
                                            </Col>
                                            <Col md="9" xs="12">
                                                <Card.Title className='card-name'>{it.name}</Card.Title>
                                                <div>{it.description}</div>
                                                <Button variant="danger" className='card-btn'>
                                                    <FontAwesomeIcon icon="heart"/>
                                                </Button>
                                            </Col>
                                        </Row>
                                    </Card.Body>
                                </Card>
                            )
                        }
                    )
                }
            </div>
        );
    }
}

export default withRouter(SeriesComponent);