import React,  { Component } from 'react';
import Org from '../components/Organization';

class RepositoryBrowser extends Component {
    constructor() {
        super();
        this.state = {
            org: null,
            repos: null,
            currentPage: 1,
            perPage: 25,
            orgName: 'catalyst',
        };

        this._fetchOrganizationDetails = this._fetchOrganizationDetails.bind(this);
        this._fetchRepositories = this._fetchRepositories.bind(this);
        this._renderResults = this._renderResults.bind(this);
        this._renderRepos = this._renderRepos.bind(this);
    }

    // call _fetchOrganizationDetails() to get the organization details - After that the component is mounted!
    componentDidMount() {
        this._fetchOrganizationDetails();
    }

    // fetch organization details
    _fetchOrganizationDetails(){
        fetch(`https://api.github.com/orgs/${this.state.orgName}`)
            .then((res) => {
                return res.json();
            }).then(org => {
                this._fetchRepositories();
                this.setState({
                    org: org
                });
            })
            .catch(error => {
                console.error(error);
            });
    }

    // fetch organization's repositories
    _fetchRepositories(){
        fetch(`https://api.github.com/orgs/${this.state.orgName}/repos?per_page=${this.state.perPage}&page=${this.state.currentPage}`)

            .then((res) => {
                return res.json();
            }).then(repos => {
                this.setState({
                    repos: this.state.repos ? this.state.repos.concat(repos) : repos,
                    currentPage: (this.state.currentPage + 1)
                });
            })
            .catch(error => {
                console.error(error);
            });
    }

    // render the fetched repositories
    _renderRepos() {
        return <section className="repositories-section">
            <h2>Repositories: </h2>
           { 
                this.state.repos.map((repo, index) => { return <p>{++index + ". " + repo.name}</p> })
           }
           {
               this.state.org.public_repos > (this.state.currentPage - 1) * this.state.perPage ? <button onClick={() => this._fetchRepositories()}>Load more...</button> : ''
           }

        </section>
    }

    // render all the results (organization details and its repositories)
    _renderResults() {
        return (
            <div>
                <Org organization={this.state.org} />
                {
                    this.state.repos ? this._renderRepos() : <small className="loading-text">Loading...</small>
                }
            </div>
        );
    }

    render() {
        return (
            <div>
            <h1 className="title">Repository Browser</h1>
                {
                    this.state.org ? this._renderResults() : <small className="loading-text">Loading...</small>
                }
            </div>
        );
    }
}

export default RepositoryBrowser;