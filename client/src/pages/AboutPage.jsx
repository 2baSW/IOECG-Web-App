function AboutPage() {
    return (
      <div className="p-8">
        <h1 className="text-2xl font-bold mb-4">À propos</h1>
        <p>
        L’électrocardiogramme (ECG) est un examen clé dans le diagnostic des troubles cardiaques, en mesurant les signaux électriques du cœur. Ces signaux, riches en informations, permettent d’évaluer le fonctionnement du cœur et de détecter d’éventuelles anomalies. Pourtant, une grande partie de ces données n’est pas pleinement exploitée en milieu clinique. Pour pallier ce manque, l’équipe du laboratoire UMMISCO de l’IRD a développé des algorithmes d’intelligence artificielle capables de détecter ces anomalies cardiaques.
        L’application IOECG Web App a été conçue pour intégrer ces modèles d’IA, permettant l’analyse des électrocardiogrammes de manière efficace et accessible. Elle offre aux utilisateurs, notamment médecins, chercheurs et ingénieurs, une plateforme unique pour charger des fichiers ECG, appliquer différents modèles d’intelligence artificielle et obtenir rapidement des résultats sur la détection d’anomalies. Cette approche facilite non seulement la détection des troubles cardiaques, mais aussi la visualisation des zones clés des signaux ECG, rendant le diagnostic et la compréhension plus aisés. Le tout se fait de manière entièrement en ligne, libérant les équipes médicales et de recherche des outils physiques et des techniciens qui seraient autrement nécessaires, et permettant aux professionnels de santé impliqués dans le processus d’en tirer le meilleur parti.
        </p>
      </div>
    );
  }
  
  export default AboutPage;
  