/*
 * (C) Bitxor Community 2022
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and limitations under the License.
 *
 */

import { VersionedObjectStorage } from '@/core/database/backends/VersionedObjectStorage';
import { HashLockAggregatePairModel } from '@/core/database/entities/HashLockAggregatePairModel';

/**
 * Stored cache for the known block infos.
 */
export class HashLockAggregatePairModelStorage extends VersionedObjectStorage<HashLockAggregatePairModel[]> {
    /**
     * Singleton instance as we want to run the migration just once
     */
    public static INSTANCE = new HashLockAggregatePairModelStorage();

    private constructor() {
        super({
            storageKey: 'hashLockAggregatePairs',
            migrations: [
                {
                    description: 'Reset accounts for 0.10.0.5 network (non backwards compatible)',
                    migrate: () => undefined,
                },
                {
                    description: 'Reset accounts for 0.10.0.6 network (non backwards compatible)',
                    migrate: () => undefined,
                },
            ],
        });
    }
}