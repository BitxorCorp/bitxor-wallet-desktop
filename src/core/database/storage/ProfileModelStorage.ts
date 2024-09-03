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
import { ProfileModel } from '@/core/database/entities/ProfileModel';
import { defaultTestnetNetworkConfig } from '@/config';
import { SimpleObjectStorage } from '@/core/database/backends/SimpleObjectStorage';
import { VersionedModel } from '@/core/database/entities/VersionedModel';

export class ProfileModelStorage extends VersionedObjectStorage<Record<string, ProfileModel>> {
    /**
     * Singleton instance as we want to run the migration just once
     */
    public static INSTANCE = new ProfileModelStorage();

    public constructor(delegate = new SimpleObjectStorage<VersionedModel<Record<string, ProfileModel>>>('profiles')) {
        super({
            delegate: delegate,
            migrations: [
                {
                    description: 'Update profiles to 0.9.5.1 network',
                    migrate: () => undefined,
                 
                },
                {
                    description: 'Update profiles for 0.9.6.3 network (generation hash)',
                    migrate: () => undefined,
                },
                {
                    description: 'Reset profiles for 0.9.6.3 network (non backwards compatible)',
                    migrate: () => undefined,
                },
                {
                    description:
                        'Update profiles for 0.10.x network (non backwards compatible due to HD and private key profile separation)',
                    migrate: () => undefined,
                },
                {
                    description: 'Update profiles for 0.10.0.5 pre main network release (non backwards compatible on protocol v0.10.0.4)',
                    migrate: () => undefined,
                },
                {
                    description: 'Reset accounts for 0.10.0.6 network (non backwards compatible)',
                    migrate: () => undefined,
                },
                {
                    description: 'Update profiles for new testnet 1.0.0.0 network (generation hash)',
                    migrate: () => undefined,
                },
            ],
        });
    }
}
