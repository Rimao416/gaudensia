import Navbar from "../components/Navbar";
import Gaudensia from "../assets/gaudensia.png"
import Bnr from "../assets/bnr2.jpg";
import Dishes from "../assets/restaurants-wrap-bg.png"
import Footer from "../components/Footer";
function About() {
  return (
    <div>
      <Navbar />
      <div className="about">
        <div className="about__header">
          {/* <img src={Testimonial} alt={Testimonial} className="about__testimonial"/> */}
          <img src={Bnr} alt={Bnr} className="about__banner" />
          <h1 className="about__title">À propos</h1>
        </div>
        <div className="about__body">
          <img src={Dishes} alt={Dishes} className="about__dishes"/>
          <div className="about__circle"></div>
          <div className="about__container">

          <div className="about__wrapper">
            <h1>Bienvenue chez Gaudensia</h1>
            <p>
              Découvrez des saveurs inoubliables à travers des meilleurs plats à
              GM CUISINE, un restaurant en ligne où nous explorons nos méthodes
              de cuisine uniques, où chaque plat est préparé avec passion et
              dévouement, pour offrir à nos clients une expérience culinaire
              exceptionnelle
            </p>

            <p>
              Originaire du Congo, Gaudensia est une véritable amoureuse de la
              gastronomie, non seulement congolaise mais aussi des saveurs du
              monde entier.
            </p>
            <p>
              Son parcours est une aventure captivante, jalonnée de découvertes
              et de traditions culinaires variées. Avec un cœur aussi chaleureux
              que les cuisines qu'elle transforme, Gaudensia insuffle à chaque
              plat une combinaison unique de passion, de créativité et de
              convivialité.
            </p>
            <p>Dans sa cuisine, elle ne se contente pas de préparer des repas ; elle crée des histoires, des souvenirs et un sentiment d'appartenance. Chaque recette est une invitation à explorer des saveurs inoubliables et à partager des moments précieux autour de la table.
            </p>
          
          </div>
          <div className="about__wrapper">
            <img src={Gaudensia} alt={Gaudensia}/>
          </div>
          </div>

        </div>
      </div>
      <Footer/>
    </div>
  );
}

export default About;
