import { ChainInfo, ChainRepository } from 'bitxor-sdk';
import { Observable, of } from 'rxjs';
import { OfflineChainInfo } from '@/services/offline/MockModels';

export class OfflineChainRepository implements ChainRepository {
    getChainInfo(): Observable<ChainInfo> {
        return of(OfflineChainInfo);
    }
}
