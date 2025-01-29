const express = require("express");
const https = require("https");
const cors = require("cors");

const app = express();
const PORT = 3000;

app.use(cors());

app.get("/getTimeStories", (req, res) => {
  const url = "https://time.com";

  https
    .get(url, (response) => {
      let data = "";

      response.on("data", (chunk) => {
        data += chunk;
      });

      response.on("end", () => {
        try {
          const stories = [];
          let currentPos = 0;

          const itemClass = "latest-stories__item";

          while (stories.length < 6) {
            // Find the next story item
            const itemStart = data.indexOf(`class="${itemClass}"`, currentPos);
            if (itemStart === -1) break;

            const linkStart = data.indexOf('href="', itemStart);
            if (linkStart === -1) break;

            const linkEnd = data.indexOf('"', linkStart + 6);
            const link = data.slice(linkStart + 6, linkEnd);
            
            const headlineStart = data.indexOf(
              'class="latest-stories__item-headline">',
              itemStart
            );
            const headlineEnd = data.indexOf("</h3>", headlineStart);
            let title = "";

            if (headlineStart !== -1 && headlineEnd !== -1) {
              title = data
                .slice(
                  headlineStart +
                    'class="latest-stories__item-headline">'.length,
                  headlineEnd
                )
                .trim();
            }

            if (title && link) {
              stories.push({
                title,
                link: link.startsWith("http")
                  ? link
                  : `https://time.com${link}`,
              });
            }

            currentPos = headlineEnd;
          }

          if (stories.length === 0) {
            throw new Error("No stories found");
          }

          res.json(stories);
        } catch (error) {
          console.error("Error parsing Time.com content:", error);
          res.status(500).json({ error: "Failed to parse Time.com content" });
        }
      });
    })
    .on("error", (err) => {
      console.error("Error fetching Time.com:", err.message);
      res.status(500).json({ error: "Unable to fetch data from Time.com" });
    });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
