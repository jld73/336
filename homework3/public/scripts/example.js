

var CommentBox = React.createClass({
    getInitialState: function () {
        return { data: [] };
    },
    loadCommentsFromServer: function () {
        $.ajax({
            url: this.props.url,
            dataType: 'json',
            cache: false,
            success: function (data) {
                this.setState({ data: data });
            }.bind(this),
            error: function (xhr, status, err) {
                console.error(this.props.url, status, err.toString());
            }.bind(this)
        });
    },
    handleCommentSubmit: function (comment) {
        console.log(JSON.stringify(comment))
        var comments = this.state.data;
        var newComments = comments.concat([comment]);
        this.setState({ data: newComments });
        $.ajax({
            url: this.props.url,
            dataType: 'json',
            type: 'POST',
            data: comment,
            done: function (data) {
                this.setState({ data: data });
                console.log("Does the success happen?")
            }.bind(this),
            fail: function (xhr, status, err) {
                //this.setState({data: comments});
                console.error(xhr);
                console.error(this.props.url, status, err.toString());
            }.bind(this)
        });
    },
    componentDidMount: function () {
        this.loadCommentsFromServer();
        setInterval(this.loadCommentsFromServer, this.props.pollInterval);
    },
    render: function () {
        return (
            <div className="commentBox">
                <h1>People</h1>
                <CommentList data={this.state.data} />
                <CommentForm onCommentSubmit={this.handleCommentSubmit} />
            </div>
        );
    }
});
var CommentList = React.createClass({
    render: function () {
        var data = this.props.data
        var commentNodes = Object.keys(data).map(function (key, index) {
            let comment = data[key];
            return (
                <Comment fname={comment.fname} lname={comment.lname} start={comment.start}  id={comment.id} key={comment.id}>
                    {comment.text}
                </Comment>
            );
        });
        return (
            <div className="commentList">
                {commentNodes}
            </div>
        );
    }
});

var CommentForm = React.createClass({
    getInitialState: function () {
        return { author: '', lname: '', fname: '', date: '' };
    },
    handleAuthorChange: function (e) {
        this.setState({ author: e.target.value });
    },
    handleFChange: function (e) {
        this.setState({ fname: e.target.value });
    },
    handleLChange: function (e) {
        this.setState({ lname: e.target.value });
    },
    handleDateChange: function (e) {
        this.setState({ date: e.target.value });
    },
    handleSubmit: function (e) {
        e.preventDefault();
        var author = this.state.author.trim();
        var fname = this.state.fname.trim();
        var lname = this.state.lname.trim();
        var date = this.state.date.trim();
        
        if (!fname || !author || !date || !lname) {
            return;
        }
        this.props.onCommentSubmit({ id: author, fname: fname, lname: lname, start: date });
        this.setState({ author: '', lname: '', fname: '', date: '' });
    },
    render: function () {
        return (
            <form className="commentForm" onSubmit={this.handleSubmit}>
                <input
                    type="text"
                    placeholder="ID"
                    value={this.state.author}
                    onChange={this.handleAuthorChange}
                />
                <input
                    type="text"
                    placeholder="First Name"
                    value={this.state.fname}
                    onChange={this.handleFChange}
                />
                <input
                    type="text"
                    placeholder="Last Name"
                    value={this.state.lname}
                    onChange={this.handleLChange}
                />
                <input
                    type="text"
                    placeholder="Start Date"
                    value={this.state.date}
                    onChange={this.handleDateChange}
                />
                <input type="submit" value="Add" />
            </form>
        );
    }
});
var Comment = React.createClass({

    rawMarkup: function () {
        var md = new Remarkable();
        var rawMarkup = md.render(this.props.children.toString());
        return { __html: rawMarkup };
    },
    render: function () {
        return (
            <div className="comment">
                <h2 className="commentAuthor">
                    {this.props.id}
                </h2>
                <p> {this.props.fname} </p>
                <p> {this.props.lname} </p>
                <p> {this.props.start} </p>
            </div>
        );
    }
});
ReactDOM.render(
    <CommentBox url="/people" pollInterval={2000} />,
    document.getElementById('content')
);