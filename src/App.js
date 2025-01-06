// Importation du fichier de style générale
import './App.css';

// Importation du fichier de style du morpion
import "./tic_tac_toe.css";

// Importation de la fonction useState de React
import {useState} from "react";


// Composant enfant Carré
function Square({value, onSquareClick}){
  return <button className="carre" onClick={onSquareClick}>{value}</button>
}


// Composant parent Plateau
function Board({isX_Next, squares, onPlay}) {
  // Variable d'état du statut de la partie
  const [statut, setStatut] = useState("Joueur en cours : X");

  // Fonction de traitement des cliques sur les carrés
  function handleClick(i)
  {
    // Si le carré est déjà plein ou qu'il y a un gagnant
    if(squares[i] == "X" || squares[i] == "O" || déterminerVainqueur(squares))
    { 
      // Mettre fin à la fonction
      return;
    }

    // Création d'une copie de l'array squares
    let squaresCopy = squares.slice();

    // Assigner X ou O à la copie cliquée en fonction du tour
    squaresCopy[i] = isX_Next ? "X" : "O";

    // Prendre les valeurs de la copie de l'array et les utiliser comme valeurs pour le vrai array
    onPlay(squaresCopy);

    // Variable du gagnant
    let gagnant = déterminerVainqueur(squaresCopy);

    // S'il y a un gagnant
    if(gagnant)
    {
      // Mettre à jour la variable statut et afficher le gagnant
      setStatut("Gagnant: " + gagnant);
      
    }

    // S'il n'y a pas encore de gagnant
    else
    {
      // Mettre à jour la variable statut et afficher le tour en cours
      setStatut("Joueur en cours: " + (isX_Next ? "O" : "X"));
    }
  }

  /*
   <> s'appelle "opening fragment tag",
   </> s'appelle "closing fragment tag".
  */

  return (
        <>

            {/* Statut de la partie */}
            <div className="statut">{statut}</div>

            {/* Rangées de trois carrés du plateau */}
            <div className="rangee">
                                                       {/* arrow functions */}
              <Square value={squares[0]} onSquareClick={() => handleClick(0)}/>
              <Square value={squares[1]} onSquareClick={() => handleClick(1)}/>
              <Square value={squares[2]} onSquareClick={() => handleClick(2)}/>
            </div>

            <div className="rangee">
              <Square value={squares[3]} onSquareClick={() => handleClick(3)}/>
              <Square value={squares[4]} onSquareClick={() => handleClick(4)}/>
              <Square value={squares[5]} onSquareClick={() => handleClick(5)}/>
            </div>

            <div className="rangee">
              <Square value={squares[6]} onSquareClick={() => handleClick(6)}/>
              <Square value={squares[7]} onSquareClick={() => handleClick(7)}/>
              <Square value={squares[8]} onSquareClick={() => handleClick(8)}/>
            </div>

          </>);
}

// Fonction pour voir s'il y a un gagnant
function déterminerVainqueur(squares)
{
  // Lignes gagnantes
  const lignes = 
  [
    // Alignements horizontaux
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],

    // Alignements verticaux
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],

    // Alignements en diagonal
    [0, 4, 8],
    [2, 4, 6],
  ];

  // Pour toutes les lignes gagnantes
  for(let l = 0; l < lignes.length; l++)
  {
    // Ligne du groupe de lignes gagnantes
    const [a, b, c] = lignes[l];

    if(squares[a] && squares[a] === squares[b] && squares[b] === squares[c])
    {
      return squares[a];
    }
  }

  // Égalité
  return null;
}

// Fonction pour stocker l'état du plateau à chaque tour
export default function Game()
{
  // État du tour en cours
  const [currMove, setCurrMove] = useState(0);
  
  // État "Au tour de X", vrai par défaut
  const isX_Next = currMove % 2 === 0;

  // État de l'historique du jeu, un array de taille 9 car il y a 9 cases donc 9 tours max
  const [history, setHistory] = useState([Array(9).fill(null)]);

  // État du jeu au dernier tour
  const currSquares = history[currMove];

  // Fonction pour traiter le tour
  function handlePlay(squaresCopy)
  {
    const nextHistory = [...history.slice(0, currMove+1), squaresCopy];
    setHistory(nextHistory);
    setCurrMove(nextHistory.length-1);
  }

  // Fonction pour ramener l'état du plateau à un tour précédent
  function jumpTo(nextMove)
  {
    setCurrMove(nextMove);
  }

  const tours = history.map((squares, tour) => {
    let description = tour > 0 ? `Revenir au tour #${tour}` : "Revenir au 1er tour";

    return(
      <li key={tour}>
        <button onClick={() => jumpTo(tour)}>{description}</button>
      </li>
    );
  } );

  return(
    <div className="game">

      <div className="game_board">
          <Board isX_Next={isX_Next} squares={currSquares} onPlay={handlePlay}/>
      </div>


      <div className="game_info">
          {/* Liste des tours */}
          <ol>{tours}</ol>
      </div>

    </div>
  );
}