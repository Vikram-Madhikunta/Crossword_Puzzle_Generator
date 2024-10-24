class Word {
    constructor(word, clue) {
        this.word = word;
        this.clue = clue;
    }

    getLength() {
        return this.word.length;
    }
}

const wordList = [
    new Word("ARRAY", "A structured collection of elements identified by an index."),
    new Word("BINARY", "A numeral system using only two digits: 0 and 1."),
    new Word("CHAR", "A single character unit in programming languages."),
    new Word("CLASS", "A blueprint for creating objects in object-oriented programming."),
    new Word("CONST", "A variable whose value cannot be changed once assigned."),
    new Word("DEQUE", "A double-ended queue allowing insertions and deletions at both ends."),
    new Word("ELSE", "A conditional statement executed if the preceding 'if' condition is false."),
    new Word("FLOAT", "A data type representing numbers with decimal points."),
    new Word("GRAPH", "A data structure consisting of nodes connected by edges."),
    new Word("HEAP", "A specialized tree-based structure for managing memory and priorities."),
    new Word("INPUT", "Data provided to a program or function by the user."),
    new Word("JOIN", "To combine multiple strings or collections into one."),
    new Word("KEY", "A unique identifier used to access a value in a data structure like a map."),
    new Word("LINK", "A reference or pointer to another object or data structure."),
    new Word("MAP", "A collection of key-value pairs, allowing efficient data retrieval."),
    new Word("NODE", "An individual element within a data structure such as a linked list or tree."),
    new Word("OBJECT", "An instance of a class containing data and methods."),
    new Word("PARSE", "To analyze a string and convert it into a usable data structure."),
    new Word("QUEUE", "A data structure that operates on a first-in, first-out basis."),
    new Word("RECURSION", "A process where a function calls itself to solve a problem."),
    new Word("SORTING", "The process of arranging elements in a specified order."),
    new Word("TREE", "A hierarchical data structure with a root node and child nodes."),
    new Word("UNION", "A data structure representing a set of distinct elements, combining multiple sets."),
    new Word("VARIABLE", "A named storage location in memory that can hold different values during execution."),
    new Word("LOOP", "A control statement that repeats code while a condition is true."),
    new Word("XOR", "A logical operation that returns true if only one of the operands is true.")
];


export { wordList };
