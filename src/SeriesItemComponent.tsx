import React from "react";
import dataService, {BookmarkItem, SeriesItem} from "./DataService";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faImdb} from '@fortawesome/free-brands-svg-icons';
import {Link} from "react-router-dom";


interface ShopItemComponentProps {

    item: SeriesItem;

}

export class SeriesItemComponent extends React.Component<ShopItemComponentProps, any> {

        public addBookmark(id: number) {
        dataService.getBookmarks().then(value => {
            console.log('addBookmark');
            console.log(value);
            let currentBookmarks: number[] = value.list;
            console.log(currentBookmarks);
            let newBookmarks: number[] = currentBookmarks;
            newBookmarks.push(id);

            console.log(newBookmarks);

            let new_value: BookmarkItem = value;
            new_value.list = newBookmarks;
            // new_value.id = 0;

            dataService.deleteItem(id);
            dataService.updateBookmarks(new_value);
        });
    }

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
                    <Button variant="danger" className='card-btn' onClick={() => this.addBookmark(this.props.item.id)}>
                        <FontAwesomeIcon icon="heart"/>
                    </Button>
                </Card.Body>
                <span className="itemRate"><FontAwesomeIcon icon={faImdb} size="2x"/> {this.props.item.rating}</span>
            </Card>
        );
    }

}