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
// configuration
import { appConfig } from '@/config';
import { NetworkConfigurationModel } from '@/core/database/entities/NetworkConfigurationModel';

import { networkConfig } from '@/config';
import { NetworkType } from 'bitxor-sdk';

const { MIN_PASSWORD_LENGTH } = appConfig.constants;

export const createValidationRuleSet = ({
    maxMessageSize,
    maxTokenAtomicUnits,
    maxTokenDivisibility,
    maxTokenDuration,
    minNamespaceDuration,
}: NetworkConfigurationModel) => {
    return {
        address: 'required|address|addressNetworkType:currentProfile',
        profilePassword: 'required|profilePassword',
        addressOrAlias: 'required|addressOrAlias|addressOrAliasNetworkType:currentProfile',
        amount: `positiveDecimal|startsWithZero|maxDecimals:${maxTokenDivisibility}|maxRelativeAmount:${[
            maxTokenAtomicUnits,
            maxTokenDivisibility,
        ]}`,
        confirmPassword: 'required|confirmPassword:@newPassword',
        divisibility: 'required|min_value:0|max_value:8|integer',
        duration: `required|min_value:0|max_value:${maxTokenDuration}`,
        generationHash: 'required|min:64|max:64',
        tokenId: 'required|tokenId',
        message: `maxMessage:${maxMessageSize}`,
        namespaceDuration: `required|min_value:${
            minNamespaceDuration / networkConfig[NetworkType.TEST_NET].networkConfigurationDefaults.blockGenerationTargetTime
        }|maxNamespaceDuration`,
        // remove bitxor from regex when rest https://github.com/bitxorcorp/bitxorcore-rest/issues/631 fixed
        namespaceName: {
            required: true,
            regex: '^(?!bitxor$)([a-z0-9]{1}[a-z0-9-]{0,31})$',
        },
        subNamespaceName: {
            required: true,
            regex: '^[a-z0-9]{1}[a-z0-9-_]{0,63}$',
        },
        password: `required|min:${MIN_PASSWORD_LENGTH}|passwordRegex`,
        previousPassword: 'required|confirmLock:cipher',
        privateKey: 'min:64|max:64|privateKey',
        recipientPublicKey: 'required|publicKey',
        supply: `required|integer|min_value: 1|max_value:${maxTokenAtomicUnits}`,
        url: 'required|url',
        newAccountName: 'required|newAccountName',
        profileAccountName: 'required|profileAccountName',
        addressOrPublicKey: 'addressOrPublicKey',
        email: {
            regex: '^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\\.[a-zA-Z0-9-.]+$',
        },
        contactName: {
            required: true,
            regex: '^(?!\\s*$).+',
        },
    };
};

// TODO ValidationRuleset needs to be created when the network configuration is resolved, UI needs
// to use the resolved ValidationResulset ATM rules are using the hardocded ones
export const ValidationRuleset = createValidationRuleSet(networkConfig[NetworkType.TEST_NET].networkConfigurationDefaults);
