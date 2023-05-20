const { series } = require('gulp');
// import GulpSSH from 'gulp-ssh';
var exec = require('child_process').exec;

// Set up SSH connector
//var gulpSSH = new GulpSSH({
//  ignoreErrors: true,
//  sshConfig: config
//})

// Tasks

function runOneOffScripts(cb)
{
    exec('mysql --defaults-extra-file=mysql/my.cnf < mysql/oneOff.sql',
            function (err, stdout, stderr){
                cb(err);
            });
}

function bundle(cb)
{
    // body omitted
    cb();
}

exports.deployDB = series(runOneOffScripts, bundle);

exports.backupDBSchema = function (cb)
{
    exec('mysqldump --defaults-extra-file=mysql/my.cnf -B ColorRecogniserDB --no-data > mysql/backup/schema.sql',
        function (err, stdout, stderr){});

    cb();
}