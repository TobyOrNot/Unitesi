import React from 'react';
import './ViewPages.css';

const pagesData = [
  {
    name: 'Tesi sulla fica',
    members: ['Studente A', 'Studente B'],
    role: 'Tesista',
    creationDate: '2023-05-21',
    url: '/pagina-1',
  },
  {
    name: 'Tesi sulla mamma puttana',
    members: ['Studente C', 'Studente D'],
    role: 'Tesista',
    creationDate: '2023-06-15',
    url: '/pagina-2',
  },
  {name: 'Tesi sul perchè gli egiziani credevano nel dio Cane (Anubi)',
  members: ['Marco', 'Antonio'],
  role: 'Tesista',
  creationDate: '2023-06-15',
  url: '/pagina-3',
},
  // Aggiungi altre pagine qui
];

function ViewPages() {
  return (
    <div className="view-pages-container">
      <h2>Pagine dello Studente</h2>
      {pagesData.map((page, index) => (
        <div key={index} className="page-item">
          <h3>{page.name}</h3>
          <p><strong>Membri:</strong> {page.members.join(', ')}</p>
          <p><strong>Ruolo:</strong> {page.role}</p>
          <p><strong>Data di Creazione:</strong> {page.creationDate}</p>
          <button 
            className="view-page-button"
          >
            Visualizza Pagina
          </button>
        </div>
      ))}
    </div>
  );
}

export default ViewPages;
