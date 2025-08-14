document.addEventListener("DOMContentLoaded", () => {
  const modal = document.getElementById("memberModal")
  const modalTitle = document.getElementById("modalTitle")
  const modalContent = document.getElementById("modalContent")
  const closeModal = document.getElementById("closeModal")
  const memberCards = document.querySelectorAll(".member-card")

  const colorClasses = {
    yellow: {
      text: "text-yellow-600",
      bg: "bg-yellow-100",
      border: "border-yellow-300",
      textDark: "text-yellow-800",
    },
    blue: {
      text: "text-blue-600",
      bg: "bg-blue-100",
      border: "border-blue-300",
      textDark: "text-blue-800",
    },
    orange: {
      text: "text-orange-600",
      bg: "bg-orange-100",
      border: "border-orange-300",
      textDark: "text-orange-800",
    },
    purple: {
      text: "text-purple-600",
      bg: "bg-purple-100",
      border: "border-purple-300",
      textDark: "text-purple-800",
    },
    green: {
      text: "text-green-600",
      bg: "bg-green-100",
      border: "border-green-300",
      textDark: "text-green-800",
    },
    amber: {
      text: "text-amber-600",
      bg: "bg-amber-100",
      border: "border-amber-300",
      textDark: "text-amber-800",
    },
  }

  memberCards.forEach((card) => {
    card.addEventListener("click", function () {
      try {
        const memberData = JSON.parse(this.dataset.member)
        const color = this.dataset.color
        const department = this.dataset.department

        if (!memberData || !modalTitle || !modalContent) {
          console.error("Missing required elements or data")
          return
        }

        const colorClass = colorClasses[color] || colorClasses.blue

        modalTitle.textContent = memberData.name
        modalTitle.className = `text-xl font-bold ${colorClass.text}`

        let departmentBadge = ""
        if (department) {
          departmentBadge = `
            <div class="${colorClass.bg} ${colorClass.border} rounded-lg p-2 text-center mb-4">
              <span class="font-semibold ${colorClass.textDark}">${department}</span>
            </div>
          `
        }

        modalContent.innerHTML = `
          ${departmentBadge}
          <p class="text-gray-600 mb-4">${memberData.bio || "Tidak ada bio tersedia"}</p>
          <div class="mb-4">
            <h4 class="font-semibold ${colorClass.text} mb-2">Tanggung Jawab:</h4>
            <ul class="list-disc list-inside space-y-1 text-sm text-gray-600">
              ${(memberData.responsibilities || []).map((resp) => `<li>${resp}</li>`).join("")}
            </ul>
          </div>
          <p class="text-sm text-gray-500">Kontak: ${memberData.contact || "Tidak tersedia"}</p>
        `

        modal.classList.remove("hidden")
      } catch (error) {
        console.error("Error opening modal:", error)
      }
    })
  })

  if (closeModal) {
    closeModal.addEventListener("click", () => {
      if (modal) {
        modal.classList.add("hidden")
      }
    })
  }

  if (modal) {
    modal.addEventListener("click", (e) => {
      if (e.target === modal) {
        modal.classList.add("hidden")
      }
    })
  }
})
