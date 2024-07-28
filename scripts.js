function toggleDarkMode() {
    document.body.classList.toggle('dark-mode');
    localStorage.setItem('dark-mode', document.body.classList.contains('dark-mode'));
}

let moodCounter = 0;
function toggleMood() {
    moodCounter++;
    if (moodCounter === 1) {
        document.body.classList.add('mood-blue-red');
        document.body.classList.remove('mood-glass');
    } else if (moodCounter === 2) {
        document.body.classList.add('mood-glass');
        document.body.classList.remove('mood-blue-red');
    } else {
        document.body.classList.remove('mood-blue-red');
        document.body.classList.remove('mood-glass');
        moodCounter = 0;
    }
}

function showSection(sectionId) {
    const sections = document.querySelectorAll('.section');
    sections.forEach(section => {
        if (section.id === sectionId) {
            section.classList.add('active-section');
            section.classList.remove('inactive-section');
        } else {
            section.classList.remove('active-section');
            section.classList.add('inactive-section');
        }
    });
}

// Smooth scroll to section
document.querySelectorAll('.navbar button').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Play background audio
window.onload = function() {
    const audio = document.getElementById('background-audio');
    audio.play();
    updateCounters();
    const darkMode = localStorage.getItem('dark-mode');
    if (darkMode === 'true') {
        document.body.classList.add('dark-mode');
    }
};

// Play click sound
function playClickSound() {
    const clickSound = document.getElementById('button-sound');
    clickSound.play();
}

// Dynamic Skills Progress Bars
const skills = {
    "Data Analysis": 90,
    "NLP": 85,
    "Machine Learning": 80,
    "Python": 75,
    "R": 70,
    "Project Management": 65
};

for (let skill in skills) {
    const skillElement = document.getElementById(skill.toLowerCase().replace(" ", "-"));
    if (skillElement) {
        skillElement.value = skills[skill];
    }
}

// Timeline initialization using Vis.js
const container = document.getElementById('timeline');
const items = new vis.DataSet([
    { id: 1, content: 'Phd in North African Studies', start: '2021-11-11' },
    { id: 2, content: 'Master of Translation and Literature', start: '2018-01-01', end: '2020-07-07' },
    { id: 3, content: 'Master of WL and Comparative Studies', start: '2020-06-01', end: '2021-07-31' },
    { id: 4, content: 'Translator for IAPTI and New Circle for Translators', start: '2023-01-01' }
]);
const options = {
    min: '2021-01-01',
    max: '2024-12-31',
    start: '2021-01-01',
    end: '2024-12-31',
};
const timeline = new vis.Timeline(container, items, options);

// Update progress bar on scroll
window.onscroll = function () {
    const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (winScroll / height) * 100;
    document.getElementById('progress-bar').style.width = scrolled + '%';
}

// Update counters
function updateCounters() {
    const yearsExperience = document.getElementById('yearsExperience');
    const projectsCompleted = document.getElementById('projectsCompleted');

    animateCounter(yearsExperience, 7); // Assume 7 years of experience
    animateCounter(projectsCompleted, 20); // Assume 20 projects completed
}

// Animate counter
function animateCounter(element, value) {
    let counter = 0;
    const interval = setInterval(() => {
        if (counter < value) {
            counter++;
            element.textContent = counter;
        } else {
            clearInterval(interval);
        }
    }, 50);
}

// Open modal
function openModal(modalId) {
    document.getElementById(modalId).style.display = "block";
}

// Close modal
function closeModal(modalId) {
    document.getElementById(modalId).style.display = "none";
}

// PWA Install Prompt
let deferredPrompt;
const installButton = document.getElementById('installButton');

window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault();
    deferredPrompt = e;
    installButton.style.display = 'block';
});

installButton.addEventListener('click', (e) => {
    deferredPrompt.prompt();
    deferredPrompt.userChoice.then((choiceResult) => {
        if (choiceResult.outcome === 'accepted') {
            console.log('User accepted the A2HS prompt');
        } else {
            console.log('User dismissed the A2HS prompt');
        }
        deferredPrompt = null;
        installButton.style.display = 'none';
    });
});

window.addEventListener('appinstalled', (evt) => {
    console.log('a2hs installed');
});

// Toggle FAQ
function toggleFAQ(id) {
    const faq = document.getElementById(id);
    faq.style.display = faq.style.display === 'block' ? 'none' : 'block';
}

// Toggle Language
function toggleLanguage() {
    const langButton = document.querySelector('.language-selector');
    if (langButton.textContent === 'EN') {
        langButton.textContent = 'FR';
        // Translate to French (example, you would need actual translation)
        document.querySelectorAll('.navbar button').forEach(btn => {
            if (btn.textContent === 'Summary') btn.textContent = 'Résumé';
            if (btn.textContent === 'Experience') btn.textContent = 'Expérience';
            if (btn.textContent === 'Education') btn.textContent = 'Éducation';
            if (btn.textContent === 'Skills') btn.textContent = 'Compétences';
            if (btn.textContent === 'Projects') btn.textContent = 'Projets';
            if (btn.textContent === 'Timeline') btn.textContent = 'Chronologie';
            if (btn.textContent === 'Testimonials') btn.textContent = 'Témoignages';
            if (btn.textContent === 'Contact') btn.textContent = 'Contact';
            if (btn.textContent === 'FAQ') btn.textContent = 'FAQ';
        });
        document.getElementById('contact').querySelector('h2').textContent = 'Contact';
        document.getElementById('faq').querySelector('h2').textContent = 'FAQ';
    } else {
        langButton.textContent = 'EN';
        // Translate to English
        document.querySelectorAll('.navbar button').forEach(btn => {
            if (btn.textContent === 'Résumé') btn.textContent = 'Summary';
            if (btn.textContent === 'Expérience') btn.textContent = 'Experience';
            if (btn.textContent === 'Éducation') btn.textContent = 'Education';
            if (btn.textContent === 'Compétences') btn.textContent = 'Skills';
            if (btn.textContent === 'Projets') btn.textContent = 'Projects';
            if (btn.textContent === 'Chronologie') btn.textContent = 'Timeline';
            if (btn.textContent === 'Témoignages') btn.textContent = 'Testimonials';
            if (btn.textContent === 'Contact') btn.textContent = 'Contact';
            if (btn.textContent === 'FAQ') btn.textContent = 'FAQ';
        });
        document.getElementById('contact').querySelector('h2').textContent = 'Contact';
        document.getElementById('faq').querySelector('h2').textContent = 'FAQ';
    }
}

// Chatbot Functionality
function sendMessage() {
    const messageInput = document.getElementById('chatbotInput');
    const message = messageInput.value;
    if (message.trim() !== '') {
        const chatbotMessages = document.getElementById('chatbotMessages');
        const messageElement = document.createElement('div');
        messageElement.textContent = 'You: ' + message;
        chatbotMessages.appendChild(messageElement);
        messageInput.value = '';

        // Simulate a response from the chatbot
        setTimeout(() => {
            const responseElement = document.createElement('div');
            responseElement.textContent = 'Chatbot: ' + 'Thank you for your message! I will get back to you soon.';
            chatbotMessages.appendChild(responseElement);
        }, 1000);
    }
}

// Initialize 3D Model
function initThreeJS() {
    const container = document.getElementById('three-js-container');
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, container.clientWidth / container.clientHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(container.clientWidth, container.clientHeight);
    container.appendChild(renderer.domElement);

    const geometry = new THREE.BoxGeometry();
    const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
    const cube = new THREE.Mesh(geometry, material);
    scene.add(cube);

    camera.position.z = 5;

    function animate() {
        requestAnimationFrame(animate);
        cube.rotation.x += 0.01;
        cube.rotation.y += 0.01;
        renderer.render(scene, camera);
    }
    animate();
}

initThreeJS();

// Initialize 3D Text Animation
function init3DTextAnimation() {
    const container = document.getElementById('text-animation-container');
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    container.appendChild(renderer.domElement);

    const loader = new THREE.FontLoader();
    loader.load('https://threejs.org/examples/fonts/helvetiker_regular.typeface.json', function (font) {
        const textGeometry1 = new THREE.TextGeometry('Gibran', {
            font: font,
            size: 80,
            height: 5,
            curveSegments: 12,
            bevelEnabled: true,
            bevelThickness: 10,
            bevelSize: 8,
            bevelOffset: 0,
            bevelSegments: 5
        });
        const textMaterial1 = new THREE.MeshPhongMaterial({ color: 0x0000ff, shininess: 100 });
        const textMesh1 = new THREE.Mesh(textGeometry1, textMaterial1);
        scene.add(textMesh1);

        const textGeometry2 = new THREE.TextGeometry('BANHAKEIA', {
            font: font,
            size: 80,
            height: 5,
            curveSegments: 12,
            bevelEnabled: true,
            bevelThickness: 10,
            bevelSize: 8,
            bevelOffset: 0,
            bevelSegments: 5
        });
        const textMaterial2 = new THREE.MeshPhongMaterial({ color: 0xff1493, shininess: 100 });
        const textMesh2 = new THREE.Mesh(textGeometry2, textMaterial2);
        scene.add(textMesh2);

        textMesh1.position.x = -500;
        textMesh1.position.y = 50;
        textMesh2.position.x = -150;
        textMesh2.position.y = 50;

        const ambientLight = new THREE.AmbientLight(0x404040);
        scene.add(ambientLight);

        const pointLight = new THREE.PointLight(0xffffff, 1, 1000);
        pointLight.position.set(50, 50, 50);
        scene.add(pointLight);

        let clock = new THREE.Clock();
        function animate() {
            requestAnimationFrame(animate);

            let time = clock.getElapsedTime();
            textMesh1.position.y = 50 + Math.sin(time) * 200;
            textMesh2.position.y = 50 + Math.sin(time + Math.PI) * 200;

            renderer.render(scene, camera);
        }
        animate();
    });

    camera.position.z = 1000;

    window.addEventListener('resize', () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    });
}

init3DTextAnimation();

// Initialize Pie Charts
const ctx = document.getElementById('competencePieChart').getContext('2d');
const competencePieChart = new Chart(ctx, {
    type: 'pie',
    data: {
        labels: ['Translation Studies', 'Proofreading', 'HTML Developing', 'Multi-tasks', 'Team-spirit', 'Project Management'],
        datasets: [{
            data: [90, 85, 80, 75, 70, 65],
            backgroundColor: [
                '#007bff',
                '#28a745',
                '#dc3545',
                '#ffc107',
                '#17a2b8',
                '#6f42c1'
            ],
            borderWidth: 1
        }]
    },
    options: {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
                labels: {
                    fontSize: 14
                }
            },
            tooltip: {
                callbacks: {
                    label: function(tooltipItem) {
                        return tooltipItem.label + ': ' + tooltipItem.raw + '%';
                    }
                }
            }
        }
    }
});

const softwareCtx = document.getElementById('softwarePieChart').getContext('2d');
const softwarePieChart = new Chart(softwareCtx, {
    type: 'pie',
    data: {
        labels: ['Crowdin', 'Trados', 'VR Translate', 'MemoQ', 'Wordfast', 'Transifex'],
        datasets: [{
            data: [90, 90, 90, 90, 90, 90],
            backgroundColor: [
                '#ff6384',
                '#36a2eb',
                '#cc65fe',
                '#ffce56',
                '#ff9f40',
                '#4bc0c0'
            ],
            borderWidth: 1
        }]
    },
    options: {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
                labels: {
                    fontSize: 14
                }
            },
            tooltip: {
                callbacks: {
                    label: function(tooltipItem) {
                        return tooltipItem.label + ': ' + tooltipItem.raw + '%';
                    }
                }
            }
        }
    }
});

const certificatesCtx = document.getElementById('certificatesPieChart').getContext('2d');
const certificatesPieChart = new Chart(certificatesCtx, {
    type: 'pie',
    data: {
        labels: [
            'Homeland Security and Cybersecurity Future, University of Boulder Colorado',
            'International Security Management (Specialization) Rotterdam Erasmus University',
            'Terrorism and Counterterrorism, Leiden University, by Edwin Bakker',
            'Cybersecurity Roles, Processes & Operating System Security',
            'Introduction to Cybersecurity Tools & Cyber Attacks',
            'Inglés Empresarial: Gestión y Liderazgo Inglés Empresarial',
            'CISSP® - Certified Information Systems Security Professional',
            'Cert Prep: ISC2 Certified in Cybersecurity (CC)',
            'FullBridge X Communication Skills and Teamwork, EDX, Honor',
            'Verified Certificate - Ancient Masterpieces of World Literature - HARVARD UNIVERSITY'
        ],
        datasets: [{
            data: [90, 90, 90, 90, 90, 90, 90, 90, 90, 90],
            backgroundColor: [
                '#e6194b',
                '#3cb44b',
                '#ffe119',
                '#4363d8',
                '#f58231',
                '#911eb4',
                '#46f0f0',
                '#f032e6',
                '#bcf60c',
                '#fabebe'
            ],
            borderWidth: 1
        }]
    },
    options: {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
                labels: {
                    fontSize: 14
                }
            },
            tooltip: {
                callbacks: {
                    label: function(tooltipItem) {
                        return tooltipItem.label + ': ' + tooltipItem.raw + '%';
                    }
                }
            }
        }
    }
});

// Initialize Particles.js
particlesJS('particles-js', {
    particles: {
        number: {
            value: 80,
            density: {
                enable: true,
                value_area: 200
            }
        },
        color: {
            value: '#ffffff'
        },
        shape: {
            type: 'circle',
            stroke: {
                width: 0,
                color: '#000000'
            },
            polygon: {
                nb_sides: 5
            }
        },
        opacity: {
            value: 0.5,
            random: false,
            anim: {
                enable: false,
                speed: 1,
                opacity_min: 0.1,
                sync: false
            }
        },
        size: {
            value: 5,
            random: true,
            anim: {
                enable: false,
                speed: 40,
                size_min: 0.1,
                sync: false
            }
        },
        line_linked: {
            enable: true,
            distance: 150,
            color: '#ffffff',
            opacity: 0.4,
            width: 1
        },
        move: {
            enable: true,
            speed: 2,
            direction: 'none',
            random: false,
            straight: false,
            out_mode: 'out',
            bounce: false,
            attract: {
                enable: false,
                rotateX: 600,
                rotateY: 1200
            }
        }
    },
    interactivity: {
        detect_on: 'canvas',
        events: {
            onhover: {
                enable: true,
                mode: 'repulse'
            },
            onclick: {
                enable: true,
                mode: 'push'
            },
            resize: true
        },
        modes: {
            grab: {
                distance: 400,
                line_linked: {
                    opacity: 1
                }
            },
            bubble: {
                distance: 400,
                size: 40,
                duration: 2,
                opacity: 8,
                speed: 3
            },
            repulse: {
                distance: 200,
                duration: 0.4
            },
            push: {
                particles_nb: 4
            },
            remove: {
                particles_nb: 2
            }
        }
    },
    retina_detect: true
});
