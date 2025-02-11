import { useState } from 'react';

export const useModal = () => {
  const [openModalName, setOpenModalName] = useState<string | null>(null);

  const openModal = (modalName: string) => setOpenModalName(modalName);
  const closeModal = () => setOpenModalName(null);

  return { openModalName, openModal, closeModal };
};