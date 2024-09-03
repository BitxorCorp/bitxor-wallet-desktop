<template>
    <div>
        <span>{{ holdToken_ }}</span>
        <NavigationLinks
            :direction="'horizontal'"
            :items="panelItems"
            :current-item-index="activePanel"
            translation-prefix="tab_token_"
            @selected="(i) => (activePanel = i)"
        />
        <CreateTokenPageInit v-if="activePanel === 0" />
        <CreateName v-if="activePanel === 1" />
    </div>
</template>

<script lang="ts">
import { CreateTokenPageTs } from './CreateTokenPageTsSTID';
export default class CreateTokenPageSTID extends CreateTokenPageTs {}
</script>

<style lang="less" scoped>
/deep/ .form-wrapper {
    max-width: 14rem;
}
/deep/ .horizontal {
    justify-content: center !important;
}
</style>
