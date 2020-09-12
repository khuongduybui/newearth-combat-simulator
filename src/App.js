import { createSignal, onCleanup } from 'solid-js';
import { render, Switch, Match } from 'solid-js/dom';

import Invader from './Invader';
import Alien from './Alien';

function createRouteHandler() {
  const [location, setLocation] = createSignal(window.location.hash.slice(1) || 'invader'),
    locationHandler = () => setLocation(window.location.hash.slice(1));
  window.addEventListener('hashchange', locationHandler);
  onCleanup(() => window.removeEventListener('hashchange', locationHandler));
  return (match) => match === location();
}

const App = () => {
  const matches = createRouteHandler();
  return (
    <>
      <ul>
        <li>
          <a href='#invader'>Invader</a>
        </li>
        <li>
          <a href='#pve'>Alien Combat</a>
        </li>
      </ul>
      <Switch>
        <Match when={matches('invader')}>
          <Invader />
        </Match>
        <Match when={matches('pve')}>
          <Alien />
        </Match>
      </Switch>
    </>
  );
};

export default App;
