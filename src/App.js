import "./App.css";
import { useEffect, useState } from "react";

let quotesList;

function getRandomQuote(quotes) {
  const index = Math.floor(Math.random() * quotes.length);
  const quote = quotes[index];
  return {
    text: quote.text,
    author: quote.author.replace(", type.fit", ""),
  };
}

async function fetchQuotes() {
  const req = await fetch("https://type.fit/api/quotes");
  const data = await req.json();
  return data;
}

function QuoteText({ text }) {
  return <p id="text">{text}</p>;
}

function QuoteAuthor({ author }) {
  return <p id="author">{author}</p>;
}

function NewQuote({ onNewQuoteClick }) {
  return (
    <button id="new-quote" onClick={onNewQuoteClick}>
      New Quote
    </button>
  );
}

export default function QuoteBox() {
  const [quote, setQuote] = useState({});

  useEffect(() => {
    fetchQuotes().then((result) => {
      quotesList = result;
      setQuote(getRandomQuote(quotesList));
    });
  }, []);
  

  function handleQuote() {
    const nextQuote = getRandomQuote(quotesList);
    setQuote(nextQuote);
  }

  return (
    <div id="container">
      <div id="quote-box">
        <QuoteText text={quote.text} />
        <QuoteAuthor author={quote.author} />
        <NewQuote onNewQuoteClick={handleQuote} />
        <a id="tweet-quote" href="twitter.com/intent/tweet">
          Tweet Quote
        </a>
      </div>
    </div>
  );
}
