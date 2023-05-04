import Sentiment from "sentiment";
import cuss from "cuss";

export default function checkString(msg: string): number {
  // Make sure string isn't empty
  if (msg.length === 0) {
    throw new Error("Invalid String: String is empty");
  }

  // Check for cuss words
  if (checkProfanities(msg.split(" ")).length > 0) {
    throw new Error("Invalid String: String contains profanities");
  }

  // Return the sentiment analysis results
  var sentiment = new Sentiment();
  var sentiment_results: Sentiment.AnalysisResult = sentiment.analyze(msg);
  return sentiment_results.comparative;
}

function checkProfanities(words: string[]): string[] {
  // NOTE: Sorry, I'm doing exactly what the documentation for this
  // package told me not to do, which is to use it as profanity filter
  var profanities: string[] = [];
  words.forEach((word) => {
    try {
      if (cuss.cuss.word === 2) {
        profanities.concat(word);
      }
    } catch (error) {
      // Do nothing, word just doesn't exist in the dictionary
    }
  });
  return profanities;
}