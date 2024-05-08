import React from "react";

class DisplayInfor extends React.Component {
    render() {
        const { listUsers } = this.props;
        return (
            <div>
                {listUsers.map((user) => {
                    console.log(user)
                    return (
                        <div key={user.id}>
                            <div>User id is {user.id}</div>
                            <div>User name is {user.name}</div>
                            <div>User age is {user.age}</div>
                            <br/>
                            <hr/>
                        </div>
                    );
                })}
                
            </div>
        );
    }
}

export default DisplayInfor;