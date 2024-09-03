// internal dependencies
import Vue from 'vue';
import { TokenModel } from '@/core/database/entities/TokenModel';

export class TokenInputsManager {
    /**
     * Maps token hex ids to slots (input indexes)
     * @private
     */
    private tokenMap: Record<string, number | null> = {};

    /**
     * Initialize a new instance of TokenInputsManager
     * @static
     * @param {TokenModel[]} tokens
     * @param {TokenService} tokenService
     * @returns {TokenInputsManager}
     */
    public static initialize(tokens: TokenModel[]): TokenInputsManager {
        return new TokenInputsManager(tokens || []);
    }

    /**
     * Creates an instance of TokenInputsManager.
     * @param {TokenModel[]} tokens
     */
    private constructor(tokens: TokenModel[]) {
        // Set tokenMap with null values
        tokens.forEach(({ tokenIdHex }) => Vue.set(this.tokenMap, tokenIdHex, null));
    }

    /**
     * Add tokens to the manager after initialization
     * @param {TokenModel[]} tokens
     */
    public addTokens(tokens: TokenModel[]): void {
        tokens.forEach(({ tokenIdHex }) => {
            // skip if the token is known
            if (this.tokenMap[tokenIdHex]) {
                return;
            }
            // add the token
            Vue.set(this.tokenMap, tokenIdHex, null);
        });
    }

    /**
     * Whether the tokenMap has a free slot
     * If yes, a new token input can be created
     * @returns {boolean}
     */
    public hasFreeSlots(): boolean {
        return Object.values(this.tokenMap).find((values) => values === null) !== undefined;
    }

    /**
     * Allocates a token hex to a slot
     * @param {string} hexId
     * @param {number} index
     */
    public setSlot(hexId: string, index: number): void {
        // get the slot
        const slot = this.tokenMap[hexId];

        // throw if a slot does not exist for the provided token id
        if (slot === undefined) {
            throw new Error(`${hexId} does not exist in ${JSON.stringify(this.tokenMap)}`);
        }

        // throw if the slot is already allocated to another input
        if (slot !== null && slot !== index) {
            throw new Error(`${hexId} is already allocated to input ${slot}`);
        }

        // unset the current slot allocation
        this.unsetSlot(index);

        // allocate the entry
        Vue.set(this.tokenMap, hexId, index);
    }

    /**
     * Set a slot to null
     * @param {number} index
     */
    public unsetSlot(index: number): void {
        // get the slot entry
        const entry = this.getEntryBySlot(index);

        // ignore if the slot had no allocated entry
        if (entry === undefined) {
            return;
        }

        // unset the entry slot allocation
        const [hexId] = entry;
        Vue.set(this.tokenMap, hexId, null);
    }

    /**
     * Returns tokens that can be used by a slot
     * @param {number} index
     * @returns {string[]}
     */
    public getTokensBySlot(index: number): string[] {
        // get allocated token
        const allocatedEntry = this.getEntryBySlot(index);

        // get non-allocated entries
        const nonAllocatedEntries = Object.entries(this.tokenMap)
            .filter(([, slot]) => slot === null)
            .map(([hex]) => hex);

        return allocatedEntry ? [allocatedEntry[0], ...nonAllocatedEntries] : nonAllocatedEntries;
    }

    /**
     * Returns an entry given a slot number
     * @private
     * @param {number} index
     * @returns {([string, number] | undefined)}
     */
    private getEntryBySlot(index: number): [string, number] | undefined {
        return Object.entries(this.tokenMap).find(([, slot]) => slot == index);
    }
}
