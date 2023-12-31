#Definimos el la version de node que tendrá mi contenedor
FROM node:16-bullseye
#Defino el directorio en donde se va a ejecutar mi configuración dentro del contenedor
WORKDIR /home/apps/imageurlgenerator
#Copio el archivo package.js para posteriormente instalar las dependencias de mi repositorio
# COPY package*.json ./
COPY . .
RUN npm install
#Instalo de manera global pm2
RUN npm install pm2 -g
#Copio todos los archivos de mi repositorio hacia WORKDIR
COPY . .
#Esta configuración hace que el puerto en donde voy a alojar mi aplicación pueda ser accedido
EXPOSE 3001
#Por último configuro los comandos que se van a ejecutar para poner arriba nuesra app
CMD ["pm2-runtime", "ecosystem.config.js", "--env", "production"]