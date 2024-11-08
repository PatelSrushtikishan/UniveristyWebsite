document.addEventListener("DOMContentLoaded", function () {
    const programOptions = document.querySelectorAll(".program-option");
    const semesterSlider = document.getElementById("semester-count");
    const semesterValue = document.querySelector(".semester-value");
    const totalAmount = document.querySelector(".total-amount");
    let selectedProgram = null;

    programOptions.forEach((option) => {
        option.addEventListener("click", function () {
            programOptions.forEach((p) => p.classList.remove("selected"));

            this.classList.add("selected");
            selectedProgram = parseInt(this.dataset.fee);
            calculateTotal();
        });
    });

    semesterSlider.addEventListener("input", function () {
        semesterValue.textContent = `${this.value} Semester${
            this.value > 1 ? "s" : ""
        }`;
        calculateTotal();
    });

    function calculateTotal() {
        if (selectedProgram) {
            const semesters = parseInt(semesterSlider.value);
            const total = selectedProgram * semesters;
            totalAmount.textContent = `$${total.toLocaleString()}`;

            totalAmount.style.animation = "pulse 0.5s ease";
            setTimeout(() => {
                totalAmount.style.animation = "";
            }, 500);
        } else {
            totalAmount.textContent = "Select a program";
        }
    }

    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("animate");
                }
            });
        },
        { threshold: 0.1 }
    );

    document.querySelectorAll(".program-box, .program-option").forEach((el) => {
        observer.observe(el);
    });

    const navbar = document.querySelector(".navbar");
    let lastScroll = 0;

    window.addEventListener("scroll", () => {
        const currentScroll = window.pageYOffset;

        if (currentScroll > lastScroll && currentScroll > 100) {
            navbar.style.transform = "translateY(-100%)";
        } else {
            navbar.style.transform = "translateY(0)";
        }
        lastScroll = currentScroll;
    });

    const modal = document.getElementById("contactModal");
    const contactLinks = document.querySelectorAll(
        'a[href="#contactuspage"], .bookcall'
    );
    const closeBtn = document.querySelector(".close");

    contactLinks.forEach((link) => {
        link.addEventListener("click", function (e) {
            e.preventDefault();
            modal.style.display = "block";
            document.body.style.overflow = "hidden";
        });
    });

    closeBtn.addEventListener("click", () => {
        modal.style.display = "none";
        document.body.style.overflow = "auto";
    });

    window.addEventListener("click", (e) => {
        if (e.target === modal) {
            modal.style.display = "none";
            document.body.style.overflow = "auto";
        }
    });

    const contactForm = document.getElementById("contact-form");
    contactForm.addEventListener("submit", async function (e) {
        e.preventDefault();

        const formData = {
            name: document.getElementById("name").value,
            email: document.getElementById("email").value,
            message: document.getElementById("message").value,
        };

        try {
            await new Promise((resolve) => setTimeout(resolve, 1000));

            alert("Thank you for your message! We will get back to you soon.");
            contactForm.reset();
            modal.style.display = "none";
            document.body.style.overflow = "auto";
        } catch (error) {
            alert(
                "Sorry, there was an error sending your message. Please try again."
            );
        }
    });

    document.addEventListener("keydown", function (e) {
        if (e.key === "Escape" && modal.style.display === "block") {
            modal.style.display = "none";
            document.body.style.overflow = "auto";
        }
    });

    
    const hamburger = document.querySelector(".hamburger");
    const navLinks = document.querySelector(".navigationLinks");

    hamburger.addEventListener("click", () => {
        hamburger.classList.toggle("active");
        navLinks.classList.toggle("active");
    });
});

const style = document.createElement("style");
style.textContent = `
    @keyframes pulse {
        0% { transform: scale(1); }
        50% { transform: scale(1.05); }
        100% { transform: scale(1); }
    }
`;
document.head.appendChild(style);