// main.js or main.ts
import { useAppStore } from '$lib/stores/app';
import { setBasePath } from '@shoelace-style/shoelace';
import '@shoelace-style/shoelace/dist/themes/light.css';

// import { setBasePath as setPurekitBasePath } from 'pure-uikit';
// setPurekitBasePath('/path/to/pure-uikit/dist');

setBasePath('https://cdn.jsdelivr.net/npm/@shoelace-style/shoelace@2.19.1/cdn/');
