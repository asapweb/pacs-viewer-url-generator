# hemosoft-pacs-viewer-url-generator


## Instalación

Clonar el repositorio
<pre>
    git clone git@github.com:asapweb/pacs-viewer-url-generator.git
</pre>

Crear archivo .env

<pre>
    mv .env.example .env
</pre>

Configurar las variables 

<pre>
    // .env file
    POSTGRES_HOST=200.127.57.176
    POSTGRES_DB=pacsdb
    POSTGRES_USER=pacs
    POSTGRES_PASSWORD=pacs
    VIEWER_URL=http://imagenes.hemodinamiadelsur.com:3000/viewer/
</pre>

Crear el contenedor
<pre>
docker-compose build
docker-compose up
</pre>

Acceder al sitio 
http://localhost:3001/api/study/urlByAccessionNumber?an=
