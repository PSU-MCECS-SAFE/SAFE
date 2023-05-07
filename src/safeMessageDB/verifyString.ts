import Sentiment from 'sentiment';
import BadWordsFilter from 'bad-words';

//this will return a scorce range from -5 to 5 and other things we don't need
export function checkString(msg: string): number {
    // Make sure string isn't empty
    if (msg.length === 0) {
        throw new Error("Invalid String: String is empty");
    }

    // Return the sentiment analysis results
    var sentiment = new Sentiment();
    var result: Sentiment.AnalysisResult = sentiment.analyze(msg);
    return result.comparative;
}

/* 
  Some common examples of profane words that may be included in the bad-words package are:
    -The "F-word" and other common swear words
    -Racial slurs and derogatory terms
    -Words related to sex and sexuality
    -Insults and derogatory terms for individuals or groups
*/
export function checkProfanities(words: string): boolean {
    const filter = new BadWordsFilter();
    if (filter.isProfane(words)) {
        return true
    }
    return false;
}