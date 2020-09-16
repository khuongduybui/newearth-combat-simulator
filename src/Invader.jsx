import * as numeral from 'numeral';
import { createState, createEffect, createDependentEffect } from 'solid-js';

const Invader = () => {
  const [state, setState] = createState({
    heroAttack: 0,
    invaderAttack: 0,
    energyUsage: 0,
    combatShip: 0,
    bugLevel: 1,
    bugHealth: 0,
    chain: 1,
    damage: 0,
    energy: 0,
  });
  if (localStorage.getItem('invader')) setState(JSON.parse(localStorage.getItem('invader')));
  createEffect(() => localStorage.setItem('invader', JSON.stringify(state)));

  const bindToState = (field) => (e) => setState({ [field]: e.target.value });

  const num = (field) => numeral(state[field]).value();
  const numFormat = (field) => numeral(state[field]).format('0,0');

  const damage = (chain) => num('heroAttack') * (1 + num('invaderAttack') + num('combatShip')) * (chain * (1 + (chain - 1) * 0.025));

  createDependentEffect(
    () => {
      let chain = 1,
        currentDamage = damage(chain);
      while (currentDamage < num('bugHealth') && chain < 41) currentDamage = damage(++chain);
      setState({ chain });
    },
    [() => num('heroAttack'), () => num('invaderAttack'), () => num('combatShip'), () => num('bugHealth')],
    true,
  );

  createEffect(() => {
    setState({
      damage: damage(num('chain')),
      energy: (num('bugLevel') + 1) * 100 * (1 - num('energyUsage')) * num('chain'),
    });
  });

  return (
    <>
      <h1>Hero Invader Calculator</h1>
      <p>Please input your hero attack damage, invader attack buff, and combat ship buff if any.</p>
      <h2>Configure</h2>
      <label>
        Hero Attack (e.g. <code>100,000</code>)<input type='text' value={numFormat('heroAttack')} onInput={bindToState('heroAttack')}></input>
      </label>
      <label>
        Hero Invader Attack (e.g. <code>70%</code>)<input type='text' value={state.invaderAttack} onInput={bindToState('invaderAttack')}></input>
      </label>
      <label>
        Invader Energy Cost Reduction (e.g. <code>35%</code>)<input type='text' value={state.energyUsage} onInput={bindToState('energyUsage')}></input>
      </label>
      <label>
        Combat Ship (e.g. <code>25%</code>)<input type='text' value={state.combatShip} onInput={bindToState('combatShip')}></input>
      </label>

      <p>Now you can input Bug Health and the tool will suggest the required chain to kill it.</p>
      <h2>Target</h2>
      <label>
        Bug Level
        <input type='text' value={state.bugLevel} onInput={bindToState('bugLevel')}></input>
      </label>
      <label>
        Bug Health
        <input type='text' value={numFormat('bugHealth')} onInput={bindToState('bugHealth')}></input>
      </label>

      <p>Alternatively, feel free to adjust the chain to see the expected damage.</p>
      <h2>Chain</h2>
      <label>
        Chain: {state.chain}
        <input type='range' min='1' max='41' value={state.chain} onInput={bindToState('chain')}></input>
      </label>
      <label>
        Damage
        <input type='text' readonly value={numFormat('damage')}></input>
      </label>
      <label>
        Energy
        <input type='text' readonly value={numFormat('energy')}></input>
      </label>
    </>
  );
};

export default Invader;
