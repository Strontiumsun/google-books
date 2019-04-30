import axios from "axios";
module.exports = {
    googleFind: function (req, res) {
        var BASEURL = "https://www.googleapis.com/books/v1/volumes?q=";
        var query = req.query;
        axios.get(`${BASEURL}${query}`)
            .then(res => res.data.items)
            .then(books => res.json(books))
            .catch(err => res.status(422).json(err))
    },
}