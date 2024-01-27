<script setup>
import { ref, computed, watch } from 'vue'
import { usedataStore } from '@/stores/dataStore.js'

//Programma maand


const data_Store = usedataStore()


const editstatus = computed(() => data_Store.editstatus);
const popupRoute = computed(() => data_Store.changeRoute);
const apRoute = computed(() => data_Store.allRoutes.routenr);
const apPauze = computed(() => data_Store.events);

const currentValue = ref(null)

defineProps({
  event: {
    type: Object,
    required: true,
  },

  index: {
    type: Number,
    required: true,
  },


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





function status(index) {
  const Editstatus = data_Store.editstatus;


  if (data_Store.editstatus[index] === 'off') {
   console.log(data_Store.editstatus[index])
   data_Store.editstatus[index] = 'on'
  } else  {
    console.log(data_Store.editstatus[index])
    data_Store.editstatus[index] = 'off'  
    data_Store.update = true   
  }
 }

 function changeRoute(index) {

  if (data_Store.changeRoute[index] === 'off') {
   console.log(data_Store.changeRoute[index])
   data_Store.changeRoute[index] = 'on'
  } else  {
    console.log(data_Store.changeRoute[index])
    data_Store.changeRoute[index] = 'off'  
//    data_Store.update = true   
  }
 }

 function onChange(event,index) {
 
    const pPauzeloc = (event.target.value);

    if (pPauzeloc === "event.pauzeloc_id") {
     data_Store.eventpauzeloc[index] = data_Store.events.events[index].pauzeloc_id 
     event.restaurant = event.restaurant1
    }
    if (pPauzeloc === "event.pauzeloc2_id") {
     data_Store.eventpauzeloc[index] = data_Store.events.events[index].pauzeloc2_id 
     event.restaurant = event.restaurant2
    }
    if (pPauzeloc === "event.pauzeloc3_id") {
     data_Store.eventpauzeloc[index] = data_Store.events.events[index].pauzeloc3_id 
     event.restaurant = event.restaurant3
    }
    console.log (data_Store.eventpauzeloc[index])
   console.log(data_Store.events.events[index].datum)
   data_Store.pushPPauzeloc(data_Store.events.events[index].datum, data_Store.eventpauzeloc[index] ).catch(error => {
    this.router.push(
      {
        name: 'ErrorDisplay',
        params: { error: error }
      }
    )
  })
} 

function onChangeRoute(event, index) {
 
console.log (event.target.value)
console.log (index)
data_Store.pushPRoute(data_Store.events.events[index].datum, 
                      data_Store.events.events[index].pauzeloc_id,
                      event.target.value ).catch(error => {
    this.router.push(
      {
        name: 'ErrorDisplay',
        params: { error: error }
      }
    )
  })
  data_Store.update = true   
 
} 

function onChangePauze(event, index) {
 
 console.log (event.target.value)
 console.log (index)
 console.log (data_Store.events.events[index].datum)
 console.log (data_Store.events.events[index].route)
 data_Store.pushPPauzeloc(data_Store.events.events[index].datum, 
                       event.target.value).catch(error => {
     this.router.push(
       {
         name: 'ErrorDisplay',
         params: { error: error }
       }
     )
   })
   data_Store.update = true   
  
 } 

 function formatDateDay(date) {
      const options = {  weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }
      return new Date(date).toLocaleDateString('nl', options)
    }



</script>

<template>
    

 

  <div class="w3-row w3-white"> 

  <div class="w3-col  w3-container s11 m11 l11 ">  
    <div class="event-card">
      {{ index }}
      <table>
        <tr>
          <td valign="top"><b>
            Datum:
          </b></td>
          <td WIDTH="100%">
            <div class="w3-col  m3 l3">
              <div class="datum" >
                <b>
                  {{ formatDateDay(event.datum) }}

                </b>
              </div>
  
            </div>
            <div class="w3-col w3-container s1 m1 l1 ">
              <b>
                {{ event.route }}  
              </b>
                <div v-if ="editstatus[index] == 'on'">
                  <select  @change="onChangeRoute($event, index)" v-model="data_Store.allRoutes.routenr[index].routenr" >  

                    <option v-for="pRoute in data_Store.allRoutes.allroutes" :key="pRoute.routenr"
                      :value="pRoute.routenr">{{ pRoute.routenr }} {{ pRoute.naam }} </option>  
                    </select>
                </div>

            </div>
            <b>
            <div class="w3-col w3-container s3 m5 l5 ">
              {{ event.naam }}  
            </div>  
            <div class="w3-col w3-container s3 m3 l3 ">
              {{event.heen10}}+{{ event.terug10 }} / {{event.heen}}+{{ event.terug }}
            </div>
            </b>
          </td>
        </tr>
        <tr>
          <td>
            Vertrek:
          </td>
          <td>
            9:00 uur Vanaf beginpunt
          </td>
        </tr>
        <tr>
          <td valign="top">
            Begin/eindpunt:
          </td>
          <td>
            {{ event.startlocatie }} 
            {{ event.reisroute }}   
          </td>
        </tr>
        <tr>
          <td  valign="top">
            Pauze:
 
          </td>
          <td valign="top">
            {{ event.restaurant }} in {{ event.plaats}}  , telefoon: {{ event.telefoon }}
              <div v-if ="editstatus[index] == 'on'">
              <select   @change="onChangePauze($event, index)" v-model="apPauze.Ppauze[index].pauzeplaats">
                    <option v-for="Spauze in data_Store.Ppauzeloc[0][index]" 
                      :value="Spauze.pauzeloc_id">{{ Spauze.pauzeloc_id }} {{ Spauze.restaurant }} </option>  
                    </select>
                    <p>{{ apPauze.Ppauze[index].pauzeloc_id }}</p>

  
            </div>
          </td>
        </tr>
        <tr>
          <td  valign="top">
            Beschrijving:
          </td>
          <td>
            {{ event.beschrijving }}
          </td>
        </tr>
      </table>
    </div>
  </div>
  <div class="w3-col  w3-container s1 m1 l1 "> 
    <p v-if ="editstatus[index] == 'off'">
      <button v-on:click="status(index)">
      <svg xmlns="http://www.w3.org/2000/svg" height="16" width="16" viewBox="0 0 512 512"><!--!Font Awesome Free 6.5.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2023 Fonticons, Inc.--><path d="M441 58.9L453.1 71c9.4 9.4 9.4 24.6 0 33.9L424 134.1 377.9 88 407 58.9c9.4-9.4 24.6-9.4 33.9 0zM209.8 256.2L344 121.9 390.1 168 255.8 302.2c-2.9 2.9-6.5 5-10.4 6.1l-58.5 16.7 16.7-58.5c1.1-3.9 3.2-7.5 6.1-10.4zM373.1 25L175.8 222.2c-8.7 8.7-15 19.4-18.3 31.1l-28.6 100c-2.4 8.4-.1 17.4 6.1 23.6s15.2 8.5 23.6 6.1l100-28.6c11.8-3.4 22.5-9.7 31.1-18.3L487 138.9c28.1-28.1 28.1-73.7 0-101.8L474.9 25C446.8-3.1 401.2-3.1 373.1 25zM88 64C39.4 64 0 103.4 0 152V424c0 48.6 39.4 88 88 88H360c48.6 0 88-39.4 88-88V312c0-13.3-10.7-24-24-24s-24 10.7-24 24V424c0 22.1-17.9 40-40 40H88c-22.1 0-40-17.9-40-40V152c0-22.1 17.9-40 40-40H200c13.3 0 24-10.7 24-24s-10.7-24-24-24H88z"/></svg>
      </button>
    </p>
    <p v-if ="editstatus[index] == 'on'">
      <button v-on:click="delete">
      <svg xmlns="http://www.w3.org/2000/svg" height="16" width="14" viewBox="0 0 448 512"><!--!Font Awesome Free 6.5.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2023 Fonticons, Inc.--><path d="M135.2 17.7L128 32H32C14.3 32 0 46.3 0 64S14.3 96 32 96H416c17.7 0 32-14.3 32-32s-14.3-32-32-32H320l-7.2-14.3C307.4 6.8 296.3 0 284.2 0H163.8c-12.1 0-23.2 6.8-28.6 17.7zM416 128H32L53.2 467c1.6 25.3 22.6 45 47.9 45H346.9c25.3 0 46.3-19.7 47.9-45L416 128z"/></svg>
      </button>
      <button v-on:click="status(index)">
      <svg xmlns="http://www.w3.org/2000/svg" height="16" width="14" viewBox="0 0 448 512"><!--!Font Awesome Free 6.5.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2023 Fonticons, Inc.--><path d="M438.6 105.4c12.5 12.5 12.5 32.8 0 45.3l-256 256c-12.5 12.5-32.8 12.5-45.3 0l-128-128c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0L160 338.7 393.4 105.4c12.5-12.5 32.8-12.5 45.3 0z"/></svg>
      </button>
    </p>
    </div> 
      <div v-if = "popupRoute =='on'">     

      </div>
  </div>

</template>

<style scoped>
.event-card {
  padding: 20px;
  width: 1000px;
  cursor: pointer;
  margin-bottom: 18px;
  margin-left: 75px;
}
.event-card:hover {
  transform: scale(1.01);
  box-shadow: 0 3px 12px 0 rgba(0, 0, 0, 0.2);
}

.datum {
  text-align: left;
  margin-top: 0px;
}
.icons {
  text-align: right;
}


.dropbtn:hover, .dropbtn:focus {
  background-color: #2980B9;
}

.dropdown {
  position: relative;
  display: inline-block;
}

.dropdown-content {
  display: none;
  position: absolute;
  background-color: #f1f1f1;
  min-width: 500px;
  overflow: auto;
  box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
  z-index: 1;
}

.dropdown-content a {
  color: black;
  padding: 12px 16px;
  text-decoration: none;
  display: block;
}

.dropdown a:hover {background-color: #ddd;}

.show {display: block;}

.modal {
  position: fixed;
  top: 20px;
  left: 50%;
  width: 25%;
  height: 95%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: lightseagreen;
}
.modal-inner {  
  background-color: white;
  border-radius: 0.5em;
  padding: 2em;
  margin: auto;
}

</style>