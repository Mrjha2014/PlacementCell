const axios = require("axios");

const jobController = {
  // Fetch external jobs from Adzuna API
  getExternalJobs: async (req, res) => {
    try {
      // Make GET request to Adzuna API
      const response = await axios.get(
        "https://api.adzuna.com/v1/api/jobs/us/search/1?app_id=27f68361&app_key=424c6e19e4f1a5f1cede8c90878c8c45&what=react,node&where=India"
      );

      // Extract job results from API response
      const jobs = response.data.results;

      // Render externalJobs view with fetched jobs
      res.render("externalJobs", { jobs });
    } catch (error) {
      // Handle errors
      console.error("Error fetching external jobs:", error);
      res.status(500).send("Error fetching jobs");
    }
  },
};

module.exports = jobController;
