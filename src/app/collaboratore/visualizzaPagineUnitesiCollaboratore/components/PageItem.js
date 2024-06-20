import React from 'react';
import PropTypes from 'prop-types';
import styles from './PageItem.module.css';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

function PageItem({ name, ruolo, descrizione, url }) {
  const router = useRouter();

  const handleViewRoadmap = () => {
    router.push(url);
  };

  return (
    <div className={styles.pageItem}>
      <div className={styles.teacherRole}>{ruolo}</div>
      <Image src="/images/line_icon.png" className={styles.line} width="2000" height="2000" alt="Line" />
      
      <div className={styles.content}>
        <h3>{name}</h3>
        <p><strong>Descrizione:</strong> {descrizione}</p>
      </div>

      <button className={styles.viewPageButton} onClick={handleViewRoadmap}> Visualizza Pagina </button>
    </div>
  );
}

PageItem.propTypes = {
  name: PropTypes.string.isRequired,
  studente: PropTypes.string.isRequired, // Assicurati che members sia sempre un array
  correlatori: PropTypes.array.isRequired, 
  studentRole: PropTypes.string.isRequired,
  ruolo: PropTypes.string.isRequired,
  creationDate: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
};

export default PageItem;