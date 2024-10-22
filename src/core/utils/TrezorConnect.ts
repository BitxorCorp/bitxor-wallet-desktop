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
import TrezorConnect from 'trezor-connect';

// TODO: figure out who wants to be the first point of contact for trezor
// https://github.com/trezor/connect/blob/develop/docs/index.md#trezor-connect-manifest
TrezorConnect.manifest({
    email: 'chris@crunchycloud.io',
    appUrl: 'http://localhost:8080',
});

export default TrezorConnect;
