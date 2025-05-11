class ServiceMenu extends HTMLElement {
    connectedCallback() {
      const style = document.createElement("style");
      style.textContent = `
        .all {
        position: relative;
        width: 500px;
        height: 500px;
        margin: auto;
        perspective: 1000px;
        transition: all 1.3s ease-out;
        }
        
        .all:hover {
        transform: rotateX(0deg);
        }
        
        .all:hover .text {
        opacity: 1;
        }
        
        .all:hover > div {
        opacity: 1;
        transition-delay: 0s;
        }
        
        .all:hover .explainer {
        opacity: 0;
        }
  
        .left, .center, .right, .lefter, .righter {
          width: 200px;
          height: 150px;
          transform-style: preserve-3d;
          border-radius: 10px;
          border: 1px solid #fff;
          box-shadow: 0 0 20px 5px rgba(100, 100, 255, .4);
          opacity: 0;
          transition: all .3s ease;
          transition-delay: 1s;
          position: relative;
          background-position: center center;
          background-size: contain;
          background-repeat: no-repeat;
          background-color: #58d;
          cursor: pointer;
          background-blend-mode: color-burn;
        }
  
        .left:hover, .center:hover, .right:hover, .lefter:hover, .righter:hover {
          box-shadow: 0 0 30px 10px rgba(100, 100, 255, .6);
          background-color: #ccf;
        }
  
        .text {
          transform: translateY(30px);
          opacity: 0;
          transition: all .3s ease;
          bottom: 0;
          left: 5px;
          position: absolute;
          color: #fff;
          text-shadow: 0 0 5px rgba(100, 100, 255, .6);
        }
  
        .lefter {
        position: absolute;
        bottom: -1%;
        left: 50%;
        transform: translate(-50%, 0) translateZ(-50px) rotateX(10deg);
        background-image: url(https://cdn3.iconfinder.com/data/icons/other-icons/48/organization-512.png);
        }
        
        .left {
        position: absolute;
        top: 50%;
        left: -15%;
        transform: translate(0, -50%) translateZ(-25px) rotateY(-5deg);
        background-image: url(https://cdn3.iconfinder.com/data/icons/other-icons/48/creative_draw-512.png);
        }
        
        .center {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        opacity: 1;
        background-image: url(https://cdn3.iconfinder.com/data/icons/other-icons/48/app_window-512.png);
        }
        
        .right {
        position: absolute;
        top: 50%;
        right: -15%;
        transform: translate(0, -50%) translateZ(-25px) rotateY(5deg);
        background-image: url(https://cdn3.iconfinder.com/data/icons/other-icons/48/cloud_weather-512.png);
        }
        
        .righter {
        position: absolute;
        top: -1%;
        left: 50%;
        transform: translate(-50%, 0) translateZ(-50px) rotateX(-10deg);
        background-image: url(https://cdn3.iconfinder.com/data/icons/other-icons/48/search-512.png);
        }
  
        .explainer {
          font-weight: 300;
          font-size: 2rem;
          color: #fff;
          transition: all .6s ease;
          width: 100%;
          height: 100%;
          background-color: #303050;
          background-image: radial-gradient(circle at center top, #cce, #33a);
          border-radius: 10px;
          text-shadow: 0 0 10px rgba(255, 255, 255, .8);
          display: flex;
          justify-content: center;
          align-items: center;
        }
      `;
  
      this.attachShadow({ mode: 'open' });
      this.shadowRoot.appendChild(style);
  
      this.shadowRoot.innerHTML += `
        <div class="all">
          <div class="righter" onclick="loadPage('desserts-service')">
            <div class="text" data-i18n="menu.desserts">Desserts</div>
          </div>
          <div class="right" onclick="loadPage('drinks-service')">
            <div class="text" data-i18n="menu.drinks">Drinks</div>
          </div>
          <div class="left" onclick="loadPage('main-courses-service')">
            <div class="text" data-i18n="menu.main_courses">Main Courses</div>
          </div>
          <div class="lefter" onclick="loadPage('starters-service')">
            <div class="text" data-i18n="menu.starters">Starters</div>
          </div>
          <div class="center">
            <div class="explainer"><span data-i18n="menu.explore_menu" onclick="loadPage('full-service')">Explore Menu</span></div>
            <div class="text" data-i18n="menu.full_menu">Full Menu</div>
          </div>
        </div>
      `;
    }
  }
  
  customElements.define("service-menu", ServiceMenu);
  