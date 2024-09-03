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

export interface NodeConfig {
    roles: number;
    friendlyName: string;
    url: string;
}

export interface NetworkConfigurationDefaults {
    maxTransactionsPerAggregate: number;
    maxTokenDuration: number;
    lockedFundsPerAggregate: string;
    maxNamespaceDuration: number;
    maxCosignatoriesPerAccount: number;
    maxTokenAtomicUnits: number;
    blockGenerationTargetTime: number;
    currencyTokenId: string;
    namespaceGracePeriodDuration: number;
    harvestingTokenId: string;
    minNamespaceDuration: number;
    maxCosignedAccountsPerAccount: number;
    maxNamespaceDepth: number;
    defaultDynamicFeeMultiplier: number;
    maxTokenDivisibility: number;
    maxMessageSize: number;
    epochAdjustment: number;
    totalChainImportance: number;
    generationHash: string;
}

export interface NetworkConfig {
    faucetUrl: string;
    defaultNetworkType: number;
    explorerUrl: string;
    networkConfigurationDefaults: NetworkConfigurationDefaults;
    statisticServiceUrl: string;
}

export const defaultTestnetNetworkConfig: NetworkConfig = {
    explorerUrl: 'https://testnet.bitxor.org/',
    faucetUrl: 'https://testnet.bitxor.org:9443/',
    statisticServiceUrl: 'https://testnet.bitxor.org:8443',
    defaultNetworkType: 0x9924,
    networkConfigurationDefaults: {
        maxTokenDivisibility: 8,
        namespaceGracePeriodDuration: 0,
        lockedFundsPerAggregate: '10000000',
        maxCosignatoriesPerAccount: 25,
        blockGenerationTargetTime: 5,
        maxNamespaceDepth: 2,
        maxTokenDuration: 63072000,
        minNamespaceDuration: 2592000,
        maxNamespaceDuration: 157680000,
        maxTransactionsPerAggregate: 100,
        maxCosignedAccountsPerAccount: 25,
        maxMessageSize: 1024,
        maxTokenAtomicUnits: 18446744073709551615,
        currencyTokenId: '242C60893EA608BA',
        harvestingTokenId: '242C60893EA608BA',
        defaultDynamicFeeMultiplier: 10,
        epochAdjustment: 1659416400,
        totalChainImportance: 19000000000000000,
        generationHash: '4778C1212DDE748297320E7F563C0D7B002C1F3C40EE07D174EBEC9911C474E9',
    },
};

export const defaultMainnetNetworkConfig: NetworkConfig = {
    explorerUrl: 'https://explorer.bitxor.org/',
    faucetUrl: 'https://explortest.bitxor.org/',
    statisticServiceUrl: 'https://explorer.bitxor.org:8443',
    defaultNetworkType: 0x0de2,
    networkConfigurationDefaults: {
        maxTokenDivisibility: 8,
        namespaceGracePeriodDuration: 86400,
        lockedFundsPerAggregate: '10000000',
        maxCosignatoriesPerAccount: 25,
        blockGenerationTargetTime: 5,
        maxNamespaceDepth: 2,
        maxTokenDuration: 63072000,
        minNamespaceDuration: 2592000,
        maxNamespaceDuration: 157680000,
        maxTransactionsPerAggregate: 100,
        maxCosignedAccountsPerAccount: 25,
        maxMessageSize: 1024,
        maxTokenAtomicUnits: 18446744073709551615,
        currencyTokenId: '3D1FE6EDC7F9611E',
        harvestingTokenId: '3D1FE6EDC7F9611E',
        defaultDynamicFeeMultiplier: 10,
        epochAdjustment: 1654041600,
        totalChainImportance: 1600000000000000,
        generationHash: '3A07B2E9016784D099F3D7581178D2E3A4C15D46A3998F58DAD141431B87F79A',
    },
};

const defaultNetworkConfig: Record<number, NetworkConfig> = {
    0x9924: defaultTestnetNetworkConfig,
    0x0de2: defaultMainnetNetworkConfig,
};

const resolvedNetworkConfig: NetworkConfig = window['networkConfig'] || defaultNetworkConfig;
console.log('networkConfig resolved!', resolvedNetworkConfig);
export const networkConfig = resolvedNetworkConfig;
