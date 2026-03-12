import { createBdd } from 'playwright-bdd';

import { expect, test } from '../support/world';

const { Given, When, Then } = createBdd(test);

Given('que el usuario abre la aplicacion', async ({ page }) => {
  await page.goto('/');
});

When('selecciona la raza {string}', async ({ page, mundo }, raza: string) => {
  mundo.razaSeleccionada = raza;

  await page.getByTestId(`breed-item-${raza}`).click();
});

Then(
  'deberia ver la ficha informativa principal de esa raza',
  async ({ page, mundo }) => {
    await expect(page.getByTestId('breed-spotlight')).toBeVisible();
    await expect(page.getByTestId('featured-image')).toBeVisible();
    await expect(page.getByText(/perfil narrativo/i)).toBeVisible();

    if (mundo.razaSeleccionada) {
      await expect(page.getByTestId('selected-breed-title')).toContainText(
        new RegExp(mundo.razaSeleccionada, 'i'),
      );
    }
  },
);
