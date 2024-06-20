import React from 'react';
import styles from './Checkpoint.module.css';

const Checkpoint = ({ index, title, radius, validated, onClick }) => {
  const circleStyle = {
    width: radius * 2,
    height: radius * 2,
    borderRadius: '50%',
    backgroundColor: validated ? '#9acd32' : '#80a7e3',
    border: '2px solid #110163',
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontWeight: 'bold',
  };

  return (
    <div className={styles.checkpointContainer} onClick={onClick}>
      <div className={styles.checkpointText}>{title}</div>
      <div style={circleStyle}>
        {index}
        {validated}
      </div>

    </div>
  );
}; 

export default Checkpoint;
