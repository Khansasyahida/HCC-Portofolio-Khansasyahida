const CONTACT_EMAIL = "";
    const root = document.documentElement;
    const themeToggle = document.getElementById("themeToggle");
    const savedTheme = localStorage.getItem("khansa-theme");
    if (savedTheme === "dark") root.dataset.theme = "dark";
    themeToggle.addEventListener("click", () => {
      const isDark = root.dataset.theme !== "dark";
      root.dataset.theme = isDark ? "dark" : "light";
      localStorage.setItem("khansa-theme", isDark ? "dark" : "light");
      themeToggle.setAttribute("aria-label", isDark ? "Aktifkan tema terang" : "Aktifkan tema gelap");
    });

    const menuToggle = document.getElementById("menuToggle");
    const navLinks = document.getElementById("navLinks");
    menuToggle.addEventListener("click", () => {
      const isOpen = navLinks.classList.toggle("is-open");
      menuToggle.setAttribute("aria-expanded", String(isOpen));
      menuToggle.setAttribute("aria-label", isOpen ? "Tutup navigasi" : "Buka navigasi");
      menuToggle.textContent = isOpen ? "×" : "☰";
    });
    navLinks.querySelectorAll("a").forEach(link => link.addEventListener("click", () => {
      navLinks.classList.remove("is-open");
      menuToggle.setAttribute("aria-expanded", "false");
      menuToggle.setAttribute("aria-label", "Buka navigasi");
      menuToggle.textContent = "☰";
    }));

    document.querySelectorAll(".filter-button").forEach(button => button.addEventListener("click", () => {
      document.querySelectorAll(".filter-button").forEach(item => item.setAttribute("aria-pressed", String(item === button)));
      document.querySelectorAll(".project-card").forEach(card => {
        card.hidden = button.dataset.filter !== "all" && card.dataset.category !== button.dataset.filter;
      });
    }));

    const projectDetails = {
      hospital: { kicker: "Studi kasus · Analisis sistem", title: "Sistem Rawat Inap Rumah Sakit", description: "Diagram konteks ini memetakan pertukaran data antara pasien, dokter, perawat, petugas rumah sakit, dan manajer. Fokus pengerjaan ada pada identifikasi entitas eksternal, alur data, dan batas sistem.", tags: ["Diagram konteks", "Alur data", "Tugas akademik"] },
      payroll: { kicker: "Studi kasus · Analisis sistem", title: "Sistem Penggajian Pegawai", description: "Studi perancangan aliran data untuk proses penggajian, mulai dari data pegawai, golongan, tunjangan, dan potongan hingga penyusunan laporan periodik.", tags: ["Data Flow Diagram", "Pemodelan proses", "Tugas akademik"] },
      portfolio: { kicker: "Eksplorasi · Frontend", title: "Website Portofolio Personal", description: "Website satu halaman yang merangkum profil, karya, area belajar, dan kontak. Dibangun dengan HTML, CSS, dan JavaScript, dengan layout responsif, pilihan tema, filter proyek, serta detail karya yang aksesibel.", tags: ["HTML", "CSS", "JavaScript", "Responsive design"] }
    };
    const projectDialog = document.getElementById("projectDialog");
    document.querySelectorAll("[data-project]").forEach(button => button.addEventListener("click", () => {
      const detail = projectDetails[button.dataset.project];
      document.getElementById("dialogKicker").textContent = detail.kicker;
      document.getElementById("dialogTitle").textContent = detail.title;
      document.getElementById("dialogDescription").textContent = detail.description;
      document.getElementById("dialogTags").replaceChildren(...detail.tags.map(tag => {
        const item = document.createElement("span");
        item.textContent = tag;
        return item;
      }));
      projectDialog.showModal();
    }));
    document.getElementById("dialogClose").addEventListener("click", () => projectDialog.close());
    projectDialog.addEventListener("click", event => {
      if (event.target === projectDialog) projectDialog.close();
    });

    document.getElementById("contactForm").addEventListener("submit", event => {
      event.preventDefault();
      const status = document.getElementById("formStatus");
      if (!CONTACT_EMAIL) {
        status.textContent = "Form siap. Atur CONTACT_EMAIL di bagian script agar email bisa dikirim.";
        return;
      }
      const formData = new FormData(event.currentTarget);
      const subject = encodeURIComponent(`Pesan portofolio dari ${formData.get("name")}`);
      const body = encodeURIComponent(`${formData.get("message")}\n\nDari: ${formData.get("name")} (${formData.get("email")})`);
      window.location.href = `mailto:${CONTACT_EMAIL}?subject=${subject}&body=${body}`;
      status.textContent = "Aplikasi email sedang dibuka.";
    });

    document.getElementById("year").textContent = new Date().getFullYear();
    if ("IntersectionObserver" in window && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      const observer = new IntersectionObserver(entries => entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      }), { threshold: .12 });
      document.querySelectorAll(".reveal").forEach(item => observer.observe(item));
    } else {
      document.querySelectorAll(".reveal").forEach(item => item.classList.add("is-visible"));
    }