import {Trie} from "../trie";
import { describe, expect, it } from "@jest/globals";

describe('Trie', () => {
    it('should insert a word into the trie', () => {
        const trie = new Trie();
        trie.insert('hello');
        expect(trie.root.children.get('h').children.get('e').children.get('l').children.get('l').children.get('o').isEnd).toBe(true);
    })
    it('should insert multiple words into the trie', () => {
        const trie = new Trie();
        trie.insert('hello');
        trie.insert('help');
        expect(trie.exists("hello")).toBe(true);
        expect(trie.exists("help")).toBe(true);
    })
    it('should return false if the word does not exist in the trie', () => {
        const trie = new Trie();
        trie.insert('hello');
        expect(trie.exists("help")).toBe(false);
    })
    it('should return true if the word exists in the trie', () => {
        const trie = new Trie();
        trie.insert('hello');
        expect(trie.exists("hello")).toBe(true);
    })
    it('should suggest words based on the prefix', () => {
        const trie = new Trie();
        trie.insert('hello');
        trie.insert('help');
        expect(trie.autoComplete("he")).toEqual(["hello", "help"]);
    })
    it('should return empty array if no words exist with the prefix', () => {
        const trie = new Trie();
        trie.insert('hello');
        trie.insert('help');
        expect(trie.autoComplete("w")).toEqual([]);
    })
})
