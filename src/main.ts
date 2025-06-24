import './styles/main.scss';

import { App } from './components/app/app';

const app = new App();
document.body.append(app.getElement());
