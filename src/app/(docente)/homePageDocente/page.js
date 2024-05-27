import Link from 'next/link';
import './homePage.css';

const HomePage = () => {
  const professorEmail = 'professor@example.com';

  return (
    <div>
      <header>
      <div class="overlay">
         <h1>Home Page Docente</h1>
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
