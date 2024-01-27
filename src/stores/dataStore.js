import { defineStore } from "pinia";
import EventService from '@/services/EventService.js'
import { RouterLink, RouterView } from 'vue-router'

export 
 const usedataStore = defineStore('dataStore', {
    state: () => ({
        events: [],
        jaar: '2024',
        maand: '2',
        dateFull: '',
        editstatus: ["off","off","off","off","off","off","off","off","off","off"],
        update: false,
        eventdatum: [],
        eventroute: [0,0,0,0,0,0,0,0,0,0],
        eventpauzeloc: [0,0,0,0,0,0,0,0,0,0],
        allRoutes: [],
        changeRoute: ["off"],
        currentValue: 0,
        Ppauzeloc: [  [       
                    [
                        {},{},{}
                    ],
                    [
                        {},{},{}
                    ],
                    [
                        {},{},{}
                    ],
                    [
                        {},{},{}
                    ],
                    [
                        {},{},{}
                    ],
                    [
                        {},{},{}
                    ],
                    [
                        {},{},{}
                    ],
                    [
                        {},{},{}
                    ],
                    [
                        {},{},{}
                    ],
                    [
                        {},{},{}
                    ]
                ]],
        PPauzeloc : [
                        
                            [
                                {
                                    "pauzeloc_id": 15,
                                    "restaurant": 'aap'
                                },
                                {
                                    "pauzeloc_id": 16,
                                    "restaurant": 'beer'
                                }
                            ],
                            [
                                {
                                    "pauzeloc_id": 21,
                                    "restaurant": 'wim'
                                },
                                {
                                    "pauzeloc_id": 22,
                                    "restaurant":'zus'
                                },
                                {
                                    "pauzeloc_id": 23,
                                    "restaurant": 'jet'
                                }
                            ]
                        
                    ],

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
                return this.events = response.data 
 
            })
            .catch(error => {
                throw error
            })
        },
        
        pushPPauzeloc(datum, newPauzeloc) {
          return EventService.pushPPauzeloc(datum, newPauzeloc) 
          .then(response => {
              
          })
          .catch(error => {
              throw error
          })
        },

        getAllRoutes(jaar, maand) {
            return EventService.getAllRoutes(jaar.value, maand.value)
            .then(response => {
                return this.allRoutes = response.data 
            })
            .catch(error => {
                throw error
            })
        },
        
        pushPRoute(datum, PPauzeloc, PRoute) {
          return EventService.pushPRoute(datum, PPauzeloc, PRoute) 
          .then(response => {
              
          })
          .catch(error => {
              throw error
          })
        },

        createProgramma(dateFull, dateY, dateM) {
            return EventService.putPRoute(dateFull, dateY, dateM) 
            .then(response => {
                
            })
            .catch(error => {
                throw error
            })
        },

        deleteProgramma(Ddatum, Droute, Dpauzeplaats) {
            return EventService.deletePRoute(Ddatum, Droute, Dpauzeplaats)
            .then(response => {
                
            })
            .catch(error => {
                throw error
            })
        },

 

    },
 })