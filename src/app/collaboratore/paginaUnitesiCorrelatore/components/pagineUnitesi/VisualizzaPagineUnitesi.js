import styles from './VisualizzaPagineUnitesi.css';
import Image from 'next/image';

function VisualizzaPagineUnitesi() {

return (
        <div className={styles.pagineUnitesi}>
            <Image src ="/images/archivio_icon.png" width="95" height="70"/>
        </div>
    );
};

export default VisualizzaPagineUnitesi;