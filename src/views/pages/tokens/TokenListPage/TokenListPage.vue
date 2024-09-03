<template>
    <AssetListPageWrap>
        <template v-slot:table-section>
            <TableDisplay class="table-section" asset-type="token" @on-add-metadata="showMetadataModal = true" />
            <ModalMetadataUpdate v-if="showMetadataModal" :visible="showMetadataModal" :type="1" @close="showMetadataModal = false" />
        </template>
    </AssetListPageWrap>
</template>

<script lang="ts">
import { TokenListPageTs } from './TokenListPageTs';
export default class TokenListPage extends TokenListPageTs {}
</script>

<style lang="less" scoped>

.table-section {
    padding-left: 0.2rem;
    padding-right: 0.2rem;
    height: 100%;
}
</style>
