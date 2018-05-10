const program = require('commander');
const Github = require('./github');

program
    .version('0.0.1')
    .option('-o, --option', 'option description')
    .option('-m, --more', 'we can have as many options as we want')
    .option('-i, --input [optional]', 'optional user input')
    .option('-I, --another-input <required>', 'required user input');

program
    .command('search <term>')
    .description('Search on github')
    .action((term) => {
        let github = new Github();
        github.searchOnRepositories(term, function (response) {
            response.forEach(element => {
                process.stdout.write(element[0] + ": " + element[1] + "\n");
            });
        });
    });

program.parse(process.argv);