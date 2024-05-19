import styles from "./page.module.css";
import logo from '/home/tobias/Desktop/UNI/Ing Software/Progetto/Implementazione/unitesi/public/logo.png'


export default function ViewInviaComunicazione() {
  return (
    <div className="container">
        <header>
            <img src={logo} alt="Logo" className="logo" />
        </header>
        <main>
            <h1>Invia Comunicazione</h1>
            <form>
                <label htmlFor="email">Destinatario</label>
                <input type="email" id="email" name="email" required />

                <label htmlFor="subject">Oggetto</label>
                <input type="text" id="subject" name="subject" required />

                <label htmlFor="message">Messaggio</label>
                <textarea id="message" name="message" required></textarea>

                <button type="submit">Invia Messaggio</button>
            </form>
        </main>
    </div>
);
}