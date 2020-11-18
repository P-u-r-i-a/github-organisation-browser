import React,  { Component } from 'react';
import { connect } from 'react-redux';
import Org from '../components/Organisation';
import Repository from '../components/Repository';
import { fetchOrganisationDetails, fetchRepositories, setValue, closeModal } from '../actions';

class RepositoryBrowser extends Component {
    constructor() {
        super();

        this._renderResults = this._renderResults.bind(this);
        this._renderRepos = this._renderRepos.bind(this);
        this._setFilter = this._setFilter.bind(this);
        this._fetchMore = this._fetchMore.bind(this);
    }

    // call fetchOrganisationDetails() to get the organisation details after that the component is mounted!
    componentDidMount() {
        this.props.fetchOrganisationDetails();
        this.props.fetchRepositories(true);
    }
    // apply search filter
    _setFilter(name, value) {
        this.props.setValue(name, value);
    }
    // load more data when users click on the Load more button!
    _fetchMore(){
        this.props.fetchRepositories(false, this.props.currentPage + 1);
        this.props.setValue('currentPage', this.props.currentPage + 1);

    }

    // render the fetched repositories
    _renderRepos() {
        return <section className="repositories-section">
            <div className="search-filter-area card">
                <div>
                    <label htmlFor="filter" >Repository type: </label>
                    <select id="filter" defaultValue="all" onChange={e => this._setFilter('repoType',e.target.value)}>
                        <option value="all">All</option>
                        <option value="sources">Not forked</option>
                        <option value="forks">Forked</option>
                    </select>
                </div>
                <div>
                    <label htmlFor="sort">Sort by: </label>
                   <div className="form-group">
                        <select defaultValue="full_name" id="sort" onChange={e => this._setFilter('repoSort',e.target.value)}>
                            <option value="full_name">Full name</option>
                            <option value="created">Created time</option>
                            <option value="updated">Updated time</option>
                        </select>
                        <select defaultValue="asc" onChange={e => this._setFilter('repoDirection',e.target.value)}>
                            <option value="asc">Ascending</option>
                            <option value="desc">Descending</option>
                        </select>
                   </div>
                </div>
             <button className="search-btn" onClick={() => this.props.fetchRepositories(true)}>Search</button>

            </div>

             <h2 className="title">Repositories</h2>
             <div className="respositories-wrapper">
                {    
                    this.props.repos.map((repo, index) => { 
                    return <Repository organisation={this.props.orgName} repository={repo} key={repo.name} /> })
                }
             </div>
        </section>
    }

    // render all the results (organisation details and its repositories)
    _renderResults() {
        return (
            <div>
                <Org organisation={this.props.orgDetails} />
                {
                    this.props.repos ? this._renderRepos() : <small className="loading-text">Loading...</small>
                }
            </div>
        );
    }

    render() {
        return (
            <div className="container">
                {
                    this.props.orgDetails ? this._renderResults() : <small className="loading-text">Loading...</small>
                }
                {
                    this.props.repos  && this.props.hasMoreResult ? <button className="load-more-btn" onClick={()=> this._fetchMore()}>Load More ...</button> : ""
                }
                <div className="modal" onClick={() => this.props.closeModal()}  style={{ display: this.props.modalVisibility ? 'block' : 'none' }}>
                    <div className="modal-content">
                        <div className="modal-header">
                        <span className="close" onClick={() => this.props.closeModal()}>&times;</span>
                        <h2>Top Contributors</h2>
                        </div>
                        <div className="modal-body">
                            {
                            this.props.contributors ?
                                this.props.contributors.map((contributor, index) => {
                                    return <a target="_blank" rel="noreferrer" href={contributor.html_url}>
                                            <img className="contributor-avatar" 
                                        src={contributor.avatar_url} alt={contributor.login} height="80" width="80" key={contributor.login} />
                                    </a> }) :
                                    ""
                            }
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

let mapStateToProps = (store) => {
    let { contributors , modalVisibility, 
          orgDetails, repos, orgName, 
          hasMoreResult, currentPage } = store.main;

    return {
        contributors: contributors,
        modalVisibility: modalVisibility,
        orgDetails: orgDetails,
        repos: repos,
        orgName: orgName,
        hasMoreResult: hasMoreResult,
        currentPage: currentPage
    }
}

export default connect(mapStateToProps, { fetchOrganisationDetails, 
                                          fetchRepositories, 
                                          setValue,  closeModal })(RepositoryBrowser);