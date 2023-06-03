import Sentiment from 'sentiment';
import BadWordsFilter from 'bad-words';

/**
 * Return a score indicating the sentiment of the text, and how confident that score is.
 * Negative numbers indicate negative sentiment, positive numbers indicate positive sentiment. Zero is neutral.
 * The higher the absolute value of the score is, the more confident there is in the score.
 * @param text The text being evaluated
 * @throws Error if string is empty or contains profane language
 * @returns Score indicating the sentiment of the text.
 */
export function checkString(text: string): number {
    // Make sure string isn't empty
    if (text.length === 0) {
        throw new Error("Invalid String: Empty String");
    }

    /* 
    Filter for profane words
    Some common examples of profane words that may be included in the bad-words package are:
    - The "F-word" and other common swear words
    - Racial slurs and derogatory terms
    - Words related to sex and sexuality
    - Insults and derogatory terms for individuals or groups
    */
    const filter = new BadWordsFilter();
    if (filter.isProfane(text)){
        throw new Error("Invalid String: Bad Words");
    }

    // Run the sentiment analysis
    var sentiment = new Sentiment();
    var result: Sentiment.AnalysisResult = sentiment.analyze(text);

    return result.comparative;
}