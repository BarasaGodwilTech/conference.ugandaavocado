// Conference Data from Documents
const conferenceData = {
    // Theme from "Theme of the Avocado conference.docx"
    theme: "Advancing Uganda's Avocado Sector for Sustainable Growth",
    
    // Conference details
    conference: {
        name: "1st Uganda Avocado Farmers Conference",
        date: "29th - 31st July 2026",
        venue: "Uganda Industrial Research Institute, Kampala",
        edition: "1st Edition",
        expectedAttendees: "500+",
        expectedExhibitors: "50+",
        expectedCountries: "17+"
    },

    // Thematic Areas from "Avocado conference thematic Areas.docx"
    thematicAreas: [
        {
            title: "Sustainable Orchard Productivity and Climate-Resilient Production",
            shortTitle: "Sustainable Production",
            icon: "fa-seedling",
            description: "Soil fertility, GAP, pest & disease management, climate-smart agriculture",
            strategicObjective: "Increase national avocado productivity, reduce losses, and ensure compliance with phytosanitary and environmental standards"
        },
        {
            title: "Quality Planting Materials and Certified Seed Systems",
            shortTitle: "Quality Planting Materials",
            icon: "fa-tree",
            description: "Seedlings & nursery regulation, certified disease-free seedlings",
            strategicObjective: "Build a strong genetic and production foundation for uniformity, high yields, and export competitiveness"
        },
        {
            title: "Quality Assurance, Harvest Management and Standards Compliance",
            shortTitle: "Quality Assurance",
            icon: "fa-clipboard-check",
            description: "Maturity index, dry matter content, post-harvest handling, traceability",
            strategicObjective: "Position Uganda as a reliable supplier of high-quality avocados for regional and global markets"
        },
        {
            title: "Structured Markets, Aggregation and Collective Marketing Systems",
            shortTitle: "Market Access",
            icon: "fa-handshake",
            description: "Farmer organizations, aggregation centers, cooperatives, digital traceability",
            strategicObjective: "Enhance farmer incomes through organized supply chains and sustainable market linkages"
        },
        {
            title: "Agricultural Finance, Insurance and Investment Mobilization",
            shortTitle: "Finance & Investment",
            icon: "fa-chart-line",
            description: "Agro-insurance, sector financing, blended financing models",
            strategicObjective: "Promote access to affordable finance, insurance, and private sector investment"
        }
    ],

    // Awards data from "Avocado Awards 2025.docx"
    awards: {
        expectations: [
            {
                title: "Promote Excellence and Best Practices",
                description: "Recognize outstanding farmers, nursery operators, exporters, aggregators, processors, and innovators",
                impact: "Encourage adoption of Good Agricultural Practices (GAP), compliance with standards, and sector professionalism"
            },
            {
                title: "Motivate Farmers and Youth Participation",
                description: "Celebrate success stories to inspire more farmers, youth, and women",
                impact: "Increased participation in structured and export-oriented avocado farming"
            },
            {
                title: "Strengthen Quality and Standards Compliance",
                description: "Reward actors who meet dry matter standards, export quality requirements, and traceability systems",
                impact: "Position Uganda as a reliable supplier of high-quality avocados"
            },
            {
                title: "Promote Innovation and Technology Adoption",
                description: "Recognize innovation in irrigation, pest management, post-harvest handling, aggregation systems, and processing",
                impact: "Accelerated modernization and competitiveness of the avocado value chain"
            },
            {
                title: "Enhance Sector Coordination and Visibility",
                description: "Provide a national platform bringing together farmers, investors, policymakers, and development partners",
                impact: "Stronger collaboration, policy support, and investment confidence"
            },
            {
                title: "Build a National Avocado Brand",
                description: "Use the awards to elevate the image of Uganda's avocado industry",
                impact: "Improved branding, market trust, and export growth"
            }
        ],
        categories: [
            { name: "Best Farmer", icon: "fa-trophy", description: "Outstanding achievement in avocado farming" },
            { name: "Best Nursery Operator", icon: "fa-seedling", description: "Excellence in quality seedling production" },
            { name: "Best Exporter", icon: "fa-ship", description: "Exceptional export performance and quality" },
            { name: "Best Aggregator", icon: "fa-people-arrows", description: "Excellence in farmer aggregation and coordination" },
            { name: "Best Processor", icon: "fa-industry", description: "Innovation in value addition and processing" },
            { name: "Innovation Award", icon: "fa-microchip", description: "Cutting-edge technology and innovation" }
        ]
    },

    // Why Attend data from "Expections for attendance Conference.docx"
    whyAttend: {
        farmers: {
            title: "Farmers",
            icon: "fa-user-friends",
            expectations: [
                "Gain practical knowledge on soil fertility, GAP, pest and disease management",
                "Understand proper harvesting techniques, dry matter testing, and quality standards",
                "Access information on certified seedlings and recommended varieties",
                "Connect directly with exporters, aggregators, and buyers",
                "Learn about agricultural insurance and financing opportunities",
                "Join or strengthen farmer groups for collective marketing",
                "Align with the National Avocado Roadmap and government programs"
            ],
            outcome: "Improved productivity, better prices, reduced losses, and stronger market linkages"
        },
        investors: {
            title: "Machinery & Technology Investors",
            icon: "fa-industry",
            expectations: [
                "Showcase irrigation systems, dry matter testing equipment, grading and sorting machines",
                "Present post-harvest handling and cold chain solutions",
                "Demonstrate processing technologies (oil extraction, value addition equipment)",
                "Identify distribution partners and large-scale buyers",
                "Engage directly with organized farmer groups and cooperatives",
                "Explore investment opportunities within Uganda's expanding avocado sector"
            ],
            outcome: "Market expansion, strategic partnerships, and long-term sector growth opportunities"
        }
    },

    // Partners data (expanded from dropdown)
    partners: {
        companies: [
            "Avocado Uganda Ltd", "Hass Growers Co-op", "SunRipe Estates", 
            "Green Gold Farms", "Kakuzi PLC", "Jetro Holdings"
        ],
        ngos: [
            "GIZ", "USAID Uganda", "Solidaridad", "TechnoServe", 
            "World Vision", "SNV Netherlands"
        ],
        research: [
            "KALRO", "JKUAT", "World Avocado Organization", "CABI", 
            "University of Kampala", "ICIPE"
        ],
        inputDealers: [
            "Syngenta", "Bayer", "Yara", "Osho Chemicals", 
            "Elgon Uganda", "Amiran Uganda"
        ]
    },

    // Field tours
    fieldTours: [
        {
            name: "Avocado Factory Tour",
            description: "See processing, cold storage, and value addition in action at Uganda's largest avocado processing facility.",
            image: "https://worldbusinessjournal.com/wp-content/uploads/2025/11/MG_7890-scaled.jpg?w=600",
            duration: "Half Day",
            icon: "fa-industry"
        },
        {
            name: "Packaging House Visit",
            description: "Modern grading, sorting, and packaging technologies for export-ready avocados.",
            image: "https://israelagri.com/wp-content/uploads/2022/07/granot3.jpg?w=600",
            duration: "3 Hours",
            icon: "fa-box-open"
        },
        {
            name: "Avocado Nursery",
            description: "Learn about certified grafting, tissue culture, and high-quality seedling production.",
            image: "https://www.awanursery.co.nz/wp-content/uploads/Avocado-Hass-Jan-2019.jpg?w=600",
            duration: "2 Hours",
            icon: "fa-seedling"
        },
        {
            name: "Commercial Farm",
            description: "Best practices in orchard management, irrigation, and sustainable farming.",
            image: "https://www.monitor.co.ug/resource/image/4267190/landscape_ratio3x2/1200/800/e901b48f991ccaa014b4897781878205/PQ/prosper003pixx.jpg?w=600",
            duration: "Full Day",
            icon: "fa-tractor"
        }
    ],

    // Sponsorship packages
    sponsorshipPackages: [
        {
            title: "Sponsor",
            price: "USD 3000",
            period: "package",
            features: [
                "Keynote speaking slot",
                "Premium 6x3 booth",
                "5 delegate passes",
                "Logo on all materials",
                "Social media promotion",
                "B2B matchmaking access"
            ],
            featured: true
        },
        {
            title: "Partner",
            price: "USD 300 (UGX 1,100,000)",
            period: "package",
            features: [
                "Standard 3x3 booth",
                "3 delegate passes",
                "Logo in program",
                "Website listing",
                "Networking access",
                "Exhibition space"
            ],
            featured: false
        },
        {
            title: "Delegate",
            price: "USD 30 (UGX 110,000)",
            period: "person",
            features: [
                "Full access to sessions",
                "Lunch & refreshments",
                "Conference kit",
                "Networking access",
                "Virtual attendance option",
                "Certificate of participation"
            ],
            featured: false
        }
    ]
};