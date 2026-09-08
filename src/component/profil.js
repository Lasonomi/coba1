import React from 'react';

class Profile extends React.Component {
  render() {
    const { name = 'Guest', title = 'Profile', description = 'Welcome to my React app.' } = this.props;

    return (
      <div className="neo-card profile-card">
        <div className="neo-head">PROFILE / 01</div>
        <div className="neo-content">
          <h1>{title}</h1>
          <p>Nama: {name}</p>
          <p>{description}</p>
        </div>
      </div>
    );
  }
}

export default Profile;