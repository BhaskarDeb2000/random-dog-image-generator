import express from "express";
import fetch from "node-fetch";

const app = express();
const PORT = 3000;

async function fetchDogImage() {
  try {
    const response = await fetch("https://dog.ceo/api/breeds/image/random");
    const data = await response.json();
    return data.message;
  } catch (error) {
    console.error("Error fetching dog image:", error);
    return null;
  }
}

// Route to serve the HTML page
app.get("/", async (req, res) => {
  try {
    const imageUrl = await fetchDogImage();
    if (imageUrl) {
      const html = `
                <html>
                <head>
                    <title>Random Dog Image</title>
                    <style>
                        body {
                            background-color: black;
                            color: white;
                            font-family: Arial, sans-serif;
                            align-items: center;
			    display: flex;
                            justify-content: center;
			    flex-direction: column;
                        }
                        button {
                            background-color: #4CAF50;
                            border: none;
                            color: white;
                            padding: 15px 32px;
                            text-align: center;
                            text-decoration: none;
                            display: inline-block;
                            font-size: 16px;
                            margin: 4px 2px;
                            cursor: pointer;
                            border-radius: 8px;
                        }
                        button:hover {
                            background-color: #45a049;
                        }
                        img:hover {
                            opacity: 0.7;
                        }
                    </style>
                </head>
                <body>
                    <button onclick="window.location.reload();">Get Another Dog</button>
                    <h1>Random Dog Image</h1>
                    <img src="${imageUrl}" alt="Dog">
                    <br>  
                </body>
                </html>
            `;
      res.send(html);
    } else {
      res.status(500).send("Failed to fetch dog image.");
    }
  } catch (error) {
    console.error("Error serving HTML:", error);
    res.status(500).send("Internal server error.");
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
