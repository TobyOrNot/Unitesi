import './LoginContainer.css'
import Image from 'next/image'

export default function LoginView() {
  return (
    <>
    <Image src="/images/Group2.png" className='image2' width="355" height="355"/>
    <div className="LoginContainer">
    <Image src="/images/Group.png" className='image1' width="355" height="355"/>
    <form className="login-form" >
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
      <button className="button" >Accedi</button>
    </form>
    </div>
    </>
);
}

