import "./App.css";
import { useState } from "react";

async function fetchQuotes() {
  const url = "https://type.fit/api/quotes";
  try {
    const req = await fetch(url);
    const data = await req.json();
    return data.slice(0, data.length - 1);
  } catch (err) {
    console.error("Something went wrong:\n", err);
    return null;
  }
}

let quotesData = await fetchQuotes();
const initQuote = getRandomQuote();

function getRandomQuote() {
  const index = Math.floor(Math.random() * quotesData.length);
  const quote = quotesData[index];
  return ({
    text: quote.text,
    author: quote.author.replace(", type.fit", "")
  })
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
  const [quote, setQuote] = useState(initQuote);

  function handleQuote() {
    const nextQuote = getRandomQuote();
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
