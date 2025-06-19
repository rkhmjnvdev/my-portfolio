// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault()
      const target = document.querySelector(this.getAttribute("href"))
      if (target) {
        target.scrollIntoView({
          behavior: "smooth",
          block: "start",
        })
      }
    })
  })
  
  // Navbar background change on scroll
  window.addEventListener("scroll", () => {
    const navbar = document.querySelector(".navbar")
    if (window.scrollY > 50) {
      navbar.style.background = "rgba(255, 255, 255, 0.98)"
      navbar.style.boxShadow = "0 2px 20px rgba(0, 0, 0, 0.1)"
    } else {
      navbar.style.background = "rgba(255, 255, 255, 0.95)"
      navbar.style.boxShadow = "none"
    }
  })
  
  // Mobile menu toggle
  const hamburger = document.querySelector(".hamburger")
  const navMenu = document.querySelector(".nav-menu")
  
  hamburger.addEventListener("click", () => {
    hamburger.classList.toggle("active")
    navMenu.classList.toggle("active")
  })
  
  // Close mobile menu when clicking on a link
  document.querySelectorAll(".nav-link").forEach((link) => {
    link.addEventListener("click", () => {
      hamburger.classList.remove("active")
      navMenu.classList.remove("active")
    })
  })
  
  // Form submission
  const contactForm = document.querySelector(".contact-form")
  contactForm.addEventListener("submit", (e) => {
    e.preventDefault()
  
    // Get form data
    const formData = new FormData(contactForm)
    const name = contactForm.querySelector('input[type="text"]').value
    const email = contactForm.querySelector('input[type="email"]').value
    const message = contactForm.querySelector("textarea").value
  
    // Simple validation
    if (name && email && message) {
      // Simulate form submission
      const submitBtn = contactForm.querySelector(".btn")
      const originalText = submitBtn.textContent
  
      submitBtn.textContent = "Sending..."
      submitBtn.style.opacity = "0.7"
  
      setTimeout(() => {
        submitBtn.textContent = "Message Sent!"
        submitBtn.style.background = "#10b981"
  
        setTimeout(() => {
          submitBtn.textContent = originalText
          submitBtn.style.background = ""
          submitBtn.style.opacity = "1"
          contactForm.reset()
        }, 2000)
      }, 1000)
    }
  })
  
  // Intersection Observer for animations
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  }
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = "1"
        entry.target.style.transform = "translateY(0)"
      }
    })
  }, observerOptions)
  
  // Observe elements for animation
  document.querySelectorAll(".skill-item, .portfolio-card, .contact-item").forEach((el) => {
    el.style.opacity = "0"
    el.style.transform = "translateY(30px)"
    el.style.transition = "opacity 0.6s ease, transform 0.6s ease"
    observer.observe(el)
  })
  
  // Parallax effect for hero shapes
  window.addEventListener("scroll", () => {
    const scrolled = window.pageYOffset
    const shapes = document.querySelectorAll(".shape")
  
    shapes.forEach((shape, index) => {
      const speed = 0.5 + index * 0.1
      shape.style.transform = `translateY(${scrolled * speed}px) rotate(${scrolled * 0.1}deg)`
    })
  })
  
  // Add loading animation
  window.addEventListener("load", () => {
    document.body.classList.add("loaded")
  })
  
  // Typing effect for hero title (optional enhancement)
  function typeWriter(element, text, speed = 100) {
    let i = 0
    element.innerHTML = ""
  
    function type() {
      if (i < text.length) {
        element.innerHTML += text.charAt(i)
        i++
        setTimeout(type, speed)
      }
    }
  
    type()
  }
  
  // === MULTILANG SWITCHER ===
  function loadLanguage(lang) {
    // Add transition effect
    document.body.classList.add("lang-transition", "changing")
  
    fetch(`./lang/${lang}.json`)
      .then((res) => {
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`)
        }
        return res.json()
      })
      .then((data) => {
        // Обновляем текстовый контент
        document.querySelectorAll("[data-i18n]").forEach((el) => {
          const keys = el.getAttribute("data-i18n").split(".")
          let text = data
  
          try {
            keys.forEach((k) => (text = text[k]))
            if (text) {
              el.textContent = text
            }
          } catch (error) {
            console.warn(`Translation key not found: ${el.getAttribute("data-i18n")}`)
          }
        })
  
        // Обновляем placeholder'ы
        document.querySelectorAll("[data-i18n-placeholder]").forEach((el) => {
          const keys = el.getAttribute("data-i18n-placeholder").split(".")
          let text = data
  
          try {
            keys.forEach((k) => (text = text[k]))
            if (text) {
              el.placeholder = text
            }
          } catch (error) {
            console.warn(`Translation key not found: ${el.getAttribute("data-i18n-placeholder")}`)
          }
        })
  
        // Обновляем атрибут lang у html
        document.documentElement.lang = lang
  
        // Remove transition effect
        setTimeout(() => {
          document.body.classList.remove("changing")
        }, 300)
      })
      .catch((error) => {
        console.error("Error loading language file:", error)
        document.body.classList.remove("changing")
      })
  
    localStorage.setItem("lang", lang)
  }
  
  // Инициализация переключателя языков
  const langSelector = document.getElementById("language-selector")
  if (langSelector) {
    langSelector.addEventListener("change", (e) => {
      loadLanguage(e.target.value)
    })
  
    // Загружаем язык при загрузке страницы
    window.addEventListener("DOMContentLoaded", () => {
      const savedLang = localStorage.getItem("lang") || "en"
      langSelector.value = savedLang
      loadLanguage(savedLang)
    })
  }
  
  // Initialize typing effect on load
  document.addEventListener("DOMContentLoaded", () => {
    const titleLines = document.querySelectorAll(".title-line")
    if (titleLines.length > 0) {
      setTimeout(() => {
        typeWriter(titleLines[0], titleLines[0].textContent, 150)
      }, 500)
  
      setTimeout(() => {
        typeWriter(titleLines[1], titleLines[1].textContent, 150)
      }, 1500)
    }
  })
  
  // Optional: Custom dropdown functionality (if you want to use the custom version)
  function initCustomLanguageSwitcher() {
    const customSelector = document.getElementById("custom-language-selector")
    const customOptions = document.getElementById("custom-options")
  
    if (!customSelector || !customOptions) return
  
    customSelector.addEventListener("click", () => {
      customOptions.classList.toggle("active")
    })
  
    document.addEventListener("click", (e) => {
      if (!customSelector.contains(e.target)) {
        customOptions.classList.remove("active")
      }
    })
  
    customOptions.addEventListener("click", (e) => {
      const option = e.target.closest(".custom-option")
      if (option) {
        const value = option.dataset.value
        const text = option.querySelector("span:last-child").textContent
        const flag = option.querySelector(".flag").className
  
        customSelector.querySelector(".selected-lang").textContent = text.split(" ")[0]
        customSelector.querySelector(".flag").className = flag
  
        customOptions.classList.remove("active")
        loadLanguage(value)
      }
    })
  }
  
  // Uncomment this if you want to use the custom dropdown
  // initCustomLanguageSwitcher()
  