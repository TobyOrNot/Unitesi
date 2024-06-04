import styles from './TerminaTesiButton.css';
import Image from 'next/image';

function TerminaTesiButton() {

return (
        <div className={styles.endTesi}>
            <Image src ="/images/terminaTesi.png" width="95" height="80"/>
        </div>
    );
};

export default TerminaTesiButton;