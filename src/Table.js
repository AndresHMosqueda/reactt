import React, { Component } from "react";
import { Table } from "reactstrap";
import axios from "axios";
import { Pagination, PaginationItem, PaginationLink } from 'reactstrap';

export default class Example extends React.Component {
  state = {
    info: [],
    counter: 10,
  };

  componentDidMount() {
    this.fetchData();
  }

  fetchData() {
    axios
      .get("http://localhost:3000/all")
      .then(res => {
        console.warn(res);
        
        this.setState({
          info: res.data.dataPo
        });
      });
  }

  searchByPO = ($event) => {
    const value = $event.target.value;

    return axios
      .get(`http://localhost:3000/search/${value}`,{
        method: 'GET',
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Content-Type': 'application/json',
        },
      })
      .then(res => {
        console.warn(res);

        this.setState({
            info: res.data.dataPo
         })
      })
      .catch(err => {
        console.log(err);
      });
  };

  searchByStatus = ($event) => {
    const valor = $event.target.valor;

    return axios
      .get(`http://localhost:3000/totalStatusId/${valor}`,{
        method: 'GET',
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Content-Type': 'application/json',
        },
      })
      .then(res => {
        console.warn(res);

        this.setState({
            info: res.data.dataPo
         })
      })
      .catch(err => {
        console.log(err);
      });
  };

  siguientes=()=>{
      this.setState({counter: this.state.counter + 10});
    
      console.warn(this.state.counter);

      return axios
      .get(`http://localhost:3000/paginate/${this.state.counter}`)
      .then(res => {
        console.warn(res);

        this.setState({
            info: res.data.dataPo
         })
      })
      .catch(err => {
        console.log(err);
      });
  }

  previos=()=>{
    this.setState({counter: this.state.counter - 10});
  
    console.warn(this.state.counter);

    return axios
    .get(`http://localhost:3000/paginate/${this.state.counter}`)
    .then(res => {
      console.warn(res);

      this.setState({
          info: res.data.dataPo
       })
    })
    .catch(err => {
      console.log(err);
    });
}

  order = typo => {
    const results = this.state.info.sort((a, b) => {
      return a.POCreateDate > b.POCreateDate ? 1 : -1;
    });
    console.warn();
    this.setState({ info: results });
  };

  render() {
    const { info } = this.state;

    // console.warn(info);

    return (
      <div>
        <input type="text" name="searchBar" onChange={this.searchByPO} />
        <Table hover>
          <thead>
            <tr>
              <th onClick={this.order}>PO No</th>
              <th onClick={this.order}>Status</th>
              <th onClick={this.order}>Supplier</th>
              <th onClick={this.order}>Cruise</th>
              <th onClick={this.order}>PO Division</th>
              <th onClick={this.order}>PO Creation Date</th>
              <th onClick={this.order}>Required Ex Works Date</th>
              <th onClick={this.order}>Required at Destination</th>
              <th onClick={this.order}>Total Qty Requested</th>
              <th onClick={this.order}>Qty Confirmed </th>
              <th onClick={this.order}>Transport</th>
            </tr>
          </thead>
          <tbody>
            {info.map((data, i) => (
              <tr key={i}>
                {/* <td>{infoList}</td> */}
                <td>{data.PONumber}</td>
                <td>{data.StatusDesc}</td>
                <td>{data.SupplierName} </td>
                <td>{data.Cruise} </td>
                <td> </td>
                <td>{data.POCreateDate} </td>
                <td>{data.RequestedExWorksDate} </td>
                <td>{data.RequiredDestination} </td>
                <td>{data.TotalQtyOrdered} </td>
                <td>{data.TotalQtyConfirmed} </td>
                <td>{data.TransportMode} </td>
              </tr>
            ))}
          </tbody>
        </Table>
       
              <br/>
              <Pagination aria-label="Page navigation example" style={{textAlign: 'center'}}>
      <PaginationItem>
          <PaginationLink onClick={this.siguientes} />
        </PaginationItem>
        <PaginationItem>
          <PaginationLink previous href="#" />
        </PaginationItem>
        <PaginationItem>
          <PaginationLink onClick={this.siguientes}>
            1
          </PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationLink onClick={this.siguientes} >
            2
          </PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationLink onClick={this.siguientes}>
            3
          </PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationLink onClick={this.siguientes}>
            4
          </PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationLink onClick={this.siguientes}>
            5
          </PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationLink next onClick={this.siguientes} />
        </PaginationItem>
        <PaginationItem>
          <PaginationLink last onClick={this.previos}  /> 
        </PaginationItem>
      </Pagination>
       
      </div>
    );
  }
}
