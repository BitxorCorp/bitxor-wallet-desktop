import { TokenInputsManager } from '@/views/forms/FormTransferTransaction/TokenInputsManager.ts';
import { TokenModel } from '@/core/database/entities/TokenModel';

export const mockToken1: TokenModel = {
    tokenIdHex: '619CE7E50DB644DE',
    balance: 1,
} as TokenModel;

export const mockToken2: TokenModel = {
    tokenIdHex: '28A59CC8B0C9E4DD',
    balance: 1,
} as TokenModel;

export const mockToken3: TokenModel = {
    tokenIdHex: '2D58F9BF5F8C014D',
    balance: 1,
} as TokenModel;

const mockTokens = [mockToken1, mockToken2, mockToken3];
const mockTokenHexIds = mockTokens.map(({ tokenIdHex }) => tokenIdHex);

describe('components/TokenInputManager', () => {
    describe('initialize() should', () => {
        test('return an instantiated object', () => {
            expect(TokenInputsManager.initialize(mockTokens)).toBeInstanceOf(TokenInputsManager);
        });
    });

    describe('hasFreeSlots() should', () => {
        test('return true after initialization with tokens provided', () => {
            const tokenInputsManager = TokenInputsManager.initialize(mockTokens);
            expect(tokenInputsManager.hasFreeSlots()).toBeTruthy();
        });

        test('return false after initialization with empty array', () => {
            const tokenInputsManager = TokenInputsManager.initialize([]);
            expect(tokenInputsManager.hasFreeSlots()).toBeFalsy();
        });
    });

    describe('setSlot() should', () => {
        test('throw if a an unknown id is provided', () => {
            const tokenInputsManager = TokenInputsManager.initialize([]);
            expect(() => tokenInputsManager.setSlot('wrongHexId', 1)).toThrowError();
        });

        test('throw if a token is already affected to the slot', () => {
            const tokenInputsManager = TokenInputsManager.initialize(mockTokens);
            tokenInputsManager.setSlot(mockTokenHexIds[1], 2);
            expect(() => tokenInputsManager.setSlot(mockTokenHexIds[1], 1)).toThrowError();
        });
    });

    describe('getTokensBySlot() should', () => {
        test('return all tokens after initialization with tokens provided, for any slot', () => {
            const tokenInputsManager = TokenInputsManager.initialize(mockTokens);
            expect(tokenInputsManager.getTokensBySlot(0)).toStrictEqual(mockTokenHexIds);
            expect(tokenInputsManager.getTokensBySlot(1)).toStrictEqual(mockTokenHexIds);
            expect(tokenInputsManager.getTokensBySlot(2)).toStrictEqual(mockTokenHexIds);
        });

        test('return an empty array after after initialization with empty array, for any slot', () => {
            const tokenInputsManager = TokenInputsManager.initialize([]);
            expect(tokenInputsManager.getTokensBySlot(0)).toStrictEqual([]);
            expect(tokenInputsManager.getTokensBySlot(1)).toStrictEqual([]);
            expect(tokenInputsManager.getTokensBySlot(2)).toStrictEqual([]);
        });

        describe('contain expected tokens after affectations', () => {
            const tokenInputsManager = TokenInputsManager.initialize(mockTokens);
            tokenInputsManager.setSlot(mockTokenHexIds[1], 2);

            const slot1Tokens = tokenInputsManager.getTokensBySlot(1);
            const slot2Tokens = tokenInputsManager.getTokensBySlot(2);

            expect(slot1Tokens).toStrictEqual([mockTokenHexIds[0], mockTokenHexIds[2]]);
            expect(slot2Tokens).toStrictEqual([mockTokenHexIds[1], mockTokenHexIds[0], mockTokenHexIds[2]]);

            tokenInputsManager.unsetSlot(2);
            tokenInputsManager.setSlot(mockTokenHexIds[1], 1);
            const slot1Tokens2 = tokenInputsManager.getTokensBySlot(1);
            const slot2Tokens2 = tokenInputsManager.getTokensBySlot(2);

            expect(slot1Tokens2).toStrictEqual([mockTokenHexIds[1], mockTokenHexIds[0], mockTokenHexIds[2]]);
            expect(slot2Tokens2).toStrictEqual([mockTokenHexIds[0], mockTokenHexIds[2]]);
        });
    });
});
