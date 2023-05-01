export interface Flashcard{
    id?: number;
    question? : string;
    answer? : string;
    correct? : boolean;
    category? : string;
    state?: "default" | "flipped";
}