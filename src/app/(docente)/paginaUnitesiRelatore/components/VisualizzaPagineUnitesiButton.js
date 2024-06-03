import styles from './VisualizzaPagineUnitesiButton.css';
import Image from 'next/image';

function VisualizzaPagineUnitesiButton() {

return (
        <div className={styles.pagineUnitesi}>
            <Image src ="/images/archivio.png" width="95" height="70"/>
        </div>
    );
};

export default VisualizzaPagineUnitesiButton;