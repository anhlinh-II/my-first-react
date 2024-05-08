import React from "react";

class UserInfor extends React.Component {
    state = {
        name: 'Thuyvan',
        address: 'Donganh',
        age: 19
    };

    handleClick(event) {
        console.log('random age: ', Math.floor(Math.random() * 100))

        this.setState({
            name: 'ThuyAnh'
        })
    }

    handleOnMouseOver(event) {
        console.log('random age: ', Math.floor(Math.random() * 100))

        this.setState({
            name: 'ThucAnh'
        })
    }

    handleOnChangeInputName = (event) => {
        this.setState({
            name: event.target.value
        })
    }

    handleOnChangeInputAge = (event) => {
        this.setState({
            age: event.target.value
        })
    }

    handleOnSubmitName = (event) => {
        event.preventDefault();
        console.log('i love', this.state.name);
    }

    handleOnSubmitAge = (event) => {
        event.preventDefault();
        console.log('My love is', this.state.age, 'years old');
    }

    // JSX
    render() {
        return (
            <div>
                my girlfriend's name is {this.state.name}
                <br/>
                and she is {this.state.age} years old.
                <button onClick={(event) => { this.handleClick(event) }}>click me</button>
                <form onSubmit={(event) => {this.handleOnSubmitName(event)}}>
                    <input
                        value={this.state.name}
                        type="text"
                        onChange={ (event) => {this.handleOnChangeInputName(event)} }
                    />
                    <button>Submit</button>
                </form>
                <form onSubmit={(event) => {this.handleOnSubmitAge(event)}}>
                    <input
                        value={this.state.age}
                        type="text"
                        onChange={ (event) => {this.handleOnChangeInputAge(event)} }
                    />
                    <button>Submit</button>
                </form>
            </div>
        );
    }
}

export default UserInfor;