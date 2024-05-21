import './PaginaUnitesiRelatore.css'

export default function PaginaUnitesiRelatore() {
  return (
    <>
        <Header />
        <Roadmap />
    </>
);
}



function Header() {
  return (
    <header className='header'>
  <h1>TitoloTesi</h1>
  <h2>Membri della pagina:</h2>
</header>
);
}


function Roadmap() {
  return (
  <section className='roadmap'>
    <h2>ROADMAP</h2>
    <Checkpoint />
    <Checkpoint />
    <Checkpoint />
  </section>
);
}


function Checkpoint() {
  return (
  <button className='checkpoint' type="reset">Checkpoint</button>
);
}




