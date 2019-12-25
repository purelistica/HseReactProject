import React from "react";
import dataService, {SeriesItem} from "./DataService";

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
                {this.state.cartItems.map(item => (<div key={item.id}>{item.name}</div>))}
            </div>
        );
    }
}