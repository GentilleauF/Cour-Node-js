# Installer express
npm install express --save  

# Installer nodemon
npm install nodemon --save-dev  

# Installe la dependance Nodemon 
npm install morgan --save-dev  

# Installer le midleware favicon
npm install serve-favicon --save  

# Middleware pour parser le body json
npm install body-parser --save

# Installer l'ORM sequelize
npm install sequelize --save
# Installation du driver pour effectuer la connexion à la BDD
npm install mariadb --save


# Validator
Permettent de verifier le contenu de la requete avant d'envoyer en BDD

# Contraintes
Par exemple: unique : {}  
Verification au niveau de la BDD

# Operateur Sequelize
Permettent entre autre d'utiliser des parametres de requetes dans l'URL  
Effectuer une recherche contenant notre critére :  
On doit utiliser Op.like (Op.eq pour une recherhce exacte)  

# Autres Requetes
${name}% -> Recherche un pokemon qui commence par le terme contenu dans name  
%${name} -> Recherche un pokemon qui se termine par le terme contenu dans name  
%${name}% -> Recherche un pokemon qui contient le terme contenu dans name  

findAndCountAll() Permet de trouver tout les pokemons, de limiter le nbr de resultats à &à par exemple mais d'indiquer qu'il y en a 100 au total  
A implementer avec count et rows