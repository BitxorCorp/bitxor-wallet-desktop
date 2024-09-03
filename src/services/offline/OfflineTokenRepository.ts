/* eslint-disable @typescript-eslint/no-unused-vars */
import { MerkleStateInfo, TokenId, TokenInfo, TokenRepository, TokenSearchCriteria, Page, PaginationStreamer } from 'bitxor-sdk';
import { Observable, of } from 'rxjs';

export class OfflineTokenRepository implements TokenRepository {
    getToken(tokenId: TokenId): Observable<TokenInfo> {
        throw new Error(`OfflineTokenRepository: getToken not implemented`);
    }

    getTokenMerkle(tokenId: TokenId): Observable<MerkleStateInfo> {
        throw new Error(`OfflineTokenRepository: getTokenMerkle not implemented`);
    }

    getTokens(tokenIds: TokenId[]): Observable<TokenInfo[]> {
        throw new Error(`OfflineTokenRepository: getTokens not implemented`);
    }

    search(criteria: TokenSearchCriteria): Observable<Page<TokenInfo>> {
        return of(new Page<TokenInfo>([], criteria.pageNumber, criteria.pageSize));
    }

    streamer(): PaginationStreamer<TokenInfo, TokenSearchCriteria> {
        throw new Error(`OfflineTokenRepository: streamer not implemented`);
    }
}
