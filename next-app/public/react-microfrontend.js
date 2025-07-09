class ReactMicroFrontendElement extends HTMLElement {
  constructor() {
    super();
    this.mountPoint = document.createElement('div');
  }

  connectedCallback() {
    this.appendChild(this.mountPoint);
    this.loadReactComponent();
    this.setupEventListeners();
  }

  disconnectedCallback() {
    if (this.mountPoint) {
      this.removeChild(this.mountPoint);
    }
    this.removeEventListeners();
  }

  setupEventListeners() {
    window.addEventListener('count-updated', this.handleCountUpdate);
  }

  removeEventListeners() {
    window.removeEventListener('count-updated', this.handleCountUpdate);
  }

  handleCountUpdate = (event) => {
    if (this.setState && event.detail.source !== 'react') {
      this.setState(event.detail.count);
    }
  }

  async loadReactComponent() {
    await this.loadScript('https://unpkg.com/react@18/umd/react.development.js');
    await this.loadScript('https://unpkg.com/react-dom@18/umd/react-dom.development.js');

    const App = () => {
      const [count, setCount] = React.useState(0);
      this.setState = setCount;
      
      const updateCount = () => {
        const newCount = count + 1;
        setCount(newCount);
        window.dispatchEvent(new CustomEvent('count-updated', {
          detail: { count: newCount, source: 'react' }
        }));
      };
      
      return React.createElement('div', { className: 'react-microfrontend' },
        React.createElement('h2', null, 'Microfrontend React'),
        React.createElement('p', null, `Contatore: ${count}`),
        React.createElement('button', {
          onClick: updateCount,
          className: 'btn-increment'
        }, 'Incrementa')
      );
    };

    ReactDOM.render(React.createElement(App), this.mountPoint);
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

customElements.define('react-microfrontend', ReactMicroFrontendElement); 