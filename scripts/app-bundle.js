define('app',["exports", "numeral"], function (_exports, _numeral) {
  "use strict";

  _exports.__esModule = true;
  _exports.App = void 0;
  _numeral = _interopRequireDefault(_numeral);

  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

  function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

  var App = /*#__PURE__*/function () {
    function App() {
      this.battleLogs = [];
      this.buffs = {
        attack: 0.75,
        defense: 1.5066,
        health: 0.51,
        attackItem: 0,
        defenseItem: 0,
        combatShip: 0.2
      };
      this.hero = {
        name: 'hero',
        qty: 1,
        tier: 0,
        attack: 9500,
        defense: 100,
        health: 245,
        attackBuff: 0.56,
        defenseBuff: 1.2,
        healthBuff: 0.5
      };
      this.aat1 = {
        name: 'Greys',
        qty: 0,
        tier: 1,
        attack: 0,
        defense: 1,
        health: 1
      };
      this.aat2 = {
        name: 'Bashers',
        qty: 0,
        tier: 2,
        attack: 1,
        defense: 2,
        health: 2
      };
      this.aat3 = {
        name: 'UFOs',
        qty: 0,
        tier: 3,
        attack: 2,
        defense: 3,
        health: 4
      };
      this.aat4 = {
        name: 'Destroyers',
        qty: 0,
        tier: 4,
        attack: 3,
        defense: 4,
        health: 4
      };
      this.aat5 = {
        name: 'Masterminds',
        qty: 0,
        tier: 5,
        attack: 4,
        defense: 5,
        health: 5
      };
      this.dat3 = {
        name: 'Veteran Black Ops',
        qty: 0,
        tier: 3,
        attack: 3,
        defense: 3,
        health: 1
      };
      this.dat4 = {
        name: 'Elite Black Ops',
        qty: 0,
        tier: 4,
        attack: 4,
        defense: 4,
        health: 2
      };
      this.sat3 = {
        name: 'Veteran Scavengers',
        qty: 0,
        tier: 3,
        attack: 3,
        defense: 3,
        health: 2
      };
      this.sat4 = {
        name: 'Elite Scavengers',
        qty: 0,
        tier: 4,
        attack: 4,
        defense: 4,
        health: 3
      };
      this.troop1 = {
        name: 'Scout Helicopters',
        qty: 0,
        tier: 1,
        attack: 1,
        defense: 1,
        health: 1,
        buff: true,
        item: true,
        ship: true
      };
      this.troop2 = {
        name: 'Attacker Helicopters',
        qty: 0,
        tier: 2,
        attack: 2,
        defense: 2,
        health: 2,
        buff: true,
        item: true,
        ship: true
      };
      this.troop3 = {
        name: 'Jet Fighters',
        qty: 800,
        tier: 3,
        attack: 3,
        defense: 3,
        health: 3,
        buff: true,
        item: true,
        ship: true
      };
      this.troop4 = {
        name: 'Advanced Interceptors',
        qty: 92000,
        tier: 4,
        attack: 4,
        defense: 4,
        health: 4,
        buff: false,
        // use alien disc instead
        item: true,
        ship: true
      };
      this.troop5 = {
        name: 'Solarwind Fighters',
        qty: 0,
        tier: 5,
        attack: 5,
        defense: 5,
        health: 5,
        buff: true,
        item: true,
        ship: true
      };
      this.tierRatios = [// how to use: tierRatios[attackerTier][defenderTier]
      [1, 1, 1, 1, 1, 1], // hero deals/receives the same damage to/from everyone
      [1, 1, 0.75, Math.pow(0.75, 2), Math.pow(0.75, 3), Math.pow(0.75, 4)], [1, 1.5, 1, 0.75, Math.pow(0.75, 2), Math.pow(0.75, 3)], [1, 3, 1.5, 1, 0.75, Math.pow(0.75, 2)], [1, 4.5, 3, 1.5, 1, 0.75], [1, 6, 4.5, 3, 1.5, 1]];
    }

    var _proto = App.prototype;

    _proto.clearLogs = function clearLogs() {
      this.battleLogs = [];
    };

    _proto.formatLog = function formatLog() {
      for (var _len = arguments.length, data = new Array(_len), _key = 0; _key < _len; _key++) {
        data[_key] = arguments[_key];
      }

      return data.map(function (part) {
        return typeof part === 'number' ? (0, _numeral.default)(part).format('0,0[.]00') : typeof part === 'string' ? part : JSON.stringify(part);
      }).join(' ');
    };

    _proto.logAttack = function logAttack() {
      this.battleLogs.push({
        left: true,
        message: this.formatLog.apply(this, arguments)
      });
    };

    _proto.logDefend = function logDefend() {
      this.battleLogs.push({
        right: true,
        message: this.formatLog.apply(this, arguments)
      });
    };

    _proto.header = function header() {
      var message = this.formatLog.apply(this, arguments);
      this.battleLogs.push({
        center: true,
        message: new Array(message.length).fill('-').join('')
      });
      this.battleLogs.push({
        center: true,
        message: message
      });
      this.battleLogs.push({
        center: true,
        message: new Array(message.length).fill('-').join('')
      });
    };

    _proto.defenders = function defenders() {
      return [_extends({}, this.aat1), _extends({}, this.aat2), _extends({}, this.aat3), _extends({}, this.aat4), _extends({}, this.aat5), _extends({}, this.sat3), _extends({}, this.sat4), _extends({}, this.dat3), _extends({}, this.dat4)];
    };

    _proto.heroVsAa = function heroVsAa() {
      this.aa([_extends({}, this.hero)], this.defenders());
    };

    _proto.troopsVsAa = function troopsVsAa() {
      this.aa([_extends({}, this.troop1), _extends({}, this.troop2), _extends({}, this.troop3), _extends({}, this.troop4), _extends({}, this.troop5)], this.defenders());
    };

    _proto.allVsAa = function allVsAa() {
      this.aa([_extends({}, this.troop1), _extends({}, this.troop2), _extends({}, this.troop3), _extends({}, this.troop4), _extends({}, this.troop5), _extends({}, this.hero)], this.defenders());
    };

    _proto.aa = function aa(attackers, defenders) {
      console.log(this.buffs);
      this.clearLogs();
      this.status(this.remainings(attackers), this.remainings(defenders), 'Battle Start');
      this.aaRound(this.remainings(attackers), this.remainings(defenders), 1);
      this.aaRound(this.remainings(attackers), this.remainings(defenders), 2);
      this.aaRound(this.remainings(attackers), this.remainings(defenders), 3);
      this.status(this.remainings(attackers), this.remainings(defenders), 'Battle End');
    };

    _proto.attack = function attack(attackers, defenders) {
      var _this = this;

      // return false to exit loops
      this.remainings(attackers).every(function (attacker) {
        var attackBuff = 0;

        if (attacker.buff) {
          attackBuff = attackBuff + +_this.buffs.attack;

          if (_this.withHero(attackers)) {
            attackBuff = attackBuff + +_this.hero.attackBuff;
          }
        }

        if (attacker.item) {
          attackBuff = attackBuff + +_this.buffs.attackItem;
        }

        if (attacker.ship) {
          attackBuff = attackBuff + +_this.buffs.combatShip;
        }

        attacker.firepower = attacker.qty * attacker.attack * (1 + attackBuff) * 0.2;

        _this.logAttack.apply(_this, [attacker.name, 'firepower', attacker.firepower].concat(attackBuff > 0 ? ['including attack buff', attackBuff * 100, '%'] : []));

        _this.remainings(defenders).every(function (defender) {
          var _defender$hitpoints;

          var tierRatio = _this.tierRatios[attacker.tier][defender.tier];
          var damage = attacker.firepower * tierRatio;
          var defendBuff = 0,
              healthBuff = 0;

          if (defender.buff) {
            defendBuff = defendBuff + +_this.buffs.defense;
            healthBuff = healthBuff + +_this.buffs.health;

            if (_this.withHero(defenders)) {
              defendBuff = defendBuff + +_this.hero.defenseBuff;
              healthBuff = healthBuff + +_this.hero.healthBuff;
            }
          }

          if (defender.item) {
            defendBuff = defendBuff + +_this.buffs.defenseItem;
          }

          if (defender.ship) {
            defendBuff = defendBuff + +_this.buffs.combatShip;
            healthBuff = healthBuff + +_this.buffs.combatShip;
          }

          defender.hitpoints = (_defender$hitpoints = defender.hitpoints) != null ? _defender$hitpoints : defender.qty * defender.health * defender.defense * (1 + defendBuff) * (1 + healthBuff);

          _this.logDefend.apply(_this, [defender.name, 'qty', defender.qty, 'hitpoints', defender.hitpoints, 'damage', tierRatio >= 1 ? 'amplified by' : 'reduced by', tierRatio].concat(defendBuff > 0 ? ['including defend buff', defendBuff * 100, '%'] : [], healthBuff > 0 ? ['including health buff', healthBuff * 100, '%'] : []));

          if (defender.hitpoints > damage) {
            attacker.firepower = 0;
            defender.hit = damage;
            defender.hitpoints = defender.hitpoints - defender.hit;
            defender.qty = Math.ceil(defender.hitpoints / defender.defense / defender.health / (1 + defendBuff) / (1 + healthBuff));
          } else {
            defender.hit = defender.hitpoints;
            defender.hitpoints = 0;
            defender.qty = 0;
            attacker.firepower = (damage - defender.hit) / tierRatio;
          }

          _this.logDefend(defender.name, 'took', defender.hit, 'damage, remaining qty', defender.qty, 'hitpoints', defender.hitpoints);

          _this.logAttack(attacker.name, 'remaining firepower', attacker.firepower); // does this attacker has firepower left?


          return attacker.firepower > 0;
        }); // are there any defenders left?


        return _this.remainings(defenders).length > 0;
      });
    };

    _proto.round = function round(attackers, defenders) {
      for (var _len2 = arguments.length, message = new Array(_len2 > 2 ? _len2 - 2 : 0), _key2 = 2; _key2 < _len2; _key2++) {
        message[_key2 - 2] = arguments[_key2];
      }

      if (this.remainings(attackers).length > 0 && this.remainings(defenders).length > 0) {
        this.header.apply(this, message.concat(['Attacker Phase']));
        this.attack(attackers, defenders);
      }

      if (this.remainings(attackers).length > 0 && this.remainings(defenders).length > 0) {
        this.header.apply(this, message.concat(['defender Phase']));
        this.attack(defenders, attackers);
      }
    };

    _proto.status = function status(attackers, defenders) {
      var _this2 = this;

      for (var _len3 = arguments.length, message = new Array(_len3 > 2 ? _len3 - 2 : 0), _key3 = 2; _key3 < _len3; _key3++) {
        message[_key3 - 2] = arguments[_key3];
      }

      this.header.apply(this, message);
      attackers.forEach(function (attacker) {
        _this2.logAttack.apply(_this2, [attacker.name, 'qty', attacker.qty].concat(attacker.hitpoints && attacker.name === 'hero' ? ['% health', attacker.hitpoints / attacker.defense / attacker.health * 100, '%'] : []));
      });
      defenders.forEach(function (defender) {
        _this2.logDefend.apply(_this2, [defender.name, 'qty', defender.qty].concat(defender.hitpoints && defender.name === 'hero' ? ['health', defender.hitpoints / defender.defense / defender.health * 100, '%'] : []));
      });
    };

    _proto.remainings = function remainings(side) {
      return side.filter(function (_ref) {
        var qty = _ref.qty;
        return qty > 0;
      });
    };

    _proto.withHero = function withHero(side) {
      return side.some(function (_ref2) {
        var name = _ref2.name;
        return name === 'hero';
      });
    };

    _proto.aaRound = function aaRound(attackers, defenders, number) {
      if (attackers.length > 0 && defenders.length > 0) {
        this.status(attackers, defenders, 'Round', number, 'Start');
        this.round(attackers, defenders, 'Round', number);
      }
    };

    return App;
  }();

  _exports.App = App;
});;
define('text!app.css',[],function(){return "body {\n  max-width: initial;\n}";});;
define('text!app.html',[],function(){return "<template>\n  <require from=\"elements/aurelia-console\"></require>\n  <require from=\"./app.css\"></require>\n\n  <h1>Player vs Aliens</h1>\n\n  <h2>Configure</h2>\n\n  <h3>Base</h3>\n  <table>\n    <tr>\n      <td>\n        <label>\n          Air Vehicle Attack\n          <input type=\"number\" value.two-way=\"buffs.attack\" />\n        </label>\n      </td>\n      <td>\n        <label>\n          Air Vehicle Defense\n          <input type=\"number\" value.two-way=\"buffs.defense\" />\n        </label>\n      </td>\n      <td>\n        <label>\n          Air Vehicle Health\n          <input type=\"number\" value.two-way=\"buffs.health\" />\n        </label>\n      </td>\n    </tr>\n  </table>\n\n  <table>\n    <h3>Extras</h3>\n    <tr>\n      <td>\n        <label>\n          Attack Buff (Item)\n          <input type=\"number\" value.two-way=\"buffs.attackItem\" />\n        </label>\n      </td>\n      <td>\n        <label>\n          Defense Buff (Item)\n          <input type=\"number\" value.two-way=\"buffs.defenseItem\" />\n        </label>\n      </td>\n      <td>\n        <label>\n          Combat Ship\n          <input type=\"number\" value.two-way=\"buffs.combatShip\" />\n        </label>\n      </td>\n    </tr>\n  </table>\n\n  <h3>Hero</h3>\n  <table>\n    <tr>\n      <td>\n        <label>\n          Attack\n          <input type=\"number\" value.two-way=\"hero.attack\" />\n        </label>\n      </td>\n      <td>\n        <label>\n          Defense\n          <input type=\"number\" value.two-way=\"hero.defense\" />\n        </label>\n      </td>\n      <td>\n        <label>\n          Health\n          <input type=\"number\" value.two-way=\"hero.health\" />\n        </label>\n      </td>\n    </tr>\n    <tr>\n      <td>\n        <label>\n          Air Vehicle Attack\n          <input type=\"number\" value.two-way=\"hero.attackBuff\" />\n        </label>\n      </td>\n      <td>\n        <label>\n          Air Vehicle Defense\n          <input type=\"number\" value.two-way=\"hero.defenseBuff\" />\n        </label>\n      </td>\n      <td>\n        <label>\n          Air Vehicle Health\n          <input type=\"number\" value.two-way=\"hero.healthBuff\" />\n        </label>\n      </td>\n    </tr>\n  </table>\n\n  <h3>Troops</h3>\n  <table>\n    <tr>\n      <td>\n        <label>\n          Scout Helicopters\n          <input type=\"number\" value.two-way=\"troop1.qty\" />\n        </label>\n      </td>\n      <td>\n        <label>\n          Attack Helicopters\n          <input type=\"number\" value.two-way=\"troop2.qty\" />\n        </label>\n      </td>\n      <td>\n        <label>\n          Jet Fighters\n          <input type=\"number\" value.two-way=\"troop3.qty\" />\n        </label>\n      </td>\n      <td>\n        <label>\n          Advanced Interceptors\n          <input type=\"number\" value.two-way=\"troop4.qty\" />\n        </label>\n      </td>\n      <td>\n        <label>\n          Solarwind Fighters\n          <input type=\"number\" value.two-way=\"troop5.qty\" />\n        </label>\n      </td>\n    </tr>\n  </table>\n\n  <h3>Alien Activities / Hives / Dropships</h3>\n  <table>\n    <tr>\n      <td>\n        <label>\n          Greys\n          <input type=\"number\" value.two-way=\"aat1.qty\" />\n        </label>\n      </td>\n      <td>\n        <label>\n          Bashers\n          <input type=\"number\" value.two-way=\"aat2.qty\" />\n        </label>\n      </td>\n      <td>\n        <label>\n          UFOs\n          <input type=\"number\" value.two-way=\"aat3.qty\" />\n        </label>\n      </td>\n      <td>\n        <label>\n          Destroyers\n          <input type=\"number\" value.two-way=\"aat4.qty\" />\n        </label>\n      </td>\n      <td>\n        <label>\n          Masterminds\n          <input type=\"number\" value.two-way=\"aat5.qty\" />\n        </label>\n      </td>\n    </tr>\n  </table>\n\n  <h3>Scavengers / Dark Activity</h3>\n  <table>\n    <tr>\n      <td>\n        <label>\n          Veteran Scavengers\n          <input type=\"number\" value.two-way=\"sat3.qty\" />\n        </label>\n      </td>\n      <td>\n        <label>\n          Elite Scavengers\n          <input type=\"number\" value.two-way=\"sat4.qty\" />\n        </label>\n      </td>\n      <td>\n        <label>\n          Veteran Black Ops\n          <input type=\"number\" value.two-way=\"dat3.qty\" />\n        </label>\n      </td>\n      <td>\n        <label>\n          Elite Black Ops\n          <input type=\"number\" value.two-way=\"dat4.qty\" />\n        </label>\n      </td>\n    </tr>\n  </table>\n\n  <h2>Simulation</h2>\n\n  <button click.delegate=\"heroVsAa()\">Hero Only</button>\n  <button click.delegate=\"troopsVsAa()\">Troops Only</button>\n  <button click.delegate=\"allVsAa()\">Hero + Troops</button>\n\n  <aurelia-console if.bind=\"battleLogs.length\" logs.bind=\"battleLogs\"></aurelia-console>\n</template>\n";});;
define('elements/aurelia-console',["exports", "aurelia-framework"], function (_exports, _aureliaFramework) {
  "use strict";

  _exports.__esModule = true;
  _exports.AureliaConsoleCustomElement = void 0;

  var _class, _descriptor, _temp;

  function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }

  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

  function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'proposal-class-properties is enabled and runs after the decorators transform.'); }

  var AureliaConsoleCustomElement = (_class = (_temp = function AureliaConsoleCustomElement() {
    _initializerDefineProperty(this, "logs", _descriptor, this);
  }, _temp), (_descriptor = _applyDecoratedDescriptor(_class.prototype, "logs", [_aureliaFramework.bindable], {
    configurable: true,
    enumerable: true,
    writable: true,
    initializer: function initializer() {
      return [];
    }
  })), _class);
  _exports.AureliaConsoleCustomElement = AureliaConsoleCustomElement;
});;
define('text!elements/aurelia-console.css',[],function(){return "@-webkit-keyframes waiting {\n  0% {\n    opacity: 0;\n  }\n  35%, 75% {\n    opacity: 1;\n  }\n  100% {\n    opacity: 0;\n  }\n}\n@keyframes waiting {\n  0% {\n    opacity: 0;\n  }\n  35%, 75% {\n    opacity: 1;\n  }\n  100% {\n    opacity: 0;\n  }\n}\n@-webkit-keyframes joltBG {\n  0% {\n    opacity: 0.3;\n  }\n  22%, 26% {\n    opacity: 0.2;\n  }\n  27%, 45% {\n    opacity: 0.4;\n  }\n  46%, 76% {\n    opacity: 0.5;\n  }\n  76%, 78% {\n    opacity: 0.05;\n  }\n  78% {\n    opacity: 0.3;\n  }\n  100% {\n    opacity: 0.3;\n  }\n}\n@keyframes joltBG {\n  0% {\n    opacity: 0.3;\n  }\n  22%, 26% {\n    opacity: 0.2;\n  }\n  27%, 45% {\n    opacity: 0.4;\n  }\n  46%, 76% {\n    opacity: 0.5;\n  }\n  76%, 78% {\n    opacity: 0.05;\n  }\n  78% {\n    opacity: 0.3;\n  }\n  100% {\n    opacity: 0.3;\n  }\n}\n.console-output {\n  background: #141e1e;\n  color: #dce6e6;\n  margin: 0 auto;\n  font-family: Monaco, Consolas, \"Lucida Console\", monospace;\n  padding: 1em;\n  line-height: 1.45;\n  position: relative;\n  overflow: auto;\n  display: flex;\n  flex-direction: column-reverse;\n}\n.console-output p {\n  margin: 0;\n}\n.console-output p.left {\n  text-align: left;\n}\n.console-output p.right {\n  text-align: right;\n}\n.console-output p.center {\n  text-align: center;\n}\n.console-output::-moz-selection {\n  color: #141e1e;\n  background: #dce6e6;\n}\n.console-output::selection {\n  color: #141e1e;\n  background: #dce6e6;\n}";});;
define('text!elements/aurelia-console.html',[],function(){return "<template>\n  <require from=\"./aurelia-console.css\"></require>\n\n  <div class=\"console-output\">\n    <div>\n      <template repeat.for=\"log of logs\">\n        <p class=\"${log.left ? 'left' : ''} ${log.center ? 'center' : ''} ${log.right ? 'right' : ''}\">\n          <span if.bind=\"log.left || log.center\">&gt;</span>\n          ${log.message}\n          <span if.bind=\"log.right || log.center\">&lt;</span>\n        </p>\n      </template>\n    </div>\n  </div>\n</template>\n";});;
define('environment',["exports"], function (_exports) {
  "use strict";

  _exports.__esModule = true;
  _exports.default = void 0;
  var _default = {
    debug: true,
    testing: true
  };
  _exports.default = _default;
});;
define('main',["exports", "regenerator-runtime/runtime", "./environment"], function (_exports, _runtime, _environment) {
  "use strict";

  _exports.__esModule = true;
  _exports.configure = configure;
  _environment = _interopRequireDefault(_environment);

  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

  // regenerator-runtime is to support async/await syntax in ESNext.
  // If you target latest browsers (have native support), or don't use async/await, you can remove regenerator-runtime.
  function configure(aurelia) {
    aurelia.use.standardConfiguration().feature('resources');
    aurelia.use.developmentLogging(_environment.default.debug ? 'debug' : 'warn');

    if (_environment.default.testing) {
      aurelia.use.plugin('aurelia-testing');
    }

    aurelia.start().then(function () {
      return aurelia.setRoot();
    });
  }
});;
define('resources/index',["exports"], function (_exports) {
  "use strict";

  _exports.__esModule = true;
  _exports.configure = configure;

  function configure(config) {//config.globalResources([]);
  }
});;
define('resources',['resources/index'],function(m){return m;});
//# sourceMappingURL=app-bundle.js.map