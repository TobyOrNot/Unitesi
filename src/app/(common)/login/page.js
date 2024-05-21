import styles from './login.module.css'
import Image from 'next/image'

export default function Login() {
  return (
    <div className={styles.body}>
    <Image src="/images/Group2.png" className={styles.image2} width="355" height="355"/>
    <div className={styles.container}>
    <Image src="/images/Group.png" className={styles.image1} width="355" height="355"/>
    <form className={styles.loginForm} >
      <div className="form-group">
        <input
          className='input1'
          type="text"
          placeholder='userame'
          required
        />
      </div>
      <div className="form-group">
        <input
          className='input2'
          type="password"
          id="password"
          placeholder='password'
          required
        />
      </div>
      <button className={styles.button} >Accedi</button>
    </form>
    </div>
    </div>
);
}

