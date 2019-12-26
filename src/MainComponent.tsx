import * as React from "react";
import {ReactNode} from "react";
import dataService, {SeriesItem} from "./DataService";
import "./home.scss";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import {SeriesItemComponent} from "./SeriesItemComponent";
import FormControl from "react-bootstrap/FormControl";
import InputGroup from "react-bootstrap/InputGroup";
import {Dropdown, DropdownButton} from "react-bootstrap";


interface MainComponentState {

    items: SeriesItem[];
    searchBarValue: string;

}

export class Main extends React.Component<{}, MainComponentState> {


    constructor(props: Readonly<{}>) {
        super(props);
        this.state = {
            items: [],
            searchBarValue: ""
        };


        dataService.getSeriesItems().then(value => {
            this.setState({
                ...this.state,
                items: value
            });
        });

    }


    private arraySplit<T>(array: T[], splitSize: number = 4): T[][] {
        let items: T[][] = [];

        let currentItems: T[] = [];
        items.push(currentItems);

        for (let i = 0; i < array.length; i++) {
            if (i > (splitSize - 1) && i % splitSize === 0) {
                currentItems = [];
                items.push(currentItems);
            }

            currentItems.push(array[i]);
        }
        return items;
    }

    componentDidMount(): void {
        let items: SeriesItem[] = [];


        for (let i = 0; i < 20; i++) {
            items.push(new SeriesItem(0, `House ${i}`, "https://specials-images.forbesimg.com/imageserve/1026205392/960x0.jpg?fit=scale",
                10, "", "", [], ""));
        }

        // this.setState({
        //     items: this.arraySplit(items)
        // });

    }

    changeHandler(newValue: string) {
        this.setState({
            ...this.state,
            searchBarValue: newValue
        });
    }

    clickHandler() {
        dataService.getSeriesItems(this.state.searchBarValue).then(value => {
            this.setState({
                searchBarValue: "",
                items: value
            });
        });
    }

    render(): ReactNode {
        return (
            <div>
                <h3>Filters and search</h3>
                <DropdownButton id="dropdown-basic-button" title="Genre" variant="outline-secondary">
                    <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
                    <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
                    <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
                </DropdownButton>

                <InputGroup className="mb-3">
                    <FormControl aria-describedby="basic-addon1"
                                 value={this.state.searchBarValue}
                                 onKeyPress={
                                     (event: any) => {
                                         if (event.key === "Enter") {
                                             this.clickHandler();
                                         }
                                     }
                                 }
                                 onChange={(event: any) => this.changeHandler((event.target as any).value)}/>
                    <InputGroup.Append>
                        <Button variant="outline-secondary" onClick={() => this.clickHandler()}>Найти</Button>
                    </InputGroup.Append>
                </InputGroup>
                <h3>Series list</h3>
                <Container className='itemsBox'>
                    {
                        this.arraySplit(this.state.items).map(line => {
                            return (
                                <Row className="mb-2">
                                    {
                                        line.map(shopItem => {
                                            return (<Col md="3" xs="12" className="item">
                                                    <SeriesItemComponent item={shopItem}/>
                                                </Col>
                                            )
                                        })
                                    }
                                </Row>
                            )
                        })
                    }
                </Container>
            </div>
        );
    }
}

export default Main;