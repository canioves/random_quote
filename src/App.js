import "./App.css";
import { useEffect, useState } from "react";

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
  let quotesData;

  async function getQuote() {
    const url = "https://type.fit/api/quotes";
    try {
      const req = await fetch(url);
      const data = await req.json();
      quotesData = data;
    } catch (err) {
      console.error("Something went wrong:\n", err);
      return null;
    }
  }
  useEffect(() => {
    getQuote();
    handleQuote();
  });

  function getRandomQuote() {
    const index = Math.floor(Math.random() * quotesData.length);
    return quotesData[index];
  }

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
