<script setup>
import { ref, onMounted, watch, computed } from 'vue'
import EventCard from '@/components/EventCard.vue'
import { usedataStore } from '@/stores/dataStore.js'

//Programma maand

const events = ref(null)
const data_Store = usedataStore()

const jaar = computed(() => data_Store.jaar);
const maand = computed(() => data_Store.maand);
const editstatus = computed(() => data_Store.editstatus);
console.log(editstatus.value);



defineProps({
  event: {
    type: Object,
    required: true,
  }
})

onMounted(() => {
  const Jaar = ref(jaar.value);
  const Maand = ref(maand.value);
//  const Mode = ref(editstatus);

 

  data_Store.getEvents(Jaar, Maand ).catch(error => {
    this.router.push(
      {
        name: 'ErrorDisplay',
        params: { error: error }
      }
    )
  }),
  
  data_Store.getPauzeLocs(80).catch(error => {
    this.router.push(
      {
        name: 'ErrorDisplay',
        params: { error: error }
      }
    )
  })
});





</script>

<template>
  <div class="w3-container w3-white">

    <div class="w3-row w3-white">

      <div class="w3-col w3-container m2 l2 ">
      </div>
      <div class="w3-col w3-container m8 l8 ">
          <h3><center>GVAC wandelprogramma Februari 2024</center></h3>
          <p>
            Dit is het programma voor beide wandel groepen, 10 km en 12 km. De 10 km groep loopt gemiddeld ongeveer 4,5 km per uur en de 12 km groep loopt gemiddeld 5,1 km per uur.  
            Vertrekpunt en pauzeplaats zijn in principe voor beide groepen hetzelfde. Bij een wandeling met afwijkende startplaats is dit per groep aangegeven.
          </p>
          <p>
            Bij vertrek op Kerkplein Burgemeester van Hoofflaan proberen we te carpoolen. 
            Dit lukt uiteraard alleen met voldoende auto’s maar dat gaat praktisch altijd goed. 
            Meerijd vergoeding € 2,00 p.p. per wandeling ongeacht de afstand naar het vertrekpunt.
          </p>
      </div>
      <div class="w3-col w3-container m2 l2 ">
      </div>
    </div> 

    <div class="w3-row w3-white"> 
      <br>    

      <div v-for="(events) in data_Store.events">
        <div class="events">
          <EventCard v-for="(event, index) in events" :key="event.id" :event="event"  :index="index"/>
        </div>
      </div>
    </div>


    <div class="w3-row w3-white">

      <div class="w3-col w3-container m2 l2 ">
      </div>            
      <div class="w3-col w3-container m8 l8 ">
        <div>
        <br>
        <p>
          Verwacht je niet op tijd te kunnen zijn op het vertrekpunt van de wandeling, neem dan contact op met een van onderstaande telefoonnummers. Eventueel kunnen we dan een paar minuten wachten.
        </p>
        <p>
          Voor informatie over de groep 12 km kun je bellen met Rob Ploegmakers 06 48 20 66 17, met Janus Roosen 06 22 46 08 13 of met Jack van Hoof 06 10 49 79 85.
          Voor informatie over de groep 10 km kun je bellen met Ludwig Eggermont 06 49 13 94 91.
        </p>
        <br>
        <p>
        Fotogalerij:                                                                                                                            
        Ontbreekt je foto nog of wil je je foto vervangen door een andere, stuur die dan naar Ludwig Eggermont, e-mail LDJE@xs4all.nl
        </p>
        <p>
        Nieuwe leden moeten toestemming geven voor plaatsing van hun foto. Dit kun je aangeven op het inschrijfformulier of stuur een e-mail naar s.ebben@onsbrabantnet.nl
        </p>
        <p>
        De wandelprogramma’s staan op de website GVAC Recreatief wandelen en worden aan de wandelleden per e-mail verstuurd door Sophie Ebben s.ebben@onsbrabantnet.nl
        </p>
      </div>
      <div class="w3-col w3-container m2 l2 ">
        <div>
          <p v-if="editstatus === 'on'">
            <svg xmlns="http://www.w3.org/2000/svg" height="16" width="14" viewBox="0 0 448 512"><!--!Font Awesome Free 6.5.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2023 Fonticons, Inc.--><path d="M64 32C28.7 32 0 60.7 0 96V416c0 35.3 28.7 64 64 64H384c35.3 0 64-28.7 64-64V96c0-35.3-28.7-64-64-64H64zM200 344V280H136c-13.3 0-24-10.7-24-24s10.7-24 24-24h64V168c0-13.3 10.7-24 24-24s24 10.7 24 24v64h64c13.3 0 24 10.7 24 24s-10.7 24-24 24H248v64c0 13.3-10.7 24-24 24s-24-10.7-24-24z"/></svg>
          </p>



        </div>

      </div>
    </div>
    </div>
  </div>

</template>

<style scoped>
.events {
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>
