"use client"

import React, { useState, useRef, useEffect } from 'react';
import Checkpoint from './Checkpoint';
import Membri from './Membri';
import styles from './Roadmap.module.css';
import Image from 'next/image';
import VisualizzaPagineUnitesiButton from './VisualizzaPagineUnitesiButton';

const Roadmap = () => {
  const [showCheckpoints, setShowCheckpoints] = useState(false);
  const [checkpoints, setCheckpoints] = useState([]);
  const [selectedCheckpoint, setSelectedCheckpoint] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [newCheckpointTitle, setNewCheckpointTitle] = useState('');
  const [newCheckpointDescription, setNewCheckpointDescription] = useState('');
  const [openRectangles, setOpenRectangles] = useState({});
  const [newDocument, setNewDocument] = useState('');
  const [documents, setDocuments] = useState({});
  const [editingCommentIndex, setEditingCommentIndex] = useState(null);
  const [editCommentText, setEditCommentText] = useState('');
  const [correlators, setCorrelators] = useState([]);
  const [scrollHintVisible, setScrollHintVisible] = useState(false);
  const [inputText, setInputText] = useState('');
  const [displayedText, setDisplayedText] = useState('');
  const [showComunicazione, setShowComunicazione] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editCheckpointIndex, setEditCheckpointIndex] = useState(null);
  const [editCheckpointTitle, setEditCheckpointTitle] = useState('');
  const [editCheckpointDescription, setEditCheckpointDescription] = useState('');
  const [newCheckpointDueDate, setNewCheckpointDueDate] = useState('');
  const [editCheckpointDueDate, setEditCheckpointDueDate] = useState('');
  const [newCheckpointError, setNewCheckpointError] = useState('');
  const [editCheckpointError, setEditCheckpointError] = useState('');
  const containerRef = useRef(null);

    /* Membri functions */
        const handleAddCorrelator = (email) => {
            setCorrelators((prevCorrelators) => [...prevCorrelators, email]);
        };

        const handleRemoveCorrelator = (index) => {
            setCorrelators((prevCorrelators) => prevCorrelators.filter((_, i) => i !== index));
          };
    
    /* Visualizza Pagine Unitesi function */

    /* Checkpoint functions */ 

    const handleCheckpointClick = (index) => {
        setSelectedCheckpoint((prevSelected) => {
          if (prevSelected === index) {
            setOpenRectangles((prevState) => ({
              ...prevState,
              [index]: !prevState[index],
            }));
            return null;
          } else {
            setOpenRectangles((prevState) => ({
              ...prevState,
              [index]: true,
              [prevSelected]: false,
            }));
            return index;
          }
        });
        };
    
    const handleAddCheckpoint = () => {
        setShowAddModal(true);
        };

    const handleConfirmAddCheckpoint = () => {
        const today = new Date().toISOString().split('T')[0];
        if (newCheckpointTitle && newCheckpointDescription && newCheckpointDueDate) {
          if (newCheckpointDueDate >= today) {
            const newCheckpoint = {
              index: checkpoints.length + 1,
              title: newCheckpointTitle,
              description: newCheckpointDescription,
              dueDate: newCheckpointDueDate,
              radius: 50,
              validated: false,
              comments: [],
              files: [],
            };
            setCheckpoints([...checkpoints, newCheckpoint]);
            setShowAddModal(false);
            setNewCheckpointTitle('');
            setNewCheckpointDescription('');
            setNewCheckpointDueDate('');
            setNewCheckpointError('');  // Reset error state
          } else {
            setNewCheckpointError('La data di scadenza non può essere precedente alla data di creazione della Pagina Unitesi.');
          }
        }
        };
    
    const handleCancelAddCheckpoint = () => {
        setShowAddModal(false);
        setNewCheckpointTitle('');
        setNewCheckpointDescription('');
        };
    
    const handleRemoveCheckpoint = (index) => {
    setCheckpoints((prevCheckpoints) => prevCheckpoints.filter((checkpoint) => checkpoint.index !== index));
    setSelectedCheckpoint(null);
    setCheckpoints((prevCheckpoints) =>
        prevCheckpoints.map((checkpoint, idx) => ({ ...checkpoint, index: idx + 1 }))
    );
        };

    const handleEditCheckpoint = (index) => {
    const checkpoint = checkpoints.find((cp) => cp.index === index);
    setEditCheckpointTitle(checkpoint.title);
    setEditCheckpointDescription(checkpoint.description);
    setEditCheckpointIndex(index);
    setShowEditModal(true);
        };

    const handleCancelEditCheckpoint = () => {
    setShowEditModal(false);
    setEditCheckpointTitle('');
    setEditCheckpointDescription('');
    setEditCheckpointIndex(null);
        };

    const handleConfirmEditCheckpoint = () => {
    const today = new Date().toISOString().split('T')[0];
    if (editCheckpointDueDate >= today) {
        setCheckpoints((prevCheckpoints) =>
        prevCheckpoints.map((checkpoint) =>
            checkpoint.index === editCheckpointIndex
            ? {
                ...checkpoint,
                title: editCheckpointTitle,
                description: editCheckpointDescription,
                dueDate: editCheckpointDueDate,
                }
            : checkpoint
        )
        );
        setShowEditModal(false);
        setEditCheckpointTitle('');
        setEditCheckpointDescription('');
        setEditCheckpointDueDate('');
        setEditCheckpointIndex(null);
        setEditCheckpointError('');  // Reset error state
    } else {
        setEditCheckpointError('La data di scadenza non può essere precedente alla data di creazione della Pagina Unitesi.');
    }
        }; 
            
    const handleValidate = (index) => {
        setCheckpoints((prevCheckpoints) =>
          prevCheckpoints.map((checkpoint) =>
            checkpoint.index === index ? { ...checkpoint, validated: !checkpoint.validated } : checkpoint
          )
        );
        };

    /* Comments functions */

    const handleAddCommentButtonClick = (index) => {
        handleAddComment(index, inputText);
        setInputText('');
        };

    const handleAddComment = (index, commentText) => {
        if (commentText.trim() !== '') {
          setCheckpoints((prevCheckpoints) =>
            prevCheckpoints.map((checkpoint) =>
              checkpoint.index === index
                ? { ...checkpoint, comments: [...checkpoint.comments, { text: commentText, author: 'Paolo Ciaccia', date: new Date().toLocaleString() }] }
                : checkpoint
            )
          );
        } else {
          // Gestisci il caso in cui il testo del commento sia vuoto
          console.error('Errore: il testo del commento non può essere vuoto!');
        }
        };
    
    const handleEditComment = (index, text) => {
    setEditingCommentIndex(index);
    setEditCommentText(text);
        };
    
    const handleConfirmEditComment = (index) => {
        setCheckpoints((prevCheckpoints) =>
        prevCheckpoints.map((checkpoint) =>
            checkpoint.index === selectedCheckpoint
            ? {
                ...checkpoint,
                comments: checkpoint.comments.map((comment, commentIndex) =>
                    commentIndex === index ? { ...comment, text: editCommentText } : comment
                ),
                }
            : checkpoint
        )
        );
        setEditingCommentIndex(null); // Chiudi l'input di modifica dopo la conferma
        setEditCommentText(''); // Resetta il testo di modifica
        };
    
    const handleRemoveComment = (index, commentIndex) => {
    setCheckpoints((prevCheckpoints) =>
        prevCheckpoints.map((checkpoint) =>
        checkpoint.index === index
            ? {
                ...checkpoint,
                comments: checkpoint.comments.filter((_, i) => i !== commentIndex),
            }
            : checkpoint
        )
    );
        };

    /* Documents functions */
    
    const handleAddDocument = (index, document) => {
        setCheckpoints((prevCheckpoints) =>
          prevCheckpoints.map((checkpoint) =>
            checkpoint.index === index ? { ...checkpoint, files: [...checkpoint.files, document] } : checkpoint
          )
        );
        };
      
    const handleRemoveDocument = (index, documentIndex) => {
        setCheckpoints((prevCheckpoints) =>
          prevCheckpoints.map((checkpoint) =>
            checkpoint.index === index
              ? { ...checkpoint, files: checkpoint.files.filter((_, i) => i !== documentIndex) }
              : checkpoint
          )
        );
        };
      
    const handleDownloadDocument = (documentUrl) => {
        // Logica per avviare il download del documento tramite l'URL specificato
        window.open(documentUrl, '_blank');
        };
  

  





  const handleSendMessage = () => {
    setShowComunicazione(false);
};

  





 

  useEffect(() => {
    if (containerRef.current) {
      const handleScroll = () => {
        if (containerRef.current.scrollTop > 0) {
          setScrollHintVisible(false);
        }
      };
      containerRef.current.addEventListener('scroll', handleScroll);
      return () => containerRef.current.removeEventListener('scroll', handleScroll);
    }
  }, [containerRef]);

  useEffect(() => {
    if (containerRef.current) {
      if (checkpoints.length > 0 && containerRef.current.scrollHeight > containerRef.current.clientHeight) {
        setScrollHintVisible(true);
      } else {
        setScrollHintVisible(false);
      }
    }
  }, [checkpoints, containerRef]);

  return (
    <div className={styles.appContainer}>
        <>
          <div className={styles.header}>
            <Image src="/images/LogoUnitesi_NoContorni..png" width="500" height="150" />
          </div>

          <div>
            <VisualizzaPagineUnitesiButton />
          </div>

          <div>
            <Membri
              name="Marco Patella"
              correlators={correlators}
              onAddCorrelator={handleAddCorrelator}
              onRemoveCorrelator={handleRemoveCorrelator}
            />
          </div>
          
          <div className={styles.roadmapContainer}>
            {!showCheckpoints && (
              <div
                className={styles.roadmapCircle}
                onClick={() => setShowCheckpoints(true)}
              >
                ROADMAP
              </div>
            )}
            {showCheckpoints && (
              <>
                <div className={styles.checkpointsContainer}>
                  {checkpoints.map((checkpoint, index) => (
                    <div key={index} className={styles.checkpointContainer}>
                      <Checkpoint
                        index={checkpoint.index}
                        title={checkpoint.title}
                        radius={checkpoint.radius}
                        validated={checkpoint.validated}
                        onClick={() => handleCheckpointClick(checkpoint.index)}
                        isOpen={openRectangles[checkpoint.index]} // Passa lo stato di apertura del rettangolo al componente Circle
                      />
                      {selectedCheckpoint === checkpoint.index && (
                        <div className={styles.rectangle}>
                          <div className={styles.descriptionTitle}>Descrizione</div>
                          <div className={styles.description}>{checkpoint.description}</div>
                          
                          <div className={styles.commentsSection}>
                            <div className={styles.commentTitle}>Commenti</div>
                            <div className={styles.commentList}>
                              {checkpoint.comments.map((comment, commentIndex) => (
                                <div key={commentIndex} className={styles.commentItem}>
                                  {editingCommentIndex === commentIndex ? (
                                    <div>
                                      <input
                                        type="text"
                                        value={editCommentText}
                                        onChange={(e) => setEditCommentText(e.target.value)}
                                      />
                                      <button onClick={() => handleConfirmEditComment(commentIndex)}>Conferma</button>
                                    </div>
                                  ) : (
                                    <>
                                      <span className={styles.commentText}>{comment.text}</span>
                                      <div className={styles.commentInfo}>
                                        {comment.author} - {comment.date}
                                      </div>
                                      {!checkpoint.validated && (
                                        <button
                                          className={styles.editButton}
                                          onClick={() => handleEditComment(commentIndex, comment.text)}
                                        >
                                          Modifica
                                        </button>
                                      )}
                                      {!checkpoint.validated && (
                                        <button
                                          className={styles.deleteButton}
                                          onClick={() => handleRemoveComment(checkpoint.index, commentIndex)}
                                        >
                                          Elimina
                                        </button>
                                      )}
                                    </>
                                  )}
                                </div>
                              ))}
                            </div>
                            {!checkpoint.validated && (
                              <div>
                                <input
                                  className={styles.inputComment}
                                  type="text"
                                  value={inputText}
                                  onChange={(e) => setInputText(e.target.value)}
                                  placeholder="Aggiungi un commento"
                                />
                                <button
                                  className={styles.addCommentButton}
                                  onClick={() => handleAddCommentButtonClick(checkpoint.index)}
                                >
                                  +
                                </button>
                              </div>
                            )}
                          </div>

                          <div className={styles.filesTitle}>Documenti</div>
                          <div className={styles.filesSection}>
                            <div>
                              {checkpoint.files.map((file, i) => (
                                <div key={i}>
                                  <span className={styles.document} onClick={() => handleDownloadDocument(file.url)}>{file.name}</span>
                                  {!checkpoint.validated && (
                                    <button className={styles.deleteDocument} onClick={() => handleRemoveDocument(checkpoint.index, i)}>Elimina</button>
                                  )}
                                </div>
                              ))}
                              {!checkpoint.validated && (
                                <>
                                 <input
                                  type="file"
                                  id="fileInput"
                                  onChange={(e) => handleAddDocument(checkpoint.index, e.target.files[0])}
                                  className={styles.fileInput}
                                />
                                <label htmlFor="fileInput" className={styles.customFileLabel}>
                                  Scegli file
                                </label>
                                </>
                              )}
                            </div>
                          </div>
                          

                          <div>
                          <button
                            className={styles.editCheckpointButton}
                            onClick={() => handleEditCheckpoint(checkpoint.index)}
                          >
                            Modifica Checkpoint
                          </button>
                          <button
                            className={styles.removeCheckpointButton}
                            onClick={() => handleRemoveCheckpoint(checkpoint.index)}
                          >
                            Rimuovi Checkpoint
                          </button>
                        </div>
                        <div>
                            <button
                              className={
                                checkpoint.validated
                                  ? styles.invalidateButton
                                  : styles.validateButton
                              }
                              onClick={() => handleValidate(checkpoint.index)}
                            >
                              {checkpoint.validated ? 'Invalidare' : 'Validare'}
                            </button>
                          </div>
                          <div className={styles.dueDate}>
                            <strong>Data di Scadenza:</strong> {checkpoint.dueDate}
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>

                {scrollHintVisible && <div className={styles.scrollHint}>Scroll down for more checkpoints</div>}

                <div className={styles.addCheckpointCircle} onClick={handleAddCheckpoint}>
                  +
                </div>
                {showAddModal && (
                  <div className={styles.modalBackground}>
                    <div className={styles.modalContainer}>
                      <label htmlFor="checkpointTitle">Titolo</label>
                      <input
                        type="text"
                        id="checkpointTitle"
                        value={newCheckpointTitle}
                        onChange={(e) => setNewCheckpointTitle(e.target.value)}
                      />
                      <label htmlFor="checkpointDescription">Descrizione</label>
                      <textarea
                        id="checkpointDescription"
                        value={newCheckpointDescription}
                        onChange={(e) => setNewCheckpointDescription(e.target.value)}
                      />
                      <label htmlFor="checkpointDueDate">Data di scadenza</label>
                      <input
                        type="date"
                        id="checkpointDueDate"
                        value={newCheckpointDueDate}
                        onChange={(e) => setNewCheckpointDueDate(e.target.value)}
                      />
                      {newCheckpointError && <div className={styles.errorMessage}>{newCheckpointError}</div>}
                      <button onClick={handleConfirmAddCheckpoint}>Conferma dati</button>
                      <button onClick={handleCancelAddCheckpoint}>Annulla</button>
                    </div>
                  </div>
                )}
              </>
            )}
          </div>
          {showCheckpoints && (
            <button className={styles.collapseButton} onClick={() => setShowCheckpoints(false)}>
              RACCOGLI
            </button>
          )}
          <div className={styles.endTesi}>
            <Image src="/images/terminaTesi.png" width="95" height="80" />
          </div>
          <div className={styles.communication} onClick={() => setShowComunicazione(true)}> {}
            <Image src="/images/comunicazione_unitesi.png" width="95" height="70" />
          </div>
          {showComunicazione && (
            <div className={styles.modalBackground}>
              <div className={styles.emailFormContainer}>
                <h2 className={styles.h2}>Invia Comunicazione</h2>
                <form>
                  <div className={styles.formGroup }>
                      <label htmlFor="email">Email Destinatario:  </label>
                      <input type="email" id="email" name="email" required />
                  </div>
                  <div className={styles.formGroup }>
                      <label htmlFor="subject">Oggetto:   </label>
                      <input type="text" id="subject" name="subject" required />
                  </div>
                  <div className={styles.formGroup}>
                      <label htmlFor="message">Corpo del Messaggio:   </label>
                      <br></br>
                      <textarea id="message" name="message" rows="10" cols="80" required></textarea>
                  </div>
                  <div className={styles.buttonContainer}>
                      <button className={styles.sendButton} type="button" onClick={handleSendMessage}>Invia Messaggio</button>
                  </div>
                </form>
              </div>
            </div>
          )}

          {showEditModal && (
            <div className={styles.modalBackground}>
              <div className={styles.modalContainer}>
                <label htmlFor="editCheckpointTitle">Titolo</label>
                <input
                  type="text"
                  id="editCheckpointTitle"
                  value={editCheckpointTitle}
                  onChange={(e) => setEditCheckpointTitle(e.target.value)}
                />
                <label htmlFor="editCheckpointDescription">Descrizione</label>
                <textarea
                  id="editCheckpointDescription"
                  value={editCheckpointDescription}
                  onChange={(e) => setEditCheckpointDescription(e.target.value)}
                />
                <label htmlFor="editCheckpointDueDate">Data di scadenza</label>
                <input
                  type="date"
                  id="editCheckpointDueDate"
                  value={editCheckpointDueDate}
                  onChange={(e) => setEditCheckpointDueDate(e.target.value)}
                />
                {editCheckpointError && <div className={styles.errorMessage}>{editCheckpointError}</div>}
                <button onClick={handleConfirmEditCheckpoint}>Conferma</button>
                <button onClick={handleCancelEditCheckpoint}>Annulla</button>
              </div>
            </div>
          )}
        </>
    </div>
  );
};

export default Roadmap;

                    