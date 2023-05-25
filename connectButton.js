class connectButton extends HTMLElement {
    constructor() {
      super();
    }
  
    connectedCallback() {
      this.innerHTML = ` 
        <div id="prepare">
         <button
        class="bg-green-400 border border-gray-900 px-2 rounded"
        id="btn-connect"
        >
        Connect wallet
        </button>
        </div>
        <div
        id="connected"
        style="display: none"
        class="flex space-x-6 items-center"
        >
  
        <div>
        <a href="#" id="my-sites" >🖌 My NFTs</a> 
  
        </div>
        <div>
        <strong>Wallet:</strong> <span id="selected-account"></span>
        <!-- <strong>Wallet:</strong> <span class="address"></span> -->
        </div>
      
        <!--  <div class="balance"></div> -->
  
  
        <button
        class="bg-red-400 border border-gray-900 px-2 rounded"
        id="btn-disconnect"
        >
        Disconnect wallet
        </button>
        </div>
        </div>`;
    }
  }
  
  customElements.define("connect-button", connectButton);