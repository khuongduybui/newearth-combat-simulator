import * as numeral from 'numeral';
import { createState, createEffect } from 'solid-js';

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
    points: 0,
    ppe: 0,
    topPpe: 0,
    goodPpe: true,
  });
  if (localStorage.getItem('invader')) setState(JSON.parse(localStorage.getItem('invader')));
  createEffect(() => localStorage.setItem('invader', JSON.stringify(state)));

  const bindToState = (field) => (e) => setState({ [field]: e.target.value });

  const num = (field) => numeral(state[field]).value();
  const numFormat = (field) => numeral(state[field]).format('0,0.[000]');

  const damage = (chain) => num('heroAttack') * (1 + num('invaderAttack') + num('combatShip')) * (chain * (1 + (chain - 1) * 0.025));
  const points = (bugLevel) => [0, 20, 55, 150, 335, 640, 1110, 1730, 2575][bugLevel];
  const chain = (bugHealth) => {
    let chain = 1,
      currentDamage = damage(chain);
    while (currentDamage < bugHealth && chain < 41) currentDamage = damage(++chain);
    return chain;
  };
  const energy = (bugLevel, chain) => (bugLevel + 1) * 100 * (1 - num('energyUsage')) * chain;

  createEffect(() => setState({ chain: chain(num('bugHealth')) }));

  createEffect(() => {
    const newState = {
      damage: damage(num('chain')),
      energy: energy(num('bugLevel'), num('chain')),
      points: points(num('bugLevel')),
    };
    newState.ppe = newState.points / newState.energy;
    newState.topPpe = points(8) / energy(8, chain(5000000));
    newState.goodPpe = newState.ppe >= newState.topPpe;
    setState(newState);
  });

  return (
    <>
      <h1>Hero Invader Calculator</h1>
      <p>Please input your hero attack damage, invader attack buff, and combat ship buff if any.</p>
      <fieldset>
        <legend>Configure</legend>
        <table>
          <tbody>
            <tr>
              <td>
                <label>
                  Hero Attack (e.g. <code>100,000</code>)<input type='text' value={numFormat('heroAttack')} onInput={bindToState('heroAttack')}></input>
                </label>
              </td>
              <td>
                <label>
                  Hero Invader Attack (e.g. <code>70%</code>)<input type='text' value={state.invaderAttack} onInput={bindToState('invaderAttack')}></input>
                </label>
              </td>
              <td>
                <label>
                  Invader Energy Cost Reduction (e.g. <code>35%</code>)
                  <input type='text' value={state.energyUsage} onInput={bindToState('energyUsage')}></input>
                </label>
              </td>
              <td>
                <label>
                  Combat Ship (e.g. <code>25%</code>)<input type='text' value={state.combatShip} onInput={bindToState('combatShip')}></input>
                </label>
              </td>
            </tr>
          </tbody>
        </table>
      </fieldset>

      <p>Now you can input Bug Health and the tool will suggest the required chain to kill it.</p>
      <fieldset>
        <legend>Target</legend>
        <table>
          <tbody>
            <tr>
              <td>
                <label>
                  Bug Level
                  <input type='text' value={state.bugLevel} onInput={bindToState('bugLevel')}></input>
                </label>
              </td>
              <td>
                <label>
                  Bug Health
                  <input type='text' value={numFormat('bugHealth')} onInput={bindToState('bugHealth')}></input>
                </label>
              </td>
            </tr>
          </tbody>
        </table>
      </fieldset>

      <p>Alternatively, feel free to adjust the chain to see the expected damage.</p>
      <fieldset>
        <legend>Chain</legend>
        <table>
          <tbody>
            <tr>
              <td>
                <label>
                  Chain: {state.chain}
                  <input type='range' min='1' max='41' value={state.chain} onInput={bindToState('chain')}></input>
                </label>
              </td>
              <td>
                <label>
                  Damage
                  <input type='text' readonly value={numFormat('damage')}></input>
                </label>
              </td>
              <td>
                <label>
                  Energy
                  <input type='text' readonly value={numFormat('energy')}></input>
                </label>
              </td>
              <td>
                <label>
                  Event Points (<code>{numFormat('ppe')}</code> per energy spent <strong>{state.goodPpe ? 'GOOD' : 'BAD'}</strong>)
                  <input type='text' readonly value={numFormat('points')}></input>
                </label>
              </td>
            </tr>
          </tbody>
        </table>
      </fieldset>
    </>
  );
};

export default Invader;
