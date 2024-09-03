/* eslint-disable @typescript-eslint/no-unused-vars */
import {
    AccountNames,
    Address,
    MerkleStateInfo,
    TokenId,
    TokenNames,
    NamespaceId,
    NamespaceInfo,
    NamespaceName,
    NamespaceRepository,
    NamespaceSearchCriteria,
    Page,
    PaginationStreamer,
} from 'bitxor-sdk';
import { Observable, of } from 'rxjs';
import { OfflineAccountNames, OfflineNamespaceNames } from '@/services/offline/MockModels';

export class OfflineNamespaceRepository implements NamespaceRepository {
    getAccountsNames(accountIds: Address[]): Observable<AccountNames[]> {
        return of(accountIds.map(OfflineAccountNames));
    }

    getLinkedAddress(namespaceId: NamespaceId): Observable<Address | null> {
        throw new Error(`OfflineNamespaceRepository: getLinkedAddress not implemented`);
    }

    getLinkedTokenId(namespaceId: NamespaceId): Observable<TokenId | null> {
        throw new Error(`OfflineNamespaceRepository: getLinkedTokenId not implemented`);
    }

    getTokensNames(tokenIds: TokenId[]): Observable<TokenNames[]> {
        throw new Error(`OfflineNamespaceRepository: getTokensNames not implemented`);
    }

    getNamespace(namespaceId: NamespaceId): Observable<NamespaceInfo> {
        throw new Error(`OfflineNamespaceRepository: getNamespace not implemented`);
    }

    getNamespaceMerkle(namespaceId: NamespaceId): Observable<MerkleStateInfo> {
        throw new Error(`OfflineNamespaceRepository: getNamespaceMerkle not implemented`);
    }

    getNamespacesNames(namespaceIds: NamespaceId[]): Observable<NamespaceName[]> {
        return of(namespaceIds.map(OfflineNamespaceNames));
    }

    getUrl(): string {
        throw new Error(`OfflineNamespaceRepository: getUrl not implemented`);
    }

    search(criteria: NamespaceSearchCriteria): Observable<Page<NamespaceInfo>> {
        return of(new Page<NamespaceInfo>([], criteria.pageNumber, criteria.pageSize));
    }

    streamer(): PaginationStreamer<NamespaceInfo, NamespaceSearchCriteria> {
        throw new Error(`OfflineNamespaceRepository: streamer not implemented`);
    }
}
