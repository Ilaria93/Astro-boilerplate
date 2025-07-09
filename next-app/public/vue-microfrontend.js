class VueMicroFrontendElement extends HTMLElement {
  constructor() {
    super();
    this.mountPoint = document.createElement('div');
  }

  connectedCallback() {
    this.appendChild(this.mountPoint);
    this.loadVueComponent();
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
    if (this.app && event.detail.source !== 'vue') {
      this.app._instance.data.count = event.detail.count;
    }
  }

  async loadVueComponent() {
    await this.loadScript('https://unpkg.com/vue@3/dist/vue.global.js');
    
    this.app = Vue.createApp({
      data() {
        return {
          count: 0
        }
      },
      methods: {
        updateCount() {
          this.count++;
          window.dispatchEvent(new CustomEvent('count-updated', {
            detail: { count: this.count, source: 'vue' }
          }));
        }
      },
      template: `
        <div class="vue-microfrontend">
          <h2>Microfrontend Vue</h2>
          <p>Contatore: {{ count }}</p>
          <button @click="updateCount" class="btn-increment">Incrementa</button>
        </div>
      `
    });

    this.app.mount(this.mountPoint);
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

customElements.define('vue-microfrontend', VueMicroFrontendElement); 