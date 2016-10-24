# Code for Console ulang V2

### Installation
- Install github [Link](https://github.com/blog/1510-installing-git-from-github-for-mac)
- Install NodeJs [Link](https://nodejs.org/en/download/)

### Commands
- git clone https://github.com/agubua007/console.git
- cd console
- npm install
- gulp serve //For Testing
- gulp serve:dist // For Production


### Instructions
El maquetado de la consola esta sobre la carpeta:
- console\src\app\pages\ulang
Alli encontraremos el cuerpo de la aplicacion "ulang.html" con su archivo de configuracion "ulang.module.js" y las 4 secciones que componen a la misma:
- ulangIndicators
- ulangDisertations
- ulangTablets
- ulangTodo

Cada una de estas secciones contiene el codigo html "xxx.html", su controlador "xxxCtrl.js" y el arhivo de directivas "xxx.directive.js"
Actualmente el codigo html y el css estan sobre el archivo html, esto no debe quedar asi sino que deben usarse las carpetas "console\src\sass"
Cada controlador tiene el codigo javascript de la seccion, toda la lagica de la seccio debe estar en este archivo.
:-------------------------:|:-------------------------:
En la seccion de Tablets se encuentran los bocetos de la tablas para cuando se configura la consola y para cuando la disertacion se incio, solo una de estas tablas estara disponible en cada momento.
La seccion Indicators debe mostrarse en todo momento y debe tener link a la porcion de la pantalla que corresponda. (Se hablo de posicionar esto en todo momento a la detecha de la pantalla y que se mueva el contenido en la porcion de la pantalla restante).





This software is based on:

# BlurAdmin Angular admin panel front-end framework

Customizable admin panel framework made with :heart: by [Akveo team](http://akveo.com/). Follow us on [Twitter](https://twitter.com/akveo_inc) to get latest news about this template first!

### Demo
**[Mint version demo](http://akveo.com/blur-admin-mint/)**             |  **[Blur version demo](http://akveo.com/blur-admin/)**
:-------------------------:|:-------------------------:
![Mint version demo](http://i.imgur.com/A3TMviJ.png)  |  ![Blur version demo](http://i.imgur.com/EAoiK2O.jpg)

## Angular 2 version
Here you can find Angular2 based version: [ng2-admin](https://github.com/akveo/ng2-admin).

### Documentation
Installation, customization and other useful articles: https://akveo.github.io/blur-admin/

## How can I support developers?
- Star our GitHub repo
- Create pull requests, submit bugs, suggest new features or documentation updates
- Follow us on [Twitter](https://twitter.com/akveo_inc)
- Like our page on [Facebook](https://www.facebook.com/akveo/)

## Can I hire you guys?
Yes! We are available for hire. Visit [our homepage](http://akveo.com/) or simply leave us a note to contact@akveo.com. We will be happy to work with you!

## Features
* Responsive layout
* High resolution
* Bootstrap CSS Framework
* Sass
* Gulp build
* AngularJS
* Jquery
* Charts (amChart, Chartist, Chart.js, Morris)
* Maps (Google, Leaflet, amMap)
* etc

License
-------------
<a href=/LICENSE.txt target="_blank">MIT</a> license.

### From akveo

Enjoy!
We're always happy to hear your feedback.
