import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { fetchPost, deletePost } from '../actions';

class PostsShow extends Component {
    componentDidMount() {
        // this.props.match.params.id;

        if(!this.props.post) {
            const { id } = this.props.match.params;
            this.props.fetchPost(id);
        }
    }

    // helperFunction() {
    //     this.props.posts[this.props.match.params.id];
    // }

    onDeleteClick() {
        const { id } = this.props.match.params;


        this.props.deletePost(id, () => {
            this.props.history.push('/');
        });
    }

    render() {
        // posts[this.props.match.params.id]; // the post to show
        // this.props.match.params.id;

        const { post } = this.props;

        if(!post) {
            return <div>Loading...</div>;
        }

        return (
            <div>
                <Link to="/">Back to blog</Link>
                <button
                    className="btn btn-danger pull-xs-right"
                    onClick={this.onDeleteClick.bind(this)}
                >
                    Delete post
                </button>
                <h3>{post.title}</h3>
                <h6>Categories: {post.categories}</h6>
                <p>{post.content}</p>
            </div>
        );
    };
}

function mapStateToProps({ posts }, ownProps) {
    return { post: posts[ownProps.match.params.id] };
}

export default connect(mapStateToProps, { fetchPost, deletePost })(PostsShow);
