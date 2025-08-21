import { defineConfig } from 'unocss';
import { presetWind4, presetWind3, presetTypography } from 'unocss';
import { transformerDirectives, transformerVariantGroup } from 'unocss';
import { presetAnimations } from 'unocss-preset-animations';
import { presetScrollbar } from 'unocss-preset-scrollbar';
import { presetShadcn } from 'unocss-preset-shadcn';

export default defineConfig({
    presets: [
        presetWind4,
        presetWind3,
        presetAnimations,
        presetScrollbar,
        presetTypography,
        presetShadcn({
            color: 'stone',
            darkSelector: '[data-theme="dark"]',
        }),
    ],
    transformers: [transformerDirectives(), transformerVariantGroup()],
});
