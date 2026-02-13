// Wait for the DOM to load
document.addEventListener('DOMContentLoaded', function() {

    // --- 1. POPULATE SPONSORSHIP DROPDOWN ---
    const sponsorDropdown = document.getElementById('sponsor-dropdown');
    if (sponsorDropdown) {
        const sponsorItems = ['Platinum Sponsor', 'Gold Sponsor', 'Silver Sponsor', 'Bronze Sponsor'];
        sponsorItems.forEach(item => {
            const li = document.createElement('li');
            li.innerHTML = `<a href="#sponsorship-details" data-package="${item}">${item}</a>`;
            sponsorDropdown.appendChild(li);
        });
    }

    // --- 2. POPULATE FIELD TOUR DROPDOWN (4 items) ---
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

    // --- 3. POPULATE PARTNERS MEGA MENU (4 categories) ---
    const partnersDropdown = document.getElementById('partners-dropdown');
    if (partnersDropdown) {
        partnersDropdown.classList.add('mega-menu');
        
        const partnersData = {
            'Avocado Companies/Farms': ['Avocado Kenya Ltd', 'Hass Growers Co-op', 'SunRipe Estates', 'Green Gold Farms'],
            'NGOs/Development Partners': ['GIZ', 'USAID Kenya', 'Solidaridad', 'TechnoServe'],
            'Research': ['KALRO', 'Jomo Kenyatta University', 'World Avocado Organization', 'CABI'],
            'Agro Input Dealers': ['Syngenta', 'Bayer', 'Yara', 'Osho Chemicals']
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

    // --- 4. POPULATE PRICING GRID (Sponsor, Partner, Delegate) ---
    const pricingGrid = document.getElementById('pricing-grid');
    if (pricingGrid) {
        const packages = [
            {
                title: 'Sponsor',
                price: 'KSh 500,000',
                period: '/package',
                features: ['Keynote speaking slot', '10x10 booth', '5 delegate passes', 'Logo on all materials']
            },
            {
                title: 'Partner',
                price: 'KSh 250,000',
                period: '/package',
                features: ['Exhibition booth', '3 delegate passes', 'Logo in program', 'Website listing']
            },
            {
                title: 'Delegate',
                price: 'KSh 15,000',
                period: '/person',
                features: ['Full access to sessions', 'Lunch & refreshments', 'Conference kit', 'Networking access']
            }
        ];

        packages.forEach(pkg => {
            const card = document.createElement('div');
            card.className = 'pricing-card';
            
            let featuresList = '';
            pkg.features.forEach(f => {
                featuresList += `<li><i class="fas fa-check"></i> ${f}</li>`;
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

    // --- 5. POPULATE FIELD TOUR GRID (4 cards with images) ---
    const tourGrid = document.getElementById('tour-grid');
    if (tourGrid) {
        const tours = [
            { name: 'Avocado Factory Tour', desc: 'See processing and value addition in action.', img: 'https://images.unsplash.com/photo-1584968173934-bc7eacb78008?w=600' },
            { name: 'Packaging House Visit', desc: 'Modern grading and packing technologies.', img: 'https://images.unsplash.com/photo-1607457561901-e6ec3a6d16cf?w=600' },
            { name: 'Avocado Nursery', desc: 'Learn about certified grafting and seedlings.', img: 'https://images.unsplash.com/photo-1595261318317-3ce985c1e967?w=600' },
            { name: 'Commercial Farm', desc: 'Best practices in orchard management.', img: 'https://images.unsplash.com/photo-1520338661084-680395057c93?w=600' }
        ];

        tours.forEach(tour => {
            const card = document.createElement('div');
            card.className = 'tour-card';
            card.innerHTML = `
                <img src="${tour.img}" alt="${tour.name}">
                <div class="content">
                    <h3>${tour.name}</h3>
                    <p>${tour.desc}</p>
                    <a href="#" class="btn btn-secondary btn-sm">Book Tour</a>
                </div>
            `;
            tourGrid.appendChild(card);
        });
    }

    // --- 6. POPULATE PARTNERS GRID (Same 4 categories) ---
    const partnersGrid = document.getElementById('partners-grid');
    if (partnersGrid) {
        const partnersData = {
            'Avocado Companies/Farms': ['Avocado Kenya Ltd', 'Hass Growers Co-op', 'SunRipe Estates', 'Green Gold Farms', 'Fairtrade Africa'],
            'NGOs/Development Partners': ['GIZ', 'USAID Kenya', 'Solidaridad', 'TechnoServe', 'World Vision'],
            'Research Institutions': ['KALRO', 'JKUAT', 'World Avocado Organization', 'CABI', 'University of Nairobi'],
            'Agro Input Dealers': ['Syngenta', 'Bayer', 'Yara', 'Osho Chemicals', 'Elgon Kenya']
        };

        for (let [category, companies] of Object.entries(partnersData)) {
            const div = document.createElement('div');
            div.className = 'partner-category';
            let listItems = '';
            companies.forEach(company => {
                listItems += `<li><i class="fas fa-building"></i> ${company}</li>`;
            });
            div.innerHTML = `
                <h3>${category}</h3>
                <ul>${listItems}</ul>
            `;
            partnersGrid.appendChild(div);
        }
    }

    // --- 7. MOBILE HAMBURGER MENU TOGGLE ---
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('nav-menu');
    
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', function() {
            navMenu.classList.toggle('active');
        });
    }

    // --- 8. SMOOTH SCROLLING FOR NAVIGATION LINKS ---
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth' });
                // Close mobile menu if open
                if (navMenu) navMenu.classList.remove('active');
            }
        });
    });

    // --- 9. ACTIVE NAVIGATION HIGHLIGHT ---
    const sections = document.querySelectorAll('section[id]');
    window.addEventListener('scroll', function() {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (scrollY >= (sectionTop - 200)) {
                current = section.getAttribute('id');
            }
        });

        document.querySelectorAll('.nav-menu a').forEach(a => {
            a.classList.remove('active');
            if (a.getAttribute('href') === `#${current}`) {
                a.classList.add('active');
            }
        });
    });
});