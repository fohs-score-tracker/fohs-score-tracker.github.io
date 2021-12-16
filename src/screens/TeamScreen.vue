<template>
  <div class="container">
    <SideMenu />
    <h1 class="mt-2 text-secondary text-center">Your Teams</h1>
    <div class="row g-2 position-relative">
      <transition-group name="Team" @before-leave="beforeLeave">
        <Team
          v-for="team in appState.userTeams"
          v-bind="team"
          :key="team.id"
          :teamName="team.name"
          :teamId="team.id"
        />
      </transition-group>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, inject, onMounted } from "@vue/runtime-core";
import Team from '../components/Team.vue'
import SideMenu from '../components/SideMenu.vue';

const appState = inject("state");
const apiCall = inject("apiCall");
const userData = ref({})
const teamCall = ref({})
appState.userTeams = []

onMounted(async function(){
  userData.value = await apiCall("/users/me").then((r) => r.json());
  teamCall.value = await apiCall("/teams").then((k)=> k.json());
  
    teamCall.value.forEach(team => {
        team.coaches.forEach(coach => {
            if (coach.id === userData.value.id) {
                appState.userTeams.push(team)
            }
        })})


}
 
);




</script>
