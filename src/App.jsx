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
      <nav>
        <a href='#invader'>Invader</a>
        <a href='#pve'>Alien Combat</a>
      </nav>
      <Switch>
        <Match when={matches('invader')}>
          <Invader />
        </Match>
        <Match when={matches('pve')}>
          <Alien />
        </Match>
      </Switch>
      <footer>
        <p>Credits: InDeeDo</p>
      </footer>
    </>
  );
};

export default App;
