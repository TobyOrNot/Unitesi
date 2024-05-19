import styles from "./page.module.css";

export default function ViewInviaComunicazione() {
  return (
    <form action="send_email.php" method="post">
      <label htmlFor="firstName">Email Destinatario</label>
      <input type="text" id="firstName" name="firstName" required />
      <br />

      <label htmlFor="email">Oggetto</label>
      <input type="email" id="email" name="email" required />
      <br />

      <label htmlFor="message">Messaggio:</label>
      <textarea id="message" name="message" required></textarea>
      <br />

      <input type="submit" value="Send" />
    </form>
  );
}