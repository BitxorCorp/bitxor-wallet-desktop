<template>
    <div class="account-detail-row-3cols" style="margin-top: 0.2rem;">
        <span class="label"> {{ $t('multisig_account_graph') }}:</span>
        <div class="value">
            <div class="account-detail-row-3cols">
                <tree :data="multisigGraphTree"></tree>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { AccountMultisigGraphTs } from './AccountMultisigGraphTs';

export default class AccountLinks extends AccountMultisigGraphTs {}
</script>

<style lang="less" scoped>
@import '../../views/resources/css/variables.less';
.ivu-tree {
    /deep/.ivu-tree-arrow,
    /deep/.ivu-tree-title {
        font-family: @bitxorFont;
        font-size: @normalFont;
        color: @purpleDark;
        white-space: pre-line;
        line-height: 0.6;
        padding: 6px 0;
    }
}
</style>
