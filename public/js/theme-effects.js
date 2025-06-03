// 主题特效处理
const themeEffects = {
    particles: {
        apply: (container) => {
            container.parentElement.style.position = 'relative';
            const particlesDiv = document.createElement('div');
            particlesDiv.id = 'particles-js';
            particlesDiv.style.cssText = `
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                z-index: 1;
                pointer-events: none;
            `;
            container.parentElement.insertBefore(particlesDiv, container);
            container.style.position = 'relative';
            container.style.zIndex = '2';
            
            // 确保顶部菜单栏显示在粒子效果之上
            document.querySelector('.header').style.position = 'relative';
            document.querySelector('.header').style.zIndex = '10';

            window.currentParticlesInstance = particlesJS('particles-js', {
                particles: {
                    number: { value: 80, density: { enable: true, value_area: 800 } },
                    color: { value: '#4a90e2' },
                    shape: { type: 'circle' },
                    opacity: { value: 0.5, random: false },
                    size: { value: 3, random: true },
                    line_linked: { enable: true, distance: 150, color: '#4a90e2', opacity: 0.4, width: 1 },
                    move: { enable: true, speed: 6, direction: 'none', random: false, straight: false, out_mode: 'out', bounce: false }
                },
                interactivity: {
                    detect_on: 'canvas',
                    events: { onhover: { enable: true, mode: 'repulse' }, resize: true },
                    modes: { repulse: { distance: 100, duration: 0.4 } }
                },
                retina_detect: true
            });
        }
    },

    'deep-space': {
        apply: (container) => {
            container.style.background = '#000';
            container.style.color = '#fff';
            container.style.position = 'relative';
            container.style.overflow = 'hidden';
            container.style.zIndex = '1'; // 确保合适的层级
            
            // 确保顶部菜单栏显示在深空效果之上
            document.querySelector('.header').style.position = 'relative';
            document.querySelector('.header').style.zIndex = '10';
            
            const stars = document.createElement('div');
            stars.className = 'stars';
            stars.style.cssText = `
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                z-index: 1;
                pointer-events: none;
                background: radial-gradient(2px 2px at 20px 30px, #eee, rgba(0,0,0,0)),
                            radial-gradient(2px 2px at 40px 70px, #fff, rgba(0,0,0,0)),
                            radial-gradient(2px 2px at 50px 160px, #ddd, rgba(0,0,0,0)),
                            radial-gradient(2px 2px at 90px 40px, #fff, rgba(0,0,0,0)),
                            radial-gradient(2px 2px at 130px 80px, #fff, rgba(0,0,0,0));
                background-size: 200px 200px;
                animation: space 5s ease-in-out infinite;
            `;
            container.appendChild(stars);

            // 添加动画样式
            const style = document.createElement('style');
            style.textContent = `
                @keyframes space {
                    0% { transform: perspective(400px) rotateX(0deg); }
                    50% { transform: perspective(400px) rotateX(10deg); }
                    100% { transform: perspective(400px) rotateX(0deg); }
                }
            `;
            document.head.appendChild(style);
        }
    },

    mathematical: {
        apply: (container) => {
            // 数学公式动画效果
            container.style.background = '#fff';
            container.style.position = 'relative';
            container.style.zIndex = '1'; // 确保合适的层级
            
            // 确保顶部菜单栏显示在特效之上
            document.querySelector('.header').style.position = 'relative';
            document.querySelector('.header').style.zIndex = '10';
            
            const equations = document.createElement('div');
            equations.className = 'math-equations';
            equations.style.cssText = `
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                z-index: 1;
                pointer-events: none;
                opacity: 0.1;
                font-family: 'Times New Roman', serif;
                font-size: 24px;
                overflow: hidden;
            `;

            // 添加一些随机的数学公式作为背景
            const formulas = [
                'E = mc²', '∫', '∑', 'π', '∞', '√', 'Δ', '∂', '∇', 'λ',
                'sin(x)', 'cos(x)', 'lim', 'dx/dt', '∮', '⊕', '∀', '∃', '∈', '⊂'
            ];

            for (let i = 0; i < 50; i++) {
                const formula = document.createElement('span');
                formula.textContent = formulas[Math.floor(Math.random() * formulas.length)];
                formula.style.cssText = `
                    position: absolute;
                    left: ${Math.random() * 100}%;
                    top: ${Math.random() * 100}%;
                    transform: rotate(${Math.random() * 360}deg);
                    animation: float ${5 + Math.random() * 5}s infinite linear;
                `;
                equations.appendChild(formula);
            }

            container.appendChild(equations);

            // 添加动画样式
            const style = document.createElement('style');
            style.textContent = `
                @keyframes float {
                    0% { transform: translate(0, 0) rotate(0deg); }
                    50% { transform: translate(20px, 20px) rotate(180deg); }
                    100% { transform: translate(0, 0) rotate(360deg); }
                }
            `;
            document.head.appendChild(style);
        }
    },

    timeline: {
        apply: (container) => {
            // 为所有标题添加时间线效果
            const headings = container.querySelectorAll('h1, h2, h3, h4, h5, h6');
            headings.forEach((heading, index) => {
                heading.style.cssText = `
                    position: relative;
                    padding-left: 30px;
                    margin-left: 20px;
                    opacity: 0;
                    animation: slideIn 0.5s ease-out forwards;
                    animation-delay: ${index * 0.2}s;
                `;

                const dot = document.createElement('div');
                dot.style.cssText = `
                    position: absolute;
                    left: 0;
                    top: 50%;
                    transform: translateY(-50%);
                    width: 12px;
                    height: 12px;
                    background-color: #4a90e2;
                    border-radius: 50%;
                    box-shadow: 0 0 0 4px rgba(74, 144, 226, 0.2);
                `;
                heading.insertBefore(dot, heading.firstChild);

                if (index < headings.length - 1) {
                    const line = document.createElement('div');
                    line.style.cssText = `
                        position: absolute;
                        left: 6px;
                        top: 100%;
                        width: 2px;
                        height: ${heading.nextElementSibling.offsetTop - heading.offsetTop}px;
                        background-color: rgba(74, 144, 226, 0.2);
                    `;
                    heading.appendChild(line);
                }
            });

            // 添加动画样式
            const style = document.createElement('style');
            style.textContent = `
                @keyframes slideIn {
                    from {
                        opacity: 0;
                        transform: translateX(-30px);
                    }
                    to {
                        opacity: 1;
                        transform: translateX(0);
                    }
                }
            `;
            document.head.appendChild(style);
        }
    }
};
