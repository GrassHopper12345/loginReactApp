import React from 'react';

function Head(props) {
    let user = props.user;
    let onLogout = props.onLogout;
    return (
        <header>
            <div>The Header</div>
            <div>
                {user.name}{user.id} &nbsp; &nbsp;
                <a className='btn-logout' onClick={onLogout}>Logout</a>
            </div>
            <hr />
        </header>
    )
}
export default Head;