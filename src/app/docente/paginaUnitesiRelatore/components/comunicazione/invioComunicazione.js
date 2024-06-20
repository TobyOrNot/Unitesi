import styles from './invioComunicazione.css';
import Image from 'next/image';

function invioComunicazione() {

return (
        <div className={styles.communication}>
            <Image src ="/images/comunicazione_icon.png" width="95" height="70"/>
        </div>
    );
};

export default invioComunicazione;