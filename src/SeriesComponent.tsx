import React from "react";
import dataService, {SeriesItem} from "./DataService";
import {RouteComponentProps, withRouter} from "react-router";
import Row from "react-bootstrap/Row";


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
                            return (<h1> {it.title} </h1>)
                        }
                    )
                }
            </div>
        );
    }
}

export default withRouter(SeriesComponent);