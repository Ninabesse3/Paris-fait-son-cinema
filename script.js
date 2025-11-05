//Permet grâce à l'URL, quel est l'id de la carte, pour savoir de quelle carte il sagit.
const params = new URLSearchParams(window.location.search);
const id = params.get("id");

//Un tableau avec le détails de toutes les cartes.
const cartes = [
    {
        id: "1",
        titre: "Sous la Seine",
        image: "https://www.cinehorizons.net/sites/default/files/affiches/1892690602-sous-la-seine.jpg",
        texte: "Été 2024, Paris accueille pour la première fois les championnats du monde de triathlon sur la Seine. Sophia, brillante scientifique, est alertée par Mika, une jeune activiste dévouée à l'écologie, de la présence d'un grand requin dans les profondeurs du fleuve. Elles n'ont d'autre choix que de faire équipe avec Adil, commandant de la police fluviale pour éviter un bain de sang au cœur de la ville.",
        pins: [
            {coords: [48.82623, 2.36085], label: "lieu"},
        ],
        zoom: 16,
    },

     {
        id: "2",
        titre: "Les Trois mousquetaires : D'artagnan",
        image: "images/Les_trois_mousquetaires_d'Artagnan.jpg",
        texte: "Les Trois Mousquetaires raconte l'histoire de D'Artagnan, un jeune Gascon de 18 ans qui se rend à Paris pour devenir mousquetaire. Il se lie d'amitié avec Athos, Porthos et Aramis, les célèbres mousquetaires du roi Louis XIII, et ensemble, ils se battent pour défendre l'honneur et la justice dans un royaume divisé par les guerres de religion et menacé par l'Angleterre. Dans cette aventure, ils affrontent des complots politiques et des duels, tout en cherchant à protéger la reine.",
        pins: [
            {coords: [48.8425, 2.3393], label: "lieu 1"},
            {coords: [48.82623, 2.36085], label: "lieu 2"},
        ],
        zoom: 16,
    },

    {
        id: "3",
        titre: "Emily in Paris",
        image: "images/Emily_in_Paris.jpg",
        texte: "Emily Jane Cooper, une Américaine de Chicago, déménage à Paris, en France, suite à une promotion dans sa «boîte». En effet, la société de marketing où elle travaille vient d'acquérir Savoir, une société du même domaine basée en France, à laquelle l'agence d'Emily souhaite apporter une touche américaine.",
        pins: [
            {coords: [48.82623, 2.36085], label: "lieu"},
        ],
        zoom: 16,
    },
];
//Parcours le tableau de cartes pour trouver l'id de la carte
//  pour vérifier que c'est bien le même que l'id de l'URL.
const carte = cartes.find(c => c.id === id);

//Garder dans const container l'élèment avec  l'id card-details
// qui se trouve dans le fichier view.html.
const container = document.getElementById("card-details");

//Injecter dynamiquement les éléments de la carte dans le view.html.
if (carte) { // Verifie si l'objet carte existe.
    // Insère dynamiquement le contenu HTML dans le container.
    container.innerHTML = `
    <h2>${carte.titre}</h2>
    <img src="${carte.image}" alt="${carte.titre}" style="width:400px;">
    <p>${carte.texte}</p>
    <div id="map" style="width:400px;height:300px;margin-top:20px;border-radius:10px;"></div>
    `;

    //Initialise une map Leaflet.
    const map = L.map("map"); 
    //Récupère les coordonnées des pins pour chaque carte.
    const latlngs = carte.pins.map(pin => pin.coords);
    //Englobe et zoom sur les pins pour qu'ils soient tous visible.
    //avec de l'espace entre les pins et les côtés de la map.
    map.fitBounds(latlngs, {padding: [50, 50]});
    
    //Ajout du fond de map openstreetmap.
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    maxZoom: 19, //Zoom maximum autorisé.
    attribution: '© OpenStreetMap' //ajout de l'attribution de la map (mention légale).
  }).addTo(map);

  //Supprime le prefix "Leaflet".
  map.attributionControl.setPrefix(false);
  
  //Parcours chaque pin de la carte.
  carte.pins.forEach(pin => {
    //Crée un marqueur à ses coordonnées, l'ajoute à la map,
    //associe au marqueur une popup avec son label.
    L.marker(pin.coords).addTo(map).bindPopup(`${pin.label}`);
});

} else { //Si l'objet carte n'est pas trouvé.
    //Le texte s'affiche.
    container.innerHTML = "<p>Carte non trouvée.</p>";
}
