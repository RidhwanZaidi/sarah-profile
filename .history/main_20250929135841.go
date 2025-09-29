package main

import (
	"net/http"

	"github.com/gin-gonic/gin"
)

type ProfileData struct {
	Name         string
	Title        string
	Company      string
	Phone        string
	Email        string
	Experience   string
	Projects     string
	Satisfaction string
}

func main() {
	// Set Gin to release mode for production
	// gin.SetMode(gin.ReleaseMode)

	r := gin.Default()

	// Serve static files
	r.Static("/static", "./static")
	r.Static("/assets", "./assets")

	// Load HTML templates
	r.LoadHTMLGlob("templates/*")

	// Profile data
	profile := ProfileData{
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
			"Profile": profile,
		})
	})

	// API routes for contact actions
	r.POST("/contact/phone", func(c *gin.Context) {
		c.JSON(http.StatusOK, gin.H{
			"message": "Phone contact initiated",
			"phone":   profile.Phone,
		})
	})

	r.POST("/contact/email", func(c *gin.Context) {
		c.JSON(http.StatusOK, gin.H{
			"message": "Email contact initiated",
			"email":   profile.Email,
		})
	})

	// Health check endpoint
	r.GET("/health", func(c *gin.Context) {
		c.JSON(http.StatusOK, gin.H{
			"status":  "healthy",
			"service": "business-profile",
		})
	})

	// Start server
	r.Run(":8080")
}
