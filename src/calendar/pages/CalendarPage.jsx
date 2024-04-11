import { useState } from 'react'
import { Calendar } from 'react-big-calendar'
import 'react-big-calendar/lib/css/react-big-calendar.css'

import { addHours } from 'date-fns'
import { CalendarEvent, CalendarModal, FabAddNew, Navbar,FabDelete } from "../"

import { localizer , getMessagesEs  } from '../../helpers'
import { useUiStore, useCalendarStore, useAuthStore} from '../../hooks'
import { useEffect } from 'react'


export const CalendarPage = () => {

  const { user } = useAuthStore()
  const { OpenDateModal } = useUiStore()
  const { events, setActiveEvent, startLoadingEvents } = useCalendarStore()

  const[ lastView , setLastView] = useState( localStorage.getItem('lastView') || 'week' )

  const eventStyleGetter = ( event, start, end, isSelected ) => {

    const isMyEvent = ( user.uid === event.user._id) || ( user.uid === event.user.uid )

    const style = {
      backgroundColor: isMyEvent ? '#347CF7' : '#465660',
      borderRadius: '0px',
      opacity: 0.8,
      color: 'white'
    }

    return {
      style
    }
  }

  const onDoubleClick = (e) => {
    // console.log({ doubleClick : e })
    OpenDateModal()
  }

  const onSelect = (e) => {
    // console.log({ click : e })
    setActiveEvent(e)
  }

  const onViewChange = (e) => {
    localStorage.setItem('lastView', e)
    setLastView(e)

  }

  useEffect(() => { 
    startLoadingEvents()
  }, [])

  return (
    <>
      <Navbar />

      <Calendar
        culture='es'
        localizer={ localizer}
        events={ events }
        defaultView={ lastView }
        startAccessor="start"
        endAccessor="end"
        style={{ height: 'calc( 100vh - 80px) ' , backgroundColor:'white' }}
        messages={ getMessagesEs()}
        eventPropGetter={ eventStyleGetter }
        components={{
          event: CalendarEvent
        }}
        onDoubleClickEvent={ onDoubleClick }
        onSelectEvent={ onSelect }
        onView={ onViewChange }
      />

      <CalendarModal />

      <FabAddNew />
      <FabDelete />

    </>
  )
}
