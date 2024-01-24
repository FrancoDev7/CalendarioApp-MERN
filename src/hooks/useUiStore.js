import { useSelector, useDispatch} from 'react-redux'
import { onOpenDateModal,onCloseDateModal } from '../store'


export const useUiStore = () => {

  const dispatch = useDispatch()

  const { isDateModalOpen } = useSelector(state => state.ui)

  const OpenDateModal = () => {
    dispatch(onOpenDateModal())
  }

  const CloseDateModal = () => {
    dispatch(onCloseDateModal())
  }

  const togleDateModal = () => {
    (isDateModalOpen) ? CloseDateModal() : OpenDateModal()
  }



  return {
    //propiedades
    isDateModalOpen,

    //metodos
    OpenDateModal,
    CloseDateModal,
    togleDateModal
  }

}