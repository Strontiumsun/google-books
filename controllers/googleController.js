const axios = require("axios")

module.exports = {
    googleFind: function (req, res) {
        var BASEURL = "https://www.googleapis.com/books/v1/volumes?q=";
        var query = req.params.query;
        console.log(req.params.query)
        axios.get(BASEURL + query)
            .then(res => res.data.items.filter(
                result =>
                    result.volumeInfo.title &&
                    result.volumeInfo.infoLink &&
                    result.volumeInfo.authors &&
                    result.volumeInfo.description &&
                    result.volumeInfo.imageLinks &&
                    result.volumeInfo.imageLinks.thumbnail

                // Worked with Paul the TA on this. I was getting an error with Great Expectations. Not
                //all of the results had descriptions or images, which was preventing React from passing
                // it as a prop. We need to determine if a result has all the necessary info before
                // we pass it to the front end, otherwise React will get fussy and give us an error. 
                // Paul showed me how to do it.   
            ))
            .then(results => res.json(results))
            .catch(err => res.status(422).json(err))
    },
}