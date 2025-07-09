class ReactMicroFrontendElement extends HTMLElement {
  constructor() {
    super();
    this.mountPoint = document.createElement('div');
  }

  connectedCallback() {
    this.appendChild(this.mountPoint);
    this.loadReactComponent();
  }

  disconnectedCallback() {
    if (this.mountPoint) {
      this.removeChild(this.mountPoint);
    }
  }

  async loadReactComponent() {
    await this.loadScript('https://unpkg.com/react@18/umd/react.development.js');
    await this.loadScript('https://unpkg.com/react-dom@18/umd/react-dom.development.js');

    const container = document.createElement('div');
    this.mountPoint.appendChild(container);

    const App = () => {
      const [count, setCount] = React.useState(0);
      
      return React.createElement('div', { className: 'react-microfrontend' },
        React.createElement('h2', null, 'Microfrontend React'),
        React.createElement('p', null, `Contatore: ${count}`),
        React.createElement('button', {
          onClick: () => setCount(count + 1),
          className: 'btn-increment'
        }, 'Incrementa')
      );
    };

    ReactDOM.render(React.createElement(App), container);
  }

  loadScript(src) {
    return new Promise((resolve, reject) => {
      if (document.querySelector(`script[src="${src}"]`)) {
        resolve();
        return;
      }

      const script = document.createElement('script');
      script.src = src;
      script.onload = () => resolve();
      script.onerror = () => reject(new Error(`Failed to load script: ${src}`));
      document.head.appendChild(script);
    });
  }
}

// Registriamo il Web Component
customElements.define('react-microfrontend', ReactMicroFrontendElement); 