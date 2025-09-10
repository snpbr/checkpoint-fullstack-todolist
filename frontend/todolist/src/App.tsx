
// function App() {
  

//   return (
//     <>
//       <h1>Checkpoint To-Do List</h1>
//       <p>Le frontend est bien démarré !</p>
//     </>
//   );
// }

// export default App;

import { useState } from 'react';
import AuthForm from './components/AuthForm';

function App() {
  // On utilise un "state" pour garder en mémoire le token de l'utilisateur
  // Si le token est null, l'utilisateur n'est pas connecté.
  const [token, setToken] = useState<string | null>(null);

  // Cette fonction sera appelée par AuthForm quand la connexion réussit
  const handleLoginSuccess = (newToken: string) => {
    setToken(newToken);
  };

  const handleLogout = () => {
    setToken(null);
  };

  return (
    <div>
      <h1>Checkpoint To-Do List</h1>
      
      {/* C'est le rendu conditionnel : */}
      {!token ? (
        // Si PAS de token, on affiche le formulaire de connexion
        <AuthForm onLoginSuccess={handleLoginSuccess} />
      ) : (
        // Si on A un token, on affiche la suite
        <div>
          <p>Vous êtes connecté !</p>
          <button onClick={handleLogout}>Se déconnecter</button>
          {/* On mettra la liste des tâches ici plus tard */}
        </div>
      )}
    </div>
  );
}

export default App;
