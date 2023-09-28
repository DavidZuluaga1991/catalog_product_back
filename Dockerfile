# Usa la imagen base de Node.js
FROM node

# Establece el directorio de trabajo dentro del contenedor
WORKDIR /app

# Copia los archivos de configuración y listado de dependencias
COPY package*.json tsconfig.json /app/
COPY src /app/src

# Instala las dependencias
RUN npm install

# Compila TypeScript
RUN npm run build

# Copia el resto de los archivos de la aplicación
COPY . /app/

# Comando para iniciar la aplicación
CMD ["node", "dist/index.js"]