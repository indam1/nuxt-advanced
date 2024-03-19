import { it } from "vitest";
import {mountSuspended} from "@nuxt/test-utils/runtime";
import {ProductMortgageForm} from "#components";

it('can mount the component', async () => {
    const component = await mountSuspended(ProductMortgageForm);
});
