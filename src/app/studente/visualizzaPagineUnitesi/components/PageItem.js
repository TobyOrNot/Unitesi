import React from 'react';
import PropTypes from 'prop-types';
import './PageItem.css';
import Image from 'next/image'

function PageItem({ name, members, role, creationDate, url }) {
  return (
    <div className="page-item">
      <Image src="/images/cappellino.png" className="line" width="2000" height="2000" />
      <div className='content'>
      <h3>{name}</h3>
      <p><strong>Membri:</strong> {members.join(', ')}</p>
      <p><strong>Ruolo:</strong> {role}</p>
      <p><strong>Data di Creazione:</strong> {creationDate}</p>
      </div>
      <button 
        className="view-page-button"
      >
        Visualizza Pagina
      </button>
    </div>
  );
}

PageItem.propTypes = {
  name: PropTypes.string.isRequired,
  members: PropTypes.arrayOf(PropTypes.string).isRequired,
  role: PropTypes.string.isRequired,
  creationDate: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
};

export default PageItem;
