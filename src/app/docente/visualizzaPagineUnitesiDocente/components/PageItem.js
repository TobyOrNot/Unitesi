import React from 'react';
import PropTypes from 'prop-types';
import styles from './PageItem.module.css';
import Image from 'next/image';

function PageItem({ name, members, studentRole, teacherRole, creationDate, url }) {
  return (
    <div className={styles.pageItem}>
      <div className={styles.teacherRole}>{teacherRole}</div> {}
      <Image src="/images/Line.png" className={styles.line} width="2000" height="2000" />
      
      <div className={styles.content}>
        <h3>{name}</h3>
        <p><strong>Membri:</strong> {members.join(', ')}</p>
        <p><strong>Tipo Studente:</strong> {studentRole}</p>
        <p><strong>Data di Creazione:</strong> {creationDate}</p>
      </div>

      <button className={styles.viewPageButton}> Visualizza Pagina </button>
      
    </div>
  );
}

PageItem.propTypes = {
  name: PropTypes.string.isRequired,
  members: PropTypes.arrayOf(PropTypes.string).isRequired,
  studentRole: PropTypes.string.isRequired,
  teacherRole: PropTypes.string.isRequired,
  creationDate: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
};

export default PageItem;
