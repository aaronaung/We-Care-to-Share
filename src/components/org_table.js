import React from 'react';
import ReactTable from 'react-table';

class OrgTable extends React.Component{
    constructor(props){
        super(props)
        this.columnData = [
            {
                Header: "Category",
                accessor: "category",
                minWidth: 120,
                style: {"font-size": "0.8rem"}
            },
            {
                Header: "Charity Name",
                accessor: "name",
                minWidth: 200,
                style: {"font-size": "0.8rem"}
            },
            {
                Header: "More Info",
                accessor: "web",
                minWidth: 50,
                style: {
                    "font-size": "0.8rem",
                    "text-align": "center"
                }
            },
            {
                Header: "Donation Site",
                accessor: "donation",
                minWidth: 50,
                style: {
                    "font-size": "0.8rem",
                    "text-align": "center"
                }
            },
            {
                Header: "Tax Deductible",
                accessor: "tax",
                minWidth: 50,
                style: {"font-size": "0.8rem", "text-align": "center"}
            }
        ]
    }
    render() {
        return (
            <ReactTable defaultPageSize={8} 
            data= {this.props.data} 
            columns= {this.columnData} />
        )
    }
}

export default OrgTable;