"use client"

import React, { useState, useRef, useEffect } from 'react';
import Checkpoint from './checkpoint/Checkpoint';
import Membri from './checkpoint/membri/Membri';
import VisualizzaPagineUnitesi from './returnHome/ReturnHome';
import styles from './Roadmap.module.css'
import Image from 'next/image';
import { useRouter } from 'next/navigation';


const Roadmap = ({ pageId }) => {
  const [showCheckpoints, setShowCheckpoints] = useState(false);
  const [selectedCheckpoint, setSelectedCheckpoint] = useState(null);
  const [openRectangles, setOpenRectangles] = useState({});
  const [newDocument, setNewDocument] = useState('');
  const [documents, setDocuments] = useState({});
  
  const [scrollHintVisible, setScrollHintVisible] = useState(false);
  const [inputText, setInputText] = useState('');
  const [displayedText, setDisplayedText] = useState('');
  const [showComunicazione, setShowComunicazione] = useState(false);

  const [editingCommentIndex, setEditingCommentIndex] = useState(null);
  const [editCommentText, setEditCommentText] = useState('');

  const [studentEmail, setStudentEmail] = useState('');
  const [correlators, setCorrelators] = useState([]);
  const [relatorEmail, setRelatorEmail] = useState('');


  const [checkpoints, setCheckpoints] = useState([]);
  const [editingIndex, setEditingIndex] = useState(null);
  const [newCheckpoint, setNewCheckpoint] = useState({
    titolo: '',
    descrizione: '',
    dataScadenza: '',
    commenti: [],
    documenti: [],
    validato: false
  });
  const containerRef = useRef(null);
  const raggio = 50;
  const router = useRouter();

  useEffect(() => {
    const fetchRoadmapData = async (pageId) => {
      try {
        const response = await fetch(`http://localhost:3002/api/paginaunitesi/${pageId}`);
        if (!response.ok) {
          throw new Error('Failed to load roadmap data');
        }
        const data = await response.json();
        setCheckpoints(data.checkpoints);
        setStudentEmail(data.studenteEmail);
        setRelatorEmail(data.relatoreEmail);
        setCorrelators(data.correlatoriEmail);
      } catch (error) {
        console.error('Error loading roadmap data:', error);
      }
    };
  
    if (pageId) {
      fetchRoadmapData(pageId);
    }
  }, [pageId]);

  const fetchComments = async (checkpointId) => {
    try {
      const response = await fetch(`http://localhost:3002/api/paginaunitesi/${pageId}/checkpoint/${checkpointId}/comments`);
      if (!response.ok) {
        throw new Error('Failed to fetch comments');
      }
      const comments = await response.json();
      console.log(comments);
      // Aggiorna lo stato dei commenti per il checkpoint selezionato
      setCheckpoints(prevCheckpoints => {
        return prevCheckpoints.map(checkpoint => {
          if (checkpoint._id === checkpointId) {
            return {
              ...checkpoint,
              commenti: comments
            };
          }
          return checkpoint;
        });
      });

      console.log(checkpoints);
    } catch (error) {
      console.error('Error fetching comments:', error);
    }
  };

    /* Visualizza Pagine Unitesi function */

    /* Checkpoint functions (ADD, REMOVE, EDIT)*/ 

    const handleCheckpointClick = async (index) => {
      setSelectedCheckpoint(prevSelected => {
        if (prevSelected === index) {
          setOpenRectangles(prevState => ({
            ...prevState,
            [index]: !prevState[index],
          }));
          return null;
        } else {
          setOpenRectangles(prevState => ({
            ...prevState,
            [index]: true,
            [prevSelected]: false,
          }));
          return index;
        }
      });
  
      // Ottieni l'ID del checkpoint selezionato
      const checkpointId = checkpoints[index - 1]._id;
      // Chiamata per recuperare i commenti del checkpoint selezionato
      await fetchComments(checkpointId);
    };

    /* Comments functions */

    const handleAddCommentButtonClick = (index) => {
        handleAddComment(index, inputText);
        setInputText('');
    };

    const handleAddComment = async (checkpointIndex, comment) => {
      try {
        checkpointIndex = checkpointIndex - 1;
        const checkpointId = checkpoints[checkpointIndex]._id;

        const response = await fetch(`http://localhost:3002/api/paginaunitesi/${pageId}/checkpoint/${checkpointId}/addComment`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ 
              contenuto: comment,
              autore: 'NomeAutore',
              data: new Date()
            })
        });

        if (!response.ok) {
          throw new Error('Failed to add comment');
        }
        const updatedCheckpoint = await response.json();
        setCheckpoints((prevCheckpoints) =>
          prevCheckpoints.map((checkpoint, i) =>
            i === checkpointIndex ? updatedCheckpoint : checkpoint
          )
        );

        await fetchComments(checkpointId);
      } catch (error) {
        console.error('Error adding comment:', error);
      }
    };
    
    const handleEditComment = (index, text) => {
        setEditingCommentIndex(index);
        setEditCommentText(text);
    };
    
    const handleConfirmEditComment = async (commentIndex) => {
      try {
          var checkpointIndex = selectedCheckpoint -1;
          commentIndex = editingCommentIndex;
          const checkpointId = checkpoints[checkpointIndex]._id;
          const commentId = checkpoints[checkpointIndex].commenti[commentIndex]._id;
          const response = await fetch(`http://localhost:3002/api/paginaunitesi/${pageId}/checkpoint/${checkpointId}/editComment/${commentId}`, {
              method: 'PUT',
              headers: {
                  'Content-Type': 'application/json'
              },
              body: JSON.stringify({
                  contenuto: editCommentText
              })
          });

          if (!response.ok) {
              throw new Error('Failed to edit comment');
          }

          const updatedComment= await response.json();

          setCheckpoints((prevCheckpoints) =>
            prevCheckpoints.map((checkpoint, i) =>
              i === checkpointIndex
                ? {
                    ...checkpoint,
                    commenti: checkpoint.commenti.map((comment, j) =>
                      j === commentIndex ? updatedComment : comment
                    )
                  }
                : checkpoint
            )
          );

          setEditingCommentIndex(null); // Chiudi l'input di modifica dopo la conferma
          setEditCommentText(''); // Resetta il testo di modifica
          await fetchComments(checkpointId);
      } catch (error) {
          console.error('Error editing comment:', error);
      }
    };

    const handleRemoveComment = async (checkpointIndex, commentIndex) => {
      try {
          console.log(commentIndex);
          checkpointIndex = checkpointIndex - 1;
          const checkpointId = checkpoints[checkpointIndex]._id;
          const commentId = checkpoints[checkpointIndex].commenti[commentIndex]._id;
          const response = await fetch(`http://localhost:3002/api/roadmap/${pageId}/checkpoint/${checkpointId}/removeComment/${commentId}`, {
              method: 'DELETE'
          });
          if (!response.ok) {
              throw new Error('Failed to remove comment');
          }
          const updatedCheckpoint = await response.json();
          setCheckpoints((prevCheckpoints) =>
              prevCheckpoints.map((checkpoint, i) =>
                  i === checkpointIndex ? updatedCheckpoint : checkpoint
              )
          );
          await fetchComments(checkpointId);
      } catch (error) {
          console.error('Error removing comment:', error);
      }
    };

    /* Documents functions */
    
    const handleAddDocument = async (checkpointIndex, document) => {
      try {
        checkpointIndex = checkpointIndex - 1;
        console.log(document);
  
        const checkpointId = checkpoints[checkpointIndex]._id;
        const response = await fetch(`http://localhost:3002/api/paginaunitesi/${pageId}/checkpoint/${checkpointId}/addDocument`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ 
            nome: document
          })
        });
        if (!response.ok) {
          throw new Error('Failed to add document');
        }
        const updatedCheckpoint = await response.json();
        setCheckpoints((prevCheckpoints) =>
          prevCheckpoints.map((checkpoint, i) =>
            i === checkpointIndex ? updatedCheckpoint : checkpoint
          )
        );
      } catch (error) {
        console.error('Error adding document:', error);
      }
    };
      
    const handleRemoveDocument = async (checkpointIndex, document) => {
      try {
          checkpointIndex = checkpointIndex - 1;
          const checkpointId = checkpoints[checkpointIndex]._id;
  
          const response = await fetch(`http://localhost:3002/api/roadmap/${pageId}/checkpoint/${checkpointId}/removeDocument/${document}`, {
              method: 'DELETE'
          });
  
          if (!response.ok) {
              throw new Error('Failed to remove document');
          }
  
          const updatedCheckpoint = await response.json();
  
          // Aggiorna lo stato locale dei checkpoints
          setCheckpoints(prevCheckpoints =>
              prevCheckpoints.map((checkpoint, i) =>
                  i === checkpointIndex ? updatedCheckpoint : checkpoint
              )
          );
      } catch (error) {
          console.error('Error removing document:', error);
      }
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
            <Image src="/images/unitesi_logo.png" width="500" height="150" />
          </div>

          <div className={styles.backButton} onClick={() => router.push('/studente/homePage')}>
            <VisualizzaPagineUnitesi />
          </div>

          <div>
            <div className={styles.membriContainer}>
                <h2>Relatore: {relatorEmail} </h2>
                <div className={styles.correlatorsContainer}>
                  <h3>Correlatori</h3>
                  {correlators && correlators.map((correlator, index) => (
                    <div key={index} className={styles.correlatorItem}>
                      {correlator}
                    </div>
                  ))}
                </div>
              </div>
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
                        title={checkpoint.titolo}
                        radius ={raggio}
                        validated={checkpoint.validato}
                        onClick={() => handleCheckpointClick(checkpoint.index)}
                        isOpen={openRectangles[checkpoint.index]} 
                      />
                      {selectedCheckpoint === checkpoint.index && (
                        <div className={styles.rectangle}>
                          <div className={styles.descriptionTitle}>Descrizione</div>
                          <div className={styles.description}>{checkpoint.descrizione}</div>
                          
                          <div className={styles.commentsSection}>
                            <div className={styles.commentTitle}>Commenti</div>
                            <div className={styles.commentList}>
                              {checkpoint.commenti.map((comment, commentIndex) => (
                                <div key={commentIndex} className={styles.commentItem}>
                                  {(
                                      editingCommentIndex === commentIndex ? (
                                          <div>
                                              <input
                                                  type="text"
                                                  value={editCommentText}
                                                  onChange={(e) => setEditCommentText(e.target.value)}
                                              />
                                              <button onClick={() => handleConfirmEditComment(checkpoint.index, commentIndex)}>Conferma</button>
                                          </div>
                                      ) : (
                                          <>
                                              <span className={styles.commentText}>{comment.contenuto}</span>
                                              <div className={styles.commentInfo}>
                                                  {comment.autore} - {comment.data}
                                              </div>
                                              {!checkpoint.validato && (
                                                  <button
                                                      className={styles.editButton}
                                                      onClick={() => handleEditComment(commentIndex, comment.contenuto)}
                                                  >
                                                      Modifica
                                                  </button>
                                              )}
                                              {!checkpoint.validato && (
                                                  <button
                                                      className={styles.deleteButton}
                                                      onClick={() => handleRemoveComment(checkpoint.index, commentIndex)}
                                                  >
                                                      Elimina
                                                  </button>
                                              )}
                                          </>
                                      )
                                  ) }
                                </div>
                              ))}
                            </div>
                            {!checkpoint.validato && (
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
                              {checkpoint.documenti.map((document, documentIndex) => (
                                <div key={documentIndex}>
                                  <span className={styles.document}>{document}</span>
                                  {!checkpoint.validato && (
                                    <button className={styles.deleteDocument} onClick={() => handleRemoveDocument(checkpoint.index, document)}>Elimina</button>
                                  )}
                                </div>
                              ))}
                              {!checkpoint.validato && (
                                <>
                                 <input
                                  type="file"
                                  id="fileInput"
                                  onChange={(e) => handleAddDocument(checkpoint.index, e.target.files[0].name)}
                                  className={styles.fileInput}
                                />
                                <label htmlFor="fileInput" className={styles.customFileLabel}>
                                  Scegli file
                                </label>
                                </>
                              )}
                            </div>
                          </div>
                          <div className={styles.dueDate}>
                            <strong>Data di Scadenza:</strong> {checkpoint.dataScadenza}
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>

                {scrollHintVisible && <div className={styles.scrollHint}>Scroll down for more checkpoints</div>}
              </>
            )}
          </div>
          {showCheckpoints && (
            <button className={styles.collapseButton} onClick={() => setShowCheckpoints(false)}>
              RACCOGLI
            </button>
          )}

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
        </>
    </div>
  );
};

export default Roadmap;

                    