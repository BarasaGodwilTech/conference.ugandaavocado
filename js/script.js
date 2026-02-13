// Wait for the DOM to load
document.addEventListener('DOMContentLoaded', function() {

    // ============================================
    // 1. HERO SLIDER FUNCTIONALITY
    // ============================================
    function initHeroSlider() {
        const slides = document.querySelectorAll('.slide');
        const dotsContainer = document.querySelector('.slider-dots');
        const prevBtn = document.querySelector('.slider-prev');
        const nextBtn = document.querySelector('.slider-next');
        let currentSlide = 0;
        let slideInterval;

        // Create dots
        slides.forEach((_, index) => {
            const dot = document.createElement('span');
            dot.classList.add('dot');
            dot.addEventListener('click', () => goToSlide(index));
            dotsContainer.appendChild(dot);
        });

        const dots = document.querySelectorAll('.dot');

        function updateSlides() {
            slides.forEach((slide, index) => {
                slide.classList.toggle('active', index === currentSlide);
            });
            dots.forEach((dot, index) => {
                dot.classList.toggle('active', index === currentSlide);
            });
        }

        function goToSlide(index) {
            currentSlide = index;
            updateSlides();
        }

        function nextSlide() {
            currentSlide = (currentSlide + 1) % slides.length;
            updateSlides();
        }

        function prevSlide() {
            currentSlide = (currentSlide - 1 + slides.length) % slides.length;
            updateSlides();
        }

        // Auto-advance slides
        function startAutoSlide() {
            slideInterval = setInterval(nextSlide, 5000);
        }

        function stopAutoSlide() {
            clearInterval(slideInterval);
        }

        // Event listeners
        if (prevBtn) prevBtn.addEventListener('click', nextSlide);
        if (nextBtn) nextBtn.addEventListener('click', prevSlide);

        const heroSection = document.querySelector('.hero');
        heroSection.addEventListener('mouseenter', stopAutoSlide);
        heroSection.addEventListener('mouseleave', startAutoSlide);

        // Initialize
        updateSlides();
        startAutoSlide();
    }

    initHeroSlider();

    // ============================================
    // 2. POPULATE SPONSORSHIP DROPDOWN
    // ============================================
    const sponsorDropdown = document.getElementById('sponsor-dropdown');
    if (sponsorDropdown) {
        const sponsorItems = [
            'Sponsor - USD 500',
            'Partner - USD 300',
            'Delegate - USD 30',
        ];
        sponsorItems.forEach(item => {
            const li = document.createElement('li');
            li.innerHTML = `<a href="#sponsorship-details">${item}</a>`;
            sponsorDropdown.appendChild(li);
        });
    }

    // ============================================
    // 3. POPULATE FIELD TOUR DROPDOWN (4 items)
    // ============================================
    const fieldtourDropdown = document.getElementById('fieldtour-dropdown');
    if (fieldtourDropdown) {
        const tours = [
            'Visit Avocado Factory',
            'Visit Packaging House',
            'Visit Avocado Nursery',
            'Visit Avocado Farm'
        ];
        tours.forEach(tour => {
            const li = document.createElement('li');
            li.innerHTML = `<a href="#field-tour">${tour}</a>`;
            fieldtourDropdown.appendChild(li);
        });
    }

    // ============================================
    // 4. POPULATE PARTNERS MEGA MENU (4 categories)
    // ============================================
    const partnersDropdown = document.getElementById('partners-dropdown');
    if (partnersDropdown) {
        partnersDropdown.classList.add('mega-menu');
        
        const partnersData = {
            'Avocado Companies/Farms': ['Avocado Uganda Ltd', 'Hass Growers Co-op', 'SunRipe Estates', 'Green Gold Farms', 'Kakuzi PLC'],
            'NGOs/Development Partners': ['GIZ', 'USAID Uganda', 'Solidaridad', 'TechnoServe', 'World Vision'],
            'Research Institutions': ['KALRO', 'JKUAT', 'World Avocado Organization', 'CABI', 'University of Kampala'],
            'Agro Input Dealers': ['Syngenta', 'Bayer', 'Yara', 'Osho Chemicals', 'Elgon Uganda']
        };

        const gridDiv = document.createElement('div');
        gridDiv.className = 'grid';
        
        for (let [category, companies] of Object.entries(partnersData)) {
            const col = document.createElement('div');
            col.innerHTML = `<h4>${category}</h4>`;
            const ul = document.createElement('ul');
            companies.forEach(company => {
                ul.innerHTML += `<li><a href="#partners">${company}</a></li>`;
            });
            col.appendChild(ul);
            gridDiv.appendChild(col);
        }
        partnersDropdown.appendChild(gridDiv);
    }

    // ============================================
    // 5. POPULATE THEMATIC AREAS (From your image)
    // ============================================
    const thematicGrid = document.getElementById('thematic-grid');
    if (thematicGrid) {
        const thematicAreas = [
            { name: 'Quality & Safety', subtitle: 'Food Safety', icon: 'fa-shield-alt' },
            { name: 'Phytosanitary', subtitle: 'Food Safety', icon: 'fa-biohazard' },
            { name: 'Genetic Resources', subtitle: 'Food Safety', icon: 'fa-dna' },
            { name: 'Production & Productivity', subtitle: 'Food Safety', icon: 'fa-tractor' },
            { name: 'Supply Chain & Marketing', subtitle: 'Food Safety', icon: 'fa-truck' }
        ];

        thematicAreas.forEach(area => {
            const card = document.createElement('div');
            card.className = 'thematic-card';
            card.innerHTML = `
                <div class="thematic-icon">
                    <i class="fas ${area.icon}"></i>
                </div>
                <h3>${area.name}</h3>
                <p>${area.subtitle}</p>
            `;
            thematicGrid.appendChild(card);
        });
    }

    // ============================================
    // 6. POPULATE PRICING GRID (Sponsor, Partner, Delegate)
    // ============================================
    const pricingGrid = document.getElementById('pricing-grid');
    if (pricingGrid) {
        const packages = [
            {
                title: 'Sponsor',
                price: 'USD 500',
                period: '/package',
                features: [
                    'Keynote speaking slot',
                    'Premium 6x3 booth',
                    '5 delegate passes',
                    'Logo on all materials',
                    'Social media promotion'
                ],
                featured: true
            },
            {
                title: 'Partner',
                price: 'USD 300',
                period: '/package',
                features: [
                    'Standard 3x3 booth',
                    '3 delegate passes',
                    'Logo in program',
                    'Website listing',
                    'Networking access'
                ],
                featured: false
            },
            {
                title: 'Delegate',
                price: 'USD 30',
                period: '/person',
                features: [
                    'Full access to sessions',
                    'Lunch & refreshments',
                    'Conference kit',
                    'Networking access',
                    'Virtual attendance option'
                ],
                featured: false
            }
        ];

        packages.forEach(pkg => {
            const card = document.createElement('div');
            card.className = `pricing-card ${pkg.featured ? 'featured' : ''}`;
            
            let featuresList = '';
            pkg.features.forEach(f => {
                featuresList += `<li><i class="fas fa-check-circle"></i> ${f}</li>`;
            });

            card.innerHTML = `
                <h3>${pkg.title}</h3>
                <div class="price">${pkg.price}<small>${pkg.period}</small></div>
                <ul>${featuresList}</ul>
                <a href="#" class="btn btn-primary">Select Plan</a>
            `;
            pricingGrid.appendChild(card);
        });
    }

    // ============================================
    // 7. POPULATE FIELD TOUR GRID (4 cards)
    // ============================================
    const tourGrid = document.getElementById('tour-grid');
    if (tourGrid) {
        const tours = [
            { 
                name: 'Avocado Factory Tour', 
                desc: 'See processing, cold storage, and value addition in action at Uganda\'s largest avocado processing facility.',
                img: 'https://worldbusinessjournal.com/wp-content/uploads/2025/11/MG_7890-scaled.jpg?w=600',
                duration: 'Half Day'
            },
            { 
                name: 'Packaging House Visit', 
                desc: 'Modern grading, sorting, and packaging technologies for export-ready avocados.',
                img: 'https://israelagri.com/wp-content/uploads/2022/07/granot3.jpg?w=600',
                duration: '3 Hours'
            },
            { 
                name: 'Avocado Nursery', 
                desc: 'Learn about certified grafting, tissue culture, and high-quality seedling production.',
                img: 'https://www.awanursery.co.nz/wp-content/uploads/Avocado-Hass-Jan-2019.jpg?w=600',
                duration: '2 Hours'
            },
            { 
                name: 'Commercial Farm', 
                desc: 'Best practices in orchard management, irrigation, and sustainable farming.',
                img: 'https://www.monitor.co.ug/resource/image/4267190/landscape_ratio3x2/1200/800/e901b48f991ccaa014b4897781878205/PQ/prosper003pixx.jpg?w=600',
                duration: 'Full Day'
            }
        ];

        tours.forEach(tour => {
            const card = document.createElement('div');
            card.className = 'tour-card';
            card.innerHTML = `
                <img src="${tour.img}" alt="${tour.name}" loading="lazy">
                <div class="content">
                    <h3>${tour.name}</h3>
                    <p>${tour.desc}</p>
                    <div class="tour-meta">
                        <span><i class="fas fa-clock"></i> ${tour.duration}</span>
                    </div>
                    <a href="#" class="btn btn-primary btn-sm">Book Tour</a>
                </div>
            `;
            tourGrid.appendChild(card);
        });
    }

    // ============================================
    // 8. POPULATE SPONSORS GRID (From your image)
    // ============================================
    /*const sponsorsGrid = document.getElementById('sponsors-grid');
    if (sponsorsGrid) {
        const sponsors = [
            'aevo', 'FELIX', 'Viveros BROKAW', 'dudutech', 'GEERLOFS', 'SGS'
        ];

        sponsors.forEach(sponsor => {
            const div = document.createElement('div');
            div.className = 'sponsor-item';
            div.innerHTML = `<span class="sponsor-name">${sponsor}</span>`;
            sponsorsGrid.appendChild(div);
        });
    }*/

        
   // ============================================
// 8. POPULATE SPONSORS GRID (Clean scrolling logos)
// ============================================
const sponsorsGrid = document.getElementById('sponsors-grid');
if (sponsorsGrid) {
    const sponsors = [
        { name: 'aevo', logo: 'WillsGuyLogo.png', url: 'https://willstech.store' },
        { name: 'FELIX', logo: 'WillsGuyLogo.png', url: 'https://willstech.store' },
        { name: 'Viveros BROKAW', logo: 'WillsGuyLogo.png', url: 'https://willstech.store' },
        { name: 'dudutech', logo: 'WillsGuyLogo.png', url: 'https://willstech.store' },
        { name: 'GEERLOFS', logo: 'WillsGuyLogo.png', url: 'https://willstech.store' },
        { name: 'SGS', logo: 'WillsGuyLogo.png', url: 'https://willstech.store' }
    ];

    // Clear everything
    sponsorsGrid.innerHTML = '';
    sponsorsGrid.style.cssText = 'width: 100%; overflow: hidden; background: linear-gradient(90deg, #f8f9fa, #e9ecef); padding: 30px 0;';
    
    // Create container
    const container = document.createElement('div');
    container.style.cssText = 'display: flex; gap: 50px; width: fit-content; animation: scrollLogos 25s linear infinite;';
    
    // Add items twice for seamless loop
    [...sponsors, ...sponsors].forEach(sponsor => {
        const item = document.createElement('div');
        item.style.cssText = 'flex: 0 0 auto; width: 140px; height: 80px; display: flex; align-items: center; justify-content: center;';
        
        const link = document.createElement('a');
        link.href = sponsor.url;
        link.target = '_blank';
        link.style.cssText = 'display: flex; align-items: center; justify-content: center; width: 100%; height: 100%;';
        
        const img = document.createElement('img');
        img.src = `images/sponsors/${sponsor.logo}`;
        img.alt = sponsor.name;
        img.style.cssText = 'max-width: 100%; max-height: 100%; object-fit: contain; filter: brightness(1); transition: filter 0.3s;';
        
        img.onerror = function() {
            this.outerHTML = `<span style="font-weight: 600; color: #495057;">${sponsor.name}</span>`;
        };
        
        img.onmouseenter = function() { this.style.filter = 'brightness(1.2)'; };
        img.onmouseleave = function() { this.style.filter = 'brightness(1)'; };
        
        link.appendChild(img);
        item.appendChild(link);
        container.appendChild(item);
    });
    
    sponsorsGrid.appendChild(container);
}

    // ============================================
    // 9. POPULATE PARTNERS GRID (4 categories)
    // ============================================
    const partnersGrid = document.getElementById('partners-grid');
    if (partnersGrid) {
        const partnersData = {
            'Avocado Companies/Farms': ['Avocado Uganda Ltd', 'Hass Growers Co-op', 'SunRipe Estates', 'Green Gold Farms', 'Kakuzi PLC', 'Jetro Holdings'],
            'NGOs/Development Partners': ['GIZ', 'USAID Uganda', 'Solidaridad', 'TechnoServe', 'World Vision', 'SNV Netherlands'],
            'Research Institutions': ['KALRO', 'JKUAT', 'World Avocado Organization', 'CABI', 'University of Kampala', 'ICIPE'],
            'Agro Input Dealers': ['Syngenta', 'Bayer', 'Yara', 'Osho Chemicals', 'Elgon Uganda', 'Amiran Uganda']
        };

        for (let [category, companies] of Object.entries(partnersData)) {
            const div = document.createElement('div');
            div.className = 'partner-category';
            let listItems = '';
            companies.slice(0, 5).forEach(company => {
                listItems += `<li><i class="fas fa-building"></i> ${company}</li>`;
            });
            div.innerHTML = `
                <h3>${category}</h3>
                <ul>${listItems}</ul>
                <a href="#" class="view-all">View All →</a>
            `;
            partnersGrid.appendChild(div);
        }
    }

    // ============================================
    // 10. POPULATE AWARDS GRID
    // ============================================
    const awardsGrid = document.getElementById('awards-grid');
    if (awardsGrid) {
        const awards = [
            { name: 'Best Exporter', icon: 'fa-ship', description: 'Outstanding export performance' },
            { name: 'Sustainable Farmer', icon: 'fa-leaf', description: 'Excellence in sustainable practices' },
            { name: 'Agri-Tech Innovator', icon: 'fa-microchip', description: 'Innovation in avocado technology' },
            { name: 'Emerging Grower', icon: 'fa-seedling', description: 'Rising star in avocado farming' },
            { name: 'Community Impact', icon: 'fa-heart', description: 'Positive community contribution' }
        ];

        awards.forEach(award => {
            const card = document.createElement('div');
            card.className = 'award-card';
            card.innerHTML = `
                <i class="fas ${award.icon}"></i>
                <h3>${award.name}</h3>
                <p>${award.description}</p>
            `;
            awardsGrid.appendChild(card);
        });
    }

    // ============================================
    // 11. MOBILE HAMBURGER MENU
    // ============================================
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('nav-menu');
    
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            hamburger.classList.toggle('active');
        });
    }

    // ============================================
    // 12. SMOOTH SCROLLING
    // ============================================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ 
                    behavior: 'smooth',
                    block: 'start'
                });
                // Close mobile menu if open
                if (navMenu) navMenu.classList.remove('active');
            }
        });
    });

    // ============================================
    // 13. REGISTRATION TABS INTERACTION
    // ============================================
    const tabs = document.querySelectorAll('.tab');
    tabs.forEach(tab => {
        tab.addEventListener('click', function() {
            tabs.forEach(t => t.classList.remove('active'));
            this.classList.add('active');
            
            // Here you could load different pricing or registration options
            console.log('Tab clicked:', this.dataset.tab);
        });
    });

    // ============================================
    // 14. NAVBAR SCROLL EFFECT
    // ============================================
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            navbar.style.background = 'rgba(255,255,255,0.98)';
            navbar.style.boxShadow = '0 2px 20px rgba(0,0,0,0.1)';
        } else {
            navbar.style.background = 'rgba(255,255,255,0.95)';
            navbar.style.boxShadow = '0 2px 20px rgba(0,0,0,0.05)';
        }
    });
});