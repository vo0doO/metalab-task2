import './index.scss';
import intern from 'intern';
import './components/text-field/text-field';
import './components/dropdown/dropdown';
import './components/counter/counter';
import './components/button/button';
import './components/dropdown/dropdown.spec';
import './components/counter/counter.spec';
import './components/button/button.spec';
import.meta.webpackHot.accept(
	intern,
	'intern',
	'./index.js',
	'./components/text-field/text-field',
	'./components/dropdown/dropdown',
	'./components/counter/counter',
	'./components/button/button',
	'./components/dropdown/dropdown.spec',
	'./components/counter/counter.spec',
	'./components/button/button.spec',
);
