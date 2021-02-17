import { writable } from 'svelte/store';


export default writable({
	'food': {height: 0, expanded: false, button: false}, 
	'drink': {height: 0, expanded: false, button: false}, 
	'explore': {height: 0, expanded: false, button: false}});