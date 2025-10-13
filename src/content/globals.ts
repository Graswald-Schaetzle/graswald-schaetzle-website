import { getCollection } from 'astro:content';

const globals = await getCollection('globals');
const globalsDe = await getCollection('globalsDe');

export const general = globals[0].data.general[0];
export const navigation = globals[0].data.navigation[0];
export const footer = globals[0].data.footer[0];
export const page404 = globals[0].data.page404[0];

export const generalDe = globalsDe[0].data.general[0];
export const navigationDe = globalsDe[0].data.navigation[0];
export const footerDe = globalsDe[0].data.footer[0];
export const page404De = globalsDe[0].data.page404[0];
