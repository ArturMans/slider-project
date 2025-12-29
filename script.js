// Получаем все элементы
const slides = document.querySelectorAll('.slide');
const dots = document.querySelectorAll('.dot');
const prevBtn = document.querySelector('.prev');
const nextBtn = document.querySelector('.next');
const currentElement = document.getElementById('current');
const totalElement = document.getElementById('total');

// Настройки
let currentSlide = 0;
const totalSlides = slides.length;
let autoSlideInterval;

// Обновляем счетчик
totalElement.textContent = totalSlides;

// Функция для показа слайда
function showSlide(n) {
    // Скрываем все слайды
    slides.forEach(slide => {
        slide.classList.remove('active');
    });
    
    // Убираем активный класс у всех точек
    dots.forEach(dot => {
        dot.classList.remove('active');
    });
    
    // Зацикливание
    if (n >= totalSlides) {
        currentSlide = 0;
    } else if (n < 0) {
        currentSlide = totalSlides - 1;
    } else {
        currentSlide = n;
    }
    
    // Показываем текущий слайд
    slides[currentSlide].classList.add('active');
    dots[currentSlide].classList.add('active');
    
    // Обновляем счетчик
    currentElement.textContent = currentSlide + 1;
    
    // Перемещаем слайды
    const slidesContainer = document.querySelector('.slides');
    const translateX = -currentSlide * 100; // 100% на слайд
    slidesContainer.style.transform = `translateX(${translateX}%)`;
}

// Функция для следующего слайда
function nextSlide() {
    showSlide(currentSlide + 1);
}

// Функция для предыдущего слайда
function prevSlide() {
    showSlide(currentSlide - 1);
}

// Автоматическая прокрутка
function startAutoSlide() {
    autoSlideInterval = setInterval(nextSlide, 3000); // Меняем каждые 3 секунды
}

// Останавливаем автоматическую прокрутку
function stopAutoSlide() {
    clearInterval(autoSlideInterval);
}

// Обработчики событий для кнопок
prevBtn.addEventListener('click', () => {
    prevSlide();
    stopAutoSlide();
    startAutoSlide();
});

nextBtn.addEventListener('click', () => {
    nextSlide();
    stopAutoSlide();
    startAutoSlide();
});

// Обработчики для точек
dots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
        showSlide(index);
        stopAutoSlide();
        startAutoSlide();
    });
});

// Управление с клавиатуры
document.addEventListener('keydown', (event) => {
    if (event.key === 'ArrowRight') {
        nextSlide();
        stopAutoSlide();
        startAutoSlide();
    } else if (event.key === 'ArrowLeft') {
        prevSlide();
        stopAutoSlide();
        startAutoSlide();
    }
});

// Останавливаем автопрокрутку при наведении мыши
const slider = document.querySelector('.slider');
slider.addEventListener('mouseenter', stopAutoSlide);
slider.addEventListener('mouseleave', startAutoSlide);

// Инициализация
showSlide(0);
startAutoSlide();