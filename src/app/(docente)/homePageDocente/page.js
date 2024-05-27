import Link from 'next/link';
import './homePage.css';
import Image from 'next/image'

const HomePage = () => {
  const professorEmail = 'marco.patella@unibo.it';

  return (
    <div class="immagineSfondo">
    <Image src="/images/cappellino.png"  class="cappellino" width="100" height="100" />
      <header>
      <div class="overlay">
         <h1>Home Page</h1>
           <h3>{professorEmail}</h3>
	      <br></br>
      <nav>
        <ul>
          <li>
            <Link href="/homePage">HomePage</Link>
          </li>
          <li>
            <Link href="/visualizzaPagineUnitesiDocente">Visualizza Pagine Unitesi</Link>
          </li>
          <li>
            <Link href="/comunicazione">Comunicazione</Link>
          </li>
        </ul>
      </nav>
		</div>
      </header>
      <br></br>
    </div>
  );
};

export default HomePage;
