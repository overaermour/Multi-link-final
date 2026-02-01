(function () {
  const DATA_KEY = "hubSiteDataV2";
  const DATA_PATH = "data/site-data.json";
  const DEFAULT_DATA = {
    home: {
      today: [
        "08:10 AM: Event 1 (School Uniform)",
        "12:20 PM: Event 2 (Club/Schoolshirt)",
        "03:30 PM: Event 3 (PE Clothes)"
      ]
    },
    announcements: [
      {
        tag: "General",
        title: "Announcement 1",
        body: "This is announcement 1.",
        posted: "Feb 9, 2026",
        urgent: false
      }
    ],
    events: [
      {
        title: "Event 1",
        meta: "Feb 14, 2026 | Location 1 | 1:00 PM",
        attire: "School Uniform",
        type: "formal"
      }
    ],
    clubs: [
      {
        name: "Club 1",
        details: "Day 1 | Room 1 | 3:30 PM | Advisor 1",
        attire: "Club/Schoolshirt",
        type: "club"
      }
    ],
    calendarEvents: [
      {
        date: "2026-03-14",
        title: "Event 1",
        attire: "School Uniform",
        location: "Location 1",
        time: "1:00 PM",
        type: "formal"
      }
    ]
  };

  async function loadHubData() {
    const cached = localStorage.getItem(DATA_KEY);
    if (cached) {
      try {
        return JSON.parse(cached);
      } catch (_) {
        localStorage.removeItem(DATA_KEY);
      }
    }

    try {
      const response = await fetch(DATA_PATH, { cache: "no-store" });
      if (!response.ok) {
        throw new Error("Unable to load site-data.json");
      }
      return await response.json();
    } catch (_) {
      return DEFAULT_DATA;
    }
  }

  function saveHubData(data) {
    localStorage.setItem(DATA_KEY, JSON.stringify(data));
  }

  function resetHubData() {
    localStorage.removeItem(DATA_KEY);
  }

  window.HubDataStore = {
    load: loadHubData,
    save: saveHubData,
    reset: resetHubData,
    key: DATA_KEY,
    path: DATA_PATH
  };
})();

