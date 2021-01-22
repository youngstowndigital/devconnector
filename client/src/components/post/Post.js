import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';
import { getPost } from '../../actions/post';
import PostItem from '../posts/PostItem';
import CommentForm from './CommentForm';
import CommentItem from './CommentItem';

const Post = ({ getPost, post: { post, loading }, match }) => {
    useEffect(() => {
        getPost(match.params.id);
    }, [getPost]);

    if (loading || post === null)
        return <Spinner />;

    if (post === null)
        return 

    return (
        <div>
            <Link className="btn" to="/posts">Back to Posts</Link>
            <PostItem post={post} showActions={false} />
            <CommentForm postId={post._id} />
            <div className="comments">
                {post.comments.map(comment => {
                    return <CommentItem key={comment._id} comment={comment} postId={post._id} />
                })}
            </div>
        </div>
    )
}

Post.propTypes = {
    getPost: PropTypes.func.isRequired,
    post: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
    post: state.post
})

export default connect(mapStateToProps, { getPost })(Post);
