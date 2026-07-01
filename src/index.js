const axios = require('axios');
const cheerio = require('cheerio');
const dotenv = require('dotenv');
dotenv.config();
const apiKey = process.env.GOOGLE_SEARCH_API_KEY;
const cseId = process.env.GOOGLE_SEARCH_CSE_ID;
const url = `https://www.googleapis.com/customsearch/v1?key=${apiKey}&cx=${cseId}&q=`;
const getAnswer = async (question) => {
    try {
        const response = await axios.get(url + question);
        const $ = cheerio.load(response.data.items[0].htmlSnippet);
        const answer = $.text();
        console.log(answer);
    } catch (error) {
        console.error(error);
    }
};
const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
});
readline.question('Enter your question: ', (question) => {
    getAnswer(question);
    readline.close();
});