
AOS.init();

function getRandomValue(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

const app = Vue.createApp({
  data() {
    return {
      newGame: false,
      charmander: false,
      bulbosaur: false,
      squirtle: false,
      characterSelected: false,
      imgSrc: "",
      gengarHealth: 100,
      playerHealth: 100,
      currentRound: 0,
      winner: null,
      healPotions: 5,
      logMessages: [],
    };
  },

  computed: {
    gengarBarStyles() {
      if (this.gengarHealth < 0) {
        return { width: "0%" };
      } else {
        return { width: this.gengarHealth + "%" };
      }
    },

    playerBarStyles() {
      if (this.playerHealth < 0) {
        return { width: "0%" };
      } else {
        return { width: this.playerHealth + "%" };
      }
    },
    

    mayUseHeal() {
      return (
        this.currentRound === 0 ||
        this.healPotions === 0 ||
        this.playerHealth === 100
      );
    },

    mayUseSpecial() {
      return this.currentRound % 3 !== 0;
    },

    characterName() {
      if (this.charmander == true) {
        return "Charmander";
      } else if (this.bulbosaur == true) {
        return "Bulbasaur";
      } else {
        return "Squirtle";
      }
    },
  },

  methods: {
    startNewGame() {
      this.newGame = true;
    },

    charmanderSelected(img) {
      this.charmander = true;
      this.characterSelected = true;
      this.imgSrc = img.srcElement.src;
    },

    bulbosaurSelected(img) {
      this.bulbosaur = true;
      this.characterSelected = true;
      this.imgSrc = img.srcElement.src;
    },

    squirtleSelected(img) {
      this.squirtle = true;
      this.characterSelected = true;
      this.imgSrc = img.srcElement.src;
    },

    attackPlayer() {
      const attackValue = getRandomValue(8, 15);

      if (this.playerHealth - attackValue < 0) {
        this.playerHealth = 0;
      } else {
        this.playerHealth -= attackValue;
      }
      this.addLogMessage("Gangar", "attack", attackValue);
    },

    growlAttack() {
      const attackValue = getRandomValue(2, 8);
      if (this.gengarHealth - attackValue < 0) {
        this.gengarHealth = 0;
      } else {
        this.gengarHealth -= attackValue;
      }

      this.addLogMessage("Player", "attack", attackValue);
      this.attackPlayer();
      this.currentRound++;
    },

    basicAttack() {
        const attackValue = getRandomValue(2, 8);
        if (this.gengarHealth - attackValue < 0) {
          this.gengarHealth = 0;
        } else {
          this.gengarHealth -= attackValue;
        }
      this.addLogMessage("Player", "attack", attackValue);
      this.attackPlayer();
      this.currentRound++;
    },

    specialAttack() {
        const attackValue = getRandomValue(10, 20);
        if (this.gengarHealth - attackValue < 0) {
          this.gengarHealth = 0;
        } else {
          this.gengarHealth -= attackValue;
        }
      this.addLogMessage("Player", "attack", attackValue);
      this.attackPlayer();
      this.currentRound++;
    },

    healPlayer() {
      this.currentRound++;
      const healValue = getRandomValue(15, 20);

      if (this.playerHealth + healValue > 100) {
        this.playerHealth = 100;
        this.healPotions--;
        console.log(this.healPotions);
        console.log(this.playerHealth);
      } else {
        this.playerHealth += healValue;
        this.healPotions--;
        console.log(this.healPotions);
        console.log(this.playerHealth);
      }

      this.addLogMessage("player", "heal", healValue);
      this.attackPlayer();
      this.currentRound++;
    },

    restartGame() {
      this.playerHealth = 100;
      this.gengarHealth = 100;
      this.winner = null;
      this.currentRound = 0;
      this.characterSelected = false;
      this.charmander = false;
      this.bulbosaur = false;
      this.squirtle = false;
      this.logMessages = [];
      this.healPotions = 5;
    },

    surrender() {
      this.playerHealth = 0;
    },

    addLogMessage(who, what, value) {
      this.logMessages.unshift({
        actionBy: who,
        actionType: what,
        actionValue: value,
      });
    },
  },

  watch: {
    playerHealth(value) {
      if (value <= 0 && this.gengarHealth <= 0) {
        // Draw
        this.winner = "draw";
      } else if (value <= 0) {
        // Player Lost
        this.winner = "monster";
      }
    },
    gengarHealth(value) {
      if (value <= 0 && this.playerHealth <= 0) {
        // Draw
        this.winner = "draw";
      } else if (value <= 0) {
        // Monster Lost

        this.winner = "player";
      }
    },
  },
});

app.mount("#game");
