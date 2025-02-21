document.addEventListener('DOMContentLoaded', () => {
    const faqQuestions = document.querySelectorAll('.faq-question');
    faqQuestions.forEach(question => {
        question.addEventListener('click', ()=> {
            question.classList.toggle('active');
            const answer = question.nextElementSibling;

            answer.classList.toggle('open'); // Animate open/close

            const icon = question.querySelector('.icon');
            if (icon) {
                icon.textContent = icon.textContent === '+' ? '-' : '+';
            }
        });
    });
});