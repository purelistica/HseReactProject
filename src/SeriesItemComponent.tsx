import React from "react";
import {SeriesItem} from "./DataService";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faImdb} from '@fortawesome/free-brands-svg-icons';

interface ShopItemComponentProps {

    item: SeriesItem;

}

export class SeriesItemComponent extends React.Component<ShopItemComponentProps, any> {

    render(): React.ReactElement<any, string | React.JSXElementConstructor<any>> | string | number | {} | React.ReactNodeArray | React.ReactPortal | boolean | null | undefined {
        return (
            <Card className="seriesCard">
                <Card.Body className="card-img-body">
                    <div className="card-img"
                     style={{backgroundImage: 'url(' + this.props.item.image + ')'}}></div>

                    <Card.Title className='card-name'>{this.props.item.title}</Card.Title>
                    <Button variant="danger" className='card-btn'>
                        <FontAwesomeIcon icon="heart"/>
                    </Button>

                </Card.Body>
                <span className="itemRate"><FontAwesomeIcon icon={faImdb} size="2x"/> {this.props.item.rate}</span>
            </Card>
        );
    }

}