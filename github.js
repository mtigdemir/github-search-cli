const request = require('request');

class Github {

    searchOnRepositories(term, callback) {
        let searchURL = 'https://api.github.com/search/repositories?q='+term+'{in:description}&per_page=100';
        let options = {
            url: searchURL,
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 6.1; Win64; x64; rv:47.0) Gecko/20100101 Firefox/47.0 Mozilla/5.0 (Macintosh; Intel Mac OS X x.y; rv:42.0) Gecko/20100101 Firefox/42.0'
            }
        };

        let response = request(options, function (err, res, body){
            let json = JSON.parse(body);
            let items = json.items;

            // Prepare Language Count 
            let languagesCounts = items.reduce((languages, item) => {
                let name = item.language;

                if (name != null && languages[name] == null) {
                    languages[name] = 0;
                }

                if (name != null) {
                    languages[name]++;
                }

                return languages;
            }, {});

            // Order By 
            let sortable = [];
            for (let language in languagesCounts) {
                sortable.push([language, languagesCounts[language]]);
            }

            sortable.sort(function (a, b) {
                return b[1] - a[1];
            });

            return callback(sortable, items.legnth);
        });
    }
}

module.exports = Github;