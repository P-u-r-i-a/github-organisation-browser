import React,  { Component } from 'react';
import Org from '../components/Organization';

class RepositoryBrowser extends Component {
    constructor() {
        super();
        this.state = {
            org: null
        };
    }

    componentDidMount() {
        this._fetchOrganizationDetails();
    }

    _fetchOrganizationDetails(){
        
        fetch('https://api.github.com/orgs/catalyst')
        .then((res) => {
            return res.json();
        }).then(org => {
            this.setState({
                org: org
            });
        })
        .catch(error => {
            console.error(error);
        })
    }

    render() {
        return (
            <div>
            <h1 className="title">Repository Browser</h1>
                {
                    this.state.org ? <Org organization={this.state.org} /> : <small className="loading-text">Loading...</small>
                }
            </div>
        );
    }
}

export default RepositoryBrowser;