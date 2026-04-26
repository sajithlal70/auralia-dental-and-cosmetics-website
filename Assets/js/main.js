const navbar = document.getElementById("navbar");
      window.addEventListener("scroll", () => {
        if (window.scrollY > 60) {
          navbar.classList.add(
            "shadow-xl",
            "bg-[#eee7e2]/90"
          );
        } else {
          navbar.classList.remove(
            "shadow-xl",
            "bg-[#eee7e2]/90"
          );
        }
      });


    // Mobile Menu
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    const closeMenu = document.getElementById('close-menu');
    const menuLinks = document.querySelectorAll('.menu-link');

    mobileMenuBtn.addEventListener('click', () => {
      mobileMenu.classList.add('active');
    });

    closeMenu.addEventListener('click', () => {
      mobileMenu.classList.remove('active');
    });

    menuLinks.forEach(link => {
      link.addEventListener('click', () => {
        mobileMenu.classList.remove('active');
      });
    });

    // Video Modal

    const videoModal = document.getElementById("videoModal");
    const videoContainer = document.getElementById("videoContainer");
    const closeVideo = document.getElementById("closeVideo");

    document.querySelectorAll(".video-thumb").forEach(item => {
      item.addEventListener("click", () => {
        const reelUrl = item.dataset.reel;
        videoContainer.innerHTML = `
          <blockquote class="instagram-media"
            data-instgrm-permalink="${reelUrl}"
            data-instgrm-version="14">
            <a href="${reelUrl}" target="_blank"></a>
          </blockquote>
        `;
        videoModal.classList.remove("hidden");
        videoModal.classList.add("flex");
        setTimeout(() => {
          if (window.instgrm) instgrm.Embeds.process();
        }, 200);
      });
    });

    closeVideo.addEventListener("click", () => {
      videoModal.classList.add("hidden");
      videoModal.classList.remove("flex");
      videoContainer.innerHTML = "";
    });

    // Gallery Toggle

    const showMoreBtn = document.getElementById('showMoreInterior');
    const interiorGallery = document.getElementById('interior-gallery');
    const hiddenImages = interiorGallery.querySelectorAll('.hidden');

    showMoreBtn.addEventListener('click', () => {
      const isExpanded = showMoreBtn.textContent === 'Show Less';
      hiddenImages.forEach(img => img.classList.toggle('hidden', isExpanded));
      showMoreBtn.textContent = isExpanded ? 'Show More' : 'Show Less';
    });

    // Doctors Toggle
    
    const doctorBtn = document.getElementById("show-more-btn");
    const hiddenCards = document.querySelectorAll("#doctor-grid .doctor-card.hidden");
    let expanded = false;

    doctorBtn.addEventListener("click", () => {
      expanded = !expanded;
      hiddenCards.forEach(card => {
        card.classList.toggle("hidden", !expanded);
        card.classList.toggle("fade-in", expanded);
      });
      doctorBtn.textContent = expanded ? "Show Less" : "Show More";
    });

    // Three.js Sparkles

    function initSparkles(id) {
      if (window.innerWidth < 768) return;

      const canvas = document.getElementById(id);
      if (!canvas) return;

      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(75, canvas.clientWidth/canvas.clientHeight, 0.1, 1000);
      const renderer = new THREE.WebGLRenderer({ canvas, alpha:true });
      renderer.setSize(canvas.clientWidth, canvas.clientHeight);

      const geometry = new THREE.BufferGeometry();
      const vertices = [];
      for (let i = 0; i < 1200; i++) {
        vertices.push((Math.random()-0.5)*40,(Math.random()-0.5)*25,(Math.random()-0.5)*25);
      }
      geometry.setAttribute("position", new THREE.Float32BufferAttribute(vertices,3));

      const material = new THREE.PointsMaterial({
        color: 0xf5d77a,
        size: 0.1,
        transparent: true,
        opacity: 0.8,
        blending: THREE.AdditiveBlending
      });

      const points = new THREE.Points(geometry, material);
      scene.add(points);
      camera.position.z = 7;

      (function animate(){
        requestAnimationFrame(animate);
        points.rotation.y += 0.0008;
        renderer.render(scene,camera);
      })();
    }

    ["sparkles-about","sparkles-services","sparkles-gallery","sparkles-doctors"]
    .forEach(initSparkles);

    // Appointment Form

    document.addEventListener("DOMContentLoaded", () => {

    const form = document.getElementById("appointmentForm");
    if (!form) return;

    const nameEl = document.getElementById("name");
    const phoneEl = document.getElementById("phone");
    const dateEl = document.getElementById("date");
    const timeEl = document.getElementById("time");
    const descEl = document.getElementById("description");

    const CLINIC_WHATSAPP = "918089485892"; 

    // Disable past dates
    const today = new Date();
    const localDate = new Date(today.getTime() - today.getTimezoneOffset()*60000)
                      .toISOString().split("T")[0];
    dateEl.min = localDate;

    dateEl.addEventListener("change", () => {
      const day = new Date(dateEl.value).getDay();
      if (day === 0) {
        timeEl.min = "10:30";
        timeEl.max = "16:30";
      } else {
        timeEl.min = "09:30";
        timeEl.max = "19:30";
      }
      timeEl.value = "";
    });

    form.addEventListener("submit", e => {
      e.preventDefault();

      if (!nameEl.value || !phoneEl.value || !dateEl.value || !timeEl.value) {
        Swal.fire("Missing details", "Please fill all required fields", "warning");
        return;
      }

      if (phoneEl.value.length !== 10) {
        Swal.fire("Invalid number", "Enter a valid 10-digit WhatsApp number", "error");
        return;
      }

      const message = `
  Hello Auralia Dental,

  I would like to book an appointment.

  Name: ${nameEl.value}
  Phone: +91${phoneEl.value}
  Date: ${dateEl.value}
  Time: ${timeEl.value}
  Concern: ${descEl.value || "Not specified"}
  `;

      const whatsappURL =
        `https://wa.me/${CLINIC_WHATSAPP}?text=${encodeURIComponent(message)}`;

      Swal.fire({
        title: "Opening WhatsApp",
        text: "Please confirm your appointment",
        icon: "success",
        timer: 1800,
        showConfirmButton: false
      });

      setTimeout(() => {
        window.open(whatsappURL, "_blank");
      }, 1800);
    });
  });
// WhatsApp badge count animation
(function() {
  const badge = document.getElementById('wa-badge');
  const tooltip = document.getElementById('wa-tooltip');
  if (!badge) return;

  const messages = [1, 2, 3];
  let idx = 0;

  // Count up to 3 on load
  function animateCount() {
    if (idx < messages.length) {
      badge.textContent = messages[idx];
      badge.style.transform = 'scale(1.4)';
      setTimeout(() => { badge.style.transform = ''; }, 250);
      idx++;
      if (idx < messages.length) setTimeout(animateCount, 800);
    }
  }
  setTimeout(animateCount, 2000);

  // Auto-hide tooltip after 6 seconds
  if (tooltip) {
    setTimeout(() => {
      tooltip.style.transition = 'opacity 0.5s';
      tooltip.style.opacity = '0';
      setTimeout(() => tooltip.remove(), 600);
    }, 6000);
  }

  // Reset badge when user clicks WhatsApp
  const waBtn = document.getElementById('wa-btn');
  if (waBtn) {
    waBtn.addEventListener('click', () => {
      badge.style.transition = 'transform 0.3s, opacity 0.3s';
      badge.style.transform = 'scale(0)';
      badge.style.opacity = '0';
    });
  }
})();

// ===========================
// FAVICON MESSAGE COUNT BLINK
// ===========================
(function () {
  const ORIGINAL_FAVICON = './favicon.ico';
  const MSG_COUNT = 3;
  let blinkInterval = null;
  let showBadge = true;

  function drawFaviconWithBadge(count) {
    const canvas = document.createElement('canvas');
    canvas.width = 32;
    canvas.height = 32;
    const ctx = canvas.getContext('2d');

    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = function () {
      // Draw base favicon
      ctx.clearRect(0, 0, 32, 32);
      ctx.drawImage(img, 0, 0, 32, 32);

      // Draw red badge circle
      const badgeX = 24;
      const badgeY = 6;
      const radius = 8;
      ctx.beginPath();
      ctx.arc(badgeX, badgeY, radius, 0, Math.PI * 2);
      ctx.fillStyle = '#ff3b3b';
      ctx.fill();
      ctx.strokeStyle = '#fff';
      ctx.lineWidth = 1.5;
      ctx.stroke();

      // Draw count number
      ctx.fillStyle = '#fff';
      ctx.font = 'bold 10px Arial';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(count > 9 ? '9+' : String(count), badgeX, badgeY + 0.5);

      setFavicon(canvas.toDataURL('image/png'));
    };
    img.onerror = function () {
      // Fallback: plain red dot favicon if image fails to load
      ctx.clearRect(0, 0, 32, 32);
      ctx.beginPath();
      ctx.arc(16, 16, 14, 0, Math.PI * 2);
      ctx.fillStyle = '#5f1a1f';
      ctx.fill();

      ctx.beginPath();
      ctx.arc(24, 8, 7, 0, Math.PI * 2);
      ctx.fillStyle = '#ff3b3b';
      ctx.fill();
      ctx.strokeStyle = '#fff';
      ctx.lineWidth = 1.5;
      ctx.stroke();

      ctx.fillStyle = '#fff';
      ctx.font = 'bold 9px Arial';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(String(count), 24, 8.5);

      setFavicon(canvas.toDataURL('image/png'));
    };
    img.src = ORIGINAL_FAVICON;
  }

  function drawPlainFavicon() {
    const canvas = document.createElement('canvas');
    canvas.width = 32;
    canvas.height = 32;
    const ctx = canvas.getContext('2d');
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = function () {
      ctx.drawImage(img, 0, 0, 32, 32);
      setFavicon(canvas.toDataURL('image/png'));
    };
    img.onerror = function () {
      // Fallback plain icon
      ctx.beginPath();
      ctx.arc(16, 16, 14, 0, Math.PI * 2);
      ctx.fillStyle = '#5f1a1f';
      ctx.fill();
      setFavicon(canvas.toDataURL('image/png'));
    };
    img.src = ORIGINAL_FAVICON;
  }

  function setFavicon(href) {
    let link = document.querySelector("link[rel~='icon']");
    if (!link) {
      link = document.createElement('link');
      link.rel = 'icon';
      document.head.appendChild(link);
    }
    link.type = 'image/png';
    link.href = href;
  }

  function startBlink() {
    // Blink: alternate between badge favicon and plain favicon every 1s
    blinkInterval = setInterval(function () {
      if (showBadge) {
        drawFaviconWithBadge(MSG_COUNT);
      } else {
        drawPlainFavicon();
      }
      showBadge = !showBadge;
    }, 1000);
  }

  function stopBlink() {
    clearInterval(blinkInterval);
    blinkInterval = null;
    drawFaviconWithBadge(MSG_COUNT); // leave badge visible when tab regains focus
  }

  // Start blinking when tab is hidden, stop when visible
  document.addEventListener('visibilitychange', function () {
    if (document.hidden) {
      startBlink();
    } else {
      stopBlink();
      // Update title back
      document.title = 'Auralia Dental & Cosmetic Excellence';
    }
  });

  // Also blink the page title for extra attention
  let titleBlink = null;
  document.addEventListener('visibilitychange', function () {
    if (document.hidden) {
      let toggle = true;
      titleBlink = setInterval(function () {
        document.title = toggle
          ? '(' + MSG_COUNT + ') New Messages 💬'
          : 'Auralia Dental & Cosmetic Excellence';
        toggle = !toggle;
      }, 1200);
    } else {
      clearInterval(titleBlink);
      document.title = 'Auralia Dental & Cosmetic Excellence';
    }
  });

  // Show badge immediately on load after 3s
  setTimeout(function () {
    drawFaviconWithBadge(MSG_COUNT);
  }, 3000);
})();