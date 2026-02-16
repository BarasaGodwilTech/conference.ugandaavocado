// schema-conference.js - STRUCTURED DATA FOR CONFERENCE SITE
// Load this ONLY on conference site

(function() {
    'use strict';
    
    // ============================================
    // 1. EVENT SCHEMA (MAIN)
    // ============================================
    const eventSchema = {
        "@context": "https://schema.org",
        "@type": "Event",
        "@id": "https://conference.ugandaavocados.org/#event",
        "name": "1st Uganda Avocado Farmers Conference 2026",
        "description": "The largest gathering of avocado stakeholders in Uganda, bringing together farmers, exporters, investors, and industry experts from around the world.",
        "startDate": "2026-07-29T09:00:00+03:00",
        "endDate": "2026-07-31T18:00:00+03:00",
        "eventStatus": "https://schema.org/EventScheduled",
        "eventAttendanceMode": "https://schema.org/OfflineEventAttendanceMode",
        "location": {
            "@type": "Place",
            "name": "Uganda Industrial Research Institute",
            "address": {
                "@type": "PostalAddress",
                "streetAddress": "Plot 42A, Mukabya Road",
                "addressLocality": "Kampala",
                "addressRegion": "Central Region",
                "addressCountry": "UG"
            }
        },
        "image": "https://conference.ugandaavocados.org/images/event-poster.jpg",
        "organizer": {
            "@type": "Person",
            "name": "Richard Welishe",
            "jobTitle": "Conference Chair",
            "worksFor": {
                "@type": "Organization",
                "name": "Uganda Avocados",
                "url": "https://ugandaavocados.org"
            }
        },
        "sponsor": [
            {
                "@type": "Organization",
                "name": "AEVO"
            },
            {
                "@type": "Organization",
                "name": "FELIX"
            }
        ],
        "offers": {
            "@type": "Offer",
            "name": "Early Bird Registration",
            "price": "30",
            "priceCurrency": "USD",
            "availability": "https://schema.org/InStock",
            "url": "https://conference.ugandaavocados.org/register",
            "validFrom": "2026-01-01",
            "validThrough": "2026-03-31"
        },
        "maximumAttendeeCapacity": 5000,
        "remainingAttendeeCapacity": 3500
    };

    // ============================================
    // 2. PERSON SCHEMA - RICHARD WELISHE (Organizer)
    // ============================================
    const organizerSchema = {
        "@context": "https://schema.org",
        "@type": "Person",
        "name": "Richard Welishe",
        "jobTitle": "Conference Chair & Founder",
        "worksFor": {
            "@type": "Organization",
            "name": "Uganda Avocados"
        },
        "email": "richard@ugandaavocados.org",
        "telephone": "+256774092470"
    };

    // ============================================
    // 3. PERSON SCHEMA - BARASA GODWIL (Developer)
    // ============================================
    const developerSchema = {
        "@context": "https://schema.org",
        "@type": "Person",
        "name": "barasa godwil",
        "jobTitle": "Conference Website Developer",
        "worksFor": {
            "@type": "Organization",
            "name": "barasagodwilTechnologies",
            "url": "https://barasagodwil.tech"
        },
        "email": "dev@barasagodwil.tech"
    };

    // ============================================
    // 4. CONFERENCE FAQ SCHEMA
    // ============================================
    const faqSchema = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": [
            {
                "@type": "Question",
                "name": "When is the 1st Uganda Avocado Conference?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "The conference will be held from July 29-31, 2026 at the Uganda Industrial Research Institute in Kampala."
                }
            },
            {
                "@type": "Question",
                "name": "Who is organizing the conference?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "The conference is organized by Richard Welishe and the Uganda Avocados association."
                }
            },
            {
                "@type": "Question",
                "name": "How can I register for the conference?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Registration is available at conference.ugandaavocados.org/register. Early bird rates are available until March 2026."
                }
            },
            {
                "@type": "Question",
                "name": "Who developed the conference website?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "The conference website was developed by barasa godwil Technologies (barasagodwil.tech)."
                }
            }
        ]
    };

    // ============================================
    // 5. BREADCRUMB SCHEMA
    // ============================================
    const breadcrumbSchema = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": [
            {
                "@type": "ListItem",
                "position": 1,
                "name": "Home",
                "item": "https://conference.ugandaavocados.org/"
            },
            {
                "@type": "ListItem",
                "position": 2,
                "name": "Register",
                "item": "https://conference.ugandaavocados.org/register"
            },
            {
                "@type": "ListItem",
                "position": 3,
                "name": "Program",
                "item": "https://conference.ugandaavocados.org/program"
            }
        ]
    };

    // ============================================
    // ADD ALL SCHEMAS TO PAGE
    // ============================================
    const schemas = [
        eventSchema,
        organizerSchema,
        developerSchema,
        faqSchema,
        breadcrumbSchema
    ];

    schemas.forEach(schema => {
        const script = document.createElement('script');
        script.type = 'application/ld+json';
        script.text = JSON.stringify(schema, null, 2);
        document.head.appendChild(script);
    });

    console.log("✅ Conference site structured data added (5 schemas)");
    console.log("📊 Includes: Event, Richard Welishe, barasa godwil, FAQ, Breadcrumb");
})();
