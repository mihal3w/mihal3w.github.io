document.addEventListener("DOMContentLoaded", function() {
    // Тема: тъмна/светла
    const themeToggle = document.querySelector(".theme-toggle");
    


    
    if (themeToggle) {
      // Функция за смяна на темата
      const toggleTheme = () => {
        document.body.classList.toggle("dark-theme");
        const isDark = document.body.classList.contains("dark-theme");
        localStorage.setItem("theme", isDark ? "dark" : "light");
        updateThemeIcon(isDark);
      };
  
      // Функция за обновяване на иконката
      const updateThemeIcon = (isDark) => {
        const icon = isDark ? '☀️' : '🌙';
        const text = isDark ? 'Light' : 'Dark';
        themeToggle.innerHTML = `
          <span class="theme-icon">${icon}</span>
          <span class="theme-text">${text}</span>
        `;
      };
  
      // Зареждане на темата при стартиране
      const loadTheme = () => {
        const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
        const savedTheme = localStorage.getItem("theme") || (prefersDark ? "dark" : "light");
        
        if (savedTheme === "dark") {
          document.body.classList.add("dark-theme");
        }
        updateThemeIcon(savedTheme === "dark");
      };
  
      // Добавяне на event listener
      themeToggle.addEventListener("click", toggleTheme);
      
      // Зареждане на темата
      loadTheme();
    }
    

/* за анимация след щракане на мишката
    document.addEventListener('click', (e) => {
        const particles = document.createElement('div');
        particles.className = 'particle';
        particles.style.left = e.clientX + 'px';
        particles.style.top = e.clientY + 'px';
        document.body.appendChild(particles);
        setTimeout(() => particles.remove(), 1000);
      });
*/



  
    // Sticky header
    const navbar = document.querySelector(".navbar");
    if (navbar) {
      let lastScrollY = window.scrollY;
  
      window.addEventListener("scroll", () => {
        const currentScrollY = window.scrollY;
        
        if (currentScrollY <= 0) {
          navbar.classList.remove("scroll-up", "scroll-down");
          return;
        }
  
        if (currentScrollY > lastScrollY && !navbar.classList.contains("scroll-down")) {
          navbar.classList.remove("scroll-up");
          navbar.classList.add("scroll-down");
        } else if (currentScrollY < lastScrollY && navbar.classList.contains("scroll-down")) {
          navbar.classList.remove("scroll-down");
          navbar.classList.add("scroll-up");
        }
  
        lastScrollY = currentScrollY;
      });
    }

    

    

  
    // Анимации при скрол
    const animateOnScroll = () => {
      const elements = document.querySelectorAll(".section, .project-card, .skill-card, .info-item");
      
      elements.forEach((el) => {
        const elementTop = el.getBoundingClientRect().top;
        const elementVisible = 150;
        
        if (elementTop < window.innerHeight - elementVisible) {
          el.style.opacity = "1";
          el.style.transform = "translateY(0)";
        }
      });
    };
  
    // Инициализиране на анимации
    const animatedElements = document.querySelectorAll(".section, .project-card, .skill-card, .info-item");
    if (animatedElements.length > 0) {
      animatedElements.forEach(el => {
        el.style.opacity = "0";
        el.style.transform = "translateY(20px)";
        el.style.transition = "all 0.6s cubic-bezier(0.25, 0.8, 0.25, 1)";
      });
  
      // Първоначално зареждане на анимации
      animateOnScroll();
      window.addEventListener("scroll", animateOnScroll);
    }
  
    // Филтър за проекти
    const filterButtons = document.querySelectorAll(".filter-btn");
    const projectCards = document.querySelectorAll(".project-card");
  
    if (filterButtons.length > 0 && projectCards.length > 0) {
      filterButtons.forEach(button => {
        button.addEventListener("click", () => {
          // Премахване активен клас от всички бутони
          filterButtons.forEach(btn => btn.classList.remove("active"));
          // Добавяне активен клас към текущия бутон
          button.classList.add("active");
          
          const filterValue = button.getAttribute("data-filter");
          
          projectCards.forEach(card => {
            if (filterValue === "all" || card.getAttribute("data-category") === filterValue) {
              card.style.display = "block";
            } else {
              card.style.display = "none";
            }
          });
        });
      });
    }

    


    

    

    

    const navLinks = [...document.querySelectorAll('.nav-links a')];

    const sitemap = document.createElement('div');
    sitemap.className = 'sitemap';
    sitemap.innerHTML = `
      <h4 class="sitemap-title">Карта на сайта</h4>
      <ul class="sitemap-links">
        ${navLinks.map(link => `<li><a href="${link.href}">${link.textContent}</a></li>`).join('')}
      </ul>
    `;
    
    document.querySelector('footer').appendChild(sitemap);
    
    const style = document.createElement('style');
    style.textContent = `
      .sitemap {
        margin-top: 10px; /* по-малко разстояние отгоре */
        text-align: center;
      }
    
      .sitemap-title {
        font-size: 18px;
        font-weight: 600;
        color: #3a3a3a;
        margin-bottom: 12px;
      }
    
      .sitemap-links {
        list-style: none;
        padding: 0;
        margin: 0;
        display: flex;
        justify-content: center;
        flex-wrap: wrap;
        gap: 25px;
      }
    
      .sitemap-links li a {
        text-decoration: none;
        color: #6c757d;
        font-size: 14px;
        transition: color 0.2s;
      }
    
      .sitemap-links li a:hover {
        color: #000;
      }
    `;
    document.head.appendChild(style);
    
    


  
    // Контактна форма
    const contactForm = document.getElementById("contactForm");
if (contactForm) {
    contactForm.addEventListener("submit", async (e) => {
        e.preventDefault();
        
        const submitBtn = contactForm.querySelector('button[type="submit"]');
        const btnText = submitBtn.querySelector('.btn-text');
        const btnIcon = submitBtn.querySelector('i');

        // Промяна на състоянието на бутона
        submitBtn.disabled = true;
        btnText.textContent = "Изпраща се...";
        if (btnIcon) {
            btnIcon.classList.remove("fa-paper-plane");
            btnIcon.classList.add("fa-spinner", "fa-spin");
        }
        
        // Симулация на изпращане
        await new Promise(resolve => setTimeout(resolve, 2000));
        
        // Успешно изпращане
        btnText.textContent = "Изпратено!";
        if (btnIcon) {
            btnIcon.classList.remove("fa-spinner", "fa-spin");
            btnIcon.classList.add("fa-check");
        }
        
        // Нулиране на формата
        contactForm.reset();
        
        // Връщане към нормално състояние след 2 секунди
        setTimeout(() => {
            btnText.textContent = "Изпрати съобщение";
            if (btnIcon) {
                btnIcon.classList.remove("fa-check");
                btnIcon.classList.add("fa-paper-plane");
            }
            submitBtn.disabled = false;
        }, 2000);
    });
}
const scrollToTopBtn = document.createElement('button');
scrollToTopBtn.className = 'scroll-to-top';
scrollToTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
document.body.appendChild(scrollToTopBtn);

window.addEventListener('scroll', () => {
  if (window.pageYOffset > 300) {
    scrollToTopBtn.style.display = 'block';
  } else {
    scrollToTopBtn.style.display = 'none';
  }
});

scrollToTopBtn.addEventListener('click', () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
});



    // Smooth scroll за anchor линкове
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    if (anchorLinks.length > 0) {
      anchorLinks.forEach(anchor => {
        anchor.addEventListener("click", function(e) {
          e.preventDefault();
          
          const targetId = this.getAttribute("href");
          if (targetId === "#") return;
          
          const targetElement = document.querySelector(targetId);
          if (targetElement) {
            targetElement.scrollIntoView({
              behavior: "smooth"
            });
          }
        });
      });
    }
    const mobileMenuBtn = document.querySelector('.mobile-menu-toggle');
    const navMenu = document.querySelector('.nav-links');
    
    if (mobileMenuBtn && navMenu) {
        mobileMenuBtn.addEventListener('click', function() {
            navMenu.classList.toggle('mobile-active');
            
            // Промяна на иконата
            this.textContent = navMenu.classList.contains('mobile-active') ? '✕' : '☰';
        });
        
        // Затваряне на менюто при клик на линк
        document.querySelectorAll('.nav-links a').forEach(link => {
            link.addEventListener('click', function() {
                navMenu.classList.remove('mobile-active');
                mobileMenuBtn.textContent = '☰';
            });
        });
    }
    




    document.querySelectorAll('.project-image img').forEach(img => {
        img.addEventListener('click', () => {
          const modal = document.createElement('div');
          modal.className = 'project-modal';
          modal.innerHTML = `
            <div class="modal-content">
              <span class="close-modal">&times;</span>
              <img src="${img.src}" alt="${img.alt}">
            </div>
          `;
          document.body.appendChild(modal);
          
          modal.querySelector('.close-modal').addEventListener('click', () => {
            modal.remove();
          });
        });
      });


      
      
    const messageInput = document.getElementById('message');
    const charCounter = document.createElement('div');
    charCounter.className = 'char-counter';
    messageInput.after(charCounter);
    
    messageInput.addEventListener('input', () => {
      const maxLength = 500;
      const remaining = maxLength - messageInput.value.length;
      charCounter.textContent = `${remaining} символа остават`;
      charCounter.style.color = remaining < 50 ? '#ff4444' : '#666';
    });
    


    


    





    document.querySelector('footer p').innerHTML = 
  `&copy; ${new Date().getFullYear()} Димитър Михалев. Всички права запазени.`;
    
    
    document.querySelector('.logo').addEventListener('mouseenter', () => {
        document.querySelector('.logo-cursor').style.animation = 'none';
      });
      
      
      document.querySelector('.logo').addEventListener('mouseleave', () => {
        document.querySelector('.logo-cursor').style.animation = 'blink 1s infinite';
      });

      
      
      
    

    


    

  });