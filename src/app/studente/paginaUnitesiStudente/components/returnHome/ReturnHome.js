import styles from './returnHome.css';
import Image from 'next/image';

function ReturnHome() {

return (
        <div className={styles.pagineUnitesi}>
            <Image src ="/images/home_page.png" width="95" height="70"/>
        </div>
    );
};

export default ReturnHome;