# Étape 1: Build de l'application
# MISE À JOUR ICI : On passe à une version plus récente de Node.js
FROM node:20-alpine AS builder
WORKDIR /app
# Copie package.json ET le lock file pour une installation reproductible
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Étape 2: Exécution de l'application en mode développement
# MISE À JOUR ICI : On utilise la même version de Node.js
FROM node:20-alpine
WORKDIR /app
# On copie les dépendances déjà installées
COPY --from=builder /app/node_modules ./node_modules
# On copie tout le code source
COPY . .

# On expose le port par défaut de Vite
EXPOSE 5173

# La commande pour démarrer le serveur de développement
# L'option --host est cruciale pour que le serveur soit accessible depuis l'extérieur du conteneur
CMD ["npm", "run", "dev", "--", "--host"]
