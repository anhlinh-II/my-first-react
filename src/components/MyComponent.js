// class component
// function component

import React from "react";
import UserInfor from "./UserInfor";
import DisplayInfor from "./DisplayInfor";

class MyComponent extends React.Component {
    state = {
        listUsers: [
            {
                id: 1, name: 'Thuyvan', age: 19
            },
            {
                id: 2, name: 'Thuyveo', age: 19
            },
            {
                id: 3, name: 'Thuyanh', age: 19
            },
        ]
    }

    render() {
        return (
            <div>
                <UserInfor />
                <DisplayInfor
                    listUsers={this.state.listUsers}
                />
            </div>
        );
    }
}

export default MyComponent;