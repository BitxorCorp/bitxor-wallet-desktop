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
import { TransactionType } from 'bitxor-sdk';

// @ts-ignore
import createImg from '@/views/resources/img/icons/Read.png';
// @ts-ignore
import seedImg from '@/views/resources/img/login/seed.png';
// @ts-ignore
import trezorImg from '@/views/resources/img/login/trezor.png';
// @ts-ignore
import ledgerImg from '@/views/resources/img/login/ledger.png';
// @ts-ignore
import importStepImage1 from '@/views/resources/img/login/1_4.png';
// @ts-ignore
import importStepImage2 from '@/views/resources/img/login/2_4.png';
// @ts-ignore
import importStepImage3 from '@/views/resources/img/login/3_4.png';
// @ts-ignore
import importStepImage4 from '@/views/resources/img/login/4_4.png';
// @ts-ignore
import createStepImage1 from '@/views/resources/img/login/1_5.png';
// @ts-ignore
import createStepImage2 from '@/views/resources/img/login/2_5.png';
// @ts-ignore
import createStepImage3 from '@/views/resources/img/login/3_5.png';
// @ts-ignore
import createStepImage4 from '@/views/resources/img/login/4_5.png';
// @ts-ignore
import createStepImage5 from '@/views/resources/img/login/5_5.png';
// @ts-ignore
import dashboardUnconfirmed from '@/views/resources/img/monitor/dash-board/dashboardUnconfirmed.png';
// @ts-ignore
import dashboardConfirmed from '@/views/resources/img/monitor/dash-board/dashboardConfirmed.png';
// @ts-ignore
import optinLogo from '@/views/resources/img/optin.png';
// @ts-ignore
import windowDashboard from '@/views/resources/img/window/windowDashboard.png';
// @ts-ignore
import windowDashboardActive from '@/views/resources/img/window/windowDashboardActive.png';
// @ts-ignore
import windowWallet from '@/views/resources/img/window/windowWallet.png';
// @ts-ignore
import windowWalletActive from '@/views/resources/img/window/windowWalletActive.png';
// @ts-ignore
import windowToken from '@/views/resources/img/window/windowToken.png';
// @ts-ignore
import windowTokenActive from '@/views/resources/img/window/windowTokenActive.png';
// @ts-ignore
import windowNamespace from '@/views/resources/img/window/windowNamespace.png';
// @ts-ignore
import windowNamespaceActive from '@/views/resources/img/window/windowNamespaceActive.png';
// @ts-ignore
import windowMultisig from '@/views/resources/img/window/windowMultisig.png';
// @ts-ignore
import windowMultisigActive from '@/views/resources/img/window/windowMultisigActive.png';
// @ts-ignore
import windowCommunity from '@/views/resources/img/window/windowCommunity.png';
// @ts-ignore
import windowCommunityActive from '@/views/resources/img/window/windowCommunityActive.png';
// @ts-ignore
import windowSetting from '@/views/resources/img/window/windowSetting.png';
// @ts-ignore
import windowSettingActive from '@/views/resources/img/window/windowSettingActive.png';
// @ts-ignore
import selected from '@/views/resources/img/monitor/tokens/selected.png';
// @ts-ignore
import unselected from '@/views/resources/img/monitor/tokens/unselected.png';

// official icons

// @ts-ignore
import accountRestrictionAlt from '@/views/resources/img/icons/account-restriction-alt.png';
// @ts-ignore
import accountRestriction from '@/views/resources/img/icons/account-restriction.png';
// @ts-ignore
import addAccount from '@/views/resources/img/icons/add-profile.png';
// @ts-ignore
import addAggregate from '@/views/resources/img/icons/add-aggregate.png';
// @ts-ignore
import aggregate from '@/views/resources/img/icons/aggregate.png';
// @ts-ignore
import aggregateTransaction from '@/views/resources/img/icons/aggregate-transaction.png';
// @ts-ignore
import alias from '@/views/resources/img/icons/alias.png';
// @ts-ignore
import apiNode from '@/views/resources/img/icons/api-node.png';
// @ts-ignore
import blockchainBlock from '@/views/resources/img/icons/blockchain-block.png';
// @ts-ignore
import blockchain from '@/views/resources/img/icons/blockchain.png';
// @ts-ignore
import block from '@/views/resources/img/icons/block.png';
// @ts-ignore
import blocks from '@/views/resources/img/icons/blocks.png';
// @ts-ignore
import blockTime from '@/views/resources/img/icons/block-time.png';
// @ts-ignore
import card from '@/views/resources/img/icons/card.png';
// @ts-ignore
import certificate from '@/views/resources/img/icons/certificate.png';
// @ts-ignore
import checkMark from '@/views/resources/img/icons/check-mark.png';
// @ts-ignore
import confirmed from '@/views/resources/img/icons/confirmed.png';
// @ts-ignore
import crossChain from '@/views/resources/img/icons/cross-chain.png';
// @ts-ignore
import cryptography from '@/views/resources/img/icons/cryptography.png';
// @ts-ignore
import customerAlice from '@/views/resources/img/icons/customer-alice.png';
// @ts-ignore
import customerBob from '@/views/resources/img/icons/customer-bob.png';
// @ts-ignore
import customerCharlie from '@/views/resources/img/icons/customer-charlie.png';
// @ts-ignore
import dashboard from '@/views/resources/img/icons/dashboard.png';
// @ts-ignore
import delegatedHarvesting from '@/views/resources/img/icons/delegated-harvesting.png';
// @ts-ignore
import encryptedMessage from '@/views/resources/img/icons/encrypted-message.png';
// @ts-ignore
import enterprise from '@/views/resources/img/icons/enterprise.png';
// @ts-ignore
import envelope from '@/views/resources/img/icons/envelope.png';
// @ts-ignore
import explorer from '@/views/resources/img/newicons/NavExplorer.png';
// @ts-ignore
import fingerprint from '@/views/resources/img/icons/fingerprint.png';
// @ts-ignore
import harvest from '@/views/resources/img/icons/harvest.png';
// @ts-ignore
import history from '@/views/resources/img/icons/history.png';
// @ts-ignore
import incoming from '@/views/resources/img/icons/incoming.png';
// @ts-ignore
import lock from '@/views/resources/img/icons/lock.png';
// @ts-ignore
import message from '@/views/resources/img/icons/message.png';
// @ts-ignore
import metadata from '@/views/resources/img/icons/metadata.png';
// @ts-ignore
import token from '@/views/resources/img/icons/token.png';
// @ts-ignore
import tokens from '@/views/resources/img/icons/tokens.png';
// @ts-ignore
import tokenTransaction from '@/views/resources/img/icons/token.png';
// @ts-ignore
import tokenRestriction from '@/views/resources/img/icons/token-restriction.png';
// @ts-ignore
import multipleParties from '@/views/resources/img/icons/multiple-parties.png';
// @ts-ignore
import multisig from '@/views/resources/img/icons/multisig.png';
// @ts-ignore
import namespace from '@/views/resources/img/icons/namespace.png';
// @ts-ignore
import namespaceTransaction from '@/views/resources/img/icons/namespace.png';
// @ts-ignore
import bitxorcorpCli from '@/views/resources/img/icons/bitxorcorp-cli.png';
// @ts-ignore
import bitxorcorpSdk from '@/views/resources/img/icons/bitxorcorp-sdk.png';
// @ts-ignore
import news from '@/views/resources/img/icons/news.png';
// @ts-ignore
import nodeReputation from '@/views/resources/img/icons/node-reputation.png';
// @ts-ignore
import nodes from '@/views/resources/img/icons/nodes.png';
// @ts-ignore
import notMultisig from '@/views/resources/img/icons/not-multisig.png';
// @ts-ignore
import outgoing from '@/views/resources/img/icons/outgoing.png';
// @ts-ignore
import optinTransaction from '@/views/resources/img/icons/optin-transaction.png';
// @ts-ignore
import pending from '@/views/resources/img/icons/pending.png';
// @ts-ignore
import privateChain from '@/views/resources/img/icons/private-chain.png';
// @ts-ignore
import privateKey from '@/views/resources/img/icons/private-key.png';
// @ts-ignore
import publicChain from '@/views/resources/img/icons/public-chain.png';
// @ts-ignore
import publicKey from '@/views/resources/img/icons/public-key.png';
// @ts-ignore
import publicPrivateKey from '@/views/resources/img/icons/public-private-key.png';
// @ts-ignore
import qr from '@/views/resources/img/icons/qr.png';
// @ts-ignore
import receive from '@/views/resources/img/icons/receive.png';
// @ts-ignore
import receive2 from '@/views/resources/img/icons/receive2.png';
// @ts-ignore
import send from '@/views/resources/img/icons/send.png';
// @ts-ignore
import send2 from '@/views/resources/img/icons/send2.png';
// @ts-ignore
import sent from '@/views/resources/img/icons/sent.png';
// @ts-ignore
import settings from '@/views/resources/img/newicons/NavSettings.png';
// @ts-ignore
import signatureRequired from '@/views/resources/img/icons/signature-required.png';
// @ts-ignore
import signCosign from '@/views/resources/img/icons/sign-cosign.png';
// @ts-ignore
import spamThrottle from '@/views/resources/img/icons/spam-throttle.png';
// @ts-ignore
import statistics from '@/views/resources/img/icons/statistics.png';
// @ts-ignore
import transactions from '@/views/resources/img/icons/transactions.png';
// @ts-ignore
import transfer from '@/views/resources/img/icons/transfer.png';
// @ts-ignore
import transferTransactions from '@/views/resources/img/icons/transfer-transactions.png';
// @ts-ignore
import unlock from '@/views/resources/img/icons/unlock.png';
// @ts-ignore
import wallet from '@/views/resources/img/icons/wallet.png';
// @ts-ignore
import logobxr from '@/views/resources/img/bitxor/BXRCoin.png';
// @ts-ignore
import bxrCoin from '@/views/resources/img/icons/bxr-coin.png';
// @ts-ignore
import voting from '@/views/resources/img/navbar/explorer.png';
// @ts-ignore
import faucet from '@/views/resources/img/navbar/faucet.png';
// @ts-ignore
import settings from '@/views/resources/img/navbar/settings.png';
// @ts-ignore
import warning from '@/views/resources/img/icons/warning.png';
// @ts-ignore
import warningWhite from '@/views/resources/img/icons/warning-white.png';
// @ts-ignore
import infoWhite from '@/views/resources/img/icons/info-white.png';

/// region exported image objects
export const walletTypeImages = {
    createImg,
    seedImg,
    trezorImg,
    ledgerImg,
};

export const importStepImage = {
    importStepImage1,
    importStepImage2,
    importStepImage3,
    importStepImage4,
};

export const createStepImage = {
    createStepImage1,
    createStepImage2,
    createStepImage3,
    createStepImage4,
    createStepImage5,
};

export const dashboardImages = {
    dashboardUnconfirmed,
    dashboardConfirmed,
    selected,
    unselected,
};

export const leftBarIcons = {
    windowDashboard,
    windowDashboardActive,
    windowWallet,
    windowWalletActive,
    windowToken,
    windowTokenActive,
    windowNamespace,
    windowNamespaceActive,
    windowMultisig,
    windowMultisigActive,
    windowCommunity,
    windowCommunityActive,
    windowSetting,
    windowSettingActive,
};

// icons provided by the marketing agency
export const officialIcons = {
    accountRestrictionAlt,
    accountRestriction,
    addAccount,
    addAggregate,
    aggregate,
    aggregateTransaction,
    alias,
    apiNode,
    blockchainBlock,
    blockchain,
    block,
    blocks,
    blockTime,
    card,
    certificate,
    checkMark,
    confirmed,
    crossChain,
    cryptography,
    customerAlice,
    customerBob,
    customerCharlie,
    dashboard,
    delegatedHarvesting,
    encryptedMessage,
    enterprise,
    envelope,
    explorer,
    fingerprint,
    harvest,
    history,
    incoming,
    lock,
    message,
    metadata,
    token,
    tokens,
    tokenRestriction,
    tokenTransaction,
    multipleParties,
    multisig,
    namespace,
    namespaceTransaction,
    bitxorcorpCli,
    bitxorcorpSdk,
    news,
    nodeReputation,
    nodes,
    notMultisig,
    outgoing,
    optinTransaction,
    pending,
    privateChain,
    privateKey,
    publicChain,
    publicKey,
    publicPrivateKey,
    qr,
    receive,
    receive2,
    send,
    send2,
    sent,
    settings,
    signatureRequired,
    signCosign,
    spamThrottle,
    statistics,
    transactions,
    transfer,
    transferTransactions,
    unlock,
    wallet,
    bxrCoin,
    voting,
    faucet,
    warning,
    warningWhite,
    infoWhite,
};

export const optinImages = {
    optinLogo,
};

export const transactionTypeToIcon = {
    [TransactionType.NAMESPACE_REGISTRATION]: officialIcons.namespaceTransaction,
    [TransactionType.ADDRESS_ALIAS]: officialIcons.alias,
    [TransactionType.TOKEN_ALIAS]: officialIcons.namespaceTransaction,
    [TransactionType.TOKEN_DEFINITION]: officialIcons.tokenTransaction,
    [TransactionType.TOKEN_SUPPLY_CHANGE]: officialIcons.tokenTransaction,
    [TransactionType.MULTISIG_ACCOUNT_MODIFICATION]: officialIcons.multipleParties,
    [TransactionType.AGGREGATE_COMPLETE]: officialIcons.aggregateTransaction,
    [TransactionType.AGGREGATE_BONDED]: officialIcons.aggregateTransaction,
    [TransactionType.AGGREGATE_BONDED + '_optin']: optinTransaction,
    [TransactionType.HASH_LOCK]: officialIcons.lock,
    [TransactionType.SECRET_LOCK]: officialIcons.lock,
    [TransactionType.SECRET_PROOF]: officialIcons.lock,
    [TransactionType.ACCOUNT_ADDRESS_RESTRICTION]: officialIcons.accountRestriction,
    [TransactionType.ACCOUNT_TOKEN_RESTRICTION]: officialIcons.tokenRestriction,
    [TransactionType.ACCOUNT_OPERATION_RESTRICTION]: officialIcons.accountRestrictionAlt,
    [TransactionType.ACCOUNT_KEY_LINK]: officialIcons.publicKey,
    [TransactionType.TOKEN_ADDRESS_RESTRICTION]: officialIcons.tokenRestriction,
    [TransactionType.TOKEN_GLOBAL_RESTRICTION]: officialIcons.tokenRestriction,
    [TransactionType.ACCOUNT_METADATA]: officialIcons.metadata,
    [TransactionType.TOKEN_METADATA]: officialIcons.metadata,
    [TransactionType.NAMESPACE_METADATA]: officialIcons.metadata,
    [TransactionType.VOTING_KEY_LINK]: officialIcons.publicKey,
    [TransactionType.VRF_KEY_LINK]: officialIcons.publicKey,
    [TransactionType.NODE_KEY_LINK]: officialIcons.publicKey,
};

/// end-region exported image objects
