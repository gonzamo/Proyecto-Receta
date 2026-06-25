FROM node:22-alpine

# Carpeta de trabajo dentro del contenedor
WORKDIR /app

# Copiamos package.json primero (mejor caché)
COPY package*.json ./

# Instalamos dependencias
RUN npm install

# Copiamos la carpeta backend
COPY . .

# Puerto del servidor
EXPOSE 3000

# Comando de arranque
CMD ["npm", "run", "dev"]