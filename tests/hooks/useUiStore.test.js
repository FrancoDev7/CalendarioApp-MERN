import { renderHook } from "@testing-library/react"
import { useUiStore } from "../../src/hooks/useUiStore"
import { Provider } from "react-redux"
import { store, uiSlice } from "../../src/store"
import { configureStore } from "@reduxjs/toolkit"
import { act } from "@testing-library/react"

// un mock store para probar el hook useUiStore con el provider de react-redux 
const getMockStore = ( initialState ) => {
  return configureStore({
    reducer: {
      ui: uiSlice.reducer
    },
    preloadedState: {
      ui: {...initialState }
    }
  })
}

describe('pruebas en el useUiStore', () => { 
  
  test('debe de regresar los valores por defecto', () => {

    const mockStore = getMockStore({ isDateModalOpen: false })
    const { result } = renderHook( () => useUiStore(), {
      wrapper: ({ children }) => <Provider store={mockStore}>{ children }</Provider>
    } )
    
    expect( result.current).toEqual({
      isDateModalOpen: false,
      OpenDateModal: expect.any(Function),
      CloseDateModal: expect.any(Function),
      togleDateModal: expect.any(Function)
    })
  })

  test('openDateModal debe de colocar true en el isDateModalOpen', () => { 

    const mockStore = getMockStore({ isDateModalOpen: false })
    const { result } = renderHook( () => useUiStore(), {
      wrapper: ({ children }) => <Provider store={mockStore}>{ children }</Provider>
    })

    const { OpenDateModal } = result.current

    act( () => {
      OpenDateModal()
    })

    expect( result.current.isDateModalOpen ).toBeTruthy()

  })

  test('closeDateModal debe de colocar false en isDateModalOpen', () => { 

    const mockStore = getMockStore({ isDateModalOpen: true })
    const { result } = renderHook( () => useUiStore(), {
      wrapper: ({ children }) => <Provider store={mockStore}>{ children }</Provider>
    })

    act( () => {
      result.current.CloseDateModal()
    })

    expect( result.current.isDateModalOpen ).toBeFalsy()


  })

  test('togleDateModal debe de cambiar el estado respectivamente', () => { 

    const mockStore = getMockStore({ isDateModalOpen: true })
    const { result } = renderHook( () => useUiStore(), {
      wrapper: ({ children }) => <Provider store={mockStore}>{ children }</Provider>
    })

    act( () => {
      result.current.togleDateModal()
    })

    expect( result.current.isDateModalOpen ).toBeFalsy()

    act( () => {
      result.current.togleDateModal()
    })

    expect( result.current.isDateModalOpen ).toBeTruthy()
  })



})