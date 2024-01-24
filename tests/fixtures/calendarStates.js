
export const events = [
  {
    id: '1',
    start: new Date('2024-10-21 13:00:00'),
    end: new Date('2024-10-21 14:00:00'),
    title: 'Event 1',
    notes : 'Test notes 1',
  },
  {
    id: '2',
    start: new Date('2024-11-22 13:00:00'),
    end: new Date('2024-11-22 14:00:00'),
    title: 'Event 2',
    notes : 'Test notes 2',
  },
  
]

export const initialState = {
  isLoadingEvents: true,
  events: [],
  activeEvent: null
}

export const calendarWithEventsState = {
  isLoadingEvents: false,
  events: [...events], // COPIAR EL ARRAY PARA QUE NO SE MODIFIQUE
  activeEvent: null
}
export const calendarWithActiveEventState = {
  isLoadingEvents: false,
  events: [ ...events ], // COPIAR EL ARRAY PARA QUE NO SE MODIFIQUE
  activeEvent: { ...events[0] }
}


