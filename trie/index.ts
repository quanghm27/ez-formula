export class Trie {
    root: TrieNode;
    constructor(string?: string) {
        this.root = new TrieNode(string)
    }

    /**
     * Inserts a word into the trie
     * @param word
     * @returns void
     * @example
     * const trie = new Trie();
     * trie.insert('hello');
     * returns
     * TrieNode {
     *  value: '',
     *  children: Map {
     *    'h' => TrieNode {
     *      value: 'h',
     *      children: Map { 'e' => TrieNode { value: 'e', children: [Map] } },
     *      isEnd: false
     *    },
     *    'e' => TrieNode {
     *      value: 'e',
     *      children: Map { 'l' => TrieNode { value: 'l', children: [Map] } },
     *      isEnd: false
     *    },
     *    'l' => TrieNode {
     *      value: 'l',
     *      children: Map { 'l' => TrieNode { value: 'l', children: [Map] } },
     *      isEnd: false
     *    },
     *    'l' => TrieNode {
     *      value: 'l',
     *      children: Map { 'l' => TrieNode { value: 'l', children: [Map] } },
     *      isEnd: false
     *    },
     *    'o' => TrieNode {
     *      value: 'o',
     *      children: Map {},
     *      isEnd: true
     *    }
     */
    insert(word: string) {
        let current = this.root;

        // for each character in the word
        for (const char of word) {
            // if the character is not in the children map
            if (!current.children.has(char)) {
                // add the character to the children map
                current.children.set(char, new TrieNode(char));
            }
            // move the current pointer to the child node
            current = current.children.get(char);
        }
        current.isEnd = true;
    }

    /**
     * Returns true if the word exists in the trie
     * @param word
     * @returns boolean
     * @example
     * const trie = new Trie();
     * trie.insert('hello');
     * trie.exists('hello'); // returns true
     * trie.exists('hell'); // returns false
     * trie.exists('world'); // returns false
     */
    exists(word: string): boolean {
        let current = this.root;

        // for each character in the word
        for (const char of word) {
            // if the character is not in the children map
            if (!current.children.has(char)) {
                // return false
                return false;
            }
            // move the current pointer to the child node
            current = current.children.get(char);
        }
        return current.isEnd;
    }

    /**
     * The autoComplete function takes in a prefix and returns an array of all words that start with the given prefix.
     * If there are no matching words, an empty array is returned.
     * If there are no arguments, all words in the trie are returned.
     * The order of the returned words does not matter.
     *
     * @param prefix: string Determine the starting point of the search
     *
     * @return An array of words that start with the prefix
     *
     * @docauthor Trelent
     * @example
     * const trie = new Trie();
     * trie.insert('hello');
     * trie.insert('hell');
     * trie.insert('world');
     * trie.autoComplete('hel'); // returns ['hello', 'hell']
     * trie.autoComplete('he'); // returns ['hello', 'hell']
     * trie.autoComplete('wor'); // returns ['world']
     * trie.autoComplete('zzz'); // returns []
     * trie.autoComplete(''); // returns ['hello', 'hell', 'world']
     */
    autoComplete(prefix: string): string[] {

        let current = this.root;

        // for each character in the word
        for (const char of prefix) {
            // if the character is not in the children map
            if (!current.children.has(char)) {
                // return false
                return [];
            }
            // move the current pointer to the child node
            current = current.children.get(char);
        }
        return this.getWords(current, prefix);
    }


    /**
     * The getWords function returns all the words in the Trie that start with a given prefix.
     *
     *
     * @param node: TrieNode Pass in the current node that is being checked
     * @param prefix: string Keep track of the prefix that is being searched for
     *
     * @return An array of words that are stored in the trie
     *
     * @docauthor Trelent
     */
    getWords(node: TrieNode, prefix: string): string[] {
        let words: string[] = [];
        if (node.isEnd) {
            words.push(prefix);
        }
        for (const [key, child] of node.children) {
            words = words.concat(this.getWords(child, prefix + key));
        }
        return words;
    }
}

export class TrieNode {
    value: string;
    children: Map<string, TrieNode>;
    isEnd: boolean;
    constructor(c) {
        this.value = c;
        this.children = new Map();
        this.isEnd = false;
    }
}
