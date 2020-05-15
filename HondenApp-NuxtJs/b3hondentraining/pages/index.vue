<template>
  <div>
    <div class="wrapper-index">
      <div class="wrapper-tiles">
        <tile
          to="groepen"
          elementName="groups"
          :focusedElement="focusedElement"
          @setFocusedElement="setFocusedElement($event)"
        >
          <p>Mijn Groepen</p>
          <font-awesome-icon
            class="card-icon"
            :icon="['fas', 'users']"
            size="2x"
          />
        </tile>

        <tile
          to="trainingen"
          elementName="trainings"
          :focusedElement="focusedElement"
          @setFocusedElement="setFocusedElement($event)"
        >
          <p>Training toevoegen</p>
          <div id="card-trainingen">
            <font-awesome-icon
              class="card-icon"
              :icon="['fas', 'chart-line']"
              size="2x"
            />
            <font-awesome-icon
              class="card-icon"
              :icon="['fas', 'plus-circle']"
              size="2x"
            />
          </div>
        </tile>

        <tile
          to="trainingen"
          elementName="addTrainings"
          :focusedElement="focusedElement"
          @setFocusedElement="setFocusedElement($event)"
        >
          <p>Mijn trainingen</p>
          <font-awesome-icon
            class="card-icon"
            :icon="['fas', 'chart-line']"
            size="2x"
          />
        </tile>

        <tile
          to="mijn-honden"
          elementName="dogs"
          :focusedElement="focusedElement"
          @setFocusedElement="setFocusedElement($event)"
        >
          <p>Mijn Honden</p>
          <font-awesome-icon
            class="card-icon"
            :icon="['fas', 'dog']"
            size="2x"
          />
        </tile>

        <tile
          to="mijn-profiel"
          elementName="profile"
          :focusedElement="focusedElement"
          @setFocusedElement="setFocusedElement($event)"
        >
          <p>Mijn Profiel</p>
          <font-awesome-icon
            class="card-icon"
            :icon="['fas', 'user']"
            size="2x"
          />
        </tile>
      </div>
    </div>
  </div>
</template>

<script>
import { defocusOnHover } from "~/mixins/defocusOnHover.js";
import Tile from "@/components/Tile.vue";

export default {
  middleware: "authenticated",
  mixins: [defocusOnHover],
  components: {
    Tile
  }
};
</script>

<style lang="scss" scoped>
.wrapper-index {
  display: flex;
  flex: 1 1 auto;

  .wrapper-tiles {
    width: 80%;
    margin: 5rem auto;
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    grid-gap: 15px;

    #card-trainingen {
      display: flex;
      flex-flow: row nowrap;
      justify-content: space-between;

      svg {
        margin-left: 1rem;
        &:first-of-type {
          margin-left: 0rem;
        }
      }
    }
  }
}
</style>
