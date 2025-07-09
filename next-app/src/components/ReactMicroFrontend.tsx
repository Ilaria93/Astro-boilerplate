'use client';

import { useEffect, useRef } from 'react';
import SharedComponent from './SharedComponent';

export default function ReactMicroFrontend() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Creiamo un Web Component personalizzato
    class ReactMicroFrontendElement extends HTMLElement {
      private mountPoint: HTMLDivElement | null = null;

      connectedCallback() {
        this.mountPoint = document.createElement('div');
        this.appendChild(this.mountPoint);
        
        // Renderizziamo il componente React all'interno del Web Component
        const root = document.createElement('div');
        this.mountPoint.appendChild(root);
        
        // Qui potremmo usare ReactDOM.render o createRoot
        // Per semplicità usiamo innerHTML
        root.innerHTML = `
          <div class="react-microfrontend">
            <h2>Microfrontend React</h2>
            <div id="react-root"></div>
          </div>
        `;
      }

      disconnectedCallback() {
        if (this.mountPoint) {
          this.removeChild(this.mountPoint);
        }
      }
    }

    // Registriamo il Web Component
    customElements.define('react-microfrontend', ReactMicroFrontendElement);
  }, []);

  return (
    <div ref={containerRef}>
      <react-microfrontend></react-microfrontend>
    </div>
  );
} 