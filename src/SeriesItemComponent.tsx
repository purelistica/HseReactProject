import React from "react";
import {SeriesItem} from "./DataService";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faImdb} from '@fortawesome/free-brands-svg-icons';
import {Link} from "react-router-dom";

interface ShopItemComponentProps {

    item: SeriesItem;

}

export class SeriesItemComponent extends React.Component<ShopItemComponentProps, any> {

    render(): React.ReactElement<any, string | React.JSXElementConstructor<any>> | string | number | {} | React.ReactNodeArray | React.ReactPortal | boolean | null | undefined {
        return (
            <Card className="seriesCard">

                <Card.Body className="card-img-body">
                    <Link to={`/home/series/${this.props.item.id}`}>
                        <div className="card-img"
                             style={{backgroundImage: 'url(' + this.props.item.image + ')'}}></div>
                    </Link>
                    <Card.Title className='card-name'>
                        <Link to={`/home/series/${this.props.item.id}`}>{this.props.item.name}
                        </Link>
                    </Card.Title>
                    <Button variant="danger" className='card-btn'>
                        <FontAwesomeIcon icon="heart"/>
                    </Button>
                </Card.Body>
                <span className="itemRate"><FontAwesomeIcon icon={faImdb} size="2x"/> {this.props.item.rating}</span>
            </Card>
        );
    }

}