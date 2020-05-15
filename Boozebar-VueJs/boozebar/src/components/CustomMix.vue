<template>
  <div class="wrapper-custom-mix">
    <div class="header">
      <h1 class="title">{{ customMix.name }}</h1>
      <h2 class="subtitle">{{ customMix.description | limitText(25) }}</h2>
    </div>
    <div class="glass">
      <svg height="260" width="200">
        <defs>
          <filter
            id="fillpartial"
            primitiveUnits="objectBoundingBox"
            x="0%"
            y="0%"
            width="100%"
            height="100%"
          >
            <feFlood
              x="0%"
              y="0%"
              width="100%"
              height="100%"
              :flood-color="mixFillColor"
            />

            <feOffset :dy="endHeight">
              <animate
                attributeName="dy"
                :from="customMix.startHeight"
                :to="endHeight"
                dur="3s"
              />
            </feOffset>

            <feComposite operator="in" in2="SourceGraphic" />
            <feComposite operator="over" in2="SourceGraphic" />
          </filter>
        </defs>
        <polygon id="glass-outside" points="0,0 200,0 170,260 30,260" />
        <polygon
          id="glass-contents"
          filter="url(#fillpartial)"
          points="20,20 180,20 150,240 50,240"
        />
        <line id="glass-bottom" x1="50" y1="245" x2="150" y2="245" />
      </svg>
    </div>
    <div class="controls">
      <div
        class="field is-grouped is-grouped-multiline"
        v-if="customMix.ingredients.length > 0"
      >
        <div
          class="control"
          v-for="ingredient in customMix.ingredients"
          :key="ingredient.id"
        >
          <div class="tags has-addons">
            <span class="tag is-dark">{{ ingredient.name }}</span>
            <span class="tag is-primary">{{ ingredient.amount }}</span>
          </div>
        </div>
      </div>
      <div id="headings">
        <div class="field has-addons">
          <p class="control" @click="addCustomMix">
            <a class="button is-success">
              <span class="icon is-small">
                <i class="fas fa-check"></i>
              </span>
              <span>Save</span>
            </a>
          </p>
          <p class="control" @click="clearIngredientSelection">
            <a class="button">
              <span class="icon is-small">
                <i id="icon-delete" class="fas fa-trash-alt"></i>
              </span>
            </a>
          </p>
        </div>
        <input
          class="input"
          type="text"
          placeholder="A name for your custom mix"
          v-model="customMix.name"
        />
      </div>
      <textarea
        class="textarea"
        placeholder="A small description"
        rows="3"
        v-model="customMix.description"
      ></textarea>
    </div>
    <div class="ingredients">
      <ingredient
        v-for="ingredient in ingredients"
        :key="ingredient.id"
        :ingredient="ingredient"
        :ingredientClicked="addIngredient"
      ></ingredient>
    </div>
  </div>
</template>

<script>
import Ingredient from "./Ingredient.vue";
import { mapState } from 'vuex';

export default {
  data() {
    return {
      pagetitle: "custom mix",
      customMix: {
        name: "Name",
        shotSize: 2, // 2cl
        maxHeight: 0.2,
        startHeight: 1,
        ingredients: [],
        maxContents: 16, // 16cl (max: 8shots)
        description: "A small description"
      }
    };
  },
  methods: {
    addIngredient(ingredient) {
      if (this.isBelowMaxIngredients && this.isBelowMaxShots) {
        if (this.customMix.ingredients.length != 0) {
          let isAdded = false;

          this.customMix.ingredients.forEach(ingr => {
            if (ingr.id == ingredient.Id) {
              ingr.amount++;
              isAdded = true;
            }
          });

          if (!isAdded)
            this.pushIngredient(
              ingredient.Id,
              ingredient.Name,
              ingredient.color
            );
        } else {
          this.pushIngredient(ingredient.Id, ingredient.Name, ingredient.color);
        }
      }
    },
    pushIngredient(id, name, color) {
      this.customMix.ingredients.push({
        id: id,
        name: name,
        color: color,
        amount: 1
      });
    },
    mixColor(color_1, color_2, weight) {
      // JavaScript version of Sass' mix() function
      // SOURCE: https://gist.github.com/jedfoster/7939513
      // jedfoster

      function d2h(d) {
        return d.toString(16);
      } // convert a decimal value to hex
      function h2d(h) {
        return parseInt(h, 16);
      } // convert a hex value to decimal

      weight = typeof weight !== "undefined" ? weight : 50; // set the weight to 50%, if that argument is omitted

      var color = "#";

      // tenji73 - accept colors with leading '#'
      color_1 = color_1.replace(/#/g, "");
      color_2 = color_2.replace(/#/g, "");

      for (var i = 0; i <= 5; i += 2) {
        // loop through each of the 3 hex pairs—red, green, and blue
        var v1 = h2d(color_1.substr(i, 2)), // extract the current pairs
          v2 = h2d(color_2.substr(i, 2)),
          // combine the current pairs from each source color, according to the specified weight
          val = d2h(Math.floor(v2 + (v1 - v2) * (weight / 100.0)));
        while (val.length < 2) {
          val = "0" + val;
        } // prepend a '0' if val results in a single digit
        color += val; // concatenate val to our new color string
      }

      return color; // PROFIT!
    },
    mixColorFromList(list, weight) {
      let color = "";
      weight = typeof weight !== "undefined" ? weight : 50;

      for (let index = 0; index < list.length - 1; index++)
        color =
          index == 0
            ? this.mixColor(list[index].color, list[index + 1].color)
            : this.mixColor(color, list[index + 1].color);

      return color;
    },
    generateColor() {
      // Random Hex Color Code Generator in JavaScript
      // SOURCE: https://www.paulirish.com/2009/random-hex-color-code-snippets/
      // Paul Irish - Dimitry K
      return (
        "#" +
        (
          "000000" +
          Math.random()
            .toString(16)
            .slice(2, 8)
            .toUpperCase()
        ).slice(-6)
      );
    },
    addCustomMix() {
      let mix = this.customMix;
      mix.ingredients.forEach(ingr => { delete ingr.color; });

      this.$store.dispatch("addCustomMix", {
        customMix: {
          name: mix.name,
          description: mix.description,
          ingredients: mix.ingredients
        }
      });  
    },
    clearIngredientSelection() {
      this.customMix.ingredients = [];
    }
  },
  computed: {
    ...mapState({
      ingredients(state) {
        let ingr = state.ingredients;
        ingr.forEach(ingredient => {
          let color = this.generateColor();
          this.$set(ingredient, "color", color);
        });
        return ingr;
      }
    }),
    isBelowMaxIngredients() {
      return (
        this.customMix.ingredients.length + 1 <=
        this.customMix.maxContents / this.customMix.shotSize
      );
    },
    isBelowMaxShots() {
      return (
        this.amountOfShots + 1 <=
        this.customMix.maxContents / this.customMix.shotSize
      );
    },
    endHeight() {
      let stepsize =
        (this.customMix.startHeight - this.customMix.maxHeight) /
        (this.customMix.maxContents / this.customMix.shotSize);
      return this.customMix.startHeight - this.amountOfShots * stepsize;
    },
    amountOfShots() {
      let shots = 0;

      this.customMix.ingredients.forEach(ingredient => {
        shots += ingredient.amount;
      });

      return shots;
    },
    mixFillColor() {
      if (this.customMix.ingredients.length >= 2) {
        return this.mixColorFromList(this.customMix.ingredients);
      } else {
        if (this.customMix.ingredients.length == 0) {
          return "#f4f442";
        } else {
          return this.customMix.ingredients[0].color;
        }
      }
    }
  },
  filters: {
    limitText: function(value, amountOfChars) {
      return value.substring(0, amountOfChars - 2) + " \u{02026}";
    }
  },
  components: {
    Ingredient
  },
  created() {
    this.$store.commit("setPageTitle", { title: this.pagetitle });
    this.$store.dispatch('fetchIngredients');
  }
};
</script>

<style lang="scss" scoped>
.wrapper-custom-mix {
  min-width: 100%;
  display: flex;
  flex-flow: column wrap;
  padding: 1rem;

  @include from($desktop) {
    min-width: 100%;
    margin-right: 0;
    padding-left: 17.5rem;
    padding-right: 14.5rem;
    margin-left: 0;
  }

  .header {
    @include from($desktop) {
      text-align: center;
      margin-top: 5.8rem;
    }
  }

  .glass {
    display: flex;
    justify-content: center;
    margin: 3rem 0 3rem 0;

    #glass-outside {
      fill: $backgroundColorSecondary;
      stroke: $primaryFontColor;
      stroke-width: 2px;
    }

    #glass-contents {
      fill: $backgroundColorSecondary;
    }

    #glass-bottom {
      stroke: $primaryFontColor;
      stroke-width: 2px;
    }
  }

  .controls {
    display: flex;
    flex-flow: column nowrap;

    @include from($desktop) {
      margin: 0 1rem;
    }

    #headings {
      display: flex;
      flex-flow: row nowrap;
      justify-content: space-between;
      align-items: center;

      input {
        border-radius: 0 3px 0 0;
      }
    }

    .field {
      margin-bottom: 0;
      .control {
        margin-bottom: 0;
      }
    }
  }

  .ingredients {
    max-height: 40rem;
    min-width: 100%;
    display: flex;
    flex-flow: row wrap;
  }
}
</style>
