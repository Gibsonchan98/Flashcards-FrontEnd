export interface Flashcard{
    id?: number;
    Question? : string;
    Answer? : string;
    Correct? : boolean;
    Category? : string;
    state: "default" | "flipped";
}