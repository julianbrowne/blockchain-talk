
# Blockchain: Secret Sauce or Snake Oil?

Reveal.js presentation explaining concepts of blockchain
from first principles.

## Credits

Inspired by [Anders Brownworth](https://github.com/anders94)'s awesome [blockchain demo](https://github.com/anders94/blockchain-demo)

[Reveal.js](https://revealjs.com/) 3.6.0  
[JQuery](https://jquery.com/) 3.3.1  
[JS Sha256](https://github.com/emn178/js-sha256.git) 0.9.0 by Yi-Cyuan Chen  
[Font Awesome](https://fontawesome.com) 5.0.7  
Pinboard adapted from [CSS Sticky Notes](https://github.com/rheh/CSS-Sticky-Notes.git) by Ray Hammond

More about the content can be found in the [content doc](content.md)

## View

go to [https://cohaesus.github.io/blockchain-talk](https://cohaesus.github.io/blockchain-talk)

## Install Locally

Clone this repo locally:

`git clone https://github.com/julianbrowne/blockchain-talk.git`

Access from behind any http server (I used [apache anywhere](https://github.com/julianbrowne/apache-anywhere) in development).

Everything is static html and client side javascript.

To use the reveal.js built-in server:

`cd vendor/reveal`

`npm install`

`npm start -- --port=8001 --root=../..`

