document.addEventListener('DOMContentLoaded', () => {
    const consoleOutput = document.querySelector('.console-output');
    const commandInput = document.querySelector('.command-input');
    const dynamicContent = document.getElementById('dynamic-content');
    let currentLine = 0;
    let typingTimer;

    const initialOutput = [
        "Initializing secure shell...",
        "Establishing encrypted connection...",
        "Access Granted: aguerra@kali",
        "",
        "Type 'help' for available commands.",
        ""
    ];

    const commands = {
        'help': {
            description: "Muestra la lista de comandos disponibles.",
            execute: () => {
                return `Available commands:\n` +
                       `  whoami    - Muestra tu perfil.\n` +
                       `  skills    - Detalla tus habilidades técnicas.\n` +
                       `  contact   - Muestra el formulario de contacto.\n` +
                       `  clear     - Limpia la consola.\n` +
                       `  help      - Muestra esta ayuda.`;
            }
        },
        'whoami': {
            description: "Muestra tu perfil.",
            content: `
                <div class="section-card">
                    <h3><i class="fas fa-user-secret"></i> Perfil: América Fabiola Guerra Ramírez</h3>
                    <p><strong>Alias:</strong> aguerra</p>
                    <p><strong>Rol:</strong> Estudiante CNO V – Seguridad Informática | 8º Semestre</p>
                    <p><strong>Institución:</strong> Universidad Politécnica</p>
                    <p>Estudiante con un profundo interés en el área de la ciberseguridad, enfocada en el <strong>análisis de vulnerabilidades</strong>, la protección de la información y la investigación tecnológica continua.</p>
                </div>
            `
        },
        'skills': {
            description: "Detalla tus habilidades técnicas.",
            content: `
                <div class="section-card">
                    <h3><i class="fas fa-microchip"></i> Habilidades Técnicas</h3>
                    <div class="tech-grid">
                        <div class="tech-item"><strong>Lenguajes:</strong> Python, Java, C/C++, HTML, Bash</div>
                        <div class="tech-item"><strong>Control de Versiones:</strong> Git & GitHub</div>
                        <div class="tech-item"><strong>Sistemas Operativos:</strong> Linux (Kali, Ubuntu), Windows Server</div>
                        <div class="tech-item"><strong>Herramientas de Seguridad:</strong> Nmap, Metasploit, Wireshark, Burp Suite</div>
                        <div class="tech-item"><strong>Conceptos:</strong> Criptografía, Análisis de Malware, Pentesting, OSINT</div>
                        <div class="tech-item"><strong>Plataformas:</strong> GitHub Pages</div>
                    </div>
                </div>
            `
        },
        'contact': {
            description: "Muestra el formulario de contacto.",
            content: `
                <div class="section-card contact-form">
                    <h3><i class="fas fa-envelope-open-text"></i> Enviar Mensaje Seguro</h3>
                    <form id="contactForm">
                        <div class="input-group">
                            <input type="text" id="nombre" placeholder="Tu Nombre de Usuario / Handle" required>
                        </div>
                        <div class="input-group">
                            <input type="email" id="email" placeholder="Email de Contacto Encriptado" required>
                        </div>
                        <div class="input-group">
                            <textarea id="mensaje" rows="4" placeholder="Mensaje para el Operador (Max. 500 chars)" maxlength="500" required></textarea>
                        </div>
                        <button type="submit">Enviar Mensaje &gt;</button>
                    </form>
                    <p id="form-response" class="form-success" style="display:none;"></p>
                </div>
            `
        },
        'clear': {
            description: "Limpia la consola.",
            execute: () => {
                consoleOutput.textContent = "";
                dynamicContent.innerHTML = "";
                return ""; // No hay salida adicional al limpiar
            }
        },
        'banner': {
             description: "Muestra el banner de bienvenida.",
             execute: () => {
                return `
███████╗ ██████╗ ███████╗██████╗  ██████╗ ███████╗██████╗ ███████╗
██╔════╝██╔═══██╗██╔════╝██╔══██╗██╔═══██╗██╔════╝██╔══██╗██╔════╝
█████╗  ██║   ██║█████╗  ██████╔╝██║   ██║█████╗  ██████╔╝███████╗
██╔══╝  ██║   ██║██╔══╝  ██╔══██╗██║   ██║██╔══╝  ██╔══██╗╚════██║
██║     ╚██████╔╝███████╗██║  ██║╚██████╔╝███████╗██║  ██║███████║
╚═╝      ╚═════╝ ╚══════╝╚═╝  ╚═╝ ╚═════╝ ╚══════╝╚═╝  ╚═╝╚══════╝

${initialOutput.slice(0, -1).join('\n')}`;
             }
        }
    };

    function typeLine(line, callback) {
        if (currentLine < initialOutput.length) {
            let i = 0;
            consoleOutput.classList.add('typing-effect');
            typingTimer = setInterval(() => {
                consoleOutput.textContent += line[i];
                i++;
                if (i === line.length) {
                    clearInterval(typingTimer);
                    consoleOutput.classList.remove('typing-effect');
                    consoleOutput.textContent += '\n'; // Agrega un salto de línea
                    currentLine++;
                    typeLine(initialOutput[currentLine], callback);
                }
            }, 50); // Velocidad de escritura
        } else {
            if (callback) callback();
        }
    }

    function executeCommand(command) {
        command = command.toLowerCase().trim();
        const cmdParts = command.split(' ');
        const baseCommand = cmdParts[0];

        const cmd = commands[baseCommand];
        let output = "";

        consoleOutput.textContent += `aguerra@kali:~$ ${command}\n`;

        if (cmd) {
            if (cmd.execute) {
                output = cmd.execute();
                if (baseCommand === 'clear') {
                    // El comando clear ya maneja su propia salida y limpieza
                    // No agregamos nada más aquí para evitar un doble salto de línea innecesario
                } else {
                    consoleOutput.textContent += output + '\n';
                }
            } else if (cmd.content) {
                dynamicContent.innerHTML += cmd.content;
                output = "Content loaded successfully.\n";
                consoleOutput.textContent += output;
            }
        } else {
            output = `Error: Command not found: '${command}'. Type 'help' for available commands.\n`;
            consoleOutput.textContent += output;
        }

        // Si el comando no es 'clear', asegúrate de que haya un salto de línea al final
        if (baseCommand !== 'clear' && !consoleOutput.textContent.endsWith('\n\n')) {
             consoleOutput.textContent += '\n';
        }

        // Desplaza al final
        consoleOutput.scrollTop = consoleOutput.scrollHeight;
        dynamicContent.scrollTop = dynamicContent.scrollHeight;
    }

    // --- Inicialización ---
    typeLine(initialOutput[currentLine], () => {
        commandInput.disabled = false;
        commandInput.focus();
    });

    commandInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            const command = commandInput.value;
            commandInput.value = ''; // Limpiar el input
            executeCommand(command);
        }
    });

    // Delegación de eventos para el formulario de contacto
    dynamicContent.addEventListener('submit', (e) => {
        if (e.target && e.target.id === 'contactForm') {
            e.preventDefault();
            const formResponse = document.getElementById('form-response');
            formResponse.style.display = 'block';
            formResponse.textContent = '✅ Mensaje encriptado y enviado. Recibirás una respuesta en tu terminal segura.';
            e.target.reset(); // Limpia el formulario
            // Aquí podrías enviar los datos a un servicio real
            console.log('Formulario enviado:', {
                nombre: document.getElementById('nombre').value,
                email: document.getElementById('email').value,
                mensaje: document.getElementById('mensaje').value
            });
        }
    });

    // Enfocar el input al hacer clic en cualquier parte del cuerpo de la terminal
    document.querySelector('.terminal-body').addEventListener('click', () => {
        commandInput.focus();
    });
});
