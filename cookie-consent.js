function initCookieConsent() {
    if (!localStorage.getItem('cookieConsent')) {
      // Създаване на основния банер
      const banner = document.createElement('div');
      banner.id = 'cookie-consent-banner';
      banner.style.cssText = `
        position: fixed;
        bottom: 0;
        left: 0;
        right: 0;
        background: rgba(26, 26, 46, 0.98);
        color: #f8f9fa;
        z-index: 10000;
        font-family: 'Inter', sans-serif;
        backdrop-filter: blur(8px);
        border-top: 1px solid rgba(67, 97, 238, 0.3);
        transform: translateY(100%);
        transition: transform 0.4s cubic-bezier(0.25, 0.8, 0.25, 1);
        padding: 16px;
        box-sizing: border-box;
      `;
  
      // Основно съдържание
      let isCustomizing = false;
      
      function renderMainView() {
        isCustomizing = false;
        banner.innerHTML = `
          <div style="max-width: 600px; margin: 0 auto;">
            <p style="margin: 0 0 16px 0; font-size: 14px; line-height: 1.5;">
              Използваме бисквитки за оптимално изживяване. 
              <a href="#" id="learn-more" style="color: #4361ee; text-decoration: none;">
                Научете повече
              </a>
            </p>
            <div style="display: flex; gap: 8px;">
              <button id="cookie-customize" style="
                flex: 1;
                background: transparent;
                color: #4361ee;
                border: 1px solid #4361ee;
                padding: 12px;
                border-radius: 8px;
                cursor: pointer;
                font-weight: 500;
                font-size: 14px;
              ">Персонализирай</button>
              <button id="cookie-accept-all" style="
                flex: 1;
                background: #4361ee;
                color: white;
                border: none;
                padding: 12px;
                border-radius: 8px;
                cursor: pointer;
                font-weight: 500;
                font-size: 14px;
              ">Приемам всички</button>
            </div>
          </div>
        `;
        attachMainEvents();
      }
  
      function renderCustomizeView() {
        isCustomizing = true;
        banner.innerHTML = `
          <div style="max-width: 600px; margin: 0 auto;">
            <h3 style="
              margin: 0 0 12px 0;
              color: #4361ee;
              font-size: 18px;
              font-weight: 600;
            ">Персонализиране на бисквитки</h3>
            
            <div style="margin-bottom: 16px;">
              <label style="
                display: flex;
                align-items: center;
                margin-bottom: 12px;
                padding: 12px;
                border-radius: 8px;
                background: rgba(255,255,255,0.05);
              ">
                <input type="checkbox" checked disabled style="
                  margin-right: 10px;
                  width: 18px;
                  height: 18px;
                  accent-color: #4361ee;
                ">
                <div>
                  <div style="font-weight: 500; margin-bottom: 4px;">Необходими бисквитки</div>
                  <div style="font-size: 12px; opacity: 0.8;">За основните функции на сайта</div>
                </div>
              </label>
              
              <label style="
                display: flex;
                align-items: center;
                margin-bottom: 12px;
                padding: 12px;
                border-radius: 8px;
                background: rgba(255,255,255,0.05);
              ">
                <input type="checkbox" id="analytics-cookies" checked style="
                  margin-right: 10px;
                  width: 18px;
                  height: 18px;
                  accent-color: #4361ee;
                ">
                <div>
                  <div style="font-weight: 500; margin-bottom: 4px;">Аналитични бисквитки</div>
                  <div style="font-size: 12px; opacity: 0.8;">За анализ на използването</div>
                </div>
              </label>
              
              <label style="
                display: flex;
                align-items: center;
                padding: 12px;
                border-radius: 8px;
                background: rgba(255,255,255,0.05);
              ">
                <input type="checkbox" id="marketing-cookies" checked style="
                  margin-right: 10px;
                  width: 18px;
                  height: 18px;
                  accent-color: #4361ee;
                ">
                <div>
                  <div style="font-weight: 500; margin-bottom: 4px;">Маркетингови бисквитки</div>
                  <div style="font-size: 12px; opacity: 0.8;">За персонализирани реклами</div>
                </div>
              </label>
            </div>
            
            <div style="display: flex; gap: 8px;">
              <button id="cookie-back" style="
                flex: 1;
                background: transparent;
                color: #4361ee;
                border: 1px solid #4361ee;
                padding: 12px;
                border-radius: 8px;
                cursor: pointer;
                font-weight: 500;
                font-size: 14px;
              ">Назад</button>
              <button id="cookie-save" style="
                flex: 1;
                background: #4361ee;
                color: white;
                border: none;
                padding: 12px;
                border-radius: 8px;
                cursor: pointer;
                font-weight: 500;
                font-size: 14px;
              ">Запази настройки</button>
            </div>
          </div>
        `;
        attachCustomizeEvents();
      }
  
      function attachMainEvents() {
        document.getElementById('cookie-customize').addEventListener('click', renderCustomizeView);
        document.getElementById('cookie-accept-all').addEventListener('click', acceptAll);
        document.getElementById('learn-more')?.addEventListener('click', showLearnMore);
      }
  
      function attachCustomizeEvents() {
        document.getElementById('cookie-back').addEventListener('click', renderMainView);
        document.getElementById('cookie-save').addEventListener('click', saveSettings);
      }
  
      function acceptAll() {
        localStorage.setItem('cookieConsent', 'all');
        dismissBanner();
      }
  
      function saveSettings() {
        const consent = {
          analytics: document.getElementById('analytics-cookies').checked,
          marketing: document.getElementById('marketing-cookies').checked
        };
        localStorage.setItem('cookieConsent', JSON.stringify(consent));
        dismissBanner();
      }
  
      function showLearnMore(e) {
        e.preventDefault();
        alert("Бисквитките са малки текстови файлове, които сайтът запазва на вашето устройство. Те помагат за подобряване на потребителското изживяване.");
      }
  
      function dismissBanner() {
        banner.style.transform = 'translateY(100%)';
        setTimeout(() => banner.remove(), 400);
      }
  
      // Инициализация
      document.body.appendChild(banner);
      setTimeout(() => {
        banner.style.transform = 'translateY(0)';
      }, 100);
      renderMainView();
  
      // Адаптивен дизайн
      function adjustLayout() {
        if (window.innerWidth > 768) {
          banner.style.left = '20px';
          banner.style.right = '20px';
          banner.style.bottom = '20px';
          banner.style.borderRadius = '12px';
          banner.style.maxWidth = '420px';
          banner.style.margin = '0 auto';
        } else {
          banner.style.left = '0';
          banner.style.right = '0';
          banner.style.bottom = '0';
          banner.style.borderRadius = '0';
          banner.style.maxWidth = 'none';
        }
      }
  
      window.addEventListener('resize', adjustLayout);
      adjustLayout();
    }
  }
  
  // Стартиране
  if (document.readyState === 'complete') {
    initCookieConsent();
  } else {
    window.addEventListener('load', initCookieConsent);
  }