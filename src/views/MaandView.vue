<script setup>
import { ref, onMounted, watch, computed } from 'vue'
import Datepicker from 'vue3-datepicker'
import 'vue-date-pick/dist/vueDatePick.css';
import EventCard from '@/components/EventCard.vue'
import { usedataStore } from '@/stores/dataStore.js'






//Programma maand

const events = ref(null)
const allRoutes = ref(null)
const data_Store = usedataStore()

const jaar = computed(() => data_Store.jaar);
const maand = computed(() => data_Store.maand);
const editstatus = computed(() => data_Store.editstatus);
const update = computed(() => data_Store.update);
const PpauzeL = computed(() => data_Store.events.PauzeL);
const DateR = computed(() => data_Store.date);

const date = ref();
const startDate = ref(new Date(2024, 1));
const format = (date) => {
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();

  
}



const dateClicked = (date) => {
    console.log ("muis");
    const dateD = date.getDate();
    const dateM = date.getMonth() + 1;
    const dateY = date.getFullYear();


    let nulD = ''
    let nulM = ''
    if (dateD < 10) {
      nulD = '0'
    } 
    if (dateM < 10) {
      nulM = '0'
    } 

    const dateFull = (dateY + '-' + nulM + (dateM) + '-' + nulD + (dateD) );
    data_Store.dateFull = dateFull

    data_Store.createProgramma(data_Store.dateFull, dateY, dateM).catch(error => {
    this.router.push(
      {
        name: 'ErrorDisplay',
        params: { error: error }
      }
    )

  })
  data_Store.update = true 
 
} 
  

defineProps({
  event: {
    type: Object,
    required: true,
  }
})

onMounted(() => {
  const Jaar = ref(jaar.value);
  const Maand = ref(maand.value);

//  const Mode = ref(editstatus);0

  data_Store.getEvents(Jaar, Maand ).catch(error => {
    this.router.push(
      {
        name: 'ErrorDisplay',
        params: { error: error }
      }
    )
// vul alternatieve pauzelocaties 

  })




  data_Store.getAllRoutes(Jaar, Maand ).catch(error => {
    this.router.push(
      {
        name: 'ErrorDisplay',
        params: { error: error }
      }
    )
  })
 
})





watch (update, async () => {
  if (update) {
    const Jaar = ref(jaar.value);
    const Maand = ref(maand.value);

//  const Mode = ref(editstatus);


    const events = await data_Store.getEvents(Jaar, Maand ).catch(error => {
      this.router.push(
        {
         name: 'ErrorDisplay',
          params: { error: error }
        }
      )
    })

    let aantalEvents = (data_Store.events.events.length) 
    let aantalPauzepl = (data_Store.events.PpauzeL.length) 
    for (let y = 0; y < aantalEvents ; y++) {
      let datum = data_Store.events.events[y].datum
    //console.log (datum)
      let z = 0
      for (let i = 0; i < aantalPauzepl ; i++) {
        if (datum === data_Store.events.PpauzeL[i].datum) {
          data_Store.Ppauzeloc[0][y] [z]= data_Store.events.PpauzeL[i]
          z = z + 1
        }
      }
    } 

    data_Store.getAllRoutes(Jaar, Maand ).catch(error => {
    this.router.push(
      {
        name: 'ErrorDisplay',
        params: { error: error }
      }
    )
  })
  
    data_Store.update = false;  
  }  
})






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


        <div class="events">
          <EventCard v-for="(event, index) in data_Store.events.events" :key="event.id" :event="event"  :index="index" />
        </div>

    </div>

  <div class="w3-col w3-container m9 l9 ">
  </div>
  <div>
    <button>

      <VueDatePicker v-model="date"   
  
            placeholder="nieuwe datum toevoegen" 
            locale="nl" selectText="Selecteer" 
            auto-apply 
            no-today :highlight-week-days="[2, 4]" :disabled-week-days="[0, 1, 3, 5, 6]" 
            :enable-time-picker="false" 
            :preview-format="format"
            :start-date="startDate"
            @date-update="dateClicked"
            />
    </button>
  
   
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
          </p>
        </div>

      </div>
    </div>
    </div>
    <div class="task-bg">
      <router-view>
        
      </router-view>
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
