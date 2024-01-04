import { defineStore } from "pinia";
import EventService from '@/services/EventService.js'
import { RouterLink, RouterView } from 'vue-router'

export 
 const usedataStore = defineStore('dataStore', {
    state: () => ({
        events: [],
        jaar: '2024',
        maand: '2',
        editstatus: 'off',
        mode: '',
        pauzelocs: [{"pauzeloc":[{"pauze_loc_id":59,"restaurant":"Gemeenschapscentrum \"De Pracht\""},{"pauze_loc_id":51,"restaurant":"\"Hut van Mie Pils\" (per tafel contant afrekenen)"}]}],


    }),
    // getters
    // actions
    actions: {
        setSearch(jaar, maand) {
            this.jaar = jaar
            this.maand = maand          
        },
       

        getEvents(jaar, maand) {
            return EventService.getEvents(jaar.value, maand.value )
            .then(response => {
                this.events = response.data 
 
            })
            .catch(error => {
                throw error
            })
        },

        getMode(mode) {
          if (mode === 'off') {
            this.editstatus = 'on';
          } else  {
            this.editstatus = 'off';            
          }          
        },

        getPauzeLocs(routenr) {
          return EventService.getPauzeLocs(routenr )
          .then(response => {
              this.pauzelocs = response.data 

          })
          .catch(error => {
              throw error
          })
        },


        
    }
 })