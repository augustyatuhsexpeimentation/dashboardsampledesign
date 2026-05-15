const dashboardData = {
  user: {
    name: "Admin",
    greeting: "Good morning"
  },
  filters: {
    payer: "All Payers",
    dateRange: "May 1 - May 31, 2024"
  },
  suggestions: [
    "Why did total cost increase last month?",
    "Which service lines are driving up cost?",
    "How do our costs compare to last quarter?",
    "Who are our top high-cost patients?"
  ],
  responses: {
    "why did total cost increase last month?":
      "Total cost increased primarily because of higher inpatient admissions, increased ER utilization, and pharmacy spend growth. Inpatient costs rose 7.9%, ER visit costs rose 9.1%, and PMPM increased 3.8%.",
    "which service lines are driving up cost?":
      "The largest cost drivers are inpatient admissions, pharmacy spend, ER visits, readmissions, and length of stay. These areas should be prioritized for care management review.",
    "how do our costs compare to last quarter?":
      "Costs are trending above last quarter. PMPM is up 3.8%, inpatient cost is up 7.9%, and total cost of care is up 6.2% versus the prior month.",
    "who are our top high-cost patients?":
      "The highest-cost members are concentrated among inpatient cases with complex procedures, long stays, repeat ER utilization, and post-acute care needs."
  },
  metrics: [
    {
      title: "Total Cost of Care",
      value: "$12.84M",
      change: "+6.2%",
      trendLabel: "vs Apr 1 - Apr 30, 2024",
      status: "up",
      color: "blue",
      icon: "$",
      noteTitle: "Total cost of care is up 6.2%",
      description: "Driven by higher utilization and increased inpatient costs.",
      cta: "View key drivers",
      sparkline: [24, 31, 22, 34, 27, 39, 35, 43, 37, 45, 41, 49]
    },
    {
      title: "PMPM",
      value: "$498.52",
      change: "+3.8%",
      trendLabel: "vs Apr 1 - Apr 30, 2024",
      status: "up",
      color: "green",
      icon: "👤",
      noteTitle: "PMPM increased 3.8%",
      description: "Mainly due to higher pharmacy spend and ER visits.",
      cta: "View breakdown",
      sparkline: [21, 29, 22, 26, 19, 25, 23, 28, 35, 31, 29, 37]
    },
    {
      title: "Inpatient Cost",
      value: "$6.21M",
      change: "+7.9%",
      trendLabel: "vs Apr 1 - Apr 30, 2024",
      status: "up",
      color: "purple",
      icon: "▣",
      noteTitle: "Inpatient costs are up 7.9%",
      description: "Driven by longer lengths of stay and higher readmissions.",
      cta: "Explore inpatient trends",
      sparkline: [26, 29, 23, 31, 25, 30, 28, 34, 32, 38, 29, 41]
    },
    {
      title: "ER Visit Cost",
      value: "$1.24M",
      change: "+9.1%",
      trendLabel: "vs Apr 1 - Apr 30, 2024",
      status: "up",
      color: "orange",
      icon: "●",
      noteTitle: "ER visit costs increased 9.1%",
      description: "With more high-acuity visits and after-hours utilization.",
      cta: "See ER utilization",
      sparkline: [18, 17, 21, 16, 23, 18, 22, 21, 26, 23, 25, 31]
    },
    {
      title: "Unique Members",
      value: "25,732",
      change: "+2.4%",
      trendLabel: "vs Apr 1 - Apr 30, 2024",
      status: "up",
      color: "teal",
      icon: "☷",
      noteTitle: "Membership grew 2.4%",
      description: "Primarily from new employer groups and dependents.",
      cta: "View member trends",
      sparkline: [28, 34, 29, 25, 31, 27, 30, 29, 33, 28, 30, 31]
    }
  ],
  insights: {
    summary:
      "Overall costs are trending up, with inpatient admissions, ER visits, and pharmacy spend being the top contributors. Focus on care management for high-risk members and review post-acute and readmission patterns to reduce costs.",
    drivers: [
      "Inpatient Admissions",
      "Pharmacy Spend",
      "ER Visits",
      "Readmissions",
      "Length of Stay"
    ]
  },
  actions: [
    {
      title: "Review high-cost inpatient cases",
      description: "Focus on cases with long lengths of stay and high-cost procedures.",
      cta: "View cases",
      color: "purple",
      icon: "▣"
    },
    {
      title: "Target high ER utilizers",
      description: "Identify members with frequent ER visits and engage care management.",
      cta: "View members",
      color: "green",
      icon: "☷"
    },
    {
      title: "Optimize pharmacy spend",
      description: "Review trending drugs and opportunities to switch to lower-cost alternatives.",
      cta: "View opportunities",
      color: "orange",
      icon: "◉"
    }
  ],
  alerts: [
    {
      title: "Inpatient cost spike detected",
      description: "8.7% increase in inpatient costs compared to prior month.",
      detail: "Review admissions by facility, DRG, length of stay, and readmission patterns.",
      severity: "high",
      time: "2h ago"
    },
    {
      title: "High readmission rate",
      description: "Readmission rate is 18% higher than benchmark.",
      detail: "Prioritize discharge planning, post-acute follow-up, and care transition workflows.",
      severity: "medium",
      time: "5h ago"
    },
    {
      title: "Pharmacy trend above target",
      description: "Specialty drug spend is tracking 6.4% above expected levels.",
      detail: "Review top therapeutic classes, formulary alternatives, and prior authorization opportunities.",
      severity: "low",
      time: "1d ago"
    }
  ]
};

const colorClassMap = {
  blue: "metric-card--blue",
  green: "metric-card--green",
  purple: "metric-card--purple",
  orange: "metric-card--orange",
  teal: "metric-card--teal"
};

const severityIconMap = {
  high: "▲",
  medium: "!",
  low: "i"
};

const qs = (selector) => document.querySelector(selector);

function escapeHtml(value) {
  "Escape HTML-sensitive characters.";

  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function createSparkline(values) {
  "Create an SVG sparkline from numeric values.";

  const width = 180;
  const height = 52;
  const min = Math.min(...values);
  const max = Math.max(...values);
  const range = max - min || 1;

  const points = values
    .map((value, index) => {
      const x = (index / (values.length - 1)) * width;
      const y = height - ((value - min) / range) * height;
      return `${x.toFixed(2)},${y.toFixed(2)}`;
    })
    .join(" ");

  return `
    <svg viewBox="0 0 ${width} ${height}" class="sparkline" aria-hidden="true">
      <polyline
        points="${points}"
        fill="none"
        stroke="currentColor"
        stroke-width="3"
        stroke-linecap="round"
        stroke-linejoin="round"
      ></polyline>
    </svg>
  `;
}

function renderHeader() {
  "Render greeting and filter defaults.";

  qs("#greetingTitle").textContent = `${dashboardData.user.greeting}, ${dashboardData.user.name}`;
  qs("#payerSelect").value = dashboardData.filters.payer;
  qs("#dateSelect").value = dashboardData.filters.dateRange;
}

function renderSuggestions() {
  "Render suggested question chips.";

  const suggestionRow = qs("#suggestionRow");

  suggestionRow.innerHTML = dashboardData.suggestions
    .map(
      (question) => `
        <button class="suggestion-chip" type="button" data-question="${escapeHtml(question)}">
          ${escapeHtml(question)}
        </button>
      `
    )
    .join("");
}

function renderMetrics() {
  "Render dashboard metric cards.";

  const metricGrid = qs("#metricGrid");

  metricGrid.innerHTML = dashboardData.metrics
    .map(
      (metric) => `
        <article class="metric-card ${colorClassMap[metric.color]}">
          <div class="metric-header">
            <span class="metric-icon">${escapeHtml(metric.icon)}</span>
            <div>
              <div class="metric-title-row">
                <h3>${escapeHtml(metric.title)}</h3>
                <span class="info-dot">i</span>
              </div>
              <div class="metric-value">${escapeHtml(metric.value)}</div>
            </div>
          </div>

          <div class="metric-trend">
            <span>↑</span>
            <span>${escapeHtml(metric.change)} ${escapeHtml(metric.trendLabel)}</span>
          </div>

          <div class="sparkline-wrap">
            ${createSparkline(metric.sparkline)}
          </div>

          <div class="metric-note">
            <strong>${escapeHtml(metric.noteTitle)}</strong>
            ${escapeHtml(metric.description)}
          </div>

          <button class="text-button metric-cta" type="button" data-label="${escapeHtml(metric.cta)}">
            ${escapeHtml(metric.cta)} →
          </button>
        </article>
      `
    )
    .join("");
}

function renderInsights() {
  "Render insight summary and driver tags.";

  qs("#insightSummary").textContent = dashboardData.insights.summary;

  qs("#driverTags").innerHTML = dashboardData.insights.drivers
    .map((driver) => `<span class="driver-tag">${escapeHtml(driver)}</span>`)
    .join("");
}

function renderActions() {
  "Render recommended action cards.";

  qs("#actionsGrid").innerHTML = dashboardData.actions
    .map(
      (action) => `
        <article class="action-card action-card--${escapeHtml(action.color)}">
          <div class="action-icon">${escapeHtml(action.icon)}</div>
          <h3>${escapeHtml(action.title)}</h3>
          <p>${escapeHtml(action.description)}</p>
          <button class="text-button action-cta" type="button" data-label="${escapeHtml(action.cta)}">
            ${escapeHtml(action.cta)} →
          </button>
        </article>
      `
    )
    .join("");
}

function renderAlerts() {
  "Render recent alert cards.";

  qs("#alertsList").innerHTML = dashboardData.alerts
    .map(
      (alert) => `
        <button class="alert-item alert-item--${escapeHtml(alert.severity)}" type="button">
          <div class="alert-row">
            <span class="alert-icon">${escapeHtml(severityIconMap[alert.severity] || "i")}</span>
            <span class="alert-content">
              <span class="alert-title-row">
                <strong>${escapeHtml(alert.title)}</strong>
                <span>${escapeHtml(alert.time)}</span>
              </span>
              <p>${escapeHtml(alert.description)}</p>
              <span class="alert-extra">${escapeHtml(alert.detail)}</span>
            </span>
          </div>
        </button>
      `
    )
    .join("");
}

function getResponse(question) {
  "Return a mock AI response for a question.";

  const normalizedQuestion = question.trim().toLowerCase();

  if (dashboardData.responses[normalizedQuestion]) {
    return dashboardData.responses[normalizedQuestion];
  }

  return "I found related cost signals, but this sample frontend uses mock responses. For a production version, connect this input to an analytics API or LLM endpoint that can query claims, eligibility, utilization, and care management data.";
}

function showAiResponse(question) {
  "Show the AI response panel.";

  const responsePanel = qs("#aiResponse");
  const responseText = qs("#aiResponseText");

  responseText.textContent = getResponse(question);
  responsePanel.hidden = false;
}

function hideAiResponse() {
  "Hide the AI response panel.";

  qs("#aiResponse").hidden = true;
}

function showToast(message) {
  "Show a temporary toast message.";

  const toast = qs("#toast");

  toast.textContent = message;
  toast.classList.add("toast--visible");

  window.clearTimeout(showToast.timeoutId);

  showToast.timeoutId = window.setTimeout(() => {
    toast.classList.remove("toast--visible");
  }, 2400);
}

function handleQuerySubmit(event) {
  "Handle AI query form submission.";

  event.preventDefault();

  const input = qs("#queryInput");
  const question = input.value.trim();

  if (!question) {
    showToast("Enter a question to analyze.");
    return;
  }

  showAiResponse(question);
}

function handleSuggestionClick(event) {
  "Handle suggested question clicks.";

  const button = event.target.closest(".suggestion-chip");

  if (!button) {
    return;
  }

  const question = button.dataset.question;

  qs("#queryInput").value = question;
  showAiResponse(question);
}

function handleMetricCtaClick(event) {
  "Handle metric CTA clicks.";

  const button = event.target.closest(".metric-cta");

  if (!button) {
    return;
  }

  showToast(`${button.dataset.label} selected.`);
}

function handleActionCtaClick(event) {
  "Handle action CTA clicks.";

  const button = event.target.closest(".action-cta");

  if (!button) {
    return;
  }

  showToast(`${button.dataset.label} selected.`);
}

function handleAlertClick(event) {
  "Toggle alert details.";

  const alertItem = event.target.closest(".alert-item");

  if (!alertItem) {
    return;
  }

  alertItem.classList.toggle("is-open");
}

function handleFilterChange(event) {
  "Handle dashboard filter changes.";

  const label = event.target.id === "payerSelect" ? "Payer" : "Date range";
  showToast(`${label} changed to ${event.target.value}.`);
}

function bindEvents() {
  "Bind dashboard event listeners.";

  qs("#queryForm").addEventListener("submit", handleQuerySubmit);
  qs("#suggestionRow").addEventListener("click", handleSuggestionClick);
  qs("#metricGrid").addEventListener("click", handleMetricCtaClick);
  qs("#actionsGrid").addEventListener("click", handleActionCtaClick);
  qs("#alertsList").addEventListener("click", handleAlertClick);
  qs("#payerSelect").addEventListener("change", handleFilterChange);
  qs("#dateSelect").addEventListener("change", handleFilterChange);
  qs("#closeResponseButton").addEventListener("click", hideAiResponse);
  qs("#notificationButton").addEventListener("click", () => showToast("3 recent alerts available."));
  qs("#viewAllAlertsButton").addEventListener("click", () => showToast("Showing all alerts in this sample view."));
}

function initDashboard() {
  "Initialize the dashboard.";

  renderHeader();
  renderSuggestions();
  renderMetrics();
  renderInsights();
  renderActions();
  renderAlerts();
  bindEvents();
}

document.addEventListener("DOMContentLoaded", initDashboard);
