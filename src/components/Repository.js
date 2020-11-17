import React, { Component } from 'react';
import { connect } from 'react-redux'
import { fetchContributors } from '../actions';

class Repository extends Component{
    constructor(){
        super();
        this.state = {
            contributors: null
        }

        this._fetchContributors = this._fetchContributors.bind(this);
    }
    // fetch the repository's contributors
    _fetchContributors(){
        this.props.fetchContributors(this.props.organisation, this.props.repository.name);
    }
    // render contributors
    _renderContributors(){
        if(this.state.contributors){
            return this.state.contributors.map((contributor, index) => {
                return <img className="contributor-avatar" 
                src={contributor.avatar_url} alt={contributor.login} height="80" width="80"/>
            })
        } else {
            return "";
        }
    }
    
    render(){
        const { name, description,  html_url, stargazers_count, fork, watchers, license, language } = this.props.repository;
        return(
            <section className="repository-section">
                <div className="card">
                    <a target="_blank" rel="noreferrer" className="repo-name" 
                     href={html_url} aria-label="repositor's name">
                         <strong>{name}</strong>
                     </a>
                    <p className="repo-description" aria-label="repository's description">{description}</p>
                    <button className="ctrs-btn" onClick={ () => this._fetchContributors()}>Show contributors</button> 
                    <div className="repo-details">
                        <p>
                            <svg aria-labelledby="title" style={{width:'24px', height:'24px'}} viewBox="0 0 24 24">
                                <title id="title" lang="en">Star Icon</title>
                                <path fill="currentColor" d="M12,15.39L8.24,17.66L9.23,13.38L5.91,10.5L10.29,10.13L12,6.09L13.71,10.13L18.09,10.5L14.77,13.38L15.76,17.66M22,9.24L14.81,8.63L12,2L9.19,8.63L2,9.24L7.45,13.97L5.82,21L12,17.27L18.18,21L16.54,13.97L22,9.24Z" />
                            </svg> 
                            <small>{stargazers_count} Star(s)</small>
                        </p>
                        <p> 
                            <svg aria-labelledby="title" style={{width:'24px', height:'24px'}} viewBox="0 0 24 24">
                                  <title id="title" lang="en">Source fork Icon</title>
                                  <path fill="currentColor" d="M6,2A3,3 0 0,1 9,5C9,6.28 8.19,7.38 7.06,7.81C7.15,8.27 7.39,8.83 8,9.63C9,10.92 11,12.83 12,14.17C13,12.83 15,10.92 16,9.63C16.61,8.83 16.85,8.27 16.94,7.81C15.81,7.38 15,6.28 15,5A3,3 0 0,1 18,2A3,3 0 0,1 21,5C21,6.32 20.14,7.45 18.95,7.85C18.87,8.37 18.64,9 18,9.83C17,11.17 15,13.08 14,14.38C13.39,15.17 13.15,15.73 13.06,16.19C14.19,16.62 15,17.72 15,19A3,3 0 0,1 12,22A3,3 0 0,1 9,19C9,17.72 9.81,16.62 10.94,16.19C10.85,15.73 10.61,15.17 10,14.38C9,13.08 7,11.17 6,9.83C5.36,9 5.13,8.37 5.05,7.85C3.86,7.45 3,6.32 3,5A3,3 0 0,1 6,2M6,4A1,1 0 0,0 5,5A1,1 0 0,0 6,6A1,1 0 0,0 7,5A1,1 0 0,0 6,4M18,4A1,1 0 0,0 17,5A1,1 0 0,0 18,6A1,1 0 0,0 19,5A1,1 0 0,0 18,4M12,18A1,1 0 0,0 11,19A1,1 0 0,0 12,20A1,1 0 0,0 13,19A1,1 0 0,0 12,18Z" />
                            </svg> 
                            <small>Is it a fork? {fork ? "Yes" : "No" }</small>
                            </p>
                        <p>
                            <svg aria-labelledby="title" style={{width:'24px', height:'24px'}} viewBox="0 0 24 24">
                                  <title id="title" lang="en">Eye Icon</title>
                                <path fill="currentColor" d="M12,9A3,3 0 0,0 9,12A3,3 0 0,0 12,15A3,3 0 0,0 15,12A3,3 0 0,0 12,9M12,17A5,5 0 0,1 7,12A5,5 0 0,1 12,7A5,5 0 0,1 17,12A5,5 0 0,1 12,17M12,4.5C7,4.5 2.73,7.61 1,12C2.73,16.39 7,19.5 12,19.5C17,19.5 21.27,16.39 23,12C21.27,7.61 17,4.5 12,4.5Z" />
                            </svg> 
                            <small>Watchers: {watchers}</small> 
                        </p>
                        <p>
                            <svg aria-labelledby="title" style={{width:'24px', height:'24px'}} viewBox="0 0 24 24">
                                <title id="title" lang="en">License Icon</title>
                                <path fill="currentColor" d="M9 10A3.04 3.04 0 0 1 12 7A3.04 3.04 0 0 1 15 10A3.04 3.04 0 0 1 12 13A3.04 3.04 0 0 1 9 10M12 19L16 20V16.92A7.54 7.54 0 0 1 12 18A7.54 7.54 0 0 1 8 16.92V20M12 4A5.78 5.78 0 0 0 7.76 5.74A5.78 5.78 0 0 0 6 10A5.78 5.78 0 0 0 7.76 14.23A5.78 5.78 0 0 0 12 16A5.78 5.78 0 0 0 16.24 14.23A5.78 5.78 0 0 0 18 10A5.78 5.78 0 0 0 16.24 5.74A5.78 5.78 0 0 0 12 4M20 10A8.04 8.04 0 0 1 19.43 12.8A7.84 7.84 0 0 1 18 15.28V23L12 21L6 23V15.28A7.9 7.9 0 0 1 4 10A7.68 7.68 0 0 1 6.33 4.36A7.73 7.73 0 0 1 12 2A7.73 7.73 0 0 1 17.67 4.36A7.68 7.68 0 0 1 20 10Z" />
                            </svg>
                            <small>License: {license ? license.key : '-'}</small></p>
                        <p> 
                            <svg aria-labelledby="title" style={{width:'24px', height:'24px'}} viewBox="0 0 24 24">
                                <title id="title" lang="en">Code page Icon</title>
                                <path fill="currentColor" d="M13,9H18.5L13,3.5V9M6,2H14L20,8V20A2,2 0 0,1 18,22H6C4.89,22 4,21.1 4,20V4C4,2.89 4.89,2 6,2M6.12,15.5L9.86,19.24L11.28,17.83L8.95,15.5L11.28,13.17L9.86,11.76L6.12,15.5M17.28,15.5L13.54,11.76L12.12,13.17L14.45,15.5L12.12,17.83L13.54,19.24L17.28,15.5Z" />
                            </svg>
                            <small>{language ? language : '-'}</small>
                        </p>
                    </div>
                </div>
            </section>
        );
    }
}

export default connect( null, { fetchContributors })(Repository);