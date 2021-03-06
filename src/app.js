import numeral from 'numeral';

export class App {
  lossOnly = true;
  battleLossLogs = [];
  battleLogs = [];

  buffs = {
    attack: 0,
    defense: 0,
    health: 0,
    attackItem: 0,
    defenseItem: 0,
    combatShip: 0,
  };
  hero = {
    name: 'hero',
    qty: 1,
    tier: 0,
    attack: 0,
    defense: 0,
    health: 0,
    attackBuff: 0,
    defenseBuff: 0,
    healthBuff: 0,
    attackItem: 0,
    defenseItem: 0,
    healthItem: 0,
    item: true,
    ship: true,
  };
  aat1 = {
    name: 'Greys',
    qty: 0,
    tier: 1,
    attack: 0,
    defense: 1,
    health: 1,
  };
  aat2 = {
    name: 'Bashers',
    qty: 0,
    tier: 2,
    attack: 1,
    defense: 2,
    health: 2,
  };
  aat3 = {
    name: 'UFOs',
    qty: 0,
    tier: 3,
    attack: 2,
    defense: 3,
    health: 3,
  };
  aat4 = {
    name: 'Destroyers',
    qty: 0,
    tier: 4,
    attack: 3,
    defense: 4,
    health: 4,
  };
  aat5 = {
    name: 'Masterminds',
    qty: 0,
    tier: 5,
    attack: 4,
    defense: 5,
    health: 5,
  };
  dat1 = {
    name: 'Recruited Black Ops',
    qty: 0,
    tier: 1,
    attack: 1,
    defense: 1,
    health: 1,
  };
  dat2 = {
    name: 'Superior Black Ops',
    qty: 0,
    tier: 2,
    attack: 2,
    defense: 2,
    health: 1,
  };
  dat3 = {
    name: 'Veteran Black Ops',
    qty: 0,
    tier: 3,
    attack: 3,
    defense: 3,
    health: 1,
  };
  dat4 = {
    name: 'Elite Black Ops',
    qty: 0,
    tier: 4,
    attack: 4,
    defense: 4,
    health: 2,
  };
  sat2 = {
    name: 'Superior Scavengers',
    qty: 0,
    tier: 2,
    attack: 2,
    defense: 2,
    health: 2,
  };
  sat3 = {
    name: 'Veteran Scavengers',
    qty: 0,
    tier: 3,
    attack: 3,
    defense: 3,
    health: 2,
  };
  sat4 = {
    name: 'Elite Scavengers',
    qty: 0,
    tier: 4,
    attack: 4,
    defense: 4,
    health: 3,
  };
  sat5 = {
    name: 'Epic Scavengers',
    qty: 0,
    tier: 5,
    attack: 5,
    defense: 5,
    health: 4,
  };
  troop1 = {
    name: 'Scout Helicopters',
    qty: 0,
    tier: 1,
    attack: 1,
    defense: 1,
    health: 1,
    buff: true,
    item: true,
    ship: true,
  };
  troop2 = {
    name: 'Attacker Helicopters',
    qty: 0,
    tier: 2,
    attack: 2,
    defense: 2,
    health: 2,
    buff: true,
    item: true,
    ship: true,
  };
  troop3 = {
    name: 'Jet Fighters',
    qty: 0,
    tier: 3,
    attack: 3,
    defense: 3,
    health: 3,
    buff: true,
    item: true,
    ship: true,
  };
  troop4 = {
    name: 'Advanced Interceptors',
    qty: 0,
    tier: 4,
    attack: 4,
    defense: 4,
    health: 4,
    buff: false, // use alien disc instead
    item: true,
    ship: true,
  };
  troop5 = {
    name: 'Solarwind Fighters',
    qty: 0,
    tier: 5,
    attack: 5,
    defense: 5,
    health: 5,
    buff: true,
    item: true,
    ship: true,
  };
  tierRatios = [
    // how to use: tierRatios[attackerTier][defenderTier]
    [1, 1, 1, 1, 1, 1], // hero deals/receives the same damage to/from everyone
    [1, 1, 0.75, Math.pow(0.75, 2), Math.pow(0.75, 3), Math.pow(0.75, 4)],
    [1, 1.5, 1, 0.75, Math.pow(0.75, 2), Math.pow(0.75, 3)],
    [1, 3, 1.5, 1, 0.75, Math.pow(0.75, 2)],
    [1, 4.5, 3, 1.5, 1, 0.75],
    [1, 6, 4.5, 3, 1.5, 1],
  ];

  clearLogs() {
    this.battleLogs = [];
    this.battleLossLogs = [];
  }
  formatLog(...data) {
    return data.map((part) => (typeof part === 'number' ? numeral(part).format('0,0[.]00') : typeof part === 'string' ? part : JSON.stringify(part))).join(' ');
  }
  logAttack(loss, ...data) {
    if (loss === true) {
      this.battleLossLogs.push({ left: true, message: this.formatLog(...data) });  
    }
    this.battleLogs.push({ left: true, message: this.formatLog(...data) });
  }
  logDefend(loss, ...data) {
    if (loss === true) {
      this.battleLossLogs.push({ right: true, message: this.formatLog(...data) });
    }
    this.battleLogs.push({ right: true, message: this.formatLog(...data) });
  }
  header(...data) {
    const message = this.formatLog(...data);
    this.battleLogs.push({ center: true, message: new Array(message.length).fill('-').join('') });
    this.battleLogs.push({ center: true, message });
    this.battleLogs.push({ center: true, message: new Array(message.length).fill('-').join('') });
  }

  defenders() {
    return [
      { ...this.aat1 },
      { ...this.aat2 },
      { ...this.aat3 },
      { ...this.aat4 },
      { ...this.aat5 },
      { ...this.sat2 },
      { ...this.sat3 },
      { ...this.sat4 },
      { ...this.sat5 },
      { ...this.dat1 },
      { ...this.dat2 },
      { ...this.dat3 },
      { ...this.dat4 },
    ];
  }

  heroVsAa() {
    this.aa([{ ...this.hero }], this.defenders());
  }

  troopsVsAa() {
    this.aa([{ ...this.troop1 }, { ...this.troop2 }, { ...this.troop3 }, { ...this.troop4 }, { ...this.troop5 }], this.defenders());
  }

  allVsAa() {
    this.aa([{ ...this.troop1 }, { ...this.troop2 }, { ...this.troop3 }, { ...this.troop4 }, { ...this.troop5 }, { ...this.hero }], this.defenders());
  }

  saveData() {
    const data = {
      buffs: this.buffs,
      hero: this.hero,
      aat1: this.aat1,
      aat2: this.aat2,
      aat3: this.aat3,
      aat4: this.aat4,
      aat5: this.aat5,
      dat1: this.dat1,
      dat2: this.dat2,
      dat3: this.dat3,
      dat4: this.dat4,
      sat2: this.sat2,
      sat3: this.sat3,
      sat4: this.sat4,
      sat5: this.sat5,
      troop1: this.troop1,
      troop2: this.troop2,
      troop3: this.troop3,
      troop4: this.troop4,
      troop5: this.troop5,
    };
    localStorage.setItem('data', JSON.stringify(data));
  }

  loadData() {
    const saved = localStorage.getItem('data');
    if (saved) {
      const data = JSON.parse(saved);

      this.buffs = data.buffs;
      this.hero = data.hero;
      this.aat1.qty = data?.aat1?.qty;
      this.aat2.qty = data?.aat2?.qty;
      this.aat3.qty = data?.aat3?.qty;
      this.aat4.qty = data?.aat4?.qty;
      this.aat5.qty = data?.aat5?.qty;
      this.dat1.qty = data?.dat1?.qty;
      this.dat2.qty = data?.dat2?.qty;
      this.dat3.qty = data?.dat3?.qty;
      this.dat4.qty = data?.dat4?.qty;
      this.sat2.qty = data?.sat2?.qty;
      this.sat3.qty = data?.sat3?.qty;
      this.sat4.qty = data?.sat4?.qty;
      this.sat5.qty = data?.sat5?.qty;
      this.troop1.qty = data?.troop1?.qty;
      this.troop2.qty = data?.troop2?.qty;
      this.troop3.qty = data?.troop3?.qty;
      this.troop4.qty = data?.troop4?.qty;
      this.troop5.qty = data?.troop5?.qty;
      this.troop1.buff = data?.troop1?.buff;
      this.troop2.buff = data?.troop2?.buff;
      this.troop3.buff = data?.troop3?.buff;
      this.troop4.buff = data?.troop4?.buff;
      this.troop5.buff = data?.troop5?.buff;
    }
  }

  aa(attackers, defenders) {
    this.saveData();
    this.clearLogs();

    this.status(this.remainings(attackers), this.remainings(defenders), 'Battle Start');

    this.aaRound(this.remainings(attackers), this.remainings(defenders), 1);
    this.aaRound(this.remainings(attackers), this.remainings(defenders), 2);
    this.aaRound(this.remainings(attackers), this.remainings(defenders), 3);

    this.statusWithLoss(this.remainings(attackers, true), this.remainings(defenders, true), 'Battle End');
  }

  attack(attackers, defenders) {
    // return false to exit loops
    this.remainings(attackers).every((attacker) => {
      let attackBuff = 0;
      if (attacker.buff) {
        attackBuff = attackBuff + +this.buffs.attack;
        if (this.withHero(attackers)) {
          attackBuff = attackBuff + +this.hero.attackBuff;
        }
      }
      if (attacker.item) {
        attackBuff = attackBuff + +this.buffs.attackItem;
        if (this.withHero(attackers) && !this.isHero(attacker)) {
          attackBuff = attackBuff + +this.hero.attackItem;
        }
      }
      if (attacker.ship) {
        attackBuff = attackBuff + +this.buffs.combatShip;
      }

      attacker.firepower = attacker.qty * attacker.attack * (1 + attackBuff) * 0.2;
      this.logAttack(false, attacker.name, '🔥', attacker.firepower, ...(attackBuff > 0 ? ['including attack buff', attackBuff * 100, '%'] : []));

      this.remainings(defenders).every((defender) => {
        const tierRatio = this.tierRatios[attacker.tier][defender.tier];
        const damage = attacker.firepower * tierRatio;
        let defendBuff = 0,
          healthBuff = 0;
        if (defender.buff) {
          defendBuff = defendBuff + +this.buffs.defense;
          healthBuff = healthBuff + +this.buffs.health;
          if (this.withHero(defenders)) {
            defendBuff = defendBuff + +this.hero.defenseBuff;
            healthBuff = healthBuff + +this.hero.healthBuff;
          }
        }
        if (defender.item) {
          defendBuff = defendBuff + +this.buffs.defenseItem;
          if (this.withHero(defenders) && !this.isHero(defender)) {
            defendBuff = defendBuff + +this.hero.defenseItem;
            healthBuff = healthBuff + +this.hero.healthItem;
          }
        }
        if (defender.ship) {
          defendBuff = defendBuff + +this.buffs.combatShip;
          healthBuff = healthBuff + +this.buffs.combatShip;
        }
        if (!defender.hitpoints) {
          defender.hitpoints = defender.qty * defender.health * defender.defense * (1 + defendBuff) * (1 + healthBuff);
          defender.originalHitpoints = defender.hitpoints;
          defender.originalQty = defender.qty;
        }
        this.logDefend(
          false,
          defender.name,
          '👨‍👦‍👦',
          defender.qty,
          '❤',
          defender.hitpoints,
          'damage',
          tierRatio >= 1 ? 'amplified by' : 'reduced by',
          tierRatio,
          ...(defendBuff > 0 ? ['including defend buff', defendBuff * 100, '%'] : []),
          ...(healthBuff > 0 ? ['including health buff', healthBuff * 100, '%'] : []),
        );

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
        this.logDefend(false, defender.name, 'took 🎯', defender.hit, ', remaining 👨‍👦‍👦', defender.qty, '❤', defender.hitpoints);
        this.logAttack(false, attacker.name, 'remaining 🔥', attacker.firepower);

        // does this attacker has firepower left?
        return attacker.firepower > 0;
      });

      // are there any defenders left?
      return this.remainings(defenders).length > 0;
    });
  }

  round(attackers, defenders, ...message) {
    if (this.remainings(attackers).length > 0 && this.remainings(defenders).length > 0) {
      this.header(...message, 'Attacker Phase');
      this.attack(attackers, defenders);
    }
    if (this.remainings(attackers).length > 0 && this.remainings(defenders).length > 0) {
      this.header(...message, 'defender Phase');
      this.attack(defenders, attackers);
    }
  }

  status(attackers, defenders, ...message) {
    return this._status(attackers, defenders, false, ...message);
  }

  statusWithLoss(attackers, defenders, ...message) {
    return this._status(attackers, defenders, true, ...message);
  }

  _status(attackers, defenders, loss, ...message) {
    this.header(...message);
    attackers.forEach((attacker) => {
      this.logAttack(loss, attacker.name, '👨‍👦‍👦', attacker.qty, ...(loss ? this.loss(attacker) : []));
    });
    defenders.forEach((defender) => {
      this.logDefend(loss, defender.name, '👨‍👦‍👦', defender.qty, ...(loss ? this.loss(defender) : []));
    });
  }

  remainings(side, loss) {
    return side.filter(({ qty, originalQty }) => +qty > 0 || (loss && +originalQty > 0));
  }

  withHero(side) {
    return side.some(this.isHero);
  }

  isHero(entity) {
    return entity.name === 'hero';
  }

  loss(entity) {
    if (this.isHero(entity)) {
      if (entity.hitpoints && entity.originalHitpoints) {
        return ['❤', (entity.hitpoints / entity.originalHitpoints) * 100, '%'];
      }
    } else {
      if (entity.originalQty) {
        return ['🔻', entity.originalQty - entity.qty, '⚡', this.powerLoss(entity)];
      }
    }
  }

  powerLoss(entity) {
    let power = 0;
    switch (entity.tier) {
      case 1:
        power = 2;
        break;
      case 2:
        power = 8;
        break;
      case 3:
        power = 20;
        break;
      case 4:
        power = 36;
        break;
      case 5:
        power = 75;
        break;
    }
    return power * (entity.originalQty - entity.qty);
  }

  aaRound(attackers, defenders, number) {
    if (attackers.length > 0 && defenders.length > 0) {
      this.status(attackers, defenders, 'Round', number, 'Start');
      this.round(attackers, defenders, 'Round', number);
    }
  }
}
