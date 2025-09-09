# Étape 1: Build de l'application (Compilation)
FROM node:18-alpine AS builder

# Définit le dossier de travail à l'intérieur du conteneur
WORKDIR /usr/src/app

# Copie les fichiers de dépendances et installe les paquets
COPY package*.json ./
RUN npm install

# Copie tout le reste du code source
COPY . .

# Lance la commande pour compiler le projet TypeScript en JavaScript
RUN npm run build

# ---

# Étape 2: Exécution de l'application (Production)
FROM node:18-alpine

WORKDIR /usr/src/app

# Copie uniquement les fichiers nécessaires depuis l'étape de build
# C'est pour avoir une image finale beaucoup plus légère
COPY --from=builder /usr/src/app/package*.json ./
COPY --from=builder /usr/src/app/node_modules ./node_modules
COPY --from=builder /usr/src/app/dist ./dist

# La commande pour démarrer l'application quand le conteneur se lance
CMD ["npm", "run", "start:prod"]
