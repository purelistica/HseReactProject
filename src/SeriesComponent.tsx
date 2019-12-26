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
            this.setState({
                item: value
            });
        })
    }

    componentDidMount(): void {
    }

    yearsTransform(years: String[]): string {
        let templ = "";
        if (years[1]) {
            templ = `${years[0]} - ${years[1]}`;
        } else {
            templ = `${years[0]} - now`;
        }
        return (templ)
    }

    render(): React.ReactNode {
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
                                                <Button variant="danger" className='info-like-btn'>
                                                    <FontAwesomeIcon icon="heart"/>
                                                </Button>
                                            </Col>
                                            <Col md="9" xs="12">
                                                <Card.Title className='info-name'>{it.name}</Card.Title>
                                                <div className="info-item"><span>Years: </span>{this.yearsTransform(it.years)}</div>
                                                <div className="info-item"><span>Rate: </span>{it.rating}</div>
                                                <div className="info-item"><span>Genre: </span>{it.genre}</div>
                                                <div className="info-item"><span>Description: </span>{it.description}</div>
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