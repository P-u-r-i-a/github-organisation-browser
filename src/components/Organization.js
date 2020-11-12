const Organization = function(props) {
    const { name, avatar_url, description, location, public_repos, blog, html_url } = props.organization;
    
    return(
        <section className="organization-section">
            <p>Name: {name}</p>
            <p>Avatar: </p>
            <img src={avatar_url} alt="avatar" />
            <p>Descripiton: {description}</p>
            <p>Location: {location}</p>
            <p>Total numbers of repositories: {public_repos}</p>
            <p>Github URL: <a href={html_url}>{html_url}</a></p>
            <p>Blog URL: <a href={blog}>{blog}</a></p>
            <hr />
        </section>
    );
}

export default Organization;