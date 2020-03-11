import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-solid-svg-icons";
import { faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import "./Customer.css";
//import AddCustomer from "../../components/customers/AddCustomer.js";
import { NavLink } from "react-router-dom";

class Customer extends React.Component {
    state = {
        //dit is allemaal maar test data die later moet met database automatisch
        customers: [{
                id: 1,
                name: "MMC-ITSolutions",
                contact: "something@thismail.com",
                products: 10,
                actions: ""
            },
            {
                id: 2,
                name: "MMC-ITSolutions2",
                contact: "something@thismail.com",
                products: 1,
                actions: ""
            },
            {
                id: 3,
                name: "MMC-ITSolutions3",
                contact: "something@thismail.com",
                products: 0,
                actions: ""
            },
            {
                id: 4,
                name: "MMC-ITSolutions4",
                contact: "something@thismail.com",
                products: 20,
                actions: ""
            }
        ]
    };

    renderTableData() {
        return this.state.customers.map(customers => {
            const { id, name, contact, products } = customers;
            return ( <
                tr key = { id } >
                <
                td > { name } < /td> <
                td > { contact } < /td> <
                td > { products } < /td> <
                td className = "FA" >
                <
                NavLink to = "#" >
                <
                FontAwesomeIcon icon = { faEye }
                /> < /
                NavLink > <
                FontAwesomeIcon icon = { faTrashAlt }
                /> < /
                td > <
                /tr>
            );
        });
    }

    renderTableHeader() {
        let header = Object.keys(this.state.customers[0]);
        return header.map((key, index) => {
            if (key.toUpperCase() !== "ID") {
                return <th key = { index } > { key.toUpperCase() } < /th>;
            }
        });
    }

    render() {
        return ( <
            div className = "wrapper" >
            <
            h2 className = "title" > Company List < /h2>

            <
            div className = "content" >
            <
            button > Add Company < /button>

            <
            input type = "text"
            placeholder = " Search" / >
            <
            /div>

            <
            table id = "customers" >
            <
            thead >
            <
            tr > { this.renderTableHeader() } < /tr> < /
            thead > <
            tbody > { this.renderTableData() } < /tbody> < /
            table > <
            /div>
        );
    }
}

export default Customer;