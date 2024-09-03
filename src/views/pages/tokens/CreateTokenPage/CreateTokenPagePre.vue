<template>
    <AssetFormPageWrap v-if="activePanel === 1">
        <template v-slot:form-section>
            <div style="width: 100%; padding-top: 0.5rem; padding-left: 1rem; padding-right: 1rem;">
                <div style="background-color: white; border-radius: 5px; overflow: hidden; height: 5rem; width: 100%;">
                    <div
                        style="
                            margin-left: 5px;
                            margin-right: 5px;
                            margin-top: 5px;
                            background: linear-gradient(272deg, #d8d8d8, #f1ebef);
                            border-radius: 5px;
                            height: 90px;
                            display: flex;
                            justify-content: center;
                            align-items: center;
                            flex-direction: column;
                        "
                    >
                        <spam
                            style="font-size: 40px; font-family: 'Xolonium'; color: '#' text-align: center; margin: 0 0.2rem; font-weight: bold"
                            >BPS-X1</spam
                        ><spam
                            style="font-size: 20px; font-family: 'Xolonium'; color: '#' text-align: center;  margin: 0 0.2rem; padding-bottom: 0.2rem; font-weight: bold"
                            >[Bitxor Protocol Standard]</spam
                        >
                    </div>
                    <div style="margin-top: 25px; display: grid; grid-template-columns: 50% 50%;">
                        <div class="label-container">
                            <div class="form-label-container" style="padding-left: 5px; padding-right: 1.2px;">
                                <button
                                    class="centered-button button-style submit-button inverted-button"
                                    style="
                                        display: grid !important;
                                        align-items: center;
                                        height: 2.5rem !important;
                                        border-top-left-radius: 0.12rem !important;
                                        border-bottom-left-radius: 0.12rem !important;
                                    "
                                    @click="tabset(2)"
                                >
                                    <img
                                        style="
                                            position: absolute;

                                            right: 0;
                                            border-style: none;
                                            opacity: 0.2;
                                        "
                                        contain
                                        height="160px"
                                        src="@/views/resources/slide_0@3x.png"
                                        class="grayed-bxr-logo"
                                    />
                                    <spam style="font-size: 0.9rem; font-family: 'Xolonium'; font-weight: 550; top: 0; left: 0;"
                                        >Token</spam
                                    >
                                </button>
                            </div>
                        </div>
                        <div class="label-container">
                            <div class="form-label-container" style="padding-right: 5px; padding-left: 1.2px;">
                                <button
                                    class="centered-button button-style submit-button inverted-button"
                                    style="
                                        background: linear-gradient(315.55deg, #1baa9c -1.68%, #1a7c70 110.7%) !important;
                                        display: grid !important;
                                        align-items: center;
                                        height: 2.5rem !important;
                                        border-top-right-radius: 0.12rem !important;
                                        border-bottom-right-radius: 0.12rem !important;
                                    "
                                >
                                    <img
                                        style="
                                            position: absolute;

                                            right: 0;
                                            border-style: none;
                                            opacity: 0.2;
                                        "
                                        contain
                                        height="160px"
                                        src="@/views/resources/slide_0@3x.png"
                                        class="grayed-bxr-logo"
                                    />
                                    <spam style="font-size: 0.9rem; font-family: 'Xolonium'; font-weight: 550; top: 0; left: 0;">NFT</spam>
                                </button>
                            </div>
                        </div>
                    </div>
                    <div style="padding-right: 10px; padding-left: 10px; padding-top: 5px;">
                        <spam style="font-size: 12px; font-family: 'Xolonium'; color: '#000'; font-weight: bold;"
                            >Los Token y NFT son creados en el protocolo de Bitxor siguiendo el estándar BPS-X1, y son registrados
                            automáticamente mediante su Logic Smart Contract (LSC) un contrato inteligente que no requiere ser compilado.
                            Importante mantener saldo de BXR disponibles.
                        </spam>
                    </div>
                </div>
                <div
                    style="
                        background-color: white;
                        display: flex;
                        border-radius: 5px;
                        align-items: center;
                        margin-top: 10px;
                        height: 0.8rem;
                    "
                >
                    <div style="padding-right: 5px; padding-left: 5px;">
                        <button
                            class="centered-button button-style submit-button"
                            style="
                                background: none !important;
                                border-style: solid;

                                border-width: 4px !important;

                                border-color: #662d91 !important;
                                display: grid !important;
                                align-items: center;
                                height: 45px !important;
                                width: 150px !important;
                                border-radius: 0.12rem !important;
                            "
                            @click="tabset(4)"
                        >
                            <spam style="font-size: 25px; font-family: 'Xolonium'; font-weight: 550; top: 0; left: 0; color: #662d91;"
                                >ST-ID</spam
                            >
                        </button>
                    </div>
                    <div style="margin-left: 10px;">
                        <spam style="font-size: 10px; color: '#568d96'; font-family: 'Xolonium'; top: 0; left: 0;"
                            >Los Simple Token ID (ST-ID) son una versión multifuncional sin estandar del protocolo Bitxor que permite crear
                            proyectos de tiempos ajustables según las necesidades para un uso privado. (eventos, cupones, loto, inventarios,
                            entre otros). Estos tokens podrían no ser validos para una certificación.</spam
                        >
                    </div>
                </div>
            </div>
        </template>
    </AssetFormPageWrap>

    <TokenTypeSelectorPanelToken v-else-if="activePanel === 2" :hold-tokens="holdTokens" />
    <TokenTypeSelectorPanelSTID v-else-if="activePanel === 4" :hold-tokens="holdTokens" />
    <TokenTypeSelectorPanelNft v-else-if="activePanel === 3" />
</template>

<script lang="ts">
// external dependencies
import { Component, Vue } from 'vue-property-decorator';

// child components
import NavigationLinks from '@/components/NavigationLinks/NavigationLinks.vue';
import AssetFormPageWrap from '@/views/pages/assets/AssetFormPageWrap/AssetFormPageWrap.vue';

import TokenTypeSelectorPanel from '@/components/TokenTypeSelectorPanel/TokenTypeSelectorPanel.vue';
import TokenTypeSelectorPanelToken from '@/views/pages/tokens/CreateTokenPage/CreateTokenPage.vue';
import TokenTypeSelectorPanelSTID from '@/views/pages/tokens/CreateTokenPage/CreateTokenPageSTID.vue';
import TokenTypeSelectorPanelNft from '@/components/TokenTypeSelectorPanel/TokenTypeSelectorPanelNft.vue';

// @ts-ignore
@Component({
    components: {
        TokenTypeSelectorPanel,
        AssetFormPageWrap,
        NavigationLinks,
        TokenTypeSelectorPanelToken,
        TokenTypeSelectorPanelSTID,
        TokenTypeSelectorPanelNft,
    },
})
export default class CreateTokenPagePre extends Vue {
    public panelItems = ['accounts', 'addressbook'];
    public activeIndex = 1;

    public get activePanel() {
        return this.activeIndex;
    }
    public set activePanel(panel) {
        this.activeIndex = panel;
    }
    public tabset(index: number): void {
        // set default value to the first namespace in the list
        this.activeIndex = index;
    }
    public parentRouteName: string = 'tokens';
    public async tokencreate() {
        this.$router.push({ name: 'token.create' });
    }
    public async nftcreate() {
        this.$router.push({ name: 'nft.create' });
    }
}
</script>

<style lang="less" scoped>
/deep/ .form-wrapper {
    max-width: 14rem;
}
</style>
