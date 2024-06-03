import React, { useState } from 'react';
import styles from './Roadmap.module.css';

const Documents = ({
  selectedCheckpoint,
  checkpoints,
  handleAddDocument,
  handleRemoveDocument,
  handleDownloadDocument
}) => {
  const [newDocumentName, setNewDocumentName] = useState('');

  const handleAddDocumentClick = () => {
    if (newDocumentName.trim() !== '') {
      handleAddDocument(selectedCheckpoint, newDocumentName);
      setNewDocumentName('');
    }
  };

  return (
    <div>
      {selectedCheckpoint !== null && (
        <div>
          <h2>Documenti</h2>
          <ul className={styles.documents}>
            {checkpoints[selectedCheckpoint].files.map((document, documentIndex) => (
              <li key={documentIndex}>
                <p>{document}</p>
                <button onClick={() => handleDownloadDocument(document)}>Scarica</button>
                <button onClick={() => handleRemoveDocument(selectedCheckpoint, documentIndex)}>Rimuovi</button>
              </li>
            ))}
          </ul>
          <div className={styles.addDocument}>
            <input
              type='text'
              value={newDocumentName}
              onChange={(e) => setNewDocumentName(e.target.value)}
              placeholder='Nome documento'
            />
            <button onClick={handleAddDocumentClick}>Aggiungi Documento</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Documents;
