// Estado de los carruseles
const carruselesEstado = {
    'automaticas': { posicion: 0 },
    'escopetas': { posicion: 0 },
    'pistolas': { posicion: 0 },
    'melee': { posicion: 0 }
};

// Mostrar todas las categorías automáticamente
document.addEventListener('DOMContentLoaded', function() {
    // Mostrar todas las categorías sin necesidad de botones
    const contenidosCategoria = document.querySelectorAll('.categoria-contenido');
    contenidosCategoria.forEach(contenido => {
        contenido.classList.add('active');
    });
    
    // Inicializar todos los carruseles
    Object.keys(carruselesEstado).forEach(categoria => {
        actualizarCarrusel(categoria);
    });
});

// Mover carrusel automáticamente
function moverCarousel(categoria, direccion) {
    const carrusel = document.getElementById(`carousel-${categoria}`);
    const tarjetas = carrusel.querySelectorAll('.card');
    const totalTarjetas = tarjetas.length;
    
    // Actualizar posición
    carruselesEstado[categoria].posicion += direccion;
    
    // Asegurar que la posición esté dentro de los límites
    if (carruselesEstado[categoria].posicion < 0) {
        carruselesEstado[categoria].posicion = totalTarjetas - 1;
    } else if (carruselesEstado[categoria].posicion >= totalTarjetas) {
        carruselesEstado[categoria].posicion = 0;
    }
    
    actualizarCarrusel(categoria);
}

// Actualizar visualización del carrusel con efecto 3D
function actualizarCarrusel(categoria) {
    const carrusel = document.getElementById(`carousel-${categoria}`);
    const tarjetas = carrusel.querySelectorAll('.card');
    const posicion = carruselesEstado[categoria].posicion;
    const totalTarjetas = tarjetas.length;
    
    tarjetas.forEach((tarjeta, index) => {
        const offset = index - posicion;
        const absOffset = Math.abs(offset);
        
        // Mostrar solo 3 tarjetas a la vez
        if (absOffset <= 1) {
            tarjeta.style.display = 'flex';
            tarjeta.style.opacity = '1';
            
            // Posicionar las tarjetas
            if (offset === 0) {
                // Tarjeta central
                tarjeta.style.transform = 'translateX(0) scale(1)';
                tarjeta.style.zIndex = '3';
            } else if (offset === -1) {
                // Tarjeta izquierda
                tarjeta.style.transform = 'translateX(-120%) scale(0.85)';
                tarjeta.style.zIndex = '2';
                tarjeta.style.opacity = '0.7';
            } else if (offset === 1) {
                // Tarjeta derecha
                tarjeta.style.transform = 'translateX(120%) scale(0.85)';
                tarjeta.style.zIndex = '2';
                tarjeta.style.opacity = '0.7';
            }
        } else {
            // Ocultar tarjetas que no están en vista
            tarjeta.style.display = 'none';
        }
    });
}

// Navegación con teclado (opcional)
document.addEventListener('keydown', function(event) {
    const categorias = ['automaticas', 'escopetas', 'pistolas', 'melee'];
    
    if (event.key === 'ArrowLeft') {
        categorias.forEach(categoria => {
            moverCarousel(categoria, -1);
        });
    } else if (event.key === 'ArrowRight') {
        categorias.forEach(categoria => {
            moverCarousel(categoria, 1);
        });
    }
});

// Efectos hover para las tarjetas
document.addEventListener('DOMContentLoaded', function() {
    const todasLasTarjetas = document.querySelectorAll('.card');
    
    todasLasTarjetas.forEach(tarjeta => {
        tarjeta.addEventListener('mouseenter', function() {
            this.style.transform += ' scale(1.05)';
            this.style.boxShadow = '0 15px 40px rgba(193, 18, 31, 0.4)';
        });
        
        tarjeta.addEventListener('mouseleave', function() {
            // Mantener la transformación original del carrusel
            const currentTransform = this.style.transform;
            this.style.transform = currentTransform.replace(' scale(1.05)', '');
            this.style.boxShadow = 'none';
        });
    });
});

// Auto-rotación para todos los carruseles
setInterval(() => {
    Object.keys(carruselesEstado).forEach(categoria => {
        moverCarousel(categoria, 1);
    });
}, 4000);

// Inicializar todos los carruseles al cargar
window.addEventListener('load', function() {
    Object.keys(carruselesEstado).forEach(categoria => {
        actualizarCarrusel(categoria);
    });
});