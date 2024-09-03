import { DerivationPathValidator } from '@/core/validation/validators';
import { BitxorLedger } from '@/core/utils/Ledger';
import TransportWebUSB from '@ledgerhq/hw-transport-webusb';
import { NetworkType } from 'bitxor-sdk/dist/src/model/network/NetworkType';
const TransportNodeHid = window['TransportNodeHid'] && window['TransportNodeHid'].default;

export class LedgerService {
    private transport;

    /**
     * constructor
     * @param networkType network type
     */
    constructor(public readonly networkType: NetworkType) {}

    private async openTransport() {
        return TransportNodeHid ? await TransportNodeHid.open() : await TransportWebUSB.create();
    }

    private async closeTransport() {
        TransportNodeHid && this.transport && (await this.transport.close());
    }

    private formatError(error) {
        return error.statusCode || error.id ? { errorCode: error.statusCode || error.id } : error;
    }

    public async isAppSupported() {
        try {
            this.transport = await this.openTransport();
            const bitxorLedger = new BitxorLedger(this.transport, 'BXR');
            const result = await bitxorLedger.isAppSupported();
            return result;
        } catch (error) {
            throw this.formatError(error);
        } finally {
            await this.closeTransport();
        }
    }

    public async getAccount(path: string, display: boolean, isOptinLedgerWallet: boolean) {
        try {
            if (!DerivationPathValidator.validate(path, this.networkType)) {
                const errorMessage = 'Invalid derivation path: ' + path;
                throw new Error(errorMessage);
            }
            this.transport = await this.openTransport();
            const bitxorLedger = new BitxorLedger(this.transport, 'BXR');
            const result = await bitxorLedger.getAccount(path, this.networkType, display, false, isOptinLedgerWallet);
            return result;
        } catch (error) {
            throw this.formatError(error);
        } finally {
            await this.closeTransport();
        }
    }

    public async signTransaction(
        path: string,
        transferTransaction: any,
        networkGenerationHash: string,
        signerPublicKey: string,
        isOptinLedgerWallet: boolean,
    ) {
        try {
            if (!DerivationPathValidator.validate(path, this.networkType)) {
                const errorMessage = 'Invalid derivation path: ' + path;
                throw new Error(errorMessage);
            }
            this.transport = await this.openTransport();
            const bitxorLedger = new BitxorLedger(this.transport, 'BXR');
            const result = await bitxorLedger.signTransaction(
                path,
                transferTransaction,
                networkGenerationHash,
                signerPublicKey,
                isOptinLedgerWallet,
            );
            return result;
        } catch (error) {
            throw this.formatError(error);
        } finally {
            await this.closeTransport();
        }
    }

    public async signCosignatureTransaction(
        path: string,
        cosignatureTransaction: any,
        signerPublicKey: string,
        isOptinLedgerWallet: boolean,
    ) {
        try {
            if (!DerivationPathValidator.validate(path, this.networkType)) {
                const errorMessage = 'Invalid derivation path: ' + path;
                throw new Error(errorMessage);
            }
            this.transport = await this.openTransport();
            const bitxorLedger = new BitxorLedger(this.transport, 'BXR');
            const result = await bitxorLedger.signCosignatureTransaction(
                path,
                cosignatureTransaction,
                signerPublicKey,
                isOptinLedgerWallet,
            );
            return result;
        } catch (error) {
            throw this.formatError(error);
        } finally {
            await this.closeTransport();
        }
    }
}
