// Diego
document.addEventListener('DOMContentLoaded', () => {
    const learnMoreBtn = document.getElementById('learnMoreBtn');
    const moreInfo = document.getElementById('moreInfo');

    learnMoreBtn.addEventListener('click', () => {
        if (moreInfo.classList.contains('d-none')) {
            moreInfo.classList.remove('d-none');
            learnMoreBtn.textContent = 'Mostrar menos';
        } else {
            moreInfo.classList.add('d-none');
            learnMoreBtn.textContent = 'Conoce más';
        }
    });
});
// Diego
