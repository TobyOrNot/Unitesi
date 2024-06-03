import styles from './InvioComunicazioneButton.css';
import Image from 'next/image';

function InvioComunicazioneButton() {

return (
        <div className={styles.communication}>
            <Image src ="/images/comunicazione_unitesi.png" width="95" height="70"/>
        </div>
    );
};

export default InvioComunicazioneButton;