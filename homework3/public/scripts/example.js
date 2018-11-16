

var PersonBox = React.createClass({
    getInitialState: function () {
        return { data: [] };
    },
    loadPersonsFromServer: function () {
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
    handlePersonSubmit: function (person) {
        console.log(JSON.stringify(person))
        var persons = this.state.data;
        var newPersons = persons.concat([person]);
        this.setState({ data: newPersons });
        $.ajax({
            url: this.props.url,
            dataType: 'json',
            type: 'POST',
            data: person,
            done: function (data) {
                this.setState({ data: data });
                console.log("Does the success happen?")
            }.bind(this),
            fail: function (xhr, status, err) {
                //this.setState({data: persons});
                console.error(xhr);
                console.error(this.props.url, status, err.toString());
            }.bind(this)
        });
    },
    componentDidMount: function () {
        this.loadPersonsFromServer();
        setInterval(this.loadPersonsFromServer, this.props.pollInterval);
    },
    render: function () {
        return (
            <div className="personBox">
                <h1>People</h1>
                <PersonList data={this.state.data} />
                <PersonForm onPersonSubmit={this.handlePersonSubmit} />
            </div>
        );
    }
});
var PersonList = React.createClass({
    render: function () {
        var data = this.props.data
        var personNodes = Object.keys(data).map(function (key, index) {
            let person = data[key];
            return (
                <Person fname={person.fname} lname={person.lname} start={person.start}  id={person.id} key={person.id}>
                    {person.text}
                </Person>
            );
        });
        return (
            <div className="personList">
                {personNodes}
            </div>
        );
    }
});

var PersonForm = React.createClass({
    getInitialState: function () {
        return { idstr: '', lname: '', fname: '', date: '' };
    },
    handleIdstrChange: function (e) {
        this.setState({ idstr: e.target.value });
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
        var idstr = this.state.idstr.trim();
        var fname = this.state.fname.trim();
        var lname = this.state.lname.trim();
        var date = this.state.date.trim();
        
        if (!fname || !idstr || !date || !lname) {
            return;
        }
        this.props.onPersonSubmit({ id: idstr, fname: fname, lname: lname, start: date });
        this.setState({ idstr: '', lname: '', fname: '', date: '' });
    },
    render: function () {
        return (
            <form className="personForm" onSubmit={this.handleSubmit}>
                <input
                    type="text"
                    placeholder="ID"
                    value={this.state.idstr}
                    onChange={this.handleIdstrChange}
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
var Person = React.createClass({

    rawMarkup: function () {
        var md = new Remarkable();
        var rawMarkup = md.render(this.props.children.toString());
        return { __html: rawMarkup };
    },
    render: function () {
        return (
            <div className="person">
                <h2 className="personIdstr">
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
    <PersonBox url="/people" pollInterval={2000} />,
    document.getElementById('content')
);