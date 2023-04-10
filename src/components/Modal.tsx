import ModalStore from '@/store/ModalStore'
import SessionProposalModal from '@/views/SessionProposalModal'
import SessionSignPolkadotModal from '@/views/SessionSignPolkadotModal'
import SessionUnsuportedMethodModal from '@/views/SessionUnsuportedMethodModal'
import LegacySessionProposalModal from '@/views/LegacySessionProposalModal'
import { Modal as NextModal } from '@nextui-org/react'
import { useSnapshot } from 'valtio'

export default function Modal() {
  const { open, view } = useSnapshot(ModalStore.state)

  return (
    <NextModal blur open={open} style={{ border: '1px solid rgba(139, 139, 139, 0.4)' }}>
      {view === 'SessionProposalModal' && <SessionProposalModal />}
      {view === 'SessionUnsuportedMethodModal' && <SessionUnsuportedMethodModal />}
      {view === 'SessionSignPolkadotModal' && <SessionSignPolkadotModal />}
      {view === 'LegacySessionProposalModal' && <LegacySessionProposalModal />}
    </NextModal>
  )
}
