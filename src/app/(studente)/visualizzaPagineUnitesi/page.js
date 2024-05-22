import React from 'react';
import './ViewPages.css';
import PageItem from './components/PageItem.js';
import SearchHeader from './components/searchHeader';

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
  {
    name: 'Tesi sul perchè gli egiziani credevano nel dio Cane (Anubi)',
    members: ['Marco', 'Antonio'],
    role: 'Tesista',
    creationDate: '2023-06-15',
    url: '/pagina-3',
  },
  {
    name: 'Tesi sul perchè gli egiziani credevano nel dio Cane (Anubi)',
    members: ['Marco', 'Antonio'],
    role: 'Tesista',
    creationDate: '2023-06-15',
    url: '/pagina-3',
  },
  {
    name: 'Tesi sul perchè gli egiziani credevano nel dio Cane (Anubi)',
    members: ['Marco', 'Antonio'],
    role: 'Tesista',
    creationDate: '2023-06-15',
    url: '/pagina-3',
  },

 
  // Aggiungi altre pagine qui
];

function ViewPages({ nomeDocente = "Marco Patella" }) {
  return (
      <div className="view-pages-container">
      <h2>Pagine Unitesi di {nomeDocente}</h2>
      <SearchHeader/>
        {pagesData.map((page, index) => (
          <PageItem
            key={index}
            name={page.name}
            members={page.members}
            role={page.role}
            creationDate={page.creationDate}
            url={page.url}
          />
        ))}
      </div>
  );
}

export default ViewPages;