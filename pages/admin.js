import Head from 'next/head'
import styles from '../styles/Home.module.css'
import Icon from '@hackclub/icons'
import Modal from '../components/Modal'
import { useEffect, useState } from 'react';

export default function Admin() {
    const [modal, setModal] = useState(false);
  return (
    <>
        <Modal visible={modal} setVisible={setModal}>
            <h1>Login</h1>
        </Modal>
    </>
  );
  //update
}