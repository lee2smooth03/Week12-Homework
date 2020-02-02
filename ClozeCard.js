/**
 * This file should define a Node module that exports a constructor for creating cloze-deletion flashcards, e.g.:
   `module.exports = ClozeCard;`
 * The constructor should accept two arguments: `text` and `cloze`
 * The constructed object should have a `cloze` property that contains _only_ the cloze-deleted portion of the text
 * The constructed object should have a `partial` property that contains _only_ the partial text
 * The constructed object should have a `fullText` property that contains _only_ the full text
 * The constructor should throw or log an error when the cloze deletion does _not_ appear in the input text
 * Use prototypes to attach these methods, wherever possible.
 */

function ClozeCard(text, cloze){
    
    this.cloze = cloze;     // contains the cloze deleted portion of the text
    // this.partial = ...;     // this is the remaning text once the cloze is removed

    this.fulltext = text;   // this is the entire sentance: partial + cloze
    // this.partial = fulltext.replace(cloze, "..."); 

}

module.exports = ClozeCard;