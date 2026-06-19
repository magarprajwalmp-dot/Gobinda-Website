document.addEventListener('DOMContentLoaded', () => {

    // ─── PRELOADER ───────────────────────────────────────────
    const preloader = document.querySelector('.preloader');
    const hero = document.querySelector('.hero');

    function revealHero() {
        hero?.classList.add('hero-entrance');
    }

    if (preloader) {
        window.addEventListener('load', () => {
            setTimeout(() => {
                preloader.classList.add('hidden');
                revealHero();
            }, 300);
        });
        // fallback if load event already fired
        setTimeout(() => {
            preloader.classList.add('hidden');
            revealHero();
        }, 2000);
    } else {
        revealHero();
    }

    // ─── SCROLL PROGRESS BAR

    // ─── SCROLL PROGRESS BAR ────────────────────────────────
    const progressBar = document.querySelector('.scroll-progress');
    if (progressBar) {
        window.addEventListener('scroll', () => {
            const scrollTop = window.scrollY;
            const docHeight = document.documentElement.scrollHeight - window.innerHeight;
            const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
            progressBar.style.width = progress + '%';
        });
    }

    // ─── HEADER SCROLL EFFECT ───────────────────────────────
    const header = document.querySelector('header');
    window.addEventListener('scroll', () => {
        header.classList.toggle('scrolled', window.scrollY > 20);
    });

    // ─── BACK TO TOP ────────────────────────────────────────
    const backBtn = document.querySelector('.back-to-top');
    if (backBtn) {
        window.addEventListener('scroll', () => {
            backBtn.classList.toggle('visible', window.scrollY > 500);
        });
        backBtn.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    // ─── MOBILE HAMBURGER ───────────────────────────────────
    const hamburger = document.querySelector('.hamburger');
    const nav = document.querySelector('nav');
    const overlay = document.querySelector('.nav-overlay');

    function closeNav() {
        hamburger?.classList.remove('active');
        nav?.classList.remove('open');
        overlay?.classList.remove('active');
        document.body.style.overflow = '';
    }

    function openNav() {
        hamburger?.classList.add('active');
        nav?.classList.add('open');
        overlay?.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    if (hamburger) {
        hamburger.addEventListener('click', () => {
            nav?.classList.contains('open') ? closeNav() : openNav();
        });
    }

    if (overlay) {
        overlay.addEventListener('click', closeNav);
    }

    // close nav on link click
    document.querySelectorAll('nav a').forEach(link => {
        link.addEventListener('click', closeNav);
    });

    // ─── CURSOR GLOW ────────────────────────────────────────
    const glow = document.querySelector('.cursor-glow');
    if (glow && window.innerWidth > 992) {
        let mouseX = 0, mouseY = 0;
        let currentX = 0, currentY = 0;

        document.addEventListener('mousemove', e => {
            mouseX = e.clientX;
            mouseY = e.clientY;
        });

        function animateGlow() {
            currentX += (mouseX - currentX) * 0.08;
            currentY += (mouseY - currentY) * 0.08;
            glow.style.left = currentX + 'px';
            glow.style.top = currentY + 'px';
            requestAnimationFrame(animateGlow);
        }
        animateGlow();
    }

    // ─── SCROLL REVEAL ──────────────────────────────────────
    const revealElements = document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale');
    if (revealElements.length && 'IntersectionObserver' in window) {
        const revealObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    revealObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

        revealElements.forEach(el => revealObserver.observe(el));
    } else {
        revealElements.forEach(el => el.classList.add('visible'));
    }

    // ─── ANIMATED COUNTERS ──────────────────────────────────
    function animateCounter(el) {
        const target = +el.dataset.target;
        const duration = 2000;
        let start = null;
        let lastDisplayed = -1;


        function step(timestamp) {
            if (!start) start = timestamp;
            const progress = timestamp - start;
            const current = Math.min(Math.floor((progress / duration) * target), target);

            if (current !== lastDisplayed) {
                el.textContent = current;
                lastDisplayed = current;
            }

            if (progress < duration) {
                requestAnimationFrame(step);
            } else {
                el.textContent = target;
            }
        }
        requestAnimationFrame(step);
    }

    const counters = document.querySelectorAll('.count-num');
    if ('IntersectionObserver' in window) {
        const counterObserver = new IntersectionObserver((entries, obs) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateCounter(entry.target);
                    obs.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });
        counters.forEach(el => counterObserver.observe(el));
    } else {
        counters.forEach(el => animateCounter(el));
    }

    // ─── IMAGE PARALLAX ─────────────────────────────────────
    const parallaxImages = document.querySelectorAll('.parallax-img');


    if (parallaxImages.length) {
        window.addEventListener('scroll', () => {
            parallaxImages.forEach(img => {
                const rect = img.getBoundingClientRect();
                const speed = 0.15;
                const yOffset = (rect.top - window.innerHeight) * speed;
                if (rect.top < window.innerHeight && rect.bottom > 0) {
                    img.style.transform = `translateY(${yOffset}px)`;
                }
            });
        });
    }

    // ─── 3D TILT ────────────────────────────────────────────
    function init3DTilt(container, target) {
        if (!container || !target || window.innerWidth <= 992) return;
        container.addEventListener('mousemove', e => {
            const rect = container.getBoundingClientRect();
            const x = (e.clientX - rect.left) / rect.width;
            const y = (e.clientY - rect.top) / rect.height;
            target.style.transform =
                `rotateY(${(x - 0.5) * 12}deg) rotateX(${(0.5 - y) * 8}deg)`;
        });
        container.addEventListener('mouseleave', () => {
            target.style.transform = 'rotateY(0deg) rotateX(0deg)';
        });
    }

    init3DTilt(
        document.querySelector('.hero-right'),
        document.querySelector('.hero-3d-tilt')
    );

    init3DTilt(
        document.querySelector('.about-image'),
        document.querySelector('.about-3d-tilt')
    );

    // ─── 3D TILT ON STAT BOXES ─────────────────────────────
    document.querySelectorAll('.stat-box').forEach(box => {
        if (window.innerWidth <= 992) return;
        let tiltAnim;
        box.addEventListener('mousemove', e => {
            const rect = box.getBoundingClientRect();
            const x = (e.clientX - rect.left) / rect.width;
            const y = (e.clientY - rect.top) / rect.height;
            const tiltX = (0.5 - y) * 14;
            const tiltY = (x - 0.5) * 14;
            cancelAnimationFrame(tiltAnim);
            tiltAnim = requestAnimationFrame(() => {
                box.style.transform = `perspective(800px) rotateX(${tiltX}deg) rotateY(${tiltY}deg)`;
            });
        });
        box.addEventListener('mouseleave', () => {
            cancelAnimationFrame(tiltAnim);
            box.style.transform = 'perspective(800px) rotateX(0deg) rotateY(0deg)';
        });
    });

    // ─── SOCIAL ICONS TILT ───────────────────────────────────
    document.querySelectorAll('.social-icons a').forEach(el => {
        if (window.innerWidth <= 992) return;
        const icon = el.querySelector('i');
        if (!icon) return;
        let anim;
        el.addEventListener('mousemove', e => {
            cancelAnimationFrame(anim);
            anim = requestAnimationFrame(() => {
                const rect = el.getBoundingClientRect();
                const x = (e.clientX - rect.left) / rect.width;
                const y = (e.clientY - rect.top) / rect.height;
                icon.style.setProperty('--six', `${(0.5 - y) * 24}deg`);
                icon.style.setProperty('--siy', `${(x - 0.5) * 24}deg`);
            });
        });
        el.addEventListener('mouseleave', () => {
            cancelAnimationFrame(anim);
            icon.style.removeProperty('--six');
            icon.style.removeProperty('--siy');
        });
    });

    // ─── ABOUT FLOATING BACKGROUND PARTICLES ─────────────────
    (function initFloatBg() {
        const container = document.getElementById('aboutFloat');
        if (!container) return;
        const frag = document.createDocumentFragment();
        const colors = ['var(--primary-color)', 'var(--secondary-color)'];
        for (let i = 0; i < 12; i++) {
            const span = document.createElement('span');
            const size = 12 + Math.random() * 28;
            span.style.setProperty('--s', size + 'px');
            span.style.setProperty('--x', Math.random() * 100 + '%');
            span.style.setProperty('--y', Math.random() * 100 + '%');
            span.style.setProperty('--d', (8 + Math.random() * 10) + 's');
            span.style.setProperty('--dl', (Math.random() * 6) + 's');
            span.style.background = colors[i % 2];
            frag.appendChild(span);
        }
        container.appendChild(frag);
    })();

    // ─── TIMELINE CURSOR SPOTLIGHT ───────────────────────────
    document.querySelectorAll('.about-timeline-col .timeline-item').forEach(item => {
        if (window.innerWidth <= 768) return;
        let anim;
        item.addEventListener('mousemove', e => {
            cancelAnimationFrame(anim);
            anim = requestAnimationFrame(() => {
                const rect = item.getBoundingClientRect();
                const x = ((e.clientX - rect.left) / rect.width * 100).toFixed(1);
                const y = ((e.clientY - rect.top) / rect.height * 100).toFixed(1);
                item.style.setProperty('--mx', x + '%');
                item.style.setProperty('--my', y + '%');
            });
        });
        item.addEventListener('mouseleave', () => {
            cancelAnimationFrame(anim);
            item.style.removeProperty('--mx');
            item.style.removeProperty('--my');
        });
    });

    // ─── BUTTON RIPPLE ──────────────────────────────────────
    document.querySelectorAll('.ripple-btn').forEach(btn => {
        btn.addEventListener('click', function (e) {
            const rect = this.getBoundingClientRect();
            const ripple = document.createElement('span');
            ripple.className = 'ripple';
            const size = Math.max(rect.width, rect.height);
            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = (e.clientX - rect.left - size / 2) + 'px';
            ripple.style.top = (e.clientY - rect.top - size / 2) + 'px';
            this.appendChild(ripple);
            setTimeout(() => ripple.remove(), 600);
        });
    });

    // ─── CUSTOM SELECT (WATERFALL + 3D GLASS + SCROLL) ────
    class CustomScroll {
        constructor(el, track) {
            this.el = el;
            this.track = track;
            this.thumb = track?.querySelector('.thumb');
            this.y = 0;
            this.max = 0;
            this.touchStartY = 0;
            if (!el || !track || !this.thumb) return;
            this.resize();
            this.el.addEventListener('wheel', e => { e.preventDefault(); this.scrollBy(e.deltaY); }, { passive: false });
            this.el.addEventListener('touchstart', e => { this.touchStartY = e.touches[0].clientY; }, { passive: true });
            this.el.addEventListener('touchmove', e => {
                const dy = this.touchStartY - e.touches[0].clientY;
                this.touchStartY = e.touches[0].clientY;
                this.scrollBy(dy * 0.6);
                e.preventDefault();
            }, { passive: false });
            this.ro = new ResizeObserver(() => this.resize());
            this.ro.observe(this.el);
        }
        resize() {
            this.max = Math.max(0, this.el.scrollHeight - this.el.clientHeight);
            if (this.max <= 0) { this.track.style.display = 'none'; return; }
            this.track.style.display = '';
            this.y = Math.min(this.y, this.max);
            this.render();
        }
        scrollBy(dy) {
            this.y = Math.max(0, Math.min(this.max, this.y + dy));
            this.render();
        }
        scrollTo(y) {
            this.y = Math.max(0, Math.min(this.max, y));
            this.render();
        }
        render() {
            this.el.style.transform = `translateY(-${this.y}px)`;
            const ratio = this.el.clientHeight / this.el.scrollHeight;
            const thumbH = Math.max(20, ratio * this.track.clientHeight);
            const thumbTop = this.max > 0 ? (this.y / this.max) * (this.track.clientHeight - thumbH) : 0;
            this.thumb.style.height = thumbH + 'px';
            this.thumb.style.top = thumbTop + 'px';
        }
        destroy() { this.ro?.disconnect(); }
    }

    document.querySelectorAll('.custom-select-wrap').forEach(wrap => {
        const native = wrap.querySelector('select');
        if (!native) return;
        const trigger = wrap.querySelector('.custom-select-trigger');
        const dropdown = wrap.querySelector('.custom-select-dropdown');
        const scrollEl = wrap.querySelector('.custom-select-options');
        const trackEl = wrap.querySelector('.custom-select-scrollbar');
        if (!trigger || !dropdown) return;
        const opts = dropdown.querySelectorAll('.opt');
        let cs = null;
        let touchScrolled = false;
        let touchStartX = 0;
        let touchStartY = 0;

        function resetTouchFlag() {
            touchScrolled = false;
        }


        function markIfMoved(x, y) {
            // If user is scrolling/dragging, avoid treating it as a tap.
            const dx = x - touchStartX;
            const dy = y - touchStartY;
            if (Math.abs(dx) > 8 || Math.abs(dy) > 8) touchScrolled = true;
        }

        // Track any touch interaction inside the options area.
        scrollEl?.addEventListener('touchstart', (e) => {
            touchStartX = e.touches?.[0]?.clientX ?? 0;
            touchStartY = e.touches?.[0]?.clientY ?? 0;
            resetTouchFlag();
        }, { passive: true });

        scrollEl?.addEventListener('touchmove', (e) => {
            markIfMoved(e.touches?.[0]?.clientX ?? 0, e.touches?.[0]?.clientY ?? 0);
        }, { passive: true });

        scrollEl?.addEventListener('touchend', () => {
            setTimeout(() => { touchScrolled = false; }, 250);
        }, { passive: true });


        function open() {
            dropdown.classList.add('open');
            trigger.classList.add('open');
            cs = new CustomScroll(scrollEl, trackEl);
            setTimeout(() => trigger.focus(), 50);
        }
        function close() {
            dropdown.classList.remove('open');
            trigger.classList.remove('open');
            if (scrollEl) scrollEl.style.transform = '';
            cs?.destroy();
            cs = null;
        }
        function select(opt) {
            native.value = opt.dataset.value;
            opts.forEach(p => p.classList.remove('selected'));
            opt.classList.add('selected');

            // Update trigger label without replacing the whole markup.
            const labelText = (opt.textContent || '').trim();
            const arrowEl = trigger.querySelector('.arrow');
            if (arrowEl) {
                // Clear all existing text nodes (keep the arrow span).
                trigger.childNodes.forEach(n => {
                    if (n.nodeType === Node.TEXT_NODE) n.textContent = '';
                });

                // Ensure there's a text node to keep layout stable.
                if (!Array.from(trigger.childNodes).some(n => n.nodeType === Node.TEXT_NODE && n.textContent.trim())) {
                    trigger.insertBefore(document.createTextNode(labelText), arrowEl);
                } else {
                    // Replace the first text node.
                    const firstTextNode = Array.from(trigger.childNodes).find(n => n.nodeType === Node.TEXT_NODE);
                    if (firstTextNode) firstTextNode.textContent = labelText;
                }
            } else {
                trigger.textContent = labelText;
                const arrow = document.createElement('span');
                arrow.className = 'arrow';
                arrow.textContent = '▼';
                trigger.appendChild(arrow);
            }

            trigger.classList.add('selected');
            trigger.style.borderColor = '';
            trigger.classList.remove('error');
            native.dispatchEvent(new Event('change', { bubbles: true }));
            close();
        }


        trigger.addEventListener('click', e => {
            e.stopPropagation();
            if (dropdown.classList.contains('open')) { close(); return; }
            document.querySelectorAll('.custom-select-dropdown.open').forEach(d => {
                d.classList.remove('open');
                d.querySelector('.custom-select-options') && (d.querySelector('.custom-select-options').style.transform = '');
                d.closest('.custom-select-wrap')?.querySelector('.custom-select-trigger')?.classList.remove('open');
            });
            open();
        });
        opts.forEach(o => o.addEventListener('click', () => {
            if (touchScrolled) return;
            select(o);
        }));
        trigger.addEventListener('keydown', e => {
            if (e.key === 'Escape') { close(); return; }
            if (e.key !== 'ArrowDown' && e.key !== 'ArrowUp') return;
            e.preventDefault();
            if (!dropdown.classList.contains('open')) { open(); return; }
            if (!cs) return;
            cs.scrollBy(e.key === 'ArrowDown' ? 40 : -40);
        });
    });
    document.addEventListener('click', e => {
        if (e.target.closest('.custom-select-wrap')) return;
        document.querySelectorAll('.custom-select-dropdown.open').forEach(d => {
            d.classList.remove('open');
            d.querySelector('.custom-select-options') && (d.querySelector('.custom-select-options').style.transform = '');
            d.closest('.custom-select-wrap')?.querySelector('.custom-select-trigger')?.classList.remove('open');
        });
    });

    // ─── CONTACT FORM ───────────────────────────────────────
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        const feedback = document.querySelector('.form-feedback') || (() => {
            const el = document.createElement('div');
            el.className = 'form-feedback';
            contactForm.appendChild(el);
            return el;
        })();

        function validateField(field) {
            field.classList.remove('error', 'success');
            const value = field.value.trim();

            if (field.hasAttribute('required') && !value) {
                field.classList.add('error');
                return false;
            }
            if (field.type === 'email' && value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
                field.classList.add('error');
                return false;
            }
            field.classList.add('success');
            return true;
        }

        contactForm.querySelectorAll('input, textarea').forEach(field => {
            field.addEventListener('blur', () => validateField(field));
            field.addEventListener('input', () => {
                field.classList.remove('error');
                if (field.value.trim()) field.classList.add('success');
                else field.classList.remove('success');
            });
        });

        function resetCustomSelect(wrap) {
            const trigger = wrap.querySelector('.custom-select-trigger');
            const native = wrap.querySelector('select');
            if (trigger && native) {
                trigger.innerHTML = 'Select a Program<span class="arrow">▼</span>';
                trigger.classList.remove('selected');
                wrap.querySelectorAll('.opt').forEach(o => o.classList.remove('selected'));
                native.selectedIndex = 0;
            }
        }

        function validateCustomSelect(wrap) {
            const native = wrap.querySelector('select');
            const trigger = wrap.querySelector('.custom-select-trigger');
            if (!native || !trigger) return true;
            if (!native.value.trim()) {
                trigger.style.borderColor = '#e74c3c';
                trigger.classList.add('error');
                return false;
            }
            trigger.style.borderColor = '';
            trigger.classList.remove('error');
            return true;
        }

        contactForm.addEventListener('submit', e => {
            e.preventDefault();
            let allValid = true;
            contactForm.querySelectorAll('input, textarea').forEach(field => {
                if (!validateField(field)) allValid = false;
            });
            contactForm.querySelectorAll('.custom-select-wrap').forEach(w => {
                if (!validateCustomSelect(w)) allValid = false;
            });

            feedback.className = 'form-feedback show';
            if (allValid) {
                feedback.className = 'form-feedback show success';
                feedback.textContent = '✓ Thank you! We\'ll get back to you shortly.';
                contactForm.reset();
                contactForm.querySelectorAll('.success').forEach(el => el.classList.remove('success'));
                contactForm.querySelectorAll('.custom-select-wrap').forEach(w => resetCustomSelect(w));
                setTimeout(() => feedback.classList.remove('show'), 5000);
            } else {
                feedback.className = 'form-feedback show error';
                feedback.textContent = 'Please fill in all required fields correctly.';
                const firstError = contactForm.querySelector('.error');
                if (firstError) {
                    if (firstError.closest('.custom-select-wrap')) {
                        firstError.closest('.custom-select-wrap').querySelector('.custom-select-trigger')?.focus();
                    } else {
                        firstError.focus();
                    }
                }
            }
        });
    }

    // ─── GALLERY LIGHTBOX ───────────────────────────────────
    const galleryItems = document.querySelectorAll('.gallery-placeholder');
    if (galleryItems.length) {
        const lightbox = document.createElement('div');
        lightbox.className = 'lightbox';
        lightbox.innerHTML = `
            <style>
                .lightbox {
                    position: fixed;
                    inset: 0;
                    background: rgba(0,0,0,0.95);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    z-index: 99999;
                    opacity: 0;
                    visibility: hidden;
                    transition: opacity 0.3s, visibility 0.3s;
                    cursor: pointer;
                    padding: 40px;
                }
                .lightbox.active {
                    opacity: 1;
                    visibility: visible;
                }
                .lightbox-media,
                .lightbox-iframe {
                    max-width: 100%;
                    max-height: 100%;
                    display: block;
                    border-radius: 8px;
                }
                .lightbox-media {
                    object-fit: contain;
                }
                .lightbox-iframe {
                    width: 100%;
                    height: 56.25vw;
                    max-height: 100%;
                    border: none;
                }
                @media (max-width: 768px) {
                    .lightbox {
                        padding: 16px;
                    }
                }
                .lightbox-close {
                    position: absolute;
                    top: 20px;
                    right: 20px;
                    color: #fff;
                    font-size: 32px;
                    cursor: pointer;
                    opacity: 0.7;
                    transition: opacity 0.3s;
                    background: rgba(0,0,0,0.3);
                    border: none;
                    width: 44px;
                    height: 44px;
                    border-radius: 50%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    z-index: 2;
                    backdrop-filter: blur(8px);
                }
                .lightbox-close:hover {
                    opacity: 1;
                }
                .lightbox-title {
                    display: none;
                }
            </style>
            <button class="lightbox-close">&times;</button>
            <img src="" alt="" class="lightbox-media" style="display:none">
            <video src="" class="lightbox-media lightbox-video" style="display:none" controls></video>
            <iframe src="" class="lightbox-media lightbox-iframe" style="display:none" allow="autoplay; encrypted-media" allowfullscreen></iframe>
            <div class="lightbox-title"></div>
        `;
        document.body.appendChild(lightbox);

        const lightboxImg = lightbox.querySelector('.lightbox-media');
        const lightboxVideo = lightbox.querySelector('.lightbox-video');
        const lightboxIframe = lightbox.querySelector('.lightbox-iframe');
        const lightboxTitle = lightbox.querySelector('.lightbox-title');

        function youtubeEmbedUrl(url) {
            if (!url) return '';
            const match = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([a-zA-Z0-9_-]+)/);
            return match ? `https://www.youtube.com/embed/${match[1]}?autoplay=1` : '';
        }

        galleryItems.forEach(item => {
            item.addEventListener('click', () => {
                const title = item.dataset.title || 'Gallery';
                const img = item.querySelector('.gallery-img');
                const video = item.querySelector('.gallery-video-el');
                const videoUrl = item.dataset.video;

                lightboxImg.style.display = 'none';
                lightboxVideo.style.display = 'none';
                lightboxIframe.style.display = 'none';
                lightboxVideo.pause?.();
                lightboxVideo.removeAttribute('src');
                lightboxIframe.src = '';

                if (videoUrl) {
                    const embed = youtubeEmbedUrl(videoUrl);
                    if (embed) {
                        lightboxIframe.src = embed;
                        lightboxIframe.style.display = 'block';
                    }
                } else if (video) {
                    lightboxVideo.poster = video.poster || '';
                    lightboxVideo.src = video.src || '';
                    lightboxVideo.style.display = 'block';
                } else if (img) {
                    lightboxImg.src = img.src || '';
                    lightboxImg.alt = img.alt || '';
                    lightboxImg.style.display = 'block';
                }

                lightboxTitle.textContent = title;
                lightbox.classList.add('active');
                document.body.style.overflow = 'hidden';
            });

            const videoUrl = item.dataset.video;
            const video = item.querySelector('.gallery-video-el');
            let hoverIframe = null;

            item.addEventListener('mouseenter', () => {
                if (videoUrl) {
                    const media = item.querySelector('.gallery-media');
                    if (!media || item.querySelector('.gallery-hover-iframe')) return;
                    const embedUrl = youtubeEmbedUrl(videoUrl);
                    if (!embedUrl) return;
                    const iframe = document.createElement('iframe');
                    iframe.className = 'gallery-hover-iframe';
                    iframe.src = embedUrl.replace('autoplay=1', 'autoplay=1&mute=1&controls=0&loop=1');
                    iframe.allow = 'autoplay; encrypted-media';
                    iframe.setAttribute('allowfullscreen', '');
                    Object.assign(iframe.style, {
                        position: 'absolute', inset: '0', width: '100%', height: '100%',
                        border: '0', zIndex: '1', pointerEvents: 'none',
                        borderRadius: '16px'
                    });
                    media.appendChild(iframe);
                    hoverIframe = iframe;
                } else if (video && video.src) {
                    video.muted = true;
                    video.loop = true;
                    video.play().catch(() => {});
                }
            });

            item.addEventListener('mouseleave', () => {
                if (hoverIframe) {
                    hoverIframe.remove();
                    hoverIframe = null;
                } else if (video && video.src) {
                    video.pause();
                    video.currentTime = 0;
                }
            });
        });

        lightbox.addEventListener('click', e => {
            if (e.target === lightbox || e.target.closest('.lightbox-close')) {
                lightbox.classList.remove('active');
                document.body.style.overflow = '';
                lightboxVideo.pause?.();
                lightboxIframe.src = '';
            }
        });

        document.addEventListener('keydown', e => {
            if (e.key === 'Escape' && lightbox.classList.contains('active')) {
                lightbox.classList.remove('active');
                document.body.style.overflow = '';
                lightboxVideo.pause?.();
                lightboxIframe.src = '';
            }
        });
    }

    // ─── CAROUSEL ────────────────────────────────────────
    document.querySelectorAll('.carousel-wrap').forEach(wrap => {
        const track = wrap.querySelector('.carousel-track');
        const slides = Array.from(wrap.querySelectorAll('.carousel-slide'));
        const prevBtn = wrap.querySelector('.carousel-prev');
        const nextBtn = wrap.querySelector('.carousel-next');
        const dotsContainer = wrap.querySelector('.carousel-dots');

        if (!track || slides.length < 2) return;
        if (window.innerWidth > 768) return;

        const totalSlides = slides.length;
        const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        const autoPlayDelay = 3500;
        let currentIndex = 1;
        let autoPlayTimer = null;
        let isTransitioning = false;
        let slideOffset = 0;

        const firstClone = slides[0].cloneNode(true);
        const lastClone = slides[totalSlides - 1].cloneNode(true);
        track.appendChild(firstClone);
        track.insertBefore(lastClone, slides[0]);

        const allSlides = track.querySelectorAll('.carousel-slide');

        function computeSlideOffset() {
            if (allSlides.length < 2) return;
            const r0 = allSlides[0].getBoundingClientRect();
            const r1 = allSlides[1].getBoundingClientRect();
            slideOffset = r1.left - r0.left;
        }

        // Create dots
        const dots = [];
        if (dotsContainer) {
            dotsContainer.innerHTML = '';
            for (let i = 0; i < totalSlides; i++) {
                const dot = document.createElement('button');
                dot.addEventListener('click', () => {
                    if (isTransitioning) return;
                    isTransitioning = true;
                    currentIndex = i + 1;
                    updateCarousel(true);
                    setTimeout(() => { isTransitioning = false; }, 500);
                });
                dotsContainer.appendChild(dot);
                dots.push(dot);
            }
            dots[0]?.classList.add('active');
        }

        function updateDots() {
            if (!dots.length) return;
            let realIndex = currentIndex - 1;
            if (realIndex < 0) realIndex = totalSlides - 1;
            else if (realIndex >= totalSlides) realIndex = 0;
            dots.forEach((d, i) => d.classList.toggle('active', i === realIndex));
        }

        function updateCarousel(animate) {
            track.style.transition = animate ? 'transform 0.4s cubic-bezier(0.4, 0, 0.2, 1)' : 'none';
            track.style.transform = `translateX(-${currentIndex * slideOffset}px)`;
            if (!animate) track.offsetHeight;
            updateDots();
        }

        function nextSlide() {
            if (isTransitioning) return;
            isTransitioning = true;
            currentIndex++;
            updateCarousel(true);
            setTimeout(() => { isTransitioning = false; }, 500);
        }

        function prevSlide() {
            if (isTransitioning) return;
            isTransitioning = true;
            currentIndex--;
            updateCarousel(true);
            setTimeout(() => { isTransitioning = false; }, 500);
        }

        track.addEventListener('transitionend', () => {
            isTransitioning = false;
            if (currentIndex === 0) { currentIndex = totalSlides; updateCarousel(false); }
            else if (currentIndex === totalSlides + 1) { currentIndex = 1; updateCarousel(false); }
        });

        prevBtn?.addEventListener('click', () => { stopAutoPlay(); prevSlide(); });
        nextBtn?.addEventListener('click', () => { stopAutoPlay(); nextSlide(); });

        function startAutoPlay() { stopAutoPlay(); autoPlayTimer = setInterval(nextSlide, autoPlayDelay); }
        function stopAutoPlay() { if (autoPlayTimer) { clearInterval(autoPlayTimer); autoPlayTimer = null; } }

        wrap.addEventListener('mouseenter', stopAutoPlay);
        wrap.addEventListener('mouseleave', startAutoPlay);

        // Touch / drag support
        let dragStartX = 0;
        let dragStartY = 0;
        let isDragging = false;
        let dragStartIdx = 0;

        track.addEventListener('touchstart', (e) => {
            if (isTransitioning) return;
            dragStartX = e.touches[0].screenX;
            dragStartY = e.touches[0].screenY;
            isDragging = true;
            dragStartIdx = currentIndex;
            stopAutoPlay();
            track.style.transition = 'none';
        }, { passive: true });

        track.addEventListener('touchmove', (e) => {
            if (!isDragging) return;
            const dx = e.touches[0].screenX - dragStartX;
            const dy = e.touches[0].screenY - dragStartY;
            if (Math.abs(dx) > Math.abs(dy)) {
                e.preventDefault();
                const clampedDx = Math.max(-slideOffset, Math.min(slideOffset, dx));
                track.style.transform = `translateX(${-(dragStartIdx * slideOffset) + clampedDx}px)`;
            }
        }, { passive: false });

        track.addEventListener('touchend', (e) => {
            if (!isDragging) return;
            isDragging = false;
            const dx = dragStartX - e.changedTouches[0].screenX;
            const absDx = Math.abs(dx);

            if (absDx > slideOffset * 0.25) {
                if (dx > 0) currentIndex = Math.min(dragStartIdx + 1, totalSlides + 1);
                else currentIndex = Math.max(dragStartIdx - 1, 0);
            } else {
                currentIndex = dragStartIdx;
            }

            isTransitioning = true;
            updateCarousel(true);
            setTimeout(() => { isTransitioning = false; }, 500);

            if (!prefersReducedMotion) startAutoPlay();
        }, { passive: true });

        // Resize recalc
        let resizeTimeout;
        window.addEventListener('resize', () => {
            clearTimeout(resizeTimeout);
            resizeTimeout = setTimeout(() => {
                computeSlideOffset();
                updateCarousel(false);
            }, 200);
        });

        computeSlideOffset();
        updateCarousel(false);
        if (!prefersReducedMotion) startAutoPlay();
    });

    // ─── TESTIMONIAL MOBILE CAROUSEL ──────────────────────
    const testimonialGrid = document.querySelector('.testimonial-grid');
    const testimonialWrap = document.querySelector('.testimonial-wrap');
    const dotsContainer = document.querySelector('.testimonial-dots');

    if (testimonialWrap && testimonialGrid && dotsContainer) {
        let currentIndex = 0;
        let autoPlayTimer = null;
        let isTransitioning = false;
        const autoPlayDelay = 3500;
        const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

        const prevBtn = testimonialWrap.querySelector('.carousel-prev');
        const nextBtn = testimonialWrap.querySelector('.carousel-next');

        function initTestimonialCarousel() {
            if (autoPlayTimer) { clearInterval(autoPlayTimer); autoPlayTimer = null; }
            dotsContainer.innerHTML = '';

            if (window.innerWidth > 768) {
                testimonialGrid.style.transform = '';
                testimonialGrid.style.transition = '';
                testimonialWrap.style.overflow = '';
                return;
            }

            testimonialWrap.style.overflow = 'hidden';
            const cards = testimonialGrid.querySelectorAll('.testimonial-card');
            if (!cards.length) return;

            cards.forEach((_, i) => {
                const dot = document.createElement('button');
                if (i === 0) dot.classList.add('active');
                dot.addEventListener('click', () => {
                    if (isTransitioning) return;
                    isTransitioning = true;
                    currentIndex = i;
                    updateTestimonial(true);
                    setTimeout(() => { isTransitioning = false; }, 500);
                });
                dotsContainer.appendChild(dot);
            });

            currentIndex = 0;
            updateTestimonial(false);
            if (!prefersReducedMotion) startAutoPlay();
        }

        function getTestimonialOffset() {
            const cards = testimonialGrid.querySelectorAll('.testimonial-card');
            if (cards.length < 2) return testimonialWrap.offsetWidth || 300;
            const r0 = cards[0].getBoundingClientRect();
            const r1 = cards[1].getBoundingClientRect();
            return Math.max(r1.left - r0.left, testimonialWrap.offsetWidth || 300);
        }

        function updateTestimonial(animate) {
            const offset = getTestimonialOffset();
            testimonialGrid.style.transition = animate ? 'transform 0.4s ease' : 'none';
            testimonialGrid.style.transform = `translateX(-${currentIndex * offset}px)`;
            if (!animate) void testimonialGrid.offsetHeight;

            const dots = dotsContainer.querySelectorAll('button');
            dots.forEach((d, i) => d.classList.toggle('active', i === currentIndex));
        }

        function nextTestimonial() {
            const cards = testimonialGrid.querySelectorAll('.testimonial-card');
            if (isTransitioning || !cards.length) return;
            isTransitioning = true;
            currentIndex = (currentIndex + 1) % cards.length;
            updateTestimonial(true);
            setTimeout(() => { isTransitioning = false; }, 500);
        }

        function prevTestimonial() {
            const cards = testimonialGrid.querySelectorAll('.testimonial-card');
            if (isTransitioning || !cards.length) return;
            isTransitioning = true;
            currentIndex = (currentIndex - 1 + cards.length) % cards.length;
            updateTestimonial(true);
            setTimeout(() => { isTransitioning = false; }, 500);
        }

        function startAutoPlay() { stopAutoPlay(); autoPlayTimer = setInterval(nextTestimonial, autoPlayDelay); }
        function stopAutoPlay() { if (autoPlayTimer) { clearInterval(autoPlayTimer); autoPlayTimer = null; } }

        prevBtn?.addEventListener('click', () => { stopAutoPlay(); prevTestimonial(); });
        nextBtn?.addEventListener('click', () => { stopAutoPlay(); nextTestimonial(); });

        // Touch swipe
        let touchStartX = 0;
        testimonialWrap.addEventListener('touchstart', e => {
            touchStartX = e.changedTouches[0].screenX;
        }, { passive: true });
        testimonialWrap.addEventListener('touchend', e => {
            const diff = touchStartX - e.changedTouches[0].screenX;
            if (Math.abs(diff) > 50) {
                stopAutoPlay();
                if (diff > 0) nextTestimonial();
                else prevTestimonial();
            }
        }, { passive: true });

        testimonialWrap.addEventListener('mouseenter', stopAutoPlay);
        testimonialWrap.addEventListener('mouseleave', () => { if (window.innerWidth <= 768 && !prefersReducedMotion) startAutoPlay(); });

        let tiResizeTimer;
        window.addEventListener('resize', () => {
            clearTimeout(tiResizeTimer);
            tiResizeTimer = setTimeout(initTestimonialCarousel, 200);
        });

        initTestimonialCarousel();
    }

    // ─── GALLERY FILTERS ───────────────────────────────────
    document.querySelectorAll('.gallery-filter').forEach(btn => {
        btn.addEventListener('click', () => {
            btn.parentElement.querySelectorAll('.gallery-filter').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            const grid = btn.closest('.gallery-section')?.querySelector('.gallery-grid');
            if (!grid) return;
            const filter = btn.dataset.filter;
            grid.querySelectorAll('.gallery-item').forEach(item => {
                item.classList.toggle('hidden', filter !== 'all' && item.dataset.type !== filter);
            });
        });
    });

    // ─── COURSES FILTER ─────────────────────────────────
    const coursesInput = document.querySelector('.courses-overview .filter-input');
    const coursesGrid = document.querySelector('.courses-grid');
    if (coursesInput && coursesGrid) {
        const cards = coursesGrid.querySelectorAll('.course-card');
        const tags = coursesInput.closest('.filter-bar')?.querySelectorAll('.filter-tag');
        let activeFilter = 'all';
        function filterCourses() {
            const q = coursesInput.value.toLowerCase().trim();
            cards.forEach(c => {
                const text = c.textContent?.toLowerCase() || '';
                const level = c.dataset.level || '';
                const match = (!q || text.includes(q)) && (activeFilter === 'all' || level === activeFilter);
                c.style.display = match ? '' : 'none';
            });
        }
        filterCourses();
        coursesInput.addEventListener('input', filterCourses);
        tags?.forEach(t => {
            t.addEventListener('click', () => {
                tags.forEach(x => x.classList.remove('active'));
                t.classList.add('active');
                activeFilter = t.dataset.filter;
                filterCourses();
            });
        });
    }

    // ─── BLOG FILTER ────────────────────────────────────
    const blogInput = document.querySelector('.blog-section .filter-input');
    const blogGrid = document.querySelector('.blog-grid');
    if (blogInput && blogGrid) {
        const cards = blogGrid.querySelectorAll('.blog-card');
        const tags = blogInput.closest('.filter-bar')?.querySelectorAll('.filter-tag');
        let activeFilter = new URLSearchParams(window.location.search).get('filter') || 'all';
        if (activeFilter !== 'all') {
            tags?.forEach(t => {
                t.classList.toggle('active', t.dataset.filter === activeFilter);
            });
        }
        function filterBlog() {
            const q = blogInput.value.toLowerCase().trim();
            cards.forEach(c => {
                const text = c.textContent?.toLowerCase() || '';
                const cat = c.dataset.category || '';
                const match = (!q || text.includes(q)) && (activeFilter === 'all' || cat === activeFilter);
                c.style.display = match ? '' : 'none';
            });
        }
        filterBlog();
        blogInput.addEventListener('input', filterBlog);
        tags?.forEach(t => {
            t.addEventListener('click', () => {
                tags.forEach(x => x.classList.remove('active'));
                t.classList.add('active');
                activeFilter = t.dataset.filter;
                filterBlog();
            });
        });
    }

    // ─── GALLERY SEARCH ─────────────────────────────────
    const galleryInput = document.querySelector('.gallery-section .filter-input');
    const galleryGrid = document.querySelector('.gallery-grid');
    if (galleryInput && galleryGrid) {
        const cards = galleryGrid.querySelectorAll('.gallery-item');
        function filterGallery() {
            const q = galleryInput.value.toLowerCase().trim();
            cards.forEach(c => {
                const text = c.textContent?.toLowerCase() || '';
                const keywords = (c.querySelector('.gallery-placeholder')?.dataset.keywords || '').toLowerCase();
                const hiddenByFilter = c.classList.contains('hidden');
                c.style.display = (!q || text.includes(q) || keywords.includes(q)) && !hiddenByFilter ? '' : 'none';
            });
        }
        galleryInput.addEventListener('input', filterGallery);
    }

    // ─── PAGE TRANSITIONS FALLBACK ─────────────────────────
    if (!('startViewTransition' in document)) {
        const overlay = document.createElement('div');
        overlay.className = 'page-transition-overlay';
        document.body.appendChild(overlay);

        document.querySelectorAll('a[href]').forEach(link => {
            const href = link.getAttribute('href');
            if (!href || href.startsWith('#') || href.startsWith('http') || href.startsWith('mailto:') || href.startsWith('tel:')) return;

            link.addEventListener('click', e => {
                if (e.metaKey || e.ctrlKey || e.shiftKey) return;
                e.preventDefault();
                overlay.classList.add('active');
                document.body.classList.add('page-transitioning');
                setTimeout(() => { window.location.href = href; }, 300);
            });
        });

        window.addEventListener('pageshow', () => {
            overlay?.classList.remove('active');
            document.body.classList.remove('page-transitioning');
        });
    }

});
