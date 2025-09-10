import { useState } from 'react';
import axios from 'axios';

// On définit une interface pour les "props" (paramètres) du composant
interface AuthFormProps {
  onLoginSuccess: (token: string) => void;
}

const AuthForm = ({ onLoginSuccess }: AuthFormProps) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);

  const handleRegister = async () => {
    setError(null);
    try {
      await axios.post('http://localhost:3000/auth/register', { email, password });
      alert('Inscription réussie ! Vous pouvez maintenant vous connecter.');
    } catch (err: any) {
      const errorMessage = err.response?.data?.message || 'Une erreur est survenue';
      // On traduit les messages d'erreur du backend en français
      if (errorMessage.includes('already exists')) {
        setError('Cet email est déjà utilisé.');
      } else if (errorMessage.includes('valid email')) {
        setError('Veuillez entrer une adresse email valide.');
      } else {
        setError('Erreur lors de l\'inscription.');
      }
    }
  };

  const handleLogin = async () => {
    setError(null);
    try {
      const response = await axios.post('http://localhost:3000/auth/login', { email, password });
      if (response.data.access_token) {
        onLoginSuccess(response.data.access_token);
      }
    } catch (err: any) {
      setError('Email ou mot de passe incorrect.');
    }
  };

  return (
    <div>
      <h2>Connexion / Inscription</h2>
      <div>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
        />
      </div>
      <div>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Mot de passe (8 caractères min)"
        />
      </div>
      <button onClick={handleLogin}>Se connecter</button>
      <button onClick={handleRegister}>S'inscrire</button>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
};

export default AuthForm;