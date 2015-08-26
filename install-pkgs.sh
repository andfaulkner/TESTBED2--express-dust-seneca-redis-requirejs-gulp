npm install --save-dev gulp gulp-debug gulp-dev gulp-babel gulp-autoprefixer; 
npm install --save-dev gulp-express gulp-exit gulp-filter gulp-if-else gulp-jshint gulp-newer; 
npm install --save-dev gulp-livereload gulp-nodemon gulp-notify gulp-plumber gulp-print 
npm install --save-dev gulp-rename gulp-replace gulp-rimraf gulp-sass gulp-shell; 
npm install --save-dev  gulp-size gulp-stats gulp-tap gulp-webpack; 
npm install --save-dev lazypipe gulp-util run-sequence gulp-notify webpack gulp-wait; 
npm install --save-dev fs-extra yargs merge2 del gulp-display-help; 
npm install --save-dev babel babel-core babel-loader css-loader file-loader fs-extra; 
npm install --save-dev raw-loader run-sequence tiny-lr image-webpack-loader imagemin; 
npm install --save event-stream babel babel-core babel-loader merge2; 
npm install --save pg body-parser colors connect-livereload cookie-parser dustjs-linkedin dustjs-helpers
npm install --save seneca node-sass-middleware pretty-error rootpath serve-favicon through2; 
npm install --save bluebird morgan; 








function npmInstall {
	npm install $1
}

if [ "$#" -ne 1 ]; then
    echo "Illegal number of parameters"
fi

function installArrayOfnpmDeps {
	arrayDevDep=( gulp-info gulp-sass gulp-plumber lazypipe )
	arrayGulpDep=( display-info sass plumber sass livereload plumber print 
				   rename replace jshint if-else size stats tap webpack exit filter)
	arrayRegDep=( seneca )

	for i in "${arrayName[@]}"
	do
	   :
		if [ "$1" -eq "--save-dev"]; then
			npm install --save-dev $1 $2 $3 $4 $5 $6 $7 $8 $9 $18
		elif [$1 -wq "--save"]
			  npm install --save $2 $3 $4 $5 $6 $7 $8 $9 $10
		else
		   npm install --save $1 $2 $3 $4 $5 $6 $7 $8 $9 $10
		fi
	done
}

sudo npm install gulp gulp-display-help --save-dev; 
npm install gulp-sass gulp-plumber fs-extra --save-dev 
npm install --save-dev args merge2 del; 
npm install -save-dev babel gulp-autoprefixer gulp-babel gulp-dev gulp-dust gulp-express; 
npm install --save-dev gulp-jshint gulp-livereload gulp-notify gulp-shell, gulp-rename; gulp notify
