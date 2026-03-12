import { expect } from '@playwright/test';
import { test as base } from 'playwright-bdd';

export type MundoPrueba = {
  razaSeleccionada: string | null;
};

export const test = base.extend<{ mundo: MundoPrueba }>({
  mundo: async ({ page }, use) => {
    void page;

    await use({
      razaSeleccionada: null,
    });
  },
});

export { expect };
