// Função para lidar com a navegação
function handleNavigation(path) {
    // Remove a primeira barra se existir
    path = path.startsWith('/') ? path.substring(1) : path;
    // Converte espaços em hífens e coloca tudo em minúsculas
    path = path.toLowerCase().replace(/\s+/g, '-');
    // Redireciona para a página
    window.location.href = `/${path}`;
}

// Função para inicializar todos os event listeners
function initializeNavigation() {
    // Navegação principal
    const navLinks = document.querySelectorAll('nav a');
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            handleNavigation(e.target.textContent);
        });
    });

    // Botão de Login
    const loginButton = document.querySelector('nav button');
    loginButton.addEventListener('click', () => {
        handleNavigation('/login');
    });

    // Botão "Comece Agora" na seção hero
    const startNowButton = document.querySelector('.relative.bg-blue-600 button');
    startNowButton.addEventListener('click', () => {
        handleNavigation('/cadastro');
    });

    // Botão "Criar Conta Grátis" na seção CTA
    const createAccountButton = document.querySelector('.bg-gray-100 button');
    createAccountButton.addEventListener('click', () => {
        handleNavigation('/cadastro');
    });

    // Links do rodapé
    const footerLinks = document.querySelectorAll('footer a');
    footerLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            handleNavigation(e.target.textContent);
        });
    });

    // Links de redes sociais
    const socialLinks = {
        'Twitter': 'https://x.com/Primordio_',
        'GitHub': 'https://github.com/LizaGomes97/Organizacao-de-eventos',
        'Facebook': 'https://www.facebook.com/lizandra.placido.5?locale=pt_BR'
    };

    const socialButtons = document.querySelectorAll('.flex.space-x-4 a');
    socialButtons.forEach((button, index) => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            const platform = Object.keys(socialLinks)[index];
            window.open(socialLinks[platform], '_blank');
        });
    });
}

// Função para verificar se o usuário está logado
function checkAuthStatus() {
    // Simulação de verificação de autenticação
    const isLoggedIn = localStorage.getItem('userLoggedIn') === 'true';
    
    if (isLoggedIn) {
        // Atualiza o botão de login para "Minha Conta"
        const loginButton = document.querySelector('nav button');
        loginButton.textContent = 'Minha Conta';
        loginButton.addEventListener('click', () => {
            handleNavigation('/minha-conta');
        });
    }
}

// Função para exibir mensagens de feedback
function showMessage(message, type = 'info') {
    const messageDiv = document.createElement('div');
    messageDiv.className = `fixed top-4 right-4 p-4 rounded-lg ${
        type === 'error' ? 'bg-red-500' : 'bg-green-500'
    } text-white`;
    messageDiv.textContent = message;
    document.body.appendChild(messageDiv);

    // Remove a mensagem após 3 segundos
    setTimeout(() => {
        messageDiv.remove();
    }, 3000);
}

// Inicializa todas as funcionalidades quando o DOM estiver carregado
document.addEventListener('DOMContentLoaded', () => {
    initializeNavigation();
    checkAuthStatus();
});

// Previne que o formulário de pesquisa (se existir) recarregue a página
document.querySelectorAll('form').forEach(form => {
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const searchInput = form.querySelector('input[type="search"]');
        if (searchInput) {
            handleNavigation(`/pesquisa/${searchInput.value}`);
        }
    });
});