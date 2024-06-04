import React from 'react';
import styles from './Roadmap.module.css';

const Comments = ({
  selectedCheckpoint,
  checkpoints,
  handleAddCommentButtonClick,
  inputText,
  setInputText,
  handleEditComment,
  handleConfirmEditComment,
  handleRemoveComment,
  editingCommentIndex,
  editCommentText,
  setEditCommentText
}) => {
  return (
    <div>
      {selectedCheckpoint !== null && (
        <div>
          <h2>Commenti</h2>
          <ul className={styles.comments}>
            {checkpoints[selectedCheckpoint].comments.map((comment, commentIndex) => (
              <li key={commentIndex}>
                {editingCommentIndex === commentIndex ? (
                  <div>
                    <textarea
                      value={editCommentText}
                      onChange={(e) => setEditCommentText(e.target.value)}
                    />
                    <button onClick={() => handleConfirmEditComment(commentIndex)}>Conferma</button>
                  </div>
                ) : (
                  <div>
                    <p>{comment.text}</p>
                    <p>Autore: {comment.author}</p>
                    <p>Data: {comment.date}</p>
                    <button onClick={() => handleEditComment(commentIndex, comment.text)}>Modifica</button>
                    <button onClick={() => handleRemoveComment(selectedCheckpoint, commentIndex)}>Rimuovi</button>
                  </div>
                )}
              </li>
            ))}
          </ul>
          <div className={styles.addComment}>
            <textarea
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
            />
            <button onClick={() => handleAddCommentButtonClick(selectedCheckpoint)}>Aggiungi Commento</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Comments;
