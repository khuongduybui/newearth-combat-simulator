import * as numeral from 'numeral';
import { createState, createEffect } from 'solid-js';

import './App.css';

function App() {
  const [state, setState] = createState({
    heroAttack: 0,
    invaderAttack: 0,
    energyUsage: 0,
    combatShip: 0,
    bugLevel: 1,
    bugHealth: 0,
    chain: 1,
  });
  if (localStorage.getItem('invader')) setState(JSON.parse(localStorage.getItem('invader')));
  createEffect(() => localStorage.setItem('invader', JSON.stringify(state)));

  const bindToState = (field, additional = () => ({})) => (e) => setState({ [field]: e.target.value, ...additional(e.target.value) });

  const num = (field) => numeral(state[field]).value();
  const numFormat = (field) => numeral(state[field]).format('0,0');
  // const percentFormat = (field) => numeral(state[field]).format('0%');

  const damage = (chain) => num('heroAttack') * (1 + num('invaderAttack') + num('combatShip')) * (chain * (1 + (chain - 1) * 0.025));
  const computeChain = (bugHealthInput) => {
    const bugHealth = numeral(bugHealthInput).value();
    let currentChain = 1,
      currentDamage = damage(currentChain);
    while (currentDamage < bugHealth) currentDamage = damage(++currentChain);
    return { chain: currentChain };
  };
  const energy = () => (num('bugLevel') + 1) * 100 * (1 - num('energyUsage')) * num('chain');

  return (
    <div>
      <h1>Hero Invader Calculator</h1>
      <p>Please input your hero attack damage, invader attack buff, and combat ship buff if any.</p>
      <h2>Configure</h2>
      <label>
        Hero Attack
        <input type='text' value={numFormat('heroAttack')} onInput={bindToState('heroAttack')}></input>
      </label>
      <label>
        Invader Attack
        <input type='text' value={state.invaderAttack} onInput={bindToState('invaderAttack')}></input>
      </label>
      <label>
        Energy Usage
        <input type='text' value={state.energyUsage} onInput={bindToState('energyUsage')}></input>
      </label>
      <label>
        Combat Ship
        <input type='text' value={state.combatShip} onInput={bindToState('combatShip')}></input>
      </label>

      <p>Now you can input Bug Health and the tool will suggest the required chain to kill it.</p>
      <h2>Target</h2>
      <label>
        Bug Level
        <input type='text' value={state.bugLevel} onInput={bindToState('bugLevel')}></input>
      </label>
      <label>
        Bug Health
        <input type='text' value={numFormat('bugHealth')} onInput={bindToState('bugHealth', computeChain)}></input>
      </label>

      <p>Alternatively, feel free to adjust the chain to see the expected damage.</p>
      <h2>Chain</h2>
      <label>
        Chain: {state.chain}
        <input type='range' min='1' max='40' value={state.chain} onInput={bindToState('chain')}></input>
      </label>
      <label>
        Damage
        <input type='text' readonly value={numeral(damage(num('chain'))).format('0,0')}></input>
      </label>
      <label>
        Energy
        <input type='text' readonly value={numeral(energy()).format('0,0')}></input>
      </label>
    </div>
  );
}

export default App;
