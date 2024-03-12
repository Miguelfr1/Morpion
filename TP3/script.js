
let tourJoueur = "blue";

let score1 = 0; 
let score2 = 0;

function CliqueCarre(carre) {
    if (!carre.classList.contains("estClique")) {
        carre.style.backgroundColor = tourJoueur;
        carre.classList.add("estClique");
        tourJoueur = (tourJoueur === "blue") ? "red" : "blue";
        document.getElementById("titrejeu").innerText = "Tour du joueur " + (tourJoueur === "blue" ? "bleu" : "rouge");

        if (verifierVictoire()) {
            document.getElementById("titrejeu").innerText = "Le joueur " + (tourJoueur === "blue" ? "rouge" : "bleu") + " a gagné !";
            
            desactiverClics();
        } else if (verifierEgalite()) {
            document.getElementById("titrejeu").innerText = "Égalité !";
            
        }
    }
}


function verifierVictoire() {
    
    for (let i = 0; i < 3; i++) {
        if (verifierLigne(i)) {
             
            verifierVainqueur();
            return true;
        }
    }
    
    for (let i = 0; i < 3; i++) {
        if (verifierColonne(i)) {
            for (let i = 0; i < 3; i++) {
                if (verifierColonne(i)) {
                    
                    verifierVainqueur();
                    return true;
                }
            }
            
            verifierVainqueur();
            return true;
        }
    }

   
    if (verifierDiagonalePrincipal()) {
       
      
        verifierVainqueur();
        return true;
    }

    if (verifierDiagonaleSecondaire()) {
       
        verifierVainqueur();
        return true;
    }
    return false;
}

function verifierVainqueur() {
    if (tourJoueur === "blue") {
        score1++;
    } else {
        score2++;
    }

    document.getElementById("score0").innerText = score1;
    document.getElementById("score1").innerText = score2;
}

function nouvellePartie() {
    
    let carres = document.querySelectorAll('.carre');
    carres.forEach(carre => {
        carre.style.backgroundColor = '';
        carre.classList.remove("estClique");
        carre.onclick = () => CliqueCarre(carre);
    });

    tourJoueur = "blue";
    document.getElementById("titrejeu").innerText = "Nouvelle Partie commencée ! Cliquez sur la grille pour jouer. \nTour du joueur bleu";
}

function verifierLigne(ligne) {
    return (
        (getValeurCase(ligne, 0) === getValeurCase(ligne, 1)) &&
        (getValeurCase(ligne, 1) === getValeurCase(ligne, 2)) &&
        (getValeurCase(ligne, 0) !== "")
    );
}

function verifierColonne(colonne) {
    return (
        (getValeurCase(0, colonne) === getValeurCase(1, colonne)) &&
        (getValeurCase(1, colonne) === getValeurCase(2, colonne)) &&
        (getValeurCase(0, colonne) !== "")
    );
}

function verifierDiagonalePrincipal() {
    return (
        (getValeurCase(0, 0) === getValeurCase(1, 1)) &&
        (getValeurCase(1, 1) === getValeurCase(2, 2)) &&
        (getValeurCase(0, 0) !== "")
    );
}

function verifierDiagonaleSecondaire() {
    return (
        (getValeurCase(0, 2) === getValeurCase(1, 1)) &&
        (getValeurCase(1, 1) === getValeurCase(2, 0)) &&
        (getValeurCase(0, 2) !== "")
    );
}

function getValeurCase(ligne, colonne) {
    return document.getElementById("gameGrid").children[ligne * 3 + colonne].style.backgroundColor;
}

function verifierEgalite() {
   
    let carres = document.querySelectorAll('.carre');
    for (let carre of carres) {
        if (!carre.classList.contains("estClique")) {
            return false;
        }
    }
    return true;
}

function desactiverClics() {
    
    let carres = document.querySelectorAll('.carre');
    carres.forEach(carre => {
        carre.onclick = null;
    });
}



