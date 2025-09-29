package main

import (
	"net/http"

	"github.com/gin-gonic/gin"
)

type Profile struct {
	Name         string `json:"name"`
	Title        string `json:"title"`
	Company      string `json:"company"`
	Phone        string `json:"phone"`
	Email        string `json:"email"`
	Experience   string `json:"experience"`
	Projects     string `json:"projects"`
	Satisfaction string `json:"satisfaction"`
}

func main() {
	// Initialize Gin router
	r := gin.Default()

	// Serve static files
	r.Static("/static", "./static")
	r.Static("/assets", "./assets")

	// Load HTML templates
	r.LoadHTMLGlob("templates/*")

	// Profile data
	profile := Profile{
		Name:         "Maisarah",
		Title:        "Senior Business Development Manager",
		Company:      "OTA MY SDN BHD",
		Phone:        "016-4282828",
		Email:        "maisarah@otamy.net",
		Experience:   "8+",
		Projects:     "200+",
		Satisfaction: "98%",
	}

	// Routes
	r.GET("/", func(c *gin.Context) {
		c.HTML(http.StatusOK, "index.html", gin.H{
			"profile": profile,
		})
	})

	// API routes
	r.POST("/api/contact/phone", func(c *gin.Context) {
		c.JSON(http.StatusOK, gin.H{
			"success": true,
			"message": "Phone contact initiated",
			"phone":   profile.Phone,
		})
	})

	r.POST("/api/contact/email", func(c *gin.Context) {
		c.JSON(http.StatusOK, gin.H{
			"success": true,
			"message": "Email contact initiated",
			"email":   profile.Email,
		})
	})

	// Health check
	r.GET("/api/health", func(c *gin.Context) {
		c.JSON(http.StatusOK, gin.H{
			"status":  "healthy",
			"service": "business-profile",
		})
	})

	// Start server
	r.Run(":8080")
}