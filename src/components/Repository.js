import React, { Component } from 'react';

class Repository extends Component{
    constructor(){
        super();
        this.state = {
            contributors: null
        }

        this._fetchContributors = this._fetchContributors.bind(this);
    }
    // fetch repository's contributors
    _fetchContributors(){
        fetch(`https://api.github.com/repos/${this.props.organisation}/${this.props.repository.name}/contributors`)
            .then((res) => {
                return res.json();
            }).then(ctr => {
                this.setState({
                    contributors: ctr
                })
            })
            .catch(error => {
                console.error(error);
            });
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
                <p>Name: <strong>{name}</strong>- {stargazers_count} Star(s)</p>
                <p>Descripiton: {description}</p>
                <p>Github URL: <a href={html_url}>{html_url}</a></p>
                <p>Is it a fork? <strong>{fork.toString()}</strong></p>
                <p>Watchers: {watchers} </p>
                <p>License: <strong>{license ? license.name : '-'}</strong></p>
                <p>Language: <strong>{language ? language : '-'}</strong></p>
                {
                    !this.state.contributors ? <button onClick={ () => this._fetchContributors()}>Show contributors</button> : ""
                }
                <br />
                {
                    this._renderContributors()
                }
                <hr />
            </section>
        );
    }
}
export default Repository;