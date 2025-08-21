import { defineConfig } from 'unocss';
import { presetWind4, presetWind3, presetTypography } from 'unocss';
import { transformerDirectives, transformerVariantGroup } from 'unocss';
import { presetAnimations } from 'unocss-preset-animations';
import { presetScrollbar } from 'unocss-preset-scrollbar';
import { presetShadcn } from 'unocss-preset-shadcn';
import { presetTailwindMotion } from 'unocss-preset-tailwindcss-motion';

export default defineConfig({
    presets: [
        presetWind4,
        presetWind3,
        presetAnimations,
        presetTailwindMotion,
        presetScrollbar,
        presetTypography,
        presetShadcn({
            color: 'blue',
            darkSelector: '[data-theme="dark"]',
        }),
    ],
    transformers: [transformerDirectives(), transformerVariantGroup()],
});
