import { useEffect, useRef, useState } from 'react';
import {
  SOFIA_CLAUDIA_FEEDBACK_ISSUE_URL,
  SOFIA_CLAUDIA_FEEDBACK_TEMPLATE,
  SOFIA_CLAUDIA_PRIVACY_NOTICE,
} from '../../services/feedbackService';
import { useActiveFAB } from '../ActiveFABContext';
import styles from './FeedbackFAB.module.css';

function FeedbackFAB() {
  const { activeFAB, setActiveFAB } = useActiveFAB();
  const isOpen = activeFAB === 'feedback';
  const [copyStatus, setCopyStatus] = useState('');
  const fabRef = useRef(null);
  const panelRef = useRef(null);
  const closeBtnRef = useRef(null);

  useEffect(() => {
    if (isOpen && closeBtnRef.current) {
      closeBtnRef.current.focus();
    }
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;

    function onKeyDown(e) {
      if (e.key === 'Escape') {
        setActiveFAB(null);
        fabRef.current?.focus();
      }
    }

    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [isOpen, setActiveFAB]);

  useEffect(() => {
    if (!isOpen || !panelRef.current) return;

    const focusableSelectors =
      'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])';

    function onKeyDown(e) {
      if (e.key !== 'Tab') return;

      const focusable = Array.from(
        panelRef.current.querySelectorAll(focusableSelectors)
      );
      if (!focusable.length) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (e.shiftKey) {
        if (document.activeElement === first) {
          e.preventDefault();
          last.focus();
        }
      } else {
        if (document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    }

    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [isOpen]);

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(SOFIA_CLAUDIA_FEEDBACK_TEMPLATE);
      setCopyStatus(
        'Roteiro copiado. Cole em um documento ou entregue durante a apresentacao.'
      );
    } catch {
      setCopyStatus(
        'Nao foi possivel copiar automaticamente. Selecione o roteiro manualmente.'
      );
    }
  }

  function handleClose() {
    setActiveFAB(null);
    fabRef.current?.focus();
  }

  function handleToggle() {
    if (isOpen) {
      handleClose();
    } else {
      setCopyStatus('');
      setActiveFAB('feedback');
    }
  }

  return (
    <div className={`${styles.root}${isOpen ? ` ${styles.rootOpen}` : ''}`}>
      {isOpen && (
        <div
          ref={panelRef}
          id="fab-feedback-panel"
          role="dialog"
          aria-modal="true"
          aria-labelledby="fab-feedback-title"
          className={styles.panel}
        >
          <div className={styles.panelHeader}>
            <p id="fab-feedback-title" className={styles.panelTitle}>
              Tem um feedback sobre o SIBiSC? Nos envie!
            </p>
            <button
              ref={closeBtnRef}
              type="button"
              className={styles.closeBtn}
              aria-label="Fechar painel de feedback"
              onClick={handleClose}
            >
              <svg
                width="14"
                height="14"
                viewBox="0 0 14 14"
                aria-hidden="true"
                focusable="false"
              >
                <path
                  d="M1 1l12 12M13 1L1 13"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
            </button>
          </div>

          <a
            className={styles.issueLink}
            href={SOFIA_CLAUDIA_FEEDBACK_ISSUE_URL}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Enviar feedback via GitHub Issues com o template de feedback Sofia e Claudia"
          >
            Enviar via GitHub Issues
          </a>

          <button type="button" className={styles.copyBtn} onClick={handleCopy}>
            Copiar roteiro offline
          </button>

          {copyStatus && (
            <p
              className={styles.copyStatus}
              role="status"
              aria-live="polite"
            >
              {copyStatus}
            </p>
          )}

          <p className={styles.privacy}>{SOFIA_CLAUDIA_PRIVACY_NOTICE}</p>
        </div>
      )}

      <button
        ref={fabRef}
        type="button"
        className={styles.fab}
        aria-label={
          isOpen
            ? 'Fechar painel de feedback'
            : 'Abrir painel de feedback sobre o SIBiSC'
        }
        aria-expanded={isOpen}
        aria-controls="fab-feedback-panel"
        onClick={handleToggle}
      >
        <svg
          width="22"
          height="22"
          viewBox="0 0 24 24"
          fill="none"
          aria-hidden="true"
          focusable="false"
        >
          <path
            d="M4 2h16a2 2 0 012 2v10a2 2 0 01-2 2H6l-4 4V4a2 2 0 012-2z"
            fill="currentColor"
          />
        </svg>
      </button>
    </div>
  );
}

export default FeedbackFAB;
