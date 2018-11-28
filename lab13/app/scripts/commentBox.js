import React from 'react';
import Remarkable from 'remarkable';
import $ from 'jquery';

import CommentForm from './commentForm.js'
import CommentList from './commentList.js'

import { API_URL, POLL_INTERVAL } from './global.js'

module.exports = React.createClass({
    getInitialState: function () {
        return { data: [], _isMounted: false };
    },
    loadCommentsFromServer: function () {
        if (this.state._isMounted) {
            console.log(API_URL)
            $.ajax({
                url: API_URL,
                dataType: 'json',
                cache: false,
                success: function (data) {
                    this.setState({ data: data });
                }.bind(this),
                error: function (xhr, status, err) {
                    console.error(API_URL, status, err.toString());
                }.bind(this)
            });
        }
    },
    handleCommentSubmit: function (comment) {
        var comments = this.state.data;
        // Optimistically set id 
        comment.id = Date.now();
        var newComments = comments.concat([comment]);
        this.setState({ data: newComments });
        $.ajax({
            url: API_URL,
            dataType: 'json',
            type: 'POST',
            data: comment,
            success: function (data) {
                this.setState({ data: data });
            }.bind(this),
            error: function (xhr, status, err) {
                this.setState({ data: comments });
                console.error(API_URL, status, err.toString());
            }.bind(this)
        });
    },
    componentDidMount: function () {
        this.state._isMounted = true;
        this.loadCommentsFromServer();
        setInterval(this.loadCommentsFromServer, POLL_INTERVAL);
    },
    componentWillUnmount: function () {
        // Reset the isMounted flag so that the loadCommentsFromServer callback
        // stops requesting state updates when the commentList has been unmounted.
        // This switch is optional, but it gets rid of the warning triggered by
        // setting state on an unmounted component.
        // See https://reactjs.org/blog/2015/12/16/ismounted-antipattern.html
        this.state._isMounted = false;
    },
    render: function () {
        return (
            <div className="commentBox">
                <h1>Comments Box test</h1>
                <CommentList data={this.state.data} />
                <CommentForm onCommentSubmit={this.handleCommentSubmit} />
            </div>
        );
    }
});