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

import { NetworkConfiguration, NetworkType } from 'bitxor-sdk';
import { Formatters } from '@/core/utils/Formatters';
import { TimeHelpers } from '@/core/utils/TimeHelpers';

import { networkConfig } from '@/config';

/**
 * Helper class that retrieves properties from the SDK's NetworkConfiguration object when
 * available.
 *
 * This helper:
 * - It enumerates the network configuration properties the wallet uses
 * - It handles possible problems when the network configuration coming from the server is
 * incomplete.
 * - It defines common defaults when properties from unknown
 * - It parses configuration values to a format the wallet understands
 */
export class NetworkConfigurationHelpers {
    /**
     * This are the absolute defaults if the network is down and the configuration hasn't been cached
     * in the local storage.
     */
    private static defaults = networkConfig[NetworkType.TEST_NET].networkConfigurationDefaults;

    public static maxTokenDivisibility(
        networkConfiguration: NetworkConfiguration | undefined,
        defaultValue: number | undefined = undefined,
    ): number {
        return (
            (networkConfiguration &&
                networkConfiguration.plugins &&
                networkConfiguration.plugins.token &&
                Formatters.configurationNumberAsNumber(networkConfiguration.plugins.token.maxTokenDivisibility)) ||
            defaultValue ||
            this.defaults.maxTokenDivisibility
        );
    }

    public static maxNamespaceDepth(
        networkConfiguration: NetworkConfiguration | undefined,
        defaultValue: number | undefined = undefined,
    ): number {
        return (
            (networkConfiguration &&
                networkConfiguration.plugins &&
                networkConfiguration.plugins.namespace &&
                Formatters.configurationNumberAsNumber(networkConfiguration.plugins.namespace.maxNamespaceDepth)) ||
            defaultValue ||
            this.defaults.maxNamespaceDepth
        );
    }

    public static namespaceGracePeriodDuration(
        networkConfiguration: NetworkConfiguration | undefined,
        defaultValue: number | undefined = undefined,
    ): number {
        return (
            (networkConfiguration &&
                networkConfiguration.plugins &&
                networkConfiguration.plugins.namespace &&
                TimeHelpers.durationStringToSeconds(networkConfiguration.plugins.namespace.namespaceGracePeriodDuration)) ||
            defaultValue ||
            this.defaults.namespaceGracePeriodDuration
        );
    }

    public static maxCosignatoriesPerAccount(
        networkConfiguration: NetworkConfiguration | undefined,
        defaultValue: number | undefined = undefined,
    ): number {
        return (
            (networkConfiguration &&
                networkConfiguration.plugins &&
                networkConfiguration.plugins.multisig &&
                Formatters.configurationNumberAsNumber(networkConfiguration.plugins.multisig.maxCosignatoriesPerAccount)) ||
            defaultValue ||
            this.defaults.maxCosignatoriesPerAccount
        );
    }

    public static blockGenerationTargetTime(
        networkConfiguration: NetworkConfiguration | undefined,
        defaultValue: number | undefined = undefined,
    ): number {
        return (
            (networkConfiguration &&
                networkConfiguration.chain &&
                TimeHelpers.durationStringToSeconds(networkConfiguration.chain.blockGenerationTargetTime)) ||
            defaultValue ||
            this.defaults.blockGenerationTargetTime
        );
    }

    public static lockedFundsPerAggregate(
        networkConfiguration: NetworkConfiguration | undefined,
        defaultValue: string | undefined = undefined,
    ): string {
        return (
            (networkConfiguration &&
                networkConfiguration.plugins &&
                networkConfiguration.plugins.lockhash &&
                Formatters.configurationNumberAsString(networkConfiguration.plugins.lockhash.lockedFundsPerAggregate)) ||
            defaultValue ||
            this.defaults.lockedFundsPerAggregate
        );
    }

    public static maxTokenDuration(
        networkConfiguration: NetworkConfiguration | undefined,
        defaultValue: number | undefined = undefined,
    ): number {
        return (
            (networkConfiguration &&
                networkConfiguration.plugins &&
                networkConfiguration.plugins.token &&
                TimeHelpers.durationStringToSeconds(networkConfiguration.plugins.token.maxTokenDuration)) ||
            defaultValue ||
            this.defaults.maxTokenDuration
        );
    }

    public static epochAdjustment(
        networkConfiguration: NetworkConfiguration | undefined,
        defaultValue: number | undefined = undefined,
    ): number {
        return (
            (networkConfiguration &&
                networkConfiguration.plugins &&
                networkConfiguration.plugins.token &&
                TimeHelpers.durationStringToSeconds(networkConfiguration.network.epochAdjustment)) ||
            defaultValue ||
            this.defaults.epochAdjustment
        );
    }

    public static minNamespaceDuration(
        networkConfiguration: NetworkConfiguration | undefined,
        defaultValue: number | undefined = undefined,
    ): number {
        return (
            (networkConfiguration &&
                networkConfiguration.plugins &&
                networkConfiguration.plugins.namespace &&
                TimeHelpers.durationStringToSeconds(networkConfiguration.plugins.namespace.minNamespaceDuration)) ||
            defaultValue ||
            this.defaults.minNamespaceDuration
        );
    }

    public static maxNamespaceDuration(
        networkConfiguration: NetworkConfiguration | undefined,
        defaultValue: number | undefined = undefined,
    ): number {
        return (
            (networkConfiguration &&
                networkConfiguration.plugins &&
                networkConfiguration.plugins.namespace &&
                TimeHelpers.durationStringToSeconds(networkConfiguration.plugins.namespace.maxNamespaceDuration)) ||
            defaultValue ||
            this.defaults.maxNamespaceDuration
        );
    }

    public static maxTransactionsPerAggregate(
        networkConfiguration: NetworkConfiguration | undefined,
        defaultValue: number | undefined = undefined,
    ): number {
        return (
            (networkConfiguration &&
                networkConfiguration.plugins &&
                networkConfiguration.plugins.aggregate &&
                Formatters.configurationNumberAsNumber(networkConfiguration.plugins.aggregate.maxTransactionsPerAggregate)) ||
            defaultValue ||
            this.defaults.maxTransactionsPerAggregate
        );
    }

    public static maxCosignedAccountsPerAccount(
        networkConfiguration: NetworkConfiguration | undefined,
        defaultValue: number | undefined = undefined,
    ): number {
        return (
            (networkConfiguration &&
                networkConfiguration.plugins &&
                networkConfiguration.plugins.multisig &&
                Formatters.configurationNumberAsNumber(networkConfiguration.plugins.multisig.maxCosignedAccountsPerAccount)) ||
            defaultValue ||
            this.defaults.maxCosignedAccountsPerAccount
        );
    }

    public static maxMessageSize(
        networkConfiguration: NetworkConfiguration | undefined,
        defaultValue: number | undefined = undefined,
    ): number {
        return (
            (networkConfiguration &&
                networkConfiguration.plugins &&
                networkConfiguration.plugins.transfer &&
                Formatters.configurationNumberAsNumber(networkConfiguration.plugins.transfer.maxMessageSize)) ||
            defaultValue ||
            this.defaults.maxMessageSize
        );
    }

    public static maxTokenAtomicUnits(
        networkConfiguration: NetworkConfiguration | undefined,
        defaultValue: number | undefined = undefined,
    ): number {
        return (
            (networkConfiguration &&
                networkConfiguration.chain &&
                Formatters.configurationNumberAsNumber(networkConfiguration.chain.maxTokenAtomicUnits)) ||
            defaultValue ||
            this.defaults.maxTokenAtomicUnits
        );
    }

    public static currencyTokenId(
        networkConfiguration: NetworkConfiguration | undefined,
        defaultValue: string | undefined = undefined,
    ): string {
        return (
            (networkConfiguration &&
                networkConfiguration.chain &&
                Formatters.configurationStringAsString(networkConfiguration.chain.currencyTokenId)) ||
            defaultValue ||
            this.defaults.currencyTokenId
        );
    }

    public static harvestingTokenId(
        networkConfiguration: NetworkConfiguration | undefined,
        defaultValue: string | undefined = undefined,
    ): string {
        return (
            (networkConfiguration &&
                networkConfiguration.chain &&
                Formatters.configurationStringAsString(networkConfiguration.chain.harvestingTokenId)) ||
            defaultValue ||
            this.defaults.harvestingTokenId
        );
    }

    public static defaultDynamicFeeMultiplier(
        networkConfiguration: NetworkConfiguration | undefined,
        defaultValue: number | undefined = undefined,
    ): number {
        return (
            (networkConfiguration &&
                networkConfiguration.chain &&
                Formatters.configurationNumberAsNumber(networkConfiguration.chain.defaultDynamicFeeMultiplier)) ||
            defaultValue ||
            this.defaults.defaultDynamicFeeMultiplier
        );
    }

    public static totalChainImportance(
        networkConfiguration: NetworkConfiguration | undefined,
        defaultValue: number | undefined = undefined,
    ): number {
        return (
            (networkConfiguration?.chain && Formatters.configurationNumberAsNumber(networkConfiguration.chain.totalChainImportance)) ||
            defaultValue ||
            this.defaults.totalChainImportance
        );
    }
}
