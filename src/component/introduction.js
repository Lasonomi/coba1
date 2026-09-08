import React from 'react';

function Introduction(props) {
  const {
    name = 'Guest',
    title = 'Introduction',
    description = 'Selamat datang di aplikasi saya.',
    buttonText
  } = props;

  return (
    <section className="neo-card introduction-card">
      <div className="neo-head">{title}</div>
      <div className="neo-content">
        <h1>{title}</h1>
        <p>Halo, saya {name}</p>
        <p>{description}</p>

        {buttonText && <button className="neo-button">{buttonText}</button>}
      </div>
    </section>
  );
}

export default Introduction;
